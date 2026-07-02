import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { INITIAL_PRODUCTS } from './products';

// La BD guarda las columnas en snake_case; la UI usa camelCase.
export function fromRow(row) {
  return {
    id: row.id,
    inventoryNumber: row.inventory_number,
    name: row.name,
    reference: row.reference,
    color: row.color,
    brand: row.brand,
    category: row.category,
    description: row.description,
    price: row.price,
    stock: row.stock,
    image: row.image,
    secondaryImage: row.secondary_image,
    sourceUrl: row.source_url,
    visible: row.visible,
    sortOrder: row.sort_order
  };
}

export function toRow(product) {
  return {
    id: product.id,
    inventory_number: product.inventoryNumber ?? null,
    name: product.name,
    reference: product.reference ?? null,
    color: product.color ?? null,
    brand: product.brand ?? null,
    category: product.category,
    description: product.description ?? null,
    price: product.price ?? null,
    stock: product.stock ?? 0,
    image: product.image ?? null,
    secondary_image: product.secondaryImage ?? null,
    source_url: product.sourceUrl ?? null,
    visible: product.visible ?? true,
    sort_order: product.sortOrder ?? product.inventoryNumber ?? 0
  };
}

// Catálogo público: productos visibles ordenados. Si Supabase no está
// configurado (o falla), usa el catálogo local como respaldo.
export async function fetchPublicProducts() {
  if (!isSupabaseConfigured) return INITIAL_PRODUCTS;

  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true });

  if (error || !data) {
    console.error('No se pudo cargar el catálogo desde Supabase:', error);
    return INITIAL_PRODUCTS;
  }
  return data.map(fromRow);
}

// ── Operaciones de administración (requieren sesión autenticada) ────────────

// Catálogo completo para el panel: incluye productos ocultos.
export async function fetchAllProducts() {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data.map(fromRow);
}

// Crea o actualiza un producto (upsert por id).
export async function saveProduct(product) {
  const { data, error } = await supabase
    .from('productos')
    .upsert(toRow(product))
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('productos').delete().eq('id', id);
  if (error) throw error;
}

// Sube una imagen al bucket 'productos' y devuelve su URL pública.
export async function uploadProductImage(file, productId = 'img') {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${productId}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from('productos')
    .upload(path, file, { cacheControl: '3600', upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from('productos').getPublicUrl(path);
  return data.publicUrl;
}
