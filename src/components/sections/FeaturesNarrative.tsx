import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { publicAsset } from '@/lib/assets'

gsap.registerPlugin(ScrollTrigger)

type Scene = {
  slug: string
  headline: string
  body: string
  image?: string
  imageAlt?: string
}

const scenes: Scene[] = [
  {
    slug: 'first-moment',
    headline: 'A friend they can talk to.',
    image: publicAsset('slide1.png'),
    imageAlt: 'Cheeko companion screen for children',
    body: 'Cheeko answers questions, tells stories, plays learning games, and keeps kids company with a radio-style channel. Not a screen. Not an algorithm. A friend.',
  },
  {
    slug: 'meet-cheeko',
    headline: 'Stories without the phone.',
    image: publicAsset('slide2.png'),
    imageAlt: 'Cheeko storytelling without a phone',
    body: 'Every bedtime story, every song, every little adventure — delivered through Cheeko\'s voice, not a glowing rectangle. Phone-free play starts here.',
  },
  {
    slug: 'multilingual',
    headline: 'Made for many voices.',
    image: publicAsset('slide3.jpeg'),
    imageAlt: 'Cheeko multilingual voice experience',
    body: 'Your child can speak to Cheeko in Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali — or English. Multilingual from day one, because India is.',
  },
  {
    slug: 'cards',
    headline: 'Tap a card, start an adventure.',
    image: publicAsset('slide4.png'),
    imageAlt: 'Cheeko cards starting an adventure',
    body: 'Each Cheeko Card unlocks a world — a story, a song, a learning game. Tap and play. No menus. No passwords. Just wonder.',
  },
]

function WordReveal({ text, className = '', instant = false }: { text: string; className?: string; instant?: boolean }) {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: instant ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: instant ? 0.45 : 0.5,
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
    const introHold = window.innerHeight * 1.4
    const outroHold = window.innerHeight * 0.2
    const scrollDistance = totalWidth + introHold + outroHold
    const slideDistance = totalWidth / (scenes.length - 1)
    const snapPoints = [
      0,
      introHold / scrollDistance,
      ...Array.from(
        { length: scenes.length - 1 },
        (_, index) => (introHold + (index + 1) * slideDistance) / scrollDistance
      ),
    ]
    const lastSceneProgress = snapPoints[snapPoints.length - 1]
    const firstSceneHoldPoint = snapPoints[1]
    container.style.height = `${scrollDistance + window.innerHeight}px`

    const snapToScene = (progress: number, self?: ScrollTrigger) => {
      if ((self?.direction ?? 1) >= 0 && progress > lastSceneProgress + 0.02) {
        return progress
      }

      if ((self?.direction ?? 1) >= 0 && progress <= firstSceneHoldPoint + 0.045) {
        return firstSceneHoldPoint
      }

      const nearest = snapPoints.reduce((closest, point) =>
        Math.abs(point - progress) < Math.abs(closest - progress) ? point : closest
      )

      if (Math.abs(nearest - progress) < 0.006) return nearest

      if ((self?.direction ?? 1) >= 0) {
        return snapPoints.find((point) => point > progress) ?? 1
      }

      for (let index = snapPoints.length - 1; index >= 0; index -= 1) {
        if (snapPoints[index] < progress) return snapPoints[index]
      }

      return 0
    }

    const ctx = gsap.context(() => {
      gsap.set(strip, { force3D: true, willChange: 'transform' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 0.28,
          snap: {
            snapTo: snapToScene,
            duration: { min: 0.18, max: 0.4 },
            delay: 0.03,
            ease: 'power2.out',
            inertia: false,
          },
          invalidateOnRefresh: true,
        },
      })
      tl.to(strip, { x: 0, duration: introHold, ease: 'none' })
      tl.to(strip, { x: -totalWidth, duration: totalWidth, ease: 'none' })
      tl.to(strip, { x: -totalWidth, duration: outroHold, ease: 'none' })
    }, container)

    return () => {
      container.style.height = ''
      ctx.revert()
    }
  }, [isMobile])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const continueOpacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0])

  return (
    <section id="features" ref={containerRef} className="relative bg-[var(--bg-primary)]">
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
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] to-[var(--brand-primary-soft)]" />
                {scene.image ? (
                  <img
                    src={scene.image}
                    alt={scene.imageAlt ?? scene.headline}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-radial from-[var(--c-orange-glow)] to-transparent opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[var(--c-muted)] text-sm font-semibold uppercase tracking-wider">
                        {scene.slug}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: horizontal film strip */
        <>
          <div className="sticky top-0 h-screen overflow-hidden">
            <div
              ref={stripRef}
              className="flex h-screen"
              style={{
                width: `${scenes.length * 100}vw`,
                backfaceVisibility: 'hidden',
                willChange: 'transform',
              }}
            >
              {scenes.map((scene, sceneIndex) => (
                <div
                  key={scene.slug}
                  className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-[6vw]"
                >
                  <div className="w-full max-w-[1440px] grid grid-cols-[0.9fr_1.1fr] gap-12 items-center">
                    {/* Text */}
                    <div className="space-y-6">
                      <h3 className="font-serif text-[clamp(32px,3.5vw,56px)] leading-[1.08] text-[var(--c-cream)]">
                        <WordReveal text={scene.headline} instant={sceneIndex === 0} />
                      </h3>
                      <p className="font-sans text-[18px] leading-[1.65] text-[var(--c-muted)] max-w-md">
                        <WordReveal text={scene.body} instant={sceneIndex === 0} />
                      </p>
                    </div>

                    {/* Visual placeholder */}
                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-[576px] aspect-[4/3] rounded-3xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] to-[var(--brand-primary-soft)]" />
                        {scene.image ? (
                          <img
                            src={scene.image}
                            alt={scene.imageAlt ?? scene.headline}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          <>
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
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ opacity: continueOpacity }}
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
          </div>
        </>
      )}
    </section>
  )
}
