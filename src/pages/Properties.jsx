import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SiteFooter from '../components/SiteFooter'

gsap.registerPlugin(ScrollTrigger)

const PROPERTIES = [
  {
    id: 1,
    name: 'Villa Cap Spartel',
    location: 'Cap Spartel, Tangier',
    price: '€4,200,000',
    beds: 6, baths: 5, sqm: 820,
    tag: 'Sea View',
    desc: 'Perched above the confluence of the Atlantic and Mediterranean, this six-bedroom villa commands uninterrupted panoramic views from every room.',
  },
  {
    id: 2,
    name: 'Penthouse La Montagne',
    location: 'La Montagne, Tangier',
    price: '€2,850,000',
    beds: 4, baths: 4, sqm: 480,
    tag: 'Penthouse',
    desc: 'An architectural statement atop Tangier\'s most prestigious hill, where floor-to-ceiling glass frames the city, the strait and the Spanish coastline.',
  },
  {
    id: 3,
    name: 'Riad Marshan',
    location: 'Marshan, Tangier',
    price: '€1,750,000',
    beds: 5, baths: 4, sqm: 620,
    tag: 'Historic',
    desc: 'A meticulously restored 19th-century riad in the diplomatic quarter, where original Andalusian tilework meets contemporary luxury interiors.',
  },
  {
    id: 4,
    name: 'Villa Diplomatique',
    location: 'Quartier Diplomatique, Tangier',
    price: '€6,500,000',
    beds: 8, baths: 7, sqm: 1200,
    tag: 'Ultra Premium',
    desc: 'Once home to a European ambassador, this landmark estate sits on 3,000m² of manicured gardens with a heated pool and private guest house.',
  },
  {
    id: 5,
    name: 'Résidence Malabata',
    location: 'Malabata, Tangier',
    price: '€3,100,000',
    beds: 5, baths: 5, sqm: 650,
    tag: 'Beachfront',
    desc: 'Directly on Malabata\'s golden shoreline, this contemporary residence offers private beach access and a seamless indoor-outdoor living experience.',
  },
  {
    id: 6,
    name: 'Palais Casbah',
    location: 'Casbah, Tangier',
    price: '€2,200,000',
    beds: 6, baths: 5, sqm: 740,
    tag: 'Casbah',
    desc: 'A rare gem within the ancient Casbah walls — fully modernised while preserving original cedar ceilings, hand-carved plaster and mosaic fountains.',
  },
]

function PropertyCard({ prop, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 1, y: 0 })

      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: index * 0.08,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [index])

  return (
    <div ref={ref} className="property-card" style={{ opacity: 0 }}>
      <div className="property-image">
        <div className="property-image-inner">
          <div className="property-number">0{prop.id}</div>
        </div>
        <span className="property-tag">{prop.tag}</span>
      </div>

      <div className="property-body">
        <div className="property-location">{prop.location}</div>
        <h3 className="property-name">{prop.name}</h3>
        <p className="property-desc">{prop.desc}</p>

        <div className="property-specs">
          <span>{prop.beds} Beds</span>
          <span>{prop.baths} Baths</span>
          <span>{prop.sqm} m²</span>
        </div>

        <div className="property-footer">
          <div className="property-price">{prop.price}</div>
          <Link
            to="/contact"
            className="btn-primary"
            style={{ fontSize: '0.62rem', padding: '0.7rem 1.5rem' }}
          >
            Inquire <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Properties() {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.set(el.querySelectorAll('.anim'), { opacity: 1, y: 0 })
      gsap.fromTo(
        el.querySelectorAll('.anim'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-content">
          <div className="chapter-label anim">Elammari · Curated Collection</div>
          <div className="gold-divider anim" />
          <h1
            className="chapter-headline anim"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
          >
            Exceptional<br /><em>Properties</em>
          </h1>
          <p className="chapter-subline anim" style={{ maxWidth: '500px' }}>
            Six residences selected for those who refuse to compromise.
            Each property is a private world — available exclusively
            through Elammari.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="properties-grid-section">
        <div className="properties-grid">
          {PROPERTIES.map((prop, i) => (
            <PropertyCard key={prop.id} prop={prop} index={i} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
