import { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ReferralProjection } from '../../types';

interface Props {
  referralProjection: ReferralProjection;
}

const buildData = (daily: number) =>
  Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    points: (i + 1) * daily,
  }));

const ReferralChart = memo(({ referralProjection }: Props) => {
  const data = buildData(referralProjection.daily);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="refGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,30,56,0.8)" />
        <XAxis
          dataKey="day"
          tick={{ fill: '#55557a', fontSize: 11, fontFamily: 'DM Mono' }}
          tickLine={false}
          axisLine={false}
          interval={4}
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
          formatter={(value: number) => [value.toLocaleString(), 'Cumulative Referral Points']}
          labelFormatter={(label: number) => `Day ${label}`}
        />
        <Bar dataKey="points" fill="url(#refGrad)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
});

ReferralChart.displayName = 'ReferralChart';
export default ReferralChart;
