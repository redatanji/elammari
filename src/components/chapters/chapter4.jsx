import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MATERIALS = [
  'Carrara Marble', 'Hammered Brass', 'Aged Oak',
  'Moroccan Cedar', 'Travertine', 'Murano Glass',
  'Hand-laid Zellige', 'Leather Boiserie',
  'Onyx Backlit Panels', 'Brushed Titanium',
]

export default function Chapter4() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const targets = [
        el.querySelector('.chapter-label'),
        el.querySelector('.gold-divider'),
        el.querySelector('.chapter-headline'),
        el.querySelector('.chapter-subline'),
      ]
      const tags = el.querySelectorAll('.material-tag')

      // Visibilità garantita
      gsap.set([...targets, ...tags], { opacity: 1, y: 0, scale: 1 })

      gsap.fromTo(targets,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end:   'top 25%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(tags,
        { opacity: 0, scale: 0.88, y: 10 },
        {
          opacity: 1, scale: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            end:   'top 20%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="chapter-4"
      className="chapter chapter--tall"
      ref={ref}
      style={{ alignItems: 'center', paddingTop: '10vh' }}
    >
      <div className="chapter-content chapter-content--right">
        <div className="chapter-label">Chapter IV · Materials</div>
        <div className="gold-divider" />
        <h2 className="chapter-headline">
          Every Detail,<br />a <em>Statement</em>
        </h2>
        <p className="chapter-subline">
          From hand-laid Carrara marble to bespoke hammered brass fixtures,
          every surface within an Elammari property is a deliberate choice —
          sourced from the world's finest ateliers and installed by artisans
          who treat their craft as a calling, not a trade.
        </p>
        <div className="material-tags">
          {MATERIALS.map((m) => (
            <span key={m} className="material-tag">{m}</span>
          ))}
        </div>
      </div>
    </section>
  )
}