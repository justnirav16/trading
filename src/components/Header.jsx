import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Cpu, 
  Zap, 
  Clock, 
  Globe, 
  Volume2, 
  VolumeX, 
  GitBranch, 
  Layout, 
  Sliders
} from 'lucide-react';

export default function Header({ 
  currentPrice, 
  priceChange, 
  high24h, 
  low24h, 
  timeframe, 
  setTimeframe, 
  activeView, 
  setActiveView, 
  audioEnabled, 
  setAudioEnabled 
}) {
  const isPositive = priceChange >= 0;

  return (
    <header style={{
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      padding: '8px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      {/* Top Main Navigation Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        
        {/* Brand & Symbol Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, rgba(240, 185, 11, 0.2), rgba(157, 78, 221, 0.2))',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid var(--border-accent)'
          }}>
            <Cpu size={20} className="text-gold" />
            <span style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '0.5px', color: '#fff' }}>
              AGY <span className="text-gold">XAU/USD</span> AI TERMINAL
            </span>
          </div>

          <div className="badge badge-ai" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={12} /> AI QUANT ENGINE 3.6 PRO
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
            <span className="live-indicator"></span>
            <span style={{ color: 'var(--accent-bullish)', fontWeight: 600 }}>LIVE INTERBANK FEED</span>
          </div>
        </div>

        {/* Layout & Mode Switcher Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button 
            className={`btn-tv ${activeView === 'chart' ? 'btn-tv-active' : ''}`}
            onClick={() => setActiveView('chart')}
          >
            <Layout size={14} /> Full Terminal
          </button>
          <button 
            className={`btn-tv ${activeView === 'analytics' ? 'btn-tv-active' : ''}`}
            onClick={() => setActiveView('analytics')}
          >
            <Cpu size={14} /> AI Signals Hub
          </button>
          <button 
            className={`btn-tv ${activeView === 'macro' ? 'btn-tv-active' : ''}`}
            onClick={() => setActiveView('macro')}
          >
            <Globe size={14} /> Forex Factory Macro
          </button>
        </div>

        {/* Quick Tools & GitHub Repo Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="btn-tv" 
            onClick={() => setAudioEnabled(!audioEnabled)}
            title={audioEnabled ? 'Mute price tick audio' : 'Enable price tick audio'}
          >
            {audioEnabled ? <Volume2 size={14} className="text-gold" /> : <VolumeX size={14} className="text-muted" />}
          </button>

          <a 
            href="https://github.com/justnirav16/trading.git" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-tv btn-tv-ai"
            style={{ textDecoration: 'none' }}
          >
            <GitBranch size={14} /> Git Repo Online
          </a>
        </div>
      </div>

      {/* Ticker & Timeframe Selector Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        backgroundColor: 'var(--bg-primary)',
        padding: '6px 12px',
        borderRadius: '6px',
        border: '1px solid var(--border-subtle)',
        fontSize: '13px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Live Gold Price Ticker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>GOLD (XAU/USD):</span>
            <span className="font-mono" style={{ fontSize: '17px', fontWeight: 800, color: isPositive ? 'var(--accent-bullish)' : 'var(--accent-bearish)' }}>
              ${currentPrice ? currentPrice.toFixed(2) : '2420.50'}
            </span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: '12px',
              color: isPositive ? 'var(--accent-bullish)' : 'var(--accent-bearish)'
            }}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {isPositive ? '+' : ''}{priceChange ? priceChange.toFixed(2) : '0.00'}%
            </span>
          </div>

          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '12px' }}>
            <div>24h High: <span className="font-mono text-bright">${high24h ? high24h.toFixed(2) : '2435.10'}</span></div>
            <div>24h Low: <span className="font-mono text-bright">${low24h ? low24h.toFixed(2) : '2408.40'}</span></div>
            <div>Spread: <span className="font-mono text-gold">1.2 pips</span></div>
          </div>
        </div>

        {/* Timeframe selector pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginRight: '6px' }}>TF:</span>
          {['1m', '5m', '15m', '1h', '4h', '1D'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              style={{
                background: timeframe === tf ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                color: timeframe === tf ? '#000' : 'var(--text-main)',
                border: 'none',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
