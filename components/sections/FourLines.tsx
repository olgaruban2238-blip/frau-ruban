'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

export default function FourLines() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-150px 0px' })
  const [phase, setPhase] = useState(0)
  const { lang } = useLang()
  const tr = t[lang]

  useEffect(() => {
    if (!isInView) return
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => setPhase(4), 4600),
      setTimeout(() => setPhase(5), 6000),
      setTimeout(() => setPhase(6), 7800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [isInView])

  return (
    <section
      ref={ref}
      className="min-h-screen bg-[#0d0b09] flex flex-col items-center justify-center py-24 px-6 overflow-hidden relative"
    >
      {/* Голубое свечение */}
      <div className="absolute -top-10 -left-10 w-[65%] h-[65%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(40,120,200,0.28) 0%, transparent 60%)' }} />
      {/* Зелёное свечение */}
      <div className="absolute -bottom-10 right-0 w-[60%] h-[60%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(30,160,100,0.22) 0%, transparent 60%)' }} />
      {/* Вводная подпись */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '1rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(180,215,235,0.75)',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        {tr.four_label}
      </motion.p>

      {/* ── Большая цифра 4 ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="font-serif font-light select-none glow-warm"
          style={{
            fontSize: 'clamp(9rem, 28vw, 20rem)',
            lineHeight: 0.85,
            color: '#f0ebe0',
          }}
        >
          4
        </span>
      </motion.div>

      {/* ── «строки» ── */}
      {phase >= 1 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(158,142,120,0.85)',
            marginTop: '0.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {tr.four_lines_word}
        </motion.p>
      )}

      {/* ── Цитата «Я — мираж...» ── */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: 'center',
            maxWidth: '480px',
            marginBottom: '3rem',
            padding: '0 1rem',
          }}
        >
          {/* Кавычка открывающая */}
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '5.5rem',
            lineHeight: 0.4,
            color: 'rgba(196,168,130,0.65)',
            display: 'block',
            marginBottom: '0.8rem',
            textShadow: '0 0 30px rgba(196,168,130,0.25)',
          }}>
            &ldquo;
          </span>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.7rem, 4.5vw, 2.6rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'rgba(240,235,224,0.95)',
            lineHeight: 1.5,
            letterSpacing: '0.01em',
          }}>
            {tr.four_quote}
          </p>
          {/* Кавычка закрывающая */}
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '5.5rem',
            lineHeight: 0.4,
            color: 'rgba(196,168,130,0.65)',
            display: 'block',
            marginTop: '0.8rem',
            textAlign: 'right',
            textShadow: '0 0 30px rgba(196,168,130,0.25)',
          }}>
            &rdquo;
          </span>
        </motion.div>
      )}

      {/* ── Реакция Стэна ── */}
      <div style={{ textAlign: 'center', maxWidth: '420px', width: '100%' }}>

        {phase >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.5rem, 3.8vw, 2.1rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#f0ebe0',
              marginBottom: '1.4rem',
            }}
          >
            {tr.four_sang}
          </motion.p>
        )}

        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1rem' }}
          >
            <div style={{ width: '28px', height: '1px', background: 'rgba(158,142,120,0.35)' }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(158,142,120,0.80)',
            }}>{tr.four_not_read}</p>
            <div style={{ width: '28px', height: '1px', background: 'rgba(158,142,120,0.35)' }} />
          </motion.div>
        )}

        {phase >= 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '2.5rem' }}
          >
            <div style={{ width: '28px', height: '1px', background: 'rgba(158,142,120,0.35)' }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(158,142,120,0.80)',
            }}>{tr.four_not_disc}</p>
            <div style={{ width: '28px', height: '1px', background: 'rgba(158,142,120,0.35)' }} />
          </motion.div>
        )}

        {/* ── Финальное «Спел.» — самое крупное ── */}
        {phase >= 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 300,
              color: '#c8ad86',
              letterSpacing: '-0.01em',
              textShadow: '0 0 60px rgba(200,173,134,0.30)',
            }}>
              {tr.four_sang_big}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
