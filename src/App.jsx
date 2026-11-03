import { useEffect, useRef, useState } from 'react'
import { CLOTHES, SLOTS, CONFLICTS, FEATURES, FEAT_BY, FEATURE_CONFLICTS } from './clothes.js'
import { GROUP_COUNTRIES } from './regions.js'
import WorldMap from './WorldMap.jsx'
import SavedOutfits from './SavedOutfits.jsx'
import { BYID, MAX_SAVED, loadSaved, storeSaved, summarize } from './savedOutfits.js'
import { BG_PRESETS, loadBg, storeBg } from './background.js'
const CLICK_PX = 5 // pointer moves less than this = click, not drag

export default function App() {
  // outfit maps slot -> clothing id
  const [outfit, setOutfit] = useState({})
  const [filter, setFilter] = useState('all')
  const [done, setDone] = useState(false) // outfit is complete: form locked, results shown
  const [drag, setDrag] = useState(null) // { id, from: 'closet' | 'form', x, y, moved }
  const [features, setFeatures] = useState([]) // face features; several can be on at once
  const [saved, setSaved] = useState(loadSaved)
  const [bg, setBg] = useState(loadBg)
  const [name, setName] = useState('')
  const stageRef = useRef(null)

  useEffect(() => storeSaved(saved), [saved])

  // the figure and saved previews both read these two variables
  useEffect(() => {
    document.documentElement.style.setProperty('--sky1', bg[0])
    document.documentElement.style.setProperty('--sky2', bg[1])
    storeBg(bg)
  }, [bg])

  const worn = new Set(Object.values(outfit))

  function wear(id) {
    if (done) return
    const piece = BYID[id]
    const { slot } = piece
    setOutfit((o) => {
      const next = { ...o }
      for (const s of CONFLICTS[slot] || []) {
        // a short dress (coat and waistcoat) can be worn with a skirt or trousers
        const other = next[s] && BYID[next[s]]
        if (other?.short && piece.slot === 'bottom') continue
        if (piece.short && slot === 'dress' && s === 'bottom') continue
        delete next[s]
      }
      next[slot] = id
      return next
    })
  }

  function takeOff(id) {
    if (done) return
    setOutfit((o) => {
      const next = { ...o }
      delete next[BYID[id].slot]
      return next
    })
  }

  function startDrag(e, id, from) {
    if (done) return
    e.preventDefault()
    const start = { x: e.clientX, y: e.clientY }
    let state = { id, from, x: e.clientX, y: e.clientY, moved: false }
    setDrag(state)

    const move = (ev) => {
      const moved = state.moved || Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > CLICK_PX
      state = { ...state, x: ev.clientX, y: ev.clientY, moved }
      setDrag(state)
    }
    const up = (ev) => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      setDrag(null)
      if (!state.moved) {
        // a click: a worn piece comes off, otherwise a closet piece goes on
        if (from === 'form' || worn.has(id)) takeOff(id)
        else wear(id)
        return
      }
      const r = stageRef.current.getBoundingClientRect()
      const onStage = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom
      if (onStage) wear(id)
      else if (from === 'form') takeOff(id)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  function undress() {
    setOutfit({})
    setFeatures([])
    setDone(false)
  }

  function saveOutfit() {
    if (saved.length >= MAX_SAVED || !worn.size) return
    const item = { id: Date.now().toString(36), name: name.trim() || `Outfit ${saved.length + 1}`, outfit, features, bg }
    setSaved((list) => [...list, item])
    setName('')
  }

  function toggleFeature(id) {
    if (done) return
    setFeatures((list) => {
      if (list.includes(id)) return list.filter((x) => x !== id)
      const blocked = FEATURE_CONFLICTS[id] || []
      return [...list.filter((x) => !blocked.includes(x)), id]
    })
  }

  function loadOutfit(item) {
    setOutfit(item.outfit)
    setFeatures(item.features || [])
    setDone(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function deleteOutfit(id) {
    setSaved((list) => list.filter((item) => item.id !== id))
  }

  // results: share of each culture label among the worn pieces, and the pieces by date
  const { pieces, cultureMix, timeline, span } = summarize(outfit)

  const shown = CLOTHES.filter((c) => filter === 'all' || c.slot === filter)
  const dragging = drag?.moved && !done ? BYID[drag.id] : null

  return (
    <div className="app">
      <header>
        <h1>Historical Fashion Game</h1>
        <p>Drag clothing onto the form to create an outfit from pieces in the MET Costume Collection. Press Complete when you're finished.</p>
      </header>

      <main>
        <section className="stage-wrap">
          <div className="bg-row" aria-label="Background colour">
            {BG_PRESETS.map((p) => (
              <button
                key={p.label}
                className={bg[0] === p.colors[0] && bg[1] === p.colors[1] ? 'on' : ''}
                style={{ background: `linear-gradient(${p.colors[0]}, ${p.colors[1]})` }}
                onClick={() => setBg(p.colors)}
                title={p.label}
                aria-label={`${p.label} background`}
              />
            ))}
            <label className="bg-custom" title="Pick your own top and bottom colours">
              Custom
              <input type="color" value={bg[0]} onChange={(e) => setBg([e.target.value, bg[1]])} aria-label="Top colour" />
              <input type="color" value={bg[1]} onChange={(e) => setBg([bg[0], e.target.value])} aria-label="Bottom colour" />
            </label>
          </div>
          <div className="stage" ref={stageRef}>
            <div className="figure">
              <img className="form" src={`${import.meta.env.BASE_URL}form.png`} alt="Dress form" draggable="false" />
              {features.map((id) => FEAT_BY[id] && (
                <img key={id} className="feature" src={FEAT_BY[id].img} alt="" draggable="false" style={{ left: `calc(50% + ${FEAT_BY[id].x}cqh)`, top: `${FEAT_BY[id].y}cqh`, width: `${FEAT_BY[id].w}cqh` }} />
              ))}
              {Object.entries(outfit).map(([slot, id]) => {
              const c = BYID[id]
              const s = { ...SLOTS[slot], ...c.fit }
              const hidden = drag?.moved && drag.id === id
              return (
                <img
                  key={slot}
                  className="worn"
                  src={c.img}
                  alt={c.title}
                  draggable="false"
                  title={c.title}
                  style={{ left: `${s.cx}%`, top: `${s.top}%`, height: `${s.h}%`, zIndex: s.z, opacity: hidden ? 0.25 : 1, transform: `translateX(-50%) scaleX(${s.scaleX ?? 1})`, cursor: done ? 'default' : 'grab' }}
                  onPointerDown={(e) => startDrag(e, id, 'form')}
                />
              )
              })}
            </div>
            {drag?.moved && !done && <div className="drop-hint">Drop to dress the form</div>}
          </div>
          <div className="stage-actions">
            <button onClick={undress} disabled={!worn.size}>Undress</button>
            {done ? (
              <button onClick={() => setDone(false)}>Edit outfit</button>
            ) : (
              <button className="primary" onClick={() => setDone(true)} disabled={!worn.size}>Complete</button>
            )}
            <span>{worn.size} piece{worn.size === 1 ? '' : 's'} worn</span>
            {done && (
              <span className="save-inline">
                <input
                  type="text"
                  value={name}
                  maxLength={40}
                  placeholder="Name this outfit"
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveOutfit()}
                />
                <button className="primary" onClick={saveOutfit} disabled={saved.length >= MAX_SAVED}>Save to wardrobe</button>
              </span>
            )}
            {done && saved.length >= MAX_SAVED && <span className="muted">{MAX_SAVED} saved. Delete one to save more.</span>}
          </div>

          <div className="info">
            {!done ? (
              <p className="muted">Press Complete to see the cultures in your outfit and when each piece was made.</p>
            ) : (
              <>
                <h2>Your outfit</h2>
                <WorldMap highlight={[...new Set(cultureMix.flatMap(([name]) => GROUP_COUNTRIES[name] || []))]} />
                <h3>Culture mix</h3>
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
                <h3>Timeline</h3>
                {timeline.length > 1 && (
                  <div className="span">
                    <strong>{span}</strong>
                    <span> years spanned</span>
                  </div>
                )}
                <ol className="timeline">
                  {timeline.map((c) => (
                    <li key={c.id}>
                      <span className="when">{c.date.includes('century') ? `c. ${c.year}` : c.date}</span>
                      <span className="what">
                        <strong>{c.title}</strong>, {c.culture}
                        {' · '}
                        <a href={c.url} target="_blank" rel="noreferrer">View at The Met →</a>
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </section>

        <section className="closet">
          <div className="filters">
            <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All</button>
            {Object.entries(SLOTS).map(([key, s]) => (
              <button key={key} className={filter === key ? 'on' : ''} onClick={() => setFilter(key)}>{s.label}</button>
            ))}
            <button className={filter === 'features' ? 'on' : ''} onClick={() => setFilter('features')}>Features</button>
          </div>
          {filter === 'all' && (
            <ul className="feature-row">
              {FEATURES.map((f) => (
                <li key={f.id} className={features.includes(f.id) ? 'on' : ''}>
                  <button onClick={() => toggleFeature(f.id)} title={`${f.title}: click to add or remove`} disabled={done}>
                    <img src={f.img} alt={f.title} draggable="false" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          {filter === 'features' ? (
            <ul className="grid">
              {FEATURES.map((f) => (
                <li key={f.id} className={features.includes(f.id) ? 'worn-tile' : ''}>
                  <button onClick={() => toggleFeature(f.id)} title="Click to add or remove" disabled={done}>
                    <img src={f.img} alt={f.title} draggable="false" />
                  </button>
                  <span className="name">{f.title}</span>
                </li>
              ))}
            </ul>
          ) : (
          <ul className="grid">
            {shown.map((c) => (
              <li key={c.id} className={worn.has(c.id) ? 'worn-tile' : ''}>
                <button onPointerDown={(e) => startDrag(e, c.id, 'closet')} title="Drag onto the form, or click to wear" disabled={done}>
                  <img src={c.img} alt={c.title} draggable="false" loading="lazy" />
                </button>
                <span className="name">{c.title}</span>
              </li>
            ))}
          </ul>
          )}
        </section>
      </main>

      {dragging && (
        <img className="ghost" src={dragging.img} alt="" style={{ left: drag.x, top: drag.y }} />
      )}

      <SavedOutfits saved={saved} onLoad={loadOutfit} onDelete={deleteOutfit} />

      <footer>
        All garments: The Metropolitan Museum of Art, The Costume Institute (Open Access). Original Scratch game by lazerm67.
      </footer>
    </div>
  )
}
