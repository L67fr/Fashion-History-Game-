import { useState } from 'react'
import { CLOTHES } from './clothes.js'

// Every piece as an information card, oldest origin first
export default function PiecesPage() {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const pieces = [...CLOTHES]
    .sort((a, b) => a.year - b.year)
    .filter((c) => !q || [c.title, c.culture, c.medium, c.date].some((v) => v.toLowerCase().includes(q)))

  return (
    <section className="pieces">
      <div className="pieces-head">
        <h2>Pieces <span className="muted">({pieces.length})</span></h2>
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, culture, date or material" aria-label="Search pieces" />
      </div>
      <p className="muted">Oldest to newest by date of origin.</p>
      <ul className="piece-cards">
        {pieces.map((c) => (
          <li key={c.id} className="piece-card">
            <div className="piece-img">
              <img src={c.img} alt={c.title} loading="lazy" draggable="false" />
            </div>
            <div className="piece-body">
              <h3>{c.title}</h3>
              <dl>
                <dt>Date</dt><dd>{c.date}</dd>
                <dt>Culture</dt><dd>{c.culture}</dd>
                <dt>Medium</dt><dd>{c.medium}</dd>
              </dl>
              <a href={c.url} target="_blank" rel="noreferrer">View at The Met →</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
