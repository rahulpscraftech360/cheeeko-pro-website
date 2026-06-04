import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const scenes = [
  {
    slug: 'first-moment',
    headline: 'A friend they can talk to.',
    body: 'Cheeko answers questions, tells stories, and listens — the way a patient companion should. Not a screen. Not an algorithm. A friend.',
  },
  {
    slug: 'meet-cheeko',
    headline: 'Stories without the phone.',
    body: 'Every bedtime story, every song, every little adventure — delivered through Cheeko\'s voice, not a glowing rectangle. Phone-free play starts here.',
  },
  {
    slug: 'multilingual',
    headline: 'Made for many voices.',
    body: 'Your child can speak to Cheeko in Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali — or English. Multilingual from day one, because India is.',
  },
  {
    slug: 'cards',
    headline: 'Tap a card, start an adventure.',
    body: 'Each RFID card unlocks a world — a story, a song, a learning game. Tap and play. No menus. No passwords. Just wonder.',
  },
  {
    slug: 'parent-safety',
    headline: 'Parents stay in control.',
    body: 'Set the languages. Choose the content. Review Cheeko\'s sessions. The Parent App puts you in charge — without interrupting the magic.',
  },
  {
    slug: 'offline-anywhere',
    headline: 'Play that travels.',
    body: 'Wi-Fi not required. Cheeko\'s offline-ready library goes wherever your family goes — road trips, grandma\'s house, the backseat.',
  },
  {
    slug: 'product-duo',
    headline: 'Choose your Cheeko.',
    body: 'Cheeko Pro: screen-enabled, fox-fronted, richer interactions. One device, endless play. Preorders open June 2026.',
  },
]

function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
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

export default function FeaturesNarrative() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const container = containerRef.current
    const strip = stripRef.current
    if (!container || !strip) return

    const totalWidth = strip.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      gsap.to(strip, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, container)

    return () => ctx.revert()
  }, [isMobile])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="features" ref={containerRef} className="relative">
      {isMobile ? (
        /* Mobile: vertical scroll */
        <div className="py-20 px-6 space-y-16">
          {scenes.map((scene, i) => (
            <div key={scene.slug} className="max-w-lg mx-auto">
              <div className="text-[var(--c-orange)] font-semibold uppercase text-[11px] tracking-[0.15em] mb-3">
                Scene {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-serif text-[28px] leading-[1.15] text-[var(--c-cream)] mb-4">
                {scene.headline}
              </h3>
              <p className="font-sans text-[16px] leading-[1.6] text-[var(--c-muted)] mb-6">
                {scene.body}
              </p>
              <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1108] to-[#2a1a05]" />
                <div className="absolute inset-0 bg-gradient-radial from-[var(--c-orange-glow)] to-transparent opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[var(--c-muted)] text-sm font-semibold uppercase tracking-wider">
                    {scene.slug}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: horizontal film strip */
        <>
          <div
            ref={stripRef}
            className="flex h-screen"
            style={{ width: `${scenes.length * 100}vw` }}
          >
            {scenes.map((scene, i) => (
              <div
                key={scene.slug}
                className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-[8vw]"
              >
                <div className="w-full max-w-[1400px] grid grid-cols-2 gap-16 items-center">
                  {/* Text */}
                  <div className="space-y-6">
                    <div className="text-[var(--c-orange)] font-semibold uppercase text-[11px] tracking-[0.15em]">
                      {String(i + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
                    </div>
                    <h3 className="font-serif text-[clamp(32px,3.5vw,56px)] leading-[1.08] text-[var(--c-cream)]">
                      <WordReveal text={scene.headline} />
                    </h3>
                    <p className="font-sans text-[18px] leading-[1.65] text-[var(--c-muted)] max-w-md">
                      <WordReveal text={scene.body} />
                    </p>
                  </div>

                  {/* Visual placeholder */}
                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1108] to-[#2a1a05]" />
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, var(--c-orange-glow), transparent 70%)',
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-pulse-glow">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--c-orange)] to-transparent opacity-30 blur-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ opacity: useTransform(scrollYProgress, [0.85, 0.95], [1, 0]) }}
          >
            <span className="text-[var(--c-muted)] text-xs uppercase tracking-wider">Continue</span>
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-[var(--c-muted)] flex items-start justify-center p-1.5"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <div className="w-1.5 h-3 rounded-full bg-[var(--c-orange)]" />
            </motion.div>
          </motion.div>
        </>
      )}
    </section>
  )
}
