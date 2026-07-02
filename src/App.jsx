import { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import BrandLogos from './components/BrandLogos';
import Services from './components/Services';
import Products from './components/Products';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import StoreHeader from './components/StoreHeader';
import { INITIAL_PRODUCTS } from './data/products';
import { isSupabaseConfigured } from './lib/supabaseClient';
import { fetchPublicProducts } from './data/productsRepo';
import {
  Printer, Phone, Mail, MapPin,
  ChevronUp, MessageCircle, ShieldCheck, Clock, ShoppingBag
} from 'lucide-react';

// Inline brand SVGs (lucide-react 1.x doesn't ship Facebook/Instagram)
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);

// Bump when the catalog changes so stale browser data is replaced.
const PRODUCT_VERSION = 'v8-2026-06-fotos-fisicas';


function loadInitialProducts() {
  const savedVersion = localStorage.getItem('distoner_products_version');
  const savedProducts = localStorage.getItem('distoner_products');

  if (savedProducts && savedVersion === PRODUCT_VERSION) {
    try {
      const parsed = JSON.parse(savedProducts);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Invalid browser data is replaced below.
    }
  }

  localStorage.setItem('distoner_products', JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem('distoner_products_version', PRODUCT_VERSION);
  localStorage.removeItem('distoner_cart');
  return INITIAL_PRODUCTS;
}

// Reveal-on-scroll hook
function useRevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    );

    const els = document.querySelectorAll('.reveal:not(.is-visible)');
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}

// Hash-based routing for /admin access without exposing in nav
function useHashRoute(navigateTo) {
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        navigateTo('admin');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [navigateTo]);
}

