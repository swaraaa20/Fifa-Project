export type ActiveView =
  | 'landing'
  | 'dashboard'
  | 'navigator'
  | 'crowd'
  | 'translator'
  | 'emergency'
  | 'accessibility'
  | 'lostfound'
  | 'transport'
  | 'operational'
  | 'decision'
  | 'settings';

export interface MatchInfo {
  teams: string;
  score: string;
  time: string;
  attendance: number;
  stadium: string;
  status: 'Pre-Match' | 'Live' | 'FT';
}

export interface SimulationState {
  currentAttendance: number;
  crowdDensity: number; // percentage
  emergencyStatus: 'CLEAR' | 'ELEVATED' | 'CRITICAL';
  volunteerAvailability: number; // total count
  publicTransportStatus: 'OPTIMAL' | 'MODERATE' | 'CONGESTED' | 'DELAYED';
  aiConfidenceScore: number; // percentage
  powerUsage: number; // MW
  waterConsumption: number; // k-liters
  wasteCollection: number; // tons
  medicalIncidents: number;
  carbonFootprint: number; // kg CO2
}

export interface LiveActivity {
  id: string;
  timestamp: string; // ISO or short string
  message: string;
  type: 'info' | 'warning' | 'critical' | 'success' | 'action';
  category: string;
}

export interface ProactiveAlert {
  id: string;
  title: string;
  description: string;
  recommendedAction: string;
  estimatedTimeSaved: number; // minutes
  eta?: string;
  status: 'PENDING' | 'RESOLVED' | 'DISPATCHED';
  timestamp: string;
  type: 'congestion' | 'medical' | 'weather' | 'transport' | 'lost' | 'accessibility';
  severity: 'low' | 'medium' | 'high';
}

export interface NavigatorRoute {
  destination: string;
  recommendedRoute: string[];
  alternativeRoute: string[];
  duration: number; // minutes
  alternativeDuration: number;
  crowdLevel: 'Low' | 'Moderate' | 'High';
  accessibleRoute: string[];
}

export interface LostItem {
  id: string;
  item: string;
  category: string;
  location: string;
  reportedAt: string;
  status: 'searching' | 'matched' | 'resolved';
  imageUrl?: string;
  volunteerUpdate?: string;
}

export interface TranslationHistoryItem {
  id: string;
  text: string;
  translatedText: string;
  fromLang: string;
  toLang: string;
  timestamp: string;
  type: 'voice' | 'text' | 'announcement';
}

export interface IncidentTimelineItem {
  id: string;
  time: string;
  event: string;
  status: 'logged' | 'dispatched' | 'active' | 'resolved';
}
