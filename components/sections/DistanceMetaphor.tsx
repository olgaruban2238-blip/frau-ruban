'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

// Реальный контур Германии
const GERMANY = `M 97 4 L 100 7 L 106 6 L 110 10 L 115 9 L 119 13
L 122 11 L 126 14 L 128 19 L 132 21 L 135 18 L 140 20
L 143 25 L 140 30 L 144 34 L 143 39 L 147 43 L 145 49
L 148 53 L 144 57 L 146 63 L 142 67 L 138 65 L 134 69
L 130 74 L 124 77 L 120 84 L 114 88 L 108 87 L 104 92
L 98 94 L 92 90 L 87 92 L 81 89 L 78 84 L 72 82 L 68 77
L 63 76 L 58 71 L 55 65 L 50 62 L 48 56 L 44 52 L 46 46
L 42 41 L 44 36 L 41 30 L 44 25 L 49 22 L 52 17 L 57 14
L 54 9 L 58 5 L 64 4 L 68 8 L 73 6 L 78 9 L 83 7 L 88 4
L 93 6 Z`

// Реальный контур США (континентальная часть)
const USA = `M 14 42 L 8 38 L 4 32 L 6 26 L 10 22 L 16 20
L 22 18 L 30 16 L 40 14 L 52 12 L 66 10 L 82 9
L 98 8 L 114 8 L 130 9 L 146 11 L 160 14 L 172 17
L 182 20 L 190 24 L 196 28 L 200 33 L 202 39
L 200 45 L 197 50 L 194 55 L 188 60 L 182 64
L 174 68 L 165 72 L 154 76 L 142 80 L 130 83
L 116 85 L 102 86 L 88 86 L 74 84 L 60 81
L 48 77 L 37 72 L 28 66 L 20 60 L 15 54 L 12 48 Z
M 22 88 L 30 85 L 36 88 L 34 93 L 26 94 Z
M 6 74 L 14 72 L 16 77 L 10 80 Z`

