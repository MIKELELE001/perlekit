import { memo } from 'react';
import styles from './Header.module.css';

const Header = memo(() => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>◆</span>
        <span className={styles.logoText}>PerleKit</span>
        <span className={styles.logoBadge}>Contributor Hub</span>
      </div>
      <div className={styles.links}>
        <a
          href="https://app.perle.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaLink}
        >
          Start Earning →
        </a>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
