import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Navigation, 
  Search, 
  Clock, 
  Accessibility, 
  Compass, 
  Utensils, 
  Info, 
  ShieldAlert, 
  CheckCircle2,
  ChevronRight,
  Map as MapIcon,
  Layers,
  ArrowRight,
  ExternalLink,
  Sliders,
  HelpCircle,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface StadiumNode {
  id: string;
  name: string;
  type: 'gate' | 'food' | 'medical' | 'restroom' | 'shop' | 'section';
  x: number;
  y: number;
  description: string;
  recommendedRoute: string[];
  accessibleRoute: string[];
  duration: number;
  distance: string;
  crowdLevel: 'Low' | 'Moderate' | 'High';
}

const STADIUM_NODES: StadiumNode[] = [
  {
    id: 'gate-a',
    name: 'Gate A (North Entrance)',
    type: 'gate',
    x: 250,
    y: 40,
    description: 'North gate entrance with quick-pass security lines.',
    recommendedRoute: ['Section 114 Corridor', 'North-East Walkway', 'Gate A Plaza'],
    accessibleRoute: ['Central Passenger Elevator', 'North Accessible Ramp', 'Gate A ADA Gate'],
    duration: 5,
    distance: '0.22 km',
    crowdLevel: 'High'
  },
  {
    id: 'gate-b',
    name: 'Gate B (West Entrance)',
    type: 'gate',
    x: 80,
    y: 175,
    description: 'West gate near train transit link & ride-share zone.',
    recommendedRoute: ['Section 114 Corridor', 'Lower Level Concourse West', 'Gate B Underpass'],
    accessibleRoute: ['Elevator 4B', 'West Accessible Ramp', 'Gate B ADA Entrance'],
    duration: 7,
    distance: '0.31 km',
    crowdLevel: 'Moderate'
  },
  {
    id: 'gate-c',
    name: 'Gate C (East Entrance)',
    type: 'gate',
    x: 420,
    y: 175,
    description: 'Main eastern entrance with expansive outdoor plaza.',
    recommendedRoute: ['Section 114 Corridor', 'East Promenade Escalators', 'Gate C Outer Plaza'],
    accessibleRoute: ['Elevator 4B', 'East Accessible Ramp', 'Gate C ADA Ramp'],
    duration: 6,
    distance: '0.24 km',
    crowdLevel: 'Low'
  },
  {
    id: 'gate-d',
    name: 'Gate D (South Entrance)',
    type: 'gate',
    x: 250,
    y: 310,
    description: 'South gate adjacent to VIP parking and coach hub.',
    recommendedRoute: ['Section 114 Corridor', 'South Outer Concourse', 'Gate D Plaza'],
    accessibleRoute: ['Elevator 4B', 'South Elevator Lift', 'Gate D ADA Access'],
    duration: 8,
    distance: '0.36 km',
    crowdLevel: 'Low'
  },
  {
    id: 'food-hall',
    name: 'Main Food Hall (Level 2)',
    type: 'food',
    x: 250,
    y: 100,
    description: 'Central dining concourse with various snacks and drinks.',
    recommendedRoute: ['North Escalators', 'Food Concourse A', 'Main Dining Pavilion'],
    accessibleRoute: ['Central Passenger Elevator', 'Level 2 ADA Pathway', 'Food Concourse ADA gate'],
    duration: 4,
    distance: '0.15 km',
    crowdLevel: 'High'
  },
  {
    id: 'medical-3',
    name: 'Sector 3 Medical Center',
    type: 'medical',
    x: 140,
    y: 115,
    description: 'Emergency medical station with paramedics.',
    recommendedRoute: ['West Gate Access Tunnel', 'Emergency Medical Lane', 'Sector 3 Station'],
    accessibleRoute: ['West Grade-Level Walkway', 'Accessible Entrance 1', 'Medical Station A'],
    duration: 3,
    distance: '0.12 km',
    crowdLevel: 'Moderate'
  },
  {
    id: 'vip-lounge',
    name: 'VIP Suites Lounge',
    type: 'shop',
    x: 360,
    y: 115,
    description: 'Premium hospitality suites and panoramic overlook lounge.',
    recommendedRoute: ['Suites Private Elevator', 'Level 3 Suite Gallery', 'Suites Main Entrance'],
    accessibleRoute: ['Suites VIP ADA Elevator', 'ADA Concourse Pathway', 'Suite Wheelchair Seats'],
    duration: 5,
    distance: '0.19 km',
    crowdLevel: 'Low'
  },
  {
    id: 'restroom-north',
    name: 'North Concourse Restroom',
    type: 'restroom',
    x: 150,
    y: 235,
    description: 'All-gender restrooms, baby changing stations, fully accessible.',
    recommendedRoute: ['Section 114 Corridor', 'Lower Concourse West Loop', 'North Restroom corridor'],
    accessibleRoute: ['Level 1 flat corridor', 'ADA family restroom entrance'],
    duration: 2,
    distance: '0.08 km',
    crowdLevel: 'Moderate'
  },
  {
    id: 'restroom-south',
    name: 'South Concourse Restroom',
    type: 'restroom',
    x: 350,
    y: 235,
    description: 'Large public restrooms near South food zone.',
    recommendedRoute: ['Section 114 Corridor', 'Lower Concourse East Loop', 'South Restroom corridor'],
    accessibleRoute: ['Level 1 flat corridor', 'ADA family restroom entrance'],
    duration: 2,
    distance: '0.07 km',
    crowdLevel: 'Low'
  },
  {
    id: 'merch-store',
    name: 'Merchandise Superstore',
    type: 'shop',
    x: 250,
    y: 175,
    description: 'Official tournament store with custom kits and souvenirs.',
    recommendedRoute: ['Section 114 central walkway', 'Plaza main staircase', 'Store front gates'],
    accessibleRoute: ['Central elevators to level 1', 'Store ADA double doors'],
    duration: 3,
    distance: '0.10 km',
    crowdLevel: 'High'
  },
  {
    id: 'section-114',
    name: 'Section 114 Corridor',
    type: 'section',
    x: 320,
    y: 160,
    description: 'Main central corridor on the east side of Level 1.',
    recommendedRoute: ['Already at Section 114 Corridor'],
    accessibleRoute: ['Already at Section 114 Corridor'],
    duration: 0,
    distance: '0.00 km',
    crowdLevel: 'Moderate'
  }
];

