import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '⚡' },
  { path: '/calculator', label: 'Points Calculator', icon: '🔢' },
  { path: '/streak', label: 'Streak Optimizer', icon: '🔥' },
  { path: '/domain', label: 'Domain Matcher', icon: '🧠' },
  { path: '/tier', label: 'Tier Tracker', icon: '📈' },
  { path: '/referral', label: 'Referral Earnings', icon: '👥' },
  { path: '/action', label: 'Daily Action Plan', icon: '📋' },
  { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { path: '/token', label: 'Token Tracker', icon: '💰' },
  { path: '/benchmarks', label: 'Benchmarks', icon: '🌍' },
  { path: '/season', label: 'Season Map', icon: '🗺️' },
];

const Sidebar = memo(() => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className={styles.footer}>
        <p className={styles.footerText}>Community tool by the Perle ecosystem</p>
        <a
          href="https://discord.gg/joinperle"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.discordLink}
        >
          Join Discord →
        </a>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;
