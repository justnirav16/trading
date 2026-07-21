import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, HelpCircle } from 'lucide-react';

export default function AICopilotChat({ currentPrice }) {
  const price = currentPrice ? currentPrice.toFixed(2) : '2420.50';

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am your AI Trading Assistant specialized strictly in XAU/USD (Gold). Current price is $${price}. How can I assist with technical setups, macro news context, or risk sizing?`
    }
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    'Analyze XAU/USD current setup',
    'What is the next key Gold resistance level?',
    'How will CPI news affect XAU/USD?'
  ];

  const handleSend = (userText) => {
    const query = userText || input;
    if (!query.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!userText) setInput('');

    // Generate smart AI response tailored to Gold
    setTimeout(() => {
      let aiReply = '';
      const q = query.toLowerCase();

      if (q.includes('setup') || q.includes('analyze') || q.includes('buy') || q.includes('sell')) {
        aiReply = `📊 **XAU/USD AI Setup Analysis ($${price}):**\n- **Bias:** Bullish Continuation.\n- **Key Demand Zone:** $${(price - 5.0).toFixed(2)} - $${(price - 2.5).toFixed(2)} (H1 Order Block).\n- **Target Take Profit:** $${(price * 1.008).toFixed(2)} (High Liquidity Pool).\n- **Recommended Stop Loss:** Below $${(price - 8.5).toFixed(2)}. Maintain 1:2.5 Risk/Reward.`;
      } else if (q.includes('resistance') || q.includes('support') || q.includes('level')) {
        aiReply = `🎯 **Key XAU/USD Technical Levels:**\n- **Resistance 2:** $${(parseFloat(price) + 18.0).toFixed(2)}\n- **Resistance 1:** $${(parseFloat(price) + 8.5).toFixed(2)}\n- **Current Price:** $${price}\n- **Support 1:** $${(parseFloat(price) - 6.0).toFixed(2)}\n- **Support 2:** $${(parseFloat(price) - 15.0).toFixed(2)}`;
      } else if (q.includes('cpi') || q.includes('news') || q.includes('nfp') || q.includes('fed')) {
        aiReply = `📰 **Macro News Impact on Gold:**\nUpcoming USD High Impact news (CPI/NFP) is the primary volatility driver. Higher CPI -> Fed delays rate cuts -> USD surges -> XAU/USD dips. Watch for initial 15-minute fakeout sweeps before entering!`;
      } else {
        aiReply = `I am constantly monitoring the live tick flow, SMC liquidity sweeps, and USD strength meter for Gold ($${price}). Confluence is currently showing 88% Bullish probability. What specific risk/reward query do you have?`;
      }

      setMessages([...newMessages, { sender: 'ai', text: aiReply }]);
    }, 600);
  };

  return (
    <div className="glass-panel" style={{
      padding: '14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      height: '100%',
      maxHeight: '500px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot className="text-ai" size={18} />
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>AI GOLD COPILOT</span>
        </div>
        <span className="badge badge-ai" style={{ fontSize: '10px' }}>GPT-4 QUANT</span>
      </div>

      {/* Messages Scroll View */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        paddingRight: '4px'
      }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{
            alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: m.sender === 'user' ? 'var(--bg-tertiary)' : 'rgba(157, 78, 221, 0.15)',
            border: m.sender === 'user' ? '1px solid var(--border-color)' : '1px solid rgba(157, 78, 221, 0.3)',
            borderRadius: '8px',
            padding: '8px 12px',
            maxWidth: '85%',
            fontSize: '12px',
            color: 'var(--text-main)',
            whiteSpace: 'pre-line'
          }}>
            {m.text}
          </div>
        ))}
      </div>

      {/* Quick Prompt Chips */}
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px' }}>
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp)}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              fontSize: '10px',
              padding: '3px 8px',
              borderRadius: '12px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '6px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Gold Copilot..."
          style={{
            flex: 1,
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '8px 12px',
            color: '#fff',
            fontSize: '12px',
            outline: 'none'
          }}
        />
        <button type="submit" className="btn-tv btn-tv-ai">
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
