import { memo } from 'react';
import { DomainResult as DomainResultType } from '../../types';
import styles from './DomainResult.module.css';

interface Props {
  result: DomainResultType;
  onReset: () => void;
}

const potentialColors = {
  high: 'var(--blue)',
  'very-high': 'var(--green)',
  medium: 'var(--purple)',
};

const potentialLabels = {
  high: 'High',
  'very-high': 'Very High ⭐',
  medium: 'Medium',
};

const DomainResult = memo(({ result, onReset }: Props) => {
  return (
    <div className="page">
      <h1 className="section-title">🧠 Domain Matcher</h1>
      <p className="section-subtitle">Based on your answers, here's your best fit.</p>

      <div className={styles.resultCard}>
        <div className={styles.resultHeader}>
          <span className={styles.emoji}>{result.emoji}</span>
          <div>
            <h2 className={styles.domainName}>{result.displayName}</h2>
            <div className={styles.potential} style={{ color: potentialColors[result.earningPotential] }}>
              Earning Potential: {potentialLabels[result.earningPotential]}
            </div>
          </div>
        </div>

        <p className={styles.description}>{result.description}</p>

        <div className={styles.reasonBox}>
          <span className={styles.reasonLabel}>💡 Why this pays more for you</span>
          <p className={styles.reasonText}>{result.reason}</p>
        </div>

        <div className={styles.taskTypes}>
          <div className={styles.taskTitle}>Task types you'll unlock:</div>
          <div className={styles.taskList}>
            {result.taskTypes.map((t) => (
              <span key={t} className={styles.taskTag}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <a
            href="https://app.perle.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Start {result.displayName} Tasks →
          </a>
          <button onClick={onReset} className="btn-ghost">Retake Quiz</button>
        </div>
      </div>
    </div>
  );
});

DomainResult.displayName = 'DomainResult';
export default DomainResult;