// Mathematical path generator to wrap routes around the stadium concourse
const getPathPoints = (start: { x: number; y: number }, end: { x: number; y: number }) => {
  const cx = 250;
  const cy = 175;
  const rx = 120;
  const ry = 70;

  // Check distances to central hub
  const startDist = Math.hypot(start.x - cx, start.y - cy);
  const endDist = Math.hypot(end.x - cx, end.y - cy);

  if (startDist < 40 || endDist < 40 || (start.x === end.x && start.y === end.y)) {
    return [start, end];
  }

  const startAngle = Math.atan2(start.y - cy, start.x - cx);
  const endAngle = Math.atan2(end.y - cy, end.x - cx);

  let diff = endAngle - startAngle;
  while (diff < -Math.PI) diff += 2 * Math.PI;
  while (diff > Math.PI) diff -= 2 * Math.PI;

  const steps = 12;
  const points = [start];

  // Map starting point to the nearest point on the concourse oval
  const startOnEllipse = {
    x: cx + rx * Math.cos(startAngle),
    y: cy + ry * Math.sin(startAngle)
  };
  points.push(startOnEllipse);

  // Generate intermediate arc coordinates along the oval concourse
  for (let i = 1; i < steps; i++) {
    const angle = startAngle + (diff * i) / steps;
    points.push({
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle)
    });
  }

  // Map ending point to the nearest point on the concourse oval
  const endOnEllipse = {
    x: cx + rx * Math.cos(endAngle),
    y: cy + ry * Math.sin(endAngle)
  };
  points.push(endOnEllipse);
  points.push(end);

  return points;
};

