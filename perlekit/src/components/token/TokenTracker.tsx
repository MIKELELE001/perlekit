import { memo, useEffect, useState, useCallback } from 'react';
import { fetchTokenPrice } from '../../services/tokenPrice';
import { TokenPrice } from '../../types';
import useCalculator from '../../hooks/useCalculator';
import styles from './TokenTracker.module.css';

const ASSUMED_TOKEN_RATE = 0.01;

const TokenTracker = memo(() => {
  const { stats, dailyPoints } = useCalculator();
  const [price, setPrice] = useState<TokenPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPrice = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTokenPrice();
      setPrice(data);
    } catch {
      setError('Could not load live price. Showing estimated values.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPrice();
    const interval = setInterval(() => { void loadPrice(); }, 60000);
    return () => clearInterval(interval);
  }, [loadPrice]);

  const solPrice = price?.solana ?? 0;
  const estimatedTokenValue = stats.totalPoints * ASSUMED_TOKEN_RATE;
  const estimatedUsdValue = estimatedTokenValue * solPrice;
  const dailyEstimatedUsd = dailyPoints * ASSUMED_TOKEN_RATE * solPrice;

  return (
    <div className="page">
      <h1 className="section-title">💰 Token Tracker</h1>
      <p className="section-subtitle">
        Live Solana price. Estimate your points' future value when the Perle token launches.
      </p>

      <div className={styles.solCard}>
        <div className={styles.solLeft}>
          <div className={styles.solLabel}>Solana (SOL) — Live Price</div>
          {loading && <div className={styles.solLoading}>Fetching price...</div>}
          {!loading && error && <div className={styles.solError}>{error}</div>}
          {!loading && price && (
            <div className={styles.solPrice}>${price.solana.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          )}
          {price && <div className={styles.solUpdated}>Last updated: {price.lastUpdated}</div>}
        </div>
        <div className={styles.solRight}>
          <div className={styles.solNetwork}>Perle runs on</div>
          <div className={styles.solBadge}>⚡ Solana</div>
          <div className={styles.solReason}>Near-instant, low-fee transactions for contributors worldwide</div>
        </div>
      </div>

      <div className={styles.estimateGrid}>
        <div className={styles.estimateCard}>
          <div className={styles.estimateLabel}>Your Total Points</div>
          <div className={styles.estimateValue}>{stats.totalPoints.toLocaleString()}</div>
          <div className={styles.estimateSub}>Accumulated so far</div>
        </div>
        <div className={styles.estimateCard}>
          <div className={styles.estimateLabel}>Estimated Token Value</div>
          <div className={`${styles.estimateValue} ${styles.accent}`}>
            {estimatedTokenValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} tokens
          </div>
          <div className={styles.estimateSub}>At assumed 0.01 tokens / pt</div>
        </div>
        <div className={styles.estimateCard}>
          <div className={styles.estimateLabel}>Estimated USD Value</div>
          <div className={`${styles.estimateValue} ${styles.green}`}>
            ${estimatedUsdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={styles.estimateSub}>Based on live SOL price</div>
        </div>
        <div className={styles.estimateCard}>
          <div className={styles.estimateLabel}>Daily Earning Value</div>
          <div className={`${styles.estimateValue} ${styles.blue}`}>
            ${dailyEstimatedUsd.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} / day
          </div>
          <div className={styles.estimateSub}>From your daily task earnings</div>
        </div>
      </div>

      <div className={styles.disclaimer}>
        <span>⚠️</span>
        <p>
          Token conversion rate is estimated and not officially confirmed by Perle Labs.
          These numbers are for planning purposes only. The official rate will be announced by the Perle team.
        </p>
      </div>

      <button onClick={loadPrice} className="btn-ghost" style={{ marginTop: 8 }}>
        🔄 Refresh Price
      </button>
    </div>
  );
});

TokenTracker.displayName = 'TokenTracker';
export default TokenTracker;
