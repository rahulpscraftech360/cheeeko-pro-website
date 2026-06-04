import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ')
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export default function CTABlock() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      id="waitlist"
      ref={sectionRef}
      className="relative py-24 lg:py-40 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a0d00 0%, #0D0D0D 60%)',
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(255,107,44,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[900px] mx-auto text-center">
        {/* Pre-headline */}
        <motion.div
          className="section-label justify-center flex mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          From our idea to your hands.
        </motion.div>

        {/* Headline */}
        <h2 className="font-serif text-[clamp(36px,7vw,80px)] leading-[1.05] text-[var(--c-cream)] mb-6">
          <WordReveal text="One device. A thousand adventures." />
        </h2>

        {/* Sub */}
        <motion.p
          className="font-sans font-medium text-[20px] mb-3"
          style={{ color: 'var(--c-cream)', opacity: 0.7 }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Cheeko Pro · ₹4,990 · Launch offer: 20% off with code FIRSTUSER
        </motion.p>

        {/* Fine print */}
        <motion.p
          className="font-sans text-[14px] text-[var(--c-muted)] mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          One-time purchase. No subscription required.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="btn-primary px-10 py-4 text-base">
            Join Waitlist
          </button>
          <a href="#compare" className="btn-secondary px-10 py-4 text-base">
            Compare Basic & Pro
          </a>
        </motion.div>
      </div>
    </section>
  )
}
