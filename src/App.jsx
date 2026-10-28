import { useRef, useState } from 'react'
import { CLOTHES, SLOTS, CONFLICTS } from './clothes.js'

const BYID = Object.fromEntries(CLOTHES.map((c) => [c.id, c]))
const CLICK_PX = 5 // pointer moves less than this = click, not drag

export default function App() {
  // outfit maps slot -> clothing id
  const [outfit, setOutfit] = useState({})
  const [filter, setFilter] = useState('all')
  const [info, setInfo] = useState(null)
  const [drag, setDrag] = useState(null) // { id, from: 'closet' | 'form', x, y, moved }
  const stageRef = useRef(null)

  const worn = new Set(Object.values(outfit))

  function wear(id) {
    const { slot } = BYID[id]
    setOutfit((o) => {
      const next = { ...o }
      for (const s of CONFLICTS[slot] || []) delete next[s]
      next[slot] = id
      return next
    })
    setInfo(BYID[id])
  }

  function takeOff(id) {
    setOutfit((o) => {
      const next = { ...o }
      delete next[BYID[id].slot]
      return next
    })
  }

  function startDrag(e, id, from) {
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
        // a click: closet items go on, worn items show their info
        if (from === 'closet') wear(id)
        else setInfo(BYID[id])
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

  const shown = CLOTHES.filter((c) => filter === 'all' || c.slot === filter)
  const dragging = drag?.moved ? BYID[drag.id] : null

  return (
    <div className="app">
      <header>
        <h1>Historical Fashion Game</h1>
        <p>Drag clothing onto the form to create different outfits from pieces in the MET Costume Collection.</p>
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
                  title={`${c.title}, ${c.date}`}
                  style={{ left: `${s.cx}%`, top: `${s.top}%`, height: `${s.h}%`, zIndex: s.z, opacity: hidden ? 0.25 : 1 }}
                  onPointerDown={(e) => startDrag(e, id, 'form')}
                />
              )
            })}
            {drag?.moved && <div className="drop-hint">Drop to dress the form</div>}
          </div>
          <div className="stage-actions">
            <button onClick={() => { setOutfit({}); setInfo(null) }} disabled={!worn.size}>Undress</button>
            <span>{worn.size} piece{worn.size === 1 ? '' : 's'} worn</span>
          </div>

          <div className="info">
            {info ? (
              <>
                <h2>{info.title}</h2>
                <dl>
                  <dt>Date</dt><dd>{info.date}</dd>
                  <dt>Culture</dt><dd>{info.culture}</dd>
                  <dt>Medium</dt><dd>{info.medium}</dd>
                </dl>
                <a href={info.url} target="_blank" rel="noreferrer">View at The Met →</a>
              </>
            ) : (
              <p className="muted">Click any piece to learn about it. Drag a piece off the form to take it off.</p>
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
                <button onPointerDown={(e) => startDrag(e, c.id, 'closet')} title="Drag onto the form, or click to wear">
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
