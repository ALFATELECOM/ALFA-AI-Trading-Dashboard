import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://alfa-ai-trading-dashboard-backend.onrender.com'; // ✅ Change this if needed

export default function Home() {
  const [capital, setCapital] = useState(500);
  const [tsl, setTsl] = useState(1);
  const [usePaper, setUsePaper] = useState(true);
  const [tradeResponse, setTradeResponse] = useState<any>(null);
  const [walletFunds, setWalletFunds] = useState<any>(null);
  const [orderHistory, setOrderHistory] = useState<any>(null);

  const handleTrade = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/trade`, {
        strategy: 'Breakout Strategy',
        capital,
        tsl,
        paper: usePaper,
      });
      setTradeResponse(response.data);
    } catch (error) {
      setTradeResponse({ status: 'error', message: error.message });
    }
  };

  const fetchWalletFunds = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/funds`);
      setWalletFunds(response.data);
    } catch (error) {
      setWalletFunds({ status: 'error', message: error.message });
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`);
      setOrderHistory(response.data);
    } catch (error) {
      setOrderHistory({ status: 'error', message: error.message });
    }
  };

  return (
    <div style={{ padding: 50, fontFamily: 'Arial' }}>
      <h1>
        ✅ <b>ALFA AI Trading Dashboard</b>
      </h1>

      <p>
        <b>📊 Strategy:</b> Breakout Strategy
      </p>

      <p>
        Capital per Trade (₹):{' '}
        <input
          type="number"
          value={capital}
          onChange={(e) => setCapital(Number(e.target.value))}
        />
      </p>

      <p>
        Trailing SL %:{' '}
        <select value={tsl} onChange={(e) => setTsl(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={1.5}>1.5</option>
          <option value={2}>2</option>
        </select>
      </p>

      <label>
        <input
          type="checkbox"
          checked={usePaper}
          onChange={() => setUsePaper(!usePaper)}
        />
        Use Paper Mode
      </label>

      <br />
      <br />

      <button onClick={handleTrade}>💸 Execute Trade</button>

      {tradeResponse && (
        <div style={{ marginTop: 30 }}>
          <h3>📉 Trade Response</h3>
          <pre>{JSON.stringify(tradeResponse, null, 2)}</pre>
        </div>
      )}

      <br />

      <button onClick={fetchWalletFunds}>👜 Check Wallet Funds</button>
      {walletFunds && (
        <div style={{ marginTop: 10 }}>
          <h3>💼 Wallet Funds</h3>
          <pre>{JSON.stringify(walletFunds, null, 2)}</pre>
        </div>
      )}

      <br />

      <button onClick={fetchOrderHistory}>📑 Fetch Order History</button>
      {orderHistory && (
        <div style={{ marginTop: 10 }}>
          <h3>📄 Order History</h3>
          <pre>{JSON.stringify(orderHistory, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
