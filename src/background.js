// Background colours for the figure: top and bottom of the gradient
export const BG_PRESETS = [
  { label: 'Sky', colors: ['#5bb8ec', '#c4ebff'] },
  { label: 'Parlour', colors: ['#e8c48a', '#fff1d6'] },
  { label: 'Dusk', colors: ['#d46a94', '#f5c6d9'] },
  { label: 'Studio', colors: ['#7f8c9c', '#dfe5ec'] },
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
