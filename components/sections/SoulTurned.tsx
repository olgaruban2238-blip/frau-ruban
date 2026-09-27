'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

export default function SoulTurned() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-120px 0px' })
  const { lang } = useLang()
  const copy = t[lang]

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-24 px-6 bg-[#080706] relative overflow-hidden">
      {/* Голубое свечение */}
      <div className="absolute -top-20 left-0 w-[70%] h-[70%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(40,100,180,0.20) 0%, transparent 65%)' }} />
      {/* Зелёное свечение */}
      <div className="absolute -bottom-20 -right-20 w-[65%] h-[65%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(30,140,90,0.18) 0%, transparent 65%)' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[var(--color-warm)]/10" />
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2.5, ease: 'easeIn' }}
          className="mb-16"
        >
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem, 5vw, 4rem)', fontStyle: 'italic', fontWeight: 300, color: '#f0ebe0', lineHeight: 1.3 }}>
            {copy.soul_quote1}
          </p>
        </motion.div>
        <FadeIn delay={0.8}>
          <p className="font-serif text-[clamp(1rem,2.5vw,1.25rem)] italic text-[var(--color-muted)] mb-8">
            {copy.soul_quote2}
          </p>
        </FadeIn>
        <FadeIn delay={1.4}>
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="w-12 h-px bg-[var(--color-warm)]/20" />
            <p className="font-serif text-[clamp(1.1rem,3vw,1.5rem)] text-[var(--color-warm)] font-light">
              {copy.soul_band}
            </p>
            <div className="w-12 h-px bg-[var(--color-warm)]/20" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem',
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: 'rgba(100,175,235,0.55)',
              marginTop: '0.75rem',
              textAlign: 'center',
            }}
          >
            — Stan
          </motion.p>
        </FadeIn>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent to-[var(--color-warm)]/10" />
    </section>
  )
}
