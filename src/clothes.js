// Every piece is from the MET Costume Collection (catalog info from the game materials deck).
// slot decides where on the form a piece snaps to.

const met = (id) => `https://www.metmuseum.org/art/collection/search/${id}`

export const SLOTS = {
  // left/top/height are % of the stage; pieces keep their aspect ratio
  dress:     { label: 'Dresses & ensembles', cx: 50, top: 20, h: 76, z: 1 },
  bottom:    { label: 'Skirts & trousers',   cx: 50, top: 48, h: 49, z: 2 },
  top:       { label: 'Tops & bodices',      cx: 50, top: 20, h: 40, z: 3 },
  outer:     { label: 'Coats & robes',       cx: 50, top: 19, h: 68, z: 4 },
  shoulders: { label: 'Shawls & collars',    cx: 50, top: 19, h: 28, z: 5 },
  neck:      { label: 'Necklaces',           cx: 50, top: 21, h: 22, z: 6 },
  pin:       { label: 'Brooches',            cx: 57, top: 25, h: 13, z: 7 },
  head:      { label: 'Hats & headwear',     cx: 50, top: 0,  h: 19, z: 8 },
  hand:      { label: 'Fans & purses',       cx: 68, top: 47, h: 16, z: 9 },
}

export const CLOTHES = [
  { id: 'ensemble-french', title: 'Ensemble', date: 'ca. 1730', culture: 'probably French', group: 'French', region: 'Europe', year: 1730, medium: 'wool; silk; metallic thread', slot: 'outer', fit: { top: 11, h: 80 }, url: 'https://www.metmuseum.org/art/collection/search?q=2004.411a' },
  { id: 'doublet-french', title: 'Doublet', date: 'early 1620s', culture: 'French', group: 'French', region: 'Europe', year: 1620, medium: 'silk', slot: 'top', url: met(81558) },
  { id: 'bashlik', title: 'Bashlik', date: '1860s', culture: 'Asian, North', group: 'North Asian', region: 'Asia', year: 1865, medium: 'wool', slot: 'outer', url: met(107581) },
  { id: 'fan-brazilian', title: 'Fixed fan', date: '1865–75', culture: 'Brazilian', group: 'Brazilian', region: 'Americas', year: 1870, medium: 'ivory, feathers, beetles', slot: 'hand', url: met(157985) },
  { id: 'blouse-indian', title: 'Blouse', date: 'late 19th century', culture: 'Indian', group: 'Indian', region: 'Asia', year: 1875, medium: 'cotton, silk', slot: 'top', url: met(157713) },
  { id: 'shawl-moroccan', title: 'Shawl', date: 'ca. 1866', culture: 'possibly Moroccan', group: 'Moroccan', region: 'Africa', year: 1866, medium: 'wool, metallic', slot: 'shoulders', fit: { top: 20, h: 42 }, url: met(168800) },
  { id: 'skirt-british', title: 'Skirt', date: 'late 18th century', culture: 'British', group: 'British', region: 'Europe', year: 1775, medium: 'linen', slot: 'bottom', url: met(155201) },
  { id: 'hat-american', title: 'Hat', date: '1872', culture: 'American', group: 'American', region: 'Americas', year: 1872, medium: 'straw, silk, metal', slot: 'head', fit: { top: -4, h: 20 }, url: met(156553) },
  { id: 'brooch-peruvian', title: 'Brooch', date: '20th century', culture: 'Peruvian', group: 'Peruvian', region: 'Americas', year: 1900, medium: 'silver', slot: 'pin', url: met(107389) },
  { id: 'pectoral-panamanian', title: 'Pectoral', date: '11th–16th century', culture: 'Indigenous American (Panamanian)', group: 'Indigenous Panamanian', region: 'Americas', year: 1350, medium: 'gold, synthetic', slot: 'neck', url: met(141754) },
  { id: 'necklace-costa-rican', title: 'Necklace', date: '500 BCE–900 CE', culture: 'Indigenous American (Costa Rican)', group: 'Indigenous Costa Rican', region: 'Americas', year: 200, medium: 'jade', slot: 'neck', url: met(141757) },
  { id: 'coat-british', title: 'Coat', date: '1630–40', culture: 'British', group: 'British', region: 'Europe', year: 1635, medium: 'leather', slot: 'outer', fit: { top: 20, h: 46 }, url: met(81556) },
  { id: 'trousers-american', title: 'Trousers', date: '1800–1830', culture: 'American', group: 'American', region: 'Americas', year: 1815, medium: 'cotton, linen', slot: 'bottom', url: met(911443) },
  { id: 'hakama-japanese', title: 'Trousers ("hakama") associated with Kyogen', date: 'late 19th century', culture: 'Japan', group: 'Japanese', region: 'Asia', year: 1875, medium: 'hemp', slot: 'bottom', fit: { top: 44, h: 68 }, url: met(44633) },
  { id: 'headdress-russian', title: 'Headdress', date: 'early 19th century', culture: 'Russian', group: 'Russian', region: 'Europe', year: 1810, medium: 'silk, pearls, metal, cotton, paper', slot: 'head', fit: { top: -21, h: 40 }, url: met(155785) },
  { id: 'cap-polish', title: 'Cap', date: '1870–80', culture: 'Polish', group: 'Polish', region: 'Europe', year: 1875, medium: 'silk, metallic thread', slot: 'head', fit: { top: -10, h: 16 }, url: met(84580) },
  { id: 'purse-mexican', title: 'Coin purse', date: '1790–1810', culture: 'Mexican', group: 'Mexican', region: 'Americas', year: 1800, medium: 'glass, silk, metal', slot: 'hand', url: met(156682) },
  { id: 'ensemble-spanish', title: 'Ensemble', date: 'late 16th century', culture: 'Spanish', group: 'Spanish', region: 'Europe', year: 1575, medium: 'silk, linen', slot: 'dress', url: met(98291) },
  { id: 'bodice-european', title: 'Bodice', date: '18th century', culture: 'European', group: 'European', region: 'Europe', year: 1750, medium: 'silk, metal thread', slot: 'top', url: met(90397) },
  { id: 'bertha-belgian', title: 'Bertha', date: 'ca. 1890', culture: 'Belgian', group: 'Belgian', region: 'Europe', year: 1890, medium: 'linen', slot: 'shoulders', url: met(156799) },
  { id: 'frock-coat-philippine', title: 'Frock coat', date: '1840–49', culture: 'Philippine', group: 'Philippine', region: 'Asia', year: 1845, medium: 'cotton, piña', slot: 'outer', url: met(158133) },
  { id: 'smock-italian', title: 'Smock', date: 'late 16th century', culture: 'Italian', group: 'Italian', region: 'Europe', year: 1575, medium: 'linen, silk and metal thread', slot: 'dress', fit: { top: 18, h: 80 }, url: met(83861) },
  { id: 'skirt-french', title: 'Skirt', date: '1840–60', culture: 'French', group: 'French', region: 'Europe', year: 1850, medium: 'cotton', slot: 'bottom', fit: { top: 46, h: 52 }, url: met(156833) },
  { id: 'jacket-german', title: 'Jacket', date: '1898–1900', culture: 'German', group: 'German', region: 'Europe', year: 1899, medium: 'wool, brass, metal', slot: 'outer', fit: { top: 18, h: 50 }, url: met(104950) },
  { id: 'dress-irish', title: 'Dress', date: 'ca. 1875', culture: 'Irish', group: 'Irish', region: 'Europe', year: 1875, medium: 'silk', slot: 'dress', fit: { top: 18, h: 80 }, url: met(174693) },
].map((c) => ({ ...c, img: `${import.meta.env.BASE_URL}clothes/${c.id}.png` }))

// A dress covers both top and bottom, so they can't be worn together
export const CONFLICTS = {
  dress: ['top', 'bottom'],
  top: ['dress'],
  bottom: ['dress'],
}
