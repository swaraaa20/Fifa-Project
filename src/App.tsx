/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Types & Data
import { ActiveView, MatchInfo, SimulationState, LiveActivity, ProactiveAlert } from './types';
import { 
  WORLD_CUP_MATCHES, 
  INITIAL_SIM_STATE, 
  INITIAL_ALERTS, 
  INITIAL_FEED 
} from './data/mockData';

// Modular Sub-Components
import HeroSection from './components/HeroSection';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import StadiumNavigator from './components/StadiumNavigator';
import CrowdHeatmap from './components/CrowdHeatmap';
import AITranslator from './components/AITranslator';
import EmergencyAssist from './components/EmergencyAssist';
import AccessibilityAssistant from './components/AccessibilityAssistant';
import LostFoundAI from './components/LostFoundAI';
import SmartTransport from './components/SmartTransport';
import OperationalIntelligence from './components/OperationalIntelligence';
import AIDecisionCenter from './components/AIDecisionCenter';
import SettingsView from './components/SettingsView';
import LiveChatbot from './components/LiveChatbot';

import { Bell, Shield, Cpu, Sparkles, User, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('landing');
  const [currentMatch, setCurrentMatch] = useState<MatchInfo>(WORLD_CUP_MATCHES[0]);
  const [simulationInterval, setSimulationInterval] = useState<number>(8000); // 8s
  const [simState, setSimState] = useState<SimulationState>(INITIAL_SIM_STATE);
  const [feed, setFeed] = useState<LiveActivity[]>(INITIAL_FEED);
  const [alerts, setAlerts] = useState<ProactiveAlert[]>(INITIAL_ALERTS);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Simulation loop
  useEffect(() => {
    if (simulationInterval === 0) return;

    const interval = setInterval(() => {
      // Fluctuate states realistically
      setSimState((prev) => {
        const attChange = Math.floor(Math.random() * 41) - 20; // +/- 20 spectators
        const densityChange = Math.floor(Math.random() * 5) - 2; // +/- 2%
        const powerChange = (Math.random() * 0.4) - 0.2; // +/- 0.2 MW
        const waterChange = Math.floor(Math.random() * 11) - 5; // +/- 5 k-liters
        const wasteChange = (Math.random() * 0.2) - 0.1; // +/- 0.1 tons
        
        return {
          ...prev,
          currentAttendance: Math.min(Math.max(prev.currentAttendance + attChange, 75000), 82500),
          crowdDensity: Math.min(Math.max(prev.crowdDensity + densityChange, 60), 96),
          powerUsage: Math.min(Math.max(prev.powerUsage + powerChange, 10.5), 14.8),
          waterConsumption: Math.min(Math.max(prev.waterConsumption + waterChange, 350), 480),
          wasteCollection: Math.min(Math.max(prev.wasteCollection + wasteChange, 11), 18),
          carbonFootprint: prev.carbonFootprint + 8 // 8kg saved per refresh
        };
      });

      // Randomly inject new live feeds to make the board look alive
      const possibleFeeds = [
        "AI adjusted Sector 2 HVAC level. Saved 45kW power draw.",
        "Transit loop update: Line 2 Metro fleet frequency upgraded to 2.5m.",
        "Cleanliness team completed scheduled sweep of Level 1 South restrooms.",
        "Volunteer dispatch: Stationed 15 standby guides at East Plaza crossing.",
        "Atmospheric monitoring: Doppler grids scanning local thunder cells.",
        "Lost item recovered at VIP booth section. Sent ASL confirmation stream."
      ];

      const chosenFeed = possibleFeeds[Math.floor(Math.random() * possibleFeeds.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const newFeedItem: LiveActivity = {
        id: `feed-${Date.now()}`,
        timestamp: timeStr,
        message: chosenFeed,
        type: 'info',
        category: 'System Autonomous'
      };

      setFeed((prev) => [newFeedItem, ...prev.slice(0, 15)]);

    }, simulationInterval);

    return () => clearInterval(interval);
  }, [simulationInterval]);

  // Execute proactive recommendation
  const handleExecuteAlert = (id: string) => {
    setAlerts((current) => 
      current.map((alert) => 
        alert.id === id ? { ...alert, status: 'DISPATCHED' } : alert
      )
    );

    const alertItem = alerts.find(a => a.id === id);
    if (alertItem) {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const dispatchLog: LiveActivity = {
        id: `feed-${Date.now()}`,
        timestamp: timeStr,
        message: `Operator approved: Deployed "${alertItem.recommendedAction}". Mitigating threat.`,
        type: 'success',
        category: 'Dispatch Action'
      };

      setFeed(prev => [dispatchLog, ...prev]);
    }
  };

  const pendingAlerts = alerts.filter(a => a.status === 'PENDING');

  // Render Tactical Views
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardOverview 
            simState={simState} 
            feed={feed} 
            alerts={alerts} 
            onExecuteAlert={handleExecuteAlert} 
          />
        );
      case 'navigator':
        return <StadiumNavigator />;
      case 'crowd':
        return <CrowdHeatmap />;
      case 'translator':
        return <AITranslator />;
      case 'emergency':
        return <EmergencyAssist />;
      case 'accessibility':
        return <AccessibilityAssistant />;
      case 'lostfound':
        return <LostFoundAI />;
      case 'transport':
        return <SmartTransport />;
      case 'operational':
        return <OperationalIntelligence simState={simState} />;
      case 'decision':
        return <AIDecisionCenter />;
      case 'settings':
        return (
          <SettingsView 
            currentMatch={currentMatch} 
            onSelectMatch={setCurrentMatch} 
            simulationInterval={simulationInterval} 
            onChangeInterval={setSimulationInterval} 
          />
        );
      default:
        return (
          <DashboardOverview 
            simState={simState} 
            feed={feed} 
            alerts={alerts} 
            onExecuteAlert={handleExecuteAlert} 
          />
        );
    }
  };

  // If on landing, show pure immersive experience
  if (activeView === 'landing') {
    return (
      <HeroSection 
        onLaunch={() => setActiveView('dashboard')} 
        onWatchDemo={() => setActiveView('dashboard')} 
      />
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#070B17] overflow-hidden text-white font-sans flex-col">
      
      <div className="flex flex-1 overflow-hidden w-full">
        {/* Sidebar Control Deck */}
        <Sidebar 
          activeView={activeView} 
          onChangeView={setActiveView} 
          pendingAlertsCount={pendingAlerts.length} 
        />

        {/* Main Terminal Workspace */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          {/* Tactical Top Bar / Header */}
          <header className="h-16 border-b border-white/10 bg-gradient-to-r from-[#070B17] to-[#0A1428] backdrop-blur-xl px-6 flex justify-between items-center select-none shrink-0 z-20">
            
            {/* Logo and App Title */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded bg-[#4FD1FF] flex items-center justify-center shadow-[0_0_15px_rgba(79,209,255,0.4)]">
                <svg className="w-5 h-5 text-[#070B17]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <div className="hidden lg:block">
                <h1 className="text-sm font-black tracking-tighter leading-none uppercase">STADIUMOS AI</h1>
                <p className="text-[9px] text-[#4FD1FF] font-mono tracking-widest uppercase opacity-70">Multi-Agent Intel Platform</p>
              </div>
              
              <div className="h-6 w-px bg-white/10 hidden lg:block"></div>

              {/* Current Live Match summary */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#FF4D6D]/15 border border-[#FF4D6D]/30 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold text-[#FF4D6D]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D6D] animate-ping" />
                  <span>{currentMatch.status.toUpperCase()}</span>
                </div>
                
                <div className="space-y-0.5">
                  <h3 className="text-xs font-black text-white tracking-wide uppercase">
                    {currentMatch.teams} <span className="text-[#38FFB3] font-mono ml-1">{currentMatch.score}</span>
                  </h3>
                  <span className="text-[9px] text-white/40 font-mono block uppercase">
                    {currentMatch.stadium} // TIME: {currentMatch.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Autonomous Status Indicators */}
            <div className="flex items-center gap-6">
              <div className="hidden xl:flex items-center gap-2 border border-[#38FFB3]/20 bg-[#38FFB3]/5 px-3 py-1.5 rounded text-[9px] font-mono font-bold text-[#38FFB3]">
                <Shield className="w-3.5 h-3.5 text-[#38FFB3]" />
                <span>STADIUM SECURE (OK)</span>
              </div>

              <div className="hidden xl:flex items-center gap-2 border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 rounded text-[9px] font-mono font-bold text-[#4FD1FF]">
                <Cpu className="w-3.5 h-3.5 text-[#4FD1FF] animate-pulse" />
                <span>SWARM ACTIVE</span>
              </div>

              {/* Notification triggers */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all"
                >
                  <Bell className="w-4 h-4 text-gray-300" />
                  {pendingAlerts.length > 0 && (
                    <span className="absolute top-[-2px] right-[-2px] h-2.5 w-2.5 rounded-full bg-[#FF4D6D] border-2 border-[#0a0f24] animate-bounce" />
                  )}
                </button>

                {/* Notification dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2.5 w-80 bg-[#0a0f24] border border-white/10 rounded p-4 shadow-2xl space-y-3 z-50"
                    >
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-[9px] font-mono text-gray-400">ACTIVE PROACTIVE THREATS</span>
                        <span className="text-[9px] text-[#FF4D6D] font-mono font-bold">{pendingAlerts.length} LOGS</span>
                      </div>

                      <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                        {pendingAlerts.length === 0 ? (
                          <p className="text-[9px] text-gray-500 font-mono text-center py-4">No active threat bounds detected.</p>
                        ) : (
                          pendingAlerts.map(alert => (
                            <div 
                              key={alert.id}
                              onClick={() => {
                                setActiveView('dashboard');
                                setShowNotifications(false);
                              }}
                              className="p-2.5 bg-white/[0.02] border border-white/10 hover:border-white/20 rounded cursor-pointer transition-all text-left"
                            >
                              <h4 className="text-xs font-bold text-white">{alert.title}</h4>
                              <span className="text-[9px] text-[#FFB800] font-mono mt-1 block">Requires confirmation →</span>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile trigger */}
              <div className="flex h-9 w-9 items-center justify-center rounded bg-gradient-to-tr from-[#7C5CFF] to-[#4FD1FF] p-[1.5px]">
                <div className="flex h-full w-full items-center justify-center rounded bg-[#070B17]">
                  <User className="w-4 h-4 text-[#4FD1FF]" />
                </div>
              </div>

            </div>

          </header>

          {/* View stage wrapper */}
          <main className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#070B17]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>

      {/* FOOTER STATS TICKER */}
      <footer className="h-8 border-t border-white/10 bg-black/40 flex items-center px-6 overflow-hidden select-none shrink-0 z-20">
        <div className="flex items-center gap-6 whitespace-nowrap overflow-hidden w-full">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-black uppercase text-white/30 tracking-widest">System Logic:</span>
            <span className="text-[9px] font-mono flex items-center gap-1 text-white/70">
              OBSERVE <span className="text-white/20">→</span> REASON <span className="text-white/20">→</span> PLAN <span className="text-white/20">→</span> ACT <span className="text-white/20">→</span> LEARN
            </span>
          </div>
          <div className="h-3 w-px bg-white/10"></div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-[#38FFB3]">WEATHER: 24°C CLEAR</span>
            <span className="text-[9px] font-mono text-white/40">WIND: 4.2 km/h</span>
            <span className="text-[9px] font-mono text-white/40">HUMIDITY: 45%</span>
          </div>
          <div className="h-3 w-px bg-white/10"></div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-[#4FD1FF]">NETWORK: 5.4 Gbps</span>
            <span className="text-[9px] font-mono text-[#38FFB3]">SECURITY: OPTIMAL</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[8px] font-mono text-white/20">UID:WC2026-STAD-001-ALPHA</span>
          </div>
        </div>
      </footer>

      {/* FLOATING TACTICAL AI CHATBOT */}
      <LiveChatbot />

    </div>
  );
}
