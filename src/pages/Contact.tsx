import { useState } from 'react'
import { Link } from 'react-router'
import CheekoLogo from '@/components/ui/CheekoLogo'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:info@altio.me?subject=${encodeURIComponent(form.subject || 'Contact Form')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`)}`
  }

  const inputClass = "w-full font-sans text-[14px] text-[var(--text-primary)] rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--brand-primary)]"
  const inputStyle = { background: 'var(--bg-primary)', border: '1px solid var(--border)' }

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

      {/* Top nav bar */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-sans text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Link>
        <CheekoLogo className="h-8 w-auto" />
        <div className="w-12" />
      </div>

      <section className="px-6 pt-14 pb-24">
        <div className="max-w-[900px] mx-auto">

          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="font-display text-[40px] sm:text-[52px] font-bold text-[var(--text-primary)] leading-[1.1] mb-3">
              Contact Us
            </h1>
            <p className="font-sans text-[17px] text-[var(--text-secondary)]">
              We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Form */}
            <div
              className="lg:col-span-3 rounded-2xl p-8"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <h2 className="font-sans font-semibold text-[18px] text-[var(--text-primary)] mb-6">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Email side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[13px] font-medium text-[var(--text-secondary)] mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[13px] font-medium text-[var(--text-secondary)] mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>
                {/* Phone + Subject side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[13px] font-medium text-[var(--text-secondary)] mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[13px] font-medium text-[var(--text-secondary)] mb-1.5">Subject *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className={inputClass}
                      style={inputStyle}
                    >
                      <option value="">Select a topic</option>
                      <option>Product Question</option>
                      <option>Order Status</option>
                      <option>Return/Refund</option>
                      <option>Warranty Claim</option>
                      <option>Business Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-[13px] font-medium text-[var(--text-secondary)] mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Message"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full font-sans font-semibold text-[14px] text-white rounded-xl px-6 py-3 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: 'var(--brand-primary)' }}
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 flex flex-col gap-4">

              <h2 className="font-sans font-semibold text-[18px] text-[var(--text-primary)]">
                Get in touch
              </h2>

              {/* Email */}
              <div
                className="rounded-2xl p-5 flex items-start gap-4"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-[var(--brand-primary)]"
                  style={{ background: 'var(--brand-primary-soft)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-semibold text-[14px] text-[var(--text-primary)] mb-0.5">Email</p>
                  <a href="mailto:info@altio.me" className="font-sans text-[13px] text-[var(--brand-primary)] hover:underline">info@altio.me</a>
                  <p className="font-sans text-[12px] text-[var(--text-secondary)] mt-0.5">We reply within 24 hours</p>
                </div>
              </div>

              {/* Address */}
              <div
                className="rounded-2xl p-5 flex items-start gap-4"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-[var(--brand-primary)]"
                  style={{ background: 'var(--brand-primary-soft)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-semibold text-[14px] text-[var(--text-primary)] mb-0.5">Address</p>
                  <p className="font-sans text-[13px] text-[var(--text-secondary)]">Mumbai, Maharashtra</p>
                  <p className="font-sans text-[13px] text-[var(--text-secondary)]">India</p>
                </div>
              </div>

              {/* Business Hours */}
              <div
                className="rounded-2xl p-5 flex items-start gap-4"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-[var(--brand-primary)]"
                  style={{ background: 'var(--brand-primary-soft)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-semibold text-[14px] text-[var(--text-primary)] mb-0.5">Business Hours</p>
                  <p className="font-sans text-[13px] text-[var(--text-secondary)]">Monday - Saturday</p>
                  <p className="font-sans text-[13px] text-[var(--text-secondary)]">9:00 AM - 6:00 PM IST</p>
                </div>
              </div>

              {/* Quick Links */}
              <div
                className="rounded-2xl p-5"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <p className="font-sans font-semibold text-[14px] text-[var(--text-primary)] mb-3">Quick Links</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'FAQ', href: '/#faq' },
                    { label: 'Return & Refund Policy', href: '/refund' },
                    { label: 'Privacy Policy', href: '/privacy' },
                  ].map(link => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="font-sans text-[13px] text-[var(--brand-primary)] hover:underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
