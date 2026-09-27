'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

export default function RevealText({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.04,
  tag: Tag = 'div',
}: RevealTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: delay + i * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
