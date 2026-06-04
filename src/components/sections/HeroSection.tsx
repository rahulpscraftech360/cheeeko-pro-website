import { motion, type Variants } from 'framer-motion'
import { BookOpen, Gamepad2, Globe2, MessageCircle, Radio, Volume2, type LucideIcon } from 'lucide-react'
import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import CheekoCanvas from '@/components/canvas/CheekoCanvas'

const softEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value))

type OrbitCard = {
  title: string
  subtitle: string
  Icon: LucideIcon
  angle: number
  iconBg: string
  iconColor: string
}

const orbitCards: OrbitCard[] = [
  {
    title: 'Namaste!',
    subtitle: '6+ languages',
    Icon: Globe2,
    angle: -150,
    iconBg: 'rgba(167,139,250,0.16)',
    iconColor: 'var(--accent-purple)',
  },
  {
    title: 'Stories',
    subtitle: 'bedtime magic',
    Icon: BookOpen,
    angle: -90,
    iconBg: 'rgba(240,139,167,0.16)',
    iconColor: 'var(--accent-pink)',
  },
  {
    title: "Let's play",
    subtitle: 'story games',
    Icon: MessageCircle,
    angle: -30,
    iconBg: 'rgba(233,107,44,0.16)',
    iconColor: 'var(--brand-primary)',
  },
  {
    title: 'Kids radio',
    subtitle: 'daily wonder',
    Icon: Radio,
    angle: 30,
    iconBg: 'rgba(155,203,113,0.18)',
    iconColor: 'var(--accent-green)',
  },
  {
    title: 'Animal sounds',
    subtitle: 'listen & learn',
    Icon: Volume2,
    angle: 90,
    iconBg: 'rgba(234,170,47,0.18)',
    iconColor: 'var(--c-gold)',
  },
  {
    title: 'Learning games',
    subtitle: 'maths, colors',
    Icon: Gamepad2,
    angle: 150,
    iconBg: 'rgba(125,168,255,0.18)',
    iconColor: 'var(--accent-blue)',
  },
]

function StaggeredLine({ words, className = '' }: { words: string[]; className?: string }) {
  const word: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: softEase },
    },
  }

  return (
    <span className={`block ${className}`}>
      {words.map((text, index) => (
        <span key={text}>
          <motion.span variants={word} className="inline-block">
            {text}
          </motion.span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  )
}

function HeroCopy({ scrollProgress }: { scrollProgress: number }) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06 },
    },
  }

  const wonderExit = clamp((scrollProgress - 0.18) / 0.18)
  const friendEnter = clamp((scrollProgress - 0.24) / 0.22)
  const friendExit = clamp((scrollProgress - 0.88) / 0.12)

  return (
    <>
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6 text-center"
        style={{
          opacity: 1 - wonderExit,
          transform: `translate3d(0, ${scrollProgress * -70}px, 0) scale(${1 + scrollProgress * 0.04})`,
        }}
      >
        <div className="mx-auto max-w-5xl">
          <motion.h1
            className="font-serif text-[clamp(56px,9vw,104px)] leading-[0.94] text-[var(--c-cream)]"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <StaggeredLine words={['Give', 'them', 'wonder,']} />
            <StaggeredLine words={['not', 'another', 'feed.']} className="text-[var(--c-orange)]" />
          </motion.h1>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-start justify-center px-6 pt-[10vh] text-center md:items-center md:justify-start md:pl-[8vw] md:pr-[52vw] md:pt-0 md:text-left"
        style={{
          opacity: friendEnter * (1 - friendExit),
          transform: `translate3d(0, ${(1 - friendEnter) * 64 - scrollProgress * 22}px, 0)`,
        }}
      >
        <div className="mx-auto max-w-4xl md:mx-0 md:max-w-[560px]">
          <p className="section-label mb-4 flex justify-center md:mb-5 md:justify-start">COMING JUNE 2026</p>
          <h1 className="font-serif text-[clamp(38px,10vw,76px)] leading-[1.02] text-[var(--c-cream)] md:text-[clamp(42px,7.4vw,82px)]">
            A friend for your
            <br />
            <span className="text-[var(--c-orange)]">child&apos;s curiosity.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] font-sans text-[16px] leading-[1.55] text-[var(--c-muted)] md:mx-0 md:mt-6 md:text-[18px] md:leading-[1.65]">
            Cheeko Pro is a multilingual AI companion that talks, listens, and plays - in the languages your family speaks at home.
          </p>
          <p className="mx-auto mt-6 hidden max-w-3xl font-sans text-[11px] font-semibold uppercase leading-6 tracking-[0.12em] text-[var(--c-muted)] md:mx-0 md:block">
            AI Language Companion / Multilingual / Card-Activated / Built for India
          </p>
          <div className="absolute inset-x-6 bottom-[calc(env(safe-area-inset-bottom)+28px)] flex flex-col items-center justify-center gap-3 sm:flex-row md:static md:inset-auto md:mt-9 md:justify-start md:gap-4">
            <a href="#waitlist" className="btn-primary w-full max-w-[220px] px-8 py-3.5 text-sm md:w-auto md:max-w-none md:px-10 md:py-4 md:text-base">
              Join Waitlist
            </a>
            <a href="#features" className="btn-secondary w-full max-w-[220px] px-8 py-3.5 text-sm md:w-auto md:max-w-none md:px-10 md:py-4 md:text-base">
              Explore Cheeko
            </a>
          </div>
        </div>
      </motion.div>
    </>
  )
}

