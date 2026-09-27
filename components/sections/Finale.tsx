'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

export default function Finale() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' })
  const [phase, setPhase] = useState(0)
  const { lang } = useLang()
  const tr = t[lang]

  useEffect(() => {
    if (!isInView) return
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 2800),
      setTimeout(() => setPhase(3), 4200),
      setTimeout(() => setPhase(4), 5800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [isInView])

  return (
    <section ref={ref} className="min-h-screen bg-[#0d0b09] flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden">
      {/* Голубое свечение верх-лево */}
      <div className="absolute -top-20 -left-20 w-[70%] h-[70%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(40,120,200,0.25) 0%, transparent 60%)' }} />
      {/* Зелёное свечение низ-право */}
      <div className="absolute -bottom-20 -right-20 w-[65%] h-[65%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(30,160,100,0.20) 0%, transparent 60%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-warm)]/15 to-transparent" />
      <div className="max-w-2xl mx-auto text-center">

        {/* ══ «Мы пишем...» — перед главным вопросом ══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          {tr.finale_we_write.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.4,
                delay: 0.3 + i * 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: 'inline-block',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'rgba(196,168,130,0.80)',
                letterSpacing: char === ' ' ? '0.2em' : '0.01em',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>

        {/* Разделитель */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mb-16 origin-center"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(196,168,130,0.20), transparent)',
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-light"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', color: '#f0ebe0', marginBottom: '3rem' }}
        >
          {tr.finale_question}
        </motion.h2>

        <div className="space-y-6 mb-16">
          {phase >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-serif text-[clamp(1.1rem,2.5vw,1.35rem)] font-light italic text-[var(--color-muted)]"
            >
              {tr.finale_dont_know}
            </motion.p>
          )}
          {phase >= 2 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 1 }}
              className="font-serif text-sm italic text-[var(--color-muted)]"
            >
              {tr.finale_pause}
            </motion.p>
          )}
          {phase >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-serif text-[clamp(1rem,2.5vw,1.25rem)] font-light italic text-[var(--color-muted)]"
            >
              {tr.finale_nobody}
            </motion.p>
          )}
          {phase >= 4 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-serif text-[clamp(1rem,2.5vw,1.25rem)] font-light text-[var(--color-paper)] mt-4"
            >
              {tr.finale_create}
            </motion.p>
          )}
        </div>

        {phase >= 4 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <p className="font-serif font-light text-[clamp(1.8rem,5vw,3.5rem)] text-[var(--color-paper)] leading-tight mb-2">
                {tr.finale_line1}
              </p>
              <p className="font-serif font-light text-[clamp(1.8rem,5vw,3.5rem)] text-[var(--color-warm)] italic leading-tight">
                {tr.finale_line2}
              </p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#e63535',
                textShadow: '0 0 20px rgba(230,53,53,0.50)',
              }}
            >
              {tr.finale_continues}
            </motion.p>
          </>
        )}
      </div>
    </section>
  )
}