export default function App() {
  // Con Supabase configurado el catálogo se lee de la BD (efecto de abajo);
  // si no, se usa el catálogo local como hasta ahora.
  const [products, setProducts] = useState(
    () => (isSupabaseConfigured ? [] : loadInitialProducts())
  );

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let active = true;
    fetchPublicProducts().then((list) => {
      if (active) setProducts(list);
    });
    return () => {
      active = false;
    };
  }, []);

  const [currentView, setCurrentView] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowScrollTop(y > 600);
      setScrolled(y > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync nav active state with scroll position
  useEffect(() => {
    if (currentView === 'admin') return;

    const sections = ['inicio', 'servicios', 'productos', 'testimonios', 'contacto'];

    const handleScrollSync = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentView(sections[i]);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSync, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSync);
  }, [currentView]);

  // Reveal on scroll
  useRevealObserver();

  // Re-trigger observer when view changes
  useEffect(() => {
    if (currentView !== 'admin') {
      const t = setTimeout(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
        );
        document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer.observe(el));
      }, 100);
      return () => clearTimeout(t);
    }
  }, [currentView]);

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);

    if (view !== 'admin') {
      const element = document.getElementById(view);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useHashRoute(navigateTo);

  useEffect(() => {
    const hash = window.location.hash;
    const targetId = hash.startsWith('#producto=') ? 'productos' : hash.slice(1);
    if (!['inicio', 'servicios', 'productos', 'testimonios', 'contacto'].includes(targetId)) return undefined;

    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView('inicio');
  };

  const isAdmin = currentView === 'admin';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      <StoreHeader
        scrolled={scrolled}
        currentView={currentView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navigateTo={navigateTo}
        productCount={products.length}
      />

      {/* Main Content Area */}
      <main id="main-content" ref={mainRef} style={{ flex: 1 }}>
        {isAdmin ? (
          <AdminDashboard
            products={products}
            setProducts={setProducts}
            onNavigate={navigateTo}
          />
        ) : (
          <>
            <Hero onNavigate={navigateTo} />
            <TrustStrip />
            <Products products={products} />
            <BrandLogos />
            <Services />
            <HowItWorks />
            <Testimonials />
            <FAQ />
            <Contact />
          </>
        )}
      </main>

      {/* Footer Area */}
      <footer style={{
        background: '#040507',
        borderTop: '1px solid var(--border-color)',
        padding: '64px 0 32px 0',
        color: 'var(--text-muted)',
        fontSize: '14.5px',
        position: 'relative',
        zIndex: 2
      }}>
        <div className="container">
          <div className="grid footer-grid" style={{
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            marginBottom: '40px',
            gap: '40px'
          }}>
            {/* Branding Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="logo">
                <span className="logo-icon-wrap">
                  <Printer size={20} />
                </span>
                <span className="logo-text">
                  <span className="brand">DISTONER</span>
                  <span className="tagline">Suministros · Bogotá</span>
                </span>
              </a>
              <p style={{ maxWidth: '320px', lineHeight: 1.6 }}>
                Especialistas en recarga de tóner, suministros y mantenimiento de impresoras láser y fotocopiadoras en Bogotá. Garantía escrita en todos los servicios.
              </p>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <a
                  href="https://wa.me/573115174372"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(37, 211, 102, 0.08)',
                    border: '1px solid rgba(37, 211, 102, 0.2)',
                    color: '#25d366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(37, 211, 102, 0.18)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(37, 211, 102, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(214, 51, 108, 0.15)';
                    e.currentTarget.style.color = '#e1306c';
                    e.currentTarget.style.borderColor = 'rgba(214, 51, 108, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(24, 119, 242, 0.15)';
                    e.currentTarget.style.color = '#1877f2';
                    e.currentTarget.style.borderColor = 'rgba(24, 119, 242, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <FacebookIcon size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '700', marginBottom: '8px', letterSpacing: '0.02em' }}>Navegación</h4>
              <a href="#inicio" onClick={(e) => { e.preventDefault(); navigateTo('inicio'); }} className="nav-link" style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px', padding: 0 }}>Inicio</a>
              <a href="#servicios" onClick={(e) => { e.preventDefault(); navigateTo('servicios'); }} style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px', padding: 0 }}>Servicios</a>
              <a href="#productos" onClick={(e) => { e.preventDefault(); navigateTo('productos'); }} style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px', padding: 0 }}>Catálogo</a>
              <a href="#testimonios" onClick={(e) => { e.preventDefault(); navigateTo('testimonios'); }} style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px', padding: 0 }}>Opiniones</a>
              <a href="#contacto" onClick={(e) => { e.preventDefault(); navigateTo('contacto'); }} style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px', padding: 0 }}>Contacto</a>
            </div>

            {/* Services Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '700', marginBottom: '8px', letterSpacing: '0.02em' }}>Servicios</h4>
              <a href="#servicios" onClick={(e) => { e.preventDefault(); navigateTo('servicios'); }} style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px' }}>Recarga de tóner</a>
              <a href="#servicios" onClick={(e) => { e.preventDefault(); navigateTo('servicios'); }} style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px' }}>Mantenimiento</a>
              <a href="#servicios" onClick={(e) => { e.preventDefault(); navigateTo('servicios'); }} style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px' }}>Repuestos y chips</a>
              <a href="#servicios" onClick={(e) => { e.preventDefault(); navigateTo('servicios'); }} style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px' }}>Acetatos térmicos</a>
              <a href="#servicios" onClick={(e) => { e.preventDefault(); navigateTo('servicios'); }} style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '14px' }}>Soporte a domicilio</a>
            </div>

            {/* Contact Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '700', marginBottom: '8px', letterSpacing: '0.02em' }}>Contacto</h4>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                <MapPin size={15} style={{ color: 'var(--warning)', flexShrink: 0, marginTop: 2 }} />
                Carrera 10 # 21-06, Local 270/269, Bogotá
              </p>
              <a href="https://wa.me/573115174372" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--text-muted)', textDecoration: 'none' }}>
                <Phone size={15} style={{ color: 'var(--success)' }} />
                311 517 4372
              </a>
              <a href="mailto:distoner71@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--text-muted)', textDecoration: 'none', wordBreak: 'break-all' }}>
                <Mail size={15} style={{ color: 'var(--accent)' }} />
                distoner71@gmail.com
              </a>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                <Clock size={15} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
                Lun–Vie 8AM–6PM · Sáb 9AM–2PM
              </p>
            </div>
          </div>

          {/* Trust badges row */}
          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '20px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '24px'
          }}>
            {[
              { icon: ShieldCheck, label: 'Garantía escrita' },
              { icon: Clock, label: 'Respuesta < 2h' },
              { icon: Printer, label: '+10 años experiencia' }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  fontWeight: '500'
                }}>
                  <Icon size={15} style={{ color: 'var(--primary)' }} />
                  {item.label}
                </div>
              );
            })}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Distoner Suministros. Todos los derechos reservados.
            </p>
            <p style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>Bogotá, Colombia</span>
              <a
                href="#admin"
                onClick={(e) => { e.preventDefault(); navigateTo('admin'); }}
                style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.2)', textDecoration: 'none', fontSize: '12px' }}
                title="Acceso administrativo"
              >
                Admin
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for WhatsApp */}
      <a
        href="https://wa.me/573115174372?text=Hola%20Distoner,%20quisiera%20cotizar%20un%20servicio%20o%20producto%20de%20impresi%C3%B3n"
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        title="Escríbenos por WhatsApp"
        aria-label="Escríbenos por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          className="scroll-top-button"
          onClick={scrollToTop}
          aria-label="Volver arriba"
          style={{
            position: 'fixed',
            bottom: '100px',
            left: '24px',
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            color: 'var(--primary)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            zIndex: 1000,
            transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.4)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <ChevronUp size={22} />
        </button>
      )}

      {/* Mobile Bottom Navigation */}
      {!isAdmin && (
        <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
          <div className="mobile-bottom-nav-inner">
            <button
              type="button"
              className={`mobile-nav-tab ${currentView === 'inicio' || currentView === 'servicios' || currentView === 'testimonios' || currentView === 'contacto' ? 'active' : ''}`}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setCurrentView('inicio');
              }}
              aria-label="Inicio"
            >
              <span className="mobile-nav-tab-icon">
                <Printer size={20} />
              </span>
              <span className="mobile-nav-tab-label">Inicio</span>
            </button>
            <button
              type="button"
              className={`mobile-nav-tab ${currentView === 'productos' ? 'active' : ''}`}
              onClick={() => navigateTo('productos')}
              aria-label="Catálogo"
            >
              <span className="mobile-nav-tab-icon">
                <ShoppingBag size={20} />
              </span>
              <span className="mobile-nav-tab-label">Catálogo</span>
              <span className="mobile-nav-tab-badge">{products.length}</span>
            </button>
          </div>
        </nav>
      )}

    </div>
  );
}
