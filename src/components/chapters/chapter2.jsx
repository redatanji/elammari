import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Chapter2() {
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
        ...el.querySelectorAll('.feature-list li'),
      ]

      // Visibilità garantita
      gsap.set(targets, { opacity: 1, x: 0 })

      gsap.fromTo(
        targets,
        { opacity: 0, x: 80 },
        {
          opacity: 1, x: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end:   'top 25%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="chapter-2"
      className="chapter chapter--tall"
      ref={ref}
      style={{ alignItems: 'center', paddingTop: '12vh' }}
    >
      <div className="chapter-content chapter-content--right">
        <div className="chapter-label">Chapter II · Architecture</div>
        <div className="gold-divider" />
        <h2 className="chapter-headline">
          Crafted for<br />the <em>Few</em>
        </h2>
        <p className="chapter-subline">
          Each Elammari residence emerges from a dialogue between the finest
          contemporary architects and master craftsmen who have honed their
          skills across generations. The result is architecture that transcends
          trend — structures of absolute permanence.
        </p>
        <ul className="feature-list">
          <li>Bespoke architectural blueprints for every property</li>
          <li>Integration of traditional Moroccan zellige &amp; carved stucco</li>
          <li>Sustainability-first structural engineering</li>
          <li>Private terraces facing the Strait of Gibraltar</li>
          <li>Temperature-regulated wine cellars &amp; spa suites</li>
          <li>Smart home automation by Crestron &amp; Lutron</li>
        </ul>
      </div>
    </section>
  )
}