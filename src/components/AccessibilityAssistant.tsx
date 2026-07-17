import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Accessibility, Eye, Volume2, HelpCircle, Check, MapPin, CheckCircle } from 'lucide-react';

export default function AccessibilityAssistant() {
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [voiceNav, setVoiceNav] = useState(false);
  
  const elevators = [
    { name: 'Elevator 4A (North-East)', status: 'Operational', capacity: '12 / 15' },
    { name: 'Elevator 4B (East Gates)', status: 'Cleaning check (3m)', capacity: '0 / 15' },
    { name: 'Elevator 1A (South Concourses)', status: 'Operational', capacity: '5 / 15' }
  ];

  return (
    <div className={`space-y-6 ${largeText ? 'text-lg' : 'text-sm'} ${highContrast ? 'border-2 border-yellow-400' : ''}`}>
      
      {/* Upper Options grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Toggle Panel options */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h3 className="text-sm font-bold text-white">Accessibility Overrides</h3>
            <Accessibility className="w-4 h-4 text-[#38FFB3]" />
          </div>

          <div className="space-y-4">
            {/* Large text toggle */}
            <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04]">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white block">Large Text Mode</span>
                <span className="text-[10px] text-gray-500 font-mono">Enlarge tactile interface bounds</span>
              </div>
              <button 
                onClick={() => setLargeText(!largeText)}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${
                  largeText ? 'bg-[#38FFB3]' : 'bg-gray-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  largeText ? 'transform translate-x-5' : ''
                }`} />
              </button>
            </div>

            {/* High contrast toggle */}
            <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04]">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white block">High Contrast Mode</span>
                <span className="text-[10px] text-gray-500 font-mono">Vibrant yellow & white grids</span>
              </div>
              <button 
                onClick={() => setHighContrast(!highContrast)}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${
                  highContrast ? 'bg-[#38FFB3]' : 'bg-gray-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  highContrast ? 'transform translate-x-5' : ''
                }`} />
              </button>
            </div>

            {/* Voice navigation transcript */}
            <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04]">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white block">Voice Guidance Mode</span>
                <span className="text-[10px] text-gray-500 font-mono">Synthesize spoken directions</span>
              </div>
              <button 
                onClick={() => setVoiceNav(!voiceNav)}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${
                  voiceNav ? 'bg-[#38FFB3]' : 'bg-gray-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  voiceNav ? 'transform translate-x-5' : ''
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Wheelchair routing & Elevator Mechanical Availability */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h3 className="text-sm font-bold text-white">Elevator Status Feed</h3>
            <span className="text-[10px] font-mono text-gray-500 uppercase">IoT TELEMETRY</span>
          </div>

          <div className="space-y-3">
            {elevators.map((ele) => (
              <div key={ele.name} className="p-3.5 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xs font-bold text-white">{ele.name}</h4>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                    ele.status === 'Operational' ? 'bg-[#38FFB3]/10 text-[#38FFB3]' : 'bg-[#FFB800]/10 text-[#FFB800]'
                  }`}>
                    {ele.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-gray-500">
                  <span>LIVE LOAD CAPACITY</span>
                  <span>{ele.capacity} PERSONS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accessible services finder */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">FACILITY CHECKS</span>
            <h3 className="text-sm font-bold text-white">Wheelchair Accessible Restrooms</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex gap-3 items-center">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-[#38FFB3]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Level 1 West Atrium rest hub</span>
                  <span className="text-[10px] text-gray-500 font-mono">RESERVED // OPEN // IMMACULATE</span>
                </div>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex gap-3 items-center">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-[#38FFB3]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Level 2 North Corridor</span>
                  <span className="text-[10px] text-gray-500 font-mono">RESERVED // OPEN // LOW OCCUPANCY</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 mt-4 text-[10px] text-gray-500 font-mono flex items-center justify-between">
            <span>ASSISTANCE HOTLINE</span>
            <span className="text-[#38FFB3] font-bold">REPLY_SPEED: 45s</span>
          </div>
        </div>

      </div>

      {/* Voice Transcript simulation area if voiceNav is active */}
      <AnimatePresence>
        {voiceNav && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-[#38FFB3]/5 border border-[#38FFB3]/20 rounded-2xl p-4 flex gap-4 items-center"
          >
            <Volume2 className="w-5 h-5 text-[#38FFB3] shrink-0 animate-bounce" />
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-[#38FFB3] block uppercase tracking-widest">Synthesized Voice HUD Transcription</span>
              <p className="text-xs text-gray-300 leading-relaxed">
                "Approaching Section 114 corridor. Please make a slight left turn near the accessible ramp. Elevator 4A is 30 feet directly ahead on your right-hand side."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Holographic Sign Language Assistant Stream */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <h3 className="text-xs uppercase font-mono tracking-wider text-gray-400">Sign Language Stream (ASL / ISL Placeholder)</h3>
          <span className="text-[10px] font-mono text-[#4FD1FF]">HOLOGRAPH FEED ACTIVE</span>
        </div>

        <div className="h-48 rounded-xl bg-[#070B17] border border-white/5 flex items-center justify-center relative overflow-hidden">
          {/* Wave line to simulate dynamic virtual avatar */}
          <div className="absolute inset-0 bg-radial from-[#4FD1FF]/5 to-transparent" />
          <div className="text-center space-y-3 z-10">
            <Accessibility className="w-8 h-8 text-[#4FD1FF] mx-auto animate-pulse" />
            <p className="text-xs text-gray-400 font-mono leading-relaxed max-w-sm mx-auto">
              Ready to initialize real-time sign language stream using synthetic model avatars. Select tactile query to feed prompt parameters.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
