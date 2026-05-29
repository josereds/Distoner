import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Package, AlertTriangle, Plus, Edit2, Trash2, 
  Check, X, LogOut, DollarSign, List, ShoppingBag 
} from 'lucide-react';

export default function AdminDashboard({ products, setProducts, onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('metrics'); // metrics, products, sales
  
  // CRUD states
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    category: 'printer-toner',
    price: '',
    stock: ''
  });

  // Sales state
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({ client: '', products: '', total: '', status: 'Completado' });

  // Load auth state and sales on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem('distoner_admin_auth') === 'true';
    setIsAuthenticated(isAuth);

    const savedSales = localStorage.getItem('distoner_sales');
    if (savedSales) {
      try {
        setSales(JSON.parse(savedSales));
      } catch (e) {
        console.error('Error parsing sales');
      }
    } else {
      // Mock initial sales
      const initialSales = [
        { id: 'D-9812', client: 'Carlos Mendoza', date: '2026-05-28', total: 130000, products: 'Tóner HP CF283A (x2)', status: 'Completado' },
        { id: 'D-4821', client: 'Sistemas Bogotá', date: '2026-05-27', total: 60000, products: 'Mantenimiento Preventivo (x1)', status: 'Completado' },
        { id: 'D-3810', client: 'Andrea Ruíz', date: '2026-05-25', total: 45000, products: 'Recarga de Tóner Color (x1)', status: 'Pendiente' }
      ];
      setSales(initialSales);
      localStorage.setItem('distoner_sales', JSON.stringify(initialSales));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'distoner2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('distoner_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta. Intenta nuevamente.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('distoner_admin_auth');
  };

  // Sync sales in state and storage
  const saveSales = (updatedSales) => {
    setSales(updatedSales);
    localStorage.setItem('distoner_sales', JSON.stringify(updatedSales));
  };

  // CRUD Actions
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      id: '',
      name: '',
      description: '',
      category: 'printer-toner',
      price: '',
      stock: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock
    });
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      const updated = products.filter(p => p.id !== productId);
      setProducts(updated);
      localStorage.setItem('distoner_products', JSON.stringify(updated));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const priceNum = parseFloat(formData.price) || 0;
    const stockNum = parseInt(formData.stock) || 0;

    if (editingProduct) {
      const updated = products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, name: formData.name, description: formData.description, category: formData.category, price: priceNum, stock: stockNum }
          : p
      );
      setProducts(updated);
      localStorage.setItem('distoner_products', JSON.stringify(updated));
    } else {
      const newProd = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: priceNum,
        stock: stockNum
      };
      const updated = [...products, newProd];
      setProducts(updated);
      localStorage.setItem('distoner_products', JSON.stringify(updated));
    }
    setIsFormOpen(false);
  };

  // Sales Actions
  const handleAddSaleSubmit = (e) => {
    e.preventDefault();
    const totalNum = parseFloat(newSale.total) || 0;
    const sale = {
      id: 'D-' + Math.floor(Math.random() * 9000 + 1000),
      client: newSale.client,
      date: new Date().toISOString().split('T')[0],
      total: totalNum,
      products: newSale.products,
      status: newSale.status
    };
    saveSales([sale, ...sales]);
    setNewSale({ client: '', products: '', total: '', status: 'Completado' });
  };

  const handleUpdateSaleStatus = (saleId, newStatus) => {
    const updated = sales.map(s => 
      s.id === saleId ? { ...s, status: newStatus } : s
    );
    saveSales(updated);
  };

  const handleDeleteSale = (saleId) => {
    if (window.confirm('¿Eliminar registro de venta?')) {
      const updated = sales.filter(s => s.id !== saleId);
      saveSales(updated);
    }
  };

  // Metrics calculations
  const totalRevenue = sales
    .filter(s => s.status === 'Completado')
    .reduce((sum, s) => sum + s.total, 0);

  const outOfStockCount = products.filter(p => p.stock === 0).length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 3).length;

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-dark)',
        padding: '24px'
      }}>
        <div className="card" style={{
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
          padding: '40px 32px'
        }}>
          <h2 style={{ fontSize: '28px', marginBottom: '8px', color: 'var(--text-white)' }}>Acceso Admin</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px' }}>
            Ingresa la clave de administrador para gestionar Distoner.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {loginError && (
              <p style={{ color: 'var(--danger)', fontSize: '13px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={14} /> {loginError}
              </p>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
              Iniciar Sesión
            </button>
          </form>

          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', marginTop: '30px' }}>
            Tip: La contraseña de demostración es <strong>distoner2026</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#090c15', minHeight: '90vh', padding: '40px 0' }}>
      <div className="container">
        
        {/* Admin Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '24px',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{ fontSize: '32px', color: 'var(--text-white)', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
              <Package style={{ color: 'var(--primary)' }} /> Panel de Administrador
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>Monitorea ventas e inventario en tiempo real.</p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => onNavigate('inicio')} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13.5px' }}>
              Ver Sitio Cliente
            </button>
            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13.5px', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
              <LogOut size={16} /> Salir
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '32px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: '12px',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => setActiveTab('metrics')} 
            className={`btn ${activeTab === 'metrics' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '14px' }}
          >
            <TrendingUp size={16} /> Resumen General
          </button>
          <button 
            onClick={() => setActiveTab('products')} 
            className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '14px' }}
          >
            <List size={16} /> Inventario de Productos ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('sales')} 
            className={`btn ${activeTab === 'sales' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '14px' }}
          >
            <ShoppingBag size={16} /> Historial de Ventas ({sales.length})
          </button>
        </div>

        {/* METRICS VIEW */}
        {activeTab === 'metrics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div className="grid grid-cols-4">
              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '16px', borderRadius: '12px' }}>
                  <DollarSign size={32} />
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ingresos Totales</h4>
                  <p style={{ fontSize: '24px', fontWeight: '800' }}>${totalRevenue.toLocaleString()} COP</p>
                </div>
              </div>

              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', padding: '16px', borderRadius: '12px' }}>
                  <Package size={32} />
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Productos</h4>
                  <p style={{ fontSize: '24px', fontWeight: '800' }}>{products.length} Items</p>
                </div>
              </div>

              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', borderColor: outOfStockCount > 0 ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-color)' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '16px', borderRadius: '12px' }}>
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Agotados (Stock 0)</h4>
                  <p style={{ fontSize: '24px', fontWeight: '800', color: outOfStockCount > 0 ? 'var(--danger)' : '#fff' }}>{outOfStockCount}</p>
                </div>
              </div>

              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', borderColor: lowStockCount > 0 ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-color)' }}>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', padding: '16px', borderRadius: '12px' }}>
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Bajos de Stock</h4>
                  <p style={{ fontSize: '24px', fontWeight: '800', color: lowStockCount > 0 ? 'var(--warning)' : '#fff' }}>{lowStockCount}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="card" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={18} style={{ color: 'var(--warning)' }} /> Alertas de Inventario Crítico
                </h3>
                
                {products.filter(p => p.stock <= 3).length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Todo tu inventario está en niveles óptimos.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {products.filter(p => p.stock <= 3).map(p => (
                      <div key={p.id} style={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        background: 'rgba(255,255,255,0.02)',
                        padding: '12px',
                        borderRadius: '8px',
                        borderLeft: `3px solid ${p.stock === 0 ? 'var(--danger)' : 'var(--warning)'}`
                      }}>
                        <div>
                          <p style={{ fontWeight: '700', fontSize: '14.5px', color: '#fff' }}>{p.name}</p>
                          <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Precio: ${p.price.toLocaleString()} COP</p>
                        </div>
                        <span className="badge" style={{
                          background: p.stock === 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: p.stock === 0 ? 'var(--danger)' : 'var(--warning)'
                        }}>
                          {p.stock === 0 ? 'Agotado' : `${p.stock} unidades`}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="card" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingBag size={18} style={{ color: 'var(--primary)' }} /> Ventas y Cotizaciones Recientes
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {sales.slice(0, 3).map(sale => (
                    <div key={sale.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(255,255,255,0.02)',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)'
                    }}>
                      <div>
                        <p style={{ fontWeight: '700', fontSize: '14.5px', color: '#fff' }}>{sale.client}</p>
                        <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '280px' }}>
                          {sale.products}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '15px' }}>${sale.total.toLocaleString()} COP</p>
                        <span className="badge" style={{
                          fontSize: '9px',
                          padding: '2px 6px',
                          background: sale.status === 'Completado' ? 'rgba(16, 185, 129, 0.1)' : sale.status === 'Pendiente' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                          color: sale.status === 'Completado' ? 'var(--success)' : sale.status === 'Pendiente' ? 'var(--warning)' : 'var(--text-muted)'
                        }}>
                          {sale.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS MANAGEMENT VIEW */}
        {activeTab === 'products' && (
          <div className="card" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', color: '#fff' }}>Inventario Activo</h3>
              <button onClick={handleOpenAdd} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13.5px' }}>
                <Plus size={16} /> Agregar Producto
              </button>
            </div>

            {isFormOpen && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.75)',
                zIndex: 1200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}>
                <div className="card" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-panel)', padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '22px' }}>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                    <button onClick={() => setIsFormOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Nombre del Producto</label>
                      <input
                        type="text"
                        className="form-input"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ej. Tóner HP 85A Compatible"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Categoría</label>
                      <select
                        className="form-input"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        style={{ background: 'var(--bg-input)' }}
                      >
                        <option value="printer-toner">Tóner Impresoras</option>
                        <option value="copier-toner">Tóner Copiadoras</option>
                        <option value="refill">Recarga de Tóner</option>
                        <option value="parts">Repuestos y Chips</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                      <div className="form-group">
                        <label className="form-label">Precio (COP)</label>
                        <input
                          type="number"
                          className="form-input"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="Ej. 65000"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Stock Inicial</label>
                        <input
                          type="number"
                          className="form-input"
                          required
                          value={formData.stock}
                          onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                          placeholder="Ej. 10"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-input"
                        rows="3"
                        required
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Detalles sobre compatibilidad, marcas y rendimiento..."
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                      <button type="button" onClick={() => setIsFormOpen(false)} className="btn btn-secondary" style={{ flex: 1, padding: '12px' }}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14.5px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 8px' }}>Producto</th>
                    <th style={{ padding: '12px 8px' }}>Categoría</th>
                    <th style={{ padding: '12px 8px' }}>Precio</th>
                    <th style={{ padding: '12px 8px' }}>Stock</th>
                    <th style={{ padding: '12px 8px', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', color: '#fff' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ padding: '16px 8px' }}>
                        <div style={{ fontWeight: '700' }}>{p.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px' }}>
                          {p.description}
                        </div>
                      </td>
                      <td style={{ padding: '16px 8px' }}>
                        <span className="badge" style={{
                          background: 'rgba(255,255,255,0.05)',
                          color: '#fff',
                          fontSize: '11px'
                        }}>
                          {p.category === 'printer-toner' ? 'Tóner Impresora' : p.category === 'copier-toner' ? 'Tóner Copiadora' : p.category === 'refill' ? 'Recarga' : 'Repuesto/Chip'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 8px', fontWeight: '600' }}>
                        ${p.price.toLocaleString()} COP
                      </td>
                      <td style={{ padding: '16px 8px' }}>
                        <span style={{
                          fontWeight: '700',
                          color: p.stock === 0 ? 'var(--danger)' : p.stock <= 3 ? 'var(--warning)' : 'var(--success)'
                        }}>
                          {p.stock}
                        </span>
                      </td>
                      <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button onClick={() => handleOpenEdit(p)} style={{
                            background: 'rgba(37, 99, 235, 0.1)',
                            border: '1px solid rgba(37, 99, 235, 0.2)',
                            color: 'var(--primary)',
                            padding: '6px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}>
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDeleteProduct(p.id)} style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            color: 'var(--danger)',
                            padding: '6px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SALES VIEW */}
        {activeTab === 'sales' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left' }}>
            
            <div className="card">
              <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '16px' }}>Registrar Nueva Venta Manual</h3>
              <form onSubmit={handleAddSaleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
                <div className="form-group" style={{ flex: 1, minWidth: '200px', marginBottom: 0 }}>
                  <label className="form-label">Cliente</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={newSale.client}
                    onChange={(e) => setNewSale(prev => ({ ...prev, client: e.target.value }))}
                    placeholder="Nombre del comprador"
                  />
                </div>
                <div className="form-group" style={{ flex: 2, minWidth: '250px', marginBottom: 0 }}>
                  <label className="form-label">Productos vendidos</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={newSale.products}
                    onChange={(e) => setNewSale(prev => ({ ...prev, products: e.target.value }))}
                    placeholder="Ej. 1x Tóner HP 85A, 1x Recarga"
                  />
                </div>
                <div className="form-group" style={{ flex: 1, minWidth: '120px', marginBottom: 0 }}>
                  <label className="form-label">Monto (COP)</label>
                  <input
                    type="number"
                    className="form-input"
                    required
                    value={newSale.total}
                    onChange={(e) => setNewSale(prev => ({ ...prev, total: e.target.value }))}
                    placeholder="Precio total"
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                  Añadir Registro
                </button>
              </form>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '16px' }}>Historial de Transacciones</h3>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14.5px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                      <th style={{ padding: '12px 8px' }}>Pedido</th>
                      <th style={{ padding: '12px 8px' }}>Cliente</th>
                      <th style={{ padding: '12px 8px' }}>Fecha</th>
                      <th style={{ padding: '12px 8px' }}>Detalles</th>
                      <th style={{ padding: '12px 8px' }}>Total</th>
                      <th style={{ padding: '12px 8px' }}>Estado</th>
                      <th style={{ padding: '12px 8px', textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map(s => (
                      <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '16px 8px', fontWeight: '700', color: 'var(--primary)' }}>{s.id}</td>
                        <td style={{ padding: '16px 8px', fontWeight: '600' }}>{s.client}</td>
                        <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>{s.date}</td>
                        <td style={{ padding: '16px 8px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {s.products}
                        </td>
                        <td style={{ padding: '16px 8px', fontWeight: '600' }}>${s.total.toLocaleString()} COP</td>
                        <td style={{ padding: '16px 8px' }}>
                          <span className="badge" style={{
                            background: s.status === 'Completado' ? 'rgba(16, 185, 129, 0.1)' : s.status === 'Pendiente' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: s.status === 'Completado' ? 'var(--success)' : s.status === 'Pendiente' ? 'var(--warning)' : 'var(--danger)',
                            fontSize: '11px'
                          }}>
                            {s.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            {s.status === 'Pendiente' && (
                              <button onClick={() => handleUpdateSaleStatus(s.id, 'Completado')} title="Marcar como Completado" style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                color: 'var(--success)',
                                padding: '6px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}>
                                <Check size={14} />
                              </button>
                            )}
                            <button onClick={() => handleDeleteSale(s.id)} title="Eliminar Registro" style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.2)',
                              color: 'var(--danger)',
                              padding: '6px',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
