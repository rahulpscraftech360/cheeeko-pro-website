import { useRef, useEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxTextProps {
  children: ReactNode
  className?: string
  factor?: number
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function ParallaxText({
  children,
  className = '',
  factor = 0.15,
  as: Tag = 'div',
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => -window.innerHeight * factor,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [factor])

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </Tag>
  )
}
