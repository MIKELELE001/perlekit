import { memo } from 'react';
import { Link } from 'react-router-dom';
import useCalculator from '../../hooks/useCalculator';
import styles from './Dashboard.module.css';

interface Props {
  username: string;
}

const Dashboard = memo(({ username }: Props) => {
  const { stats, multiplierInfo, dailyPoints, tierInfo, totalDailyEarnings } = useCalculator();

  const quickStats = [
    { label: 'Daily Points', value: dailyPoints.toLocaleString(), icon: '⚡', color: 'accent' },
    { label: 'Active Multiplier', value: `${multiplierInfo.current}×`, icon: '🔥', color: 'green' },
    { label: 'Current Tier', value: tierInfo.current.charAt(0).toUpperCase() + tierInfo.current.slice(1), icon: '📈', color: 'blue' },
    { label: 'Total Points', value: stats.totalPoints.toLocaleString(), icon: '💎', color: 'purple' },
  ];

  const features = [
    { path: '/calculator', icon: '🔢', title: 'Points Calculator', desc: 'See your earnings & 60-day projection' },
    { path: '/streak', icon: '🔥', title: 'Streak Optimizer', desc: 'Protect your multiplier' },
    { path: '/domain', icon: '🧠', title: 'Domain Matcher', desc: 'Find your highest-paying task type' },
    { path: '/tier', icon: '📈', title: 'Tier Tracker', desc: 'Track your progression to Elite' },
    { path: '/referral', icon: '👥', title: 'Referral Earnings', desc: 'Calculate passive income' },
    { path: '/action', icon: '📋', title: 'Daily Action Plan', desc: 'Your personalized to-do list' },
    { path: '/leaderboard', icon: '🏆', title: 'Leaderboard Rank', desc: 'See where you stand' },
    { path: '/token', icon: '💰', title: 'Token Tracker', desc: 'Live Solana price' },
    { path: '/benchmarks', icon: '🌍', title: 'Community Benchmarks', desc: 'How you compare to others' },
    { path: '/season', icon: '🗺️', title: 'Season 1 Map', desc: "Timeline & what's coming next" },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            GM, <span className={styles.accent}>@{username}</span> 👋
          </h1>
          <p className={styles.heroSub}>
            Your personal strategy hub for maximizing earnings on the Perle Labs contributor platform.
          </p>
        </div>
        {stats.streakDays === 0 && (
          <div className={styles.setupBanner}>
            <span>⚡</span>
            <span>Set up your stats in the <Link to="/calculator">Points Calculator</Link> to unlock personalized insights.</span>
          </div>
        )}
      </div>

      <div className={styles.statsGrid}>
        {quickStats.map((s) => (
          <div key={s.label} className={`${styles.statCard} ${styles[s.color]}`}>
            <span className={styles.statIcon}>{s.icon}</span>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {totalDailyEarnings > 0 && (
        <div className={styles.totalBanner}>
          <span className={styles.totalLabel}>Total Daily Earnings (tasks + referrals)</span>
          <span className={styles.totalValue}>{totalDailyEarnings.toLocaleString()} pts</span>
        </div>
      )}

      <h2 className={styles.sectionHeading}>All Tools</h2>
      <div className={styles.featureGrid}>
        {features.map((f) => (
          <Link key={f.path} to={f.path} className={styles.featureCard}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <div>
              <div className={styles.featureTitle}>{f.title}</div>
              <div className={styles.featureDesc}>{f.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';
export default Dashboard;
