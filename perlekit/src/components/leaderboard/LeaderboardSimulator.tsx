import { memo, useEffect, useState } from 'react';
import useCalculator from '../../hooks/useCalculator';
import { estimateLeaderboard } from '../../utils/calculations';
import { fetchLeaderboard, LeaderboardEntry } from '../../services/supabase';
import { useUsername } from '../../context/UserContext';
import { Tier } from '../../types';
import { getTierInfo } from '../../utils/calculations';
import styles from './LeaderboardSimulator.module.css';

const tierEmoji: Record<Tier, string> = {
  newcomer: '🌱', contributor: '⚡', verified: '✅', specialist: '🔬', elite: '👑',
};

const LeaderboardSimulator = memo(() => {
  const { stats } = useCalculator();
  const username = useUsername();
  const estimate = estimateLeaderboard(stats.totalPoints);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchLeaderboard();
        setLeaderboard(data);
      } catch {
        setError('Could not load live leaderboard.');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const userRankIndex = leaderboard.findIndex(
    (e) => e.username.toLowerCase() === username.toLowerCase()
  );
  const userRank = userRankIndex === -1 ? null : userRankIndex + 1;

  return (
    <div className="page">
      <h1 className="section-title">🏆 Leaderboard</h1>
      <p className="section-subtitle">
        Real rankings from everyone using PerleKit. Updates every time a contributor saves their stats.
      </p>

      <div className={styles.estimateCard}>
        <div className={styles.estimateLeft}>
          <div className={styles.estimateLabel}>Your Estimated Rank</div>
          <div className={styles.estimateValue} style={{ color: estimate.color }}>
            {userRank ? `#${userRank}` : estimate.rank}
          </div>
          <div className={styles.estimateSub}>
            {userRank ? 'Based on real leaderboard data' : 'Based on your total points'}
          </div>
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
          <h2 className={styles.cardTitle}>
            {loading ? 'Loading leaderboard...' : `Top ${leaderboard.length} Contributors`}
          </h2>
          {!loading && !error && (
            <span className={styles.liveTag}>🟢 Live</span>
          )}
        </div>

        {error && (
          <div className={styles.errorRow}>{error}</div>
        )}

        {!loading && !error && leaderboard.length === 0 && (
          <div className={styles.emptyRow}>
            No contributors yet — you could be first! Update your stats in the Points Calculator.
          </div>
        )}

        {!loading && leaderboard.length > 0 && (
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>Rank</span>
              <span>Username</span>
              <span>Points</span>
              <span>Tier</span>
            </div>
            {leaderboard.map((entry, idx) => {
              const isYou = entry.username.toLowerCase() === username.toLowerCase();
              const tier = getTierInfo(entry.total_points);
              return (
                <div
                  key={entry.username}
                  className={`${styles.tableRow} ${isYou ? styles.youRow : ''}`}
                >
                  <span className={styles.rankCell}>{getRankEmoji(idx + 1)}</span>
                  <span className={styles.usernameCell}>
                    @{entry.username}{isYou ? ' 👈' : ''}
                  </span>
                  <span className={styles.pointsCell}>{entry.total_points.toLocaleString()}</span>
                  <span className={styles.tierCell}>
                    {tierEmoji[tier.current]} {tier.current}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

LeaderboardSimulator.displayName = 'LeaderboardSimulator';
export default LeaderboardSimulator;
