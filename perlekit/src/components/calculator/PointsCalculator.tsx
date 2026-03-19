import { memo, useState } from 'react';
import { lazy, Suspense } from 'react';
import useCalculator from '../../hooks/useCalculator';
import MultiplierDisplay from './MultiplierDisplay';
import styles from './PointsCalculator.module.css';

const ProjectionChart = lazy(() => import('./ProjectionChart'));

const PointsCalculator = memo(() => {
  const { stats, updateStats, multiplierInfo, dailyPoints } = useCalculator();
  const [projDays, setProjDays] = useState<7 | 14 | 30 | 60>(30);

  const handleStreak = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(0, Math.min(365, Number(e.target.value)));
    updateStats({ streakDays: val });
  };

  const handleTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(1, Math.min(100, Number(e.target.value)));
    updateStats({ dailyTasks: val });
  };

  const handleTotalPoints = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(0, Number(e.target.value));
    updateStats({ totalPoints: val });
  };

  return (
    <div className="page">
      <h1 className="section-title">🔢 Points Calculator</h1>
      <p className="section-subtitle">Enter your stats to calculate your earnings and see your 60-day projection.</p>

      <div className={styles.grid}>
        <div className={styles.inputsCard}>
          <h2 className={styles.cardTitle}>Your Stats</h2>

          <div className={styles.field}>
            <label className={styles.label}>Current Streak (days)</label>
            <input
              type="number"
              min={0}
              max={365}
              value={stats.streakDays}
              onChange={handleStreak}
              className="input-field"
            />
            <span className={styles.hint}>How many days in a row have you checked in?</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Daily Tasks Completed</label>
            <input
              type="number"
              min={1}
              max={100}
              value={stats.dailyTasks}
              onChange={handleTasks}
              className="input-field"
            />
            <span className={styles.hint}>Average tasks you complete per day</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Total Points Earned So Far</label>
            <input
              type="number"
              min={0}
              value={stats.totalPoints}
              onChange={handleTotalPoints}
              className="input-field"
            />
            <span className={styles.hint}>Find this in your Perle dashboard</span>
          </div>
        </div>

        <MultiplierDisplay multiplierInfo={multiplierInfo} />
      </div>

      <div className={styles.resultsRow}>
        <div className={styles.resultCard}>
          <div className={styles.resultLabel}>Daily Points (with multiplier)</div>
          <div className={styles.resultValue}>{dailyPoints.toLocaleString()}</div>
        </div>
        <div className={styles.resultCard}>
          <div className={styles.resultLabel}>Points per Task</div>
          <div className={styles.resultValue}>{(10 * multiplierInfo.current).toFixed(1)}</div>
        </div>
        <div className={styles.resultCard}>
          <div className={styles.resultLabel}>Weekly Projection</div>
          <div className={styles.resultValue}>{(dailyPoints * 7).toLocaleString()}</div>
        </div>
      </div>

      <div className={styles.projectionCard}>
        <div className={styles.projHeader}>
          <h2 className={styles.cardTitle}>Earnings Projection</h2>
          <div className={styles.dayTabs}>
            {([7, 14, 30, 60] as const).map((d) => (
              <button
                key={d}
                onClick={() => setProjDays(d)}
                className={`${styles.dayTab} ${projDays === d ? styles.activeTab : ''}`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>
        <Suspense fallback={<div className={styles.chartLoading}>Loading chart...</div>}>
          <ProjectionChart stats={stats} days={projDays} />
        </Suspense>
      </div>
    </div>
  );
});

PointsCalculator.displayName = 'PointsCalculator';
export default PointsCalculator;
