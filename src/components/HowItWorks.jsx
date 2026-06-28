import { PhoneCall, Wrench, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    icon: PhoneCall,
    title: 'Contáctanos',
    description: 'Escríbenos por WhatsApp o visítanos en el local. Cuéntanos qué equipo tienes y qué necesitas: recarga, repuesto o mantenimiento.',
    accent: 'var(--primary)'
  },
  {
    n: '02',
    icon: Wrench,
    title: 'Diagnóstico y servicio',
    description: 'Evaluamos tu equipo gratis y te entregamos un presupuesto claro. Realizamos la recarga, mantenimiento o venta de repuestos en sitio o laboratorio.',
    accent: 'var(--accent)'
  },
  {
    n: '03',
    icon: ShieldCheck,
    title: 'Entrega con garantía',
    description: 'Recibe tu equipo funcionando con garantía escrita. Si algo no queda bien en los primeros 15 días, lo resolvemos sin costo adicional.',
    accent: 'var(--success)'
  }
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="section"
      style={{
        background: 'linear-gradient(180deg, #0c111c 0%, var(--bg-dark) 100%)',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.08), transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-eyebrow-row">
          <span className="eyebrow eyebrow-accent">Proceso simple</span>
        </div>
        <h2 className="section-title">Cómo funciona</h2>
        <p className="section-desc">
          Tres pasos sin sorpresas. Diagnóstico transparente, trabajo profesional y garantía escrita en cada servicio.
        </p>

        <div className="how-it-works-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          position: 'relative'
        }}>
          {/* Decorative connecting line */}
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '16%',
            right: '16%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), rgba(14,165,233,0.3), transparent)',
            zIndex: 0
          }} />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="reveal"
                style={{
                  '--reveal-delay': `${index * 120}ms`,
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <div style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '120px',
                  height: '120px',
                  marginBottom: '24px'
                }}>
                  {/* Outer ring */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }} />
                  {/* Glow */}
                  <div style={{
                    position: 'absolute',
                    inset: '12px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${step.accent}22, transparent 70%)`
                  }} />
                  {/* Inner icon */}
                  <div style={{
                    position: 'relative',
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'var(--bg-panel)',
                    border: `1px solid ${step.accent}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step.accent,
                    boxShadow: `0 8px 30px ${step.accent}22`
                  }}>
                    <Icon size={28} />
                  </div>
                  {/* Step number badge */}
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '0px',
                    background: step.accent,
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    boxShadow: `0 4px 12px ${step.accent}55`
                  }}>
                    Paso {index + 1}
                  </div>
                </div>

                <div className="step-number" style={{ marginBottom: '8px', opacity: 0.4 }}>
                  {step.n}
                </div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: 'var(--text-white)'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--text-muted)',
                  maxWidth: '320px',
                  margin: '0 auto',
                  lineHeight: 1.6
                }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <a
            href="https://wa.me/573115174372?text=Hola%20Distoner,%20quisiera%20iniciar%20con%20un%20diagn%C3%B3stico%20de%20mi%20equipo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '16px 32px' }}
          >
            Empezar diagnóstico gratis
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-it-works-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .how-it-works-grid > div:first-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
