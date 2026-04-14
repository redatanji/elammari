import { useEffect, useState } from 'react'
import { scrollTo } from '../lib/lenis'

const CHAPTERS = [
  { id: 'chapter-1', label: 'Welcome'  },
  { id: 'chapter-2', label: 'Design'   },
  { id: 'chapter-3', label: 'Location' },
  { id: 'chapter-4', label: 'Detail'   },
  { id: 'chapter-5', label: 'Contact'  },
]

export default function ScrollProgress() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = CHAPTERS.findIndex(c => c.id === entry.target.id)
            if (i !== -1) setActive(i)
          }
        })
      },
      { threshold: 0.4 }
    )
    CHAPTERS.forEach(c => {
      const el = document.getElementById(c.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const handleDotClick = (id) => {
    const el = document.getElementById(id)
    if (el) scrollTo(el, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  }

  return (
    <div className="scroll-progress">
      {CHAPTERS.map((c, i) => (
        <button
          key={c.id}
          className={`progress-dot ${i === active ? 'active' : ''}`}
          onClick={() => handleDotClick(c.id)}
          title={c.label}
        />
      ))}
      <span className="progress-label">
        {String(active + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
      </span>
    </div>
  )
}
