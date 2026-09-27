'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CounterProps {
  target: number
  suffix?: string
  duration?: number
  className?: string
}

export default function Counter({
  target,
  suffix = '',
  duration = 2500,
  className = '',
}: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true
      const start = Date.now()
      const tick = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
        else setCount(target)
      }
      requestAnimationFrame(tick)
    }
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString('ru-RU')}
      {suffix}
    </span>
  )
}
