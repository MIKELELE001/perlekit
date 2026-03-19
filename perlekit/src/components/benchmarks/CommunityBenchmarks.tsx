import { memo } from 'react';
import useCalculator from '../../hooks/useCalculator';
import { BenchmarkTier, Tier } from '../../types';
import styles from './CommunityBenchmarks.module.css';

const BENCHMARKS: BenchmarkTier[] = [
  { tier: 'newcomer', avgDailyPoints: 50, avgStreak: 2, avgReferrals: 0, topEarnerDaily: 120 },
  { tier: 'contributor', avgDailyPoints: 120, avgStreak: 8, avgReferrals: 2, topEarnerDaily: 280 },
  { tier: 'verified', avgDailyPoints: 220, avgStreak: 16, avgReferrals: 5, topEarnerDaily: 480 },
  { tier: 'specialist', avgDailyPoints: 380, avgStreak: 24, avgReferrals: 12, topEarnerDaily: 750 },
  { tier: 'elite', avgDailyPoints: 620, avgStreak: 30, avgReferrals: 25, topEarnerDaily: 1400 },
];

const tierEmoji: Record<Tier, string> = {
  newcomer: '🌱', contributor: '⚡', verified: '✅', specialist: '🔬', elite: '👑',
};

const tierColors: Record<Tier, string> = {
  newcomer: 'var(--text-muted)',
  contributor: 'var(--purple)',
  verified: 'var(--blue)',
  specialist: 'var(--green)',
  elite: 'var(--accent)',
};

const CommunityBenchmarks = memo(() => {
  const { tierInfo, dailyPoints, stats } = useCalculator();
  const currentBenchmark = BENCHMARKS.find((b) => b.tier === tierInfo.current);

  const comparisons = currentBenchmark
    ? [
        {
          label: 'Daily Points',
          yours: dailyPoints,
          avg: currentBenchmark.avgDailyPoints,
          top: currentBenchmark.topEarnerDaily,
        },
        {
          label: 'Streak Days',
          yours: stats.streakDays,
          avg: currentBenchmark.avgStreak,
          top: 30,
        },
        {
          label: 'Referrals',
          yours: stats.referrals,
          avg: currentBenchmark.avgReferrals,
          top: currentBenchmark.avgReferrals * 4,
        },
      ]
    : [];

  return (
    <div className="page">
      <h1 className="section-title">🌍 Community Benchmarks</h1>
      <p className="section-subtitle">
        See how you compare to the average contributor at your tier — and what the top earners look like.
      </p>

      {currentBenchmark && (
        <div className={styles.comparisonCard}>
          <h2 className={styles.cardTitle}>
            Your Tier: {tierEmoji[tierInfo.current]}{' '}
            <span style={{ color: tierColors[tierInfo.current] }}>
              {tierInfo.current.charAt(0).toUpperCase() + tierInfo.current.slice(1)}
            </span>
          </h2>

          <div className={styles.compList}>
            {comparisons.map((c) => {
              const pct = c.top > 0 ? Math.min(100, Math.round((c.yours / c.top) * 100)) : 0;
              const avgPct = c.top > 0 ? Math.min(100, Math.round((c.avg / c.top) * 100)) : 0;
              const aboveAvg = c.yours >= c.avg;
              return (
                <div key={c.label} className={styles.compRow}>
                  <div className={styles.compHeader}>
                    <span className={styles.compLabel}>{c.label}</span>
                    <div className={styles.compValues}>
                      <span className={`${styles.yourVal} ${aboveAvg ? styles.good : styles.below}`}>
                        You: {c.yours.toLocaleString()}
                      </span>
                      <span className={styles.avgVal}>Avg: {c.avg.toLocaleString()}</span>
                      <span className={styles.topVal}>Top: {c.top.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className={styles.barTrack}>
                    <div className={styles.avgMarker} style={{ left: `${avgPct}%` }} />
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${pct}%`,
                        background: aboveAvg ? 'var(--green)' : 'var(--blue)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <h2 className={styles.allTitle}>All Tier Benchmarks</h2>
      <div className={styles.benchmarkGrid}>
        {BENCHMARKS.map((b) => (
          <div
            key={b.tier}
            className={`${styles.benchCard} ${b.tier === tierInfo.current ? styles.activeBench : ''}`}
          >
            <div className={styles.benchHeader}>
              <span className={styles.benchEmoji}>{tierEmoji[b.tier]}</span>
              <span className={styles.benchTier} style={{ color: tierColors[b.tier] }}>
                {b.tier.charAt(0).toUpperCase() + b.tier.slice(1)}
              </span>
            </div>
            <div className={styles.benchStats}>
              <div className={styles.benchStat}>
                <span className={styles.benchStatLabel}>Avg Daily</span>
                <span className={styles.benchStatValue}>{b.avgDailyPoints} pts</span>
              </div>
              <div className={styles.benchStat}>
                <span className={styles.benchStatLabel}>Avg Streak</span>
                <span className={styles.benchStatValue}>{b.avgStreak} days</span>
              </div>
              <div className={styles.benchStat}>
                <span className={styles.benchStatLabel}>Avg Refs</span>
                <span className={styles.benchStatValue}>{b.avgReferrals}</span>
              </div>
              <div className={styles.benchStat}>
                <span className={styles.benchStatLabel}>Top Earner</span>
                <span className={`${styles.benchStatValue} ${styles.topEarner}`}>{b.topEarnerDaily} pts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

CommunityBenchmarks.displayName = 'CommunityBenchmarks';
export default CommunityBenchmarks;
