// Every piece is from the MET Costume Collection (catalog info from the game materials deck).
// slot decides where on the form a piece snaps to.

const met = (id) => `https://www.metmuseum.org/art/collection/search/${id}`

export const SLOTS = {
  // left/top/height are % of the stage; pieces keep their aspect ratio
  dress:     { label: 'Dresses & ensembles', cx: 50, top: 20, h: 76, z: 1 },
  bottom:    { label: 'Skirts & trousers',   cx: 50, top: 48, h: 49, z: 0 },
  chemise:   { label: 'Smocks & chemises',   cx: 50, top: 20, h: 40, z: 3 },
  top:       { label: 'Tops & blouses',      cx: 50, top: 20, h: 40, z: 4 },
  bodice:    { label: 'Bodices',             cx: 50, top: 20, h: 40, z: 6 },
  outer:     { label: 'Coats & robes',       cx: 50, top: 19, h: 68, z: 5 },
  shoulders: { label: 'Shawls & collars',    cx: 50, top: 19, h: 28, z: 7 },
  neck:      { label: 'Necklaces',           cx: 50, top: 21, h: 22, z: 8 },
  pin:       { label: 'Brooches',            cx: 57, top: 25, h: 13, z: 9 },
  head:      { label: 'Hats & headwear',     cx: 50, top: 0,  h: 19, z: 10 },
  eyewear:   { label: 'Eyewear',             cx: 50, top: 8, h: 2.2, z: 12 },
  hand:      { label: 'Fans & purses',       cx: 62, top: 46, h: 20, z: 11 },
}

