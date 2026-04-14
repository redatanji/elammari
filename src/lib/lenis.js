/**
 * Lenis singleton — initialized once in App.jsx.
 * Any component can import { scrollTo } to drive smooth navigation.
 */

let _lenis = null

/** Called by App.jsx after constructing the Lenis instance. */
export function setLenis(instance) {
  _lenis = instance
}

/** Called by App.jsx cleanup to avoid stale references. */
export function clearLenis() {
  _lenis = null
}

/** Returns the raw Lenis instance (may be null before App mounts). */
export function getLenis() {
  return _lenis
}

/**
 * Scroll to a target — uses Lenis when available, falls back to native.
 * @param {string|number|Element} target - CSS selector, scroll offset, or DOM element
 * @param {object} [options] - Lenis options (immediate, duration, offset, …)
 */
export function scrollTo(target, options = {}) {
  if (_lenis) {
    _lenis.scrollTo(target, options)
    return
  }
  // Native fallback
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
  } else if (typeof target === 'string') {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  } else if (target instanceof Element) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
