import { useState } from 'react';
import { motion } from 'motion/react';
import { STADIUM_METRICS } from '../data/mockData';
import { Flame, Users, AlertTriangle, ArrowRightLeft, TrendingUp } from 'lucide-react';

export default function CrowdHeatmap() {
  const [gates, setGates] = useState(STADIUM_METRICS.gateOccupancy);
  const [activeSector, setActiveSector] = useState('Sector 104 (East)');
  const [reassignSuccess, setReassignSuccess] = useState<string | null>(null);

  const sectors = [
    { name: 'VIP Suite Tier', density: 34, color: '#38FFB3', count: '1,240 spectators' },
    { name: 'North Deck Concourse', density: 62, color: '#FFB800', count: '14,200 spectators' },
    { name: 'Sector 104 (East)', density: 91, color: '#FF4D6D', count: '8,430 spectators' },
    { name: 'South Bleachers Loop', density: 78, color: '#FFB800', count: '19,100 spectators' }
  ];

  const handleReassign = (gate: string) => {
    setReassignSuccess(`Dispatched 20 standby volunteers to ${gate} supervisor fleet.`);
    setGates(prev => prev.map(g => {
      if (g.gate === gate) {
        return { ...g, live: Math.max(g.live - 8, 30), status: 'OPTIMAL' };
      }
      return g;
    }));
    setTimeout(() => setReassignSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Crowd heat grid and sector breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Large Heatmap Grid Overlay */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#FF4D6D]" />
              <h3 className="text-sm font-bold">Dynamic Spectator Distribution</h3>
            </div>
            <span className="text-xs font-mono text-gray-500">SECTOR LIVE CAPACITIES</span>
          </div>

          {/* Interactive CSS / SVG Stadium Heat Map */}
          <div className="py-6 flex justify-center items-center">
            <div className="relative w-full max-w-[480px] aspect-[4/3] bg-radial from-blue-950/20 to-[#070B17] rounded-3xl border border-white/5 p-6 flex flex-col justify-between">
              
              {/* Outer bowl section grids */}
              <div className="grid grid-cols-4 gap-3">
                <button 
                  onClick={() => setActiveSector('VIP Suite Tier')}
                  className="bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 p-3 rounded-xl text-center transition-all duration-150"
                >
                  <span className="text-[10px] font-mono text-[#38FFB3] block">VIP DECK</span>
                  <span className="text-sm font-bold font-mono text-white">34%</span>
                </button>
                <button 
                  onClick={() => setActiveSector('North Deck Concourse')}
                  className="bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 p-3 rounded-xl text-center transition-all duration-150"
                >
                  <span className="text-[10px] font-mono text-[#FFB800] block">NORTH</span>
                  <span className="text-sm font-bold font-mono text-white">62%</span>
                </button>
                <button 
                  onClick={() => setActiveSector('Sector 104 (East)')}
                  className="bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/25 p-3 rounded-xl text-center transition-all duration-150 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#FF4D6D]/5 animate-pulse" />
                  <span className="text-[10px] font-mono text-[#FF4D6D] block">EAST-104</span>
                  <span className="text-sm font-bold font-mono text-white">91%</span>
                </button>
                <button 
                  onClick={() => setActiveSector('South Bleachers Loop')}
                  className="bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 p-3 rounded-xl text-center transition-all duration-150"
                >
                  <span className="text-[10px] font-mono text-[#FFB800] block">SOUTH</span>
                  <span className="text-sm font-bold font-mono text-white">78%</span>
                </button>
              </div>

              {/* Graphical Center Field Representation */}
              <div className="border border-white/10 rounded-2xl h-24 my-3 flex items-center justify-center bg-white/[0.01]">
                <div className="text-center">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">SELECTED SECTOR HUB</span>
                  <span className="text-sm font-bold text-white tracking-wide">{activeSector}</span>
                </div>
              </div>

              {/* Lower Deck Sector buttons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-mono">WEST GATE CORRIDOR</span>
                  <span className="text-xs font-bold text-[#38FFB3] font-mono">22% (OPTIMAL)</span>
                </div>
                <div className="bg-[#FF4D6D]/5 border border-[#FF4D6D]/20 p-3 rounded-xl flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-mono">INNER ATRIUM LOOP</span>
                  <span className="text-xs font-bold text-[#FF4D6D] font-mono">85% (CONGESTED)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Predictions block */}
          <div className="border-t border-white/5 pt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-mono text-gray-400 uppercase">AI Predictive Analytics (Post-Match Surge)</span>
              <span className="text-[10px] font-mono text-gray-500">10 MIN INTERVALS</span>
            </div>
            
            {/* Custom Vector Predictive Chart (Safe from package load failures) */}
            <div className="h-20 flex items-end justify-between gap-1.5 pt-4">
              {[25, 34, 40, 51, 62, 74, 91, 85, 60, 41, 30, 18].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 bg-[#070B17] border border-white/10 text-[9px] font-mono px-1 py-0.5 rounded whitespace-nowrap text-[#4FD1FF] transition-opacity duration-150">
                    {val}% at {15 + idx * 10}m
                  </div>
                  <div className="w-full bg-white/5 rounded-t-sm group-hover:bg-[#4FD1FF]/30 transition-colors" style={{ height: `${val}%` }}>
                    <div className="w-full h-full bg-gradient-to-t from-[#7C5CFF]/60 to-[#4FD1FF]/80 rounded-t-sm" />
                  </div>
                  <span className="text-[8px] font-mono text-gray-600">+{idx * 10}m</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gate Occupancies and Shift Assignments */}
        <div className="space-y-6">
          
          {/* Gate Occupancy levels */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs uppercase font-mono tracking-wider text-gray-400">Gate Flow Analysis</h3>
              <Users className="w-4 h-4 text-gray-500" />
            </div>

            <div className="space-y-4">
              {gates.map((g) => (
                <div key={g.gate} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-gray-300">{g.gate}</span>
                    <span className="font-mono text-gray-500">
                      {(g.live * g.capacity / 100).toLocaleString()} / {g.capacity.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Progress Line */}
                  <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${
                      g.live >= 85 ? 'bg-[#FF4D6D]' : g.live >= 60 ? 'bg-[#FFB800]' : 'bg-[#38FFB3]'
                    }`} style={{ width: `${g.live}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer shift commander */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-wider text-gray-400">AI Force Multiplier</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-[#FFB800]/5 border border-[#FFB800]/20 p-3 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  Gate A is reporting severe security queues. Deployed shift count is insufficient for arrival load.
                </p>
              </div>

              {reassignSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 text-[#38FFB3] text-xs font-mono rounded-xl">
                  {reassignSuccess}
                </div>
              )}

              <button
                onClick={() => handleReassign('Gate A')}
                className="w-full flex items-center justify-center gap-2 bg-[#7C5CFF]/10 border border-[#7C5CFF]/30 hover:bg-[#7C5CFF]/20 text-[#7C5CFF] hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Shift Standby Fleet to Gate A</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
