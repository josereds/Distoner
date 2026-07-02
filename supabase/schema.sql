-- ============================================================================
--  Distoner · Esquema de base de datos (Supabase / PostgreSQL)
--  Ejecutar este archivo UNA vez en:  Supabase → SQL Editor → New query → Run
-- ============================================================================

-- 1) Tabla de productos --------------------------------------------------------
create table if not exists public.productos (
  id               text primary key,
  inventory_number int,
  name             text not null,
  reference        text,
  color            text,
  brand            text,
  category         text not null default 'toner',   -- toner | ink-cartridge | ink-bottle
  description      text,
  price            numeric,                          -- null = "Por confirmar"
  stock            int not null default 0,
  image            text,                             -- Foto 1 (caja)
  secondary_image  text,                             -- Foto 2 (producto físico)
  source_url       text,
  visible          boolean not null default true,    -- ocultar sin borrar
  sort_order       int not null default 0,           -- orden en el catálogo
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists productos_orden_idx on public.productos (sort_order, inventory_number);

-- Mantener updated_at al día
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists productos_set_updated_at on public.productos;
create trigger productos_set_updated_at
  before update on public.productos
  for each row execute function public.set_updated_at();

-- 2) Seguridad a nivel de fila (RLS) ------------------------------------------
alter table public.productos enable row level security;

-- Cualquiera (visitantes) puede LEER el catálogo
drop policy if exists "productos lectura pública" on public.productos;
create policy "productos lectura pública"
  on public.productos for select
  using (true);

-- Solo usuarios autenticados (el admin) pueden CREAR / EDITAR / BORRAR
drop policy if exists "productos escritura admin" on public.productos;
create policy "productos escritura admin"
  on public.productos for all
  to authenticated
  using (true)
  with check (true);

-- 3) Almacenamiento de imágenes (Storage) -------------------------------------
-- Bucket público de solo lectura; subida solo para autenticados
insert into storage.buckets (id, name, public)
values ('productos', 'productos', true)
on conflict (id) do nothing;

drop policy if exists "imagenes lectura pública" on storage.objects;
create policy "imagenes lectura pública"
  on storage.objects for select
  using (bucket_id = 'productos');

drop policy if exists "imagenes subida admin" on storage.objects;
create policy "imagenes subida admin"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'productos');

drop policy if exists "imagenes actualizar admin" on storage.objects;
create policy "imagenes actualizar admin"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'productos');

drop policy if exists "imagenes borrar admin" on storage.objects;
create policy "imagenes borrar admin"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'productos');
