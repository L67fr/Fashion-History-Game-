import { useRef, useState } from 'react'
import { CLOTHES, SLOTS, CONFLICTS } from './clothes.js'

const BYID = Object.fromEntries(CLOTHES.map((c) => [c.id, c]))
const CLICK_PX = 5 // pointer moves less than this = click, not drag

export default function App() {
  // outfit maps slot -> clothing id
  const [outfit, setOutfit] = useState({})
  const [filter, setFilter] = useState('all')
  const [done, setDone] = useState(false) // outfit is complete: form locked, results shown
  const [drag, setDrag] = useState(null) // { id, from: 'closet' | 'form', x, y, moved }
  const stageRef = useRef(null)

  const worn = new Set(Object.values(outfit))

  function wear(id) {
    if (done) return
    const { slot } = BYID[id]
    setOutfit((o) => {
      const next = { ...o }
      for (const s of CONFLICTS[slot] || []) delete next[s]
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
    setDone(false)
  }

  // results: share of each culture label among the worn pieces, and the pieces by date
  const pieces = Object.values(outfit).map((id) => BYID[id])
  const cultureMix = Object.entries(
    pieces.reduce((acc, c) => ({ ...acc, [c.group]: (acc[c.group] || 0) + 1 }), {})
  ).sort((a, b) => b[1] - a[1])
  const timeline = [...pieces].sort((a, b) => a.year - b.year)

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
          <div className="stage" ref={stageRef}>
            <img className="form" src={`${import.meta.env.BASE_URL}form.png`} alt="Dress form" draggable="false" />
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
                  style={{ left: `${s.cx}%`, top: `${s.top}%`, height: `${s.h}%`, zIndex: s.z, opacity: hidden ? 0.25 : 1, cursor: done ? 'default' : 'grab' }}
                  onPointerDown={(e) => startDrag(e, id, 'form')}
                />
              )
            })}
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
          </div>

          <div className="info">
            {!done ? (
              <p className="muted">Press Complete to see the cultures in your outfit and when each piece was made.</p>
            ) : (
              <>
                <h2>Your outfit</h2>
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
                <ol className="timeline">
                  {timeline.map((c) => (
                    <li key={c.id}>
                      <span className="when">{c.date}</span>
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
          </div>
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
        </section>
      </main>

      {dragging && (
        <img className="ghost" src={dragging.img} alt="" style={{ left: drag.x, top: drag.y }} />
      )}

      <footer>
        All garments: The Metropolitan Museum of Art, The Costume Institute (Open Access). Original Scratch game by lazerm67.
      </footer>
    </div>
  )
}
