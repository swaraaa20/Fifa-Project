import { SimulationState } from '../types';
import { LineChart, Zap, Droplet, Trash2, ShieldAlert, Award, FileText } from 'lucide-react';

interface OperationalIntelligenceProps {
  simState: SimulationState;
}

export default function OperationalIntelligence({ simState }: OperationalIntelligenceProps) {
  
  const operationalBrief = `MetLife Stadium operates at optimal thermodynamic bounds. A proactive HVAC ceiling adjustment in Section D saved ${Math.round(simState.powerUsage * 10)} kW of active peak load, while water usage maintains healthy municipal recovery bounds across Level 2 concession facilities. Recycle rates reflect high organic waste capture.`;

  return (
    <div className="space-y-6">
      
      {/* Upper metrics dashboard grids */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Power usage */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">Power Grid Load</span>
            <Zap className="w-4 h-4 text-[#FFB800]" />
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold font-mono tracking-tight">{simState.powerUsage.toFixed(1)} MW</h3>
            <span className="text-[10px] text-[#38FFB3] font-mono block">NORMAL STEADY STATE</span>
          </div>
        </div>

        {/* Water consumption */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">Water Consumption</span>
            <Droplet className="w-4 h-4 text-[#4FD1FF]" />
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold font-mono tracking-tight">{simState.waterConsumption} k-Liters</h3>
            <span className="text-[10px] text-gray-500 font-mono block">MUNICIPAL INLET OK</span>
          </div>
        </div>

        {/* Waste Collection */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">Recycled Waste Tonnage</span>
            <Trash2 className="w-4 h-4 text-[#38FFB3]" />
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold font-mono tracking-tight">{simState.wasteCollection.toFixed(1)} Tons</h3>
            <span className="text-[10px] text-gray-500 font-mono block">ORGANIC CAPSULE SORT</span>
          </div>
        </div>

        {/* Medical Traumas */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">Medical Traumas Logged</span>
            <ShieldAlert className="w-4 h-4 text-[#FF4D6D]" />
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold font-mono tracking-tight">{simState.medicalIncidents} Cases</h3>
            <span className="text-[10px] text-gray-500 font-mono block">ALL RESOLVED OR STABLE</span>
          </div>
        </div>

      </div>

      {/* Main operational summaries & charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Executive operational summary brief */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <FileText className="w-5 h-5 text-[#4FD1FF]" />
              <h3 className="text-sm font-bold text-white">AI-Generated Operational Summary</h3>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed bg-[#070B17]/40 p-4 rounded-xl border border-white/5">
              {operationalBrief}
            </p>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-gray-500 uppercase block">Active Sustainability Metrics</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                  <span className="text-[10px] text-gray-500 block">CARBON OFFSET TOTAL</span>
                  <span className="text-sm font-bold font-mono text-[#38FFB3]">{simState.carbonFootprint.toLocaleString()} kg CO2</span>
                </div>
                <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                  <span className="text-[10px] text-gray-500 block">GREEN ENERGY CAPTURE</span>
                  <span className="text-sm font-bold font-mono text-[#4FD1FF]">34.2% Grid Total</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 mt-4 text-[10px] text-gray-500 font-mono">
            STADIUMOS EXECUTIVE HUD // DEEPMIND CONTEXT SEED
          </div>
        </div>

        {/* Performance and Volunteer efficiency charts */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#38FFB3]">
              <Award className="w-5 h-5 text-[#38FFB3]" />
              <h3 className="text-sm font-bold">Volunteer Dispatch Efficiencies</h3>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Section 104 Crowd Management</span>
                  <span className="font-mono text-[#38FFB3]">94%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#38FFB3] w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Emergency Response Response times</span>
                  <span className="font-mono text-[#4FD1FF]">98%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4FD1FF] w-[98%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Multilingual Signage Deployment</span>
                  <span className="font-mono text-[#7C5CFF]">87%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#7C5CFF] w-[87%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-[10px] text-gray-500 font-mono">
            UPDATED: Real-time telemetry cycles
          </div>
        </div>

      </div>

    </div>
  );
}
