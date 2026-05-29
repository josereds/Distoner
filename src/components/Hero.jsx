import React from 'react';
import { Phone, ArrowRight, Printer, CheckCircle } from 'lucide-react';

export default function Hero({ onNavigate }) {
  return (
    <section id="inicio" className="hero-section" style={{
      position: 'relative',
      height: '100vh',
      minHeight: '600px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      color: '#fff'
    }}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          objectFit: 'cover'
        }}
      >
        <source src="/hero_video.mp4" type="video/mp4" />
        Tu navegador no soporta videos.
      </video>

      {/* High contrast overlay with radial CMYK hint */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, rgba(8, 9, 11, 0.4) 0%, rgba(8, 9, 11, 0.95) 100%)',
        zIndex: 2
      }} />

      {/* Content */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        maxWidth: '850px',
        padding: '0 20px'
      }}>


        <h1 style={{
          fontSize: 'clamp(36px, 7vw, 68px)',
          lineHeight: '1.1',
          marginBottom: '20px',
          fontWeight: '800'
        }}>
          Recargas, Suministros y <span style={{
            background: 'linear-gradient(90deg, var(--primary), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(37, 99, 235, 0.15)'
          }}>Mantenimiento Técnico</span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 3.5vw, 19px)',
          color: 'rgba(255, 255, 255, 0.75)',
          marginBottom: '36px',
          maxWidth: '650px',
          marginInline: 'auto'
        }}>
          Garantiza el rendimiento de tus equipos en Bogotá. Ofrecemos tóner para impresoras, fotocopiadoras, recargas express con chip, cilindros, acetatos y servicio técnico profesional.
        </p>

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button onClick={() => onNavigate('productos')} className="btn btn-primary" style={{ padding: '14px 32px' }}>
            Explorar Catálogo <ArrowRight size={18} />
          </button>
          <a
            href="https://wa.me/573115174372?text=Hola%20Distoner,%20quisiera%20cotizar%20un%20servicio%20de%20recarga%20o%20mantenimiento"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: '14px 32px' }}
          >
            Contacto Rápido <Phone size={18} style={{ color: 'var(--accent)' }} />
          </a>
        </div>

        {/* Benefits bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginTop: '64px',
          flexWrap: 'wrap',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '28px'
        }}>
          {[
            'Servicio a domicilio Bogotá',
            'Garantía real en recargas',
            'Repuestos de alta duración'
          ].map((benefit, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: '500'
            }}>
              <CheckCircle size={16} style={{ color: index === 0 ? 'var(--primary)' : index === 1 ? 'var(--accent)' : 'var(--warning)' }} />
              {benefit}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative gradient blur at the bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '80px',
        background: 'linear-gradient(to top, var(--bg-dark), transparent)',
        zIndex: 3
      }} />
    </section>
  );
}
