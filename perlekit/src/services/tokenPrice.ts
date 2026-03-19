import { TokenPrice } from '../types';

const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd';

interface CoinGeckoResponse {
  solana: { usd: number };
}

const isCoinGeckoResponse = (data: unknown): data is CoinGeckoResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'solana' in data &&
    typeof (data as Record<string, unknown>).solana === 'object' &&
    (data as Record<string, Record<string, unknown>>).solana !== null &&
    typeof (data as Record<string, Record<string, unknown>>).solana.usd === 'number'
  );
};

export const fetchTokenPrice = async (): Promise<TokenPrice> => {
  const response = await fetch(COINGECKO_URL);
  if (!response.ok) {
    throw new Error(`Price fetch failed: ${response.status}`);
  }
  const raw: unknown = await response.json();
  if (!isCoinGeckoResponse(raw)) {
    throw new Error('Unexpected price data format');
  }
  return {
    solana: raw.solana.usd,
    lastUpdated: new Date().toLocaleTimeString(),
  };
};
