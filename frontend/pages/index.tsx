
import { useEffect, useState } from "react";

export default function Home() {
  const [strategy, setStrategy] = useState("Loading...");
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch("https://alfa-ai-trading-dashboard.onrender.com/analyze")
      .then((res) => res.json())
      .then((data) => setStrategy(data.strategy))
      .catch(() => setStrategy("Error fetching strategy"));
  }, []);

  const handleTrade = () => {
    fetch("https://alfa-ai-trading-dashboard.onrender.com/trade", {
      method: "POST"
    })
    .then(res => res.json())
    .then(data => setResponse(JSON.stringify(data, null, 2)))
    .catch(err => setResponse("Error placing trade"));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>✅ ALFA AI Trading Dashboard</h1>
      <p><b>📊 Strategy Selected:</b> {strategy}</p>
      <button onClick={handleTrade} style={{
        padding: "10px 20px",
        fontSize: "16px",
        marginTop: "20px"
      }}>🚀 Execute Trade</button>
      <pre style={{ textAlign: 'left', width: '50%', margin: '20px auto' }}>{response}</pre>
    </div>
  );
}
