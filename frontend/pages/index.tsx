
import React, { useState } from 'react';

const Dashboard = () => {
  const [response, setResponse] = useState(null);

  const executeTrade = async () => {
    const res = await fetch('/api/trade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ strategy: 'Breakout', tsl: 1, capital: 500, paper: true })
    });
    const data = await res.json();
    setResponse(data);
  };

  const checkFunds = async () => {
    const res = await fetch('/api/wallet');
    const data = await res.json();
    setResponse(data);
  };

  const getOrders = async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <h1>ALFA AI Trading Dashboard</h1>
      <button onClick={executeTrade}>Execute Trade</button>
      <button onClick={checkFunds}>Check Wallet Funds</button>
      <button onClick={getOrders}>Fetch Order History</button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