export const CLOTHES = [
  { id: 'ensemble-french', title: 'Ensemble', date: 'ca. 1730', culture: 'probably French', group: 'French', region: 'Europe', year: 1730, medium: 'wool; silk; metallic thread', slot: 'dress', short: true, fit: { top: 6, h: 80, cx: 51 }, url: 'https://www.metmuseum.org/art/collection/search?q=2004.411a' },
  { id: 'doublet-french', title: 'Doublet', date: 'early 1620s', culture: 'French', group: 'French', region: 'Europe', year: 1620, medium: 'silk', slot: 'top', fit: { top: 8, h: 56 }, url: met(81558) },
  { id: 'bashlik', title: 'Bashlik', date: '1860s', culture: 'Asian, North', group: 'North Asian', region: 'Asia', year: 1865, medium: 'wool', slot: 'outer', fit: { top: 9, h: 68 }, url: met(107581) },
  { id: 'fan-brazilian', title: 'Fixed fan', date: '1865–75', culture: 'Brazilian', group: 'Brazilian', region: 'Americas', year: 1870, medium: 'ivory, feathers, beetles', slot: 'hand', fit: { cx: 67, top: 36 }, url: met(157985) },
  { id: 'blouse-indian', title: 'Blouse', date: 'late 19th century', culture: 'Indian', group: 'Indian', region: 'Asia', year: 1875, medium: 'cotton, silk', slot: 'top', fit: { top: 17, h: 39, scaleX: 0.7 }, url: met(157713) },
  { id: 'shawl-moroccan', title: 'Shawl', date: 'ca. 1866', culture: 'possibly Moroccan', group: 'Moroccan', region: 'Africa', year: 1866, medium: 'wool, metallic', slot: 'shoulders', fit: { top: 17, h: 42 }, url: met(168800) },
  { id: 'skirt-british', title: 'Skirt', date: 'late 18th century', culture: 'British', group: 'British', region: 'Europe', year: 1775, medium: 'linen', slot: 'bottom', fit: { top: 42, h: 56 }, url: met(155201) },
  { id: 'hat-american', title: 'Hat', date: '1872', culture: 'American', group: 'American', region: 'Americas', year: 1872, medium: 'straw, silk, metal', slot: 'head', fit: { top: -2, h: 15, cx: 51 }, url: met(156553) },
  { id: 'brooch-peruvian', title: 'Brooch', date: '20th century', culture: 'Peruvian', group: 'Peruvian', region: 'Americas', year: 1900, medium: 'silver', slot: 'pin', url: met(107389) },
  { id: 'pectoral-panamanian', title: 'Pectoral', date: '11th–16th century', culture: 'Indigenous American (Panamanian)', group: 'Indigenous Panamanian', region: 'Americas', year: 1350, medium: 'gold, synthetic', slot: 'neck', fit: { top: 23, h: 20, cx: 51 }, url: met(141754) },
  { id: 'necklace-costa-rican', title: 'Necklace', date: '500 BCE–900 CE', culture: 'Indigenous American (Costa Rican)', group: 'Indigenous Costa Rican', region: 'Americas', year: 200, medium: 'jade', slot: 'neck', fit: { top: 17, h: 20, cx: 50 }, url: met(141757) },
  { id: 'banyan-chinese', title: 'Banyan', date: '1760–70', culture: 'Chinese', group: 'Chinese', region: 'Asia', year: 1765, medium: 'silk, linen', slot: 'outer', fit: { cx: 51 }, url: met(139667) },
  { id: 'eyeglasses-japanese', title: 'Eyeglasses', date: '1930–59', culture: 'Japanese', group: 'Japanese', region: 'Asia', year: 1945, medium: 'plastic, metal, glass', slot: 'eyewear', url: met(104739) },
  { id: 'necklace-persian', title: 'Necklace', date: '12th century BCE–CE 20th century', culture: 'Persian', group: 'Persian', region: 'Asia', year: 500, medium: 'stone, glass', slot: 'neck', fit: { top: 19, h: 20, cx: 50, scaleX: 0.8 }, url: met(141680) },
  { id: 'cape-french', title: 'Cape', date: 'second half 16th century', culture: 'French', group: 'French', region: 'Europe', year: 1575, medium: 'silk, gilt thread', slot: 'outer', fit: { top: 13, h: 60 }, url: met(79091) },
  { id: 'coat-british', title: 'Coat', date: '1630–40', culture: 'British', group: 'British', region: 'Europe', year: 1635, medium: 'leather', slot: 'outer', fit: { top: 18, h: 46, cx: 51 }, url: met(81556) },
  { id: 'trousers-american', title: 'Trousers', date: '1800–1830', culture: 'American', group: 'American', region: 'Americas', year: 1815, medium: 'cotton, linen', slot: 'bottom', fit: { top: 44, h: 54, cx: 49.5, scaleX: 0.85 }, url: met(911443) },
  { id: 'hakama-japanese', title: 'Trousers ("hakama") associated with Kyogen', date: 'late 19th century', culture: 'Japan', group: 'Japanese', region: 'Asia', year: 1875, medium: 'hemp', slot: 'bottom', fit: { top: 44, h: 68 }, url: met(44633) },
  { id: 'headdress-russian', title: 'Headdress', date: 'early 19th century', culture: 'Russian', group: 'Russian', region: 'Europe', year: 1810, medium: 'silk, pearls, metal, cotton, paper', slot: 'head', fit: { top: -28, h: 40 }, url: met(155785) },
  { id: 'cap-polish', title: 'Cap', date: '1870–80', culture: 'Polish', group: 'Polish', region: 'Europe', year: 1875, medium: 'silk, metallic thread', slot: 'head', fit: { top: -4, h: 12 }, url: met(84580) },
  { id: 'purse-mexican', title: 'Coin purse', date: '1790–1810', culture: 'Mexican', group: 'Mexican', region: 'Americas', year: 1800, medium: 'glass, silk, metal', slot: 'hand', fit: { top: 48, h: 15 }, url: met(156682) },
  { id: 'ensemble-spanish', title: 'Ensemble', date: 'late 16th century', culture: 'Spanish', group: 'Spanish', region: 'Europe', year: 1575, medium: 'silk, linen', slot: 'dress', url: met(98291) },
  { id: 'bodice-european', title: 'Bodice', date: '18th century', culture: 'European', group: 'European', region: 'Europe', year: 1750, medium: 'silk, metal thread', slot: 'bodice', fit: { top: 16, h: 37, scaleX: 1.0, cx: 50.5 }, url: met(90397) },
  { id: 'bertha-belgian', title: 'Bertha', date: 'ca. 1890', culture: 'Belgian', group: 'Belgian', region: 'Europe', year: 1890, medium: 'linen', slot: 'shoulders', fit: { top: 13, h: 28 }, url: met(156799) },
  { id: 'frock-coat-philippine', title: 'Frock coat', date: '1840–49', culture: 'Philippine', group: 'Philippine', region: 'Asia', year: 1845, medium: 'cotton, piña', slot: 'outer', fit: { top: 16, h: 40 }, url: met(158133) },
  { id: 'smock-italian', title: 'Smock', date: 'late 16th century', culture: 'Italian', group: 'Italian', region: 'Europe', year: 1575, medium: 'linen, silk and metal thread', slot: 'chemise', fit: { top: 20, h: 74, cx: 52.5, scaleX: 0.85 }, url: met(83861) },
  { id: 'skirt-french', title: 'Skirt', date: '1840–60', culture: 'French', group: 'French', region: 'Europe', year: 1850, medium: 'cotton', slot: 'bottom', fit: { top: 42, h: 56 }, url: met(156833) },
  { id: 'jacket-german', title: 'Jacket', date: '1898–1900', culture: 'German', group: 'German', region: 'Europe', year: 1899, medium: 'wool, brass, metal', slot: 'outer', fit: { top: 16, h: 40, cx: 51.5, scaleX: 0.92 }, url: met(104950) },
  { id: 'dress-irish', title: 'Dress', date: 'ca. 1875', culture: 'Irish', group: 'Irish', region: 'Europe', year: 1875, medium: 'silk', slot: 'dress', fit: { top: 17, h: 80, cx: 55, scaleX: 1.08 }, url: met(174693) },
].map((c) => ({ ...c, img: `${import.meta.env.BASE_URL}clothes/${c.id}.png` }))

