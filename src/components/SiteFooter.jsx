import { scrollTo } from '../lib/lenis'

const handleAnchor = (id) => {
  const el = document.getElementById(id)
  if (el) {
    scrollTo(el, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  }
}

export default function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        {/* Brand */}
        <div>
          <div className="footer-brand">ELAM<span>MARI</span></div>
          <div className="footer-tagline">Luxury Real Estate · Tangier, Morocco</div>
        </div>

        {/* Nav */}
        <div>
          <div className="footer-col-title">Navigation</div>
          <ul className="footer-links">
            {[
              ['chapter-1', 'Welcome'],
              ['chapter-2', 'Properties'],
              ['chapter-3', 'Location'],
              ['chapter-4', 'Design'],
              ['chapter-5', 'Contact'],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); handleAnchor(id) }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="footer-col-title">Contact</div>
          <address className="footer-address" style={{ fontStyle: 'normal' }}>
            12 Avenue Mohammed VI<br />
            Tangier 90000, Morocco<br />
            <br />
            <a href="tel:+212539000000">+212 539 000 000</a><br />
            <a href="mailto:contact@elammari.ma">contact@elammari.ma</a>
          </address>
        </div>
      </footer>

      <div className="footer-bottom">
        <span className="footer-copy">
          © 2025 Elammari Real Estate. All rights reserved.
        </span>
        <div className="footer-social">
          <a href="#" rel="noopener noreferrer">Instagram</a>
          <a href="#" rel="noopener noreferrer">LinkedIn</a>
          <a href="#" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
    </>
  )
}
