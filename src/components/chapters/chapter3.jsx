import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Chapter3() {
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
        ...el.querySelectorAll('.stat-item'),
      ]

      // Visibilità garantita
      gsap.set(targets, { opacity: 1, y: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          end:   'top 25%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo(el.querySelector('.chapter-label'),   { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.65 })
        .fromTo(el.querySelector('.gold-divider'),     { scaleX: 0 },          { scaleX: 1, duration: 0.5, ease: 'power2.inOut', transformOrigin: 'left' }, '-=0.2')
        .fromTo(el.querySelector('.chapter-headline'), { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.3')
        .fromTo(el.querySelector('.chapter-subline'),  { opacity: 0 },          { opacity: 1, duration: 0.75 }, '-=0.45')
        .fromTo(el.querySelectorAll('.stat-item'),     { opacity: 0, y: 22 }, { opacity: 1, y: 0, stagger: 0.14, duration: 0.65 }, '-=0.35')
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="chapter-3"
      className="chapter chapter--tall"
      ref={ref}
      style={{ alignItems: 'center', paddingTop: '10vh' }}
    >
      <div className="chapter-content chapter-content--left">
        <div className="chapter-label">Chapter III · Location</div>
        <div className="gold-divider" />
        <h2 className="chapter-headline">
          Tangier,<br />the City of <em>Two Seas</em>
        </h2>
        <p className="chapter-subline">
          Positioned at Africa's northernmost tip, Tangier has long captivated
          diplomats, artists and monarchs alike. Today it stands as Morocco's
          most dynamic city — blending ancient medina mystique with world-class
          infrastructure and a 45-minute ferry crossing to Europe.
        </p>
        <div className="stat-grid">
          <div className="stat-item">
            <div className="stat-number">14km</div>
            <div className="stat-label">from Spain</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">320</div>
            <div className="stat-label">Sunny Days / Year</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3</div>
            <div className="stat-label">International Airports</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">∞</div>
            <div className="stat-label">Atlantic &amp; Med Views</div>
          </div>
        </div>
      </div>
    </section>
  )
}