import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import AdminDashboard from './components/AdminDashboard';
import { 
  Printer, Phone, Mail, MapPin, Settings, Shield, 
  Menu, X, ChevronUp, MessageCircle 
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'Tóner HP CF283A (83A) Compatible',
    description: 'Cartucho de tóner de alta densidad compatible con impresoras HP LaserJet Pro M127fn, M127fw, M201dw, M225dn. Rendimiento de 1,500 páginas.',
    category: 'printer-toner',
    price: 65000,
    stock: 12
  },
  {
    id: 'p2',
    name: 'Tóner Samsung MLT-D111S Compatible',
    description: 'Tóner compatible de alta calidad para impresoras Samsung Xpress M2020, M2020W, M2022, M2070, M2070W. Excelente nitidez en texto.',
    category: 'printer-toner',
    price: 72000,
    stock: 8
  },
  {
    id: 'p3',
    name: 'Tóner Ricoh MP 301 SPF Original',
    description: 'Cartucho de tóner negro original de alto rendimiento para fotocopiadoras Ricoh Aficio MP 301. Rendimiento aproximado de 8,000 páginas.',
    category: 'copier-toner',
    price: 125000,
    stock: 4
  },
  {
    id: 'p4',
    name: 'Tóner Konica Minolta TN-324 Negro',
    description: 'Tóner negro compatible de gran capacidad para fotocopiadoras Konica Minolta bizhub C258, C308, C368. Rendimiento de 28,000 páginas.',
    category: 'copier-toner',
    price: 195000,
    stock: 3
  },
  {
    id: 'p5',
    name: 'Recarga de Tóner Láser Monocromático',
    description: 'Servicio de recarga física de tóner negro estándar con polvo químico premium y cambio de chip inteligente de última generación.',
    category: 'refill',
    price: 35000,
    stock: 50
  },
  {
    id: 'p6',
    name: 'Recarga de Tóner Láser Color (HP/Canon)',
    description: 'Recarga premium de tóner a color. Incluye aspirado, limpieza de rodillo magnético, carga de polvo de alta densidad y chip nuevo.',
    category: 'refill',
    price: 48000,
    stock: 30
  },
  {
    id: 'p7',
    name: 'Cilindro Fotorreceptor OPC HP 85A/12A',
    description: 'Cilindro de tambor de alta duración (OPC Drum) compatible con cartuchos de tóner HP 85A, 35A, 36A, 78A y 12A.',
    category: 'parts',
    price: 22000,
    stock: 15
  },
  {
    id: 'p8',
    name: 'Chip de Tóner HP CF258A (con sensor)',
    description: 'Chip actualizado compatible con cartuchos HP 58A sin error de firmware. Monitorea el nivel exacto de polvo en la impresora.',
    category: 'parts',
    price: 18000,
    stock: 10
  },
  {
    id: 'p9',
    name: 'Hojas de Acetato A4 para Impresión (Paquete x100)',
    description: 'Hojas de acetato termorresistentes de formato A4 para impresoras láser o fotocopiadoras. Excelente fijación de tóner.',
    category: 'parts',
    price: 55000,
    stock: 25
  }
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentView, setCurrentView] = useState('inicio'); // inicio, servicios, productos, contacto, admin
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize and load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('distoner_products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        setProducts(INITIAL_PRODUCTS);
        localStorage.setItem('distoner_products', JSON.stringify(INITIAL_PRODUCTS));
      }
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('distoner_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    // Scroll listener
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to sections for customer page if we're not inside the admin panel
    if (view !== 'admin') {
      const element = document.getElementById(view);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView('inicio');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Navigation Header */}
      <header className="navbar">
        <div className="container nav-container">
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('inicio'); }} className="logo">
            <Printer size={28} style={{ color: 'var(--primary)' }} />
            <span>DISTONER</span>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav>
            <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
              <li>
                <a 
                  onClick={() => navigateTo('inicio')} 
                  className={`nav-link ${currentView === 'inicio' ? 'active' : ''}`}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a 
                  onClick={() => navigateTo('servicios')} 
                  className={`nav-link ${currentView === 'servicios' ? 'active' : ''}`}
                >
                  Servicios
                </a>
              </li>
              <li>
                <a 
                  onClick={() => navigateTo('productos')} 
                  className={`nav-link ${currentView === 'productos' ? 'active' : ''}`}
                >
                  Productos
                </a>
              </li>
              <li>
                <a 
                  onClick={() => navigateTo('testimonios')} 
                  className={`nav-link ${currentView === 'testimonios' ? 'active' : ''}`}
                >
                  Testimonios
                </a>
              </li>
              <li>
                <a 
                  onClick={() => navigateTo('contacto')} 
                  className={`nav-link ${currentView === 'contacto' ? 'active' : ''}`}
                >
                  Contacto
                </a>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('admin')} 
                  className="btn btn-secondary"
                  style={{
                    padding: '8px 16px',
                    fontSize: '13.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: currentView === 'admin' ? '1px solid var(--cyan)' : '1px solid var(--border-color)',
                    color: currentView === 'admin' ? 'var(--cyan)' : '#fff'
                  }}
                >
                  <Shield size={14} /> Panel Admin
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="nav-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentView === 'admin' ? (
          <AdminDashboard 
            products={products} 
            setProducts={setProducts} 
            onNavigate={navigateTo} 
          />
        ) : (
          <>
            {/* Customer Landing Page Sections */}
            <Hero onNavigate={navigateTo} />
            <Services />
            <Products products={products} />
            <Testimonials />
            <Contact />
          </>
        )}
      </main>

      {/* Footer Area */}
      <footer style={{
        background: '#040507',
        borderTop: '1px solid var(--border-color)',
        padding: '60px 0 30px 0',
        color: 'var(--text-muted)',
        fontSize: '14.5px'
      }}>
        <div className="container">
          <div className="grid grid-cols-3" style={{ marginBottom: '40px' }}>
            {/* Branding Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="logo" style={{ fontSize: '22px' }}>
                <Printer size={24} style={{ color: 'var(--primary)' }} />
                <span>DISTONER</span>
              </a>
              <p style={{ maxWidth: '300px' }}>
                Tóner para impresoras, fotocopiadoras, recargas garantizadas y soporte técnico experto en la ciudad de Bogotá.
              </p>
            </div>

            {/* Quick Links Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Enlaces Rápidos</h4>
              <a onClick={() => navigateTo('inicio')} style={{ cursor: 'pointer', transition: 'var(--transition)' }} className="nav-link">Inicio / Video</a>
              <a onClick={() => navigateTo('servicios')} style={{ cursor: 'pointer', transition: 'var(--transition)' }} className="nav-link">Servicios de Soporte</a>
              <a onClick={() => navigateTo('productos')} style={{ cursor: 'pointer', transition: 'var(--transition)' }} className="nav-link">Catálogo de Productos</a>
              <a onClick={() => navigateTo('contacto')} style={{ cursor: 'pointer', transition: 'var(--transition)' }} className="nav-link">Contacto y Mapa</a>
            </div>

            {/* Direct Info Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Punto de Venta</h4>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} style={{ color: 'var(--warning)' }} /> Carrera 10 # 21-06 Local 270, 269</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} style={{ color: 'var(--primary)' }} /> 311 517 4372</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} style={{ color: 'var(--accent)' }} /> distoner71@gmail.com</p>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <p>© {new Date().getFullYear()} Distoner Suministros. Todos los derechos reservados.</p>
            <p style={{ display: 'flex', gap: '16px' }}>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>Bogotá, Colombia</span>
              <a onClick={() => navigateTo('admin')} style={{ cursor: 'pointer', color: 'var(--primary)', textDecoration: 'none' }}>Acceso Administrativo</a>
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
      >
        <MessageCircle size={30} />
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '30px',
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            color: 'var(--primary)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            zIndex: 1000,
            transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.boxShadow = 'var(--shadow-neon-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
          }}
        >
          <ChevronUp size={24} />
        </button>
      )}

    </div>
  );
}
