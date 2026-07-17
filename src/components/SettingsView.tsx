import { MatchInfo } from '../types';
import { WORLD_CUP_MATCHES } from '../data/mockData';
import { Settings, Shield, Sliders, Laptop, HelpCircle } from 'lucide-react';

interface SettingsViewProps {
  currentMatch: MatchInfo;
  onSelectMatch: (match: MatchInfo) => void;
  simulationInterval: number; // in ms
  onChangeInterval: (ms: number) => void;
}

export default function SettingsView({ 
  currentMatch, 
  onSelectMatch, 
  simulationInterval, 
  onChangeInterval 
}: SettingsViewProps) {

  const specLines = [
    { name: 'STADIUMOS ENGINE CORE', value: 'v1.4.2-STATION' },
    { name: 'SERVER RUNTIME ENVIRONMENT', value: 'Google Cloud Run' },
    { name: 'AUTONOMOUS REASONING API', value: 'Gemini 3.5 Flash Server-Side Proxy' },
    { name: 'FIFA WORLD CUP TELEMETRY SHIELD', value: 'ACTIVE (JWT SIGNED)' }
  ];

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Simulation configuration parameters */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#4FD1FF]" />
              <h3 className="text-sm font-bold">Tactical Match Simulation</h3>
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase">TELEMETRY SEED</span>
          </div>

          {/* Match selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-gray-500 uppercase">Active Telemetry Match Stream</label>
            <div className="grid grid-cols-1 gap-2">
              {WORLD_CUP_MATCHES.map((match) => {
                const isActive = match.teams === currentMatch.teams;
                return (
                  <button
                    key={match.teams}
                    onClick={() => onSelectMatch(match)}
                    className={`p-3.5 rounded-xl border text-left flex justify-between items-center transition-all ${
                      isActive 
                        ? 'bg-[#4FD1FF]/10 text-white border-[#4FD1FF]/40 shadow-sm' 
                        : 'bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold">{match.teams}</h4>
                      <span className="text-[9px] font-mono text-gray-500 block">{match.stadium}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">{match.status}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loop Speed selectors */}
          <div className="space-y-1.5 pt-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase">Telemetry Refresh Rate</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'Fast (4s)', value: 4000 },
                { name: 'Normal (8s)', value: 8000 },
                { name: 'Paused', value: 0 }
              ].map((opt) => {
                const isActive = simulationInterval === opt.value;
                return (
                  <button
                    key={opt.name}
                    onClick={() => onChangeInterval(opt.value)}
                    className={`py-2 rounded-lg border text-xs font-mono font-bold text-center transition-all ${
                      isActive 
                        ? 'bg-[#38FFB3]/10 text-[#38FFB3] border-[#38FFB3]/30' 
                        : 'bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    {opt.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* System parameters, security logs */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-[#7C5CFF]" />
                <h3 className="text-sm font-bold">StadiumOS Core Metrics</h3>
              </div>
              <Shield className="w-4 h-4 text-[#38FFB3] animate-pulse" />
            </div>

            <div className="space-y-3">
              {specLines.map((line) => (
                <div key={line.name} className="flex justify-between items-center p-3 bg-white/[0.01] border border-white/5 rounded-xl text-xs">
                  <span className="font-mono text-gray-500">{line.name}</span>
                  <span className="font-mono font-bold text-white">{line.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 mt-4 text-[10px] text-gray-500 font-mono text-center flex items-center justify-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-gray-500" />
            <span>AI Studio Cloud Run Node 3000 // Verified secure sandbox integrity</span>
          </div>
        </div>

      </div>

    </div>
  );
}
