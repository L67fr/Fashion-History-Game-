import { useState } from 'react'
import { BYID, MAX_SAVED, summarize } from './savedOutfits.js'
import { SLOTS } from './clothes.js'

// A small figure with the pieces placed the same way as on the main form
export function OutfitFigure({ outfit }) {
  return (
    <div className="mini-stage">
      <div className="figure">
        <img className="form" src={`${import.meta.env.BASE_URL}form.png`} alt="" draggable="false" />
        {Object.entries(outfit).map(([slot, id]) => {
          const c = BYID[id]
          if (!c) return null
          const s = { ...SLOTS[slot], ...c.fit }
          return (
            <img
              key={slot}
              className="worn"
              src={c.img}
              alt=""
              draggable="false"
              style={{ left: `${s.cx}%`, top: `${s.top}%`, height: `${s.h}%`, zIndex: s.z, transform: `translateX(-50%) scaleX(${s.scaleX ?? 1})`, cursor: 'default' }}
            />
          )
        })}
      </div>
    </div>
  )
}

// Culture mix and timeline, used by the hover card and the compare view
export function OutfitDetail({ outfit }) {
  const { cultureMix, timeline, span, pieces } = summarize(outfit)
  return (
    <div className="detail">
      {timeline.length > 1 && (
        <div className="span">
          <strong>{span}</strong>
          <span> years spanned</span>
        </div>
      )}
      <ul className="mix">
        {cultureMix.map(([name, count]) => {
          const pct = Math.round((count / pieces.length) * 100)
          return (
            <li key={name}>
              <span className="mix-label">{name}</span>
              <span className="bar"><span className="fill" style={{ width: `${pct}%` }} /></span>
              <span className="mix-pct">{pct}%</span>
            </li>
          )
        })}
      </ul>
      <ol className="timeline">
        {timeline.map((c) => (
          <li key={c.id}>
            <span className="when">{c.date.includes('century') ? `c. ${c.year}` : c.date}</span>
            <span className="what"><strong>{c.title}</strong>, {c.culture}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function SavedCard({ item, onLoad, onDelete }) {
  const [hover, setHover] = useState(false)
  return (
    <div className="saved-card" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <button className="saved-open" onClick={() => onLoad(item)} title="Load this outfit onto the form">
        <OutfitFigure outfit={item.outfit} />
        <span className="saved-name">{item.name}</span>
      </button>
      <button className="saved-del" onClick={() => onDelete(item.id)} aria-label={`Delete ${item.name}`}>×</button>
      {hover && (
        <div className="hover-card" onClick={() => onLoad(item)} title="Load this outfit onto the form">
          <strong>{item.name}</strong>
          <OutfitDetail outfit={item.outfit} />
        </div>
      )}
    </div>
  )
}

export default function SavedOutfits({ saved, onLoad, onDelete }) {
  const [comparing, setComparing] = useState(false)
  return (
    <section className="saved-wrap">
      <div className="saved-head">
        <h2>Saved outfits <span className="muted">({saved.length}/{MAX_SAVED})</span></h2>
        {saved.length > 1 && (
          <button onClick={() => setComparing((v) => !v)}>{comparing ? 'Hide comparison' : 'Compare all'}</button>
        )}
      </div>
      {saved.length === 0 ? (
        <p className="muted">Complete an outfit and save it to see it here.</p>
      ) : (
        <div className="saved-grid">
          {saved.map((item) => (
            <SavedCard key={item.id} item={item} onLoad={onLoad} onDelete={onDelete} />
          ))}
        </div>
      )}
      {comparing && saved.length > 1 && (
        <div className="compare">
          {saved.map((item) => (
            <div key={item.id} className="compare-col">
              <h3>{item.name}</h3>
              <OutfitFigure outfit={item.outfit} />
              <OutfitDetail outfit={item.outfit} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
