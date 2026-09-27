'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { wordStream } from '@/lib/data'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

const songTitles: Record<string, string> = {
  'любовь': '«Скворушка»',
  'память': '«Мадам»',
  'война': '«Скамейка»',
  'одиночество': '«Баркарола»',
  'радость': '«Осенний сад»',
  'потеря': '«Weihnachten»',
  'надежда': '«My little girl»',
  'жизнь': '«Танго»',
  'дорога': '«Облака»',
  'тишина': '«Звездопад»',
  'свет': '«Чёрный кофе»',
  'ночь': '«Чайная роза»',
  'встреча': '«Ханука»',
  'разлука': '«Цыганское счастье»',
  'время': '«Февраль»',
  'голос': '«Звездопад»',
  'слово': '«Вальс в саду»',
  'сердце': '«Олюшка»',
  'небо': '«Девочка звёздочка»',
  'дом': '«Наш дом»',
}

export default function WordStream() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' })
  const [transformed, setTransformed] = useState<Set<number>>(new Set())
  const { lang } = useLang()
  const copy = t[lang]
  
  // Use translated word stream
  const words = copy.word_words

  useEffect(() => {
    if (!isInView) return
    words.forEach((_, i) => {
      setTimeout(() => {
        setTransformed(prev => new Set([...prev, i]))
      }, 1200 + i * 300)
    })
  }, [isInView, words])

  return (
    <section ref={ref} className="min-h-screen bg-[#0d0b09] flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden">

      {/* Голубое свечение слева */}
      <div className="absolute -top-20 -left-20 w-[70%] h-[70%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(40,120,200,0.22) 0%, transparent 65%)' }} />
      {/* Зелёное свечение справа */}
      <div className="absolute -bottom-20 -right-20 w-[65%] h-[65%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(30,160,100,0.20) 0%, transparent 65%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="font-serif font-light italic"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', color: '#f0ebe0' }}>
          {copy.word_title}
        </h2>
        <p className="font-serif font-light italic mt-4 max-w-lg mx-auto"
          style={{ fontSize: 'clamp(1.1rem, 2.8vw, 1.5rem)', color: 'rgba(158,142,120,0.80)' }}>
          {copy.word_subtitle}
        </p>
      </motion.div>

      {/* Облако названий песен — разные размеры и углы */}
      <div className="relative z-10 flex flex-wrap justify-center gap-x-5 gap-y-4 max-w-5xl mx-auto px-4">
        {words.map((word, i) => {
          // Размеры — 4 варианта, чередуются нерегулярно
          const sizeMap = [1.0, 1.4, 0.85, 1.7, 1.1, 1.5, 0.9, 1.3, 1.6, 0.95,
                           1.2, 1.45, 0.88, 1.65, 1.05, 1.35, 0.92, 1.55, 1.15, 1.4]
          const size = sizeMap[i % sizeMap.length]
          // Лёгкий случайный наклон
          const rotateMap = [0, -1.5, 1, -0.8, 1.8, -1.2, 0.5, -2, 1.5, -0.5,
                             1.2, -1.8, 0.8, -1, 2, -0.3, 1.6, -1.4, 0.6, -1.1]
          const rotate = rotateMap[i % rotateMap.length]
          // Прозрачность — слова потемнее, названия ярче
          const baseOpacity = transformed.has(i) ? 0.88 : 0.55

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, rotate: rotate * 2 }}
              animate={isInView ? { opacity: 1, y: 0, rotate } : {}}
              transition={{ duration: 0.9, delay: 0.08 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.18, rotate: 0, zIndex: 10 }}
              style={{ display: 'inline-block', cursor: 'default' }}
            >
              <motion.span
                animate={transformed.has(i) ? {
                  color: `rgba(196,168,130,${baseOpacity})`,
                  textShadow: '0 0 20px rgba(196,168,130,0.25)',
                } : {
                  color: `rgba(200,185,165,${baseOpacity})`,
                  textShadow: 'none',
                }}
                transition={{ duration: 0.8 }}
                style={{
                  display: 'inline-block',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: transformed.has(i)
                    ? `${size * 1.1}rem`
                    : `${size * 0.95}rem`,
                  fontWeight: 300,
                  fontStyle: transformed.has(i) ? 'normal' : 'italic',
                  lineHeight: 1.3,
                  transition: 'font-size 0.6s ease',
                }}
              >
                {transformed.has(i) ? songTitles[word] || `«${word}»` : word}
              </motion.span>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: words.length * 0.08 + 0.5 }}
        className="mt-16 relative z-10"
      >
        <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'rgba(60,200,120,0.90)',
            textShadow: '0 0 30px rgba(40,180,100,0.40)',
            textAlign: 'center',
          }}>
          {copy.word_end}
        </p>
      </motion.div>
    </section>
  )
}
