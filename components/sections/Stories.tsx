'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { stories } from '@/lib/data'
import FadeIn from '@/components/ui/FadeIn'
import { useLang } from '@/lib/LanguageContext'
import { t, storyI18n } from '@/lib/translations'

const moodBg: Record<string, string> = {
  warm: 'linear-gradient(135deg, #2a1f0a 0%, #1a1208 100%)',
  dark: 'linear-gradient(135deg, #080c12 0%, #0d0b09 100%)',
  night: 'linear-gradient(135deg, #0a0a14 0%, #08080e 100%)',
}

export default function Stories() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  const { lang } = useLang()
  const copy = t[lang]

  return (
    <section ref={ref} id="stories" className="bg-[#0d0b09] py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-16">
          <h2 className="font-serif text-[clamp(2.5rem,7vw,5rem)] font-light text-[var(--color-paper)] mb-4">
            {copy.stories_title}
          </h2>
          <p className="font-serif text-[clamp(1rem,2.5vw,1.25rem)] italic text-[var(--color-muted)] max-w-md">
            {copy.stories_intro}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, i) => {
            const translated = lang !== 'ru' && storyI18n[lang]?.[story.id]
            const displayTitle = translated ? translated.title : story.title
            const displaySubtitle = translated ? translated.subtitle : story.subtitle
            const displayExcerpt = translated ? translated.excerpt : story.excerpt
            
            return (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              className="story-card group cursor-pointer"
              style={{ background: moodBg[story.mood] }}
            >
              {/* Atmospheric visual */}
              <div className="h-48 relative overflow-hidden" style={{ background: moodBg[story.mood] }}>
                {story.mood === 'warm' && (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_80%,rgba(184,147,58,0.15)_0%,transparent_70%)]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-[rgba(184,147,58,0.3)]" />
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-[rgba(184,147,58,0.3)] to-transparent" />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-15">
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <ellipse cx="20" cy="50" rx="5" ry="8" fill="#c4a882" />
                        <line x1="20" y1="42" x2="20" y2="25" stroke="#c4a882" strokeWidth="2"/>
                        <circle cx="20" cy="20" r="5" fill="#c4a882"/>
                        <ellipse cx="40" cy="50" rx="5" ry="8" fill="#c4a882" />
                        <line x1="40" y1="42" x2="40" y2="25" stroke="#c4a882" strokeWidth="2"/>
                        <circle cx="40" cy="20" r="5" fill="#c4a882"/>
                        <line x1="20" y1="30" x2="40" y2="30" stroke="#c4a882" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  </div>
                )}
                {story.mood === 'dark' && (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#040608,#0a0c0f)]" />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-transparent to-[rgba(196,168,130,0.4)]" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[radial-gradient(ellipse,rgba(196,168,130,0.06)_0%,transparent_70%)]" />
                    {Array.from({length: 12}).map((_, j) => (
                      <div key={j} className="absolute w-0.5 h-0.5 rounded-full bg-[var(--color-warm)]/25"
                        style={{ left: `${10 + j * 7}%`, top: `${20 + (j % 3) * 12}%` }} />
                    ))}
                  </div>
                )}
                {story.mood === 'night' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-36 bg-[rgba(245,240,232,0.03)] border border-[rgba(245,240,232,0.06)] rotate-[-3deg] flex flex-col justify-center px-4 py-3 gap-2">
                      {Array.from({length: 5}).map((_, j) => (
                        <div key={j} className="h-px bg-[rgba(196,168,130,0.2)]" style={{ width: `${60 + j * 8}%` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-[var(--color-dark)]/0 group-hover:bg-[var(--color-dark)]/20 transition-colors duration-500 z-10" />
              </div>

              <div className="relative z-20 p-6">
                <p className="text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-warm)]/60 mb-2 font-light">{displaySubtitle && displaySubtitle}</p>
                <h3 className="font-serif text-xl font-light text-[var(--color-paper)] group-hover:text-[var(--color-warm)] transition-colors duration-500 mb-3 leading-snug">
                  {displayTitle}
                </h3>
                <p className="font-serif text-[1rem] italic text-[var(--color-paper)]/60 leading-relaxed">
                  {displayExcerpt}
                </p>
                {story.linkedSong && (
                  <p className="mt-4 text-[10px] tracking-[0.12em] uppercase text-[var(--color-warm)]/50">
                    &rarr; {story.linkedSong}
                  </p>
                )}
              </div>
            </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
