import { motion, AnimatePresence } from 'motion/react';
import { SimulationState, LiveActivity, ProactiveAlert } from '../types';
import { 
  Users, 
  Activity, 
  ShieldAlert, 
  UserCheck, 
  Bus, 
  Brain, 
  ArrowUpRight, 
  Clock, 
  CheckCircle,
  ExternalLink,
  Check
} from 'lucide-react';

interface DashboardOverviewProps {
  simState: SimulationState;
  feed: LiveActivity[];
  alerts: ProactiveAlert[];
  onExecuteAlert: (id: string) => void;
}

export default function DashboardOverview({ simState, feed, alerts, onExecuteAlert }: DashboardOverviewProps) {
  
  const getEmergencyColor = (status: SimulationState['emergencyStatus']) => {
    if (status === 'CLEAR') return 'text-[#38FFB3] bg-[#38FFB3]/10 border-[#38FFB3]/30 shadow-[0_0_10px_rgba(56,255,179,0.15)]';
    if (status === 'ELEVATED') return 'text-[#FFB800] bg-[#FFB800]/10 border-[#FFB800]/30 shadow-[0_0_10px_rgba(255,184,0,0.15)]';
    return 'text-[#FF4D6D] bg-[#FF4D6D]/10 border-[#FF4D6D]/30 shadow-[0_0_10px_rgba(255,77,109,0.15)]';
  };

  const getTransportColor = (status: SimulationState['publicTransportStatus']) => {
    if (status === 'OPTIMAL') return 'text-[#38FFB3] bg-[#38FFB3]/10 border-[#38FFB3]/30 shadow-[0_0_10px_rgba(56,255,179,0.15)]';
    if (status === 'MODERATE') return 'text-[#FFB800] bg-[#FFB800]/10 border-[#FFB800]/30 shadow-[0_0_10px_rgba(255,184,0,0.15)]';
    return 'text-[#FF4D6D] bg-[#FF4D6D]/10 border-[#FF4D6D]/30 shadow-[0_0_10px_rgba(255,77,109,0.15)]';
  };

  const activeAlerts = alerts.filter(a => a.status === 'PENDING');
  const dispatchedAlerts = alerts.filter(a => a.status === 'DISPATCHED');

  return (
    <div className="space-y-6">
      
      {/* Simulation Telemetry Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* Attendance */}
        <div className="bg-[#0A1428]/60 border border-white/10 rounded p-4 flex flex-col justify-between hover:border-[#4FD1FF]/40 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-white/50 font-mono tracking-widest uppercase font-bold">Attendance</span>
            <div className="p-1.5 rounded bg-[#4FD1FF]/10 text-[#4FD1FF] border border-[#4FD1FF]/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black font-mono tracking-tight text-white">{simState.currentAttendance.toLocaleString()}</h3>
            <span className="text-[9px] text-[#4FD1FF] font-mono tracking-wider block opacity-70">LIVE COUNT // ACTIVE</span>
          </div>
        </div>

        {/* Density */}
        <div className="bg-[#0A1428]/60 border border-white/10 rounded p-4 flex flex-col justify-between hover:border-[#7C5CFF]/40 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-white/50 font-mono tracking-widest uppercase font-bold">Crowd Density</span>
            <div className="p-1.5 rounded bg-[#7C5CFF]/10 text-[#7C5CFF] border border-[#7C5CFF]/20">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black font-mono tracking-tight text-white">{simState.crowdDensity}%</h3>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-1.5 overflow-hidden border border-white/5">
              <div className="bg-gradient-to-r from-[#4FD1FF] to-[#7C5CFF] h-full" style={{ width: `${simState.crowdDensity}%` }} />
            </div>
          </div>
        </div>

        {/* Emergency status */}
        <div className="bg-[#0A1428]/60 border border-white/10 rounded p-4 flex flex-col justify-between hover:border-[#FF4D6D]/40 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-white/50 font-mono tracking-widest uppercase font-bold">Emergency Status</span>
            <div className="p-1.5 rounded bg-[#FF4D6D]/10 text-[#FF4D6D] border border-[#FF4D6D]/20">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className={`inline-block px-2.5 py-1 rounded text-xs font-mono font-black border uppercase tracking-wider ${getEmergencyColor(simState.emergencyStatus)}`}>
              {simState.emergencyStatus}
            </span>
            <span className="text-[9px] text-white/30 font-mono block mt-2 tracking-wider">SYS SHIELD CONTROL</span>
          </div>
        </div>

        {/* Volunteer headcount */}
        <div className="bg-[#0A1428]/60 border border-white/10 rounded p-4 flex flex-col justify-between hover:border-[#38FFB3]/40 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-white/50 font-mono tracking-widest uppercase font-bold">Volunteers</span>
            <div className="p-1.5 rounded bg-[#38FFB3]/10 text-[#38FFB3] border border-[#38FFB3]/20">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black font-mono tracking-tight text-white">{simState.volunteerAvailability}</h3>
            <span className="text-[9px] text-[#38FFB3] font-mono block tracking-wider uppercase opacity-80">DEPLOYED / ON-STANDBY</span>
          </div>
        </div>

        {/* Transport system status */}
        <div className="bg-[#0A1428]/60 border border-white/10 rounded p-4 flex flex-col justify-between hover:border-[#FFB800]/40 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-white/50 font-mono tracking-widest uppercase font-bold">Transit Status</span>
            <div className="p-1.5 rounded bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20">
              <Bus className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className={`inline-block px-2.5 py-1 rounded text-xs font-mono font-black border uppercase tracking-wider ${getTransportColor(simState.publicTransportStatus)}`}>
              {simState.publicTransportStatus}
            </span>
            <span className="text-[9px] text-white/30 font-mono block mt-2 tracking-wider">METRO + SHUTTLE NETS</span>
          </div>
        </div>

        {/* Confidence rating */}
        <div className="bg-[#0A1428]/60 border border-white/10 rounded p-4 flex flex-col justify-between hover:border-[#4FD1FF]/40 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-white/50 font-mono tracking-widest uppercase font-bold">AI Confidence</span>
            <div className="p-1.5 rounded bg-[#4FD1FF]/10 text-[#4FD1FF] border border-[#4FD1FF]/20">
              <Brain className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black font-mono text-[#4FD1FF] tracking-tight shadow-[0_0_10px_rgba(79,209,255,0.15)]">{simState.aiConfidenceScore}%</h3>
            <span className="text-[9px] text-[#38FFB3] font-mono block tracking-wider uppercase">AUTONOMOUS GAINS</span>
          </div>
        </div>

      </div>

      {/* Main Layout Area: Proactive AI Recommended actions + Live feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Proactive Actions Pane */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#4FD1FF] animate-pulse shadow-[0_0_8px_#4FD1FF]" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-white/70 font-bold">Proactive Recommendations</h2>
            </div>
            <span className="text-[10px] font-mono text-white/40 uppercase font-bold">{activeAlerts.length} PENDING DECISIONS</span>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {activeAlerts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#0A1428]/40 border border-dashed border-white/10 rounded p-8 text-center"
                >
                  <p className="text-xs text-white/50 font-mono tracking-wider">ALL THREATS & OPERATIONAL BOUNDS STABILIZED.</p>
                  <p className="text-[10px] text-white/30 font-mono mt-1 tracking-wider uppercase">AI AGENTS STANDING BY TO REASON LIVE.</p>
                </motion.div>
              ) : (
                activeAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    layoutId={alert.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden bg-[#0A1428]/80 border border-white/10 rounded p-5 shadow-xl hover:border-white/20 transition-all duration-300"
                  >
                    {/* Visual accent left line */}
                    <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                      alert.severity === 'high' ? 'bg-[#FF4D6D] shadow-[0_0_12px_#FF4D6D]' : 'bg-[#FFB800] shadow-[0_0_12px_#FFB800]'
                    }`} />

                    <div className="pl-3 flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded border ${
                            alert.severity === 'high' 
                              ? 'bg-[#FF4D6D]/15 text-[#FF4D6D] border-[#FF4D6D]/30' 
                              : 'bg-[#FFB800]/15 text-[#FFB800] border-[#FFB800]/30'
                          }`}>
                            {alert.type}
                          </span>
                          <span className="text-[10px] text-white/40 font-mono font-bold">{alert.timestamp}</span>
                        </div>
                        <h4 className="text-sm font-black text-white uppercase tracking-tight">{alert.title}</h4>
                        <p className="text-xs text-white/60 leading-relaxed font-sans">{alert.description}</p>
                        
                        <div className="mt-4 bg-[#070B17] border border-white/10 rounded p-3.5 space-y-1.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
                          <span className="text-[9px] font-mono text-[#38FFB3] font-black uppercase tracking-widest block">RECOMMENDED TACTICAL ACTION // AUTO-REASONED</span>
                          <p className="text-xs text-white/80 font-sans leading-relaxed">{alert.recommendedAction}</p>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-end shrink-0 min-w-[150px] text-right">
                        <div className="space-y-1 w-full">
                          <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-bold">SYSTEM METRIC</div>
                          <div className="text-xs font-black font-mono text-[#38FFB3] flex items-center justify-end gap-1 uppercase">
                            <Clock className="w-3.5 h-3.5 text-[#38FFB3]" />
                            <span>+{alert.estimatedTimeSaved}m saved</span>
                          </div>
                          {alert.eta && (
                            <div className="text-[9px] font-mono text-white/40 tracking-wider">
                              EST. DISPATCH: <span className="text-[#4FD1FF] font-bold">{alert.eta}</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => onExecuteAlert(alert.id)}
                          className="mt-4 md:mt-0 w-full flex items-center justify-center gap-2 bg-[#4FD1FF]/10 border border-[#4FD1FF]/30 hover:bg-[#4FD1FF] hover:text-[#070B17] px-4 py-2 rounded text-xs font-bold text-[#4FD1FF] transition-all duration-200 uppercase tracking-wider cursor-pointer shadow-[inset_0_0_8px_rgba(79,209,255,0.1)]"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Act</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {dispatchedAlerts.length > 0 && (
            <div className="pt-4">
              <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block mb-3 font-bold">DISPATCHED AND RESOLVING</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dispatchedAlerts.map((alert) => (
                  <div key={alert.id} className="bg-[#0A1428]/40 border border-white/10 rounded p-4 flex justify-between items-center shadow-lg">
                    <div className="space-y-1">
                      <h5 className="text-xs font-black text-white/80 uppercase tracking-tight">{alert.title}</h5>
                      <span className="text-[9px] text-[#38FFB3] font-mono flex items-center gap-1.5 uppercase tracking-wide">
                        <CheckCircle className="w-3 h-3 text-[#38FFB3]" />
                        <span>Action deployed & resolving</span>
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#38FFB3] font-bold">-{alert.estimatedTimeSaved}m</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live AI Activity Feed */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#38FFB3] animate-ping shadow-[0_0_8px_#38FFB3]" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-white/70 font-bold">Live AI Feed</h2>
            </div>
            <span className="text-[10px] font-mono text-white/40 uppercase font-bold">INTELLIGENCE LOG</span>
          </div>

          <div className="bg-[#0A1428]/60 border border-white/10 rounded p-4 h-[480px] overflow-y-auto space-y-3.5 custom-scrollbar shadow-2xl">
            <AnimatePresence initial={false}>
              {feed.map((item) => {
                const getFeedBulletColor = (type: LiveActivity['type']) => {
                  if (type === 'critical') return 'bg-[#FF4D6D] shadow-[0_0_8px_rgba(255,77,109,0.7)] border border-[#FF4D6D]/30';
                  if (type === 'warning') return 'bg-[#FFB800] shadow-[0_0_8px_rgba(255,184,0,0.7)] border border-[#FFB800]/30';
                  if (type === 'success') return 'bg-[#38FFB3] shadow-[0_0_8px_rgba(56,255,179,0.7)] border border-[#38FFB3]/30';
                  if (type === 'action') return 'bg-[#4FD1FF] shadow-[0_0_8px_rgba(79,209,255,0.7)] border border-[#4FD1FF]/30';
                  return 'bg-white/30 border border-white/10';
                };

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -15, y: -5 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3 border-b border-white/5 pb-3.5 last:border-0"
                  >
                    <div className="pt-1">
                      <div className={`h-2.5 w-2.5 rounded-full mt-1 ${getFeedBulletColor(item.type)}`} />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex justify-between items-center text-[9px] font-mono">
                        <span className="text-white/40 font-black uppercase tracking-wider">{item.category}</span>
                        <span className="text-white/30 font-bold">{item.timestamp}</span>
                      </div>
                      <p className="text-xs text-white/80 font-sans leading-relaxed">{item.message}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
