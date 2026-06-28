import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check, MessageCircle, ShieldCheck, Zap } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build a structured WhatsApp message from the form data
    const message =
      `Hola Distoner, quisiera hacer una consulta:\n\n` +
      `*Nombre:* ${form.name}\n` +
      `*Teléfono:* ${form.phone}\n` +
      `*Email:* ${form.email}\n\n` +
      `*Mensaje:* ${form.message}`;

    const whatsappUrl = `https://wa.me/573115174372?text=${encodeURIComponent(message)}`;

    setSent(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setForm({ name: '', email: '', phone: '', message: '' });
      setSent(false);
    }, 800);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contacto"
      className="section"
      style={{
        background: 'linear-gradient(180deg, var(--bg-dark) 0%, #0c111c 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative blob */}
      <div className="glow-blob glow-blob-accent" style={{
        top: '10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        opacity: 0.15
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-eyebrow-row">
          <span className="eyebrow eyebrow-success">Contacto</span>
        </div>
        <h2 className="section-title">Hablemos de tu equipo</h2>
        <p className="section-desc">
          Visítanos en nuestro local o escríbenos directamente. Respondemos en menos de 2 horas en horario laboral.
        </p>

        <div className="grid grid-cols-2" style={{ gap: '32px', alignItems: 'start' }}>
          {/* Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ padding: '32px', gap: '0' }}>
              <h3 style={{
                fontSize: '22px',
                color: 'var(--text-white)',
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}>
                Información de contacto
              </h3>

              {/* Contact items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  {
                    icon: Phone,
                    bg: 'rgba(16, 185, 129, 0.1)',
                    color: 'var(--success)',
                    label: 'Línea / WhatsApp',
                    value: '311 517 4372',
                    href: 'https://wa.me/573115174372',
                    sub: 'Respuesta en menos de 2h'
                  },
                  {
                    icon: Mail,
                    bg: 'rgba(14, 165, 233, 0.1)',
                    color: 'var(--accent)',
                    label: 'Correo electrónico',
                    value: 'distoner71@gmail.com',
                    href: 'mailto:distoner71@gmail.com',
                    sub: 'Cotizaciones empresariales'
                  },
                  {
                    icon: MapPin,
                    bg: 'rgba(245, 158, 11, 0.1)',
                    color: 'var(--warning)',
                    label: 'Punto de venta',
                    value: 'Carrera 10 # 21-06, Local 270/269',
                    href: 'https://maps.google.com/?q=Carrera+10+%2321-06+Bogota',
                    sub: 'Bogotá, Colombia'
                  },
                  {
                    icon: Clock,
                    bg: 'rgba(37, 99, 235, 0.1)',
                    color: 'var(--primary)',
                    label: 'Horario',
                    value: 'Lun–Vie: 8:00 AM – 6:00 PM',
                    href: null,
                    sub: 'Sábados: 9:00 AM – 2:00 PM'
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <div style={{
                        background: item.bg,
                        color: item.color,
                        padding: '12px',
                        borderRadius: '12px',
                        flexShrink: 0,
                        transition: 'var(--transition)'
                      }}>
                        <Icon size={22} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          fontWeight: '600',
                          marginBottom: '4px'
                        }}>
                          {item.label}
                        </div>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          color: 'var(--text-white)',
                          marginBottom: '2px',
                          lineHeight: 1.3
                        }}>
                          {item.value}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          {item.sub}
                        </div>
                      </div>
                    </>
                  );
                  return item.href ? (
                    <a
                      key={idx}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                        textDecoration: 'none',
                        padding: '12px',
                        margin: '-12px',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'var(--transition)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust badges row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 16px',
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.15)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <ShieldCheck size={18} style={{ color: 'var(--success)' }} />
                <div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: 'var(--text-white)',
                    lineHeight: 1.1
                  }}>
                    Garantía escrita
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    En todos los servicios
                  </div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 16px',
                background: 'rgba(14, 165, 233, 0.05)',
                border: '1px solid rgba(14, 165, 233, 0.15)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <Zap size={18} style={{ color: 'var(--accent)' }} />
                <div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: 'var(--text-white)',
                    lineHeight: 1.1
                  }}>
                    {'Respuesta < 2h'}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    En horario laboral
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="card" style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <h3 style={{
                fontSize: '22px',
                color: 'var(--text-white)',
                marginBottom: '6px',
                letterSpacing: '-0.02em'
              }}>
                Escríbenos tu mensaje
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <MessageCircle size={14} style={{ color: 'var(--success)' }} />
                Se enviará directo a nuestro WhatsApp
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="grid grid-cols-2" style={{ gap: '14px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    Nombre completo <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    Teléfono <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Ej. 3001234567"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">
                  Correo electrónico <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="nombre@ejemplo.com"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">
                  Mensaje o consulta <span className="required">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="form-input"
                  placeholder="Detalla el tóner que necesitas o la falla de tu impresora..."
                  style={{ resize: 'vertical', fontFamily: 'inherit', minHeight: '110px' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-whatsapp"
                disabled={sent}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: 'var(--radius-sm)',
                  marginTop: '6px',
                  fontSize: '15px'
                }}
              >
                {sent ? (
                  <>
                    <Check size={18} /> Abriendo WhatsApp...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Enviar consulta por WhatsApp
                  </>
                )}
              </button>

              <p style={{
                fontSize: '11.5px',
                color: 'var(--text-muted)',
                textAlign: 'center',
                marginTop: '4px'
              }}>
                Tus datos se envían directamente al WhatsApp de Distoner. No se almacenan en servidores externos.
              </p>
            </form>
          </div>
        </div>

        {/* Map section */}
        <div style={{
          marginTop: '32px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px'
        }}>
          <div className="map-container" style={{ minHeight: '340px' }}>
            <iframe
              title="Mapa de Ubicación Distoner"
              src="https://maps.google.com/maps?q=Carrera%2010%20%2321-06%20Bogota%20Colombia&t=&z=16&ie=UTF8&iwloc=&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ borderRadius: 'var(--radius-md)' }}
            />
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.1)',
              color: 'var(--warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MapPin size={24} />
            </div>
            <div>
              <h4 style={{
                fontSize: '17px',
                color: 'var(--text-white)',
                marginBottom: '8px'
              }}>
                ¿Cómo llegar?
              </h4>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '16px'
              }}>
                Estamos en el centro de Bogotá, Carrera 10 # 21-06, locales 270 y 269. Contamos con parqueaderos cercanos.
              </p>
              <a
                href="https://maps.google.com/?q=Carrera+10+%2321-06+Bogota+Colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '10px 18px', fontSize: '13.5px' }}
              >
                <MapPin size={14} />
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contacto .grid.grid-cols-2 {
            grid-template-columns: 1fr;
          }
          #contacto > .container > .grid + div,
          #contacto div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
