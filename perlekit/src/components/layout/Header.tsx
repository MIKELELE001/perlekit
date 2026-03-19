import { memo } from 'react';
import styles from './Header.module.css';

interface Props {
  username?: string;
  onResetProfile: () => void;
}

const Header = memo(({ username, onResetProfile }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>◆</span>
        <span className={styles.logoText}>PerleKit</span>
        <span className={styles.logoBadge}>Contributor Hub</span>
      </div>
      <div className={styles.links}>
        {username && (
          <div className={styles.userInfo}>
            <span className={styles.username}>@{username}</span>
            <button onClick={onResetProfile} className={styles.resetBtn} title="Switch profile">
              ↩
            </button>
          </div>
        )}
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
