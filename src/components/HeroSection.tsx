import { motion } from 'motion/react';
import { Shield, BrainCircuit, Cpu, Zap, Radio, ChevronDown, Award } from 'lucide-react';

interface HeroSectionProps {
  onLaunch: () => void;
  onWatchDemo: () => void;
}

export default function HeroSection({ onLaunch, onWatchDemo }: HeroSectionProps) {
  const loopSteps = [
    { title: 'Observe', desc: 'AI IoT sensors, cameras, and tickets feed real-time telemetry.', icon: Radio, color: '#4FD1FF' },
    { title: 'Reason', desc: 'Predict congestion, locate bottlenecks, check weather cells.', icon: BrainCircuit, color: '#7C5CFF' },
    { title: 'Plan', desc: 'Synthesize optimal dispatch strategies and rerouting options.', icon: Cpu, color: '#FFB800' },
    { title: 'Act', desc: 'Execute digital signage overrides, send instant volunteer dispatches.', icon: Zap, color: '#38FFB3' },
    { title: 'Learn', desc: 'Post-event reports and feedback loops refine confidence bounds.', icon: Shield, color: '#FF4D6D' }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#070B17] font-sans text-white flex flex-col items-center">
      {/* Background Gradients and Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px]" />
      
      {/* Digital Grid Mesh overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* Header logo & FIFA tag */}
      <div className="w-full max-w-7xl px-6 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded bg-[#4FD1FF] shadow-[0_0_15px_rgba(79,209,255,0.4)]">
            <svg className="w-6 h-6 text-[#070B17]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <span className="font-mono text-[9px] text-white/40 block tracking-widest uppercase">STADIUM_INTELLIGENCE</span>
            <span className="text-sm font-black tracking-tighter bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent uppercase">STADIUMOS AI</span>
          </div>
        </div>
        <div className="flex items-center gap-2 border border-[#38FFB3]/30 bg-[#38FFB3]/10 px-3 py-1.5 rounded text-xs font-mono font-bold text-[#38FFB3] shadow-[0_0_12px_rgba(56,255,179,0.2)]">
          <Award className="w-3.5 h-3.5 text-[#38FFB3] animate-pulse" />
          <span>FIFA WORLD CUP 2026 EDITION</span>
        </div>
      </div>

      {/* Main Hero Title & Content */}
      <div className="flex-1 w-full max-w-7xl px-6 py-12 flex flex-col lg:flex-row items-center gap-12 z-10 justify-center">
        <div className="flex-1 text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 border border-[#4FD1FF]/30 bg-[#4FD1FF]/10 px-3 py-1 rounded text-xs font-mono font-bold text-[#4FD1FF] uppercase tracking-wide"
          >
            <span className="h-2 w-2 rounded-full bg-[#38FFB3] animate-ping" />
            <span>PROACTIVE MULTI-AGENT SWARM PLATFORM</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase"
          >
            STADIUMOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4FD1FF] to-[#7C5CFF]">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl font-bold text-white/90 tracking-tight uppercase"
          >
            Autonomous Multi-Agent Stadium Intelligence Platform
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl font-sans"
          >
            A proactive AI ecosystem that enhances navigation, crowd management, multilingual communication, emergency response, accessibility, transportation, sustainability, and operational intelligence for FIFA World Cup 2026.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={onLaunch}
              className="relative group overflow-hidden rounded bg-gradient-to-r from-[#4FD1FF] to-[#7C5CFF] p-[1px] hover:shadow-[0_0_20px_rgba(79,209,255,0.4)] transition-all duration-300"
            >
              <div className="bg-[#070B17] group-hover:bg-transparent px-8 py-3.5 rounded transition-all duration-300">
                <span className="text-white font-black uppercase tracking-wider text-sm">Launch Dashboard</span>
              </div>
            </button>
            <button
              onClick={onWatchDemo}
              className="px-8 py-3.5 rounded border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 font-bold uppercase tracking-wider text-sm transition-all duration-300 cursor-pointer"
            >
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Interactive Illuminated Stadium representation */}
        <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]"
          >
            {/* Outer Rotating Glow Ring */}
            <div className="absolute inset-0 rounded-full border border-[#4FD1FF]/10 animate-spin" style={{ animationDuration: '30s' }} />
            <div className="absolute inset-4 rounded-full border border-dashed border-[#7C5CFF]/20 animate-spin" style={{ animationDuration: '45s' }} />
            
            {/* Holographic Stadium Mock */}
            <div className="absolute inset-[15%] rounded-full border-[2px] border-[#4FD1FF]/40 bg-[#070B17] shadow-[0_0_60px_rgba(79,209,255,0.15)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#4FD1FF]/5 to-[#070B17] opacity-60" />
              
              {/* Dynamic illuminated football pitch outline */}
              <div className="relative w-[70%] h-[50%] border border-[#38FFB3]/40 rounded-sm flex items-center justify-center opacity-60">
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#38FFB3]/40" />
                <div className="h-16 w-16 rounded-full border border-[#38FFB3]/40" />
                <div className="absolute left-0 top-1/4 bottom-1/4 w-6 border-y border-r border-[#38FFB3]/40" />
                <div className="absolute right-0 top-1/4 bottom-1/4 w-6 border-y border-l border-[#38FFB3]/40" />
              </div>

              {/* Dynamic scanning lights */}
              <div className="absolute top-0 left-[-50%] w-[200%] h-[10px] bg-gradient-to-r from-transparent via-[#4FD1FF]/40 to-transparent rotate-12 blur-xs animate-pulse" />
            </div>

            {/* Floating Telemetry Dots with labels */}
            <div className="absolute top-[10%] left-[20%] flex items-center gap-2 bg-[#070B17]/90 border border-[#38FFB3]/40 px-2.5 py-1 rounded text-[10px] font-mono shadow-lg">
              <span className="h-2 w-2 rounded-full bg-[#38FFB3] animate-ping" />
              <span>GATE_A_94%</span>
            </div>
            
            <div className="absolute bottom-[15%] right-[10%] flex items-center gap-2 bg-[#070B17]/90 border border-[#FF4D6D]/40 px-2.5 py-1 rounded text-[10px] font-mono shadow-lg">
              <span className="h-2 w-2 rounded-full bg-[#FF4D6D] animate-ping" />
              <span>SECTOR_4_SOS</span>
            </div>

            <div className="absolute top-[40%] right-[5%] flex items-center gap-2 bg-[#070B17]/90 border border-[#FFB800]/40 px-2.5 py-1 rounded text-[10px] font-mono shadow-lg">
              <span className="h-2 w-2 rounded-full bg-[#FFB800] animate-ping" />
              <span>WEATHER_MODERATE</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full max-w-7xl px-6 py-16 border-t border-white/10 z-10 bg-black/20">
        <div className="text-center mb-10">
          <h2 className="text-xs uppercase font-mono tracking-widest text-[#4FD1FF] font-bold">Cognitive Operating Model</h2>
          <p className="text-2xl font-black mt-1 uppercase tracking-tight">Multi-Agent Self-Correction Loop</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {loopSteps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div key={idx} className="relative group">
                <div className="h-full bg-[#0A1428]/60 border border-white/10 rounded p-5 hover:border-white/20 hover:bg-[#0A1428]/80 transition-all duration-300 flex flex-col justify-between shadow-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="p-2.5 rounded bg-white/5 border border-white/10" style={{ color: step.color }}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-white/30 font-bold">0{idx + 1}</span>
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-tight" style={{ color: step.color }}>{step.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed font-sans">{step.desc}</p>
                  </div>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 right-[-15px] transform -translate-y-1/2 z-20 pointer-events-none text-white/20 font-mono text-xl">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer credit */}
      <div className="w-full text-center py-6 border-t border-white/10 text-[9px] text-white/20 font-mono z-10 uppercase tracking-widest">
        SECURE INTEGRATED STADIUM MANAGEMENT FRAMEWORK // NASA-GRADE ROBUSTNESS
      </div>
    </div>
  );
}
