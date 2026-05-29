import React from 'react';
import { RefreshCw, Wrench, Printer, Layers, Cpu, Compass } from 'lucide-react';

const SERVICES = [
  {
    title: 'Recarga de Tóner Láser',
    description: 'Servicio express de recargas de alta calidad para impresoras HP, Samsung, Brother, Lexmark, Kyocera. Incluye cambio de chip y calibración completa para igualar el rendimiento original.',
    icon: RefreshCw,
    accent: 'primary',
    badge: 'Express',
    waText: 'Hola Distoner, me gustaría solicitar una recarga de tóner.'
  },
  {
    title: 'Mantenimiento de Impresoras',
    description: 'Servicio técnico preventivo y correctivo. Limpieza del sensor óptico, lubricación de engranajes, reemplazo de rodillos de presión y desatasco de papel en sitio o laboratorio.',
    icon: Wrench,
    accent: 'accent',
    badge: 'Garantizado',
    waText: 'Hola Distoner, necesito cotizar un mantenimiento técnico para mis impresoras.'
  },
  {
    title: 'Suministros para Fotocopiadoras',
    description: 'Venta de tóner genérico y original de alto rendimiento para fotocopiadoras Ricoh, Konica Minolta, Sharp y Canon. Cilindros, reveladores y cuchillas de limpieza.',
    icon: Printer,
    accent: 'secondary',
    badge: 'Mayoristas',
    waText: 'Hola Distoner, quiero cotizar insumos o tóners para fotocopiadoras.'
  },
  {
    title: 'Chips y Cilindros (OPC)',
    description: 'Chips inteligentes actualizados para el reconocimiento de cartuchos por firmware nuevo. Cilindros fotorreceptores de alto brillo para impresiones nítidas sin manchas.',
    icon: Cpu,
    accent: 'primary',
    badge: 'Repuestos',
    waText: 'Hola Distoner, necesito cotizar chips o cilindros específicos.'
  },
  {
    title: 'Acetatos Térmicos',
    description: 'Acetatos de alta transparencia ideales para serigrafía, presentaciones o material educativo, preparados para soportar altas temperaturas de impresoras láser sin arrugas.',
    icon: Layers,
    accent: 'accent',
    badge: 'Especiales',
    waText: 'Hola Distoner, estoy interesado en comprar paquetes de hojas de acetato.'
  },
  {
    title: 'Soporte y Diagnóstico',
    description: 'Evaluamos el estado de tus equipos de impresión a domicilio en Bogotá. Diagnósticos transparentes respaldados por repuestos 100% compatibles e insumos premium.',
    icon: Compass,
    accent: 'secondary',
    badge: 'Bogotá',
    waText: 'Hola Distoner, quisiera programar un diagnóstico técnico a domicilio.'
  }
];

export default function Services() {
  return (
    <section id="servicios" style={{ padding: '100px 0', background: 'linear-gradient(to bottom, var(--bg-dark), #0e1422)' }}>
      <div className="container">
        <h2 className="section-title">Nuestros Servicios</h2>
        <p className="section-desc">
          Ofrecemos soluciones integrales de impresión con el mejor soporte técnico de Bogotá. Insumos premium que garantizan la vida útil de tus equipos.
        </p>

        <div className="grid grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const accentColor = service.accent === 'primary' ? 'var(--primary)' : service.accent === 'accent' ? 'var(--accent)' : 'var(--secondary)';
            const shadowColor = service.accent === 'primary' ? 'var(--shadow-neon-primary)' : service.accent === 'accent' ? 'var(--shadow-neon-accent)' : 'none';
            
            return (
              <div 
                key={index} 
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  height: '100%',
                  gap: '20px'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      background: `rgba(255,255,255,0.03)`,
                      border: `1px solid rgba(255, 255, 255, 0.1)`,
                      padding: '12px',
                      borderRadius: '12px',
                      color: accentColor,
                      boxShadow: shadowColor
                    }}>
                      <Icon size={24} />
                    </div>
                    <span className={`badge badge-${service.accent}`}>{service.badge}</span>
                  </div>

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: 'var(--text-white)',
                    marginBottom: '12px'
                  }}>
                    {service.title}
                  </h3>
                  
                  <p style={{ fontSize: '14.5px', color: 'var(--text-muted)' }}>
                    {service.description}
                  </p>
                </div>

                <a 
                  href={`https://wa.me/573115174372?text=${encodeURIComponent(service.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    fontSize: '13.5px',
                    justifyContent: 'center',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  Consultar Servicio
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
