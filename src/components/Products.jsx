import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Send, Trash2, X, AlertCircle } from 'lucide-react';

// Product SVGs for high impact visuals with a sober corporate color palette
function ProductIllustration({ category, color }) {
  const strokeColor = color || 'var(--primary)';
  
  if (category === 'printer-toner') {
    return (
      <svg width="100%" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
        <rect x="25" y="45" width="70" height="32" rx="4" fill="var(--bg-panel)" stroke={strokeColor} strokeWidth="2.5"/>
        <rect x="15" y="53" width="10" height="16" rx="2" fill="var(--accent)"/>
        <rect x="95" y="53" width="10" height="16" rx="2" fill="var(--accent)"/>
        <line x1="35" y1="53" x2="85" y2="53" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
        <line x1="35" y1="60" x2="85" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
        <circle cx="60" cy="61" r="8" stroke={strokeColor} strokeWidth="2" fill="rgba(0,0,0,0.3)"/>
        <path d="M40 38H80M48 30H72" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  
  if (category === 'copier-toner') {
    return (
      <svg width="100%" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
        <path d="M40 30C40 25 45 20 50 20H70C75 20 80 25 80 30V40H40V30Z" fill="var(--bg-panel)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
        <rect x="35" y="40" width="50" height="60" rx="6" fill="var(--bg-panel)" stroke={strokeColor} strokeWidth="2.5"/>
        <line x1="35" y1="52" x2="85" y2="52" stroke="var(--primary)" strokeWidth="3"/>
        <line x1="45" y1="65" x2="75" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="2"/>
        <line x1="45" y1="72" x2="75" y2="72" stroke="rgba(255,255,255,0.15)" strokeWidth="2"/>
        <line x1="45" y1="79" x2="75" y2="79" stroke="rgba(255,255,255,0.15)" strokeWidth="2"/>
        <rect x="52" y="86" width="16" height="8" rx="1" fill={strokeColor} opacity="0.8"/>
      </svg>
    );
  }

  if (category === 'refill') {
    return (
      <svg width="100%" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
        <path d="M45 40H75V55L90 75V90H30V75L45 55V40Z" fill="var(--bg-panel)" stroke={strokeColor} strokeWidth="2.5"/>
        <path d="M50 20H70V40H50V20Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
        <circle cx="60" cy="75" r="10" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 3"/>
        <path d="M40 82C40 82 50 85 60 85C70 85 80 82 80 82" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
      </svg>
    );
  }
  
  if (category === 'parts') {
    return (
      <svg width="100%" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
        {/* OPC Cylinder */}
        <rect x="25" y="35" width="70" height="15" rx="7.5" fill="rgba(37, 99, 235, 0.1)" stroke="var(--primary)" strokeWidth="2.5"/>
        <line x1="30" y1="42.5" x2="90" y2="42.5" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5"/>
        {/* Microchip */}
        <rect x="40" y="65" width="40" height="30" rx="3" fill="var(--bg-panel)" stroke="var(--accent)" strokeWidth="2"/>
        <circle cx="60" cy="80" r="5" fill="var(--secondary)"/>
        <line x1="35" y1="72" x2="40" y2="72" stroke="var(--accent)" strokeWidth="2"/>
        <line x1="35" y1="80" x2="40" y2="80" stroke="var(--accent)" strokeWidth="2"/>
        <line x1="35" y1="88" x2="40" y2="88" stroke="var(--accent)" strokeWidth="2"/>
        <line x1="80" y1="72" x2="85" y2="72" stroke="var(--accent)" strokeWidth="2"/>
        <line x1="80" y1="80" x2="85" y2="80" stroke="var(--accent)" strokeWidth="2"/>
        <line x1="80" y1="88" x2="85" y2="88" stroke="var(--accent)" strokeWidth="2"/>
      </svg>
    );
  }

  return (
    <svg width="100%" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
      <rect x="30" y="30" width="60" height="60" rx="10" fill="var(--bg-panel)" stroke={strokeColor} strokeWidth="2"/>
      <circle cx="60" cy="60" r="15" stroke="var(--accent)" strokeWidth="2"/>
    </svg>
  );
}

export default function Products({ products = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('distoner_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart');
      }
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('distoner_cart', JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      const updated = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, change) => {
    const updated = cart.map(item => {
      if (item.id === productId) {
        const qty = item.quantity + change;
        return qty > 0 ? { ...item, quantity: qty } : null;
      }
      return item;
    }).filter(Boolean);
    saveCart(updated);
  };

  const removeFromCart = (productId) => {
    const updated = cart.filter(item => item.id !== productId);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return;

    let message = 'Hola Distoner, me gustaría solicitar una cotización por los siguientes productos:\n\n';
    let total = 0;

    cart.forEach(item => {
      message += `• ${item.name} (${item.quantity} und.) - $${(item.price * item.quantity).toLocaleString()} COP\n`;
      total += item.price * item.quantity;
    });

    message += `\n*Total Estimado:* $${total.toLocaleString()} COP\n\nQuedo atento a su respuesta para concretar la entrega.`;
    
    const recentSales = localStorage.getItem('distoner_sales');
    let sales = [];
    if (recentSales) {
      try { sales = JSON.parse(recentSales); } catch(e) {}
    }
    const newSale = {
      id: 'D-' + Math.floor(Math.random() * 9000 + 1000),
      client: 'Cotización Web (WhatsApp)',
      date: new Date().toISOString().split('T')[0],
      total: total,
      products: cart.map(item => `${item.name} (x${item.quantity})`).join(', '),
      status: 'Pendiente'
    };
    sales.unshift(newSale);
    localStorage.setItem('distoner_sales', JSON.stringify(sales));

    const whatsappUrl = `https://wa.me/573115174372?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    setIsCartOpen(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'printer-toner', label: 'Tóner Impresoras' },
    { id: 'copier-toner', label: 'Tóner Copiadoras' },
    { id: 'refill', label: 'Recargas' },
    { id: 'parts', label: 'Repuestos y Chips' }
  ];

  return (
    <section id="productos" style={{ padding: '100px 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <h2 className="section-title">Productos y Suministros</h2>
        <p className="section-desc">
          Contamos con tóners originales y compatibles de alto rendimiento, recargas de tóner con chip y repuestos específicos. Añade productos para cotizarlos directo por WhatsApp.
        </p>

        {/* Search and Filters Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '40px',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px'
          }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input
              type="text"
              placeholder="Buscar tóner, chips, repuestos..."
              className="form-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '48px',
                borderRadius: '30px'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  padding: '8px 20px',
                  fontSize: '14px',
                  borderRadius: '20px'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            border: '1px dashed var(--border-color)',
            borderRadius: '16px',
            color: 'var(--text-muted)'
          }}>
            <AlertCircle size={40} style={{ color: 'var(--accent)', marginBottom: '12px' }} />
            <p>No encontramos productos en esta categoría que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-4">
            {filteredProducts.map(product => {
              const isLowStock = product.stock <= 3;
              const hasNoStock = product.stock <= 0;
              
              const colorMap = {
                'printer-toner': 'var(--primary)',
                'copier-toner': 'var(--accent)',
                'refill': 'var(--secondary)',
                'parts': 'var(--text-white)'
              };
              const accentColor = colorMap[product.category] || 'var(--primary)';

              return (
                <div key={product.id} className="card" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  padding: '20px',
                  textAlign: 'left'
                }}>
                  <div>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: '8px',
                      padding: '10px',
                      marginBottom: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                      textAlign: 'center'
                    }}>
                      <ProductIllustration category={product.category} color={accentColor} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge" style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'rgba(255, 255, 255, 0.6)'
                      }}>
                        {categories.find(c => c.id === product.category)?.label}
                      </span>
                      {hasNoStock ? (
                        <span style={{ fontSize: '11px', color: 'var(--danger)', fontWeight: '600' }}>Sin stock</span>
                      ) : isLowStock ? (
                        <span style={{ fontSize: '11px', color: 'var(--warning)', fontWeight: '600' }}>¡Últimas unidades! ({product.stock})</span>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: '500' }}>Disponible ({product.stock})</span>
                      )}
                    </div>

                    <h3 style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      marginBottom: '8px',
                      lineHeight: '1.2',
                      color: 'var(--text-white)'
                    }}>
                      {product.name}
                    </h3>
                    
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--text-muted)',
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: '38px'
                    }}>
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '10px'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Precio unitario</span>
                        <span style={{ fontSize: '19px', fontWeight: '800', color: 'var(--primary)' }}>
                          ${product.price.toLocaleString()} <span style={{ fontSize: '10px', fontWeight: '500', color: 'rgba(255,255,255,0.5)' }}>COP</span>
                        </span>
                      </div>
                      
                      <button
                        onClick={() => addToCart(product)}
                        disabled={hasNoStock}
                        className="btn btn-primary"
                        style={{
                          padding: '10px',
                          borderRadius: '50%',
                          minWidth: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: hasNoStock ? '0.5' : '1',
                          cursor: hasNoStock ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: '105px',
            right: '30px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            color: 'white',
            border: 'none',
            outline: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)',
            cursor: 'pointer',
            zIndex: 999,
            transition: 'var(--transition)'
          }}
          className="cart-floating-btn"
        >
          <div style={{ position: 'relative' }}>
            <ShoppingCart size={24} />
            <span style={{
              position: 'absolute',
              top: '-12px',
              right: '-12px',
              background: 'var(--warning)',
              color: '#000',
              fontWeight: '800',
              fontSize: '11px',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-dark)'
            }}>
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
        </button>
      )}

      {/* Side Cart Drawer */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          background: 'var(--bg-panel)',
          borderLeft: '1px solid var(--border-color)',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
          zIndex: 1100,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '16px'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px' }}>
              <ShoppingCart size={22} style={{ color: 'var(--primary)' }} /> Mi Cotización
            </h3>
            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'var(--text-muted)',
              gap: '16px'
            }}>
              <ShoppingCart size={48} opacity="0.3" />
              <p>Tu cotización está vacía.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn btn-secondary"
                style={{ padding: '8px 20px', fontSize: '13px' }}
              >
                Volver al catálogo
              </button>
            </div>
          ) : (
            <>
              <div style={{
                flex: 1,
                overflowY: 'auto',
                paddingRight: '4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-color)',
                    padding: '12px',
                    borderRadius: '8px',
                    gap: '12px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-white)', marginBottom: '4px' }}>
                        {item.name}
                      </h4>
                      <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '700' }}>
                        ${(item.price * item.quantity).toLocaleString()} COP
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#fff',
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: '700', width: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#fff',
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(239, 68, 68, 0.7)',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '20px',
                marginTop: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Total Estimado:</span>
                  <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)' }}>
                    ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()} <span style={{ fontSize: '12px' }}>COP</span>
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={checkoutWhatsApp}
                    className="btn btn-whatsapp"
                    style={{ width: '100%', padding: '14px', borderRadius: '8px' }}
                  >
                    <Send size={18} /> Enviar Pedido a WhatsApp
                  </button>
                  <button
                    onClick={clearCart}
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '10px', fontSize: '13px', borderRadius: '8px' }}
                  >
                    Vaciar Lista
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
