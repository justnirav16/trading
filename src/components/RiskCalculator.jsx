import React, { useState } from 'react';
import { Calculator, ShieldCheck, DollarSign, Percent } from 'lucide-react';

export default function RiskCalculator({ currentPrice }) {
  const [balance, setBalance] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1.0);
  const [stopLossDollars, setStopLossDollars] = useState(5.0); // Gold price movement in $

  const riskAmount = (balance * (riskPercent / 100));
  // Standard XAU/USD lot: 1 Lot = 100 oz. $1 move on 1 Lot = $100 profit/loss.
  const lotSize = stopLossDollars > 0 ? (riskAmount / (stopLossDollars * 100)).toFixed(2) : '0.00';
  const slPips = (stopLossDollars * 10).toFixed(0);

  return (
    <div className="glass-panel" style={{
      padding: '14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
        <Calculator className="text-gold" size={18} />
        <span style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>
          XAU/USD POSITION SIZE CALCULATOR
        </span>
      </div>

      {/* Input controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '11px' }}>
        <div>
          <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Account Equity ($)</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              padding: '6px',
              color: '#fff',
              fontFamily: 'var(--font-mono)'
            }}
          />
        </div>

        <div>
          <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Risk (%)</label>
          <input
            type="number"
            step="0.5"
            value={riskPercent}
            onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 0)}
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              padding: '6px',
              color: '#fff',
              fontFamily: 'var(--font-mono)'
            }}
          />
        </div>

        <div>
          <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>SL Distance ($)</label>
          <input
            type="number"
            step="0.5"
            value={stopLossDollars}
            onChange={(e) => setStopLossDollars(parseFloat(e.target.value) || 0)}
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              padding: '6px',
              color: '#fff',
              fontFamily: 'var(--font-mono)'
            }}
          />
        </div>
      </div>

      {/* Calculated Output Card */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-accent)',
        borderRadius: '6px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between'
      }}>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Max Risk Amount:</div>
          <div className="font-mono text-bearish" style={{ fontSize: '14px', fontWeight: 800 }}>
            ${riskAmount.toFixed(2)}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SL Pips:</div>
          <div className="font-mono text-gold" style={{ fontSize: '14px', fontWeight: 800 }}>
            {slPips} pips
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Calculated Lot Size:</div>
          <div className="font-mono text-bullish" style={{ fontSize: '18px', fontWeight: 900 }}>
            {lotSize} Lots
          </div>
        </div>
      </div>
    </div>
  );
}
