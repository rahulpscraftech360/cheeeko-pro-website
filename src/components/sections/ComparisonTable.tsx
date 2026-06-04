import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import RevealBlock from '@/components/ui/RevealBlock'

interface Row {
  feature: string
  basic: React.ReactNode
  pro: React.ReactNode
}

const rows: Row[] = [
  {
    feature: 'Screen',
    basic: <Minus className="w-5 h-5 text-[var(--c-muted)] mx-auto" />,
    pro: <span className="text-[var(--c-cream)]">Fox assistant display</span>,
  },
  {
    feature: 'Audio',
    basic: <span className="text-[var(--c-cream)]">Audio-first</span>,
    pro: <span className="text-[var(--c-cream)]">Rich audio</span>,
  },
  {
    feature: 'RFID Card support',
    basic: <Check className="w-5 h-5 text-[var(--c-orange)] mx-auto" />,
    pro: <Check className="w-5 h-5 text-[var(--c-orange)] mx-auto" />,
  },
  {
    feature: 'Offline-ready play',
    basic: <Check className="w-5 h-5 text-[var(--c-orange)] mx-auto" />,
    pro: <Check className="w-5 h-5 text-[var(--c-orange)] mx-auto" />,
  },
  {
    feature: 'Parent App',
    basic: <Check className="w-5 h-5 text-[var(--c-orange)] mx-auto" />,
    pro: <Check className="w-5 h-5 text-[var(--c-orange)] mx-auto" />,
  },
  {
    feature: 'Indian languages',
    basic: <span className="text-[var(--c-cream)]">6 languages</span>,
    pro: <span className="text-[var(--c-cream)]">6 languages</span>,
  },
  {
    feature: 'Kids audio content',
    basic: <Check className="w-5 h-5 text-[var(--c-orange)] mx-auto" />,
    pro: <Check className="w-5 h-5 text-[var(--c-orange)] mx-auto" />,
  },
  {
    feature: 'Box contents',
    basic: <span className="text-[var(--c-muted)] text-[14px]">Device + cable</span>,
    pro: <span className="text-[var(--c-muted)] text-[14px]">Device + cable + quick-start card</span>,
  },
  {
    feature: 'Price',
    basic: <span className="font-semibold text-[var(--c-cream)]">₹3,990</span>,
    pro: <span className="font-semibold text-[var(--c-orange)]">₹4,990</span>,
  },
]

export default function ComparisonTable() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      id="compare"
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-6"
      style={{ background: '#0D0D0D' }}
    >
      <div className="max-w-[800px] mx-auto">
        <RevealBlock className="text-center mb-12">
          <div className="section-label">COMPARE</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Find your Cheeko.
          </h2>
        </RevealBlock>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="h-16">
                  <th className="text-left font-sans font-bold text-[16px] text-[var(--c-cream)] px-4 rounded-l-xl"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    Feature
                  </th>
                  <th
                    className="text-center font-sans font-bold text-[16px] text-[var(--c-cream)] px-4 min-w-[140px]"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    Cheeko Basic
                  </th>
                  <th
                    className="text-center font-sans font-bold text-[16px] text-[var(--c-cream)] px-4 rounded-r-xl min-w-[140px]"
                    style={{
                      background: 'rgba(255,107,44,0.08)',
                      border: '1px solid rgba(255,107,44,0.15)',
                    }}
                  >
                    Cheeko Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <motion.tr
                    key={i}
                    className="h-16"
                    style={{
                      background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                  >
                    <td className="px-4 font-sans text-[16px] text-[var(--c-muted)]">
                      {row.feature}
                    </td>
                    <td className="px-4 text-center font-sans text-[16px]">
                      {row.basic}
                    </td>
                    <td className="px-4 text-center font-sans text-[16px]">
                      {row.pro}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom note */}
          <p className="text-center font-sans text-[14px] text-[var(--c-muted)] mt-8">
            Both include: 1-year warranty · Free shipping above ₹499 · Made in India
          </p>
        </motion.div>
      </div>
    </section>
  )
}
