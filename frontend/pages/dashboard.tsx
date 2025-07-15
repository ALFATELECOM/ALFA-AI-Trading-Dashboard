import React, { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [capital, setCapital] = useState(500);
  const [tsl, setTsl] = useState(1);
  const [paperMode, setPaperMode] = useState(true);
  const [strategy, setStrategy] = useState('Breakout Strategy');
  const [broker, setBroker] = useState('Zerodha');
  const [funds, setFunds] = useState(null);
  const [orders, setOrders] = useState(null);
  const [response, setResponse] = useState(null);
  const [token, setToken] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://alfa-ai-backend.onrender.com';

  const handleLogin = async () => {
    const res = await axios.post(`${baseUrl}/login`, { broker });
    if (res.data.token) setToken(res.data.token);
  };

  const handleTrade = async () => {
    const res = await axios.post(`${baseUrl}/trade`, {
      strategy, capital, tsl, paper: paperMode, token
    });
    setResponse(res.data);
  };

  const fetchFunds = async () => {
    const res = await axios.get(`${baseUrl}/funds?broker=${broker}&token=${token}`);
    setFunds(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get(`${baseUrl}/orders?broker=${broker}&token=${token}`);
    setOrders(res.data);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>✅ ALFA AI Trading Dashboard</h1>
      <p><strong>📊 Strategy:</strong> {strategy}</p>

      <div>
        <label>Capital per Trade (₹): </label>
        <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} />
      </div>

      <div>
        <label>Trailing SL %: </label>
        <select value={tsl} onChange={(e) => setTsl(Number(e.target.value))}>
          <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option>
        </select>
      </div>

      <div>
        <label><input type="checkbox" checked={paperMode} onChange={() => setPaperMode(!paperMode)} /> Use Paper Mode</label>
      </div>

      <div>
        <label>Broker: </label>
        <select value={broker} onChange={(e) => setBroker(e.target.value)}>
          <option value="Zerodha">Zerodha</option>
          <option value="MStock">MStock</option>
          <option value="Paper">Paper</option>
        </select>
      </div>

      <div style={{ marginTop: '10px' }}>
        <button onClick={handleLogin}>🔐 Login Broker</button>
        <button onClick={handleTrade}>🚀 Execute Trade</button>
        <button onClick={fetchFunds}>💰 Check Wallet Funds</button>
        <button onClick={fetchOrders}>📄 Fetch Order History</button>
      </div>

      {response && <div><h3>📌 Trade Response</h3><pre>{JSON.stringify(response, null, 2)}</pre></div>}
      {funds && <div><h3>💼 Wallet Funds</h3><pre>{JSON.stringify(funds, null, 2)}</pre></div>}
      {orders && <div><h3>📑 Order History</h3><pre>{JSON.stringify(orders, null, 2)}</pre></div>}

      <hr />
      <h2>⚙️ Advanced Features (Coming Next)</h2>
      <ul>
        <li>🔐 Max Daily Loss Lock</li>
        <li>📈 AI-Based Entry Predictor</li>
        <li>📊 Sentiment Meter</li>
        <li>🧠 Smart CE/PE Suggestion</li>
        <li>🕓 Auto Square-Off at 3:25 PM</li>
        <li>📥 Basket Order Upload</li>
        <li>📤 Trade Journal Export</li>
        <li>📲 Telegram + WhatsApp Alerts</li>
        <li>📧 Email Summary (EOD)</li>
      </ul>
    </div>
  );
}