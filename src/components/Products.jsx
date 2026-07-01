import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  CreditCard,
  Minus,
  PackageSearch,
  Plus,
  Search,
  Send,
  ShieldCheck,
  ShoppingCart,
  Store,
  Trash2,
  X
} from 'lucide-react';
import ProductDetailModal from './ProductDetailModal';

const CATEGORIES = [
  { id: 'all', label: 'Todo el catálogo' },
  { id: 'toner', label: 'Tóneres compatibles' },
  { id: 'ink-cartridge', label: 'Cartuchos de tinta' },
  { id: 'ink-bottle', label: 'Botellas de recarga' }
];

const CATEGORY_LABELS = {
  toner: 'Tóner compatible',
  'ink-cartridge': 'Cartucho de tinta',
  'ink-bottle': 'Botella de recarga'
};

const COLOR_HEX = {
  Cian: '#06b6d4',
  Magenta: '#db2777',
  Amarillo: '#eab308',
  Negro: '#334155'
};

function loadSavedCart() {
  const savedCart = localStorage.getItem('distoner_cart');
  if (!savedCart) return [];

  try {
    const parsed = JSON.parse(savedCart);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem('distoner_cart');
    return [];
  }
}

function productIdFromLocation() {
  if (!window.location.hash.startsWith('#producto=')) return null;
  return decodeURIComponent(window.location.hash.slice('#producto='.length));
}

