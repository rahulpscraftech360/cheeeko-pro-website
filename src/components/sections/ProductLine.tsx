import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import RevealBlock from '@/components/ui/RevealBlock'

const features = [
  'Screen-enabled with fox assistant interface',
  'RFID card activation — tap to play',
  'Multilingual: 6 Indian languages + English',
  'Kids audio: continuous story & song content',
  'Offline-ready library built-in',
  'Parent App: content control from your phone',
]

function CheckIcon() {
  return (
    <div className="w-5 h-5 rounded-full bg-[rgba(255,107,44,0.15)] flex items-center justify-center flex-shrink-0 mt-0.5">
      <Check className="w-3 h-3 text-[var(--c-orange)]" strokeWidth={3} />
    </div>
  )
}

export default function ProductLine() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-6"
      style={{ background: '#111111' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <RevealBlock className="text-center mb-16">
          <div className="section-label">THE DEVICE</div>
          <h2 className="section-heading">One Cheeko. Endless play.</h2>
        </RevealBlock>

        {/* Cheeko Pro Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="glass-card p-8 md:p-16 mb-8 transition-all duration-300 hover:-translate-y-1"
          style={{
            maxWidth: 900,
            margin: '0 auto',
          }}
          whileHover={{ borderColor: 'rgba(255,107,44,0.2)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Product visual */}
            <div className="relative">
              <div className="pill-tag pill-tag-orange mb-6">CHEEKO PRO</div>
              <div className="w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden relative mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1108] to-[#2a1a05]" />
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: 'radial-gradient(circle at 40% 50%, rgba(255,107,44,0.2), transparent 70%)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse-glow">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--c-orange)] to-transparent opacity-25 blur-2xl" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[var(--c-muted)] text-sm font-semibold uppercase tracking-wider">Product render</span>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div>
              <div className="font-serif text-[clamp(36px,4vw,56px)] text-[var(--c-cream)] mb-2">
                ₹4,990
              </div>
              <p className="font-sans text-[16px] text-[var(--c-muted)] mb-4">
                One-time purchase. No subscription.
              </p>
              <div className="pill-tag pill-tag-gold mb-8">
                20% off with code FIRSTUSER
              </div>

              {/* Feature checklist */}
              <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                  >
                    <CheckIcon />
                    <span className="font-sans text-[15px] text-[var(--c-cream)]">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <button className="btn-primary w-full">
                Join Waitlist
              </button>
            </div>
          </div>
        </motion.div>

        {/* Cheeko Cards Accessory */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="glass-card p-8 md:p-12 transition-all duration-300 hover:-translate-y-1"
          style={{
            maxWidth: 420,
            margin: '0 auto',
          }}
        >
          <div className="pill-tag pill-tag-orange mb-4">ACCESSORY</div>
          <h3 className="font-serif text-[32px] text-[var(--c-cream)] mb-3">
            Cheeko Cards
          </h3>
          <p className="font-sans text-[16px] text-[var(--c-muted)] leading-[1.6] mb-6">
            Story cards, learning games, and routine prompts. Each card is a new world. Sold separately.
          </p>
          <p className="font-sans text-[14px] text-[var(--c-muted)] italic mb-6">
            Pricing TBD
          </p>
          <button className="btn-secondary w-full">
            Notify Me
          </button>
        </motion.div>
      </div>
    </section>
  )
}
