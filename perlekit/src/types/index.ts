export interface ContributorStats {
  streakDays: number;
  dailyTasks: number;
  totalPoints: number;
  domain: Domain;
  referrals: number;
  referralActivity: 'low' | 'medium' | 'high';
}

export interface MultiplierInfo {
  current: number;
  nextThreshold: number;
  nextMultiplier: number;
  daysToNext: number;
  isMax: boolean;
}

export type Domain =
  | 'healthcare'
  | 'legal'
  | 'robotics'
  | 'finance'
  | 'linguistics'
  | 'stem';

export type Tier = 'newcomer' | 'contributor' | 'verified' | 'specialist' | 'elite';

export type EarningPotential = 'medium' | 'high' | 'very-high';

export interface TierInfo {
  current: Tier;
  currentMin: number;
  nextTier: Tier | null;
  pointsRequired: number;
  pointsNeeded: number;
  perks: string[];
  progress: number;
}

export interface ProjectionData {
  day: number;
  dailyPoints: number;
  cumulative: number;
}

export interface DomainQuestion {
  id: number;
  question: string;
  options: { label: string; value: string }[];
}

export interface DomainResult {
  domain: Domain;
  displayName: string;
  description: string;
  taskTypes: string[];
  earningPotential: EarningPotential;
  reason: string;
  emoji: string;
}

export interface ReferralProjection {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface ActionItem {
  id: string;
  task: string;
  points: number;
  priority: 'high' | 'medium' | 'low';
}

export interface TokenPrice {
  solana: number;
  lastUpdated: string;
}

export interface LeaderboardEstimate {
  rank: string;
  percentile: number;
  label: string;
  color: string;
}

export interface SeasonPhase {
  id: number;
  name: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
  date: string;
}

export interface BenchmarkTier {
  tier: Tier;
  avgDailyPoints: number;
  avgStreak: number;
  avgReferrals: number;
  topEarnerDaily: number;
}
