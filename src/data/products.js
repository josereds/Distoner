// Catálogo base de Distoner (23 referencias suministradas por el cliente).
// Se usa como:
//   1. Semilla inicial de la base de datos (scripts/generate-seed.mjs).
//   2. Respaldo local si Supabase aún no está configurado.
// Al cambiarlo, regenerar supabase/seed.sql:  node scripts/generate-seed.mjs
export const INITIAL_PRODUCTS = [
  {
    id: 'ic-951-cy', inventoryNumber: 1, name: 'Cartucho PrintKing H-951XL Cian',
    reference: 'H-951XL CY', color: 'Cian', brand: 'PrintKing', category: 'ink-cartridge',
    description: 'Cartucho de tinta compatible, alta capacidad XL. Referencia suministrada: H-951XL CY.',
    price: null, stock: 1, image: '/images/products/cliente/h-951xl.jpeg',
    secondaryImage: '/images/products/h951-cyan.jpg',
    sourceUrl: 'https://www.1ink.com/hp-951xl-ink-cartridge-cyan-cn046an-remanufactured-replacement/'
  },
  {
    id: 'ic-951-yl', inventoryNumber: 2, name: 'Cartucho PrintKing H-951XL Amarillo',
    reference: 'H-951XL YL', color: 'Amarillo', brand: 'PrintKing', category: 'ink-cartridge',
    description: 'Cartucho de tinta compatible, alta capacidad XL. Referencia suministrada: H-951XL YL.',
    price: null, stock: 1, image: '/images/products/cliente/h-951xl.jpeg',
    secondaryImage: '/images/products/h951-yellow.jpg',
    sourceUrl: 'https://www.houseofinks.com/hp-951xl-cn048an-high-yield-yellow-ink-cartridge-remanufactured-shows-accurate-ink-levels/'
  },
  {
    id: 'ic-951-mg', inventoryNumber: 3, name: 'Cartucho PrintKing H-951XL Magenta',
    reference: 'H-951XL MG', color: 'Magenta', brand: 'PrintKing', category: 'ink-cartridge',
    description: 'Cartucho de tinta compatible, alta capacidad XL. Referencia suministrada: H-951XL MG.',
    price: null, stock: 1, image: '/images/products/cliente/h-951xl.jpeg',
    secondaryImage: '/images/products/h951-magenta.jpg',
    sourceUrl: 'https://www.1ink.com/hp-951xl-ink-cartridge-magenta-cn047an-remanufactured-replacement/'
  },
  {
    id: 'ic-950-bk', inventoryNumber: 4, name: 'Cartucho PrintKing H-950XL Negro',
    reference: 'H-950XL BK', color: 'Negro', brand: 'PrintKing', category: 'ink-cartridge',
    description: 'Cartucho de tinta compatible, alta capacidad XL. Referencia suministrada: H-950XL BK.',
    price: null, stock: 1, image: '/images/products/h950-black.jpg',
    sourceUrl: 'https://www.swiftink.com/product/remanufactured-high-yield-black-pigment-based-ink-cartridge-for-cn045an-hp-950xl/'
  },
  {
    id: 'tn-tk3162', inventoryNumber: 5, name: 'Tóner compatible TK-3162',
    reference: 'TK-3162', color: 'Negro', brand: 'Kyocera', category: 'toner',
    description: 'Tóner compatible negro. Referencia suministrada: TK-3162.',
    price: null, stock: 1, image: '/images/products/cliente/tk-3162.jpeg',
    secondaryImage: '/images/products/tk3162.jpg',
    sourceUrl: 'https://www.inktechnologies.com/kyocera-mita-tk-3162-black-toner-cartridge-genuine-oem'
  },
  {
    id: 'tn-w1330a', inventoryNumber: 6, name: 'Tóner compatible HP 330A',
    reference: 'W1330A · 330A', color: 'Negro', brand: 'HP', category: 'toner',
    description: 'Tóner compatible negro. W1330A corresponde a la denominación comercial HP 330A.',
    price: null, stock: 1, image: '/images/products/cliente/w1330a.jpeg',
    secondaryImage: '/images/products/fisico/w1330a.jpg',
    sourceUrl: 'https://tonercompatibleperu.com/producto/toner-hp-330a-w1330a-compatible/'
  },
  {
    id: 'ib-t504-yl', inventoryNumber: 7, name: 'Botella de tinta T504/T544 Amarillo',
    reference: 'T504 / T544', color: 'Amarillo', brand: 'Epson compatible', category: 'ink-bottle',
    description: 'Botella de tinta de recarga amarilla para la familia de referencias T504/T544.',
    price: null, stock: 1, image: '/images/products/cliente/t504-t544.jpeg',
    secondaryImage: '/images/products/t504-yellow.png',
    sourceUrl: 'https://sskaizen.com/co/producto/botella-tinta-epson-t504-70ml-yellow/'
  },
  {
    id: 'ib-t504-mg', inventoryNumber: 8, name: 'Botella de tinta T504/T544 Magenta',
    reference: 'T504 / T544', color: 'Magenta', brand: 'Epson compatible', category: 'ink-bottle',
    description: 'Botella de tinta de recarga magenta para la familia de referencias T504/T544.',
    price: null, stock: 1, image: '/images/products/cliente/t504-t544.jpeg',
    secondaryImage: '/images/products/t504-magenta.png',
    sourceUrl: 'https://sskaizen.com/co/producto/botella-tinta-epson-t504-70ml-magenta/'
  },
  {
    id: 'ib-t504-cy', inventoryNumber: 9, name: 'Botella de tinta T504/T544 Cian',
    reference: 'T504 / T544', color: 'Cian', brand: 'Epson compatible', category: 'ink-bottle',
    description: 'Botella de tinta de recarga cian para la familia de referencias T504/T544.',
    price: null, stock: 1, image: '/images/products/cliente/t504-t544.jpeg',
    secondaryImage: '/images/products/fisico/t504-cyan.jpg',
    sourceUrl: 'https://recargasrafaela.com.ar/producto/global-botella-tinta-para-epson-t504-t544-cian-70ml/'
  },
  {
    id: 'ib-t504-bk', inventoryNumber: 10, name: 'Botella Premium Refill Ink 504/544 Negro',
    reference: '504 / 544 Premium Refill Ink', color: 'Negro', brand: 'Premium Refill Ink', category: 'ink-bottle',
    description: 'Botella de tinta negra de recarga. Referencia suministrada: 504/544 Premium Refill Ink.',
    price: null, stock: 1, image: '/images/products/cliente/t504-t544.jpeg',
    secondaryImage: '/images/products/fisico/t504-black.jpg',
    sourceUrl: 'https://sumisoft.com.co/producto/tinta-generica-epson-504-544-negro/'
  },
  {
    id: 'tn-w1510a', inventoryNumber: 11, name: 'Tóner compatible HP 151A',
    reference: 'W1510A · 151A', color: 'Negro', brand: 'HP', category: 'toner',
    description: 'Tóner compatible negro. W1510A corresponde a la denominación comercial HP 151A.',
    price: null, stock: 1, image: '/images/products/cliente/w1510a.jpeg',
    sourceUrl: 'https://compudisa.com.pe/producto/toner-hp-w1510a-laserjet-pro-151a-negro/'
  },
  {
    id: 'tn-ce505a-cf280a', inventoryNumber: 12, name: 'Tóner compatible CE505A / CF280A',
    reference: 'CE505A / CF280A', color: 'Negro', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible negro. Referencias suministradas: CE505A y CF280A.',
    price: null, stock: 1, image: '/images/products/cliente/ce505a-cf280a.jpeg',
    secondaryImage: '/images/products/fisico/ce505a.jpg',
    sourceUrl: 'https://pro-laser.com/en/p/1740-hp-05a-ce505a-cf280a-compatible-toner-black.html'
  },
  {
    id: 'tn-ce255x', inventoryNumber: 13, name: 'Tóner compatible CE255X',
    reference: 'CE255X · 55X', color: 'Negro', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible negro de alta capacidad. Referencia suministrada: CE255X.',
    price: null, stock: 1, image: '/images/products/cliente/ce255x.jpeg',
    secondaryImage: '/images/products/fisico/ce255x.jpg',
    sourceUrl: 'https://compatiblesperu.com/producto/toner-hp-55x-ce255x/'
  },
  {
    id: 'tn-c531-cyan', inventoryNumber: 14, name: 'Tóner compatible cian',
    reference: 'CC531A / CE411A / CF381A', color: 'Cian', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible cian. Se muestran juntas las tres referencias entregadas por el cliente.',
    price: null, stock: 1, image: '/images/products/cliente/cc531a-ce411a-cf381a.jpeg',
    secondaryImage: '/images/products/cc531a-cyan.jpg',
    sourceUrl: 'https://colombiatoner.com/producto/cartucho-de-toner-color-cian-hp-laserjet-cc531a-304a-ce411a-305a-cf381a-312a-generico/'
  },
  {
    id: 'tn-c533-magenta', inventoryNumber: 15, name: 'Tóner compatible magenta',
    reference: 'CC533A / CE413A / CF383A', color: 'Magenta', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible magenta. Se muestran juntas las tres referencias entregadas por el cliente.',
    price: null, stock: 1, image: '/images/products/cc533a-magenta.jpg',
    sourceUrl: 'https://controlprint.com.mx/product/cartucho-de-toner-compatible-cc533a-ce413a-cf383a-magenta/'
  },
  {
    id: 'tn-c532-yellow', inventoryNumber: 16, name: 'Tóner compatible amarillo',
    reference: 'CC532A / CE412A / CF382A', color: 'Amarillo', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible amarillo. Se muestran juntas las tres referencias entregadas por el cliente.',
    price: null, stock: 1, image: '/images/products/cc532a-yellow.jpg',
    sourceUrl: 'https://www.alebo.ro/cartus-hp-cc532a-ce412a-cf382a-crg718'
  },
  {
    id: 'tn-c530-black', inventoryNumber: 17, name: 'Tóner compatible negro',
    reference: 'CC530A / CE410A / CF380A', color: 'Negro', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible negro. Se muestran juntas las tres referencias entregadas por el cliente.',
    price: null, stock: 1, image: '/images/products/cc530a-black.jpg',
    sourceUrl: 'https://controlprint.com.mx/product/cartucho-de-toner-generico-cc530a-ce410a-cf380a-negro/'
  },
  {
    id: 'tn-sp3710', inventoryNumber: 18, name: 'Tóner compatible Ricoh SP3710',
    reference: 'SP3710', color: 'Negro', brand: 'Ricoh', category: 'toner',
    description: 'Tóner compatible negro para la familia Ricoh SP3710. Referencia suministrada: SP3710.',
    price: null, stock: 1, image: '/images/products/cliente/sp3710.jpeg',
    secondaryImage: '/images/products/fisico/sp3710.png',
    sourceUrl: 'https://gruposuministros.co/toner-ricoh/433-toner-sp3710-ricoh-negro-para-impresoras-ricoh-sp3710-m320f-2143657890.html'
  },
  {
    id: 'tn-q2612a-universal', inventoryNumber: 19, name: 'Tóner compatible universal Q2612A',
    reference: 'Q2612A / FX9 / FX10 / CAN103 / 703 / 104 / 704', color: 'Negro', brand: 'HP / Canon compatible', category: 'toner',
    description: 'Tóner compatible universal negro para las referencias Q2612A, FX9, FX10, CAN103, 703, 104 y 704.',
    price: null, stock: 1, image: '/images/products/cliente/q2612a-universal.jpeg',
    secondaryImage: '/images/products/fisico/q2612a.jpg',
    sourceUrl: 'https://pro-laser.com/en/p/1014-hp-12a-q2612a-103-303-703-fx9-fx10-104-compatible-toners-black.html'
  },
  {
    id: 'tn-w1500a', inventoryNumber: 20, name: 'Tóner compatible HP 150A',
    reference: 'W1500A · 150A', color: 'Negro', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible negro. W1500A corresponde a la denominación comercial HP 150A.',
    price: null, stock: 1, image: '/images/products/cliente/w1500a.jpeg',
    sourceUrl: 'https://compatiblesperu.com/producto/toner-hp-150a-w1500a/'
  },
  {
    id: 'tn-w1105a', inventoryNumber: 21, name: 'Tóner compatible HP 105A',
    reference: 'W1105A · 105A', color: 'Negro', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible negro. W1105A corresponde a la denominación comercial HP 105A.',
    price: null, stock: 1, image: '/images/products/cliente/w1105a.jpeg',
    secondaryImage: '/images/products/fisico/w1105a.jpg',
    sourceUrl: 'https://compatiblesperu.com/producto/toner-compatible-hp-105a-w1105a/'
  },
  {
    id: 'tn-m111l', inventoryNumber: 22, name: 'Tóner compatible Samsung MLT-D111L',
    reference: 'MLT-D111L · 1.8K', color: 'Negro', brand: 'Samsung', category: 'toner',
    description: 'Tóner compatible negro; rendimiento indicado por el inventario: 1.800 páginas.',
    price: null, stock: 1, image: '/images/products/cliente/mlt-d111l.jpeg',
    secondaryImage: '/images/products/fisico/mltd111l.jpg',
    sourceUrl: 'https://tonercompatibleperu.com/producto/toner-compatible-samsung-mlt-d111l/'
  },
  {
    id: 'tn-cb435a', inventoryNumber: 23, name: 'Tóner compatible universal HP',
    reference: 'CB435A / CB436A / CE285A', color: 'Negro', brand: 'HP compatible', category: 'toner',
    description: 'Tóner compatible negro. Referencias suministradas: CB435A, CB436A y CE285A.',
    price: null, stock: 1, image: '/images/products/cliente/cb435-cb436-ce285a.jpeg',
    secondaryImage: '/images/products/fisico/cb435a.jpg',
    sourceUrl: 'https://todocomputadoras.com.do/product/toner-cb435a-cb436a-ce285a-premium/'
  }
];
