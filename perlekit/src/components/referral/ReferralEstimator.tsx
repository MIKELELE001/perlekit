import { memo, lazy, Suspense } from 'react';
import useCalculator from '../../hooks/useCalculator';
import styles from './ReferralEstimator.module.css';

const ReferralChart = lazy(() => import('./ReferralChart'));

const ReferralEstimator = memo(() => {
  const { stats, updateStats, referralProjection } = useCalculator();

  const handleReferrals = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(0, Math.min(1000, Number(e.target.value)));
    updateStats({ referrals: val });
  };

  const handleActivity = (val: 'low' | 'medium' | 'high') => {
    updateStats({ referralActivity: val });
  };

  const activityLabels = {
    low: '1–3 tasks/day',
    medium: '4–8 tasks/day',
    high: '8+ tasks/day',
  };

  return (
    <div className="page">
      <h1 className="section-title">👥 Referral Earnings</h1>
      <p className="section-subtitle">
        You earn 10% of every point your referrals make. Calculate your passive income.
      </p>

      <div className={styles.grid}>
        <div className={styles.inputCard}>
          <h2 className={styles.cardTitle}>Referral Stats</h2>

          <div className={styles.field}>
            <label className={styles.label}>Number of People Referred</label>
            <input
              type="number"
              min={0}
              max={1000}
              value={stats.referrals}
              onChange={handleReferrals}
              className="input-field"
            />
            <span className={styles.hint}>How many people signed up using your link?</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Their Average Activity Level</label>
            <div className={styles.activityBtns}>
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => handleActivity(level)}
                  className={`${styles.activityBtn} ${stats.referralActivity === level ? styles.activeActivity : ''}`}
                >
                  <span className={styles.activityName}>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                  <span className={styles.activitySub}>{activityLabels[level]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.infoBox}>
            <span>💡</span>
            <span>You earn 10% of all points your referrals earn — passively, forever.</span>
          </div>
        </div>

        <div className={styles.resultsCard}>
          <h2 className={styles.cardTitle}>Your Passive Income</h2>
          <div className={styles.statsList}>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Daily</span>
              <span className={styles.statValue}>{referralProjection.daily.toLocaleString()} pts</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Weekly</span>
              <span className={styles.statValue}>{referralProjection.weekly.toLocaleString()} pts</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Monthly</span>
              <span className={`${styles.statValue} ${styles.highlight}`}>
                {referralProjection.monthly.toLocaleString()} pts
              </span>
            </div>
          </div>

          {stats.referrals === 0 && (
            <div className={styles.emptyState}>
              <span>🔗</span>
              <p>No referrals yet. Share your link on Perle to start earning passive points.</p>
              <a
                href="https://app.perle.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get My Referral Link →
              </a>
            </div>
          )}
        </div>
      </div>

      {stats.referrals > 0 && (
        <div className={styles.chartCard}>
          <h2 className={styles.cardTitle}>30-Day Referral Projection</h2>
          <Suspense fallback={<div className={styles.loading}>Loading chart...</div>}>
            <ReferralChart referralProjection={referralProjection} />
          </Suspense>
        </div>
      )}
    </div>
  );
});

ReferralEstimator.displayName = 'ReferralEstimator';
export default ReferralEstimator;
