import { useState } from 'react';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    q: '¿Las recargas de tóner tienen garantía?',
    a: 'Sí. Todas nuestras recargas incluyen garantía escrita de 15 días contra defectos de impresión, manchas o fallas de chip. Si el tóner presenta algún problema en ese periodo, lo reemplazamos o reparamos sin costo adicional.'
  },
  {
    q: '¿Hacen servicio a domicilio en Bogotá?',
    a: 'Sí, cubrimos toda la ciudad de Bogotá y municipios cercanos. Para mantenimiento de impresoras y entrega de pedidos mayores a $80.000 COP, el domicilio es gratuito. Para recargas sueltas coordinamos punto de encuentro o envío por mensajería.'
  },
  {
    q: '¿Cuánto tarda una recarga o mantenimiento?',
    a: 'Las recargas express se entregan el mismo día (1-2 horas). Los mantenimientos preventivos tardan entre 2 y 4 horas según el equipo. Mantenimientos correctivos complejos pueden tomar 24-48h si requieren repuestos especiales.'
  },
  {
    q: '¿Aceptan tóner de cualquier marca y modelo?',
    a: 'Trabajamos con HP, Samsung, Brother, Canon, Lexmark, Kyocera, Ricoh, Konica Minolta y Sharp. Para modelos menos comunes te recomendamos escribirnos primero por WhatsApp con la referencia exacta del cartucho para confirmar disponibilidad.'
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Efectivo, transferencia bancaria, Nequi, Daviplata, tarjetas débito y crédito (datafono en el local), y pago contra entrega para domicilios en Bogotá. Emitimos factura electrónica para empresas.'
  },
  {
    q: '¿Los tóners compatibles dañan la impresora?',
    a: 'No. Nuestros tóners compatibles y recargas pasan por control de calidad con polvo químico premium y chips actualizados que evitan errores de firmware. La garantía cubre cualquier defecto atribuible al insumo.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="section"
      style={{
        background: 'var(--bg-dark)',
        position: 'relative'
      }}
    >
      <div className="container-tight">
        <div className="section-eyebrow-row">
          <span className="eyebrow">Preguntas frecuentes</span>
        </div>
        <h2 className="section-title">Resolvemos tus dudas</h2>
        <p className="section-desc">
          Las consultas más comunes de nuestros clientes. ¿No encuentras tu respuesta? Escríbenos por WhatsApp.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  className="faq-trigger"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className="faq-icon">
                    <Plus size={16} />
                  </span>
                </button>
                <div className="faq-answer">
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: '48px',
          padding: '32px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '20px',
            marginBottom: '10px',
            color: 'var(--text-white)'
          }}>
            ¿Tienes otra pregunta?
          </h3>
          <p style={{
            fontSize: '15px',
            color: 'var(--text-muted)',
            marginBottom: '20px',
            maxWidth: '460px',
            marginInline: 'auto'
          }}>
            Nuestro equipo responde en menos de 2 horas en horario laboral.
          </p>
          <a
            href="https://wa.me/573115174372?text=Hola%20Distoner,%20tengo%20una%20pregunta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ padding: '13px 28px' }}
          >
            Preguntar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
