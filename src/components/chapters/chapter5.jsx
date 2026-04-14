import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INIT = {
  firstName: '', lastName: '',
  email: '', phone: '',
  budget: '', message: '',
}

export default function Chapter5() {
  const ref        = useRef(null)
  const [sent, setSent]  = useState(false)
  const [form, setForm]  = useState(INIT)
  const [busy, setBusy]  = useState(false)

  const onChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submitTimerRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()
    setBusy(true)
    submitTimerRef.current = setTimeout(() => { setSent(true); setBusy(false) }, 1200)
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const panel = el.querySelector('.cta-panel')

      // Visibilità garantita
      gsap.set(panel, { opacity: 1, y: 0, scale: 1 })

      gsap.fromTo(panel,
        { opacity: 0, y: 64, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.3, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end:   'top 25%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => {
      ctx.revert()
      if (submitTimerRef.current) clearTimeout(submitTimerRef.current)
    }
  }, [])

  return (
    <section
      id="chapter-5"
      className="chapter chapter--full"
      ref={ref}
      style={{ alignItems: 'center', paddingTop: '8vh', paddingBottom: '8vh' }}
    >
      <div className="cta-panel">
        {!sent ? (
          <>
            <div className="chapter-label" style={{ justifyContent: 'center' }}>
              Chapter V · Your Future Home
            </div>
            <div className="gold-divider" />
            <h2 className="cta-headline">
              Your Home<br />
              <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Awaits</em>
            </h2>
            <p className="cta-sub">
              Begin a private conversation with our estate advisors.
              No obligation — only discretion.
            </p>
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" name="firstName" type="text" placeholder="Your name" value={form.firstName} onChange={onChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" name="lastName" type="text" placeholder="Your surname" value={form.lastName} onChange={onChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={onChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="+212 ·····" value={form.phone} onChange={onChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="budget">Investment Range</label>
                <select id="budget" name="budget" value={form.budget} onChange={onChange}>
                  <option value="">Select a range</option>
                  <option value="1m-3m">€1M – €3M</option>
                  <option value="3m-7m">€3M – €7M</option>
                  <option value="7m-15m">€7M – €15M</option>
                  <option value="15m+">€15M+</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell us about your ideal residence…" value={form.message} onChange={onChange} rows={3} />
              </div>
              <div className="form-submit">
                <button type="submit" className="btn-secondary" disabled={busy}>
                  {busy ? 'Sending…' : 'Send Inquiry →'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ padding: '4rem 0' }}>
            <div style={{ fontSize: '3.5rem', color: 'var(--gold)', marginBottom: '1.5rem', fontFamily: 'var(--serif)' }}>✦</div>
            <h3 className="cta-headline" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Thank You</h3>
            <p className="cta-sub" style={{ marginBottom: 0 }}>
              Your inquiry has been received. An Elammari advisor will contact you within 24 hours in complete discretion.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}