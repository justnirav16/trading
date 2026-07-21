import React, { useEffect, useState } from 'react';
import { Globe, Clock, AlertTriangle, TrendingUp, TrendingDown, RefreshCw, Zap } from 'lucide-react';
import { getUpcomingUSDNews, formatTimeRemaining } from '../services/forexFactoryService';

export default function ForexFactoryNews({ onNewsSelect }) {
  const [newsList, setNewsList] = useState([]);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const list = getUpcomingUSDNews();
    setNewsList(list);
  }, []);

  // Countdown timer loop
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};
      newsList.forEach(item => {
        updatedTimers[item.id] = formatTimeRemaining(item.timestamp);
      });
      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [newsList]);

  return (
    <div className="glass-panel" style={{
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      height: '100%',
      overflowY: 'auto'
    }}>
      {/* Title & Live Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe className="text-bearish" size={20} />
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>
              FOREX FACTORY USD NEWS
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              High-Impact Macro Economic Calendar (USD Only)
            </span>
          </div>
        </div>

        <div className="badge badge-high-impact" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AlertTriangle size={12} /> RED FOLDER FILTER ACTIVE
        </div>
      </div>

      {/* Primary Upcoming Event Countdown Spotlight */}
      {newsList.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(246, 70, 93, 0.2), rgba(19, 23, 34, 0.9))',
          border: '1px solid rgba(246, 70, 93, 0.4)',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#ff6b6b', textTransform: 'uppercase' }}>
              NEXT HIGH-IMPACT USD RELEASE
            </span>
            <span className="font-mono text-gold" style={{ fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} /> {timers[newsList[0].id] || 'Loading...'}
            </span>
          </div>

          <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
            {newsList[0].title}
          </div>

          <div style={{
            display: 'flex',
            gap: '16px',
            fontSize: '11px',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: '6px 10px',
            borderRadius: '4px'
          }}>
            <div>Forecast: <span className="font-mono text-bright">{newsList[0].forecast}</span></div>
            <div>Previous: <span className="font-mono text-muted">{newsList[0].previous}</span></div>
            <div>Impact: <span className="text-bearish" style={{ fontWeight: 700 }}>HIGH (RED)</span></div>
          </div>

          <div style={{
            fontSize: '11px',
            color: 'var(--text-main)',
            backgroundColor: 'rgba(157, 78, 221, 0.15)',
            borderLeft: '3px solid var(--accent-ai)',
            padding: '6px 8px',
            borderRadius: '0 4px 4px 0',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '6px'
          }}>
            <Zap size={13} className="text-ai" style={{ minWidth: '13px', marginTop: '2px' }} />
            <span><strong>AI Gold Assessment:</strong> {newsList[0].aiAnalysis}</span>
          </div>
        </div>
      )}

      {/* List of Economic Events */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-bright)' }}>
          UPCOMING USD ECONOMIC SCHEDULE
        </span>

        {newsList.map(item => (
          <div key={item.id} style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-bearish">USD</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{item.title}</span>
              </div>
              <span className="font-mono text-gold" style={{ fontSize: '11px' }}>
                {timers[item.id] || item.time}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Forecast: <strong className="text-bright">{item.forecast}</strong></span>
              <span>Previous: <strong className="text-muted">{item.previous}</strong></span>
              <span style={{ color: 'var(--accent-gold)' }}>{item.historicalImpact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
