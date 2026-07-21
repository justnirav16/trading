import React from 'react';
import { Activity } from 'lucide-react';

export default function TradingChart({ timeframe, levels }) {
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

  // TradingView official embed URL for OANDA:XAUUSD
  const iframeSrc = `https://www.tradingview-widget.com/embed-widget/advanced-chart/?symbol=OANDA%3AXAUUSD&interval=${interval}&theme=dark&style=1&timezone=Etc%2FUTC&hide_volume=true&locale=en#${encodeURIComponent(
    JSON.stringify({
      "page-uri": "https://www.tradingview.com",
    })
  )}`;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '520px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#131722',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Chart Ribbon Header */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        fontSize: '12px',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 700, color: 'var(--text-bright)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={15} className="text-gold" /> OANDA:XAUUSD Live TradingView Chart
          </span>
          <span className="badge badge-gold" style={{ fontSize: '10px' }}>
            CLEAN PRICE ACTION
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

      {/* Main OANDA TradingView Chart Frame */}
      <div style={{ flex: 1, width: '100%', height: 'calc(100% - 36px)', minHeight: '480px', position: 'relative' }}>
        <iframe
          key={`${timeframe}-${interval}`}
          title="OANDA XAUUSD TradingView Chart"
          src={iframeSrc}
          style={{
            width: '100%',
            height: '100%',
            minHeight: '480px',
            border: 'none',
            display: 'block'
          }}
          allowTransparency={true}
          scrolling="no"
          allowFullScreen={true}
        />
      </div>
    </div>
  );
}
