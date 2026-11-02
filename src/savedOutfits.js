import { CLOTHES } from './clothes.js'

export const BYID = Object.fromEntries(CLOTHES.map((c) => [c.id, c]))
export const MAX_SAVED = 20

const KEY = 'fashion-game-outfits'

// Saved outfits live only on this device
export function loadSaved() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function storeSaved(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    // storage full or blocked: the game still works without saving
  }
}

// Culture mix, timeline and span for one outfit (slot -> piece id)
export function summarize(outfit) {
  const pieces = Object.values(outfit).map((id) => BYID[id]).filter(Boolean)
  const cultureMix = Object.entries(
    pieces.reduce((acc, c) => ({ ...acc, [c.group]: (acc[c.group] || 0) + 1 }), {})
  ).sort((a, b) => b[1] - a[1])
  const timeline = [...pieces].sort((a, b) => a.year - b.year)
  const span = timeline.length > 1 ? timeline[timeline.length - 1].year - timeline[0].year : 0
  return { pieces, cultureMix, timeline, span }
}
