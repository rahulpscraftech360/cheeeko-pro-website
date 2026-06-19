
const shippingDetails = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: 'Free Shipping',
    description: 'Complimentary shipping nationwide with no minimum purchase requirement.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: 'Delivery Timeframe',
    description: 'Standard delivery in 5–7 business days. Metro areas receive expedited delivery in 3–5 days.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: 'Service Area',
    description: 'We currently ship to all major cities and towns across India. International shipping coming soon.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
    title: 'Order Tracking',
    description: 'Receive email and SMS notifications with real-time tracking details as soon as your order ships.',
  },
]

const guidelines = [
  'Orders placed before 2 PM IST are processed the same day',
  'Holiday periods and busy seasons may extend delivery windows',
  'Someone must be present at the delivery address to receive the package',
  'For delivery issues, contact us at info@altio.me',
]

export default function Shipping() {
  return (
    <main className="relative">
      <section className="pt-24 pb-24 px-6" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-[760px] mx-auto">

          {/* Header */}
          <div className="mb-16 text-center">
<h1 className="font-display text-[40px] sm:text-[52px] font-bold text-[var(--text-primary)] leading-[1.1] mb-4">
              Shipping Information
            </h1>
            <p className="font-sans text-[17px] text-[var(--text-secondary)] max-w-[480px] mx-auto">
              Everything you need to know about shipping and delivery.
            </p>
          </div>

          {/* Details cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
            {shippingDetails.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-[var(--brand-primary)]"
                  style={{ background: 'var(--brand-primary-soft)' }}
                >
                  {item.icon}
                </div>
                <h3 className="font-sans font-semibold text-[16px] text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Guidelines */}
          <div
            className="rounded-2xl p-8"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            <h2 className="font-sans font-semibold text-[18px] text-[var(--text-primary)] mb-6">
              Important Guidelines
            </h2>
            <ul className="space-y-4">
              {guidelines.map((g) => (
                <li key={g} className="flex items-start gap-3">
                  <span
                    className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'var(--brand-primary-soft)' }}
                  >
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path d="M2 6l3 3 5-5" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <p className="text-center font-sans text-[14px] text-[var(--text-secondary)] mt-10">
            Need help?{' '}
            <a
              href="mailto:info@altio.me"
              className="text-[var(--brand-primary)] hover:underline font-medium"
            >
              info@altio.me
            </a>
          </p>

        </div>
      </section>

    </main>
  )
}
