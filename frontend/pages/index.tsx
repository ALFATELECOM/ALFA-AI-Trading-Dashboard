
import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState(null);

  const executeStrategy = async () => {
    const res = await fetch('https://alfa-ai-backend.onrender.com/execute_strategy', {
      method: 'POST'
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <h1>✅ ALFA AI Trading Dashboard</h1>
      <button onClick={executeStrategy}>🚀 Execute Strategy</button>
      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}
