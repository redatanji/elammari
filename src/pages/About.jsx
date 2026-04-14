import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SiteFooter from '../components/SiteFooter'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  {
    n: '01',
    title: 'Discretion',
    desc: 'Every mandate entrusted to Elammari is handled with absolute confidentiality. We do not advertise our clients, their acquisitions, or their intentions. Discretion is not a service we offer — it is the foundation upon which our house was built.',
  },
  {
    n: '02',
    title: 'Curation',
    desc: 'We represent fewer than fifty properties at any given time. Each residence is selected personally by Nasser Elammari following a rigorous evaluation of architectural integrity, location premium, and long-term value. We do not list — we curate.',
  },
  {
    n: '03',
    title: 'Legacy',
    desc: 'Elammari approaches every transaction with a generational perspective. The properties we present are not acquisitions — they are inheritances in the making. We counsel our clients not on what to buy, but on what to keep.',
  },
  {
    n: '04',
    title: 'Craftsmanship',
    desc: 'From the structural integrity of the foundations to the provenance of the stone on the terraces, every detail is subject to the same uncompromising standard. We work exclusively with architects and craftsmen whose work stands the test of decades.',
  },
]

const MILESTONES = [
  { year: '2008', event: 'Elammari founded in Tangier by Nasser Elammari following a decade in international property advisory.' },
  { year: '2011', event: 'First ultra-prime mandate secured — a 1,400m² estate on Cap Spartel, sold privately within 60 days.' },
  { year: '2015', event: 'Expansion of advisory services to include architectural oversight and bespoke renovation management.' },
  { year: '2019', event: 'Recognition as Tangier\'s leading private real estate advisory by the Moroccan Federation of Real Estate.' },
  { year: '2023', event: 'Total portfolio value under advisory exceeds €280 million across residential and heritage properties.' },
]

