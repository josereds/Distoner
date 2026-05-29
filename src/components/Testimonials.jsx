import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Carlos Martínez",
    role: "Director IT, Empresa de Logística",
    content: "Excelente servicio técnico. Revivieron nuestras impresoras láser cuando ya pensábamos desecharlas. Los tóners duran más de lo esperado.",
  },
  {
    name: "Ana Rodríguez",
    role: "Administradora, Colegio San José",
    content: "Distoner es nuestro proveedor de confianza desde hace 3 años. Las recargas son súper nítidas y siempre nos atienden el mismo día que llamamos.",
  },
  {
    name: "Luis Fernando Gómez",
    role: "Dueño de Papelería",
    content: "Compro los insumos y cilindros con ellos. Tienen los mejores precios en la Carrera 10 y los chips nunca marcan error. Muy recomendados.",
  },
  {
    name: "María Fernanda López",
    role: "Gerente, Agencia de Publicidad",
    content: "La calidad de impresión de los tóners a color es increíble, no tienen nada que envidiarle a los originales. Además el servicio al cliente es de primera.",
  },
  {
    name: "Javier Sánchez",
    role: "Independiente",
    content: "Rápidos y honestos. Me hicieron un mantenimiento preventivo a mi impresora de casa y quedó como nueva. Total transparencia en los repuestos.",
  }
];

export default function Testimonials() {
  return (
    <section id="testimonios" style={{
      padding: '80px 0',
      background: 'var(--bg-dark)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
        <p className="section-desc">
          Testimonios reales de empresas y personas que confían en la calidad de nuestros servicios y suministros.
        </p>

        <div className="marquee-wrapper">
          <div className="marquee-content">
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div key={idx} className="card testimonial-card">
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', color: 'var(--warning)' }}>
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                </div>
                <p style={{ fontSize: '15px', color: 'var(--text-white)', marginBottom: '20px', fontStyle: 'italic' }}>
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 style={{ color: 'var(--primary)', fontSize: '16px', marginBottom: '2px' }}>{testimonial.name}</h4>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
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
          animation: marquee 40s linear infinite;
          padding-right: 24px;
        }

        .marquee-wrapper:hover .marquee-content {
          animation-play-state: paused;
        }
        
        .testimonial-card {
          width: 350px;
          flex-shrink: 0;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 12px));
          }
        }
        
        @media (max-width: 768px) {
          .testimonial-card {
            width: 280px;
          }
          .marquee-content {
            animation-duration: 30s;
          }
        }
      `}} />
    </section>
  );
}
