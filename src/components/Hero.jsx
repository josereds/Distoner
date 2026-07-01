import { useEffect, useRef } from 'react';
import { Phone, ArrowRight, CheckCircle, MapPin, Shield, Sparkles } from 'lucide-react';

export default function Hero({ onNavigate }) {
  const heroRef = useRef(null);

  // Azul de marca reutilizado en "DISTONER" y "Mantenimiento Técnico"
  const blueGradient = {
    background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #0ea5e9 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  // Subtle parallax on mouse move for premium feel
  useEffect(() => {
    const handler = (e) => {
      if (!heroRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      heroRef.current.style.setProperty('--px', `${x}px`);
      heroRef.current.style.setProperty('--py', `${y}px`);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section id="inicio" ref={heroRef} className="hero-section" style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      color: '#fff',
      paddingTop: '80px',
      paddingBottom: '60px'
    }}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
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

      {/* Layered overlays for premium depth */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, rgba(37, 99, 235, 0.18), transparent),
          radial-gradient(ellipse 60% 50% at 100% 100%, rgba(14, 165, 233, 0.12), transparent),
          linear-gradient(180deg, rgba(8, 9, 11, 0.65) 0%, rgba(8, 9, 11, 0.55) 50%, rgba(10, 14, 23, 0.95) 100%)
        `,
        zIndex: 2
      }} />

      {/* Subtle grid overlay for premium tech texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        zIndex: 2,
        transform: 'translate(var(--px, 0), var(--py, 0))'
      }} />

      {/* Content */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 4,
        textAlign: 'center',
        maxWidth: '920px',
        padding: '0 24px',
        transform: 'translate(var(--px, 0), var(--py, 0))'
      }}>
        {/* Eyebrow badge */}
        <div className="hero-eyebrow reveal is-visible" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px 8px 8px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          marginBottom: '28px',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.85)'
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            color: 'white',
            fontWeight: '700',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            <Sparkles size={11} /> Bogotá
          </span>
          <span style={{ fontWeight: '500' }}>Especialistas en impresión láser desde 2014</span>
        </div>

        <h1 className="hero-title" style={{
          fontSize: 'var(--text-display)',
          lineHeight: '1.05',
          marginBottom: '24px',
          fontWeight: '800',
          letterSpacing: '-0.04em',
          color: 'white'
        }}>
          <span style={{
            ...blueGradient,
            display: 'block',
            fontSize: '1.4em',
            fontWeight: '900',
            lineHeight: '1',
            letterSpacing: '0.01em',
            marginBottom: '12px',
            filter: 'drop-shadow(0 0 40px rgba(37, 99, 235, 0.45))'
          }}>DISTONER</span>
          Recargas, Suministros{' '}y<br />
          <span style={{
            ...blueGradient,
            filter: 'drop-shadow(0 0 30px rgba(37, 99, 235, 0.35))'
          }}>Mantenimiento Técnico</span>
        </h1>

        <p className="hero-subtitle" style={{
          fontSize: 'var(--text-lg)',
          color: 'rgba(255, 255, 255, 0.78)',
          marginBottom: '40px',
          maxWidth: '680px',
          marginInline: 'auto',
          lineHeight: '1.55'
        }}>
          Garantiza el rendimiento de tus equipos en Bogotá. Ofrecemos tóner para impresoras, fotocopiadoras, recargas express con chip, cilindros, acetatos y servicio técnico profesional con <strong style={{ color: 'rgba(255,255,255,0.95)' }}>garantía escrita</strong>.
        </p>

        {/* Action buttons */}
        <div className="hero-actions" style={{
          display: 'flex',
          gap: '14px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '56px'
        }}>
          <button
            onClick={() => onNavigate('productos')}
            className="btn btn-primary"
            style={{ padding: '16px 32px', fontSize: '15.5px' }}
          >
            Explorar Catálogo
            <ArrowRight size={18} />
          </button>
          <a
            href="https://wa.me/573115174372?text=Hola%20Distoner,%20quisiera%20cotizar%20un%20servicio%20de%20recarga%20o%20mantenimiento"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: '16px 32px', fontSize: '15.5px' }}
          >
            <Phone size={18} style={{ color: 'var(--success)' }} />
            Contacto Rápido
          </a>
        </div>

        {/* Premium benefits strip */}
        <div className="hero-benefits" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          flexWrap: 'wrap',
          padding: '24px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }}>
          {[
            { icon: MapPin, color: 'var(--primary)', label: 'Servicio a domicilio', sub: 'Bogotá y alrededores' },
            { icon: Shield, color: 'var(--accent)', label: 'Garantía escrita', sub: 'en todas las recargas' },
            { icon: CheckCircle, color: 'var(--warning)', label: 'Repuestos premium', sub: 'alta duración' }
          ].map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: benefit.color
                }}>
                  <Icon size={18} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontSize: '14.5px',
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: '600'
                  }}>
                    {benefit.label}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)'
                  }}>
                    {benefit.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        color: 'rgba(255,255,255,0.4)',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        animation: 'float 2.5s ease-in-out infinite'
      }}>
        Desliza
        <div style={{
          width: '22px',
          height: '34px',
          border: '1.5px solid rgba(255,255,255,0.3)',
          borderRadius: '12px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '3px',
            height: '8px',
            background: 'rgba(255,255,255,0.6)',
            borderRadius: '2px',
            animation: 'float 2s ease-in-out infinite'
          }} />
        </div>
      </div>
    </section>
  );
}
