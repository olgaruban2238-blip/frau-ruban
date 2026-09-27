'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y        = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#07080a' }}
    >

      {/* ══ ФОТО — чуть светлее, параллакс ══ */}
      <motion.div
        style={{ scale: imgScale }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/olga.jpeg"
          alt={tr.hero_eyebrow}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 18%', filter: 'brightness(1.18) contrast(1.06) saturate(1.12)' }}
        />
      </motion.div>

      {/* ══ OVERLAY — светлый, с красивыми цветными акцентами ══ */}
      <div className="absolute inset-0 z-10">
        {/* Основной тёмный слой — очень лёгкий, фото хорошо видно */}
        <div className="absolute inset-0 bg-[#07080a]/38" />

        {/* Градиент снизу — для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-t
          from-[#07080a]/95
          via-[#07080a]/40
          to-transparent"
        />

        {/* Лёгкая тень сверху */}
        <div className="absolute top-0 left-0 right-0 h-36
          bg-gradient-to-b from-[#07080a]/45 to-transparent"
        />

        {/* ══ ГОЛУБОЕ свечение — сильнее, красиво ══ */}
        <div className="absolute -top-10 -left-10 w-[65%] h-[65%]
          bg-[radial-gradient(ellipse,rgba(56,140,200,0.28)_0%,transparent_60%)]"
        />

        {/* ══ ЗЕЛЁНОЕ свечение — правый низ ══ */}
        <div className="absolute -bottom-10 -right-10 w-[60%] h-[60%]
          bg-[radial-gradient(ellipse,rgba(40,160,100,0.22)_0%,transparent_60%)]"
        />

        {/* Золотой блик — солнечный тон фото */}
        <div className="absolute top-[10%] left-[35%] w-[50%] h-[55%]
          bg-[radial-gradient(ellipse,rgba(220,175,90,0.13)_0%,transparent_55%)]"
        />

        {/* CSS filter поверх фото — brightness + contrast */}
        <div className="absolute inset-0 mix-blend-overlay
          bg-[radial-gradient(ellipse_80%_80%_at_55%_35%,rgba(255,235,200,0.18)_0%,transparent_65%)]"
        />

        {/* Виньет по бокам — мягкий */}
        <div className="absolute inset-0
          bg-[linear-gradient(to_right,rgba(7,8,10,0.40)_0%,transparent_22%,transparent_78%,rgba(7,8,10,0.40)_100%)]"
        />
      </div>

      {/* ══ Горизонтальная линия — тонкий акцент ══ */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2.5, delay: 1.5, ease: 'easeOut' }}
        className="absolute top-[58%] left-0 right-0 h-px z-20 origin-left"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(56,130,180,0.25) 20%, rgba(200,160,80,0.20) 50%, rgba(40,120,80,0.20) 80%, transparent)',
        }}
      />

      {/* ══ КОНТЕНТ ══ */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-30 text-center px-6 md:px-12 max-w-5xl mx-auto w-full"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.22em' }}
          transition={{ duration: 2.2, delay: 0.4 }}
          className="mb-10 md:mb-14"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '0.78rem',
            fontWeight: 300,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(180,210,230,0.75)',   /* голубоватый оттенок */
          }}
        >
          {tr.hero_eyebrow}
        </motion.p>

        {/* Главный заголовок — строка 1 */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.8rem, 7.5vw, 7.8rem)',
              fontWeight: 300,
              lineHeight: 0.93,
              letterSpacing: '-0.02em',
              color: '#f0ebe0',
            }}
          >
            {tr.hero_line1}
          </motion.h1>
        </div>

        {/* Главный заголовок — строка 2, золотая */}
        <div className="overflow-hidden mb-12 md:mb-16">
          <motion.h1
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.8rem, 7.5vw, 7.8rem)',
              fontWeight: 300,
              lineHeight: 0.93,
              letterSpacing: '-0.02em',
              fontStyle: 'italic',
              color: '#c8ad86',
              textShadow: '0 0 60px rgba(200,173,134,0.25)',
            }}
          >
            {tr.hero_line2}
          </motion.h1>
        </div>

        {/* Подзаголовок — крупный, хорошо читается */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 1.9 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.25rem, 3.2vw, 1.9rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.55,
            color: 'rgba(240,235,224,0.88)',
            maxWidth: '780px',
            margin: '0 auto 3.5rem',
          }}
        >
          {tr.hero_subtitle}
        </motion.p>

        {/* CTA кнопки */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          {/* Кнопка 1 — текстовая */}
          <a
            href="#story"
            className="flex items-center gap-3 transition-all duration-400 group"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.78rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 300,
              color: 'rgba(240,235,224,0.80)',
            }}
          >
            <span className="group-hover:text-[#c8ad86] transition-colors duration-300">
              {tr.hero_cta1}
            </span>
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              style={{ color: '#c8ad86' }}
            >
              ↓
            </motion.span>
          </a>

          <span className="hidden sm:block w-px h-5 bg-white/15" />

          {/* Кнопка 2 — рамка с голубоватым оттенком */}
          <a
            href="#songs"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.78rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 300,
              color: 'rgba(180,215,235,0.75)',
              border: '1px solid rgba(100,165,200,0.30)',
              padding: '12px 28px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              transition: 'all 0.35s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#f0ebe0'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(100,165,200,0.65)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(56,130,180,0.12)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(180,215,235,0.75)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(100,165,200,0.30)'
              ;(e.currentTarget as HTMLElement).style.background = 'transparent'
            }}
          >
            {tr.hero_cta2}
          </a>
        </motion.div>
      </motion.div>

      {/* ══ Декор: левая вертикальная линия с годом ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1.5 }}
        className="absolute left-6 md:left-12 bottom-12 hidden lg:flex items-end gap-3 z-30"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[rgba(100,165,200,0.35)] to-transparent" />
        <span
          className="rotate-90 origin-left translate-y-10"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(100,165,200,0.45)',
          }}
        >
          2020–2026
        </span>
      </motion.div>

      {/* ══ Декор: правая подпись ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1.5 }}
        className="absolute right-6 md:right-12 bottom-8 z-30 hidden sm:flex items-center gap-2"
      >
        <div className="w-5 h-px bg-[rgba(40,160,100,0.40)]" />
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontSize: '0.75rem',
          color: 'rgba(100,180,130,0.50)',
        }}>
          {tr.hero_eyebrow}
        </p>
      </motion.div>

    </section>
  )
}
