'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { languages } from '@/lib/data'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

export default function Languages() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  const { lang } = useLang()
  const copy = t[lang]

  return (
    <section ref={ref} className="bg-[#0d0b09] py-20 px-6 border-y border-[rgba(196,168,130,0.06)]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-caption text-[var(--color-muted)] mb-8"
        >
          {copy.langs_caption}
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
          {languages.map((lang, i) => (
            <motion.span
              key={lang.code}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="inline-flex items-center"
            >
              <span
                dir={lang.dir as 'ltr' | 'rtl'}
                className="font-serif text-[clamp(1rem,3vw,1.5rem)] font-light text-[var(--color-paper)] hover:text-[var(--color-warm)] transition-colors duration-500 cursor-default px-3 md:px-5 py-1"
              >
                {lang.label}
              </span>
              {i < languages.length - 1 && (
                <span className="text-[var(--color-warm)]/30 text-lg select-none">·</span>
              )}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
