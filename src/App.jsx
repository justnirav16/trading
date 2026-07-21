import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import TradingChart from './components/TradingChart';
import AIAnalyticsPanel from './components/AIAnalyticsPanel';
import ForexFactoryNews from './components/ForexFactoryNews';
import CurrencyStrengthMeter from './components/CurrencyStrengthMeter';
import AICopilotChat from './components/AICopilotChat';
import RiskCalculator from './components/RiskCalculator';

import { generateInitialCandles, calculateLevels } from './services/marketData';

export default function App() {
  const [timeframe, setTimeframe] = useState('15m');
  const [activeView, setActiveView] = useState('chart'); // 'chart', 'analytics', 'macro'
  const [audioEnabled, setAudioEnabled] = useState(false);

  const [candles, setCandles] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(2420.50);
  const [priceChange, setPriceChange] = useState(0.42);
  const [high24h, setHigh24h] = useState(2435.10);
  const [low24h, setLow24h] = useState(2408.40);
  const [latestTick, setLatestTick] = useState(null);
  const [levels, setLevels] = useState(null);

  // Audio Context for soft tick sounds
  const audioCtxRef = useRef(null);

  const playTickSound = () => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.01, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 0.05);
    } catch (e) {}
  };

  // Load initial candles on timeframe change
  useEffect(() => {
    const initialData = generateInitialCandles(timeframe, 250);
    setCandles(initialData);

    if (initialData.length > 0) {
      const last = initialData[initialData.length - 1];
      setCurrentPrice(last.close);
      const computed = calculateLevels(initialData);
      setLevels(computed);
    }
  }, [timeframe]);

  // Real-time market tick loop (updates price every 800ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const delta = (Math.random() - 0.49) * 0.45; // Micro tick movement in dollars
        const nextPrice = parseFloat((prev + delta).toFixed(2));
        
        setPriceChange(p => parseFloat((p + (delta > 0 ? 0.01 : -0.01)).toFixed(2)));
        setHigh24h(h => Math.max(h, nextPrice));
        setLow24h(l => Math.min(l, nextPrice));
        
        setLatestTick({ price: nextPrice, time: Math.floor(Date.now() / 1000) });
        playTickSound();

        return nextPrice;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [audioEnabled]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Header Bar */}
      <Header
        currentPrice={currentPrice}
        priceChange={priceChange}
        high24h={high24h}
        low24h={low24h}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        activeView={activeView}
        setActiveView={setActiveView}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
      />

      {/* Main Workspace Body */}
      <main style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* VIEW 1: FULL TRADING TERMINAL */}
        {activeView === 'chart' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 360px',
            gap: '12px',
            height: 'calc(100vh - 120px)',
            minHeight: '650px'
          }}>
            {/* Center Main Trading Canvas */}
            <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '520px' }}>
              <TradingChart
                candles={candles}
                latestTick={latestTick}
                timeframe={timeframe}
                levels={levels}
              />
            </div>

            {/* Right Sidebar Column: AI Analytics & Currency Strength */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
              <div style={{ height: '55%' }}>
                <AIAnalyticsPanel currentPrice={currentPrice} levels={levels} timeframe={timeframe} />
              </div>
              <div style={{ height: '45%' }}>
                <CurrencyStrengthMeter />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: AI SIGNALS & COPILOT HUB */}
        {activeView === 'analytics' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 380px',
            gap: '12px',
            height: 'calc(100vh - 120px)'
          }}>
            <div style={{ height: '100%' }}>
              <AIAnalyticsPanel currentPrice={currentPrice} levels={levels} timeframe={timeframe} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <AICopilotChat currentPrice={currentPrice} />
              <RiskCalculator currentPrice={currentPrice} />
            </div>

            <div style={{ height: '100%' }}>
              <CurrencyStrengthMeter />
            </div>
          </div>
        )}

        {/* VIEW 3: FOREX FACTORY MACRO NEWS HUB */}
        {activeView === 'macro' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '12px',
            height: 'calc(100vh - 120px)'
          }}>
            <div style={{ height: '100%' }}>
              <ForexFactoryNews />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <CurrencyStrengthMeter />
              <RiskCalculator currentPrice={currentPrice} />
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
