import React from 'react';
import { ActiveView } from '../types';
import { 
  LayoutDashboard, 
  Map, 
  Flame, 
  Languages, 
  AlertOctagon, 
  Accessibility, 
  Search, 
  Bus, 
  LineChart, 
  Brain, 
  Settings,
  ChevronLeft,
  Home
} from 'lucide-react';

interface SidebarProps {
  activeView: ActiveView;
  onChangeView: (view: ActiveView) => void;
  pendingAlertsCount: number;
}

interface MenuItem {
  id: ActiveView;
  name: string;
  icon: React.ComponentType<any>;
  badge?: number;
  highlight?: boolean;
}

export default function Sidebar({ activeView, onChangeView, pendingAlertsCount }: SidebarProps) {
  const menuItems: MenuItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'navigator', name: 'AI Navigator', icon: Map },
    { id: 'crowd', name: 'Crowd Heatmap', icon: Flame },
    { id: 'translator', name: 'AI Translator', icon: Languages },
    { id: 'emergency', name: 'Emergency Assist', icon: AlertOctagon, badge: pendingAlertsCount > 0 ? pendingAlertsCount : undefined },
    { id: 'accessibility', name: 'Accessibility Assistant', icon: Accessibility },
    { id: 'lostfound', name: 'Lost & Found AI', icon: Search },
    { id: 'transport', name: 'Smart Transport', icon: Bus },
    { id: 'operational', name: 'Operational Intelligence', icon: LineChart },
    { id: 'decision', name: 'AI Decision Center', icon: Brain, highlight: true },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-[#070B17] to-[#0A1428] border-r border-white/10 flex flex-col justify-between select-none shrink-0 h-full">
      {/* Platform Branding */}
      <div>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-[#4FD1FF] flex items-center justify-center shadow-[0_0_15px_rgba(79,209,255,0.4)]">
              <svg className="w-5 h-5 text-[#070B17]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tighter text-white uppercase leading-none">STADIUMOS AI</h2>
              <span className="text-[9px] text-[#38FFB3] font-mono tracking-widest block uppercase opacity-90">SYS_STATUS: ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Tactical Modules */}
        <div className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
          <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase px-3 block mb-2 font-bold">TACTICAL MODULES</span>
          
          <button
            onClick={() => onChangeView('landing')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200 uppercase tracking-wider"
          >
            <Home className="w-4 h-4 text-white/40" />
            <span>Landing Page</span>
          </button>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 tracking-wider uppercase ${
                  isActive 
                    ? item.highlight 
                      ? 'bg-[#7C5CFF]/10 text-white border border-[#7C5CFF]/30 shadow-[inset_0_0_10px_rgba(124,92,255,0.15),0_0_12px_rgba(124,92,255,0.1)]'
                      : 'bg-[#4FD1FF]/10 text-[#4FD1FF] border border-[#4FD1FF]/30 shadow-[inset_0_0_10px_rgba(79,209,255,0.1)]'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? item.highlight ? 'text-[#7C5CFF]' : 'text-[#4FD1FF]' : 'text-white/40'}`} />
                  <span className={item.highlight ? 'font-black' : ''}>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="bg-[#FF4D6D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Security Context & System Log */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[9px] font-mono font-bold text-white/40">
            <span>SECURE SYSTEM TUNNEL</span>
            <span className="text-[#38FFB3] shadow-[0_0_8px_#38FFB3]">98.4%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-[#4FD1FF] to-[#38FFB3] w-[98.4%]" />
          </div>
          <p className="text-[8px] font-mono text-white/20 uppercase text-center leading-tight tracking-wider">
            STADIO REVENUE // OPERATIONS SHIELDED
          </p>
        </div>
      </div>
    </aside>
  );
}
