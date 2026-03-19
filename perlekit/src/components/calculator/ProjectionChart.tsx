import { memo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ContributorStats } from '../../types';
import { getProjections } from '../../utils/calculations';
import styles from './ProjectionChart.module.css';

interface Props {
  stats: ContributorStats;
  days: 7 | 14 | 30 | 60;
}

const ProjectionChart = memo(({ stats, days }: Props) => {
  const data = getProjections(stats, days);
  const finalTotal = data[data.length - 1]?.cumulative ?? 0;
  const totalGained = finalTotal - stats.totalPoints;

  return (
    <div className={styles.wrapper}>
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Points after {days} days</span>
          <span className={styles.summaryValue}>{finalTotal.toLocaleString()}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Points you'll gain</span>
          <span className={`${styles.summaryValue} ${styles.green}`}>+{totalGained.toLocaleString()}</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="pointsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,30,56,0.8)" />
          <XAxis
            dataKey="day"
            tick={{ fill: '#55557a', fontSize: 11, fontFamily: 'DM Mono' }}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Day', position: 'insideBottomRight', offset: -5, fill: '#55557a', fontSize: 11 }}
          />
          <YAxis
            tick={{ fill: '#55557a', fontSize: 11, fontFamily: 'DM Mono' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)}
          />
          <Tooltip
            contentStyle={{ background: '#0e0e1c', border: '1px solid #2a2a50', borderRadius: 8, fontFamily: 'DM Mono', fontSize: 12 }}
            labelStyle={{ color: '#8888aa' }}
            itemStyle={{ color: '#f59e0b' }}
            formatter={(value: number) => [value.toLocaleString(), 'Total Points']}
            labelFormatter={(label: number) => `Day ${label}`}
          />
          <Area type="monotone" dataKey="cumulative" stroke="#f59e0b" strokeWidth={2} fill="url(#pointsGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

ProjectionChart.displayName = 'ProjectionChart';
export default ProjectionChart;
