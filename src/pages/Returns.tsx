import { Link } from 'react-router'
import CheekoLogo from '@/components/ui/CheekoLogo'

const steps = [
  {
    number: 1,
    title: 'Contact Us',
    description: 'Email us at info@altio.me with your order details and reason for return.',
  },
  {
    number: 2,
    title: 'Get Your Label',
    description: "We'll send you a prepaid return shipping label — no cost to you.",
  },
  {
    number: 3,
    title: 'Ship It Back',
    description: 'Pack the product in its original packaging and hand it to the courier.',
  },
  {
    number: 4,
    title: 'Receive Your Refund',
    description: 'Once we inspect the item, your refund is processed within 5–7 business days.',
  },
]

const eligible = [
  'Returned within 7 days of delivery',
  'In original packaging with all accessories',
  'No physical damage or alterations',
  'Returned within the defined return window',
]

const ineligible = [
  'Product shows physical damage',
  'Missing accessories or original packaging',
  'Return initiated after 7 days of delivery',
  'Product has been altered or tampered with',
]

export default function Returns() {
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
              Returns & Exchanges
            </h1>
            <p className="font-sans text-[17px] text-[var(--text-secondary)]">
              Our hassle-free return policy
            </p>
          </div>

          {/* Policy highlight */}
          <div
            className="rounded-2xl p-8 mb-10 text-center"
            style={{ background: 'var(--brand-primary-soft)', border: '1px solid rgba(233,107,44,0.2)' }}
          >
            <p className="font-sans font-semibold text-[13px] uppercase tracking-[0.12em] text-[var(--brand-primary)] mb-2">
              7-Day Return Policy
            </p>
            <p className="font-display text-[22px] font-bold text-[var(--text-primary)] mb-4">
              No questions asked, full refund guaranteed.
            </p>
            <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">
              We want you to love Cheeko. If you're not completely satisfied, simply initiate a return within 7 days of delivery. After we inspect the returned item, your refund will be processed within 5–7 business days.
            </p>
          </div>

          {/* How to Return */}
          <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-5">
            How to Return
          </h2>
          <div className="space-y-4 mb-10">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex items-start gap-5 rounded-2xl p-5"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <span
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-[14px] text-[var(--brand-primary)]"
                  style={{ background: 'var(--brand-primary-soft)' }}
                >
                  {step.number}
                </span>
                <div>
                  <p className="font-sans font-semibold text-[15px] text-[var(--text-primary)] mb-1">{step.title}</p>
                  <p className="font-sans text-[14px] text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Eligible / Not Eligible */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            <div
              className="rounded-2xl p-6"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <h3 className="font-sans font-semibold text-[15px] text-[var(--text-primary)] mb-4">
                Eligible for Return
              </h3>
              <ul className="space-y-3">
                {eligible.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: 'var(--brand-primary-soft)' }}
                    >
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                        <path d="M2 6l3 3 5-5" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="font-sans text-[14px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <h3 className="font-sans font-semibold text-[15px] text-[var(--text-primary)] mb-4">
                Not Eligible for Return
              </h3>
              <ul className="space-y-3">
                {ineligible.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: '#FFE5E5' }}
                    >
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                        <path d="M3 3l6 6M9 3l-6 6" stroke="#E05555" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="font-sans text-[14px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Need help */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            <p className="font-sans font-semibold text-[15px] text-[var(--text-primary)] mb-1">
              Need help with a return?
            </p>
            <p className="font-sans text-[14px] text-[var(--text-secondary)] mb-3">
              Our team is happy to assist you through the process.
            </p>
            <a
              href="mailto:info@altio.me"
              className="inline-flex items-center font-sans font-semibold text-[14px] text-[var(--brand-primary)] hover:underline"
            >
              Contact support →
            </a>
          </div>

        </div>
      </section>
    </main>
  )
}
