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
  hand:      { label: 'Fans & purses',       cx: 80, top: 42, h: 25, z: 9 },
}

export const CLOTHES = [
  { id: 'ensemble-french', title: 'Ensemble', date: 'ca. 1730', culture: 'probably French', medium: 'wool; silk; metallic thread', slot: 'outer', url: 'https://www.metmuseum.org/art/collection/search?q=2004.411a' },
  { id: 'doublet-french', title: 'Doublet', date: 'early 1620s', culture: 'French', medium: 'silk', slot: 'top', url: met(81558) },
  { id: 'bashlik', title: 'Bashlik', date: '1860s', culture: 'Asian, North', medium: 'wool', slot: 'outer', url: met(107581) },
  { id: 'fan-brazilian', title: 'Fixed fan', date: '1865–75', culture: 'Brazilian', medium: 'ivory, feathers, beetles', slot: 'hand', url: met(157985) },
  { id: 'blouse-indian', title: 'Blouse', date: 'late 19th century', culture: 'Indian', medium: 'cotton, silk', slot: 'top', url: met(157713) },
  { id: 'shawl-moroccan', title: 'Shawl', date: 'ca. 1866', culture: 'possibly Moroccan', medium: 'wool, metallic', slot: 'shoulders', url: met(168800) },
  { id: 'skirt-british', title: 'Skirt', date: 'late 18th century', culture: 'British', medium: 'linen', slot: 'bottom', url: met(155201) },
  { id: 'hat-american', title: 'Hat', date: '1872', culture: 'American', medium: 'straw, silk, metal', slot: 'head', url: met(156553) },
  { id: 'brooch-peruvian', title: 'Brooch', date: '20th century', culture: 'Peruvian', medium: 'silver', slot: 'pin', url: met(107389) },
  { id: 'pectoral-panamanian', title: 'Pectoral', date: '11th–16th century', culture: 'Indigenous American (Panamanian)', medium: 'gold, synthetic', slot: 'neck', url: met(141754) },
  { id: 'necklace-costa-rican', title: 'Necklace', date: '500 BCE–900 CE', culture: 'Indigenous American (Costa Rican)', medium: 'jade', slot: 'neck', url: met(141757) },
  { id: 'coat-british', title: 'Coat', date: '1630–40', culture: 'British', medium: 'leather', slot: 'outer', url: met(81556) },
  { id: 'trousers-american', title: 'Trousers', date: '1800–1830', culture: 'American', medium: 'cotton, linen', slot: 'bottom', url: met(911443) },
  { id: 'hakama-japanese', title: 'Trousers ("hakama") associated with Kyogen', date: 'late 19th century', culture: 'Japan', medium: 'hemp', slot: 'bottom', url: met(44633) },
  { id: 'headdress-russian', title: 'Headdress', date: 'early 19th century', culture: 'Russian', medium: 'silk, pearls, metal, cotton, paper', slot: 'head', url: met(155785) },
  { id: 'cap-polish', title: 'Cap', date: '1870–80', culture: 'Polish', medium: 'silk, metallic thread', slot: 'head', url: met(84580) },
  { id: 'purse-mexican', title: 'Coin purse', date: '1790–1810', culture: 'Mexican', medium: 'glass, silk, metal', slot: 'hand', url: met(156682) },
  { id: 'ensemble-spanish', title: 'Ensemble', date: 'late 16th century', culture: 'Spanish', medium: 'silk, linen', slot: 'dress', url: met(98291) },
  { id: 'bodice-european', title: 'Bodice', date: '18th century', culture: 'European', medium: 'silk, metal thread', slot: 'top', url: met(90397) },
  { id: 'bertha-belgian', title: 'Bertha', date: 'ca. 1890', culture: 'Belgian', medium: 'linen', slot: 'shoulders', url: met(156799) },
  { id: 'frock-coat-philippine', title: 'Frock coat', date: '1840–49', culture: 'Philippine', medium: 'cotton, piña', slot: 'outer', url: met(158133) },
  { id: 'smock-italian', title: 'Smock', date: 'late 16th century', culture: 'Italian', medium: 'linen, silk and metal thread', slot: 'dress', fit: { top: 18, h: 80 }, url: met(83861) },
  { id: 'skirt-french', title: 'Skirt', date: '1840–60', culture: 'French', medium: 'cotton', slot: 'bottom', fit: { top: 46, h: 52 }, url: met(156833) },
  { id: 'jacket-german', title: 'Jacket', date: '1898–1900', culture: 'German', medium: 'wool, brass, metal', slot: 'outer', fit: { top: 18, h: 50 }, url: met(104950) },
  { id: 'dress-irish', title: 'Dress', date: 'ca. 1875', culture: 'Irish', medium: 'silk', slot: 'dress', fit: { top: 18, h: 80 }, url: met(174693) },
].map((c) => ({ ...c, img: `${import.meta.env.BASE_URL}clothes/${c.id}.png` }))

// A dress covers both top and bottom, so they can't be worn together
export const CONFLICTS = {
  dress: ['top', 'bottom'],
  top: ['dress'],
  bottom: ['dress'],
}
