import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FoxIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 4L8 12V20L16 28L24 20V12L16 4Z"
        fill="var(--c-orange)"
        opacity="0.9"
      />
      <path
        d="M16 4L8 12H24L16 4Z"
        fill="var(--c-orange)"
      />
      <circle cx="12.5" cy="16" r="1.5" fill="#0D0D0D" />
      <circle cx="19.5" cy="16" r="1.5" fill="#0D0D0D" />
      <ellipse cx="16" cy="19" rx="3" ry="2" fill="#0D0D0D" opacity="0.3" />
    </svg>
  )
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
      style={{ background: '#0D0D0D' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,107,44,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative text-center max-w-[800px] mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <FoxIcon className="w-10 h-10" />
          </div>

          <p className="section-label justify-center flex mb-4">
            COMING JUNE 2026
          </p>

          <h1 className="font-serif text-[clamp(42px,8vw,90px)] leading-[1.02] text-[var(--c-cream)] mb-6">
            A friend for your
            <br />
            <span className="text-[var(--c-orange)]">child&apos;s curiosity.</span>
          </h1>

          <p className="font-sans text-[18px] leading-[1.65] text-[var(--c-muted)] max-w-[520px] mx-auto mb-10">
            Cheeko Pro is a multilingual AI companion that talks, listens, and plays — in the languages your family speaks at home.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#waitlist" className="btn-primary px-10 py-4 text-base">
              Join Waitlist
            </a>
            <a href="#features" className="btn-secondary px-10 py-4 text-base">
              See How It Works
            </a>
          </div>

          {/* Product placeholder */}
          <motion.div
            className="mt-16 relative mx-auto"
            style={{ maxWidth: 500 }}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full aspect-square rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1108] via-[#2a1a05] to-[#0D0D0D]" />
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 50% 40%, rgba(255,107,44,0.15), transparent 60%)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse-glow">
                  <FoxIcon className="w-24 h-24 opacity-20" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[var(--c-muted)] text-sm font-semibold uppercase tracking-wider">
                  Cheeko Pro
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[var(--c-muted)] text-xs uppercase tracking-wider">Scroll</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-[var(--c-muted)] flex items-start justify-center p-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <div className="w-1.5 h-3 rounded-full bg-[var(--c-orange)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
