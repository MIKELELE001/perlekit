import { memo, lazy, Suspense, useState } from 'react';
import useCalculator from '../../hooks/useCalculator';
import useStreak from '../../hooks/useStreak';
import styles from './StreakOptimizer.module.css';

const StreakGraph = lazy(() => import('./StreakGraph'));

const StreakOptimizer = memo(() => {
  const { stats, multiplierInfo } = useCalculator();
  const { reminderEnabled, reminderTime, requestReminder, cancelReminder, pointsAtRisk, daysToMaxMultiplier } = useStreak(stats.streakDays);
  const [time, setTime] = useState(reminderTime);
  const [msg, setMsg] = useState('');

  const handleSetReminder = async () => {
    const success = await requestReminder(time);
    setMsg(success ? '✅ Reminder set!' : '❌ Please allow notifications in your browser settings.');
    setTimeout(() => setMsg(''), 3000);
  };

  const missedDayPoints = Math.round(stats.dailyTasks * 10 * multiplierInfo.current);
  const streakResetLoss = pointsAtRisk;

  return (
    <div className="page">
      <h1 className="section-title">🔥 Streak Optimizer</h1>
      <p className="section-subtitle">Protect your multiplier. See exactly what you lose by missing a day.</p>

      <div className={styles.alertCards}>
        <div className={styles.alertCard}>
          <span className={styles.alertIcon}>📅</span>
          <div>
            <div className={styles.alertTitle}>If you miss tomorrow</div>
            <div className={styles.alertValue}>−{missedDayPoints.toLocaleString()} pts</div>
            <div className={styles.alertSub}>Lost daily earnings from missing check-in</div>
          </div>
        </div>
        <div className={`${styles.alertCard} ${stats.streakDays >= 3 ? styles.danger : ''}`}>
          <span className={styles.alertIcon}>⚠️</span>
          <div>
            <div className={styles.alertTitle}>Streak reset risk</div>
            <div className={styles.alertValue}>−{streakResetLoss.toLocaleString()} pts</div>
            <div className={styles.alertSub}>Estimated momentum lost if streak resets to 0</div>
          </div>
        </div>
        <div className={styles.alertCard}>
          <span className={styles.alertIcon}>🎯</span>
          <div>
            <div className={styles.alertTitle}>Days to max multiplier</div>
            <div className={styles.alertValue}>{daysToMaxMultiplier === 0 ? 'Achieved!' : `${daysToMaxMultiplier} days`}</div>
            <div className={styles.alertSub}>Max is 2.5× at 30-day streak</div>
          </div>
        </div>
      </div>

      <div className={styles.chartCard}>
        <h2 className={styles.cardTitle}>Multiplier Growth Curve</h2>
        <Suspense fallback={<div className={styles.loading}>Loading chart...</div>}>
          <StreakGraph currentStreak={stats.streakDays} />
        </Suspense>
      </div>

      <div className={styles.reminderCard}>
        <div className={styles.reminderLeft}>
          <h2 className={styles.cardTitle}>🔔 Daily Streak Reminder</h2>
          <p className={styles.reminderSub}>Never break your streak again. Set a browser notification reminder.</p>
          {msg && <p className={styles.reminderMsg}>{msg}</p>}
        </div>
        <div className={styles.reminderRight}>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input-field"
            style={{ width: 120 }}
          />
          {reminderEnabled ? (
            <button onClick={cancelReminder} className="btn-ghost">Cancel</button>
          ) : (
            <button onClick={handleSetReminder} className="btn-primary">Set Reminder</button>
          )}
        </div>
      </div>
    </div>
  );
});

StreakOptimizer.displayName = 'StreakOptimizer';
export default StreakOptimizer;
