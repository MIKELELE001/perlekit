import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
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

const PageLoader = () => (
  <div className={styles.pageLoader}>
    <span className={styles.loaderDot} />
    <span className={styles.loaderDot} />
    <span className={styles.loaderDot} />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className={styles.appShell}>
        <Header />
        <div className={styles.body}>
          <Sidebar />
          <main className={styles.main}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
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
  );
}

export default App;
