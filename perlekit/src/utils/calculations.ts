import {
  ContributorStats,
  MultiplierInfo,
  ProjectionData,
  TierInfo,
  Tier,
  ReferralProjection,
  LeaderboardEstimate,
} from '../types';

export const getMultiplier = (streakDays: number): number => {
  if (streakDays >= 30) return 2.5;
  if (streakDays >= 14) return 2.0;
  if (streakDays >= 7) return 1.75;
  if (streakDays >= 3) return 1.5;
  return 1.0;
};

export const getMultiplierInfo = (streakDays: number): MultiplierInfo => {
  const current = getMultiplier(streakDays);
  const thresholds = [
    { days: 3, mult: 1.5 },
    { days: 7, mult: 1.75 },
    { days: 14, mult: 2.0 },
    { days: 30, mult: 2.5 },
  ];
  const next = thresholds.find((t) => streakDays < t.days);
  return {
    current,
    nextThreshold: next?.days ?? 30,
    nextMultiplier: next?.mult ?? 2.5,
    daysToNext: next ? next.days - streakDays : 0,
    isMax: streakDays >= 30,
  };
};

export const calculateDailyPoints = (tasks: number, multiplier: number): number =>
  Math.round(tasks * 10 * multiplier);

export const getProjections = (
  stats: ContributorStats,
  days: number
): ProjectionData[] => {
  const data: ProjectionData[] = [];
  let cumulative = stats.totalPoints;
  for (let i = 1; i <= days; i++) {
    const m = getMultiplier(stats.streakDays + i);
    const dailyPoints = calculateDailyPoints(stats.dailyTasks, m);
    cumulative += dailyPoints;
    data.push({ day: i, dailyPoints, cumulative });
  }
  return data;
};

const TIERS: {
  tier: Tier;
  min: number;
  max: number;
  perks: string[];
}[] = [
  {
    tier: 'newcomer',
    min: 0,
    max: 499,
    perks: ['Text annotation tasks', 'Community access', 'Base rewards'],
  },
  {
    tier: 'contributor',
    min: 500,
    max: 1999,
    perks: ['Image tasks unlocked', '1.1x base rate', 'Weekly bonuses'],
  },
  {
    tier: 'verified',
    min: 2000,
    max: 4999,
    perks: ['Audio & video tasks', '1.25x base rate', 'Priority queue'],
  },
  {
    tier: 'specialist',
    min: 5000,
    max: 9999,
    perks: ['Domain-specific tasks', '1.5x base rate', 'Enterprise jobs'],
  },
  {
    tier: 'elite',
    min: 10000,
    max: Infinity,
    perks: ['All tasks unlocked', '2x base rate', 'Token airdrop priority', 'Beta access'],
  },
];

export const getTierInfo = (totalPoints: number): TierInfo => {
  const idx = TIERS.findIndex((t) => totalPoints >= t.min && totalPoints <= t.max);
  const current = TIERS[Math.max(0, idx)];
  const next = TIERS[idx + 1] ?? null;
  const progress = next
    ? Math.min(100, Math.round(((totalPoints - current.min) / (next.min - current.min)) * 100))
    : 100;
  return {
    current: current.tier,
    currentMin: current.min,
    nextTier: next?.tier ?? null,
    pointsRequired: next?.min ?? current.min,
    pointsNeeded: next ? Math.max(0, next.min - totalPoints) : 0,
    perks: current.perks,
    progress,
  };
};

export const getTierList = () => TIERS;

export const calculateReferralProjection = (
  referrals: number,
  activity: 'low' | 'medium' | 'high'
): ReferralProjection => {
  const avgMap = { low: 50, medium: 150, high: 300 };
  const avg = avgMap[activity];
  const daily = Math.round(referrals * avg * 0.1);
  return { daily, weekly: daily * 7, monthly: daily * 30 };
};

export const estimateLeaderboard = (totalPoints: number): LeaderboardEstimate => {
  if (totalPoints >= 10000) return { rank: 'Top 1%', percentile: 99, label: 'Elite', color: '#f59e0b' };
  if (totalPoints >= 5000) return { rank: 'Top 5%', percentile: 95, label: 'Specialist', color: '#10b981' };
  if (totalPoints >= 2000) return { rank: 'Top 15%', percentile: 85, label: 'Verified', color: '#3b82f6' };
  if (totalPoints >= 500) return { rank: 'Top 40%', percentile: 60, label: 'Contributor', color: '#8b5cf6' };
  return { rank: 'Top 80%', percentile: 20, label: 'Newcomer', color: '#6b7280' };
};
