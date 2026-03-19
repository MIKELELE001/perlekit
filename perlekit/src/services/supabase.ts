import { ContributorStats } from '../types';

const SUPABASE_URL = 'https://mzovhmwcmecwbtnoyptd.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16b3ZobXdjbWVjd2J0bm95cHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTc1MDEsImV4cCI6MjA4OTQ5MzUwMX0.hKZAe8TpSdk-47sP5v2qICjdW6NKi4xEXdsBoAeqALM';

const HEADERS = {
  'Content-Type': 'application/json',
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

export interface ContributorRow {
  username: string;
  streak_days: number;
  daily_tasks: number;
  total_points: number;
  domain: string;
  referrals: number;
  referral_activity: string;
  updated_at: string;
}

export interface LeaderboardEntry {
  username: string;
  total_points: number;
  streak_days: number;
  domain: string;
}

const isContributorRow = (data: unknown): data is ContributorRow => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'username' in data &&
    'total_points' in data
  );
};

export const loadContributorStats = async (
  username: string
): Promise<ContributorStats | null> => {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/contributors?username=eq.${encodeURIComponent(username)}&limit=1`,
    { headers: HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to load stats: ${res.status}`);
  const rows: unknown[] = await res.json() as unknown[];
  if (!rows.length) return null;
  const row = rows[0];
  if (!isContributorRow(row)) return null;
  return {
    streakDays: row.streak_days,
    dailyTasks: row.daily_tasks,
    totalPoints: row.total_points,
    domain: row.domain as ContributorStats['domain'],
    referrals: row.referrals,
    referralActivity: row.referral_activity as ContributorStats['referralActivity'],
  };
};

export const saveContributorStats = async (
  username: string,
  stats: ContributorStats
): Promise<void> => {
  const payload = {
    username,
    streak_days: stats.streakDays,
    daily_tasks: stats.dailyTasks,
    total_points: stats.totalPoints,
    domain: stats.domain,
    referrals: stats.referrals,
    referral_activity: stats.referralActivity,
    updated_at: new Date().toISOString(),
  };

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/contributors?username=eq.${encodeURIComponent(username)}`,
    {
      method: 'PATCH',
      headers: { ...HEADERS, Prefer: 'return=minimal' },
      body: JSON.stringify(payload),
    }
  );

  if (res.status === 404 || (await checkNotExists(username))) {
    await fetch(`${SUPABASE_URL}/rest/v1/contributors`, {
      method: 'POST',
      headers: { ...HEADERS, Prefer: 'return=minimal' },
      body: JSON.stringify(payload),
    });
    return;
  }

  if (!res.ok) throw new Error(`Failed to save stats: ${res.status}`);
};

const checkNotExists = async (username: string): Promise<boolean> => {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/contributors?username=eq.${encodeURIComponent(username)}&limit=1`,
    { headers: HEADERS }
  );
  const rows: unknown[] = await res.json() as unknown[];
  return rows.length === 0;
};

export const upsertContributorStats = async (
  username: string,
  stats: ContributorStats
): Promise<void> => {
  const payload = {
    username,
    streak_days: stats.streakDays,
    daily_tasks: stats.dailyTasks,
    total_points: stats.totalPoints,
    domain: stats.domain,
    referrals: stats.referrals,
    referral_activity: stats.referralActivity,
    updated_at: new Date().toISOString(),
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/contributors`, {
    method: 'POST',
    headers: {
      ...HEADERS,
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to upsert stats: ${res.status} ${text}`);
  }
};

export const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/contributors?select=username,total_points,streak_days,domain&order=total_points.desc&limit=50`,
    { headers: HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch leaderboard: ${res.status}`);
  return res.json() as Promise<LeaderboardEntry[]>;
};
