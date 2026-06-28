const BRANDS = [
  { name: 'HP', image: '/images/brands/hp.svg' },
  { name: 'Epson', image: '/images/brands/epson.svg' },
  { name: 'Kyocera', image: '/images/brands/kyocera.svg' },
  { name: 'Samsung', image: '/images/brands/samsung.svg' },
  { name: 'Ricoh', wordmark: true },
  { name: 'Canon', wordmark: true },
  { name: 'PrintKing', wordmark: true }
];

function BrandLogoItem({ brand }) {
  return (
    <div className="brand-logo-item" title={brand.name} aria-label={brand.name}>
      {brand.wordmark ? (
        <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.03em' }}>
          {brand.name}
        </span>
      ) : (
        <img
          src={brand.image}
          alt={`Logo ${brand.name}`}
          width="116"
          height="34"
          loading="lazy"
          style={{
            display: 'block',
            width: 'auto',
            maxWidth: '116px',
            maxHeight: '34px',
            objectFit: 'contain',
            opacity: 0.62
          }}
        />
      )}
    </div>
  );
}

export default function BrandLogos() {
  return (
    <section style={{
      padding: '60px 0 70px',
      background: '#0c111c',
      borderTop: '1px solid var(--border-color)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--text-muted)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: '36px'
        }}>
          Marcas y familias presentes en el inventario
        </p>

        <div className="brand-marquee">
          <div className="brand-marquee-track">
            {[...BRANDS, ...BRANDS].map((brand, index) => (
              <BrandLogoItem key={`${brand.name}-${index}`} brand={brand} />
            ))}
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--text-muted)',
          marginTop: '32px',
          opacity: 0.78
        }}>
          Productos compatibles: las marcas se muestran únicamente como referencia de compatibilidad.
        </p>
      </div>
    </section>
  );
}
