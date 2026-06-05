import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { publicAsset } from '@/lib/assets'

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
      className="relative overflow-hidden bg-[var(--bg-primary)] px-6 pb-44 pt-20 sm:py-24 lg:py-40"
    >
      <img
        src={publicAsset('ctabox.png')}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(250,247,242,0.62)_0%,rgba(250,247,242,0.40)_52%,rgba(250,247,242,0.08)_100%)]" />

      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 'min(800px, 90vw)',
          height: 'min(800px, 90vw)',
          background: 'radial-gradient(circle, rgba(233,107,44,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-[900px] -translate-y-10 text-center lg:-translate-y-16">
        {/* Pre-headline */}
        <motion.div
          className="section-label justify-center flex mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="drop-shadow-[0_2px_8px_rgba(250,247,242,0.95)]">
            From our idea to your hands.
          </span>
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
          className="mb-10 font-sans text-[14px] font-medium text-[var(--text-primary)] drop-shadow-[0_2px_8px_rgba(250,247,242,0.95)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          One-time purchase. No subscription required.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="btn-primary w-[280px] whitespace-nowrap px-8 py-4 text-base sm:w-auto sm:px-10">
            Join Waitlist
          </button>
          <a href="#compare" className="btn-secondary w-[280px] whitespace-nowrap px-8 py-4 text-base sm:w-auto sm:px-10">
            Compare Basic & Pro
          </a>
        </motion.div>
      </div>
    </section>
  )
}
