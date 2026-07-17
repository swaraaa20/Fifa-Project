import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Setup JSON body parsing for API requests
  app.use(express.json());

  let aiClient: GoogleGenAI | null = null;

  function getAiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // Secure server-side endpoint for Gemini AI chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages format." });
      }

      const ai = getAiClient();
      const systemInstruction = `You are StadiumOS AI, the official Autonomous Multi-Agent Tactical Operating System for FIFA World Cup 2026 stadium management.
You have real-time telemetry access (simulated) for attendance, crowd density, emergency services status, volunteer availability, transport statuses, and tactical swarm confidence.
Your responses must be:
1. Highly crisp, decisive, helpful, and concise (usually under 120 words).
2. Infused with a futuristic, clean stadium operations system terminal aesthetic (caps headers, tracking tags, secure channel confirmations).
3. 100% human-friendly, practical, and clear. Avoid any generic, robotic "I am an AI language model" phrases.
If asked about stadium conditions, feel free to use standard active values such as Attendance (~83,500), Crowd Density (~68%), Security status (Secure/Optimal), Volunteer availability (~4,250 deployed), Transport status (Subway fully operational, high efficiency), or Wind/Temp (24°C, clear skies).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: messages,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Chat API Error:", error);
      res.status(500).json({ error: error.message || "Failed to communicate with Gemini API" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
