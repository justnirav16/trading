import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { Activity, Layers, RefreshCw } from 'lucide-react';
import { calculateEMA, calculateLevels } from '../services/marketData';

export default function TradingChart({ candles, latestTick, timeframe, levels }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const ema20SeriesRef = useRef(null);
  const ema50SeriesRef = useRef(null);

  const [showIndicators, setShowIndicators] = useState({
    ema20: true,
    ema50: true,
    volume: true,
  });

  const [chartError, setChartError] = useState(null);

  // Initialize lightweight-chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    try {
      // Clear container before creating
      chartContainerRef.current.innerHTML = '';

      const width = chartContainerRef.current.clientWidth || 800;
      const height = chartContainerRef.current.clientHeight || 450;

      // Create TradingView Chart instance
      const chart = createChart(chartContainerRef.current, {
        width,
        height,
        layout: {
          background: { type: ColorType.Solid, color: '#131722' },
          textColor: '#d1d4dc',
        },
        grid: {
          vertLines: { color: 'rgba(42, 46, 57, 0.4)' },
          horzLines: { color: 'rgba(42, 46, 57, 0.4)' },
        },
        crosshair: {
          mode: 1,
          vertLine: { color: '#f0b90b', width: 1, style: 3 },
          horzLine: { color: '#f0b90b', width: 1, style: 3 },
        },
        rightPriceScale: {
          borderColor: '#2a2e39',
          scaleMargins: { top: 0.1, bottom: 0.25 },
        },
        timeScale: {
          borderColor: '#2a2e39',
          timeVisible: true,
          secondsVisible: false,
        },
        handleScroll: true,
        handleScale: true,
      });

      // Add Candlestick Series
      let candleSeries;
      if (typeof chart.addCandlestickSeries === 'function') {
        candleSeries = chart.addCandlestickSeries({
          upColor: '#0ecb81',
          downColor: '#f6465d',
          borderVisible: false,
          wickUpColor: '#0ecb81',
          wickDownColor: '#f6465d',
        });
      } else {
        candleSeries = chart.addSeries(CandlestickSeries, {
          upColor: '#0ecb81',
          downColor: '#f6465d',
          borderVisible: false,
          wickUpColor: '#0ecb81',
          wickDownColor: '#f6465d',
        });
      }

      // Add Volume Series
      let volumeSeries;
      if (typeof chart.addHistogramSeries === 'function') {
        volumeSeries = chart.addHistogramSeries({
          color: '#26a69a',
          priceFormat: { type: 'volume' },
          priceScaleId: '',
          scaleMargins: { top: 0.8, bottom: 0 },
        });
      }

      // Add EMA Series
      let ema20Series, ema50Series;
      if (typeof chart.addLineSeries === 'function') {
        ema20Series = chart.addLineSeries({ color: '#00f2fe', lineWidth: 2, title: 'EMA 20' });
        ema50Series = chart.addLineSeries({ color: '#f0b90b', lineWidth: 2, title: 'EMA 50' });
      }

      chartRef.current = chart;
      candleSeriesRef.current = candleSeries;
      volumeSeriesRef.current = volumeSeries;
      ema20SeriesRef.current = ema20Series;
      ema50SeriesRef.current = ema50Series;

      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        try {
          chart.remove();
        } catch (e) {}
      };
    } catch (err) {
      console.error('Error initializing TradingView canvas:', err);
      setChartError(err.message);
    }
  }, []);

  // Update candle data when candles or timeframe changes
  useEffect(() => {
    if (!candles || candles.length === 0 || !candleSeriesRef.current) return;

    try {
      candleSeriesRef.current.setData(candles);

      if (volumeSeriesRef.current) {
        const volumeData = candles.map(c => ({
          time: c.time,
          value: c.volume,
          color: c.close >= c.open ? 'rgba(14, 203, 129, 0.3)' : 'rgba(246, 70, 93, 0.3)'
        }));
        volumeSeriesRef.current.setData(volumeData);
      }

      if (ema20SeriesRef.current && showIndicators.ema20) {
        ema20SeriesRef.current.setData(calculateEMA(candles, 20));
      }
      if (ema50SeriesRef.current && showIndicators.ema50) {
        ema50SeriesRef.current.setData(calculateEMA(candles, 50));
      }

      chartRef.current?.timeScale().fitContent();
    } catch (err) {
      console.error('Error updating chart candles:', err);
    }
  }, [candles, timeframe, showIndicators]);

  // Update latest tick live
  useEffect(() => {
    if (!latestTick || !candleSeriesRef.current || !candles || candles.length === 0) return;

    try {
      const lastCandle = { ...candles[candles.length - 1] };
      const price = latestTick.price;
      
      lastCandle.close = price;
      if (price > lastCandle.high) lastCandle.high = price;
      if (price < lastCandle.low) lastCandle.low = price;

      candleSeriesRef.current.update(lastCandle);
    } catch (err) {
      console.error('Error updating latest price tick:', err);
    }
  }, [latestTick, candles]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: '420px' }}>
      {/* Chart Control Ribbon Bar */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontWeight: 700, color: 'var(--text-bright)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={14} className="text-gold" /> XAU/USD Interactive Canvas
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setShowIndicators(prev => ({ ...prev, ema20: !prev.ema20 }))}
              style={{
                background: showIndicators.ema20 ? 'rgba(0, 242, 254, 0.15)' : 'var(--bg-tertiary)',
                color: showIndicators.ema20 ? '#00f2fe' : 'var(--text-muted)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                padding: '2px 8px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              EMA 20
            </button>
            <button
              onClick={() => setShowIndicators(prev => ({ ...prev, ema50: !prev.ema50 }))}
              style={{
                background: showIndicators.ema50 ? 'rgba(240, 185, 11, 0.15)' : 'var(--bg-tertiary)',
                color: showIndicators.ema50 ? '#f0b90b' : 'var(--text-muted)',
                border: '1px solid rgba(240, 185, 11, 0.3)',
                padding: '2px 8px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              EMA 50
            </button>
          </div>
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

      {/* Main Container */}
      <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%', minHeight: '380px' }}>
        {chartError ? (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--accent-bearish)',
            padding: '20px',
            textAlign: 'center',
            gap: '10px'
          }}>
            <Activity size={32} />
            <div style={{ fontWeight: 700 }}>Chart Canvas Initializing...</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{chartError}</div>
          </div>
        ) : null}

        <div 
          ref={chartContainerRef} 
          style={{ width: '100%', height: '100%', minHeight: '380px' }} 
        />
      </div>
    </div>
  );
}
