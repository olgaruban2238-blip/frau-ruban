'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

export default function Valsok() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-120px 0px' })
  const [activeStep, setActiveStep] = useState(-1)
  const [showFinal, setShowFinal] = useState(false)
  const [showPostScript, setShowPostScript] = useState(false)
  const { lang } = useLang()
  const copy = t[lang]

  const sequence = [
    { label: copy.valsok_steps[0], delay: 0 },
    { label: copy.valsok_steps[1], delay: 600 },
    { label: copy.valsok_steps[2], delay: 1200 },
    { label: copy.valsok_steps[3], delay: 1800 },
    { label: copy.valsok_steps[4], delay: 2400 },
    { label: copy.valsok_steps[5], delay: 3000 },
    { label: copy.valsok_steps[6], delay: 3600 },
  ]

  useEffect(() => {
    if (!isInView) return
    sequence.forEach((step, i) => {
      setTimeout(() => setActiveStep(i), step.delay + 300)
    })
    setTimeout(() => setShowFinal(true), sequence[sequence.length - 1].delay + 900)
    setTimeout(() => setShowPostScript(true), sequence[sequence.length - 1].delay + 2200)
  }, [isInView])

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 60%, rgba(90,60,20,0.25) 0%, rgba(40,28,10,0.3) 40%, #0a0806 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-[radial-gradient(ellipse,rgba(184,147,58,0.06)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-[var(--color-gold)]/20 to-transparent" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/15 to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-caption text-[var(--color-muted)] mb-12"
        >
          {copy.valsok_caption}
        </motion.p>

        <div className="flex flex-col items-center gap-4 mb-12">
          {sequence.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={i <= activeStep ? { opacity: 1, y: 0 } : { opacity: 0.1 }}
                transition={{ duration: 0.8 }}
                className={`font-serif transition-all duration-700 font-light ${
                  i === activeStep
                    ? 'text-[clamp(1.2rem,3.5vw,1.8rem)] text-[var(--color-paper)]'
                    : i < activeStep
                    ? 'text-[clamp(0.85rem,2vw,1rem)] text-[var(--color-muted)]/60'
                    : 'text-[clamp(0.85rem,2vw,1rem)] text-[var(--color-muted)]/20'
                }`}
              >
                {step.label}
              </motion.p>
              {i < sequence.length - 1 && (
                <motion.span
                  animate={i < activeStep ? { opacity: 0.4 } : { opacity: 0.1 }}
                  className="text-[var(--color-warm)] text-sm my-1"
                >
                  &darr;
                </motion.span>
              )}
            </div>
          ))}
        </div>

        {showFinal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h2
              className="font-serif font-light text-[clamp(4rem,15vw,11rem)] leading-none text-[var(--color-warm)]"
              style={{ textShadow: '0 0 80px rgba(184, 147, 58, 0.25)' }}
            >
              {copy.valsok_final}
            </h2>
          </motion.div>
        )}

        {showPostScript && (
          <div className="space-y-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-serif text-[clamp(1.1rem,3vw,1.5rem)] italic text-[var(--color-paper)]"
            >
              {copy.valsok_quote}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="font-serif text-[clamp(0.9rem,2vw,1.1rem)] italic text-[var(--color-muted)]"
            >
              {copy.valsok_after}
            </motion.p>
          </div>
        )}
      </div>
    </section>
  )
}
