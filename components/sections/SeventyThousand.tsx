'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Counter from '@/components/ui/Counter'
import FadeIn from '@/components/ui/FadeIn'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

export default function SeventyThousand() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' })
  const { lang } = useLang()
  const copy = t[lang]

  return (
    <section ref={ref} className="bg-[#0d0b09] py-32 px-6 relative overflow-hidden">
      {/* Голубое */}
      <div className="absolute -top-20 -left-10 w-[60%] h-[70%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(40,120,200,0.20) 0%, transparent 65%)' }} />
      {/* Зелёное */}
      <div className="absolute -bottom-10 -right-10 w-[55%] h-[60%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(30,160,100,0.18) 0%, transparent 65%)' }} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="font-serif font-light text-[clamp(5rem,18vw,13rem)] leading-none text-[var(--color-paper)]">
            <Counter target={70000} suffix="+" duration={3000} />
          </span>
        </motion.div>
        <FadeIn delay={0.3}>
          <p className="font-serif text-[clamp(1.1rem,3vw,1.5rem)] font-light text-[var(--color-muted)] italic mb-10">
            {copy.seventy_label}
          </p>
        </FadeIn>
        <FadeIn delay={0.6} className="flex justify-center mb-10">
          <div className="divider" />
        </FadeIn>
        <FadeIn delay={0.9} className="space-y-5">
          <p className="font-serif italic" style={{ fontSize: 'clamp(1.3rem, 3.2vw, 1.9rem)', color: 'rgba(196,168,130,0.80)' }}>
            {copy.seventy_line1}
          </p>
          <p className="font-serif italic" style={{ fontSize: 'clamp(1.3rem, 3.2vw, 1.9rem)', color: 'rgba(240,235,224,0.90)', lineHeight: 1.6 }}>
            {copy.seventy_line2}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
