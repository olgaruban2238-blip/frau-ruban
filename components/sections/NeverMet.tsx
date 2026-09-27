'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

export default function NeverMet() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' })
  const [showSub, setShowSub]     = useState(false)
  const [showText, setShowText]   = useState(false)
  const [showWords, setShowWords] = useState(false)
  const [showFinal, setShowFinal] = useState(false)
  const { lang } = useLang()
  const tr = t[lang]
  const words = tr.never_words

  useEffect(() => {
    if (!isInView) return
    const t1 = setTimeout(() => setShowSub(true),   1400)
    const t2 = setTimeout(() => setShowText(true),  2800)
    const t3 = setTimeout(() => setShowWords(true), 4400)
    const t4 = setTimeout(() => setShowFinal(true), 4400 + words.length * 420 + 800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [isInView])

  return (
    <section
      ref={ref}
      className="min-h-screen bg-[#0d0b09] flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden"
    >
      {/* Голубое свечение */}
      <div className="absolute -top-10 -left-10 w-[65%] h-[65%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(40,120,200,0.22) 0%, transparent 65%)' }} />
      {/* Зелёное свечение */}
      <div className="absolute -bottom-10 -right-10 w-[60%] h-[60%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(30,160,100,0.18) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center w-full">

        {/* ══ ГЛАВНАЯ ФРАЗА — появляется слово за словом ══ */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#f0ebe0',
            marginBottom: '1.2rem',
            overflow: 'hidden',
          }}
        >
          {tr.never_title.split(' ').map((word, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}
            >
              <motion.span
                style={{ display: 'inline-block' }}
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : {}}
                transition={{
                  duration: 1.1,
                  delay: i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </div>

        {/* ══ «В реальности.» — появляется после паузы, мелко и тихо ══ */}
        <div style={{ height: '4.5rem', marginBottom: '3rem' }}>
          {showSub && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#c0392b',
                textShadow: '0 0 40px rgba(192,57,43,0.45)',
              }}
            >
              {tr.never_reality}
            </motion.p>
          )}
        </div>

        {/* ══ Объяснение ══ */}
        {showText && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.15rem, 3vw, 1.65rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.65,
              color: 'rgba(240,235,224,0.78)',
              maxWidth: '640px',
              margin: '0 auto 3.5rem',
            }}
          >
            {tr.never_text}
          </motion.p>
        )}

        {/* ══ Слова появляются одно за другим ══ */}
        {showWords && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            marginBottom: '3rem',
          }}>
            {words.map((word, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: i * 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(196,168,130,0.72)',
                  letterSpacing: '0.01em',
                }}
              >
                {word}
              </motion.p>
            ))}
          </div>
        )}

        {/* ══ НАСТОЯЩИМИ — финальное слово, самое крупное ══ */}
        {showFinal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Разделитель */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                width: '60px', height: '1px', margin: '0 auto 1.5rem',
                background: 'linear-gradient(to right, rgba(100,165,220,0.6), rgba(196,168,130,0.6))',
              }}
            />
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              fontWeight: 300,
              color: '#c8ad86',
              letterSpacing: '-0.01em',
              textShadow: '0 0 80px rgba(200,173,134,0.30), 0 0 30px rgba(40,160,100,0.15)',
            }}>
              {tr.never_final}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
