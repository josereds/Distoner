import { useState, useEffect, useCallback } from 'react';
import {
  TrendingUp, Package, AlertTriangle, Plus, Edit2, Trash2,
  Check, X, LogOut, DollarSign, List, ShoppingBag, Upload, Eye, EyeOff
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import {
  fetchAllProducts, saveProduct, deleteProduct as deleteProductDb, uploadProductImage
} from '../data/productsRepo';

const CATEGORY_LABELS = {
  toner: 'Tóner compatible',
  'ink-cartridge': 'Cartucho de tinta',
  'ink-bottle': 'Botella de recarga'
};

const formatProductPrice = (price) =>
  Number.isFinite(price) && price > 0 ? `$${price.toLocaleString()} COP` : 'Por confirmar';

const EMPTY_FORM = {
  id: '', name: '', reference: '', color: '', brand: '',
  category: 'toner', description: '', price: '', stock: '',
  image: '', secondaryImage: '', visible: true
};

const INITIAL_SALES = [
  { id: 'D-9812', client: 'Carlos Mendoza', date: '2026-05-28', total: 130000, products: 'Tóner HP CF283A (x2)', status: 'Completado' },
  { id: 'D-4821', client: 'Sistemas Bogotá', date: '2026-05-27', total: 60000, products: 'Mantenimiento Preventivo (x1)', status: 'Completado' },
  { id: 'D-3810', client: 'Andrea Ruíz', date: '2026-05-25', total: 45000, products: 'Recarga de Tóner Color (x1)', status: 'Pendiente' }
];

function loadSales() {
  const savedSales = localStorage.getItem('distoner_sales');
  if (savedSales) {
    try {
      const parsed = JSON.parse(savedSales);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Invalid browser data is replaced below.
    }
  }
  localStorage.setItem('distoner_sales', JSON.stringify(INITIAL_SALES));
  return INITIAL_SALES;
}

export default function AdminDashboard({ products, setProducts, onNavigate }) {
  // ── Autenticación ──────────────────────────────────────────────────────────
  // Con Supabase: sesión real (Supabase Auth). Sin Supabase: contraseña local (legado).
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured);
  const [legacyAuth, setLegacyAuth] = useState(
    () => sessionStorage.getItem('distoner_admin_auth') === 'true'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const isAuthenticated = isSupabaseConfigured ? Boolean(session) : legacyAuth;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (isSupabaseConfigured) {
      setLoggingIn(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoggingIn(false);
      if (error) setLoginError('Credenciales incorrectas. Verifica el correo y la contraseña.');
    } else if (password === 'distoner2026') {
      setLegacyAuth(true);
      sessionStorage.setItem('distoner_admin_auth', 'true');
    } else {
      setLoginError('Contraseña incorrecta. Intenta nuevamente.');
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    } else {
      setLegacyAuth(false);
      sessionStorage.removeItem('distoner_admin_auth');
    }
  };

  // ── Estado del panel ────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('metrics');
  const [adminProducts, setAdminProducts] = useState(products);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(null); // 'image' | 'secondaryImage' | null
  const [saving, setSaving] = useState(false);

  const [sales, setSales] = useState(loadSales);
  const [newSale, setNewSale] = useState({ client: '', products: '', total: '', status: 'Completado' });

  // Carga el catálogo completo (incluye ocultos) desde Supabase para el panel.
  const refreshProducts = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setLoadingProducts(true);
    try {
      const list = await fetchAllProducts();
      setAdminProducts(list);
      // Mantiene el catálogo público en sincronía (solo visibles).
      setProducts(list.filter((p) => p.visible !== false));
    } catch (err) {
      console.error('Error cargando productos:', err);
    } finally {
      setLoadingProducts(false);
    }
  }, [setProducts]);

  // Carga inicial del catálogo completo al iniciar sesión (setState tras await, no síncrono).
  useEffect(() => {
    if (!isSupabaseConfigured || !isAuthenticated) return undefined;
    let active = true;
    fetchAllProducts()
      .then((list) => {
        if (!active) return;
        setAdminProducts(list);
        setProducts(list.filter((p) => p.visible !== false));
      })
      .catch((err) => console.error('Error cargando productos:', err));
    return () => {
      active = false;
    };
  }, [isAuthenticated, setProducts]);

  // Lista que se muestra en el panel: la de la BD si hay Supabase, si no la de props.
  const displayProducts = isSupabaseConfigured ? adminProducts : products;

  // ── CRUD de productos ─────────────────────────────────────────────────────
  const saveSales = (updatedSales) => {
    setSales(updatedSales);
    localStorage.setItem('distoner_sales', JSON.stringify(updatedSales));
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(EMPTY_FORM);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name || '',
      reference: product.reference || '',
      color: product.color || '',
      brand: product.brand || '',
      category: product.category || 'toner',
      description: product.description || '',
      price: product.price ?? '',
      stock: product.stock ?? '',
      image: product.image || '',
      secondaryImage: product.secondaryImage || '',
      visible: product.visible !== false
    });
    setIsFormOpen(true);
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isSupabaseConfigured) {
      alert('La subida de imágenes requiere la conexión a Supabase.');
      return;
    }
    setUploading(field);
    try {
      const url = await uploadProductImage(file, formData.id || 'nuevo');
      setFormData((prev) => ({ ...prev, [field]: url }));
    } catch (err) {
      alert('No se pudo subir la imagen: ' + err.message);
    } finally {
      setUploading(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const parsedPrice = parseFloat(formData.price);
    const priceNum = Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : null;
    const stockNum = parseInt(formData.stock, 10) || 0;

    if (!isSupabaseConfigured) {
      // Modo legado (localStorage) — mantiene compatibilidad si no hay backend.
      const base = {
        name: formData.name, reference: formData.reference, color: formData.color,
        brand: formData.brand, category: formData.category, description: formData.description,
        price: priceNum, stock: stockNum, image: formData.image,
        secondaryImage: formData.secondaryImage || undefined, visible: formData.visible
      };
      let updated;
      if (editingProduct) {
        updated = products.map((p) => (p.id === editingProduct.id ? { ...p, ...base } : p));
      } else {
        updated = [...products, { ...base, id: Date.now().toString() }];
      }
      setProducts(updated);
      localStorage.setItem('distoner_products', JSON.stringify(updated));
      setIsFormOpen(false);
      return;
    }

    setSaving(true);
    try {
      const product = {
        id: editingProduct ? editingProduct.id : `p-${Date.now()}`,
        inventoryNumber: editingProduct?.inventoryNumber ?? adminProducts.length + 1,
        name: formData.name,
        reference: formData.reference,
        color: formData.color,
        brand: formData.brand,
        category: formData.category,
        description: formData.description,
        price: priceNum,
        stock: stockNum,
        image: formData.image,
        secondaryImage: formData.secondaryImage || null,
        sourceUrl: editingProduct?.sourceUrl ?? null,
        visible: formData.visible,
        sortOrder: editingProduct?.sortOrder ?? adminProducts.length + 1
      };
      await saveProduct(product);
      await refreshProducts();
      setIsFormOpen(false);
    } catch (err) {
      alert('No se pudo guardar el producto: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;
    if (!isSupabaseConfigured) {
      const updated = products.filter((p) => p.id !== productId);
      setProducts(updated);
      localStorage.setItem('distoner_products', JSON.stringify(updated));
      return;
    }
    try {
      await deleteProductDb(productId);
      await refreshProducts();
    } catch (err) {
      alert('No se pudo eliminar el producto: ' + err.message);
    }
  };

  const handleToggleVisible = async (product) => {
    if (!isSupabaseConfigured) return;
    try {
      await saveProduct({ ...product, visible: !(product.visible !== false) });
      await refreshProducts();
    } catch (err) {
      alert('No se pudo cambiar la visibilidad: ' + err.message);
    }
  };

  // ── Ventas (demo, localStorage) ──────────────────────────────────────────────
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
    saveSales(sales.map((s) => (s.id === saleId ? { ...s, status: newStatus } : s)));
  };

  const handleDeleteSale = (saleId) => {
    if (window.confirm('¿Eliminar registro de venta?')) {
      saveSales(sales.filter((s) => s.id !== saleId));
    }
  };

  // ── Métricas ─────────────────────────────────────────────────────────────
  const totalRevenue = sales
    .filter((s) => s.status === 'Completado')
    .reduce((sum, s) => sum + s.total, 0);
  const outOfStockCount = displayProducts.filter((p) => p.stock === 0).length;
  const lowStockCount = displayProducts.filter((p) => p.stock > 0 && p.stock <= 3).length;

  // ── Pantalla de login ────────────────────────────────────────────────────
  if (!authReady) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        Cargando…
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-dark)', padding: '24px'
      }}>
        <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center', padding: '40px 32px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '8px', color: 'var(--text-white)' }}>Acceso Admin</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px' }}>
            Ingresa tus credenciales para gestionar Distoner.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {isSupabaseConfigured && (
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="admin@distoner.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="form-group" style={{ textAlign: 'left' }}>
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

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }} disabled={loggingIn}>
              {loggingIn ? 'Ingresando…' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#090c15', minHeight: '90vh', padding: '40px 0' }}>
      <div className="container">

        {/* Admin Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid var(--border-color)', paddingBottom: '24px',
          marginBottom: '32px', flexWrap: 'wrap', gap: '16px'
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
          display: 'flex', gap: '12px', marginBottom: '32px',
          borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', flexWrap: 'wrap'
        }}>
          <button onClick={() => setActiveTab('metrics')} className={`btn ${activeTab === 'metrics' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '14px' }}>
            <TrendingUp size={16} /> Resumen General
          </button>
          <button onClick={() => setActiveTab('products')} className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '14px' }}>
            <List size={16} /> Inventario de Productos ({displayProducts.length})
          </button>
          <button onClick={() => setActiveTab('sales')} className={`btn ${activeTab === 'sales' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '14px' }}>
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
                  <p style={{ fontSize: '24px', fontWeight: '800' }}>{displayProducts.length} Items</p>
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
          </div>
        )}

        {/* PRODUCTS MANAGEMENT VIEW */}
        {activeTab === 'products' && (
          <div className="card" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', color: '#fff' }}>
                Inventario Activo {loadingProducts && <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>· cargando…</span>}
              </h3>
              <button onClick={handleOpenAdd} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13.5px' }}>
                <Plus size={16} /> Agregar Producto
              </button>
            </div>

            {isFormOpen && (
              <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                background: 'rgba(0,0,0,0.75)', zIndex: 1200, display: 'flex',
                alignItems: 'center', justifyContent: 'center', padding: '20px'
              }}>
                <div className="card" style={{ width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-panel)', padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '22px' }}>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                    <button onClick={() => setIsFormOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Nombre del Producto</label>
                      <input type="text" className="form-input" required value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Ej. Tóner HP 85A Compatible" />
                    </div>

                    <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                      <div className="form-group">
                        <label className="form-label">Referencia</label>
                        <input type="text" className="form-input" value={formData.reference}
                          onChange={(e) => setFormData((p) => ({ ...p, reference: e.target.value }))}
                          placeholder="Ej. CE285A" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Color</label>
                        <input type="text" className="form-input" value={formData.color}
                          onChange={(e) => setFormData((p) => ({ ...p, color: e.target.value }))}
                          placeholder="Ej. Negro" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                      <div className="form-group">
                        <label className="form-label">Marca o familia</label>
                        <input type="text" className="form-input" value={formData.brand}
                          onChange={(e) => setFormData((p) => ({ ...p, brand: e.target.value }))}
                          placeholder="Ej. HP compatible" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Categoría</label>
                        <select className="form-input" value={formData.category}
                          onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                          style={{ background: 'var(--bg-input)' }}>
                          <option value="toner">Tóner compatible</option>
                          <option value="ink-cartridge">Cartucho de tinta</option>
                          <option value="ink-bottle">Botella de recarga</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                      <div className="form-group">
                        <label className="form-label">Precio (COP, opcional)</label>
                        <input type="number" className="form-input" value={formData.price}
                          onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
                          placeholder="Ej. 65000" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Stock</label>
                        <input type="number" className="form-input" required value={formData.stock}
                          onChange={(e) => setFormData((p) => ({ ...p, stock: e.target.value }))}
                          placeholder="Ej. 10" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Descripción</label>
                      <textarea className="form-input" rows="3" value={formData.description}
                        onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                        placeholder="Detalles sobre compatibilidad, marcas y rendimiento..." />
                    </div>

                    {/* Imágenes */}
                    <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                      <ImageField
                        label="Foto 1 (caja)"
                        value={formData.image}
                        uploading={uploading === 'image'}
                        onUpload={(e) => handleImageUpload(e, 'image')}
                        onClear={() => setFormData((p) => ({ ...p, image: '' }))}
                      />
                      <ImageField
                        label="Foto 2 (producto físico)"
                        value={formData.secondaryImage}
                        uploading={uploading === 'secondaryImage'}
                        onUpload={(e) => handleImageUpload(e, 'secondaryImage')}
                        onClear={() => setFormData((p) => ({ ...p, secondaryImage: '' }))}
                      />
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-white)', fontSize: '14px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={formData.visible}
                        onChange={(e) => setFormData((p) => ({ ...p, visible: e.target.checked }))} />
                      Visible en la tienda
                    </label>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                      <button type="button" onClick={() => setIsFormOpen(false)} className="btn btn-secondary" style={{ flex: 1, padding: '12px' }}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '12px' }} disabled={saving || Boolean(uploading)}>
                        {saving ? 'Guardando…' : 'Guardar Cambios'}
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
                  {displayProducts.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', color: '#fff', opacity: p.visible === false ? 0.5 : 1 }}>
                      <td style={{ padding: '16px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {p.image && <img src={p.image} alt="" width="40" height="40" style={{ borderRadius: '6px', objectFit: 'contain', background: '#fff' }} />}
                          <div>
                            <div style={{ fontWeight: '700' }}>{p.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.reference}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 8px' }}>
                        <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '11px' }}>
                          {CATEGORY_LABELS[p.category] || p.category}
                        </span>
                      </td>
                      <td style={{ padding: '16px 8px', fontWeight: '600' }}>{formatProductPrice(p.price)}</td>
                      <td style={{ padding: '16px 8px' }}>
                        <span style={{ fontWeight: '700', color: p.stock === 0 ? 'var(--danger)' : p.stock <= 3 ? 'var(--warning)' : 'var(--success)' }}>
                          {p.stock}
                        </span>
                      </td>
                      <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          {isSupabaseConfigured && (
                            <button onClick={() => handleToggleVisible(p)} title={p.visible === false ? 'Mostrar en la tienda' : 'Ocultar de la tienda'}
                              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                              {p.visible === false ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                          )}
                          <button onClick={() => handleOpenEdit(p)} style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', color: 'var(--primary)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDeleteProduct(p.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: 'var(--danger)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
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
                  <input type="text" className="form-input" required value={newSale.client}
                    onChange={(e) => setNewSale((prev) => ({ ...prev, client: e.target.value }))}
                    placeholder="Nombre del comprador" />
                </div>
                <div className="form-group" style={{ flex: 2, minWidth: '250px', marginBottom: 0 }}>
                  <label className="form-label">Productos vendidos</label>
                  <input type="text" className="form-input" required value={newSale.products}
                    onChange={(e) => setNewSale((prev) => ({ ...prev, products: e.target.value }))}
                    placeholder="Ej. 1x Tóner HP 85A, 1x Recarga" />
                </div>
                <div className="form-group" style={{ flex: 1, minWidth: '120px', marginBottom: 0 }}>
                  <label className="form-label">Monto (COP)</label>
                  <input type="number" className="form-input" required value={newSale.total}
                    onChange={(e) => setNewSale((prev) => ({ ...prev, total: e.target.value }))}
                    placeholder="Precio total" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>Añadir Registro</button>
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
                    {sales.map((s) => (
                      <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '16px 8px', fontWeight: '700', color: 'var(--primary)' }}>{s.id}</td>
                        <td style={{ padding: '16px 8px', fontWeight: '600' }}>{s.client}</td>
                        <td style={{ padding: '16px 8px', color: 'var(--text-muted)' }}>{s.date}</td>
                        <td style={{ padding: '16px 8px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.products}</td>
                        <td style={{ padding: '16px 8px', fontWeight: '600' }}>${s.total.toLocaleString()} COP</td>
                        <td style={{ padding: '16px 8px' }}>
                          <span className="badge" style={{
                            background: s.status === 'Completado' ? 'rgba(16, 185, 129, 0.1)' : s.status === 'Pendiente' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: s.status === 'Completado' ? 'var(--success)' : s.status === 'Pendiente' ? 'var(--warning)' : 'var(--danger)',
                            fontSize: '11px'
                          }}>{s.status}</span>
                        </td>
                        <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            {s.status === 'Pendiente' && (
                              <button onClick={() => handleUpdateSaleStatus(s.id, 'Completado')} title="Marcar como Completado" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: 'var(--success)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                                <Check size={14} />
                              </button>
                            )}
                            <button onClick={() => handleDeleteSale(s.id)} title="Eliminar Registro" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: 'var(--danger)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
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

// Campo de imagen reutilizable: previsualización + subir + quitar.
function ImageField({ label, value, uploading, onUpload, onClear }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div style={{
        border: '1px dashed var(--border-color)', borderRadius: '10px', padding: '12px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.02)'
      }}>
        {value ? (
          <img src={value} alt="" width="90" height="90" style={{ objectFit: 'contain', borderRadius: '8px', background: '#fff' }} />
        ) : (
          <div style={{ width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <Package size={30} />
          </div>
        )}
        <div style={{ display: 'flex', gap: '8px' }}>
          <label className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12.5px', cursor: 'pointer', margin: 0 }}>
            <Upload size={13} /> {uploading ? 'Subiendo…' : 'Subir'}
            <input type="file" accept="image/*" onChange={onUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
          {value && (
            <button type="button" onClick={onClear} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12.5px', color: 'var(--danger)' }}>
              Quitar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
