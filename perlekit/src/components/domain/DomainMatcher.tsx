import { memo, useState } from 'react';
import { domainQuestions, matchDomain } from '../../utils/domainLogic';
import { DomainResult as DomainResultType } from '../../types';
import DomainResult from './DomainResult';
import styles from './DomainMatcher.module.css';

const DomainMatcher = memo(() => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<DomainResultType | null>(null);
  const [step, setStep] = useState(0);

  const currentQ = domainQuestions[step];
  const totalSteps = domainQuestions.length;
  const progress = (step / totalSteps) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setResult(matchDomain(newAnswers));
    }
  };

  const handleReset = () => {
    setAnswers({});
    setResult(null);
    setStep(0);
  };

  if (result) {
    return <DomainResult result={result} onReset={handleReset} />;
  }

  return (
    <div className="page">
      <h1 className="section-title">🧠 Domain Matcher</h1>
      <p className="section-subtitle">Answer 5 questions to find your highest-earning task domain on Perle.</p>

      <div className={styles.card}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.stepLabel}>Question {step + 1} of {totalSteps}</div>

        <h2 className={styles.question}>{currentQ.question}</h2>

        <div className={styles.options}>
          {currentQ.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className={`${styles.option} ${answers[currentQ.id] === opt.value ? styles.selected : ''}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className={styles.backBtn}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
});

DomainMatcher.displayName = 'DomainMatcher';
export default DomainMatcher;
