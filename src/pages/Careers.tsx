import { Link } from 'react-router'
import CheekoLogo from '@/components/ui/CheekoLogo'

const values = [
  {
    title: 'Child-First Design',
    description: "Everything we build starts with the question: 'Is this good for kids?'",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description: 'We push the boundaries of AI to create magical learning experiences.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.355a14.997 14.997 0 0 1-3.75 0M12 3v1.5m0 0a9 9 0 0 1 9 9m-9-9a9 9 0 0 0-9 9m9 0v.75" />
      </svg>
    ),
  },
  {
    title: 'Collaboration',
    description: 'We believe diverse perspectives make us stronger and our products better.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: 'Joy',
    description: 'We bring fun and delight into everything we build — and how we work.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    ),
  },
]

const benefits = [
  'Remote-first culture',
  'Learning & development budget',
  'Health insurance',
  'Fun team events',
  'Competitive salary',
  'Stock options',
]

export default function Careers() {
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
              Join Our Team
            </h1>
            <p className="font-sans text-[17px] text-[var(--text-secondary)]">
              Help us shape the future of children's education
            </p>
          </div>

          {/* Mission */}
          <div
            className="rounded-2xl p-8 mb-10"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">
              Our Mission
            </h2>
            <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">
              At CheekoAI, we're building the future of screen-free learning for children. We believe every child deserves a magical, personalized learning companion that speaks their language and grows with them. Join us in making this vision a reality.
            </p>
          </div>

          {/* Core Values */}
          <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-5">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl p-5 flex items-start gap-4"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-[var(--brand-primary)]"
                  style={{ background: 'var(--brand-primary-soft)' }}
                >
                  {v.icon}
                </div>
                <div>
                  <p className="font-sans font-semibold text-[15px] text-[var(--text-primary)] mb-1">{v.title}</p>
                  <p className="font-sans text-[13px] text-[var(--text-secondary)] leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Open Positions */}
          <div
            className="rounded-2xl p-8 mb-10 text-center"
            style={{ background: 'var(--brand-primary-soft)', border: '1px solid rgba(233,107,44,0.2)' }}
          >
            <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">
              We're Growing!
            </h2>
            <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
              We don't have any open positions right now, but we're always looking for talented people who are passionate about education and technology.
            </p>
            <a
              href="mailto:info@altio.me"
              className="inline-flex items-center font-sans font-semibold text-[14px] text-[var(--brand-primary)] hover:underline"
            >
              Send your resume to info@altio.me
            </a>
          </div>

          {/* Benefits */}
          <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-5">
            Why Work With Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((b) => (
              <div
                key={b}
                className="rounded-2xl p-5 flex items-center gap-3"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <span
                  className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'var(--brand-primary-soft)' }}
                >
                  <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                    <path d="M2 6l3 3 5-5" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="font-sans text-[14px] text-[var(--text-primary)]">{b}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}
