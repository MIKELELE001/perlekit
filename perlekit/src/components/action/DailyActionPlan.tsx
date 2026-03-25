import { memo, useMemo } from 'react';
import useCalculator from '../../hooks/useCalculator';
import { buildActionPlan } from './buildActionPlan';
import styles from './DailyActionPlan.module.css';

const priorityColors = {
  high: 'var(--accent)',
  medium: 'var(--blue)',
  low: 'var(--text-muted)',
};

const priorityLabels = {
  high: 'Must Do',
  medium: 'Should Do',
  low: 'Nice to Do',
};

const DailyActionPlan = memo(() => {
  const { stats, dailyPoints, totalDailyEarnings } = useCalculator();

  const actions = useMemo(
    () => buildActionPlan(dailyPoints, stats.streakDays, stats.referrals, stats.dailyTasks, stats.totalPoints),
    [dailyPoints, stats.streakDays, stats.referrals, stats.dailyTasks, stats.totalPoints]
  );

  const totalPossible = actions.reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="page">
      <h1 className="section-title">📋 Daily Action Plan</h1>
      <p className="section-subtitle">Your personalized to-do list for today based on your stats.</p>

      <div className={styles.summaryCard}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>If you complete everything today</span>
          <span className={styles.summaryValue}>+{totalPossible.toLocaleString()} pts</span>
        </div>
        <div className={styles.summaryDivider} />
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Your baseline daily earnings</span>
          <span className={styles.summaryValue}>{totalDailyEarnings.toLocaleString()} pts</span>
        </div>
      </div>

      <div className={styles.actionList}>
        {actions.map((action, idx) => (
          <div key={action.id} className={styles.actionItem}>
            <div className={styles.actionNumber}>{String(idx + 1).padStart(2, '0')}</div>
            <div className={styles.actionBody}>
              <div className={styles.actionTask}>{action.task}</div>
              <div className={styles.actionMeta}>
                <span
                  className={styles.priorityBadge}
                  style={{ color: priorityColors[action.priority], borderColor: priorityColors[action.priority] + '40' }}
                >
                  {priorityLabels[action.priority]}
                </span>
                <span className={styles.actionPoints}>+{action.points} pts</span>
              </div>
            </div>
            <a href="https://app.perle.xyz" target="_blank" rel="noopener noreferrer" className={styles.goBtn}>
              Go →
            </a>
          </div>
        ))}
      </div>

      <div className={styles.discordBanner}>
        <span>💬</span>
        <div>
          <div className={styles.discordTitle}>Check for bonus tasks in Discord</div>
          <div className={styles.discordSub}>Perle regularly posts limited bonus tasks worth extra points</div>
        </div>
        <a href="https://discord.gg/joinperle" target="_blank" rel="noopener noreferrer" className="btn-ghost">
          Open Discord
        </a>
      </div>
    </div>
  );
});

DailyActionPlan.displayName = 'DailyActionPlan';
export default DailyActionPlan;
