import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setForm({ name: '', email: '', phone: '', message: '' });
      setSent(false);
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contacto" style={{ padding: '100px 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <h2 className="section-title">Contáctanos y Ubicación</h2>
        <p className="section-desc">
          Visítanos en nuestro local comercial o escríbenos directamente. Estamos listos para atender tus dudas sobre recargas y repuestos.
        </p>

        <div className="grid grid-cols-2">
          {/* Details & Form Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              padding: '32px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              <h3 style={{ fontSize: '22px', color: 'var(--text-white)' }}>Información de Contacto</h3>
              
              {/* Phone */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  background: 'rgba(37, 99, 235, 0.1)',
                  color: 'var(--primary)',
                  padding: '12px',
                  borderRadius: '12px'
                }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Línea de Atención / WhatsApp</h4>
                  <a href="https://wa.me/573115174372" target="_blank" rel="noopener noreferrer" style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--text-white)',
                    textDecoration: 'none',
                    transition: 'var(--transition)'
                  }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = '#fff'}>
                    311 517 4372
                  </a>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  background: 'rgba(14, 165, 233, 0.1)',
                  color: 'var(--accent)',
                  padding: '12px',
                  borderRadius: '12px'
                }}>
                  <Mail size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Correo Electrónico</h4>
                  <a href="mailto:distoner71@gmail.com" style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--text-white)',
                    textDecoration: 'none',
                    transition: 'var(--transition)'
                  }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = '#fff'}>
                    distoner71@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  color: 'var(--warning)',
                  padding: '12px',
                  borderRadius: '12px'
                }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Nuestra Ubicación</h4>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-white)' }}>
                    Carrera 10 # 21-06 Local 270, 269
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Bogotá, Colombia</p>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  background: 'rgba(37, 99, 235, 0.1)',
                  color: 'var(--primary)',
                  padding: '12px',
                  borderRadius: '12px'
                }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Horario de Atención</h4>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-white)' }}>
                    Lunes a Viernes: 8:00 AM - 6:00 PM
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Sábados: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <form onSubmit={handleSubmit} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              padding: '32px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>Escríbenos tu Mensaje</h3>
              
              <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Nombre Completo</label>
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
                  <label className="form-label">Teléfono</label>
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
                <label className="form-label">Correo Electrónico</label>
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
                <label className="form-label">Mensaje o Consulta</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="form-input"
                  placeholder="Detalla el tóner que necesitas o la falla de tu impresora..."
                  style={{ resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={sent}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  justifyContent: 'center',
                  background: sent ? 'var(--success)' : 'linear-gradient(90deg, var(--primary), var(--accent))',
                  boxShadow: sent ? 'none' : 'var(--shadow-neon-primary)'
                }}
              >
                {sent ? (
                  <>
                    <Check size={18} /> ¡Mensaje Enviado con Éxito!
                  </>
                ) : (
                  <>
                    <Send size={18} /> Enviar Consulta por Correo
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="map-container" style={{ flex: 1, minHeight: '400px' }}>
              <iframe
                title="Mapa de Ubicación Distoner"
                src="https://maps.google.com/maps?q=Carrera%2010%20%2321-06%20Bogota%20Colombia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div style={{
              background: 'rgba(245, 158, 11, 0.03)',
              border: '1px solid rgba(245, 158, 11, 0.15)',
              padding: '20px',
              borderRadius: '12px',
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}>
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--warning)',
                padding: '10px',
                borderRadius: '8px'
              }}>
                <MapPin size={24} />
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', margin: 0, textAlign: 'left' }}>
                <strong>¿Cómo llegar?</strong> Nos encontramos en el centro de Bogotá en la Carrera 10, número 21-06, en los locales comerciales 270 y 269. Contamos con parqueaderos cercanos y acceso seguro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
