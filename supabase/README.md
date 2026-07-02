# Backend de Distoner (Supabase)

Guía para conectar el catálogo y el panel de administración a una base de datos real.

## 1. Crear el proyecto
1. Entra a https://supabase.com e inicia sesión (recomendado: con GitHub `josereds`).
2. **New project** → Name `Distoner`, define una *Database Password* (guárdala), Region *South America (São Paulo)*.

## 2. Crear las tablas y el almacenamiento
En **SQL Editor** ejecuta, en este orden:
1. [`schema.sql`](schema.sql) — tabla `productos`, políticas RLS y bucket de imágenes `productos`.
2. [`seed.sql`](seed.sql) — inserta los 23 productos actuales (idempotente; se puede repetir).

> `seed.sql` se regenera desde el catálogo del código con:
> ```bash
> node scripts/generate-seed.mjs
> ```

## 3. Crear el usuario administrador
**Authentication → Users → Add user → Create new user**: email + contraseña para el
cliente, marca *Auto Confirm User*. Con ese usuario se inicia sesión en `#admin`.

## 4. Configurar las credenciales
En **Project Settings → API** copia:
- **Project URL**
- **anon public** key

Ponlas en:
- **Local**: archivo `.env.local` (ver [`.env.example`](../.env.example)).
- **Vercel**: Project → Settings → Environment Variables (las mismas dos variables),
  luego *Redeploy*.

La `anon key` es pública por diseño; la seguridad la dan las políticas RLS del
`schema.sql`. **Nunca** publiques la `service_role` key ni la contraseña de la BD.

## Estado de la integración
- ✅ Esquema, semilla, cliente y **lectura** del catálogo desde Supabase (con
  respaldo al catálogo local si no hay credenciales).
- ⏳ Pendiente (fase con credenciales): reescribir el panel `AdminDashboard` para
  login con Supabase Auth, CRUD contra la BD y subida de imágenes al bucket
  (helpers ya listos en `src/data/productsRepo.js`).
