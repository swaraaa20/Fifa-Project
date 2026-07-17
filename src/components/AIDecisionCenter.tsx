import { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Terminal, ShieldAlert, Cpu, CheckCircle, Award, Compass } from 'lucide-react';

export default function AIDecisionCenter() {
  const [activeOver, setActiveOver] = useState(false);

  const reasoningLogs = [
    { source: 'COORD_AGENT', message: 'Doppler satellite weather radar initialized. Detecting cloud cell approaching stadium perimeter.', time: '15:18:24' },
    { source: 'TRAFFIC_NODE', message: 'Spectator ingress velocity at Gate A breached safety thresh (94%). Security check times spiked to 19m.', time: '15:12:02' },
    { source: 'REASONING_CORE', message: 'Synthesizing mitigation: Multi-lingual dynamic signage overrides generated to redirect spectators to Gate C.', time: '15:13:11' },
    { source: 'ACTION_ENGINE', message: 'Broadcasting multicast digital announcements. Alerting Section 104 emergency volunteer staff.', time: '15:13:45' }
  ];

  const risks = [
    { title: 'Gate A Bottlenecking', factor: 'Arrival speed peak', status: 'MITIGATING', color: '#FF4D6D' },
    { title: 'Approaching Rain Cell', factor: 'Expected precipitation', status: 'MONITORING', color: '#FFB800' },
    { title: 'Power Grid Volatility', factor: 'HVAC load ceiling', status: 'STABLE', color: '#38FFB3' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top command headers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Confidence Dial */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 flex flex-col justify-between items-center text-center">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-gray-500 uppercase">SYS AUTONOMY METRIC</span>
            <h3 className="text-sm font-bold text-white">Consensus Confidence Score</h3>
          </div>

          <div className="relative py-6 flex items-center justify-center">
            {/* Pulsing ring */}
            <div className="absolute h-36 w-36 rounded-full border border-dashed border-[#4FD1FF]/30 animate-spin" style={{ animationDuration: '20s' }} />
            
            <div className="h-28 w-28 rounded-full bg-[#070B17] border-2 border-[#4FD1FF]/40 flex flex-col justify-center items-center shadow-lg">
              <span className="text-2xl font-bold font-mono text-[#4FD1FF]">98.4%</span>
              <span className="text-[8px] font-mono text-gray-400 mt-1">SWARM STABLE</span>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 font-mono leading-relaxed px-2">
            AI confidence bounds are computed dynamically across weather, crowd densities, transit fleets, and volunteer availability matrices.
          </p>
        </div>

        {/* Live AI Reasoning logs */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[280px]">
          <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#38FFB3]" />
              <h3 className="text-xs uppercase font-mono tracking-wider text-gray-400">Multi-Agent Consensus Stream</h3>
            </div>
            <span className="text-[9px] font-mono text-gray-600">SYS_CONSOLE // 100% ONLINE</span>
          </div>

          {/* Scrolling shell log lines */}
          <div className="flex-1 bg-[#070B17]/60 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-gray-400 overflow-y-auto space-y-2 mt-3 custom-scrollbar">
            {reasoningLogs.map((log, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-gray-600 shrink-0">[{log.time}]</span>
                <span className="text-[#38FFB3] shrink-0">{log.source}:</span>
                <span className="text-gray-300 leading-relaxed">{log.message}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Risk matrix and Predictive Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Risk factors table */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#FF4D6D]" />
              <h3 className="text-sm font-bold">Threat & Risk Analysis Matrix</h3>
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase font-bold">ACTIVE SCANNER</span>
          </div>

          <div className="space-y-3">
            {risks.map((risk) => (
              <div key={risk.title} className="p-3.5 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl flex justify-between items-center transition-all">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">{risk.title}</h4>
                  <span className="text-[10px] text-gray-500 font-mono block">Primary driver: {risk.factor}</span>
                </div>
                
                <span className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: `${risk.color}15`, color: risk.color, border: `1px solid ${risk.color}25` }}>
                  {risk.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive insights and override panel */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#4FD1FF]">
              <Cpu className="w-5 h-5 text-[#4FD1FF]" />
              <h3 className="text-sm font-bold">Predictive Dispatch Insights</h3>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-2.5">
              <span className="text-[9px] font-mono text-[#4FD1FF] block">FORECAST REPORT (15:30 - 16:30)</span>
              <p className="text-xs text-gray-300 leading-relaxed">
                Spectator outbound surges are modeled to peak 10 minutes following the final whistle. Pre-positioning shuttle fleets on the North-East loop will reduce local bus queuing bounds by an estimated 22 minutes.
              </p>
            </div>
          </div>

          {/* Overrides */}
          <div className="pt-4 border-t border-white/5 mt-4 flex justify-between items-center">
            <span className="text-xs text-gray-400 font-mono">Manual Swarm Override Link</span>
            <button
              onClick={() => setActiveOver(!activeOver)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                activeOver 
                  ? 'bg-[#FF4D6D]/20 text-[#FF4D6D] border-[#FF4D6D]/40' 
                  : 'bg-white/5 text-gray-300 border-white/5 hover:bg-white/10'
              }`}
            >
              {activeOver ? 'OVERRIDE_LOCK_DEPLOYED' : 'ARM_OVERRIDE_GATE'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
