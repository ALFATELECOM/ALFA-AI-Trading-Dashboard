
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [strategy, setStrategy] = useState('');
  const [response, setResponse] = useState(null);

  useEffect(() => {
    axios.get('https://alfa-ai-trading-dashboard.onrender.com/strategy')
      .then(res => setStrategy(res.data.strategy))
      .catch(() => setStrategy('Error fetching strategy'));
  }, []);

  const executeTrade = async () => {
    try {
      const res = await axios.post('https://alfa-ai-trading-dashboard.onrender.com/trade');
      setResponse(res.data);
    } catch {
      setResponse({ status: 'Error placing order' });
    }
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '100px' }}>
      <h1>✅ ALFA AI Trading Dashboard</h1>
      <h3>📊 <strong>Strategy Selected:</strong> {strategy}</h3>
      <button onClick={executeTrade}>🚀 Execute Trade</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
