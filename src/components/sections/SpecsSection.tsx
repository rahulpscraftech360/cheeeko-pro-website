import { motion } from 'framer-motion'
import RevealBlock from '@/components/ui/RevealBlock'

interface SpecItem {
  label: string
  value: string
}

const hardwareSpecs: SpecItem[] = [
  { label: 'Device', value: 'Cheeko Pro' },
  { label: 'Display', value: 'Color screen with fox assistant interface' },
  { label: 'Audio', value: 'Speaker + microphone (directional)' },
  { label: 'Connectivity', value: 'Wi-Fi + Bluetooth' },
  { label: 'RFID', value: 'Built-in card reader' },
  { label: 'Battery', value: 'Rechargeable (USB-C)' },
  { label: 'Offline', value: 'Built-in content library' },
]

const boxContents: SpecItem[] = [
  { label: 'Device', value: 'Cheeko Pro device' },
  { label: 'Cable', value: 'USB-C charging cable' },
  { label: 'Guide', value: 'Quick-start card' },
  { label: 'Sample', value: '1 sample RFID story card' },
]

const warrantySpecs: SpecItem[] = [
  { label: 'Warranty', value: '1 year from purchase' },
  { label: 'Shipping', value: 'Free above ₹499 · Pan-India delivery' },
  { label: 'Launch', value: 'Preorders open June 2026 · Shipping timeline TBD' },
  { label: 'Returns', value: 'Policy TBD — will be published before launch' },
  { label: 'Made in', value: 'Bangalore, India 🇮🇳' },
]

function SpecBlock({ title, items, delay }: { title: string; items: SpecItem[]; delay: number }) {
  return (
    <motion.div
      className="pt-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="h-px mb-8"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      />
      <h3 className="font-sans font-semibold text-[14px] uppercase tracking-[0.1em] text-[var(--c-cream)] mb-6">
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:gap-4">
            <span className="font-sans font-semibold text-[11px] uppercase tracking-[0.1em] text-[var(--c-muted)] sm:min-w-[120px] sm:text-right">
              {item.label}
            </span>
            <span className="font-sans font-medium text-[16px] text-[var(--c-cream)]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function SpecsSection() {
  return (
    <section
      id="specs"
      className="relative py-24 lg:py-32 px-6"
      style={{ background: '#111111' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <RevealBlock className="text-center mb-12">
          <div className="section-label">SPECS</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            What&apos;s in the box.
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <SpecBlock title="Hardware" items={hardwareSpecs} delay={0} />
          <SpecBlock title="Box Contents" items={boxContents} delay={0.1} />
          <SpecBlock title="Warranty & Shipping" items={warrantySpecs} delay={0.2} />
        </div>
      </div>
    </section>
  )
}
