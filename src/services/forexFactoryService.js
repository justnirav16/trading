/**
 * Forex Factory USD Economic News Service
 * Tracks High-Impact Red Folder USD News, Countdown Timers, and AI XAU/USD Impact Analysis.
 */

export const INITIAL_USD_NEWS = [
  {
    id: 'news-1',
    currency: 'USD',
    title: 'Core CPI m/m (Consumer Price Index)',
    impact: 'High', // Red Folder
    time: 'In 1h 45m',
    timestamp: Date.now() + (105 * 60 * 1000),
    forecast: '0.3%',
    previous: '0.2%',
    actual: null,
    aiAnalysis: 'Bullish USD / Bearish Gold (XAU/USD) if actual > 0.3%. High volatility expected near $2425 zone.',
    historicalImpact: 'Avg 18.5 Gold pip spike within 5 mins.'
  },
  {
    id: 'news-2',
    currency: 'USD',
    title: 'Non-Farm Employment Change (NFP)',
    impact: 'High',
    time: 'Tomorrow, 12:30 GMT',
    timestamp: Date.now() + (18 * 3600 * 1000),
    forecast: '175K',
    previous: '206K',
    actual: null,
    aiAnalysis: 'Key USD liquidity driver. NFP beat will spark aggressive selloff in XAU/USD towards $2400.',
    historicalImpact: 'Avg 34.0 Gold pip move.'
  },
  {
    id: 'news-3',
    currency: 'USD',
    title: 'FOMC Federal Funds Rate & Statement',
    impact: 'High',
    time: 'Thursday, 18:00 GMT',
    timestamp: Date.now() + (42 * 3600 * 1000),
    forecast: '5.25%',
    previous: '5.50%',
    actual: null,
    aiAnalysis: '25bps rate cut priced in. Dovish Fed statement will catalyze massive rally towards $2450+ ATH zone.',
    historicalImpact: 'Avg 48.2 Gold pip move.'
  },
  {
    id: 'news-4',
    currency: 'USD',
    title: 'Unemployment Claims',
    impact: 'High',
    time: 'Thursday, 12:30 GMT',
    timestamp: Date.now() + (36 * 3600 * 1000),
    forecast: '235K',
    previous: '243K',
    actual: null,
    aiAnalysis: 'Higher claims indicate labor market cooling -> Weakens USD -> Bullish XAU/USD.',
    historicalImpact: 'Avg 12.0 Gold pip move.'
  },
  {
    id: 'news-5',
    currency: 'USD',
    title: 'ISM Manufacturing PMI',
    impact: 'Medium',
    time: 'Friday, 14:00 GMT',
    timestamp: Date.now() + (60 * 3600 * 1000),
    forecast: '49.1',
    previous: '48.5',
    actual: null,
    aiAnalysis: 'PMI > 50 signals expansion, strengthening USD and putting downward pressure on bullion.',
    historicalImpact: 'Avg 9.5 Gold pip move.'
  }
];

export function getUpcomingUSDNews() {
  return INITIAL_USD_NEWS;
}

export function formatTimeRemaining(targetTimestamp) {
  const diff = targetTimestamp - Date.now();
  if (diff <= 0) return 'EVENT LIVE';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
}
