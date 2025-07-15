import React, { useState } from 'react';

const Home = () => {
  const [capital, setCapital] = useState(500);
  const [trailingSL, setTrailingSL] = useState(1);
  const [usePaperMode, setUsePaperMode] = useState(true);
  const [tradeResponse, setTradeResponse] = useState(null);
  const [walletFunds, setWalletFunds] = useState(null);
  const [orderHistory, setOrderHistory] = useState(null);

  const backendUrl = 'https://alfa-ai-backend-your-link.onrender.com';

  const executeTrade = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/trade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          capital_per_trade: capital,
          trailing_sl_percent: trailingSL,
          paper_mode: usePaperMode,
        }),
      });
      const data = await res.json();
      setTradeResponse(data);
    } catch (err) {
      setTradeResponse({ status: 'error', message: 'Network Error' });
    }
  };

  const checkWalletFunds = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/funds`);
      const data = await res.json();
      setWalletFunds(data);
    } catch (err) {
      setWalletFunds({ status: 'error', message: 'Network Error' });
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/orders`);
      const data = await res.json();
      setOrderHistory(data);
    } catch (err) {
      setOrderHistory({ status: 'error', message: 'Network Error' });
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>✅ ALFA AI Trading Dashboard</h1>
      <p><b>📈 Strategy:</b> Breakout Strategy</p>

      <label>Capital per Trade (₹): </label>
      <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} /><br />

      <label>Trailing SL %: </label>
      <select value={trailingSL} onChange={(e) => setTrailingSL(Number(e.target.value))}>
        {[0.5, 1, 1.5, 2].map(v => <option key={v} value={v}>{v}</option>)}
      </select><br />

      <label>
        <input type="checkbox" checked={usePaperMode} onChange={(e) => setUsePaperMode(e.target.checked)} />
        Use Paper Mode
      </label><br /><br />

      <button onClick={executeTrade}>💸 Execute Trade</button>{' '}
      <button onClick={checkWalletFunds}>💼 Check Wallet Funds</button>

      <h3>📊 Trade Response</h3>
      <pre>{JSON.stringify(tradeResponse, null, 2)}</pre>

      <h3>💰 Wallet Funds</h3>
      <pre>{JSON.stringify(walletFunds, null, 2)}</pre>

      <button onClick={fetchOrderHistory}>📄 Fetch Order History</button>
      <h3>🧾 Order History</h3>
      <pre>{JSON.stringify(orderHistory, null, 2)}</pre>
    </div>
  );
};

export default Home;
