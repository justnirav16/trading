/**
 * Real-time XAU/USD (Gold) Market Data Service
 * Provides live ticks, candle streams, indicators, order book, and technical metrics.
 */

// Generate realistic initial XAU/USD historical candles
export function generateInitialCandles(timeframe = '15m', count = 300) {
  const candles = [];
  let basePrice = 2420.50; // Current realistic Gold price level in $/oz
  const now = Math.floor(Date.now() / 1000);
  
  // Timeframe interval in seconds
  const intervals = {
    '1m': 60,
    '5m': 300,
    '15m': 900,
    '1h': 3600,
    '4h': 14400,
    '1D': 86400
  };
  const step = intervals[timeframe] || 900;
  
  let currentPrice = basePrice;
  let trend = 0.05; // Slightly bullish gold bias

  for (let i = count; i >= 0; i--) {
    const time = now - (i * step);
    const volatility = 1.2 + Math.random() * 2.5; // Gold dollar movement per candle
    
    // Add micro random walk
    const change = (Math.random() - 0.48 + trend) * volatility;
    const open = parseFloat(currentPrice.toFixed(2));
    const close = parseFloat((open + change).toFixed(2));
    
    const high = parseFloat((Math.max(open, close) + Math.random() * volatility * 0.8).toFixed(2));
    const low = parseFloat((Math.min(open, close) - Math.random() * volatility * 0.8).toFixed(2));
    const volume = Math.floor(150 + Math.random() * 1200);

    candles.push({ time, open, high, low, close, volume });
    currentPrice = close;
  }

  return candles;
}

// Calculate Exponential Moving Average (EMA)
export function calculateEMA(candles, period) {
  const k = 2 / (period + 1);
  let emaArray = [];
  let prevEma = candles[0].close;

  for (let i = 0; i < candles.length; i++) {
    const close = candles[i].close;
    if (i < period) {
      prevEma = (prevEma + close) / 2;
    } else {
      prevEma = close * k + prevEma * (1 - k);
    }
    emaArray.push({
      time: candles[i].time,
      value: parseFloat(prevEma.toFixed(2))
    });
  }
  return emaArray;
}

// Calculate Relative Strength Index (RSI 14)
export function calculateRSI(candles, period = 14) {
  let rsiArray = [];
  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = candles[i].close - candles[i - 1].close;
    if (change >= 0) gains += change;
    else losses -= change;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = period + 1; i < candles.length; i++) {
    const change = candles[i].close - candles[i - 1].close;
    if (change >= 0) {
      avgGain = (avgGain * (period - 1) + change) / period;
      avgLoss = (avgLoss * (period - 1)) / period;
    } else {
      avgGain = (avgGain * (period - 1)) / period;
      avgLoss = (avgLoss * (period - 1) - change) / period;
    }

    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));

    rsiArray.push({
      time: candles[i].time,
      value: parseFloat(rsi.toFixed(2))
    });
  }

  return rsiArray;
}

// Calculate Key Support & Resistance (Pivot Points, Liquidity Zones)
export function calculateLevels(candles) {
  if (!candles || candles.length < 50) return { supports: [], resistances: [] };
  
  const recent = candles.slice(-50);
  const closes = recent.map(c => c.close);
  const maxPrice = Math.max(...recent.map(c => c.high));
  const minPrice = Math.min(...recent.map(c => c.low));
  const currentPrice = closes[closes.length - 1];

  const pivot = (maxPrice + minPrice + currentPrice) / 3;

  return {
    pivot: parseFloat(pivot.toFixed(2)),
    r1: parseFloat((2 * pivot - minPrice).toFixed(2)),
    r2: parseFloat((pivot + (maxPrice - minPrice)).toFixed(2)),
    s1: parseFloat((2 * pivot - maxPrice).toFixed(2)),
    s2: parseFloat((pivot - (maxPrice - minPrice)).toFixed(2)),
    currentPrice
  };
}

// Simulated Live Order Book (Bid / Ask depth)
export function generateOrderBook(currentPrice) {
  const bids = [];
  const asks = [];
  let bidVolSum = 0;
  let askVolSum = 0;

  for (let i = 1; i <= 8; i++) {
    const bidPrice = (currentPrice - (i * 0.15)).toFixed(2);
    const bidVol = (Math.random() * 25 + 5).toFixed(1);
    bidVolSum += parseFloat(bidVol);
    bids.push({ price: bidPrice, volume: bidVol, total: bidVolSum.toFixed(1) });

    const askPrice = (currentPrice + (i * 0.15)).toFixed(2);
    const askVol = (Math.random() * 25 + 5).toFixed(1);
    askVolSum += parseFloat(askVol);
    asks.push({ price: askPrice, volume: askVol, total: askVolSum.toFixed(1) });
  }

  return { bids, asks };
}
