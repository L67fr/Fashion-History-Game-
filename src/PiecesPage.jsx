import { useState } from 'react'
import { CLOTHES } from './clothes.js'
import { FUN_FACTS } from './funFacts.js'
import { GLOSSARY } from './glossary.js'

// Every piece as an information card, oldest origin first
// Splits text into plain words and clickable glossary terms
export function Fact({ text }) {
  const [open, setOpen] = useState(null)
  const terms = Object.keys(GLOSSARY)
  const pattern = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi')
  const parts = text.split(pattern)
  return (
    <>
      {parts.map((part, i) => {
        const key = part.toLowerCase()
        if (!GLOSSARY[key]) return <span key={i}>{part}</span>
        return (
          <span key={i} className="term-wrap">
            <button type="button" className="term" onClick={(e) => { e.stopPropagation(); setOpen(open === i ? null : i) }}>{part}</button>
            {open === i && <span className="term-def" role="note">{GLOSSARY[key]}</span>}
          </span>
        )
      })}
    </>
  )
}

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
            <div
              className="piece-img"
              onMouseLeave={(e) => {
                // send the fact back to its first line when the picture is left
                const fact = e.currentTarget.querySelector('.fun-fact')
                if (fact) fact.scrollTop = 0
              }}
            >
              <img src={c.img} alt={c.title} loading="lazy" draggable="false" />
              {FUN_FACTS[c.id] && <div className="fun-fact" role="note"><Fact text={FUN_FACTS[c.id]} /></div>}
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