// A dress covers both top and bottom, so they can't be worn together
export const CONFLICTS = {
  dress: ['bottom'],
  bottom: ['dress'],
}

// Drawn features (black illustrations) placed on the face. x is percent of the figure height from the head's centre,
// y is percent of the figure height from the top, w is the width as percent of the figure height.
const feat = (id) => `${import.meta.env.BASE_URL}features/${id}.svg`
export const FEATURES = [
  { id: 'eyebrows', title: 'Eyebrows', x: 0, y: 7.6, w: 7, img: feat('eyebrows') },
  { id: 'round-glasses', title: 'Round glasses', x: 0, y: 8.7, w: 11, img: feat('round-glasses') },
  { id: 'monocle', title: 'Monocle', x: 2.5, y: 8.6, w: 5, img: feat('monocle') },
  { id: 'mole', title: 'Mole', x: -3, y: 10.6, w: 1.2, img: feat('mole') },
  { id: 'beauty-patch', title: 'Beauty patch', x: 3.5, y: 10.2, w: 1.2, img: feat('beauty-patch') },
  { id: 'mustache', title: 'Mustache', x: 0, y: 11.8, w: 7, img: feat('mustache') },
  { id: 'lashes', title: 'Lashes', x: 0, y: 8, w: 11, img: feat('lashes') },
  { id: 'drop-earrings', title: 'Drop earrings', x: 0, y: 12.5, w: 14, img: feat('drop-earrings') },
  { id: 'hoop-earrings', title: 'Hoop earrings', x: 0, y: 14.4, w: 14, img: feat('hoop-earrings') },
]
export const FEAT_BY = Object.fromEntries(FEATURES.map((f) => [f.id, f]))

// features that can't be worn together: adding one removes the others in its group
export const FEATURE_CONFLICTS = {
  eyebrows: ['lashes'],
  lashes: ['eyebrows'],
  'drop-earrings': ['hoop-earrings'],
  'hoop-earrings': ['drop-earrings'],
}
