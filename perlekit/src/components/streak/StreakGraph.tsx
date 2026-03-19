import { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts';
import { getMultiplier } from '../../utils/calculations';
import styles from './StreakGraph.module.css';

interface Props {
  currentStreak: number;
}

const buildData = () =>
  Array.from({ length: 31 }, (_, i) => ({ day: i, multiplier: getMultiplier(i) }));

const StreakGraph = memo(({ currentStreak }: Props) => {
  const data = buildData();

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,30,56,0.8)" />
          <XAxis
            dataKey="day"
            tick={{ fill: '#55557a', fontSize: 11, fontFamily: 'DM Mono' }}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Streak Day', position: 'insideBottomRight', offset: -5, fill: '#55557a', fontSize: 11 }}
          />
          <YAxis
            domain={[0.8, 2.7]}
            tick={{ fill: '#55557a', fontSize: 11, fontFamily: 'DM Mono' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${v}×`}
          />
          <Tooltip
            contentStyle={{ background: '#0e0e1c', border: '1px solid #2a2a50', borderRadius: 8, fontFamily: 'DM Mono', fontSize: 12 }}
            labelStyle={{ color: '#8888aa' }}
            itemStyle={{ color: '#f59e0b' }}
            formatter={(value: number) => [`${value}×`, 'Multiplier']}
            labelFormatter={(label: number) => `Day ${label}`}
          />
          {currentStreak > 0 && currentStreak <= 30 && (
            <ReferenceLine
              x={currentStreak}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              label={{ value: 'You', fill: '#f59e0b', fontSize: 11, fontFamily: 'DM Mono' }}
            />
          )}
          <Line type="stepAfter" dataKey="multiplier" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className={styles.milestones}>
        {[
          { day: 3, mult: '1.5×' },
          { day: 7, mult: '1.75×' },
          { day: 14, mult: '2.0×' },
          { day: 30, mult: '2.5×' },
        ].map((m) => (
          <div key={m.day} className={`${styles.milestone} ${currentStreak >= m.day ? styles.achieved : ''}`}>
            <span className={styles.milestoneMult}>{m.mult}</span>
            <span className={styles.milestoneDay}>Day {m.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

StreakGraph.displayName = 'StreakGraph';
export default StreakGraph;
