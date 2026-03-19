import { memo } from 'react';
import { SeasonPhase } from '../../types';
import styles from './SeasonMap.module.css';

const PHASES: SeasonPhase[] = [
  {
    id: 1,
    name: 'Beta Launch',
    description: 'Platform opened to early contributors. Onboarding modules live. First annotation tasks available.',
    status: 'completed',
    date: 'Q4 2024',
  },
  {
    id: 2,
    name: 'Season 1 — Live Now',
    description: 'Full contributor platform open. Tasks live across all domains. Points accumulate with multipliers and streaks.',
    status: 'active',
    date: 'Q1 2025',
  },
  {
    id: 3,
    name: 'Expanded Task Types',
    description: 'Audio, video, and advanced robotics annotation tasks roll out. Higher-value enterprise jobs unlock for Specialist+ tiers.',
    status: 'upcoming',
    date: 'Q2 2025',
  },
  {
    id: 4,
    name: 'Token Generation Event',
    description: 'Perle token launches on Solana. Points convert to tokens. Contributors receive their earned allocations.',
    status: 'upcoming',
    date: 'TBA',
  },
  {
    id: 5,
    name: 'Season 2',
    description: 'New task categories, refreshed multiplier system, and expanded enterprise partnerships. Early Season 1 contributors get priority access.',
    status: 'upcoming',
    date: 'TBA',
  },
];

const statusConfig = {
  completed: { icon: '✅', label: 'Completed', color: 'var(--green)' },
  active: { icon: '⚡', label: 'Active Now', color: 'var(--accent)' },
  upcoming: { icon: '🔜', label: 'Coming Soon', color: 'var(--text-muted)' },
};

const SeasonMap = memo(() => {
  const activeIdx = PHASES.findIndex((p) => p.status === 'active');

  return (
    <div className="page">
      <h1 className="section-title">🗺️ Season 1 Map</h1>
      <p className="section-subtitle">
        Where we are in Season 1 and what's coming next on the Perle roadmap.
      </p>

      <div className={styles.activeBanner}>
        <span className={styles.activeDot} />
        <span>Season 1 is live — every task you complete today counts toward your token allocation.</span>
        <a
          href="https://app.perle.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.activeLink}
        >
          Start Contributing →
        </a>
      </div>

      <div className={styles.timeline}>
        {PHASES.map((phase, idx) => {
          const config = statusConfig[phase.status];
          const isLast = idx === PHASES.length - 1;
          return (
            <div key={phase.id} className={styles.phaseRow}>
              <div className={styles.phaseLeft}>
                <div
                  className={`${styles.phaseNode} ${styles[phase.status]}`}
                  style={{ borderColor: config.color }}
                >
                  <span>{config.icon}</span>
                </div>
                {!isLast && (
                  <div
                    className={styles.connector}
                    style={{
                      background: idx < activeIdx ? 'var(--green)' : idx === activeIdx ? 'var(--accent)' : 'var(--border)',
                    }}
                  />
                )}
              </div>

              <div className={`${styles.phaseContent} ${phase.status === 'active' ? styles.activePhase : ''}`}>
                <div className={styles.phaseHeader}>
                  <div>
                    <span className={styles.phaseName}>{phase.name}</span>
                    <span
                      className={styles.phaseStatus}
                      style={{ color: config.color, borderColor: config.color + '40' }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <span className={styles.phaseDate}>{phase.date}</span>
                </div>
                <p className={styles.phaseDesc}>{phase.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.ctaCard}>
        <div className={styles.ctaLeft}>
          <h2 className={styles.ctaTitle}>You're early. That matters.</h2>
          <p className={styles.ctaDesc}>
            Season 1 contributors get priority access to Season 2 and early token allocations.
            The best time to start was yesterday — the second best time is now.
          </p>
        </div>
        <div className={styles.ctaLinks}>
          <a href="https://app.perle.xyz" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Start Earning →
          </a>
          <a href="https://discord.gg/joinperle" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Join Discord
          </a>
        </div>
      </div>
    </div>
  );
});

SeasonMap.displayName = 'SeasonMap';
export default SeasonMap;
