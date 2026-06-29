import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  PackageCheck,
  Palette,
  ShieldCheck,
  ShoppingCart,
  Tags,
  X
} from 'lucide-react';

const CATEGORY_LABELS = {
  toner: 'Tóner compatible',
  'ink-cartridge': 'Cartucho de tinta',
  'ink-bottle': 'Botella de recarga'
};

export default function ProductDetailModal({
  product,
  relatedProducts,
  onClose,
  onSelectRelated,
  onAddToCart,
  isInCart
}) {
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);
  const modalBodyRef = useRef(null);

  // Photo 1 = caja enviada por el cliente; photo 2 (si existe) = producto físico.
  const gallery = [product.image, product.secondaryImage].filter(Boolean);
  const [activeImage, setActiveImage] = useState(0);

  // Reset gallery to the first image when the product changes (e.g. clicking a related
  // product) without an effect — React's recommended "adjust state during render" pattern.
  const [lastProductId, setLastProductId] = useState(product.id);
  if (product.id !== lastProductId) {
    setLastProductId(product.id);
    setActiveImage(0);
  }

  // Scroll to top when product changes
  useEffect(() => {
    if (modalRef.current) modalRef.current.scrollTop = 0;
    if (modalBodyRef.current) modalBodyRef.current.scrollTop = 0;
  }, [product.id]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const whatsappMessage = encodeURIComponent(
    `Hola Distoner, quisiera cotizar ${product.name}, referencia ${product.reference}.`
  );

  return (
    <div
      className="product-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={modalRef}
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        aria-describedby="product-modal-description"
      >
        {/* ── Mobile swipe handle ── */}
        <div className="modal-mobile-handle" aria-hidden="true">
          <span />
        </div>

        {/* ── Toolbar ── */}
        <div className="product-modal-toolbar">
          <button
            type="button"
            className="modal-back-button"
            onClick={onClose}
            aria-label="Volver al catálogo"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span>Catálogo</span>
          </button>
          <span className="product-modal-kicker">Ficha del producto</span>
          <button
            ref={closeButtonRef}
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Cerrar detalle del producto"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="product-modal-body" ref={modalBodyRef}>
          <div className="product-modal-layout">
            <div className="product-modal-media">
              <img
                src={gallery[activeImage] || product.image}
                alt={`${product.name}, referencia ${product.reference}`}
                width="720"
                height="720"
              />
              {gallery.length > 1 && (
                <div
                  role="group"
                  aria-label="Imágenes del producto"
                  style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}
                >
                  {gallery.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-pressed={index === activeImage}
                      aria-label={index === 0 ? 'Ver la caja' : 'Ver el producto físico'}
                      style={{
                        padding: 0,
                        width: '66px',
                        height: '66px',
                        flexShrink: 0,
                        cursor: 'pointer',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        background: '#fff',
                        border: index === activeImage ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        opacity: index === activeImage ? 1 : 0.7,
                        transition: 'var(--transition)'
                      }}
                    >
                      <img
                        src={src}
                        alt=""
                        width="64"
                        height="64"
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </button>
                  ))}
                </div>
              )}
              <span>Imagen de referencia; la presentación puede variar.</span>
            </div>

            <div className="product-modal-content">
              <div className="product-modal-status">
                <span><span className="stock-dot" /> {product.stock} unidad disponible</span>
                <span>N.º {product.inventoryNumber}</span>
              </div>

              <p className="product-modal-category">{CATEGORY_LABELS[product.category]}</p>
              <h2 id="product-modal-title">{product.name}</h2>
              <p className="product-modal-reference" translate="no">{product.reference}</p>
              <p id="product-modal-description" className="product-modal-description">
                {product.description}
              </p>

              <dl className="product-spec-grid">
                <div>
                  <dt><Tags size={16} aria-hidden="true" /> Marca o familia</dt>
                  <dd>{product.brand}</dd>
                </div>
                <div>
                  <dt><Palette size={16} aria-hidden="true" /> Color</dt>
                  <dd>{product.color}</dd>
                </div>
                <div>
                  <dt><PackageCheck size={16} aria-hidden="true" /> Disponibilidad</dt>
                  <dd>{product.stock === 1 ? 'Última unidad' : `${product.stock} unidades`}</dd>
                </div>
                <div>
                  <dt><ShieldCheck size={16} aria-hidden="true" /> Compra</dt>
                  <dd>Cotización directa</dd>
                </div>
              </dl>

              {/* Desktop-only actions (hidden on mobile where sticky footer is used) */}
              <div className="product-modal-actions product-modal-actions-desktop">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onAddToCart(product)}
                  disabled={isInCart || product.stock <= 0}
                >
                  <ShoppingCart size={18} aria-hidden="true" />
                  {isInCart ? 'Añadido a la cotización' : 'Agregar a la cotización'}
                </button>
                <a
                  className="btn btn-whatsapp"
                  href={`https://wa.me/573115174372?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={18} aria-hidden="true" /> Consultar por WhatsApp
                </a>
              </div>

              {product.sourceUrl && (
                <a
                  className="product-source-link"
                  href={product.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver fuente de referencia <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="related-products">
              <div className="related-products-heading">
                <div>
                  <span>Productos relacionados</span>
                  <h3>También podría interesarte</h3>
                </div>
                <p>Referencias de la misma categoría disponibles en tienda.</p>
              </div>

              <div className="related-products-grid">
                {relatedProducts.map((related) => (
                  <button
                    key={related.id}
                    type="button"
                    className="related-product-card"
                    onClick={() => onSelectRelated(related)}
                    aria-label={`Ver ${related.name}`}
                  >
                    <img
                      src={related.image}
                      alt=""
                      width="120"
                      height="120"
                      loading="lazy"
                    />
                    <span className="related-product-copy">
                      <strong>{related.name}</strong>
                      <small translate="no">{related.reference}</small>
                    </span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Mobile sticky bottom CTA ── */}
        <div className="product-modal-mobile-cta">
          <a
            className="btn btn-whatsapp"
            href={`https://wa.me/573115174372?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: 1 }}
          >
            <MessageCircle size={18} aria-hidden="true" /> WhatsApp
          </a>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onAddToCart(product)}
            disabled={isInCart || product.stock <= 0}
            style={{ flex: 1 }}
          >
            <ShoppingCart size={18} aria-hidden="true" />
            {isInCart ? 'Añadido' : 'Cotizar'}
          </button>
        </div>
      </section>
    </div>
  );
}
