import { RefreshCw, Wrench, Printer, Layers, Cpu, Compass, ArrowRight, CheckCircle } from 'lucide-react';

const SERVICES = [
  {
    title: 'Recarga de Tóner Láser',
    description: 'Servicio express de recargas de alta calidad para impresoras HP, Samsung, Brother, Lexmark, Kyocera. Incluye cambio de chip y calibración completa.',
    icon: RefreshCw,
    accent: 'primary',
    badge: 'Express',
    features: ['Chip nuevo incluido', 'Calibración gratuita', 'Entrega en 1-2h'],
    waText: 'Hola Distoner, me gustaría solicitar una recarga de tóner.'
  },
  {
    title: 'Mantenimiento de Impresoras',
    description: 'Servicio técnico preventivo y correctivo. Limpieza del sensor óptico, lubricación de engranajes, reemplazo de rodillos y desatasco de papel.',
    icon: Wrench,
    accent: 'accent',
    badge: 'Garantizado',
    features: ['Diagnóstico gratis', 'Garantía escrita', 'Servicio en sitio'],
    waText: 'Hola Distoner, necesito cotizar un mantenimiento técnico para mis impresoras.'
  },
  {
    title: 'Suministros para Fotocopiadoras',
    description: 'Venta de tóner genérico y original de alto rendimiento para Ricoh, Konica Minolta, Sharp y Canon. Cilindros, reveladores y cuchillas.',
    icon: Printer,
    accent: 'secondary',
    badge: 'Mayoristas',
    features: ['Original y compatible', 'Alto rendimiento', 'Precio mayorista'],
    waText: 'Hola Distoner, quiero cotizar insumos o tóners para fotocopiadoras.'
  },
  {
    title: 'Chips y Cilindros (OPC)',
    description: 'Chips inteligentes actualizados para el reconocimiento de cartuchos por firmware nuevo. Cilindros fotorreceptores de alto brillo.',
    icon: Cpu,
    accent: 'primary',
    badge: 'Repuestos',
    features: ['Sin error de firmware', 'Cilindros premium', 'Compatibilidad total'],
    waText: 'Hola Distoner, necesito cotizar chips o cilindros específicos.'
  },
  {
    title: 'Acetatos Térmicos',
    description: 'Acetatos de alta transparencia ideales para serigrafía, presentaciones o material educativo, preparados para impresoras láser.',
    icon: Layers,
    accent: 'accent',
    badge: 'Especiales',
    features: ['Alta transparencia', 'Termorresistentes', 'Paquete x100'],
    waText: 'Hola Distoner, estoy interesado en comprar paquetes de hojas de acetato.'
  },
  {
    title: 'Soporte y Diagnóstico',
    description: 'Evaluamos el estado de tus equipos de impresión a domicilio en Bogotá. Diagnósticos transparentes con repuestos 100% compatibles.',
    icon: Compass,
    accent: 'secondary',
    badge: 'Bogotá',
    features: ['Visita a domicilio', 'Sin compromiso', 'Presupuesto claro'],
    waText: 'Hola Distoner, quisiera programar un diagnóstico técnico a domicilio.'
  }
];

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  const accentColor = service.accent === 'primary' ? 'var(--primary)' : service.accent === 'accent' ? 'var(--accent)' : 'var(--secondary)';
  const shadowColor = service.accent === 'primary' ? 'var(--shadow-neon-primary)' : service.accent === 'accent' ? 'var(--shadow-neon-accent)' : 'none';

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  };

  return (
    <div
      className="card reveal"
      onMouseMove={handleMouseMove}
      style={{
        '--reveal-delay': `${index * 80}ms`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: '100%',
        gap: '20px',
        padding: '28px'
      }}
    >
      <div style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '14px',
            borderRadius: '14px',
            color: accentColor,
            boxShadow: shadowColor,
            transition: 'var(--transition)',
            position: 'relative'
          }}>
            <Icon size={26} />
          </div>
          <span className={`badge badge-${service.accent}`}>{service.badge}</span>
        </div>

        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--text-white)',
          marginBottom: '12px',
          letterSpacing: '-0.02em'
        }}>
          {service.title}
        </h3>

        <p style={{
          fontSize: '14.5px',
          color: 'var(--text-muted)',
          marginBottom: '16px',
          lineHeight: 1.6
        }}>
          {service.description}
        </p>

        {/* Feature list */}
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {service.features.map((feat, i) => (
            <li key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: 'var(--text-soft)'
            }}>
              <CheckCircle size={14} style={{ color: accentColor, flexShrink: 0 }} />
              {feat}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={`https://wa.me/573115174372?text=${encodeURIComponent(service.waText)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          color: 'var(--text-white)',
          fontSize: '14px',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'var(--transition)',
          marginTop: 'auto'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `${accentColor}15`;
          e.currentTarget.style.borderColor = `${accentColor}40`;
          e.currentTarget.style.color = accentColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
          e.currentTarget.style.color = 'var(--text-white)';
        }}
      >
        Consultar servicio
        <ArrowRight size={16} />
      </a>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="servicios"
      className="section"
      style={{
        background: 'linear-gradient(180deg, var(--bg-dark) 0%, #0c111c 100%)',
        position: 'relative'
      }}
    >
      {/* Decorative glow */}
      <div className="glow-blob glow-blob-primary" style={{
        top: '10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        opacity: 0.15
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-eyebrow-row">
          <span className="eyebrow">Servicios</span>
        </div>
        <h2 className="section-title">Soluciones integrales de impresión</h2>
        <p className="section-desc">
          Cobertura completa para tus equipos láser y fotocopiadoras. Insumos premium que garantizan la vida útil de tu inversión.
        </p>

        <div className="grid grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
