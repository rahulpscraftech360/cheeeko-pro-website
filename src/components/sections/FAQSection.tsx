import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealBlock from '@/components/ui/RevealBlock'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'What age is Cheeko for?',
    answer: 'Cheeko is designed for children aged 3 to 10. Younger children benefit from the audio and card-tap interaction; older children enjoy the stories, quizzes, and multilingual play.',
  },
  {
    question: 'Does Cheeko need internet?',
    answer: 'Cheeko has a built-in offline library for core content. Some features — like real-time language updates and new story packs — may require an occasional Wi-Fi connection. Day-to-day play works offline.',
  },
  {
    question: 'Is Cheeko a screen-time replacement?',
    answer: 'Cheeko Pro has a small screen for its fox assistant interface, so it is not screen-free. We describe it as screen-light play. It is designed to reduce dependency on phones and tablets, not to eliminate screens entirely.',
  },
  {
    question: 'What is the difference between Cheeko Basic and Cheeko Pro?',
    answer: 'Cheeko Pro has a color screen with the fox assistant, richer visual interactions, a kids radio channel, and educational games for maths, colors, numbers, spelling, and animal sounds. Cheeko Basic is audio-first with tactile controls. Both support Cheeko Cards, multilingual play, and the Parent App. Cheeko Basic pricing starts at ₹3,990.',
  },
  {
    question: 'Can parents control what Cheeko says?',
    answer: 'Yes. The Parent App lets you choose languages, set content categories, and review session activity. Cheeko does not access open internet content.',
  },
  {
    question: 'Are conversations stored?',
    answer: 'Our data storage policy is still being finalized. We will publish a clear, plain-language privacy policy before any device ships. We are committed to not storing sensitive child audio without explicit, informed parental consent.',
  },
  {
    question: 'Which languages are supported?',
    answer: 'Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, and English — with more planned. Your child can switch languages naturally in conversation.',
  },
  {
    question: 'What comes in the box?',
    answer: 'Cheeko Pro device, USB-C charging cable, quick-start card, and 1 sample Cheeko Card. Additional Cheeko Cards are sold separately.',
  },
  {
    question: 'When will Cheeko ship?',
    answer: 'Preorders open in June 2026. We have not announced a shipping date yet. Everyone who joins the waitlist will receive shipping timeline updates first.',
  },
  {
    question: 'What is the return or refund policy?',
    answer: 'Our return and refund policy is being finalized and will be published before launch. We are committed to a fair, parent-friendly policy.',
  },
]

function AccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border-b"
      style={{ borderColor: 'var(--border)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      <button
        className="w-full py-6 flex items-center justify-between gap-4 text-left group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-sans font-semibold text-[18px] text-[var(--c-cream)] group-hover:text-[var(--c-orange)] transition-colors duration-300">
          {item.question}
        </span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[var(--c-cream)] transition-all duration-300"
          style={{
            background: isOpen ? 'var(--brand-primary-soft)' : 'var(--surface)',
            border: '1px solid var(--border)',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
              opacity: { duration: 0.25, ease: 'easeInOut' },
            }}
            className="overflow-hidden"
          >
            <p className="font-sans text-[16px] text-[var(--c-muted)] leading-[1.65] pb-6 pr-12">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="relative py-24 lg:py-32 px-6"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-[800px] mx-auto">
        <RevealBlock className="text-center mb-12">
          <div className="section-label">FAQ</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Honest answers.
          </h2>
        </RevealBlock>

        <div>
          {faqItems.map((item, i) => (
            <AccordionItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
