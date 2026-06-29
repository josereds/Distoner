# Distoner — Sitio web

Landing de una sola página para **Distoner Suministros**: recarga de tóner, venta de
suministros (cartuchos, tóner, botellas de tinta) y mantenimiento de impresoras en
Bogotá. El contacto y las cotizaciones se canalizan por WhatsApp.

## Tecnología

- **React 19** + **Vite** (JavaScript, sin TypeScript salvo un componente UI)
- **lucide-react** para iconos
- Estilos en CSS plano (`src/index.css`, `src/App.css`) + estilos inline
- **Sin backend**: el catálogo se guarda en `localStorage` del navegador. No requiere
  base de datos ni variables de entorno (`.env`).

## Requisitos

- Node.js 18+ (recomendado LTS)

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción -> dist/
npm run preview  # previsualizar el build
npm run lint     # ESLint
```

## Estructura

```
public/
  images/products/   # 23 imágenes del catálogo
  hero_video.mp4     # video de fondo del hero
  og-image-v3.jpg    # imagen para compartir en redes
src/
  App.jsx            # layout, catálogo inicial (INITIAL_PRODUCTS) y enrutado por hash
  components/        # Hero, Products, Services, Contact, FAQ, AdminDashboard, etc.
```

## Panel de administración

Hay un panel oculto para editar el catálogo. Se accede añadiendo `#admin` a la URL
(o con el enlace «Admin» en el pie de página). Los cambios se guardan en el navegador
del dispositivo, no en un servidor.

## Catálogo

El catálogo inicial vive en `INITIAL_PRODUCTS` dentro de [src/App.jsx](src/App.jsx).
Al cambiarlo, sube la constante `PRODUCT_VERSION` para que los navegadores reemplacen
los datos guardados en caché.

## Despliegue

Proyecto Vite estático: se despliega en Vercel importando el repositorio (framework
detectado automáticamente como Vite). No hay variables de entorno que configurar.
