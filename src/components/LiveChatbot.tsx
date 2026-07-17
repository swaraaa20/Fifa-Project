import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, Send, X, Bot, Trash2, Sparkles, Terminal, 
  ShieldAlert, Users, Bus, Mic, MicOff, Volume2, VolumeX, Radio
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export default function LiveChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Unmuted by default so they hear responses
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "STADIUMOS AI DIRECT SECURE LINK ONLINE. Tactical guidance module ready. Ask me any queries about tournament schedules, spectator safety, crowd management, transport, or system operations. Speak or type your request.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Quick prompt presets
  const presetQueries = [
    { text: "Stadium status & attendance?", icon: Users, color: "text-[#4FD1FF]" },
    { text: "Smart transit efficiency?", icon: Bus, color: "text-[#FFB800]" },
    { text: "Emergency safety level?", icon: ShieldAlert, color: "text-[#FF4D6D]" },
    { text: "What is active tactical swarm?", icon: Sparkles, color: "text-[#38FFB3]" },
  ];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Clean TTS function
  const speakText = (text: string) => {
    if (isMuted || !("speechSynthesis" in window)) return;

    // Stop current speech
    window.speechSynthesis.cancel();

    // Sanitize text for speech: strip headers, bracketed logs, and markdown
    const cleaned = text
      .replace(/\[STADIUMOS AI \/\/ STATUS: ONLINE\]/gi, "Stadium OS status online.")
      .replace(/\[CHANNEL: SECURE \/\/ OPERATIONAL\]/gi, "Secure channel operational.")
      .replace(/\[[^\]]+\]/gi, "") // remove logs like [STAD_OS // PROCESSING]
      .replace(/\*+/g, "") // remove markdown bolding
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleaned);
    
    // Choose voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Microsoft"))) || voices[0];
    
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = 1.05; // Quick futuristic military response pace
    utterance.pitch = 0.95; // Authoritative lower frequency

    window.speechSynthesis.speak(utterance);
  };

  // Setup Speech Recognition on mount
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsListening(true);
        // Pause any current spoken speech to listen carefully
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          // Auto-send the transcribed query
          handleSendMessage(transcript);
        }
      };

      rec.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }

    // Populate voices for speechSynthesis
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }

    return () => {
      // Cleanup speaking on unmount
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newUserMsg: Message = {
      id: userMsgId,
      role: "user",
      text: textToSend,
      timestamp: userTimestamp,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const historyPayload = [...messages, newUserMsg].map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyPayload }),
      });

      if (!response.ok) {
        throw new Error("SECURE DISPATCH TUNNEL FAILURE. CODE: " + response.status);
      }

      const data = await response.json();
      const responseText = data.text || "NO_RESPONSE_STREAMED // SECURE NULL DATA";
      
      const botTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "model",
          text: responseText,
          timestamp: botTimestamp,
        },
      ]);

      // Speak verbal response automatically
      speakText(responseText);
    } catch (err: any) {
      console.error(err);
      const errTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const errMsg = `[SYSTEM ALERT] SECURE TUNNEL ERROR: ${err.message || "Failed to establish AI reasoning channel"}. Please try again later.`;
      
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "model",
          text: errMsg,
          timestamp: errTimestamp,
        },
      ]);
      speakText(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Start speech failed:", e);
      }
    }
  };

  const handleClearHistory = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setMessages([
      {
        id: "welcome",
        role: "model",
        text: "STADIUMOS AI CHAT ENGINE REBOOTED. Secure channel re-initialized. Awaiting operations command.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const toggleChat = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (!nextState) {
      setHasNewMessage(false);
      // Mute speaking when closing chat window
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  // Toggle speaker output sound
  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (nextMute && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    } else if (!nextMute && messages.length > 0) {
      // Speak the last message from the bot if unmuting
      const lastMsg = [...messages].reverse().find(m => m.role === "model");
      if (lastMsg) {
        speakText(lastMsg.text);
      }
    }
  };

  // Pulse notification if closed with new bot message
  useEffect(() => {
    if (!isOpen && messages.length > 1 && messages[messages.length - 1].role === "model") {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-80 md:w-[410px] h-[550px] bg-gradient-to-b from-[#070B17] to-[#0A1428] border border-white/10 rounded shadow-[0_15px_45px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-[#4FD1FF]/10 border border-[#4FD1FF]/30 flex items-center justify-center">
                  <Terminal className="w-3.5 h-3.5 text-[#4FD1FF]" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                    STADIUMOS AI <span className="text-[9px] text-[#38FFB3] animate-pulse">● LIVE</span>
                  </h3>
                  <span className="text-[8px] text-white/30 font-mono tracking-wide uppercase">SECURE VOICE & DATA LINK</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Mute/Unmute toggle button */}
                <button
                  onClick={toggleMute}
                  title={isMuted ? "Enable speech response output" : "Mute speech response output"}
                  className={`p-1.5 rounded hover:bg-white/5 transition-all cursor-pointer ${isMuted ? "text-white/30" : "text-[#4FD1FF]"}`}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleClearHistory}
                  title="Clear secure channel history"
                  className="p-1.5 rounded hover:bg-white/5 text-white/40 hover:text-white transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1.5 rounded hover:bg-white/5 text-white/40 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Listening Indicator overlay */}
            {isListening && (
              <div className="bg-[#38FFB3]/10 border-b border-[#38FFB3]/20 py-2 px-4 flex items-center justify-between gap-3 text-xs text-[#38FFB3] font-mono animate-pulse">
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 animate-spin" />
                  <span>TRANSMITTING DIRECT VOICE STREAM... SPEAK NOW</span>
                </div>
                <div className="flex gap-1">
                  <span className="w-1 h-3 bg-[#38FFB3] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1 h-3 bg-[#38FFB3] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 h-3 bg-[#38FFB3] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/10">
              {messages.map((msg) => {
                const isBot = msg.role === "model";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${isBot ? "justify-start" : "justify-end text-right"}`}
                  >
                    {isBot && (
                      <div className="h-6 w-6 shrink-0 rounded bg-[#4FD1FF]/15 border border-[#4FD1FF]/30 flex items-center justify-center mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-[#4FD1FF]" />
                      </div>
                    )}
                    <div className="max-w-[80%] space-y-1">
                      <div
                        className={`p-3 rounded text-xs leading-relaxed font-sans ${
                          isBot
                            ? "bg-[#0A1428]/80 border border-white/5 text-white/90"
                            : "bg-[#7C5CFF]/10 border border-[#7C5CFF]/30 text-white font-medium"
                        }`}
                      >
                        {isBot && (
                          <div className="text-[8px] font-mono text-[#4FD1FF] uppercase mb-1 tracking-widest font-black flex items-center gap-1 justify-between">
                            <span className="flex items-center gap-1">
                              <span className="inline-block h-1 w-1 bg-[#4FD1FF] rounded-full animate-ping" />
                              [STAD_OS // DECRYPTED_SIGNAL]
                            </span>
                            {!isMuted && (
                              <button 
                                onClick={() => speakText(msg.text)} 
                                className="text-[#38FFB3] hover:underline uppercase text-[7px]"
                                title="Re-read vocal signal"
                              >
                                [REPLAY_AUDIO]
                              </button>
                            )}
                          </div>
                        )}
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      <span className="text-[8px] font-mono text-white/20 block px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                    {!isBot && (
                      <div className="h-6 w-6 shrink-0 rounded bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 flex items-center justify-center mt-0.5">
                        <span className="text-[9px] font-mono font-bold text-[#7C5CFF]">OP</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="h-6 w-6 shrink-0 rounded bg-[#4FD1FF]/15 border border-[#4FD1FF]/30 flex items-center justify-center mt-0.5 animate-pulse">
                    <Bot className="w-3.5 h-3.5 text-[#4FD1FF]" />
                  </div>
                  <div className="max-w-[80%] space-y-1">
                    <div className="p-3 rounded bg-[#0A1428]/80 border border-white/5 text-white/90">
                      <div className="text-[8px] font-mono text-[#4FD1FF] uppercase mb-1 tracking-widest font-black">
                        [STAD_OS // PROCESSING]
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#4FD1FF] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="h-1.5 w-1.5 rounded-full bg-[#4FD1FF] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="h-1.5 w-1.5 rounded-full bg-[#4FD1FF] animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Presets */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2 bg-black/20 border-t border-white/5">
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest font-bold block mb-1.5">
                  PRE-COMMISSIONED TACTICAL QUERIES
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {presetQueries.map((q, idx) => {
                    const Icon = q.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q.text)}
                        className="flex items-center gap-1.5 p-1.5 rounded bg-white/[0.02] border border-white/5 hover:border-white/20 text-left text-[10px] text-white/70 hover:text-white transition-all cursor-pointer"
                      >
                        <Icon className={`w-3 h-3 ${q.color} shrink-0`} />
                        <span className="truncate">{q.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Form with Audio recording toggle */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 border-t border-white/10 bg-black/40 flex gap-2 items-center"
            >
              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  title={isListening ? "Cancel verbal capture" : "Initiate verbal tactical capture"}
                  className={`p-2 rounded border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                    isListening 
                      ? "bg-[#FF4D6D]/15 border-[#FF4D6D]/40 text-[#FF4D6D] animate-pulse" 
                      : "bg-[#38FFB3]/10 border-[#38FFB3]/30 text-[#38FFB3] hover:bg-[#38FFB3]/25"
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening... Speak clearly" : "Transmit query packet..."}
                disabled={isListening}
                className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#4FD1FF]/40 font-mono disabled:opacity-50"
              />
              
              <button
                type="submit"
                disabled={!input.trim() || isLoading || isListening}
                className="p-2 rounded bg-[#4FD1FF] text-[#070B17] hover:bg-[#4FD1FF]/80 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-[0_0_10px_rgba(79,209,255,0.4)]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher trigger button */}
      <button
        onClick={toggleChat}
        className="relative p-3.5 rounded-full bg-gradient-to-r from-[#4FD1FF] to-[#7C5CFF] text-white shadow-[0_0_20px_rgba(79,209,255,0.4)] hover:shadow-[0_0_25px_rgba(79,209,255,0.6)] cursor-pointer transition-all duration-300 flex items-center justify-center transform hover:scale-105 active:scale-95"
      >
        <MessageSquare className="w-5 h-5" />
        
        {/* Red bounce ping indicator for new messages or highlight */}
        {hasNewMessage && (
          <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-[#FF4D6D] border-2 border-[#070B17] animate-pulse" />
        )}
      </button>
    </div>
  );
}
