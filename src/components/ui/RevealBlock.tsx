import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface RevealBlockProps {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  delayChildren?: number
  once?: boolean
  threshold?: number
  y?: number
  duration?: number
}

export default function RevealBlock({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
  delayChildren = 0,
  once = true,
  threshold = 0.15,
  y = 50,
  duration = 0.7,
}: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay + delayChildren,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <motion.div key={i} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  )
}
