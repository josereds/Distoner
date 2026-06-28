import { Star, BadgeCheck, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Carlos Martínez",
    role: "Director IT",
    company: "Empresa de Logística",
    initials: "CM",
    color: "var(--primary)",
    content: "Excelente servicio técnico. Revivieron nuestras impresoras láser cuando ya pensábamos desecharlas. Los tóners duran más de lo esperado."
  },
  {
    name: "Ana Rodríguez",
    role: "Administradora",
    company: "Colegio San José",
    initials: "AR",
    color: "var(--accent)",
    content: "Distoner es nuestro proveedor de confianza desde hace 3 años. Las recargas son súper nítidas y siempre nos atienden el mismo día que llamamos."
  },
  {
    name: "Luis Fernando Gómez",
    role: "Dueño",
    company: "Papelería Centro",
    initials: "LF",
    color: "var(--warning)",
    content: "Compro los insumos y cilindros con ellos. Tienen los mejores precios en la Carrera 10 y los chips nunca marcan error. Muy recomendados."
  },
  {
    name: "María Fernanda López",
    role: "Gerente",
    company: "Agencia de Publicidad",
    initials: "MF",
    color: "var(--success)",
    content: "La calidad de impresión de los tóners a color es increíble, no tienen nada que envidiarle a los originales. Además el servicio al cliente es de primera."
  },
  {
    name: "Javier Sánchez",
    role: "Independiente",
    company: "Cliente frecuente",
    initials: "JS",
    color: "#a78bfa",
    content: "Rápidos y honestos. Me hicieron un mantenimiento preventivo a mi impresora de casa y quedó como nueva. Total transparencia en los repuestos."
  },
  {
    name: "Patricia Ramírez",
    role: "Coordinadora",
    company: "Bufete de Abogados",
    initials: "PR",
    color: "var(--cyan)",
    content: "Necesitábamos un proveedor confiable para 12 impresoras. Distoner respondió en menos de una hora y resolvimos todo el same week. Profesionales."
  }
];

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="section"
      style={{
        background: 'var(--bg-dark)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative blobs */}
      <div className="glow-blob glow-blob-primary" style={{
        top: '20%',
        right: '-10%',
        width: '400px',
        height: '400px',
        opacity: 0.15
      }} />
      <div className="glow-blob glow-blob-accent" style={{
        bottom: '10%',
        left: '-10%',
        width: '350px',
        height: '350px',
        opacity: 0.12
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-eyebrow-row">
          <span className="eyebrow eyebrow-warning">Testimonios</span>
        </div>
        <h2 className="section-title">Lo que dicen nuestros clientes</h2>
        <p className="section-desc">
          Empresas y personas que confían en Distoner para mantener sus equipos siempre operativos.
        </p>

        <div className="marquee-wrapper">
          <div className="marquee-content">
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div key={idx} className="card testimonial-card" style={{
                width: '360px',
                flexShrink: 0,
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                position: 'relative'
              }}>
                <Quote size={36} style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  color: 'rgba(37, 99, 235, 0.08)',
                  fill: 'rgba(37, 99, 235, 0.08)'
                }} />

                <div style={{ display: 'flex', gap: '4px', color: 'var(--warning)' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} size={15} fill="currentColor" />
                  ))}
                </div>

                <p style={{
                  fontSize: '15px',
                  color: 'var(--text-soft)',
                  marginBottom: '8px',
                  fontStyle: 'italic',
                  lineHeight: 1.65,
                  flex: 1,
                  position: 'relative',
                  zIndex: 2
                }}>
                  "{testimonial.content}"
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}99)`,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '14px',
                    flexShrink: 0,
                    boxShadow: `0 4px 14px ${testimonial.color}40`
                  }}>
                    {testimonial.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      color: 'var(--text-white)',
                      fontSize: '15px',
                      marginBottom: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {testimonial.name}
                      <BadgeCheck size={14} style={{ color: 'var(--accent)' }} />
                    </h4>
                    <span style={{
                      fontSize: '12.5px',
                      color: 'var(--text-muted)'
                    }}>
                      {testimonial.role} · {testimonial.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom rating summary */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          marginTop: '48px',
          padding: '20px 28px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-pill)',
          backdropFilter: 'blur(10px)',
          width: 'fit-content',
          marginInline: 'auto',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '2px', color: 'var(--warning)' }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <strong style={{ color: 'var(--text-white)', fontSize: '18px' }}>4.9/5</strong>
          </div>
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{
            color: 'var(--text-muted)',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <BadgeCheck size={14} style={{ color: 'var(--accent)' }} />
            Basado en clientes verificados
          </span>
        </div>
      </div>

      <style>{`
        .marquee-wrapper {
          display: flex;
          overflow: hidden;
          padding: 20px 0;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .marquee-content {
          display: flex;
          gap: 24px;
          animation: marquee 45s linear infinite;
          padding-right: 24px;
        }
        .marquee-wrapper:hover .marquee-content {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .testimonial-card {
            width: 290px !important;
          }
          .marquee-content {
            animation-duration: 35s;
          }
        }
      `}</style>
    </section>
  );
}
