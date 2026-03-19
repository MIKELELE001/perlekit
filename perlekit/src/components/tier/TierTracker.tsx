import { memo } from 'react';
import useCalculator from '../../hooks/useCalculator';
import { getTierList } from '../../utils/calculations';
import { Tier } from '../../types';
import styles from './TierTracker.module.css';

const tierColors: Record<Tier, string> = {
  newcomer: 'var(--text-muted)',
  contributor: 'var(--purple)',
  verified: 'var(--blue)',
  specialist: 'var(--green)',
  elite: 'var(--accent)',
};

const tierEmoji: Record<Tier, string> = {
  newcomer: '🌱',
  contributor: '⚡',
  verified: '✅',
  specialist: '🔬',
  elite: '👑',
};

const TierTracker = memo(() => {
  const { tierInfo } = useCalculator();
  const allTiers = getTierList();

  return (
    <div className="page">
      <h1 className="section-title">📈 Tier Tracker</h1>
      <p className="section-subtitle">Track your progression and see what unlocks at each tier.</p>

      <div className={styles.currentCard}>
        <div className={styles.currentLeft}>
          <span className={styles.currentEmoji}>{tierEmoji[tierInfo.current]}</span>
          <div>
            <div className={styles.currentLabel}>Current Tier</div>
            <div className={styles.currentName} style={{ color: tierColors[tierInfo.current] }}>
              {tierInfo.current.charAt(0).toUpperCase() + tierInfo.current.slice(1)}
            </div>
          </div>
        </div>
        {tierInfo.nextTier && (
          <div className={styles.nextInfo}>
            <div className={styles.nextLabel}>Next: {tierInfo.nextTier}</div>
            <div className={styles.nextPoints}>{tierInfo.pointsNeeded.toLocaleString()} pts needed</div>
          </div>
        )}
        {!tierInfo.nextTier && (
          <div className={styles.maxBadge}>👑 Max Tier Reached</div>
        )}
      </div>

      {tierInfo.nextTier && (
        <div className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Progress to {tierInfo.nextTier}</span>
            <span className={styles.progressPercent}>{tierInfo.progress}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${tierInfo.progress}%` }} />
          </div>
        </div>
      )}

      <div className={styles.perksCard}>
        <h2 className={styles.cardTitle}>Current Perks</h2>
        <div className={styles.perkList}>
          {tierInfo.perks.map((perk) => (
            <div key={perk} className={styles.perkItem}>
              <span className={styles.perkIcon}>✓</span>
              <span>{perk}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className={styles.allTiersTitle}>All Tiers</h2>
      <div className={styles.tierList}>
        {allTiers.map((t) => {
          const isActive = t.tier === tierInfo.current;
          const isPast = allTiers.findIndex((x) => x.tier === t.tier) < allTiers.findIndex((x) => x.tier === tierInfo.current);
          return (
            <div key={t.tier} className={`${styles.tierRow} ${isActive ? styles.activeTier : ''} ${isPast ? styles.pastTier : ''}`}>
              <div className={styles.tierLeft}>
                <span className={styles.tierEmoji}>{tierEmoji[t.tier]}</span>
                <div>
                  <div className={styles.tierName} style={{ color: isActive || isPast ? tierColors[t.tier] : 'var(--text-muted)' }}>
                    {t.tier.charAt(0).toUpperCase() + t.tier.slice(1)}
                  </div>
                  <div className={styles.tierRange}>{t.min.toLocaleString()}+ pts</div>
                </div>
              </div>
              <div className={styles.tierPerks}>
                {t.perks.map((p) => (
                  <span key={p} className={styles.miniPerk}>{p}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

TierTracker.displayName = 'TierTracker';
export default TierTracker;
