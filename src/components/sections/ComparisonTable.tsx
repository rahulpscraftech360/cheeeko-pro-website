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
    feature: 'Cheeko Card support',
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
    feature: 'Kids radio + games',
    basic: <Minus className="w-5 h-5 text-[var(--c-muted)] mx-auto" />,
    pro: <span className="text-[var(--c-cream)]">Radio + learning games</span>,
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
      className="relative px-4 py-16 sm:px-6 lg:flex lg:min-h-[100dvh] lg:items-center lg:pb-5 lg:pt-[88px]"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="mx-auto w-full max-w-[980px]">
        <RevealBlock className="mb-7 text-center lg:mb-5">
          <div className="section-label mb-2">COMPARE</div>
          <h2 className="font-serif text-[clamp(34px,4vw,56px)] leading-[1.02] text-[var(--c-cream)]">
            Find your Cheeko.
          </h2>
        </RevealBlock>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {/* Table */}
          <div className="space-y-3 md:hidden">
            {rows.map((row, i) => (
              <motion.div
                key={i}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.72)] shadow-[0_14px_40px_rgba(69,49,31,0.08)]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.04,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                <div className="border-b border-[var(--border)] px-4 py-3 font-sans text-[14px] font-bold text-[var(--c-cream)]">
                  {row.feature}
                </div>
                <div className="grid grid-cols-2 divide-x divide-[var(--border)]">
                  <div className="px-3 py-3 text-center font-sans text-[14px] leading-tight">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--c-muted)]">
                      Basic
                    </div>
                    {row.basic}
                  </div>
                  <div className="bg-[rgba(255,232,218,0.42)] px-3 py-3 text-center font-sans text-[14px] leading-tight">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--c-orange)]">
                      Pro
                    </div>
                    {row.pro}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px] table-fixed">
              <colgroup>
                <col className="w-[38%]" />
                <col className="w-[31%]" />
                <col className="w-[31%]" />
              </colgroup>
              <thead>
                <tr className="h-12">
                  <th className="rounded-l-lg px-5 text-left font-sans text-[15px] font-bold text-[var(--c-cream)]"
                    style={{ background: 'var(--surface)' }}
                  >
                    Feature
                  </th>
                  <th
                    className="px-5 text-center font-sans text-[15px] font-bold text-[var(--c-cream)]"
                    style={{ background: 'var(--surface)' }}
                  >
                    Cheeko Basic
                  </th>
                  <th
                    className="rounded-r-lg px-5 text-center font-sans text-[15px] font-bold text-[var(--c-cream)]"
                    style={{
                      background: 'var(--brand-primary-soft)',
                      border: '1px solid rgba(233,107,44,0.18)',
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
                    className="h-[46px]"
                    style={{
                      background: i % 2 === 1 ? 'rgba(255,255,255,0.58)' : 'transparent',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                  >
                    <td className="px-5 py-2.5 font-sans text-[15px] leading-tight text-[var(--c-muted)]">
                      {row.feature}
                    </td>
                    <td className="px-5 py-2.5 text-center font-sans text-[15px] leading-tight">
                      {row.basic}
                    </td>
                    <td className="px-5 py-2.5 text-center font-sans text-[15px] leading-tight">
                      {row.pro}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom note */}
          <p className="mt-4 text-center font-sans text-[12px] leading-relaxed text-[var(--c-muted)]">
            Both include: 1-year warranty · Free shipping above ₹499 · Made in India
          </p>
        </motion.div>
      </div>
    </section>
  )
}
