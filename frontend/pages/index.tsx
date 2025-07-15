
import { useEffect, useState } from "react";
import { StrategyCard } from "../components/StrategyCard";

export default function Home() {
  const [strategy, setStrategy] = useState("Loading...");

  useEffect(() => {
    fetch("https://alfa-ai-trading-dashboard.onrender.com/analyze")
      .then((res) => res.json())
      .then((data) => {
        setStrategy(data.strategy);
      })
      .catch(() => {
        setStrategy("Error fetching strategy");
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>✅ ALFA AI Trading Dashboard</h1>
      <StrategyCard strategy={strategy} />
    </div>
  );
}
