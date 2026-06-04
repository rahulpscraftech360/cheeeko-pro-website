import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const benefits = [
  {
    title: 'For curious kids',
    body: 'Questions become conversations, stories become adventures, and learning feels like play.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      </svg>
    ),
  },
  {
    title: 'For busy parents',
    body: 'A calmer way to keep children engaged during routines, travel, and quiet moments at home.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M2 21v-2a4 4 0 0 1 4-4h1" />
        <path d="M17 21v-2a4 4 0 0 0-4-4h-1" />
        <circle cx="18" cy="7" r="3" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    ),
  },
  {
    title: 'For Indian families',
    body: 'Multilingual play helps children explore in the languages they hear around them every day.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'For safer tech habits',
    body: 'Cheeko is designed to be phone-free, focused, and parent-guided from the start.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
]

function WordReveal({ text }: { text: string }) {
  const words = text.split(' ')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <span ref={ref}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.06,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export default function WhyCheeko() {
  return (
    <section
      id="why"
      className="relative py-24 lg:py-32 px-6"
      style={{ background: '#111111' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Large display text */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-[clamp(36px,7vw,80px)] leading-[1.1] text-[var(--c-cream)]">
            <div className="mb-2">
              <WordReveal text="Give them wonder," />
            </div>
            <div>
              <WordReveal text="not another feed." />
            </div>
          </h2>
        </div>

        {/* Benefit cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 overflow-x-auto pb-4 xl:pb-0 xl:overflow-visible"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              className="glass-card p-10 transition-all duration-300 hover:-translate-y-1.5 cursor-default"
              style={{
                scrollSnapAlign: 'start',
                minWidth: '280px',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              whileHover={{
                borderColor: 'rgba(255,107,44,0.25)',
              }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                style={{ background: 'rgba(255,107,44,0.1)' }}
                whileHover={{ background: 'rgba(255,107,44,0.2)' }}
              >
                <div className="text-[var(--c-orange)]">{benefit.icon}</div>
              </motion.div>
              <h3 className="font-sans font-semibold text-[18px] text-[var(--c-cream)] mb-3">
                {benefit.title}
              </h3>
              <p className="font-sans text-[15px] text-[var(--c-muted)] leading-[1.65]">
                {benefit.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
