
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [capital, setCapital] = useState(500);
  const [tsl, setTsl] = useState(1);
  const [paperMode, setPaperMode] = useState(true);
  const [broker, setBroker] = useState('Zerodha');
  const [funds, setFunds] = useState(null);
  const [orders, setOrders] = useState(null);
  const [response, setResponse] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://alfa-ai-backend.onrender.com';

  const handleTrade = async () => {
    const res = await axios.post(`${baseUrl}/trade`, {
      strategy: 'Breakout',
      capital,
      tsl,
      paper: paperMode
    });
    setResponse(res.data);
  };

  const fetchFunds = async () => {
    const res = await axios.get(`${baseUrl}/funds?broker=${broker}`);
    setFunds(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get(`${baseUrl}/orders?broker=${broker}`);
    setOrders(res.data);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>✅ ALFA AI Trading Dashboard</h1>

      <div>
        <label>Capital per Trade (₹): </label>
        <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} />
      </div>

      <div>
        <label>Trailing SL %: </label>
        <select value={tsl} onChange={(e) => setTsl(Number(e.target.value))}>
          {[0.5, 1, 1.5, 2, 3].map(val => <option key={val} value={val}>{val}</option>)}
        </select>
      </div>

      <div>
        <label><input type="checkbox" checked={paperMode} onChange={() => setPaperMode(!paperMode)} /> Use Paper Mode</label>
      </div>

      <div>
        <label>Broker: </label>
        <select value={broker} onChange={(e) => setBroker(e.target.value)}>
          <option value="Zerodha">Zerodha</option>
          <option value="Paper">Paper</option>
        </select>
      </div>

      <button onClick={handleTrade}>🚀 Execute Trade</button>
      <button onClick={fetchFunds}>💰 Check Wallet Funds</button>
      <button onClick={fetchOrders}>📄 Fetch Order History</button>

      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {funds && <pre>{JSON.stringify(funds, null, 2)}</pre>}
      {orders && <pre>{JSON.stringify(orders, null, 2)}</pre>}
    </div>
  );
}
