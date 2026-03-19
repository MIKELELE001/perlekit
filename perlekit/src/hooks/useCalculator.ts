import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import { ContributorStats, Domain } from '../types';
import {
  getMultiplierInfo,
  calculateDailyPoints,
  getTierInfo,
  calculateReferralProjection,
} from '../utils/calculations';
import { upsertContributorStats } from '../services/supabase';
import { useUsername } from '../context/UserContext';

const DEFAULT_STATS: ContributorStats = {
  streakDays: 0,
  dailyTasks: 5,
  totalPoints: 0,
  domain: 'stem' as Domain,
  referrals: 0,
  referralActivity: 'medium',
};

const useCalculator = () => {
  const username = useUsername();
  const [stats, setStats] = useLocalStorage<ContributorStats>('perle-stats-v1', DEFAULT_STATS);

  const updateStats = useCallback(
    (updates: Partial<ContributorStats>): void => {
      const newStats = { ...stats, ...updates };
      setStats(newStats);
      if (username) {
        upsertContributorStats(username, newStats).catch(() => {
          // silently fail — local data still saved
        });
      }
    },
    [stats, setStats, username]
  );

  const resetStats = (): void => {
    setStats(DEFAULT_STATS);
  };

  const multiplierInfo = getMultiplierInfo(stats.streakDays);
  const dailyPoints = calculateDailyPoints(stats.dailyTasks, multiplierInfo.current);
  const tierInfo = getTierInfo(stats.totalPoints);
  const referralProjection = calculateReferralProjection(stats.referrals, stats.referralActivity);
  const totalDailyEarnings = dailyPoints + referralProjection.daily;

  return {
    stats,
    updateStats,
    resetStats,
    multiplierInfo,
    dailyPoints,
    tierInfo,
    referralProjection,
    totalDailyEarnings,
  };
};

export default useCalculator;
