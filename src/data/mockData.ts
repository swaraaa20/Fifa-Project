import { MatchInfo, SimulationState, ProactiveAlert, LiveActivity, LostItem, TranslationHistoryItem } from '../types';

export const WORLD_CUP_MATCHES: MatchInfo[] = [
  {
    teams: 'USA vs Germany',
    score: '2 - 1',
    time: "74'",
    attendance: 82500,
    stadium: 'MetLife Stadium (New York/New Jersey)',
    status: 'Live',
  },
  {
    teams: 'Mexico vs Argentina',
    score: '0 - 0',
    time: '20:00',
    attendance: 87500,
    stadium: 'Estadio Azteca (Mexico City)',
    status: 'Pre-Match',
  },
  {
    teams: 'Canada vs France',
    score: '1 - 3',
    time: 'FT',
    attendance: 54100,
    stadium: 'BC Place (Vancouver)',
    status: 'FT',
  }
];

export const INITIAL_SIM_STATE: SimulationState = {
  currentAttendance: 82140,
  crowdDensity: 74,
  emergencyStatus: 'CLEAR',
  volunteerAvailability: 412,
  publicTransportStatus: 'OPTIMAL',
  aiConfidenceScore: 98.4,
  powerUsage: 12.4, // MW
  waterConsumption: 410, // k-liters
  wasteCollection: 14.2, // tons
  medicalIncidents: 1,
  carbonFootprint: 18420, // kg CO2
};

export const INITIAL_ALERTS: ProactiveAlert[] = [
  {
    id: 'alert-1',
    title: 'Heavy congestion near Gate A',
    description: 'Security line processing times spiked from 4m to 19m due to high spectator arrival rate.',
    recommendedAction: 'Reroute incoming spectators from Gate A to Gate C via East Promenade.',
    estimatedTimeSaved: 12,
    status: 'PENDING',
    timestamp: '15:12',
    type: 'congestion',
    severity: 'high',
  },
  {
    id: 'alert-2',
    title: 'Medical emergency near Section D',
    description: 'Heat exhaustion incident reported by volunteer. Spectator is conscious but dizzy.',
    recommendedAction: 'Dispatch Sector 4 Medical Response Team with wheelchair and hydration pack.',
    estimatedTimeSaved: 5,
    eta: '2m',
    status: 'DISPATCHED',
    timestamp: '15:16',
    type: 'medical',
    severity: 'high',
  },
  {
    id: 'alert-3',
    title: 'Approaching rain prediction',
    description: 'Doppler radar indicates light to moderate rain cell passing over the stadium in 15 minutes.',
    recommendedAction: 'Pre-deploy roof awnings, open indoor waiting hubs, and alert shuttle fleets.',
    estimatedTimeSaved: 15,
    status: 'PENDING',
    timestamp: '15:18',
    type: 'weather',
    severity: 'medium',
  }
];

export const INITIAL_FEED: LiveActivity[] = [
  {
    id: 'feed-1',
    timestamp: '15:12',
    message: 'AI detected congestion near Gate A. High crowd density thresholds breached.',
    type: 'warning',
    category: 'Crowd Control',
  },
  {
    id: 'feed-2',
    timestamp: '15:13',
    message: 'AI proactive plan: Rerouted 320 spectators from Gate A to Gate C via digital signage update.',
    type: 'action',
    category: 'Rerouting',
  },
  {
    id: 'feed-3',
    timestamp: '15:16',
    message: 'Medical response alert: Heartbeat anomaly reported. Response team dispatched.',
    type: 'critical',
    category: 'Medical',
  },
  {
    id: 'feed-4',
    timestamp: '15:17',
    message: 'AI Translator generated localized crowd safety announcement in German, Spanish, and French.',
    type: 'success',
    category: 'Translation',
  }
];

export const PRESET_ROUTES = [
  {
    destination: 'Gate C (East Entrance)',
    recommendedRoute: ['Section 114 Corridor', 'East Promenade Escalators', 'Gate C Outer Plaza'],
    alternativeRoute: ['Section 115 Outer Loop', 'North-East Walkway', 'Gate C Underpass'],
    duration: 6,
    alternativeDuration: 9,
    crowdLevel: 'Low',
    accessibleRoute: ['Elevator 4B', 'East Accessible Ramp', 'Gate C Wheelchair Access'],
  },
  {
    destination: 'Main Food Hall (Level 2)',
    recommendedRoute: ['North Escalators', 'Food Concourse A', 'Main Dining Pavilion'],
    alternativeRoute: ['Section 108 Service Elevator', 'Back-concourse Corridor', 'Food Concourse B'],
    duration: 4,
    alternativeDuration: 8,
    crowdLevel: 'High',
    accessibleRoute: ['Central Passenger Elevator', 'Level 2 Accessible Pathway', 'Dining Hall Gate 1'],
  },
  {
    destination: 'Sector 3 Medical Center',
    recommendedRoute: ['West Gate Access Tunnel', 'Emergency Medical Lane', 'Sector 3 Station'],
    alternativeRoute: ['Section 122 Exit Ramp', 'Lower Concourses', 'Sector 3 Station Entry'],
    duration: 3,
    alternativeDuration: 5,
    crowdLevel: 'Moderate',
    accessibleRoute: ['West Grade-Level Walkway', 'Accessible Entrance 1', 'Medical Station A'],
  }
];

export const INITIAL_LOST_ITEMS: LostItem[] = [
  {
    id: 'lost-1',
    item: 'Black Leather Wallet',
    category: 'Personal Effects',
    location: 'Section 104, Row K, Seat 12',
    reportedAt: '14:30',
    status: 'matched',
    imageUrl: 'https://images.unsplash.com/photo-1627124118123-14e517ab3364?auto=format&fit=crop&q=80&w=150',
    volunteerUpdate: 'Found by volunteer Sarah. Held at Section 104 Guest Services Office.',
  },
  {
    id: 'lost-2',
    item: 'iPhone 15 Pro Max (Blue Case)',
    category: 'Electronics',
    location: 'North Concourse Restroom A',
    reportedAt: '15:05',
    status: 'searching',
    volunteerUpdate: 'Alert broadcasted to cleaning shift supervisors.',
  }
];

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' }
];

export const STADIUM_METRICS = {
  gateOccupancy: [
    { gate: 'Gate A', live: 94, capacity: 15000, status: 'CONGESTED' },
    { gate: 'Gate B', live: 62, capacity: 12000, status: 'OPTIMAL' },
    { gate: 'Gate C', live: 38, capacity: 15000, status: 'OPTIMAL' },
    { gate: 'Gate D', live: 85, capacity: 10000, status: 'MODERATE' },
    { gate: 'Gate E', live: 51, capacity: 10000, status: 'OPTIMAL' }
  ],
  transportModes: [
    { mode: 'Metro (Line 1)', eta: '4 min', status: 'CROWDED', interval: '3 min', efficiency: 91 },
    { mode: 'Shuttle Buses', eta: '2 min', status: 'OPTIMAL', interval: '5 min', efficiency: 97 },
    { mode: 'Taxis / Rideshare', eta: '11 min', status: 'CONGESTED', interval: 'N/A', efficiency: 74 },
    { mode: 'Walking Paths', eta: '0 min', status: 'OPTIMAL', interval: 'N/A', efficiency: 100 }
  ]
};