export default function DistanceMetaphor() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  const { lang } = useLang()
  const copy = t[lang]

  return (
    <section ref={ref} className="bg-[#0a0908] overflow-hidden relative" style={{ padding: '5rem 1rem 4rem' }}>

      {/* Свечения */}
      <div className="absolute -top-20 -left-20 w-[55%] h-[70%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(40,120,200,0.22) 0%, transparent 65%)' }} />
      <div className="absolute -bottom-20 -right-20 w-[55%] h-[65%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(30,160,100,0.20) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-14"
        >
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(158,142,120,0.55)', marginBottom: '1rem',
          }}>{copy.distance_label}</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.4rem, 3.5vw, 2.3rem)',
            fontStyle: 'italic', fontWeight: 300,
            color: 'rgba(240,235,224,0.85)',
          }}>
            {copy.distance_line}
          </p>
        </motion.div>

        {/* ══ ЕДИНАЯ SVG-КОМПОЗИЦИЯ ══ */}
        <div className="w-full flex justify-center">
          <svg
            viewBox="0 0 1000 340"
            className="w-full"
            style={{ maxHeight: '420px', overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="rgba(100,175,235,0.80)" />
                <stop offset="30%"  stopColor="rgba(150,200,240,0.90)" />
                <stop offset="50%"  stopColor="rgba(184,147,58,1.00)" />
                <stop offset="70%"  stopColor="rgba(100,210,150,0.90)" />
                <stop offset="100%" stopColor="rgba(80,200,130,0.80)" />
              </linearGradient>
              <filter id="glowBlue">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glowGreen">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* ══ ГЕРМАНИЯ — левая сторона ══ */}
            {/* Свечение-аура */}
            <ellipse cx="175" cy="155" rx="130" ry="130"
              fill="rgba(56,130,210,0.07)" />

            {/* Карта — заливка */}
            <motion.path
              d={GERMANY}
              transform="translate(75,55) scale(1.95)"
              fill="rgba(56,120,190,0.16)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            />
            {/* Карта — обводка */}
            <motion.path
              d={GERMANY}
              transform="translate(75,55) scale(1.95)"
              fill="none"
              stroke="rgba(100,175,235,0.90)"
              strokeWidth="2"
              strokeLinejoin="round"
              filter="url(#glowBlue)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 3, delay: 0.3, ease: 'easeInOut' }}
            />

            {/* Точка — Берлин */}
            <motion.circle cx="298" cy="127" r="7" fill="#c8ad86"
              initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 2.8, type: 'spring' }} />
            <motion.circle cx="298" cy="127" r="7"
              stroke="rgba(200,173,134,0.50)" strokeWidth="2" fill="none"
              animate={{ scale: [1, 3.5], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} />

            {/* Подпись автор */}
            <motion.text x="175" y="300" textAnchor="middle"
              fill="rgba(240,235,224,0.85)" fontSize="18"
              fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}>{copy.distance_author}</motion.text>
            <motion.text x="175" y="320" textAnchor="middle"
              fill="rgba(100,175,235,0.80)" fontSize="13"
              fontFamily="Inter, sans-serif" letterSpacing="2"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}>🇩🇪  GERMANY</motion.text>

            {/* ══ США — правая сторона ══ */}
            {/* Свечение-аура */}
            <ellipse cx="800" cy="155" rx="160" ry="120"
              fill="rgba(40,170,100,0.07)" />

            {/* Карта — заливка */}
            <motion.path
              d={USA}
              transform="translate(620,80) scale(1.85)"
              fill="rgba(40,150,90,0.14)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            />
            {/* Карта — обводка */}
            <motion.path
              d={USA}
              transform="translate(620,80) scale(1.85)"
              fill="none"
              stroke="rgba(80,205,135,0.88)"
              strokeWidth="2"
              strokeLinejoin="round"
              filter="url(#glowGreen)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }}
            />

            {/* Точка — центр США */}
            <motion.circle cx="810" cy="155" r="7" fill="#c8ad86"
              initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 3.0, type: 'spring' }} />
            <motion.circle cx="810" cy="155" r="7"
              stroke="rgba(200,173,134,0.50)" strokeWidth="2" fill="none"
              animate={{ scale: [1, 3.5], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, delay: 0.5, repeat: Infinity, ease: 'easeOut' }} />

            {/* Подпись исполнитель */}
            <motion.text x="810" y="300" textAnchor="middle"
              fill="rgba(240,235,224,0.85)" fontSize="18"
              fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}>{copy.distance_performer}</motion.text>
            <motion.text x="810" y="320" textAnchor="middle"
              fill="rgba(80,205,135,0.80)" fontSize="13"
              fontFamily="Inter, sans-serif" letterSpacing="2"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}>🇺🇸  USA</motion.text>

            {/* ══ СОЕДИНИТЕЛЬНАЯ ДУГА — от точки Берлин до точки USA ══ */}
            {/* Тень дуги */}
            <motion.path
              d="M 298 127 Q 555 -30 810 155"
              stroke="rgba(184,147,58,0.15)"
              strokeWidth="8"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 3.5, delay: 2.2, ease: 'easeInOut' }}
            />
            {/* Основная дуга */}
            <motion.path
              d="M 298 127 Q 555 -30 810 155"
              stroke="url(#arcGrad)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 3.5, delay: 2.2, ease: 'easeInOut' }}
            />

            {/* ══ НОТА по центру дуги ══ */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 4.5, type: 'spring' }}
            >
              {/* Свечение ноты */}
              <ellipse cx="555" cy="38" rx="40" ry="30"
                fill="rgba(184,147,58,0.12)" />
              {/* Нота — голова */}
              <ellipse cx="555" cy="52" rx="11" ry="8.5" fill="#b8933a" />
              {/* Штиль */}
              <line x1="566" y1="52" x2="566" y2="10"
                stroke="#b8933a" strokeWidth="2.5" />
              {/* Флажок */}
              <path d="M 566 10 Q 586 18 578 34"
                stroke="#b8933a" strokeWidth="2.5" fill="none" />
            </motion.g>

          </svg>
        </div>

        {/* Подпись снизу */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 4 }}
          className="text-center mt-6"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic', fontWeight: 300,
            color: 'rgba(196,168,130,0.60)',
          }}
        >
          {copy.distance_path}
        </motion.p>

      </div>
    </section>
  )
}
