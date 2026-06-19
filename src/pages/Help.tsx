import { Link } from 'react-router'
import CheekoLogo from '@/components/ui/CheekoLogo'

const troubleshooting = [
  {
    title: 'Wi-Fi Connection Issues',
    description: 'Make sure Cheeko is connected to a 2.4GHz Wi-Fi network. 5GHz networks are not compatible with Cheeko.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
      </svg>
    ),
  },
  {
    title: 'Battery & Charging',
    description: 'Cheeko takes approximately 30 minutes to fully charge via USB-C. Battery lasts around 4 hours during active use.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z" />
      </svg>
    ),
  },
  {
    title: 'Audio Problems',
    description: 'Check volume settings and ensure the speaker grill isn\'t blocked. If the issue persists, try restarting the device.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>
    ),
  },
]

export default function Help() {
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
        <div className="max-w-[680px] mx-auto">

          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="font-display text-[40px] sm:text-[52px] font-bold text-[var(--text-primary)] leading-[1.1] mb-3">
              Help Center
            </h1>
            <p className="font-sans text-[17px] text-[var(--text-secondary)]">
              Get support and find answers to common questions.
            </p>
          </div>

          {/* Support cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {/* FAQ card */}
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = '/#faq'
              }}
              className="group rounded-2xl p-6 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--brand-primary)]"
                style={{ background: 'var(--brand-primary-soft)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <div>
                <p className="font-sans font-semibold text-[15px] text-[var(--text-primary)] mb-1">FAQ</p>
                <p className="font-sans text-[13px] text-[var(--text-secondary)]">Find answers to frequently asked questions.</p>
              </div>
            </a>

            {/* Email support card */}
            <a
              href="mailto:info@altio.me"
              className="group rounded-2xl p-6 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--brand-primary)]"
                style={{ background: 'var(--brand-primary-soft)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="font-sans font-semibold text-[15px] text-[var(--text-primary)] mb-1">Email Support</p>
                <p className="font-sans text-[13px] text-[var(--text-secondary)]">info@altio.me</p>
              </div>
            </a>
          </div>

          {/* Quick Troubleshooting */}
          <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-5">
            Quick Troubleshooting
          </h2>
          <div className="space-y-4 mb-12">
            {troubleshooting.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-5 flex items-start gap-4"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-[var(--brand-primary)]"
                  style={{ background: 'var(--brand-primary-soft)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="font-sans font-semibold text-[15px] text-[var(--text-primary)] mb-1">{item.title}</p>
                  <p className="font-sans text-[14px] text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Support hours */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: 'var(--brand-primary-soft)', border: '1px solid rgba(233,107,44,0.2)' }}
          >
            <p className="font-sans font-semibold text-[15px] text-[var(--text-primary)] mb-1">
              Our support team is available
            </p>
            <p className="font-sans text-[14px] text-[var(--text-secondary)] mb-4">
              Monday to Saturday, 10 AM – 7 PM IST
            </p>
            <a
              href="mailto:info@altio.me"
              className="inline-flex items-center font-sans font-semibold text-[14px] text-[var(--brand-primary)] hover:underline"
            >
              Contact Us →
            </a>
          </div>

        </div>
      </section>
    </main>
  )
}
