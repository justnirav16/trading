# 🏆 AGY XAU/USD High-End AI Analytical Trading Terminal

An ultra-modern, dark-themed analytical trading web application specifically built for **XAU/USD (Gold / US Dollar)**. Modeled after TradingView with a high-end quantitative suite, real-time interactive canvas chart, Forex Factory major USD news feed, 8-currency strength meter, AI Signal Radar, and interactive AI Copilot.

![XAU/USD AI Trading Terminal](public/vite.svg)

---

## 🌟 Key Features

### 📊 1. TradingView-Grade Interactive Canvas Chart
- High-performance canvas chart built with **Lightweight Charts**.
- Real-time live sub-second tick interpolation & candle building.
- Multi-timeframe support: **1m, 5m, 15m, 1h, 4h, 1D**.
- Technical indicator overlays: **EMA 20, EMA 50, EMA 200, Volume Histogram, RSI, and Daily Pivot Levels (R1, Pivot, S1)**.

### 🤖 2. AI Quantitative Signal Radar
- Live Institutional Bias Indicator (**Strong Buy, Buy, Neutral, Sell, Strong Sell**).
- Dynamic Confidence Score (%) & target price calculations.
- **Smart Money Concepts (SMC)**: Automated Order Block (OB), Fair Value Gap (FVG), and Liquidity Sweep detection.
- **Multi-Timeframe Confluence Matrix**.

### 📰 3. Forex Factory Major USD News Hub
- Economic calendar tracking **USD High-Impact (Red Folder)** news (CPI, NFP, FOMC, Rate Decisions, Unemployment Claims).
- Live countdown timers for upcoming releases.
- **AI Gold Impact Assessment**: Instant predictions on how economic data will move XAU/USD.

### ⚡ 4. Real-Time Currency Strength Meter
- Live relative strength meter (0-100) across **8 Major Currencies** (USD, EUR, GBP, JPY, AUD, CAD, CHF, NZD).
- **USD Focus Spotlight**: Tracks USD index pressure vs Gold inverse correlation score (-0.88).

### 💬 5. AI Trading Assistant & Position Calculator
- **AI Gold Copilot**: Interactive chat assistant trained on Gold price action, macro context, and strategy queries.
- **XAU/USD Risk Calculator**: Precise lot size calculator based on equity ($), risk percentage (%), and stop-loss distance.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+) & npm

### Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/justnirav16/trading.git
cd trading

# Install dependencies
npm install

# Start the live dev server
npm run dev
```

### Production Build

```bash
npm run build
```

---

## 🛠️ Technology Stack
- **Framework**: React + Vite
- **Charting Engine**: Lightweight Charts (by TradingView)
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Obsidian Dark Theme, Glassmorphism, CSS Variables)

---

## 🔗 Repository
GitHub Repository: [https://github.com/justnirav16/trading.git](https://github.com/justnirav16/trading.git)
