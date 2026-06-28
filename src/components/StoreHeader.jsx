import { Clock, MapPin, Menu, MessageCircle, Printer, ShoppingBag, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'testimonios', label: 'Opiniones' },
  { id: 'contacto', label: 'Contacto' }
];

export default function StoreHeader({
  scrolled,
  currentView,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  navigateTo,
  productCount
}) {
  const navigate = (event, section) => {
    event.preventDefault();
    navigateTo(section);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido</a>

      <div className="store-utility-bar">
        <div className="container">
          <span><MapPin size={13} aria-hidden="true" /> Bogotá · Carrera 10 # 21-06</span>
          <span><Clock size={13} aria-hidden="true" /> Lun–Vie 8:00–18:00 · Sáb 9:00–14:00</span>
          <a href="https://wa.me/573115174372" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={13} aria-hidden="true" /> Atención: 311 517 4372
          </a>
        </div>
      </div>

      <header className={`navbar marketplace-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#inicio" onClick={(event) => navigate(event, 'inicio')} className="logo" aria-label="Distoner, ir al inicio">
            <span className="logo-icon-wrap"><Printer size={20} aria-hidden="true" /></span>
            <span className="logo-text">
              <span className="brand">DISTONER</span>
              <span className="tagline">Tienda de suministros</span>
            </span>
          </a>

          <nav aria-label="Navegación principal">
            <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
              <li className="catalog-nav-item">
                <a
                  href="#productos"
                  onClick={(event) => navigate(event, 'productos')}
                  className={`catalog-nav-link ${currentView === 'productos' ? 'active' : ''}`}
                >
                  <ShoppingBag size={17} aria-hidden="true" />
                  Catálogo
                  <span>{productCount}</span>
                </a>
              </li>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => navigate(event, item.id)}
                    className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mobile-nav-quote">
                <a
                  href="https://wa.me/573115174372?text=Hola%20Distoner,%20quisiera%20cotizar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  Cotizar por WhatsApp
                </a>
              </li>
            </ul>
          </nav>

          <a
            href="https://wa.me/573115174372?text=Hola%20Distoner,%20quisiera%20cotizar"
            target="_blank"
            rel="noopener noreferrer"
            className="header-quote-button"
          >
            <MessageCircle size={17} aria-hidden="true" /> Cotizar
          </a>

          <button
            type="button"
            className="nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </header>
    </>
  );
}
