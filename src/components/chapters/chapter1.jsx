import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Chapter1() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const label    = el.querySelector('.chapter-label')
      const divider  = el.querySelector('.gold-divider')
      const headline = el.querySelector('.chapter-headline')
      const subline  = el.querySelector('.chapter-subline')
      const stats    = el.querySelectorAll('.stat-item')
      const hint     = el.querySelector('.hero-scroll-hint')

      // Visibilità garantita di default
      gsap.set([label, divider, headline, subline, ...stats, hint], {
        opacity: 1, y: 0, x: 0, scaleX: 1,
      })

      // Animazione entrata
      const tl = gsap.timeline({ delay: 2.5 })
      tl.fromTo(label,    { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
        .fromTo(divider,  { scaleX: 0 },          { scaleX: 1, duration: 0.55, ease: 'power2.inOut', transformOrigin: 'left' }, '-=0.35')
        .fromTo(headline, { opacity: 0, y: 44 },  { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.35')
        .fromTo(subline,  { opacity: 0, y: 20 },  { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }, '-=0.55')
        .fromTo(stats,    { opacity: 0, y: 20 },  { opacity: 1, y: 0, stagger: 0.12, duration: 0.7 }, '-=0.4')
        .fromTo(hint,     { opacity: 0 },          { opacity: 1, duration: 0.8 }, '-=0.3')

      // Scroll-out
      gsap.to(el.querySelector('.chapter-content'), {
        opacity: 0, y: -70,
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end:   '38% top',
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="chapter-1"
      className="chapter chapter--full"
      ref={ref}
      style={{ justifyContent: 'flex-start', paddingTop: '22vh' }}
    >
      <div className="chapter-content chapter-content--left">
        <div className="chapter-label">Chapter I · Tangier, Morocco</div>
        <div className="gold-divider" />
        <h1 className="chapter-headline">
          Where the <em>Mediterranean</em><br />Meets Luxury
        </h1>
        <p className="chapter-subline">
          At the crossroads of two continents and two seas, Elammari curates
          an exclusive collection of residences where Moroccan artistry and
          Mediterranean grandeur become one timeless expression of refined living.
        </p>
        <div className="stat-grid">
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Years of Excellence</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">48</div>
            <div className="stat-label">Properties Curated</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">€12M</div>
            <div className="stat-label">Avg. Portfolio Value</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Discreet Service</div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll to discover</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}