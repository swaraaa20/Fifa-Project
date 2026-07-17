import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Phone, Clock, UserCheck, AlertOctagon, Heart, CheckCircle } from 'lucide-react';
import { IncidentTimelineItem } from '../types';

export default function EmergencyAssist() {
  const [sosActive, setSosActive] = useState(false);
  const [sosSuccess, setSosSuccess] = useState(false);
  
  const [timeline, setTimeline] = useState<IncidentTimelineItem[]>([
    { id: '1', time: '15:16', event: 'Spectator reported dizziness & disorientation near Section D.', status: 'logged' },
    { id: '2', time: '15:17', event: 'AI identified heat fatigue risk factor; flagged Sector 4 Trauma Team.', status: 'dispatched' },
    { id: '3', time: '15:18', event: 'Sector 4 Medical Response Team dispatched with hydration packs.', status: 'active' },
  ]);

  const contacts = [
    { name: 'Stadium Security Control', role: 'Primary On-Site', phone: '+1 (800) 555-0199', type: 'security' },
    { name: 'Sector 4 Medical Lead', role: 'Trauma Specialist', phone: '+1 (800) 555-0240', type: 'medical' },
    { name: 'Local Fire Marshal', role: 'Structural Safety', phone: '+1 (800) 555-0112', type: 'fire' },
    { name: 'Evacuation Coordinator', role: 'Command Center', phone: '+1 (800) 555-0145', type: 'command' }
  ];

  const handleSOS = () => {
    setSosActive(true);
    setTimeout(() => {
      setSosActive(false);
      setSosSuccess(true);
      // Append item to timeline
      setTimeline(prev => [
        {
          id: Date.now().toString(),
          time: '15:20',
          event: 'Critical SOS Multi-channel beacon triggered. Secondary fire safety teams mobilized.',
          status: 'dispatched'
        },
        ...prev
      ]);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Large SOS Pulse Button */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between items-center text-center">
          <div className="space-y-1.5 w-full">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">TACTICAL BEACON GATEWAY</span>
            <h3 className="text-sm font-bold text-white">Direct SOS Multi-Broadcast</h3>
          </div>

          <div className="py-8 relative flex items-center justify-center">
            {/* Pulsing Backing circles */}
            <div className="absolute h-40 w-40 rounded-full bg-[#FF4D6D]/10 animate-ping" />
            <div className="absolute h-32 w-32 rounded-full bg-[#FF4D6D]/20 animate-pulse" />
            
            <button
              onClick={handleSOS}
              disabled={sosActive}
              className={`relative h-28 w-28 rounded-full flex flex-col justify-center items-center shadow-2xl transition-transform duration-200 active:scale-95 ${
                sosActive 
                  ? 'bg-amber-600' 
                  : 'bg-gradient-to-tr from-[#FF4D6D] to-[#FF4D6D]/80 hover:shadow-[0_0_30px_rgba(255,77,109,0.5)]'
              }`}
            >
              <ShieldAlert className="w-8 h-8 text-white animate-bounce" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-white mt-1">
                {sosActive ? 'TRIGGERING...' : 'INITIATE SOS'}
              </span>
            </button>
          </div>

          <div className="w-full">
            {sosSuccess ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-xs font-mono text-[#38FFB3] animate-pulse">
                SOS BEACON SENT. RESPONSE DISPATCH TRACKED.
              </div>
            ) : (
              <p className="text-xs text-gray-500 font-mono leading-relaxed px-4">
                Press and hold to broadcast SOS signal to all field operators, EMT fleets, and perimeter commanders.
              </p>
            )}
          </div>
        </div>

        {/* Assigned Response Teams & Contacts */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-gray-400">Emergency Dispatch Directory</h3>
            <Phone className="w-4 h-4 text-gray-500" />
          </div>

          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.name} className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-3.5 rounded-xl flex justify-between items-center transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      contact.type === 'medical' ? 'bg-[#38FFB3]' : contact.type === 'security' ? 'bg-[#4FD1FF]' : 'bg-[#FF4D6D]'
                    }`} />
                    <h4 className="text-xs font-bold text-white">{contact.name}</h4>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono block">{contact.role}</span>
                </div>
                <a 
                  href={`tel:${contact.phone}`}
                  className="text-xs font-mono text-[#4FD1FF] bg-[#4FD1FF]/10 px-2.5 py-1 rounded-lg border border-[#4FD1FF]/20 hover:bg-[#4FD1FF] hover:text-[#070B17] transition-all"
                >
                  CALL SECURE
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Facilities HUD */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">NEAREST FIELD TRAUMA HUB</span>
            
            <div className="bg-[#38FFB3]/5 border border-[#38FFB3]/20 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[#38FFB3]">
                <Heart className="w-5 h-5 text-[#38FFB3]" />
                <h4 className="text-sm font-bold">Sector 3 Medical Center</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Located 120m from East Promenade. Fully staffed with trauma supervisors, triage beds, and diagnostic oxygen arrays.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase">Emergency AI Evac Strategy</span>
              <p className="text-xs text-gray-400 leading-relaxed">
                If structural evacuation is flagged, route Section 104 and Section D visitors through the secondary lower atrium loop.
              </p>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl mt-4">
            <span className="text-[9px] font-mono text-gray-500 block">ESTIMATED EVAC TIMELINE</span>
            <span className="text-xs font-bold text-[#FFB800] font-mono">6.4 minutes to complete bowl clearing</span>
          </div>
        </div>

      </div>

      {/* Incident Log Tracker Timeline */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FFB800]" />
            <h3 className="text-sm font-bold text-white">Live Incident Timeline</h3>
          </div>
          <span className="text-xs font-mono text-gray-500">REAL-TIME SECTOR LOGS</span>
        </div>

        <div className="space-y-4 relative pl-4 before:absolute before:top-1 before:bottom-1 before:left-[19px] before:w-[1px] before:bg-white/5">
          {timeline.map((item) => (
            <div key={item.id} className="relative flex flex-col md:flex-row justify-between md:items-center gap-2">
              {/* Bullet circle */}
              <div className="absolute left-[-21px] top-1 h-3 w-3 rounded-full border bg-[#070B17] border-white/20 flex items-center justify-center">
                <div className={`h-1.5 w-1.5 rounded-full ${
                  item.status === 'logged' ? 'bg-amber-400' : item.status === 'dispatched' ? 'bg-[#7C5CFF]' : 'bg-[#38FFB3]'
                }`} />
              </div>

              <div className="space-y-1 pl-4">
                <p className="text-xs font-medium text-gray-300">{item.event}</p>
                <span className="text-[9px] text-[#38FFB3] font-mono flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-[#38FFB3]" />
                  <span>Verified status: {item.status.toUpperCase()}</span>
                </span>
              </div>
              <span className="text-xs font-mono text-gray-500 whitespace-nowrap shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