function HeroOrbitCards({ scrollProgress }: { scrollProgress: number }) {
  const orbitEnter = clamp((scrollProgress - 0.3) / 0.18)
  const orbitExit = clamp((scrollProgress - 0.82) / 0.16)
  const orbitOpacity = orbitEnter * (1 - orbitExit)

  return (
    <div
      className="hero-orbit-layer pointer-events-none absolute inset-0 z-[13]"
      style={{
        opacity: orbitOpacity,
        transform: `translate3d(0, ${(1 - orbitOpacity) * 18}px, 0) scale(${0.97 + orbitOpacity * 0.03})`,
      }}
      aria-hidden="true"
    >
      <div className="hero-orbit-stage">
        <div className="hero-orbit-glow" />
        <div className="hero-orbit-ring hero-orbit-ring-lg" />
        <div className="hero-orbit-ring hero-orbit-ring-md" />
        <div className="hero-orbit-ring hero-orbit-ring-sm" />

        <span className="hero-sparkle hero-sparkle-1" />
        <span className="hero-sparkle hero-sparkle-2" />
        <span className="hero-sparkle hero-sparkle-3" />
        <span className="hero-sparkle hero-sparkle-4" />
        <span className="hero-sparkle hero-sparkle-5" />

        <div className="hero-orbit-shell">
          {orbitCards.map((card, index) => {
            const Icon = card.Icon
            const style = {
              '--orbit-angle': `${card.angle}deg`,
              '--orbit-angle-inverse': `${-card.angle}deg`,
              '--float-delay': `${index * -0.65}s`,
              '--icon-bg': card.iconBg,
              '--icon-color': card.iconColor,
            } as CSSProperties

            return (
              <div key={card.title} className="hero-orbit-item" style={style}>
                <div className="hero-orbit-upright">
                  <div className="hero-orbit-card">
                    <span className="hero-orbit-icon">
                      <Icon size={21} strokeWidth={2.2} />
                    </span>
                    <span>
                      <span className="block font-sans text-[14px] font-bold leading-tight text-[var(--text-primary)]">
                        {card.title}
                      </span>
                      <span className="mt-1 block font-sans text-[12px] font-semibold leading-tight text-[var(--text-secondary)]">
                        {card.subtitle}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ScrollIndicator({ progress }: { progress: number }) {
  return (
    <div
      className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--c-cream)]/55 transition-opacity duration-300"
      style={{ opacity: progress > 0.05 ? 0 : 1 }}
      aria-hidden={progress > 0.05}
    >
      <span>Scroll to explore</span>
      <span className="relative h-14 w-px overflow-hidden bg-[rgba(245,240,232,0.18)]">
        <span className="hero-scroll-dot absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--c-orange)] shadow-[0_0_22px_rgba(255,107,44,0.55)]" />
      </span>
    </div>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canvasOpacity, setCanvasOpacity] = useState(1)

  const handleDeviceProjection = useCallback((point: { x: number; y: number }) => {
    const heroRoot = pinRef.current
    if (!heroRoot) return

    heroRoot.style.setProperty('--hero-device-x', `${point.x}px`)
    heroRoot.style.setProperty('--hero-device-y', `${point.y}px`)
  }, [])

  useEffect(() => {
    let context: { revert: () => void } | undefined
    let trigger: { kill: () => void } | undefined
    let mounted = true

    const setup = async () => {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)')

      if (media.matches) {
        setScrollProgress(0.32)
        setCanvasOpacity(1)
        return
      }

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (!mounted || !sectionRef.current || !pinRef.current) return

      gsap.registerPlugin(ScrollTrigger)
      context = gsap.context(() => {
        trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: pinRef.current,
          scrub: 0.85,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress
            setScrollProgress(progress)
            setCanvasOpacity(1 - clamp((progress - 0.88) / 0.12))
          },
        })
      }, sectionRef)
    }

    setup()

    return () => {
      mounted = false
      trigger?.kill()
      context?.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-[var(--bg-primary)]">
      <div ref={pinRef} className="hero-grain relative h-screen overflow-hidden bg-[var(--bg-primary)]">
        <HeroOrbitCards scrollProgress={scrollProgress} />
        {canvasOpacity > 0.02 ? (
          <CheekoCanvas scrollProgress={scrollProgress} opacity={canvasOpacity} onDeviceProjection={handleDeviceProjection} />
        ) : null}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,247,242,0.08)_45%,rgba(250,247,242,0.78)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-[var(--bg-primary)] via-[rgba(250,247,242,0.74)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-[rgba(250,247,242,0.86)] to-transparent" />

        <div className="absolute inset-0 z-20">
          <HeroCopy scrollProgress={scrollProgress} />
        </div>

        <ScrollIndicator progress={scrollProgress} />
      </div>
    </section>
  )
}
