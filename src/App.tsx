
import React, { useEffect, useState } from 'react';

interface Signal {
  symbol: string;
  strategy: string;
  action: string;
  confidence: number;
  timestamp: string;
}

const App: React.FC = () => {
  const [signal, setSignal] = useState<Signal | null>(null);

  const fetchSignal = async () => {
    const res = await fetch("http://localhost:8000/get-signal?symbol=NIFTY");
    const data = await res.json();
    setSignal(data);
  };

  useEffect(() => {
    fetchSignal();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-4">📈 ALFA AI Trading Dashboard</h1>
      {signal ? (
        <div className="bg-white shadow-lg p-6 rounded-lg inline-block">
          <p><strong>Symbol:</strong> {signal.symbol}</p>
          <p><strong>Strategy:</strong> {signal.strategy}</p>
          <p><strong>Action:</strong> {signal.action}</p>
          <p><strong>Confidence:</strong> {signal.confidence * 100}%</p>
          <p><strong>Time:</strong> {new Date(signal.timestamp).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading signal...</p>
      )}
    </div>
  );
};

export default App;
