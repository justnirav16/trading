import React, { useEffect, useState } from 'react';
import { Gauge, ArrowLeftRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { getCurrencyStrengths, getGoldUSDCorrelation } from '../services/currencyStrengthService';

export default function CurrencyStrengthMeter() {
  const [strengths, setStrengths] = useState({});

  useEffect(() => {
    // Initial fetch
    setStrengths(getCurrencyStrengths());

    // Live update loop every 2 seconds
    const interval = setInterval(() => {
      setStrengths(getCurrencyStrengths());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const usdScore = strengths.USD || 78.4;
  const correlation = getGoldUSDCorrelation(usdScore);

  // Sorted currencies for matrix bar view
  const currencyList = Object.keys(strengths).sort((a, b) => strengths[b] - strengths[a]);

  return (
    <div className="glass-panel" style={{
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      height: '100%',
      overflowY: 'auto'
    }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Gauge className="text-gold" size={20} />
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>
              CURRENCY STRENGTH METER
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Real-Time Matrix across 8 Majors
            </span>
          </div>
        </div>

        <span className="badge badge-gold" style={{ fontSize: '10px' }}>
          LIVE AGGREGATE
        </span>
      </div>

      {/* USD vs Gold Impact Card */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: `1px solid ${correlation.color}`,
        borderRadius: '8px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="badge badge-bearish" style={{ fontSize: '12px', padding: '4px 8px' }}>
              USD STRENGTH: {usdScore}
            </span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Correlation: <strong style={{ color: correlation.color }}>{correlation.correlationScore}</strong>
          </span>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 800, color: correlation.color }}>
          {correlation.bias}
        </div>

        <div style={{ fontSize: '11px', color: 'var(--text-main)', lineHeight: '1.4' }}>
          {correlation.signal}
        </div>
      </div>

      {/* Strength Bar Grid for 8 Currencies */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-bright)' }}>
          MAJOR CURRENCIES RELATIVE RANKING
        </span>

        {currencyList.map(curr => {
          const val = strengths[curr] || 50;
          const isUSD = curr === 'USD';
          
          let barColor = 'var(--accent-cyan)';
          if (val >= 70) barColor = 'var(--accent-bullish)';
          else if (val <= 40) barColor = 'var(--accent-bearish)';
          if (isUSD) barColor = 'var(--accent-gold)';

          return (
            <div key={curr} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              backgroundColor: isUSD ? 'rgba(240, 185, 11, 0.1)' : 'transparent',
              padding: isUSD ? '4px 8px' : '0px',
              borderRadius: '4px'
            }}>
              <span style={{
                width: '36px',
                fontWeight: isUSD ? 800 : 600,
                color: isUSD ? 'var(--accent-gold)' : '#fff'
              }}>
                {curr}
              </span>

              {/* Progress bar container */}
              <div style={{
                flex: 1,
                height: '8px',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  width: `${val}%`,
                  height: '100%',
                  backgroundColor: barColor,
                  borderRadius: '4px',
                  transition: 'width 0.5s ease-in-out'
                }} />
              </div>

              <span className="font-mono" style={{
                width: '36px',
                textAlign: 'right',
                fontWeight: 700,
                color: barColor
              }}>
                {val}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
