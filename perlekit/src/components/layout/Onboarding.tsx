import { memo, useState } from 'react';
import { getAllDomains } from '../../utils/domainLogic';
import { Domain } from '../../types';
import styles from './Onboarding.module.css';

interface Props {
  onComplete: (username: string, domain: Domain) => void;
}

const Onboarding = memo(({ onComplete }: Props) => {
  const [username, setUsername] = useState('');
  const [domain, setDomain] = useState<Domain | ''>('');
  const [error, setError] = useState('');

  const domains = getAllDomains();

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 50);
    setUsername(val);
    setError('');
  };

  const handleSubmit = () => {
    if (!username.trim()) {
      setError('Please enter your X username to continue.');
      return;
    }
    if (!domain) {
      setError('Please select your domain to continue.');
      return;
    }
    onComplete(username.trim(), domain as Domain);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◆</span>
          <span className={styles.logoText}>PerleKit</span>
        </div>

        <h1 className={styles.title}>Welcome to PerleKit</h1>
        <p className={styles.subtitle}>
          Your free strategy hub for maximizing earnings on Perle Labs.
          Takes 10 seconds to set up.
        </p>

        <div className={styles.field}>
          <label className={styles.label}>Your X (Twitter) Username</label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputPrefix}>@</span>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={handleUsername}
              className={styles.input}
              autoFocus
            />
          </div>
          <span className={styles.hint}>Used to personalise your dashboard. Stored only in your browser.</span>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Your Primary Domain</label>
          <div className={styles.domainGrid}>
            {domains.map((d) => (
              <button
                key={d.domain}
                onClick={() => setDomain(d.domain)}
                className={`${styles.domainBtn} ${domain === d.domain ? styles.activeDomain : ''}`}
              >
                <span className={styles.domainEmoji}>{d.emoji}</span>
                <span className={styles.domainName}>{d.displayName}</span>
              </button>
            ))}
          </div>
          <span className={styles.hint}>You can change this anytime in the Domain Matcher.</span>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button onClick={handleSubmit} className={styles.submitBtn}>
          Enter PerleKit →
        </button>

        <p className={styles.privacy}>
          No account. No password. No data leaves your browser.
        </p>
      </div>
    </div>
  );
});

Onboarding.displayName = 'Onboarding';
export default Onboarding;