export default function About() {
  const heroRef      = useRef(null)
  const missionRef   = useRef(null)
  const valuesRef    = useRef(null)
  const milestoneRef = useRef(null)
  const founderRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const hero = heroRef.current
      if (hero) {
        gsap.set(hero.querySelectorAll('.anim'), { opacity: 1, y: 0 })
        gsap.fromTo(
          hero.querySelectorAll('.anim'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power3.out', delay: 0.3 }
        )
      }

      // Mission
      const mission = missionRef.current
      if (mission) {
        gsap.set(mission.querySelectorAll('.anim'), { opacity: 1, y: 0 })
        gsap.fromTo(
          mission.querySelectorAll('.anim'),
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: mission,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Values
      const vals = valuesRef.current
      if (vals) {
        gsap.set(vals.querySelectorAll('.value-item'), { opacity: 1, y: 0 })
        gsap.fromTo(
          vals.querySelectorAll('.value-item'),
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: vals,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Milestones
      const miles = milestoneRef.current
      if (miles) {
        gsap.set(miles.querySelectorAll('.milestone-item'), { opacity: 1, x: 0 })
        gsap.fromTo(
          miles.querySelectorAll('.milestone-item'),
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: miles,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Founder
      const founder = founderRef.current
      if (founder) {
        gsap.set(founder.querySelectorAll('.anim'), { opacity: 1, y: 0 })
        gsap.fromTo(
          founder.querySelectorAll('.anim'),
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: founder,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="page-wrapper">

      {/* ── Hero ── */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-content">
          <div className="chapter-label anim">Elammari · Est. Tangier 2008</div>
          <div className="gold-divider anim" />
          <h1
            className="chapter-headline anim"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
          >
            A House Built on<br /><em>Conviction</em>
          </h1>
          <p className="chapter-subline anim" style={{ maxWidth: '540px' }}>
            Elammari was not founded to sell properties. It was founded to
            protect them — and to ensure that those who acquire them do so
            with complete knowledge, complete confidence, and complete peace of mind.
          </p>
          <Link
            to="/contact"
            className="btn-primary anim"
            style={{ display: 'inline-flex', marginTop: '1.5rem' }}
          >
            Request a Private Meeting <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="about-stats-section">
        <div className="about-stats">
          {[
            { n: '15+',   l: 'Years Active'       },
            { n: '48',    l: 'Properties Advised'  },
            { n: '€280M', l: 'Total Portfolio'     },
            { n: '100%',  l: 'Private Mandates'    },
          ].map((s) => (
            <div key={s.l} className="about-stat">
              <div className="stat-number">{s.n}</div>
              <div className="stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="about-mission-section" ref={missionRef}>
        <div className="about-mission-grid">
          <div className="about-mission-left">
            <div className="chapter-label anim">Our Mission</div>
            <div className="gold-divider anim" />
            <h2 className="chapter-headline anim">
              Not an Agency.<br /><em>An Advisory House.</em>
            </h2>
          </div>
          <div className="about-mission-right">
            <p className="about-mission-text anim">
              The distinction matters. An agency lists. An advisory house counsels.
              At Elammari, we do not present our clients with catalogues — we present
              them with considered recommendations, informed by years of market
              intelligence, personal relationships with owners, and an intimate
              understanding of Tangier's most exclusive enclaves.
            </p>
            <p className="about-mission-text anim">
              Our mandates are private. Our transactions are discreet. Our results
              speak through the satisfaction of clients who return — not because
              they must, but because they trust no one else with decisions of
              this magnitude.
            </p>
            <p className="about-mission-text anim">
              Tangier is not merely our market. It is our home. We have watched
              this city transform from a diplomatic enclave into one of Africa's
              most compelling luxury destinations — and we have been instrumental
              in shaping that transformation, one exceptional property at a time.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values-section" ref={valuesRef}>
        <div className="section-header">
          <div className="chapter-label">Our Philosophy</div>
          <div className="gold-divider" />
          <h2 className="chapter-headline">
            Four Principles.<br /><em>No Exceptions.</em>
          </h2>
        </div>
        <div className="values-grid">
          {VALUES.map((v) => (
            <div key={v.n} className="value-item" style={{ opacity: 0 }}>
              <div className="value-number">{v.n}</div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Milestones ── */}
      <section className="about-milestones-section" ref={milestoneRef}>
        <div className="section-header">
          <div className="chapter-label">Our History</div>
          <div className="gold-divider" />
          <h2 className="chapter-headline">
            Fifteen Years of<br /><em>Quiet Excellence</em>
          </h2>
        </div>
        <div className="milestones-list">
          {MILESTONES.map((m) => (
            <div key={m.year} className="milestone-item" style={{ opacity: 0 }}>
              <div className="milestone-year">{m.year}</div>
              <div className="milestone-line" />
              <div className="milestone-event">{m.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="about-founder-section" ref={founderRef}>
        <div className="about-founder-grid">
          <div className="founder-avatar-wrap anim">
            <div className="founder-avatar">
              <div className="founder-initials">NE</div>
            </div>
            <div className="founder-signature">Nasser Elammari</div>
            <div className="founder-title-tag">Founder & Managing Director</div>
          </div>

          <div className="founder-bio">
            <div className="chapter-label anim">The Founder</div>
            <div className="gold-divider anim" />
            <h2 className="chapter-headline anim">
              Nasser<br /><em>Elammari</em>
            </h2>
            <p className="chapter-subline anim">
              Born in Tangier, Nasser Elammari spent the formative years of his
              career in international property advisory, working across Casablanca,
              Paris and Geneva before returning to his native city with a singular
              ambition — to create an advisory house that reflected the true
              character and potential of Tangier's luxury market.
            </p>
            <p className="chapter-subline anim">
              In 2008, at a time when Tangier was only beginning to attract the
              international attention it deserved, Nasser founded Elammari with
              a portfolio of three properties and a philosophy that has never
              changed: represent fewer clients, know every property personally,
              and never compromise on the quality of counsel.
            </p>
            <p className="chapter-subline anim">
              Today, Elammari is recognised as the most discreet and most trusted
              name in Tangier's ultra-prime residential market. Nasser continues
              to oversee every mandate personally — a practice he considers
              not a burden, but a privilege.
            </p>
            <blockquote className="founder-quote anim">
              "A property of this quality deserves to be understood before it
              is acquired. My role is to ensure that understanding is complete."
              <cite>— Nasser Elammari</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
