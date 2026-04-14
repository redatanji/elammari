import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar" role="navigation">
      <Link className="navbar-logo" to="/">ELAM<span>MARI</span></Link>

      <ul className="navbar-links">
        <li><Link to="/properties" className={location.pathname === '/properties' ? 'nav-active' : ''}>Properties</Link></li>
        <li><Link to="/about"      className={location.pathname === '/about'      ? 'nav-active' : ''}>About</Link></li>
        <li><Link to="/contact"    className={location.pathname === '/contact'    ? 'nav-active' : ''}>Contact</Link></li>
      </ul>

      <Link className="btn-primary navbar-contact" to="/contact">
        Inquire <span className="arrow">→</span>
      </Link>
    </nav>
  )
}
