import paths from './data/worldPaths.json'

// Equirectangular world map; countries in `highlight` (ISO numeric ids) are filled in the accent color
export default function WorldMap({ highlight }) {
  const on = new Set(highlight)
  return (
    <svg className="world" viewBox="0 0 360 180" role="img" aria-label="Map of the cultures in this outfit">
      <rect width="360" height="180" className="sea" />
      {Object.entries(paths).map(([id, d]) => (
        <path key={id} d={d} className={on.has(id) ? 'land hit' : 'land'} />
      ))}
    </svg>
  )
}
