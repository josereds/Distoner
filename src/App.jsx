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
const PRODUCT_VERSION = 'v6-2026-06-fotos-cliente';

// This inventory contains only the 18 references supplied by the client.
// Rows 17–21 were absent from the source list; no products are invented to fill that gap.
const INITIAL_PRODUCTS = [
  {
    id: 'ic-951-cy', inventoryNumber: 1, name: 'Cartucho PrintKing H-951XL Cian',
    reference: 'H-951XL CY', color: 'Cian', brand: 'PrintKing', category: 'ink-cartridge',
    description: 'Cartucho de tinta compatible, alta capacidad XL. Referencia suministrada: H-951XL CY.',
    price: null, stock: 1, image: '/images/products/cliente/h-951xl.jpeg',
    sourceUrl: 'https://www.1ink.com/hp-951xl-ink-cartridge-cyan-cn046an-remanufactured-replacement/'
  },
  {
    id: 'ic-951-yl', inventoryNumber: 2, name: 'Cartucho PrintKing H-951XL Amarillo',
    reference: 'H-951XL YL', color: 'Amarillo', brand: 'PrintKing', category: 'ink-cartridge',
    description: 'Cartucho de tinta compatible, alta capacidad XL. Referencia suministrada: H-951XL YL.',
    price: null, stock: 1, image: '/images/products/cliente/h-951xl.jpeg',
    sourceUrl: 'https://www.houseofinks.com/hp-951xl-cn048an-high-yield-yellow-ink-cartridge-remanufactured-shows-accurate-ink-levels/'
  },
  {
    id: 'ic-951-mg', inventoryNumber: 3, name: 'Cartucho PrintKing H-951XL Magenta',
    reference: 'H-951XL MG', color: 'Magenta', brand: 'PrintKing', category: 'ink-cartridge',
    description: 'Cartucho de tinta compatible, alta capacidad XL. Referencia suministrada: H-951XL MG.',
    price: null, stock: 1, image: '/images/products/cliente/h-951xl.jpeg',
    sourceUrl: 'https://www.1ink.com/hp-951xl-ink-cartridge-magenta-cn047an-remanufactured-replacement/'
  },
  {
    id: 'ic-950-bk', inventoryNumber: 4, name: 'Cartucho PrintKing H-950XL Negro',
    reference: 'H-950XL BK', color: 'Negro', brand: 'PrintKing', category: 'ink-cartridge',
    description: 'Cartucho de tinta compatible, alta capacidad XL. Referencia suministrada: H-950XL BK.',
    price: null, stock: 1, image: '/images/products/h950-black.jpg',
    sourceUrl: 'https://www.swiftink.com/product/remanufactured-high-yield-black-pigment-based-ink-cartridge-for-cn045an-hp-950xl/'
  },
  {
    id: 'tn-tk3162', inventoryNumber: 5, name: 'Tóner compatible TK-3162',
    reference: 'TK-3162', color: 'Negro', brand: 'Kyocera', category: 'toner',
    description: 'Tóner compatible negro. Referencia suministrada: TK-3162.',
    price: null, stock: 1, image: '/images/products/cliente/tk-3162.jpeg',
    sourceUrl: 'https://www.inktechnologies.com/kyocera-mita-tk-3162-black-toner-cartridge-genuine-oem'
  },
  {
    id: 'tn-w1330a', inventoryNumber: 6, name: 'Tóner compatible HP 330A',
    reference: 'W1330A · 330A', color: 'Negro', brand: 'HP', category: 'toner',
    description: 'Tóner compatible negro. W1330A corresponde a la denominación comercial HP 330A.',
    price: null, stock: 1, image: '/images/products/cliente/w1330a.jpeg',
    sourceUrl: 'https://tonercompatibleperu.com/producto/toner-hp-330a-w1330a-compatible/'
  },
  {
    id: 'ib-t504-yl', inventoryNumber: 7, name: 'Botella de tinta T504/T544 Amarillo',
    reference: 'T504 / T544', color: 'Amarillo', brand: 'Epson compatible', category: 'ink-bottle',
    description: 'Botella de tinta de recarga amarilla para la familia de referencias T504/T544.',
    price: null, stock: 1, image: '/images/products/cliente/t504-t544.jpeg',
    sourceUrl: 'https://sskaizen.com/co/producto/botella-tinta-epson-t504-70ml-yellow/'
  },
  {
    id: 'ib-t504-mg', inventoryNumber: 8, name: 'Botella de tinta T504/T544 Magenta',
    reference: 'T504 / T544', color: 'Magenta', brand: 'Epson compatible', category: 'ink-bottle',
    description: 'Botella de tinta de recarga magenta para la familia de referencias T504/T544.',
    price: null, stock: 1, image: '/images/products/cliente/t504-t544.jpeg',
    sourceUrl: 'https://sskaizen.com/co/producto/botella-tinta-epson-t504-70ml-magenta/'
  },
  {
    id: 'ib-t504-cy', inventoryNumber: 9, name: 'Botella de tinta T504/T544 Cian',
    reference: 'T504 / T544', color: 'Cian', brand: 'Epson compatible', category: 'ink-bottle',
    description: 'Botella de tinta de recarga cian para la familia de referencias T504/T544.',
    price: null, stock: 1, image: '/images/products/cliente/t504-t544.jpeg',
    sourceUrl: 'https://recargasrafaela.com.ar/producto/global-botella-tinta-para-epson-t504-t544-cian-70ml/'
  },
  {
    id: 'ib-t504-bk', inventoryNumber: 10, name: 'Botella Premium Refill Ink 504/544 Negro',
    reference: '504 / 544 Premium Refill Ink', color: 'Negro', brand: 'Premium Refill Ink', category: 'ink-bottle',
    description: 'Botella de tinta negra de recarga. Referencia suministrada: 504/544 Premium Refill Ink.',
    price: null, stock: 1, image: '/images/products/cliente/t504-t544.jpeg',
    sourceUrl: 'https://sumisoft.com.co/producto/tinta-generica-epson-504-544-negro/'
  },
  {
    id: 'tn-w1510a', inventoryNumber: 11, name: 'Tóner compatible HP 151A',
    reference: 'W1510A · 151A', color: 'Negro', brand: 'HP', category: 'toner',
    description: 'Tóner compatible negro. W1510A corresponde a la denominación comercial HP 151A.',
    price: null, stock: 1, image: '/images/products/cliente/w1510a.jpeg',
    sourceUrl: 'https://compudisa.com.pe/producto/toner-hp-w1510a-laserjet-pro-151a-negro/'
  },
  {
    id: 'tn-ce505a-cf280a', inventoryNumber: 12, name: 'Tóner compatible CE505A / CF280A',
    reference: 'CE505A / CF280A', color: 'Negro', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible negro. Referencias suministradas: CE505A y CF280A.',
    price: null, stock: 1, image: '/images/products/cliente/ce505a-cf280a.jpeg',
    sourceUrl: 'https://pro-laser.com/en/p/1740-hp-05a-ce505a-cf280a-compatible-toner-black.html'
  },
  {
    id: 'tn-ce255x', inventoryNumber: 13, name: 'Tóner compatible CE255X',
    reference: 'CE255X · 55X', color: 'Negro', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible negro de alta capacidad. Referencia suministrada: CE255X.',
    price: null, stock: 1, image: '/images/products/cliente/ce255x.jpeg',
    sourceUrl: 'https://compatiblesperu.com/producto/toner-hp-55x-ce255x/'
  },
  {
    id: 'tn-c531-cyan', inventoryNumber: 14, name: 'Tóner compatible cian',
    reference: 'CC531A / CE411A / CF381A', color: 'Cian', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible cian. Se muestran juntas las tres referencias entregadas por el cliente.',
    price: null, stock: 1, image: '/images/products/cliente/cc531a-ce411a-cf381a.jpeg',
    sourceUrl: 'https://colombiatoner.com/producto/cartucho-de-toner-color-cian-hp-laserjet-cc531a-304a-ce411a-305a-cf381a-312a-generico/'
  },
  {
    id: 'tn-c533-magenta', inventoryNumber: 15, name: 'Tóner compatible magenta',
    reference: 'CC533A / CE413A / CF383A', color: 'Magenta', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible magenta. Se muestran juntas las tres referencias entregadas por el cliente.',
    price: null, stock: 1, image: '/images/products/cc533a-magenta.jpg',
    sourceUrl: 'https://controlprint.com.mx/product/cartucho-de-toner-compatible-cc533a-ce413a-cf383a-magenta/'
  },
  {
    id: 'tn-c532-yellow', inventoryNumber: 16, name: 'Tóner compatible amarillo',
    reference: 'CC532A / CE412A / CF382A', color: 'Amarillo', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible amarillo. Se muestran juntas las tres referencias entregadas por el cliente.',
    price: null, stock: 1, image: '/images/products/cc532a-yellow.jpg',
    sourceUrl: 'https://www.alebo.ro/cartus-hp-cc532a-ce412a-cf382a-crg718'
  },
  {
    id: 'tn-c530-black', inventoryNumber: 17, name: 'Tóner compatible negro',
    reference: 'CC530A / CE410A / CF380A', color: 'Negro', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible negro. Se muestran juntas las tres referencias entregadas por el cliente.',
    price: null, stock: 1, image: '/images/products/cc530a-black.jpg',
    sourceUrl: 'https://controlprint.com.mx/product/cartucho-de-toner-generico-cc530a-ce410a-cf380a-negro/'
  },
  {
    id: 'tn-sp3710', inventoryNumber: 18, name: 'Tóner compatible Ricoh SP3710',
    reference: 'SP3710', color: 'Negro', brand: 'Ricoh', category: 'toner',
    description: 'Tóner compatible negro para la familia Ricoh SP3710. Referencia suministrada: SP3710.',
    price: null, stock: 1, image: '/images/products/cliente/sp3710.jpeg',
    sourceUrl: 'https://gruposuministros.co/toner-ricoh/433-toner-sp3710-ricoh-negro-para-impresoras-ricoh-sp3710-m320f-2143657890.html'
  },
  {
    id: 'tn-q2612a-universal', inventoryNumber: 19, name: 'Tóner compatible universal Q2612A',
    reference: 'Q2612A / FX9 / FX10 / CAN103 / 703 / 104 / 704', color: 'Negro', brand: 'HP / Canon compatible', category: 'toner',
    description: 'Tóner compatible universal negro para las referencias Q2612A, FX9, FX10, CAN103, 703, 104 y 704.',
    price: null, stock: 1, image: '/images/products/cliente/q2612a-universal.jpeg',
    sourceUrl: 'https://pro-laser.com/en/p/1014-hp-12a-q2612a-103-303-703-fx9-fx10-104-compatible-toners-black.html'
  },
  {
    id: 'tn-w1500a', inventoryNumber: 20, name: 'Tóner compatible HP 150A',
    reference: 'W1500A · 150A', color: 'Negro', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible negro. W1500A corresponde a la denominación comercial HP 150A.',
    price: null, stock: 1, image: '/images/products/cliente/w1500a.jpeg',
    sourceUrl: 'https://compatiblesperu.com/producto/toner-hp-150a-w1500a/'
  },
  {
    id: 'tn-w1105a', inventoryNumber: 21, name: 'Tóner compatible HP 105A',
    reference: 'W1105A · 105A', color: 'Negro', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible negro. W1105A corresponde a la denominación comercial HP 105A.',
    price: null, stock: 1, image: '/images/products/cliente/w1105a.jpeg',
    sourceUrl: 'https://compatiblesperu.com/producto/toner-compatible-hp-105a-w1105a/'
  },
  {
    id: 'tn-m111l', inventoryNumber: 22, name: 'Tóner compatible Samsung MLT-D111L',
    reference: 'MLT-D111L · 1.8K', color: 'Negro', brand: 'Samsung', category: 'toner',
    description: 'Tóner compatible negro; rendimiento indicado por el inventario: 1.800 páginas.',
    price: null, stock: 1, image: '/images/products/cliente/mlt-d111l.jpeg',
    sourceUrl: 'https://tonercompatibleperu.com/producto/toner-compatible-samsung-mlt-d111l/'
  },
  {
    id: 'tn-cb435a', inventoryNumber: 23, name: 'Tóner compatible universal HP',
    reference: 'CB435A / CB436A / CE285A', color: 'Negro', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible negro. Referencias suministradas: CB435A, CB436A y CE285A.',
    price: null, stock: 1, image: '/images/products/cliente/cb435-cb436-ce285a.jpeg',
    sourceUrl: 'https://todocomputadoras.com.do/product/toner-cb435a-cb436a-ce285a-premium/'
  }
];

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
  const [products, setProducts] = useState(loadInitialProducts);
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
