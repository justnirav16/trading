import React, { useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';

export default function TradingChart({ timeframe, levels }) {
  const containerRef = useRef(null);

  // Map timeframe to TradingView interval format
  const intervalMap = {
    '1m': '1',
    '5m': '5',
    '15m': '15',
    '1h': '60',
    '4h': '240',
    '1D': 'D'
  };

  const interval = intervalMap[timeframe] || '15';

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    containerRef.current.innerHTML = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container__widget';
    widgetContainer.style.height = '100%';
    widgetContainer.style.width = '100%';
    containerRef.current.appendChild(widgetContainer);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": "OANDA:XAUUSD",
      "interval": interval,
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": false,
      "calendar": false,
      "hide_volume": true,
      "studies": [],
      "support_host": "https://www.tradingview.com"
    });

    containerRef.current.appendChild(script);
  }, [timeframe]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: '450px' }}>
      {/* Chart Ribbon Header */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 700, color: 'var(--text-bright)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={14} className="text-gold" /> OANDA:XAUUSD Live TradingView Chart
          </span>
          <span className="badge badge-gold" style={{ fontSize: '10px' }}>
            CLEAN ACTION (NO INDICATORS)
          </span>
        </div>

        {/* Pivot Levels Quick Reference */}
        {levels && (
          <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--accent-bearish)' }}>R1: ${levels.r1}</span>
            <span style={{ color: 'var(--accent-gold)' }}>Pivot: ${levels.pivot}</span>
            <span style={{ color: 'var(--accent-bullish)' }}>S1: ${levels.s1}</span>
          </div>
        )}
      </div>

      {/* Main OANDA TradingView Widget Canvas */}
      <div style={{ flex: 1, width: '100%', height: '100%', minHeight: '420px', position: 'relative' }}>
        <div 
          ref={containerRef} 
          style={{ width: '100%', height: '100%', minHeight: '420px' }} 
        />
      </div>
    </div>
  );
}
