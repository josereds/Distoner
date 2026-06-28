import { Award, Users, Clock, Wrench } from 'lucide-react';

const STATS = [
  { icon: Award, value: '10+', label: 'Años de experiencia', color: 'var(--primary)' },
  { icon: Wrench, value: '5.000+', label: 'Recargas realizadas', color: 'var(--accent)' },
  { icon: Users, value: '98%', label: 'Clientes que repiten', color: 'var(--warning)' },
  { icon: Clock, value: '< 2h', label: 'Tiempo de respuesta', color: 'var(--success)' }
];

export default function TrustStrip() {
  return (
    <section style={{
      padding: '48px 0',
      background: 'linear-gradient(180deg, var(--bg-dark) 0%, #0c111c 100%)',
      borderBottom: '1px solid var(--border-color)',
      position: 'relative',
      zIndex: 5
    }}>
      <div className="container">
        <div className="grid grid-cols-4" style={{ gap: '24px' }}>
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="reveal"
                style={{
                  '--reveal-delay': `${index * 80}ms`,
                  textAlign: 'center',
                  padding: '20px 16px',
                  borderRight: index < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: stat.color,
                  marginBottom: '14px'
                }}>
                  <Icon size={20} />
                </div>
                <div className="stat-number">{stat.value}</div>
                <div style={{
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  marginTop: '6px',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
