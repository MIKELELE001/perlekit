import { memo } from 'react';
import useCalculator from '../../hooks/useCalculator';
import { estimateLeaderboard } from '../../utils/calculations';
import styles from './LeaderboardSimulator.module.css';

const DEMO_LEADERBOARD = [
  { rank: 1, points: 48200, tier: 'Elite', badge: '👑' },
  { rank: 2, points: 41500, tier: 'Elite', badge: '👑' },
  { rank: 3, points: 38900, tier: 'Elite', badge: '👑' },
  { rank: 4, points: 32100, tier: 'Elite', badge: '👑' },
  { rank: 5, points: 28750, tier: 'Elite', badge: '👑' },
  { rank: 6, points: 24300, tier: 'Specialist', badge: '🔬' },
  { rank: 7, points: 21800, tier: 'Specialist', badge: '🔬' },
  { rank: 8, points: 18600, tier: 'Specialist', badge: '🔬' },
  { rank: 9, points: 15200, tier: 'Specialist', badge: '🔬' },
  { rank: 10, points: 12800, tier: 'Specialist', badge: '🔬' },
];

const LeaderboardSimulator = memo(() => {
  const { stats } = useCalculator();
  const estimate = estimateLeaderboard(stats.totalPoints);

  const yourRow = {
    rank: '?',
    points: stats.totalPoints,
    tier: estimate.label,
    badge: '📍',
    isYou: true,
  };

  return (
    <div className="page">
      <h1 className="section-title">🏆 Leaderboard Simulator</h1>
      <p className="section-subtitle">
        Estimate where you rank among all Perle contributors based on your points.
      </p>

      <div className={styles.estimateCard}>
        <div className={styles.estimateLeft}>
          <div className={styles.estimateLabel}>Your Estimated Rank</div>
          <div className={styles.estimateValue} style={{ color: estimate.color }}>
            {estimate.rank}
          </div>
          <div className={styles.estimateSub}>of all contributors on the platform</div>
        </div>
        <div className={styles.estimateRight}>
          <div className={styles.percentileLabel}>Percentile</div>
          <div className={styles.percentileBar}>
            <div
              className={styles.percentileFill}
              style={{ width: `${estimate.percentile}%`, backgroundColor: estimate.color }}
            />
          </div>
          <div className={styles.percentileValue} style={{ color: estimate.color }}>
            Top {100 - estimate.percentile}%
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.cardTitle}>Sample Leaderboard</h2>
          <span className={styles.disclaimer}>Illustrative data based on platform averages</span>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Rank</span>
            <span>Points</span>
            <span>Tier</span>
          </div>

          {DEMO_LEADERBOARD.map((row) => (
            <div key={row.rank} className={styles.tableRow}>
              <span className={styles.rankCell}>
                {row.rank <= 3 ? ['🥇', '🥈', '🥉'][row.rank - 1] : `#${row.rank}`}
              </span>
              <span className={styles.pointsCell}>{row.points.toLocaleString()}</span>
              <span className={styles.tierCell}>
                {row.badge} {row.tier}
              </span>
            </div>
          ))}

          {stats.totalPoints > 0 && (
            <>
              <div className={styles.dividerRow}>· · · your position · · ·</div>
              <div className={`${styles.tableRow} ${styles.youRow}`}>
                <span className={styles.rankCell}>📍 {estimate.rank}</span>
                <span className={styles.pointsCell}>{yourRow.points.toLocaleString()}</span>
                <span className={styles.tierCell} style={{ color: estimate.color }}>
                  ⭐ You — {estimate.label}
                </span>
              </div>
            </>
          )}

          {stats.totalPoints === 0 && (
            <div className={styles.emptyRow}>
              Enter your points in the Calculator to see your estimated rank
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

LeaderboardSimulator.displayName = 'LeaderboardSimulator';
export default LeaderboardSimulator;