export default function StadiumNavigator() {
  const [currentLoc, setCurrentLoc] = useState('Section 114 Corridor');
  const [destination, setDestination] = useState('Gate C (East Entrance)');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAccessible, setShowAccessible] = useState(false);
  const [pulseTrigger, setPulseTrigger] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter local destinations based on search query
  const suggestions = STADIUM_NODES.filter(node => {
    if (!searchQuery.trim()) return false;
    const query = searchQuery.toLowerCase();
    return (
      node.name.toLowerCase().includes(query) ||
      node.type.toLowerCase().includes(query) ||
      node.description.toLowerCase().includes(query)
    );
  });

  const activeStartNode = STADIUM_NODES.find(n => n.name === currentLoc) || STADIUM_NODES[10];
  const activeEndNode = STADIUM_NODES.find(n => n.name === destination) || STADIUM_NODES[2];

  const sameLocation = activeStartNode.id === activeEndNode.id;

  // Dynamic values
  const travelDuration = sameLocation 
    ? 0 
    : showAccessible 
      ? Math.ceil(activeEndNode.duration * 1.4) 
      : activeEndNode.duration;

  const travelDistance = sameLocation 
    ? '0.00 km' 
    : activeEndNode.distance;

  const crowdLevel = sameLocation ? 'Low' : activeEndNode.crowdLevel;

  const travelSteps = sameLocation 
    ? ['You are already at your destination.'] 
    : showAccessible 
      ? activeEndNode.accessibleRoute 
      : activeEndNode.recommendedRoute;

  // Handle direct map selection
  const handleMapNodeClick = (node: StadiumNode) => {
    setDestination(node.name);
    setSearchQuery(node.name);
    setShowSuggestions(false);
    setPulseTrigger(true);
    setTimeout(() => setPulseTrigger(false), 800);
  };

  // Handle dropdown selection
  const handleSelectSuggestion = (node: StadiumNode) => {
    setDestination(node.name);
    setSearchQuery(node.name);
    setShowSuggestions(false);
    setPulseTrigger(true);
    setTimeout(() => setPulseTrigger(false), 800);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelectSuggestion(suggestions[0]);
    } else {
      // Find closest fuzzy match or keep current
      const found = STADIUM_NODES.find(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()));
      if (found) {
        handleSelectSuggestion(found);
      }
    }
  };

  const quickLocs = [
    { name: 'Food Court A', dest: 'Main Food Hall (Level 2)', icon: Utensils, color: '#4FD1FF' },
    { name: 'Sector 3 Medical', dest: 'Sector 3 Medical Center', icon: Info, color: '#38FFB3' },
    { name: 'Gate C Entrance', dest: 'Gate C (East Entrance)', icon: Compass, color: '#7C5CFF' }
  ];

  // Calculated route points
  const pathPoints = getPathPoints(activeStartNode, activeEndNode);
  const dAttribute = pathPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const getNodeIconColor = (type: string) => {
    switch (type) {
      case 'gate': return '#FFB800';
      case 'food': return '#4FD1FF';
      case 'medical': return '#38FFB3';
      case 'restroom': return '#7C5CFF';
      case 'shop': return '#FF4D6D';
      default: return '#94A3B8';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'food': return <Utensils className="w-3.5 h-3.5 text-black" />;
      case 'medical': return <ShieldAlert className="w-3.5 h-3.5 text-black" />;
      case 'restroom': return <Layers className="w-3.5 h-3.5 text-black" />;
      case 'shop': return <Sparkles className="w-3.5 h-3.5 text-black" />;
      default: return <Compass className="w-3.5 h-3.5 text-black" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner explaining client-side vector mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-[#0D1630] to-[#080D1A] border border-white/5 rounded-2xl gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl flex items-center justify-center bg-[#38FFB3]/10 border border-[#38FFB3]/20 text-[#38FFB3]">
            <MapIcon className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white font-sans">Active Local Guidance Grid</h4>
              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#38FFB3]/10 text-[#38FFB3] border border-[#38FFB3]/20">
                100% Free Offline Vector
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              High-fidelity local routing network activated. Search destinations, click nodes on the interactive map, and view path overlays instantly.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Controls Left Panel */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#090F21] to-[#070B14] border border-white/5 rounded-2xl p-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-[#4FD1FF]" />
                <h3 className="text-sm font-bold tracking-tight text-white font-sans">Spectator Routing Engine</h3>
              </div>
              <span className="text-[9px] font-mono text-[#38FFB3] bg-[#38FFB3]/5 px-2 py-0.5 rounded border border-[#38FFB3]/10">LOCAL ENGINE ACTIVE</span>
            </div>

            {/* Current Location Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Current Location (Origin)</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF4D6D]" />
                <select 
                  value={currentLoc}
                  onChange={(e) => {
                    setCurrentLoc(e.target.value);
                    setPulseTrigger(true);
                    setTimeout(() => setPulseTrigger(false), 800);
                  }}
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-[#4FD1FF]/50 rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-white outline-none cursor-pointer hover:bg-white/[0.05] transition-all"
                >
                  {STADIUM_NODES.filter(n => n.type === 'section' || n.type === 'gate').map(n => (
                    <option key={n.id} value={n.name} className="bg-[#070B17] text-white">
                      {n.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Destination Search Form with Autocomplete */}
            <div ref={searchContainerRef} className="space-y-1.5 relative">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Target Destination</label>
              <form onSubmit={handleSearchSubmit} className="relative flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4FD1FF]" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#4FD1FF]/50 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 outline-none font-sans"
                    placeholder="Search gate, food, restroom, medical, superstore..."
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2.5 bg-gradient-to-r from-[#4FD1FF] to-[#7C5CFF] text-black font-bold rounded-xl text-xs hover:opacity-90 transition-all cursor-pointer shadow-[0_0_10px_rgba(79,209,255,0.2)] shrink-0"
                >
                  Locate
                </button>
              </form>

              {/* Suggestions Dropdown Menu */}
              <AnimatePresence>
                {showSuggestions && searchQuery.trim().length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute z-30 left-0 right-0 top-full mt-1 bg-[#090F21] border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto"
                  >
                    {suggestions.length > 0 ? (
                      suggestions.map(node => (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => handleSelectSuggestion(node)}
                          className="w-full px-4 py-2 text-left hover:bg-white/[0.05] border-b border-white/5 last:border-0 flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <div>
                            <span className="text-xs font-semibold text-white block">{node.name}</span>
                            <span className="text-[10px] text-white/50">{node.description}</span>
                          </div>
                          <span 
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase"
                            style={{ backgroundColor: `${getNodeIconColor(node.type)}20`, color: getNodeIconColor(node.type) }}
                          >
                            {node.type}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-white/40 italic">
                        No stadium hubs match "{searchQuery}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Selected Target Status */}
            <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase block tracking-widest">ACTIVE ROUTE TARGET</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-2 w-2 rounded-full bg-[#4FD1FF] animate-pulse" />
                  <span className="text-xs font-bold text-white truncate max-w-[200px]">
                    {destination}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-white/40 font-mono bg-white/5 px-2 py-1 rounded">
                Level {activeEndNode.name.includes('Level 2') ? '2' : activeEndNode.name.includes('Suites') ? '3' : '1'}
              </span>
            </div>

            {/* Accessibility Toggle */}
            <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <Accessibility className="w-4 h-4 text-[#38FFB3]" />
                <div>
                  <span className="text-xs text-gray-300 block font-sans font-medium">Accessible Ramps & Elevators</span>
                  <span className="text-[9px] text-white/30 font-mono">Wheelchair optimized transit</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowAccessible(!showAccessible);
                  setPulseTrigger(true);
                  setTimeout(() => setPulseTrigger(false), 800);
                }}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                  showAccessible ? 'bg-[#38FFB3]' : 'bg-gray-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  showAccessible ? 'transform translate-x-5' : ''
                }`} />
              </button>
            </div>
          </div>

          {/* Quick Targets */}
          <div className="space-y-3 pt-4 border-t border-white/5 mt-4">
            <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-widest">RECOMMENDED STADIUM HUBS</span>
            <div className="grid grid-cols-1 gap-2">
              {quickLocs.map((loc) => {
                const Icon = loc.icon;
                const isSelected = destination === loc.dest;
                return (
                  <button
                    key={loc.name}
                    onClick={() => {
                      setDestination(loc.dest);
                      setSearchQuery(loc.dest);
                      setPulseTrigger(true);
                      setTimeout(() => setPulseTrigger(false), 800);
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#4FD1FF]/10 border-[#4FD1FF]/40 text-white' 
                        : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-white/10 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-white/5" style={{ color: loc.color }}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-medium">{loc.name}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#4FD1FF] translate-x-0.5' : 'text-gray-500'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Stadium Cyber-Map Viewer */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          <div className="bg-[#090F21] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[450px] relative overflow-hidden">
            
            {/* HUD Header overlay inside Map frame */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
              <div className="bg-[#070B17]/95 border border-white/10 p-2.5 rounded-xl backdrop-blur-md">
                <span className="text-[9px] font-mono text-gray-400 block">TACTICAL LOCAL MAP HUD</span>
                <h3 className="text-xs font-bold text-white font-sans flex items-center gap-1.5">
                  MetLife Arena Map Grid
                </h3>
              </div>
              
              <div className="flex gap-2 bg-[#070B17]/95 border border-white/10 p-2 rounded-xl backdrop-blur-md">
                <span className="text-[9px] font-mono bg-[#38FFB3]/10 text-[#38FFB3] border border-[#38FFB3]/20 px-2 py-0.5 rounded">VECTOR MODE</span>
                <span className="text-[9px] font-mono bg-[#4FD1FF]/10 text-[#4FD1FF] border border-[#4FD1FF]/20 px-2 py-0.5 rounded">100% RESPONSIVE</span>
              </div>
            </div>

            {/* INTERACTIVE VECTOR MAP COMPONENT */}
            <div className="w-full h-full rounded-xl overflow-hidden bg-[#050914] relative border border-white/5">
              
              {/* Map grid coordinate overlays for cyber theme */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:25px_25px] pointer-events-none" />
              
              <svg 
                viewBox="0 0 500 350" 
                className="w-full h-full select-none"
              >
                {/* Outer concentric parking bounds */}
                <ellipse cx="250" cy="175" rx="230" ry="160" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="3,6" />
                
                {/* Stadium Outer Perimeter wall */}
                <ellipse cx="250" cy="175" rx="205" ry="140" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <ellipse cx="250" cy="175" rx="195" ry="130" fill="rgba(9,15,33,0.4)" stroke="rgba(79,209,255,0.15)" strokeWidth="2" />
                
                {/* Mid-tier concourse rings */}
                <ellipse cx="250" cy="175" rx="155" ry="102" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <ellipse cx="250" cy="175" rx="120" ry="70" fill="none" stroke="rgba(79,209,255,0.06)" strokeWidth="2" strokeDasharray="4,4" />
                <ellipse cx="250" cy="175" rx="90" ry="50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

                {/* Main Playing Turf / Center Field */}
                <g transform="translate(180, 135)">
                  {/* Grass Field */}
                  <rect x="0" y="0" width="140" height="80" rx="3" fill="#0D2C1E" stroke="#1D563D" strokeWidth="1.5" />
                  
                  {/* Grid Lines */}
                  <line x1="20" y1="0" x2="20" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="40" y1="0" x2="40" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="60" y1="0" x2="60" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="70" y1="0" x2="70" y2="80" stroke="rgba(255,255,255,0.25)" strokeWidth="1" /> {/* 50 yard line */}
                  <line x1="80" y1="0" x2="80" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="100" y1="0" x2="100" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="120" y1="0" x2="120" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  
                  {/* Center Circle */}
                  <ellipse cx="70" cy="40" rx="15" ry="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  
                  {/* Text label */}
                  <text x="70" y="44" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">FIELD</text>
                </g>

                {/* Animated Glowing Guidance Route Line */}
                {!sameLocation && (
                  <>
                    {/* Background glow path */}
                    <motion.path
                      key={`glow-${currentLoc}-${destination}-${showAccessible}`}
                      d={dAttribute}
                      fill="none"
                      stroke={showAccessible ? '#38FFB3' : '#4FD1FF'}
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Primary vector path line */}
                    <motion.path
                      key={`line-${currentLoc}-${destination}-${showAccessible}`}
                      d={dAttribute}
                      fill="none"
                      stroke={showAccessible ? '#38FFB3' : '#4FD1FF'}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />

                    {/* Fast flowing animated dots on top of path */}
                    <motion.path
                      key={`dots-${currentLoc}-${destination}-${showAccessible}`}
                      d={dAttribute}
                      fill="none"
                      stroke={showAccessible ? '#10B981' : '#2563EB'}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="6,8"
                      animate={{ strokeDashoffset: [0, -28] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    />
                  </>
                )}

                {/* Render interactive nodes */}
                {STADIUM_NODES.map((node) => {
                  const isStart = node.name === currentLoc;
                  const isEnd = node.name === destination;
                  const isHovered = hoveredNode === node.id;
                  const isSpecialNode = isStart || isEnd;

                  const color = getNodeIconColor(node.type);

                  return (
                    <g 
                      key={node.id} 
                      className="cursor-pointer"
                      onClick={() => handleMapNodeClick(node)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {/* Pulse rings for active route terminals */}
                      {isStart && (
                        <circle cx={node.x} cy={node.y} r="18" fill="none" stroke="#FF4D6D" strokeWidth="2" opacity="0.4">
                          <animate attributeName="r" values="10;22;10" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {isEnd && (
                        <circle cx={node.x} cy={node.y} r="18" fill="none" stroke="#38FFB3" strokeWidth="2" opacity="0.4">
                          <animate attributeName="r" values="10;22;10" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}

                      {/* Default glowing halo for hover states */}
                      {(isHovered || isSpecialNode) && (
                        <circle cx={node.x} cy={node.y} r="12" fill={color} opacity="0.25" />
                      )}

                      {/* Small node point */}
                      <circle 
                        cx={node.x} 
                        cy={node.y} 
                        r={isSpecialNode ? "8" : "6"} 
                        fill={isStart ? '#FF4D6D' : isEnd ? '#38FFB3' : color} 
                        stroke="#070B17" 
                        strokeWidth="1.5" 
                      />

                      {/* Tiny interior core for special terminals */}
                      {isSpecialNode && (
                        <circle cx={node.x} cy={node.y} r="3" fill="#ffffff" />
                      )}
                    </g>
                  );
                })}

                {/* SVG Text Labels for major Gates for easier navigation */}
                <text x="250" y="22" fill="#FFB800" fontSize="8" fontWeight="black" fontFamily="monospace" textAnchor="middle" opacity="0.8">GATE A</text>
                <text x="32" y="178" fill="#FFB800" fontSize="8" fontWeight="black" fontFamily="monospace" textAnchor="middle" opacity="0.8">GATE B</text>
                <text x="468" y="178" fill="#FFB800" fontSize="8" fontWeight="black" fontFamily="monospace" textAnchor="middle" opacity="0.8">GATE C</text>
                <text x="250" y="342" fill="#FFB800" fontSize="8" fontWeight="black" fontFamily="monospace" textAnchor="middle" opacity="0.8">GATE D</text>
              </svg>

              {/* Dynamic Overlay Label for selected node details */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#070B17]/95 border border-white/10 p-3 rounded-xl flex items-center justify-between pointer-events-none backdrop-blur-md">
                <div>
                  <span className="text-[9px] font-mono text-gray-500 uppercase block">MAP STATUS</span>
                  <p className="text-xs font-bold text-white">
                    {hoveredNode 
                      ? STADIUM_NODES.find(n => n.id === hoveredNode)?.name 
                      : sameLocation 
                        ? 'Origin matches destination' 
                        : `Routing: ${activeStartNode.name} to ${activeEndNode.name}`}
                  </p>
                  <p className="text-[10px] text-white/50 mt-0.5 max-w-[340px] truncate">
                    {hoveredNode 
                      ? STADIUM_NODES.find(n => n.id === hoveredNode)?.description 
                      : activeEndNode.description}
                  </p>
                </div>
                
                <span className="text-[10px] text-[#38FFB3] font-mono bg-[#38FFB3]/10 px-2.5 py-1 rounded border border-[#38FFB3]/20">
                  {hoveredNode ? 'CLICK TO SELECT' : 'READY'}
                </span>
              </div>
            </div>
          </div>

          {/* Active Navigation Summary */}
          <div className="bg-[#090F21] border border-white/5 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1 bg-white/[0.01] p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono text-gray-500 block">ESTIMATED TRANSIT TIME</span>
              <div className="flex items-center gap-2 text-white font-mono">
                <Clock className="w-4 h-4 text-[#38FFB3]" />
                <span className="text-sm font-black text-[#38FFB3]">
                  {travelDuration} mins
                </span>
              </div>
            </div>
            
            <div className="space-y-1 bg-white/[0.01] p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono text-gray-500 block">PATHWAY DISTANCE</span>
              <div className="flex items-center gap-2 text-white font-mono">
                <MapPin className="w-4 h-4 text-[#7C5CFF]" />
                <span className="text-sm font-black text-white">
                  {travelDistance}
                </span>
              </div>
            </div>

            <div className="space-y-1 bg-white/[0.01] p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono text-gray-500 block">DYNAMIC CONGESTION</span>
              <div className="flex items-center gap-2 text-white font-mono">
                <span className={`h-2.5 w-2.5 rounded-full ${
                  crowdLevel === 'High' ? 'bg-[#FF4D6D] animate-ping' : crowdLevel === 'Moderate' ? 'bg-[#FFB800]' : 'bg-[#38FFB3]'
                }`} />
                <span className="text-sm font-black text-white">{crowdLevel} Flow</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Guidance Display */}
          <div className="bg-[#090F21] border border-white/5 rounded-2xl p-4 space-y-3">
            <span className="text-[10px] font-mono text-gray-500 block tracking-widest uppercase">STEPS & INTUITIVE GUIDANCE</span>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {travelSteps.map((step, idx, arr) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl font-mono text-white text-[11px] flex items-center gap-1.5">
                    <span className="text-[10px] font-black text-[#4FD1FF]">0{idx+1}</span>
                    <span>{step}</span>
                  </div>
                  {idx < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-white/30 shrink-0" />}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
