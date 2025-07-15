
interface StrategyCardProps {
  strategy: string;
}

export function StrategyCard({ strategy }: StrategyCardProps) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '16px',
      borderRadius: '8px',
      width: '300px',
      margin: '20px auto',
      textAlign: 'center'
    }}>
      <h2>📊 Strategy Selected</h2>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{strategy}</p>
    </div>
  );
}
