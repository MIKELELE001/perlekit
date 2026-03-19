import { memo } from 'react';
import { MultiplierInfo } from '../../types';
import styles from './MultiplierDisplay.module.css';

interface Props {
  multiplierInfo: MultiplierInfo;
}

const THRESHOLDS = [
  { days: 0, mult: 1.0, label: 'Base' },
  { days: 3, mult: 1.5, label: '3-day' },
  { days: 7, mult: 1.75, label: '7-day' },
  { days: 14, mult: 2.0, label: '14-day' },
  { days: 30, mult: 2.5, label: '30-day' },
];

const MultiplierDisplay = memo(({ multiplierInfo }: Props) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Active Multiplier</h2>
      <div className={styles.bigNumber}>{multiplierInfo.current}×</div>

      <div className={styles.track}>
        {THRESHOLDS.map((t, i) => {
          const isActive = multiplierInfo.current >= t.mult;
          const isCurrent = multiplierInfo.current === t.mult;
          return (
            <div key={t.days} className={styles.step}>
              <div className={`${styles.dot} ${isActive ? styles.activeDot : ''} ${isCurrent ? styles.currentDot : ''}`} />
              {i < THRESHOLDS.length - 1 && (
                <div className={`${styles.line} ${isActive && multiplierInfo.current > t.mult ? styles.activeLine : ''}`} />
              )}
              <span className={styles.stepLabel}>{t.mult}×</span>
              <span className={styles.stepDays}>{t.label}</span>
            </div>
          );
        })}
      </div>

      {!multiplierInfo.isMax && (
        <div className={styles.nextBadge}>
          🎯 {multiplierInfo.daysToNext} more day{multiplierInfo.daysToNext !== 1 ? 's' : ''} → {multiplierInfo.nextMultiplier}×
        </div>
      )}

      {multiplierInfo.isMax && (
        <div className={styles.maxBadge}>🏆 Max multiplier achieved!</div>
      )}
    </div>
  );
});

MultiplierDisplay.displayName = 'MultiplierDisplay';
export default MultiplierDisplay;
