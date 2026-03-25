import { ActionItem } from '../../types';

export const buildActionPlan = (
  dailyPoints: number,
  streakDays: number,
  referrals: number,
  dailyTasks: number,
  totalPoints: number
): ActionItem[] => {
  const items: ActionItem[] = [];

  items.push({
    id: 'checkin',
    task: 'Check in on the Perle platform to activate your multiplier',
    points: Math.round(dailyTasks * 2),
    priority: 'high',
  });

  items.push({
    id: 'tasks',
    task: `Complete ${dailyTasks} annotation task${dailyTasks !== 1 ? 's' : ''} in your matched domain`,
    points: dailyPoints,
    priority: 'high',
  });

  if (streakDays < 30) {
    items.push({
      id: 'streak',
      task: `Maintain your streak — only ${30 - streakDays} day${30 - streakDays !== 1 ? 's' : ''} to max 2.5× multiplier`,
      points: Math.round(dailyPoints * 0.5),
      priority: streakDays < 3 ? 'high' : 'medium',
    });
  }

  if (referrals < 5) {
    items.push({
      id: 'referral',
      task: 'Share your referral link with 1 person in your professional network',
      points: 50,
      priority: 'medium',
    });
  }

  if (totalPoints < 500) {
    items.push({
      id: 'onboarding',
      task: 'Complete domain-specific training module to unlock higher-value tasks',
      points: 100,
      priority: 'medium',
    });
  }

  items.push({
    id: 'quality',
    task: 'Review your last 5 annotations for accuracy to maintain reputation score',
    points: 25,
    priority: 'low',
  });

  items.push({
    id: 'community',
    task: 'Check the Discord for new task announcements or bonus opportunities',
    points: 10,
    priority: 'low',
  });

  return items;
};
