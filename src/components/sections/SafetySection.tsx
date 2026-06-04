import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import RevealBlock from '@/components/ui/RevealBlock'

const trustBlocks = [
  {
    title: 'Parent Verification',
    body: 'A parent must verify the account before Cheeko activates. Your child cannot bypass this.',
  },
  {
    title: 'Content Boundaries',
    body: 'All content is curated for children. No open internet access. No user-generated content.',
  },
  {
    title: 'Conversation Data',
    body: 'Whether conversations are stored on our servers is currently being finalized. We will publish our full privacy policy before shipping.',
  },
  {
    title: 'Microphone',
    body: 'Cheeko only listens when your child speaks to it directly. There is no always-on microphone monitoring. Data behavior will be detailed in our privacy policy.',
  },
]

export default function SafetySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      id="safety"
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-6"
      style={{ background: '#0D0D0D' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <RevealBlock className="text-center mb-16">
          <div className="section-label">PARENT TRUST</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Built with care. For families.
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column */}
          <div>
            <motion.p
              className="font-sans text-[18px] leading-[1.7] text-[var(--c-cream)] mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              We designed Cheeko for the parent who wants their child to have a richer, safer relationship with technology. Not a screen to manage. A companion to trust.
            </motion.p>

            <motion.div
              className="font-serif italic text-[clamp(24px,3vw,32px)] leading-[1.3]"
              style={{ color: 'var(--c-orange)' }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              From our idea to your hands.
            </motion.div>
          </div>

          {/* Right column — trust blocks */}
          <div className="space-y-4">
            {trustBlocks.map((block, i) => (
              <motion.div
                key={i}
                className="rounded-2xl p-6 lg:p-7 transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderLeft: '3px solid var(--c-orange)',
                }}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h4 className="font-sans font-bold text-[14px] uppercase tracking-[0.08em] text-[var(--c-cream)] mb-2">
                  {block.title}
                </h4>
                <p className="font-sans text-[15px] leading-[1.6] text-[var(--c-muted)]">
                  {block.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <motion.p
          className="text-center font-sans text-[13px] text-[var(--c-muted)] mt-16 max-w-[700px] mx-auto leading-[1.6]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Cheeko is a play and language companion. It is not a medical device, therapy tool, or educational curriculum. Learning outcomes vary by child.
        </motion.p>
      </div>
    </section>
  )
}
