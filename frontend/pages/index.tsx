import { useState, useEffect } from "react";

export default function Home() {
  const [strategy, setStrategy] = useState("");
  const [capital, setCapital] = useState(500);
  const [tsl, setTsl] = useState(1);
  const [paper, setPaper] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [funds, setFunds] = useState(null);
  const [orders, setOrders] = useState(null);

  const backend = "https://alfa-ai-trading-dashboard.onrender.com";

  useEffect(() => {
    fetch(backend + "/strategy").then(res => res.json()).then(data => setStrategy(data.strategy));
    fetch(backend + "/funds").then(res => res.json()).then(data => setFunds(data));
    fetch(backend + "/orders").then(res => res.json()).then(data => setOrders(data));
  }, []);

  const handleTrade = async () => {
    const payload = { strategy, capital, tsl, paper };
    const res = await fetch(backend + "/trade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>✅ ALFA AI Trading Dashboard</h1>
      <p><strong>📊 Strategy:</strong> {strategy}</p>

      <div style={{ marginTop: 20 }}>
        <label>Capital per Trade (₹): </label>
        <input type="number" value={capital} onChange={e => setCapital(Number(e.target.value))} />
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Trailing SL %: </label>
        <input type="number" step="0.1" value={tsl} onChange={e => setTsl(Number(e.target.value))} />
      </div>

      <div style={{ marginTop: 10 }}>
        <label>
          <input type="checkbox" checked={paper} onChange={() => setPaper(!paper)} />
          Use Paper Mode
        </label>
      </div>

      <button onClick={handleTrade} style={{ marginTop: 20, padding: "10px 20px" }}>
        🚀 Execute Trade
      </button>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>📝 Trade Response</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: 30 }}>
        <h3>💼 Wallet Funds</h3>
        <pre>{JSON.stringify(funds, null, 2)}</pre>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>📄 Order History</h3>
        <pre>{JSON.stringify(orders, null, 2)}</pre>
      </div>
    </div>
  );
}