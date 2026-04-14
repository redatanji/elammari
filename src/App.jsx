import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef, lazy, Suspense, Component } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar         from './components/Navbar'
import CustomCursor   from './components/CustomCursor'
import PageTransition from './components/PageTransition'
import Scene3D        from './components/Scene3D'
import { setLenis, clearLenis } from './lib/lenis'

gsap.registerPlugin(ScrollTrigger)

/* ─── Lazy page chunks ───────────────────────────────────── */
const Home       = lazy(() => import('./pages/Home'))
const Properties = lazy(() => import('./pages/Properties'))
const About      = lazy(() => import('./pages/About'))
const Contact    = lazy(() => import('./pages/Contact'))

/* ─── Error boundary for the 3-D canvas ─────────────────── */
class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) return null   // silent fail — 3D is progressive enhancement
    return this.props.children
  }
}

/* ─── App ────────────────────────────────────────────────── */
export default function App() {
  const location = useLocation()
  const lenisRef = useRef(null)
  // Store the ticker fn so we can remove it on cleanup
  const tickRef  = useRef(null)

  /* ── Lenis: initialise once on mount ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis
    setLenis(lenis)

    // Keep ScrollTrigger in sync with every Lenis scroll tick
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's RAF so both share the same clock
    const tick = (time) => lenis.raf(time * 1000)
    tickRef.current = tick
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
      tickRef.current  = null
      clearLenis()
    }
  }, [])

  /* ── Route change: scroll to top + refresh triggers ── */
  useEffect(() => {
    const lenis = lenisRef.current
    if (lenis) {
      // Jump to top without animation — PageTransition handles the visual fade
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }

    // Defer ScrollTrigger.refresh() by one frame so React has committed the
    // new page DOM before ScrollTrigger measures element positions
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(raf)
  }, [location.pathname])

  return (
    <>
      <div className="grain"    aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <CustomCursor />

      {/* Fixed 3-D canvas — always present across all routes */}
      <div className="canvas-container">
        <SceneErrorBoundary>
          <Scene3D />
        </SceneErrorBoundary>
      </div>

      <Navbar />

      <PageTransition key={location.pathname}>
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/"           element={<Home />}       />
            <Route path="/properties" element={<Properties />} />
            <Route path="/about"      element={<About />}      />
            <Route path="/contact"    element={<Contact />}    />
          </Routes>
        </Suspense>
      </PageTransition>
    </>
  )
}
