import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SiteFooter from '../components/SiteFooter'

gsap.registerPlugin(ScrollTrigger)

const INIT = {
  firstName: '', lastName: '',
  email: '', phone: '',
  budget: '', interest: '',
  message: '',
}

export default function Contact() {
  const heroRef         = useRef(null)
  const submitTimerRef  = useRef(null)
  const [form, setForm] = useState(INIT)
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const onChange = (e) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    setBusy(true)
    submitTimerRef.current = setTimeout(() => { setSent(true); setBusy(false) }, 1200)
  }

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
          stagger: 0.12,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    }, el)

    return () => {
      ctx.revert()
      if (submitTimerRef.current) clearTimeout(submitTimerRef.current)
    }
  }, [])

  return (
    <div className="page-wrapper">
      <section className="contact-page-section" ref={heroRef}>
        <div className="contact-page-grid">

          {/* ── Left — Info ── */}
          <div className="contact-info">
            <div className="chapter-label anim">Elammari · Private Advisory</div>
            <div className="gold-divider anim" />
            <h1
              className="chapter-headline anim"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Let Us Find<br /><em>Your Home</em>
            </h1>
            <p className="chapter-subline anim">
              Our advisors are available by appointment only.
              Share your requirements below and we will respond
              within 24 hours in complete discretion.
            </p>

            <div className="contact-details anim">
              <div className="contact-detail-item">
                <div className="contact-detail-label">Office</div>
                <div className="contact-detail-value">
                  12 Avenue Mohammed VI<br />
                  Tangier 90000, Morocco
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-label">Phone</div>
                <div className="contact-detail-value">
                  <a href="tel:+212539000000">+212 539 000 000</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-label">Email</div>
                <div className="contact-detail-value">
                  <a href="mailto:contact@elammari.ma">contact@elammari.ma</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-label">Hours</div>
                <div className="contact-detail-value">
                  Mon – Fri, 9:00 – 18:00<br />
                  Sat by appointment
                </div>
              </div>
            </div>
          </div>

          {/* ── Right — Form ── */}
          <div className="contact-form-wrapper anim">
            {!sent ? (
              <form className="contact-form" onSubmit={onSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName" name="firstName" type="text"
                      placeholder="Your name"
                      value={form.firstName} onChange={onChange} required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName" name="lastName" type="text"
                      placeholder="Your surname"
                      value={form.lastName} onChange={onChange} required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="your@email.com"
                      value={form.email} onChange={onChange} required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone" name="phone" type="tel"
                      placeholder="+212 ·····"
                      value={form.phone} onChange={onChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="budget">Investment Range</label>
                    <select
                      id="budget" name="budget"
                      value={form.budget} onChange={onChange}
                    >
                      <option value="">Select a range</option>
                      <option value="1m-3m">€1M – €3M</option>
                      <option value="3m-7m">€3M – €7M</option>
                      <option value="7m-15m">€7M – €15M</option>
                      <option value="15m+">€15M+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="interest">Property Type</label>
                    <select
                      id="interest" name="interest"
                      value={form.interest} onChange={onChange}
                    >
                      <option value="">Select type</option>
                      <option value="villa">Villa</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="riad">Riad</option>
                      <option value="estate">Estate</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message" name="message"
                    placeholder="Tell us about your ideal residence…"
                    value={form.message} onChange={onChange}
                    rows={4}
                  />
                </div>

                <div className="form-submit">
                  <button
                    type="submit"
                    className="btn-secondary"
                    disabled={busy}
                  >
                    {busy ? 'Sending…' : 'Send Inquiry →'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="form-success">
                <div className="form-success-icon">✦</div>
                <h3>Thank You</h3>
                <p>
                  Your inquiry has been received. Nasser Elammari's office
                  will contact you within 24 hours in complete discretion.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
