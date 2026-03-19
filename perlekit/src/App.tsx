import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Onboarding from './components/layout/Onboarding';
import { UserContext } from './context/UserContext';
import { Domain } from './types';
import { loadContributorStats } from './services/supabase';
import useLocalStorage from './hooks/useLocalStorage';
import { ContributorStats } from './types';
import styles from './App.module.css';

const Dashboard = lazy(() => import('./components/layout/Dashboard'));
const PointsCalculator = lazy(() => import('./components/calculator/PointsCalculator'));
const StreakOptimizer = lazy(() => import('./components/streak/StreakOptimizer'));
const DomainMatcher = lazy(() => import('./components/domain/DomainMatcher'));
const TierTracker = lazy(() => import('./components/tier/TierTracker'));
const ReferralEstimator = lazy(() => import('./components/referral/ReferralEstimator'));
const DailyActionPlan = lazy(() => import('./components/action/DailyActionPlan'));
const LeaderboardSimulator = lazy(() => import('./components/leaderboard/LeaderboardSimulator'));
const TokenTracker = lazy(() => import('./components/token/TokenTracker'));
const CommunityBenchmarks = lazy(() => import('./components/benchmarks/CommunityBenchmarks'));
const SeasonMap = lazy(() => import('./components/season/SeasonMap'));

const PROFILE_KEY = 'perlekit-profile-v1';
const STATS_KEY = 'perle-stats-v1';

interface Profile {
  username: string;
  domain: Domain;
}

const DEFAULT_STATS: ContributorStats = {
  streakDays: 0,
  dailyTasks: 5,
  totalPoints: 0,
  domain: 'stem' as Domain,
  referrals: 0,
  referralActivity: 'medium',
};

const PageLoader = () => (
  <div className={styles.pageLoader}>
    <span className={styles.loaderDot} />
    <span className={styles.loaderDot} />
    <span className={styles.loaderDot} />
  </div>
);

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const [, setStats] = useLocalStorage<ContributorStats>(STATS_KEY, DEFAULT_STATS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) {
        setProfile(JSON.parse(saved) as Profile);
      }
    } catch {
      // no saved profile
    }
    setReady(true);
  }, []);

  const handleOnboardingComplete = useCallback(async (username: string, domain: Domain) => {
    const p: Profile = { username, domain };
    setProfile(p);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    } catch {
      // storage unavailable
    }
    // Try to load existing stats from Supabase for returning users
    try {
      const existing = await loadContributorStats(username);
      if (existing) {
        setStats(existing);
      }
    } catch {
      // no existing stats — start fresh
    }
  }, [setStats]);

  const handleResetProfile = () => {
    setProfile(null);
    try {
      localStorage.removeItem(PROFILE_KEY);
    } catch {
      // storage unavailable
    }
  };

  if (!ready) return null;

  if (!profile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <UserContext.Provider value={{ username: profile.username }}>
      <BrowserRouter>
        <div className={styles.appShell}>
          <Header username={profile.username} onResetProfile={handleResetProfile} />
          <div className={styles.body}>
            <Sidebar />
            <main className={styles.main}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Dashboard username={profile.username} />} />
                  <Route path="/calculator" element={<PointsCalculator />} />
                  <Route path="/streak" element={<StreakOptimizer />} />
                  <Route path="/domain" element={<DomainMatcher />} />
                  <Route path="/tier" element={<TierTracker />} />
                  <Route path="/referral" element={<ReferralEstimator />} />
                  <Route path="/action" element={<DailyActionPlan />} />
                  <Route path="/leaderboard" element={<LeaderboardSimulator />} />
                  <Route path="/token" element={<TokenTracker />} />
                  <Route path="/benchmarks" element={<CommunityBenchmarks />} />
                  <Route path="/season" element={<SeasonMap />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