function ProductImage({ product, compact = false }) {
  const [failedImage, setFailedImage] = useState(null);
  const hasFailed = failedImage === product.image;

  if (!product.image || hasFailed) {
    return (
      <div className={`market-product-fallback ${compact ? 'compact' : ''}`}>
        <PackageSearch size={compact ? 30 : 48} aria-hidden="true" />
        <strong translate="no">{product.reference}</strong>
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={compact ? '' : `${product.name}, referencia ${product.reference}`}
      width={compact ? 120 : 560}
      height={compact ? 120 : 420}
      loading="lazy"
      onError={() => setFailedImage(product.image)}
    />
  );
}

export default function Products({ products = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState(loadSavedCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedRecently, setAddedRecently] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(productIdFromLocation);

  useEffect(() => {
    const syncProductFromUrl = () => setSelectedProductId(productIdFromLocation());
    window.addEventListener('hashchange', syncProductFromUrl);
    window.addEventListener('popstate', syncProductFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncProductFromUrl);
      window.removeEventListener('popstate', syncProductFromUrl);
    };
  }, []);

  useEffect(() => {
    if (!isCartOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen]);

  const selectedProduct = products.find((product) => product.id === selectedProductId) || null;

  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    const sameCategory = products.filter(
      (product) => product.id !== selectedProduct.id && product.category === selectedProduct.category
    );
    const remaining = products.filter(
      (product) => product.id !== selectedProduct.id && product.category !== selectedProduct.category
    );
    return [...sameCategory, ...remaining].slice(0, 3);
  }, [products, selectedProduct]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('es');
    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        product.reference,
        product.brand,
        product.color
      ].filter(Boolean).join(' ').toLocaleLowerCase('es');
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('distoner_cart', JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (!existing) saveCart([...cart, { ...product, quantity: 1 }]);

    setAddedRecently(product.id);
    window.setTimeout(() => setAddedRecently(null), 1400);
  };

  const updateQuantity = (productId, change) => {
    const updated = cart.map((item) => {
      if (item.id !== productId) return item;
      const quantity = Math.min(item.quantity + change, item.stock);
      return quantity > 0 ? { ...item, quantity } : null;
    }).filter(Boolean);
    saveCart(updated);
  };

  const removeFromCart = (productId) => saveCart(cart.filter((item) => item.id !== productId));

  const openProduct = useCallback((product) => {
    window.history.pushState(null, '', `#producto=${encodeURIComponent(product.id)}`);
    setSelectedProductId(product.id);
  }, []);

  const closeProduct = useCallback(() => {
    window.history.replaceState(null, '', '#productos');
    setSelectedProductId(null);
  }, []);

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return;

    const lines = cart.map(
      (item) => `• ${item.name} · Ref. ${item.reference} (${item.quantity} und.)`
    );
    const message = [
      'Hola Distoner, quisiera solicitar una cotización para:',
      '',
      ...lines,
      '',
      'Por favor confirmar precios y disponibilidad. Gracias.'
    ].join('\n');

    const recentSales = localStorage.getItem('distoner_sales');
    let sales = [];
    if (recentSales) {
      try {
        sales = JSON.parse(recentSales);
      } catch {
        sales = [];
      }
    }

    sales.unshift({
      id: `D-${Math.floor(Math.random() * 9000 + 1000)}`,
      client: 'Cotización Web (WhatsApp)',
      date: new Date().toISOString().split('T')[0],
      total: 0,
      products: cart.map((item) => `${item.name} (x${item.quantity})`).join(', '),
      status: 'Pendiente'
    });
    localStorage.setItem('distoner_sales', JSON.stringify(sales));

    window.open(`https://wa.me/573115174372?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    saveCart([]);
    setIsCartOpen(false);
  };

  return (
    <section id="productos" className="catalog-section" aria-labelledby="catalog-title">
      <div className="container">
        <div className="catalog-hero">
          <div className="catalog-heading">
            <span className="catalog-kicker"><Store size={15} aria-hidden="true" /> Tienda Distoner</span>
            <h2 id="catalog-title">Encuentre la referencia exacta para su impresora</h2>
            <p>
              Catálogo actualizado con {products.length} productos disponibles. Compare referencias, revise cada ficha y solicite su cotización directamente.
            </p>
          </div>

          <div className="catalog-facts" aria-label="Resumen del catálogo">
            <div><strong>{products.length}</strong><span>referencias</span></div>
            <div><strong>3</strong><span>categorías</span></div>
            <div><strong>&lt; 2 h</strong><span>respuesta</span></div>
          </div>
        </div>

        <div className="catalog-marketplace">
          <div className="catalog-toolbar">
            <div className="catalog-search-wrap">
              <label className="sr-only" htmlFor="catalog-search">Buscar en el catálogo</label>
              <Search size={19} aria-hidden="true" />
              <input
                id="catalog-search"
                name="catalog-search"
                type="search"
                autoComplete="off"
                placeholder="Buscar por modelo, referencia o color…"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="catalog-result-count" aria-live="polite">
              <strong>{filteredProducts.length}</strong> resultados
            </div>
          </div>

          <div className="catalog-category-tabs" aria-label="Filtrar productos por categoría">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                className={selectedCategory === category.id ? 'active' : ''}
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={selectedCategory === category.id}
              >
                {category.label}
                <span>
                  {category.id === 'all'
                    ? products.length
                    : products.filter((product) => product.category === category.id).length}
                </span>
              </button>
            ))}
          </div>

          <div className="sr-only" aria-live="polite">
            {addedRecently
              ? `${products.find((product) => product.id === addedRecently)?.name} añadido a la cotización.`
              : ''}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="catalog-empty-state">
              <AlertCircle size={44} aria-hidden="true" />
              <h3>No encontramos esa referencia</h3>
              <p>Revise la escritura o explore otra categoría.</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Ver todo el catálogo
              </button>
            </div>
          ) : (
            <div className="market-product-grid">
              {filteredProducts.map((product) => {
                const isInCart = cart.some((item) => item.id === product.id);
                const justAdded = addedRecently === product.id;
                return (
                  <article key={product.id} className="market-product-card">
                    <button
                      type="button"
                      className="market-product-open"
                      onClick={() => openProduct(product)}
                      aria-label={`Ver detalles de ${product.name}`}
                    >
                      <div className="market-product-media">
                        <ProductImage product={product} />
                        <span className="market-stock-badge"><span className="stock-dot" /> Disponible</span>
                        <span className="market-item-number">N.º {product.inventoryNumber}</span>
                      </div>

                      <div className="market-product-body">
                        <div className="market-product-meta">
                          <span>{CATEGORY_LABELS[product.category]}</span>
                          <span className="market-color">
                            <i style={{ backgroundColor: COLOR_HEX[product.color] || '#64748b' }} />
                            {product.color}
                          </span>
                        </div>
                        <h3>{product.name}</h3>
                        <p className="market-reference" translate="no">{product.reference}</p>
                        <p style={{
                          fontSize: '10.5px',
                          color: 'var(--text-muted)',
                          opacity: 0.7,
                          fontStyle: 'italic',
                          margin: '4px 0 0'
                        }}>* Imagen meramente ilustrativa</p>
                        <span className="market-view-link">Ver producto <ArrowRight size={15} aria-hidden="true" /></span>
                      </div>
                    </button>

                    <div className="market-product-footer">
                      <div>
                        <span>Precio</span>
                        <strong>Por confirmar</strong>
                      </div>
                      <button
                        type="button"
                        className={isInCart || justAdded ? 'market-add-button added' : 'market-add-button'}
                        onClick={() => addToCart(product)}
                        disabled={isInCart || product.stock <= 0}
                        aria-label={isInCart ? `${product.name} ya está en la cotización` : `Agregar ${product.name} a la cotización`}
                      >
                        {isInCart || justAdded ? <CheckCircle size={19} aria-hidden="true" /> : <Plus size={21} aria-hidden="true" />}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {cart.length > 0 && (
        <button
          type="button"
          className="floating-cart-button"
          onClick={() => setIsCartOpen(true)}
          aria-label={`Abrir cotización con ${cart.length} productos`}
        >
          <ShoppingCart size={23} aria-hidden="true" />
          <span>{cart.length}</span>
        </button>
      )}

      {isCartOpen && (
        <>
          <button
            type="button"
            className="cart-overlay"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar cotización"
          />
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="cart-drawer-header">
              <div>
                <span>Solicitud de compra</span>
                <h2 id="cart-title">Su cotización</h2>
              </div>
              <button type="button" className="icon-button" onClick={() => setIsCartOpen(false)} aria-label="Cerrar cotización">
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="cart-drawer-items">
              {cart.map((item) => (
                <article key={item.id} className="cart-line-item">
                  <ProductImage product={item} compact />
                  <div className="cart-line-copy">
                    <strong>{item.name}</strong>
                    <span translate="no">{item.reference}</span>
                    <small>Precio por confirmar</small>
                  </div>
                  <div className="cart-line-actions">
                    <div className="quantity-control" aria-label={`Cantidad de ${item.name}`}>
                      <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Quitar ${item.name}`}>
                        <Minus size={13} aria-hidden="true" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        disabled={item.quantity >= item.stock}
                        aria-label={`Agregar otra unidad de ${item.name}`}
                      >
                        <Plus size={13} aria-hidden="true" />
                      </button>
                    </div>
                    <button type="button" className="remove-cart-item" onClick={() => removeFromCart(item.id)} aria-label={`Eliminar ${item.name}`}>
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-trust-row">
              <span><ShieldCheck size={15} aria-hidden="true" /> Garantía</span>
              <span><Clock size={15} aria-hidden="true" /> Respuesta &lt; 2 h</span>
              <span><CreditCard size={15} aria-hidden="true" /> Pago acordado</span>
            </div>

            <div className="cart-drawer-footer">
              <p><span>Precio final</span><strong>Por confirmar</strong></p>
              <button type="button" className="btn btn-whatsapp" onClick={checkoutWhatsApp}>
                <Send size={18} aria-hidden="true" /> Solicitar cotización por WhatsApp
              </button>
              <button type="button" className="cart-clear-button" onClick={() => saveCart([])}>Vaciar cotización</button>
            </div>
          </aside>
        </>
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          relatedProducts={relatedProducts}
          onClose={closeProduct}
          onSelectRelated={openProduct}
          onAddToCart={addToCart}
          isInCart={cart.some((item) => item.id === selectedProduct.id)}
        />
      )}
    </section>
  );
}
