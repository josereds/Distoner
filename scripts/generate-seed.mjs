// Genera supabase/seed.sql a partir del catálogo base (src/data/products.js).
// Uso:  node scripts/generate-seed.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { INITIAL_PRODUCTS } from '../src/data/products.js';

const here = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(here, '../supabase/seed.sql');

// Escapa comillas simples para literales SQL
const s = (value) =>
  value === null || value === undefined ? 'null' : `'${String(value).replace(/'/g, "''")}'`;
const n = (value) => (value === null || value === undefined || value === '' ? 'null' : Number(value));

const rows = INITIAL_PRODUCTS.map((p, index) => {
  const cols = [
    s(p.id),
    n(p.inventoryNumber),
    s(p.name),
    s(p.reference),
    s(p.color),
    s(p.brand),
    s(p.category),
    s(p.description),
    n(p.price),
    n(p.stock),
    s(p.image),
    s(p.secondaryImage ?? null),
    s(p.sourceUrl ?? null),
    'true',              // visible
    n(p.inventoryNumber ?? index + 1) // sort_order
  ];
  return `  (${cols.join(', ')})`;
});

const sql = `-- ============================================================================
--  Distoner · Semilla de productos (${INITIAL_PRODUCTS.length} referencias)
--  GENERADO automáticamente por scripts/generate-seed.mjs — no editar a mano.
--  Ejecutar en Supabase → SQL Editor DESPUÉS de schema.sql.
--  Es idempotente: se puede volver a correr; actualiza los existentes por id.
-- ============================================================================

insert into public.productos
  (id, inventory_number, name, reference, color, brand, category, description,
   price, stock, image, secondary_image, source_url, visible, sort_order)
values
${rows.join(',\n')}
on conflict (id) do update set
  inventory_number = excluded.inventory_number,
  name             = excluded.name,
  reference        = excluded.reference,
  color            = excluded.color,
  brand            = excluded.brand,
  category         = excluded.category,
  description      = excluded.description,
  price            = excluded.price,
  stock            = excluded.stock,
  image            = excluded.image,
  secondary_image  = excluded.secondary_image,
  source_url       = excluded.source_url,
  sort_order       = excluded.sort_order;
`;

writeFileSync(outPath, sql, 'utf8');
console.log(`OK · ${INITIAL_PRODUCTS.length} productos escritos en ${outPath}`);
