// Background colours for the figure: top and bottom of the gradient
export const BG_PRESETS = [
  { label: 'Sky', colors: ['#bfe3f5', '#eaf6fc'] },
  { label: 'Parlour', colors: ['#eadcc4', '#fbf6ee'] },
  { label: 'Dusk', colors: ['#c9a7b4', '#ece0e6'] },
  { label: 'Studio', colors: ['#b4bac3', '#eef0f3'] },
]
export const DEFAULT_BG = BG_PRESETS[0].colors

const KEY = 'fashion-game-bg'

export function loadBg() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null')
    return Array.isArray(v) && v.length === 2 ? v : DEFAULT_BG
  } catch {
    return DEFAULT_BG
  }
}

export function storeBg(colors) {
  try {
    localStorage.setItem(KEY, JSON.stringify(colors))
  } catch {
    // storage blocked: the choice simply won't be remembered
  }
}
