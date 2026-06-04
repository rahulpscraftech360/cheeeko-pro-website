import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import RevealBlock from '@/components/ui/RevealBlock'

const proFeatures = [
  'Screen-enabled with fox assistant interface',
  'Tap to Play with Cheeko Cards',
  'Multilingual: 6 Indian languages + English',
  'Kids radio channel for stories and songs',
  'Educational games: maths, colors, numbers, spelling, animal sounds',
  'Offline-ready library built-in',
  'Parent App: content control from your phone',
]

const products = [
  {
    tag: 'CHEEKO PRO',
    title: 'Cheeko Pro',
    price: 'Rs. 4,990',
    note: 'One-time purchase. No subscription.',
    offer: '20% off with code FIRSTUSER',
    visualLabel: 'Product render',
    cta: 'Join Waitlist',
    features: proFeatures,
  },
  {
    tag: 'CHEEKO BASIC',
    title: 'Cheeko Basic',
    price: 'Rs. 3,990',
    note: 'Audio-first Cheeko companion for screen-free play.',
    offer: 'Sold out',
    visualLabel: 'Basic render',
    cta: 'Sold Out',
    soldOut: true,
    features: [
      'Audio-first stories, songs, and questions',
      'Tap to Play with Cheeko Cards',
      'Multilingual play for home languages',
      'Parent App controls included',
    ],
  },
  /*
  {
    tag: 'ACCESSORY',
    title: 'Cheeko Cards',
    price: 'Pricing TBD',
    note: 'Story cards, learning games, and routine prompts. Sold separately.',
    offer: 'Add-on pack',
    visualLabel: 'Card pack render',
    cta: 'Notify Me',
    features: [
      'Story, song, and learning card packs',
      'Tap a card to start a new adventure',
      'Designed for independent play',
      'Works with Cheeko Pro and Basic',
    ],
  },
  */
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
      className="relative px-6 py-16 lg:flex lg:min-h-screen lg:items-center lg:py-4"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto w-full max-w-[1040px]">
        <RevealBlock className="mb-8 text-center lg:mb-5">
          <div className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--c-orange)]">
            THE DEVICE
          </div>
          <h2 className="font-serif text-[clamp(30px,3.8vw,46px)] leading-[1.05] text-[var(--c-cream)]">
            One Cheeko. Endless play.
          </h2>
        </RevealBlock>

        <div className="mx-auto grid max-w-[920px] grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          {products.map((product, productIndex) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: productIndex * 0.12,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className={`glass-card flex h-full flex-col p-5 transition-all duration-300 lg:p-3 ${
                product.soldOut ? 'opacity-75' : 'hover:-translate-y-1'
              }`}
              whileHover={product.soldOut ? undefined : { borderColor: 'rgba(255,107,44,0.22)' }}
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="pill-tag pill-tag-orange">{product.tag}</div>
                {product.soldOut ? (
                  <div className="pill-tag border border-[var(--border)] bg-[var(--border-light)] text-[var(--text-muted)]">
                    SOLD OUT
                  </div>
                ) : null}
              </div>

              <div className="relative mb-3 h-32 w-full overflow-hidden rounded-2xl lg:h-16 xl:h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] to-[var(--brand-primary-soft)]" />
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: 'radial-gradient(circle at 40% 50%, rgba(233,107,44,0.18), transparent 70%)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse-glow">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[var(--c-orange)] to-transparent opacity-25 blur-2xl" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-center text-sm font-semibold uppercase tracking-wider text-[var(--c-muted)]">
                    {product.visualLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                <h3 className="mb-1.5 font-serif text-[26px] leading-[1.05] text-[var(--c-cream)]">
                  {product.title}
                </h3>
                <div className="mb-1.5 font-serif text-[28px] leading-none text-[var(--c-cream)]">
                  {product.price}
                </div>
                <p className="mb-3 min-h-[42px] font-sans text-[14px] leading-[1.5] text-[var(--c-muted)]">
                  {product.note}
                </p>
                <div
                  className={`pill-tag mb-4 w-fit ${
                    product.soldOut
                      ? 'border border-[var(--border)] bg-[var(--border-light)] text-[var(--text-muted)]'
                      : 'pill-tag-gold'
                  }`}
                >
                  {product.offer}
                </div>

                <ul className="mb-4 flex-1 space-y-1">
                  {product.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.45,
                        delay: 0.25 + productIndex * 0.08 + i * 0.04,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                      }}
                    >
                      <CheckIcon />
                      <span className="font-sans text-[13px] leading-[1.3] text-[var(--c-cream)]">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <button
                  className={
                    product.soldOut
                      ? 'btn-secondary w-full cursor-not-allowed opacity-70'
                      : product.title === 'Cheeko Pro'
                        ? 'btn-primary w-full'
                        : 'btn-secondary w-full'
                  }
                  disabled={product.soldOut}
                >
                  {product.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
