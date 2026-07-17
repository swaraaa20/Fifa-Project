import { useState } from 'react';
import { motion } from 'motion/react';
import { STADIUM_METRICS } from '../data/mockData';
import { Bus, Train, Navigation, Clock, Leaf, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function SmartTransport() {
  const [transitState, setTransitState] = useState(STADIUM_METRICS.transportModes);

  const bestRoute = {
    mode: 'Express Metro Line 1',
    reason: 'Zero vehicle traffic congestion, fully electric grid-powered.',
    eta: '14 minutes back to central transit terminal',
    savings: '1.4kg CO2 saved compared to traditional rideshare taxi'
  };

  const parkingLots = [
    { lot: 'North Parking Lot A', status: '94% FULL', spaces: '14 accessible open' },
    { lot: 'West Parking Lot B', status: '62% FULL', spaces: '120 standard open' },
    { lot: 'East Shuttles Only', status: 'RESTRICTED', spaces: 'Permit bus fleets only' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Upper overview and best route */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Transit Service Modes */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Bus className="w-5 h-5 text-[#4FD1FF]" />
              <h3 className="text-sm font-bold">Smart Transit Fleet Analytics</h3>
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase">OFFICIAL FLEET CHANNELS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transitState.map((mode) => (
              <div key={mode.mode} className="p-4 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl flex items-start gap-4 transition-all">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#4FD1FF]">
                  {mode.mode.includes('Metro') ? (
                    <Train className="w-5 h-5" />
                  ) : (
                    <Bus className="w-5 h-5" />
                  )}
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-white">{mode.mode}</h4>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                      mode.status === 'OPTIMAL' ? 'bg-[#38FFB3]/10 text-[#38FFB3]' : 'bg-[#FF4D6D]/10 text-[#FF4D6D]'
                    }`}>
                      {mode.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5 text-[10px] font-mono text-gray-400">
                    <div>
                      <span>ETA: </span>
                      <span className="text-white font-bold">{mode.eta}</span>
                    </div>
                    <div>
                      <span>EFFICIENCY: </span>
                      <span className="text-[#38FFB3] font-bold">{mode.efficiency}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Route & Carbon Footprint Highlights */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#38FFB3]">
              <Leaf className="w-5 h-5 text-[#38FFB3]" />
              <h3 className="text-sm font-bold">Proactive Green Route</h3>
            </div>

            <div className="bg-[#38FFB3]/5 border border-[#38FFB3]/15 p-4 rounded-xl space-y-2">
              <span className="text-[9px] font-mono text-[#38FFB3] block uppercase tracking-widest">ECO-COMMUTER HIGHLIGHT</span>
              <h4 className="text-xs font-bold text-white">{bestRoute.mode}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{bestRoute.reason}</p>
              <div className="flex items-center gap-1.5 text-xs text-white font-mono pt-2">
                <Clock className="w-4 h-4 text-[#4FD1FF]" />
                <span>{bestRoute.eta}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-gray-400 bg-white/[0.01] p-3 rounded-lg border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-[#38FFB3]" />
              <span>{bestRoute.savings}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-gray-500">
            STADIUM FOOTPRINT DIRECTIVES: FIFA World Cup Net Zero Loop
          </div>
        </div>

      </div>

      {/* Parking space tracking */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <h3 className="text-xs uppercase font-mono tracking-wider text-gray-400">Perimeter Smart Parking Occupancies</h3>
          <span className="text-[10px] font-mono text-gray-500">ULTRASONIC IoT SENSORS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {parkingLots.map((p) => (
            <div key={p.lot} className="p-4 bg-[#070B17]/40 border border-white/5 rounded-xl space-y-1.5">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-white">{p.lot}</h4>
                <span className={`text-[10px] font-mono font-bold ${
                  p.status.includes('FULL') ? 'text-[#FF4D6D]' : 'text-gray-400'
                }`}>{p.status}</span>
              </div>
              <span className="text-[10px] text-[#38FFB3] font-mono block">{p.spaces}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
