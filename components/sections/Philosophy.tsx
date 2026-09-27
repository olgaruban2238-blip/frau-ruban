'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  const { lang } = useLang()
  const copy = t[lang]
  const topics = copy.phil_topics

  return (
    <section
      ref={ref}
      className="bg-[#0a0908] py-24 px-6 border-y border-[rgba(196,168,130,0.05)] relative overflow-hidden"
    >
      {/* Голубое свечение */}
      <div className="absolute -top-20 -left-10 w-[55%] h-[65%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(40,120,200,0.15) 0%, transparent 65%)' }} />
      {/* Зелёное свечение */}
      <div className="absolute -bottom-10 -right-10 w-[50%] h-[55%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(30,160,100,0.12) 0%, transparent 65%)' }} />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Заголовок */}
        <FadeIn className="mb-10">
          <h3 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(196,168,130,0.75)',
            marginBottom: '0.5rem',
          }}>
            {copy.phil_title}
          </h3>
          <div style={{ width: '32px', height: '1px', background: 'rgba(196,168,130,0.30)' }} />
        </FadeIn>

        {/* Основной текст */}
        <FadeIn delay={0.2} className="space-y-4 mb-10">
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            fontWeight: 300,
            color: '#f0ebe0',
          }}>
            {copy.phil_line1}
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            fontWeight: 300,
            color: '#f0ebe0',
          }}>
            {copy.phil_line2}
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(240,235,224,0.65)',
          }}>
            {copy.phil_line3}
          </p>
        </FadeIn>

        {/* ══ ЛЕСЕНКА — слева направо, каждое слово ниже ══ */}
        <div style={{ position: 'relative', height: `${topics.length * 62}px`, marginTop: '1.5rem', overflowX: 'auto', paddingLeft: 'clamp(2rem, 8vw, 6rem)' }}>
          {topics.map((topic, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50, y: 10 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{
                duration: 1.0,
                delay: 0.5 + i * 0.30,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: 'absolute',
                left: `${i * 95}px`,
                top: `${i * 58}px`,
                whiteSpace: 'nowrap',
              }}
            >
              {/* Тонкая линия перед словом */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.30 }}
                style={{
                  display: 'inline-block',
                  width: '18px',
                  height: '1px',
                  background: `rgba(196,168,130,${0.25 + i * 0.06})`,
                  marginRight: '10px',
                  verticalAlign: 'middle',
                  transformOrigin: 'left',
                }}
              />
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: i === topics.length - 1
                  ? 'rgba(240,235,224,0.97)'
                  : `rgba(196,168,130,${0.48 + i * 0.08})`,
                textShadow: i === topics.length - 1
                  ? '0 0 30px rgba(240,235,224,0.15)'
                  : 'none',
              }}>
                {topic}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
