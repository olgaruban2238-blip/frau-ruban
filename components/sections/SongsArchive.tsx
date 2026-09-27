'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { songs } from '@/lib/data'
import Counter from '@/components/ui/Counter'
import FadeIn from '@/components/ui/FadeIn'
import AddSongModal from '@/components/AddSongModal'
import { useLang } from '@/lib/LanguageContext'
import { t, songI18n } from '@/lib/translations'

export default function SongsArchive() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' })
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [songsList, setSongsList] = useState(songs)
  const { lang } = useLang()
  const copy = t[lang]

  // Проверяем аутентификацию администратора
  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const res = await fetch('/api/auth/verify')
      const data = await res.json()
      setIsAuthenticated(data.authenticated)
    } catch (err) {
      setIsAuthenticated(false)
    }
  }

  function handleSongAdded() {
    // Перезагружаем страницу для обновления списка песен
    window.location.reload()
  }

  async function handleDeleteSong(songId: number) {
    try {
      const res = await fetch(`/api/songs?id=${songId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Ошибка при удалении песни')
        return
      }

      // Успешно удалено - перезагружаем страницу
      window.location.reload()
    } catch (err) {
      alert('Ошибка при удалении песни')
    }
  }

  return (
    <section ref={ref} id="songs" className="bg-[#0d0b09] py-24 px-8 md:px-16 lg:px-20">
      <div className="text-center mb-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-serif font-light text-[clamp(6rem,20vw,16rem)] leading-none text-[var(--color-paper)] select-none">
            <Counter target={400} suffix="+" />
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif font-light italic -mt-4 mb-6"
          style={{ fontSize: 'clamp(1.5rem,4vw,2.5rem)', color: 'rgba(158,142,120,0.80)' }}
        >
          {copy.songs_count}
        </motion.p>
        <FadeIn delay={0.5}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.4rem, 3.8vw, 2.4rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'rgba(240,235,224,0.80)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.5,
            textAlign: 'center',
          }}>
            {copy.songs_tagline}
          </p>
        </FadeIn>
      </div>

      {/* Cards */}
      <FadeIn className="max-w-7xl mx-auto mt-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-serif font-light text-[var(--color-paper)] text-center italic"
            style={{ fontSize: 'clamp(1.5rem,3vw,2rem)' }}>
            {copy.songs_listen_heading}
          </h3>
          {isAuthenticated && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 text-xs tracking-wider uppercase
                border border-[var(--color-warm)]/30 rounded-sm
                text-[var(--color-warm)] hover:bg-[var(--color-warm)]/10
                transition-all duration-300"
            >
              Добавить песню
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center sm:justify-items-stretch">
          {songsList.map((song, i) => {
            const songWithUrl = song as typeof song & { youtubeUrl?: string }
            const translated = lang !== 'ru' && songI18n[lang]?.[song.id]
            const displayGenre = translated ? translated.genre : song.genre
            const displayStory = translated ? translated.story : song.story
            const displayLanguage = translated ? translated.language : song.language
            
            return (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.06 }}
                onMouseEnter={() => setHoveredId(song.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="song-card p-5 relative group flex flex-col"
                style={{ cursor: 'default' }}
              >
                {/* Vinyl dot */}
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  border: '1px solid rgba(196,168,130,0.20)',
                  marginBottom: '16px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(196,168,130,0.20)' }} />
                </div>

                {/* Meta */}
                <p style={{
                  fontSize: '0.70rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(196,168,130,0.55)', marginBottom: '4px',
                  fontFamily: 'Inter, sans-serif', fontWeight: 300,
                }}>
                  {song.year} · {displayLanguage}
                </p>

                <h4 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.25rem', fontWeight: 300,
                  color: hoveredId === song.id ? '#c8ad86' : '#f0ebe0',
                  marginBottom: '4px', transition: 'color 0.3s ease',
                  lineHeight: 1.3,
                }}>
                  {song.title}
                </h4>

                <p style={{
                  fontSize: '0.70rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'rgba(240,235,224,0.30)', marginBottom: '10px',
                  fontFamily: 'Inter, sans-serif', fontWeight: 300,
                }}>
                  {displayGenre}
                </p>

                {/* История при наведении */}
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={hoveredId === song.id ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '0.9rem', fontStyle: 'italic',
                    color: 'rgba(158,142,120,0.85)',
                    overflow: 'hidden', lineHeight: 1.6,
                    marginBottom: hoveredId === song.id ? '12px' : '0',
                  }}
                >
                  {displayStory}
                </motion.p>

                {/* Кнопка — только если есть ссылка */}
                {songWithUrl.youtubeUrl && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ marginTop: 'auto', paddingTop: '10px' }}
                  >
                    <a
                      href={songWithUrl.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '9px',
                        padding: '9px 18px',
                        border: '1px solid rgba(196,168,130,0.35)',
                        borderRadius: '2px',
                        background: 'rgba(196,168,130,0.06)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.68rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'rgba(196,168,130,0.85)',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(4px)',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = 'rgba(196,168,130,0.14)'
                        el.style.borderColor = 'rgba(196,168,130,0.70)'
                        el.style.color = '#f0ebe0'
                        el.style.boxShadow = '0 0 20px rgba(196,168,130,0.18)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = 'rgba(196,168,130,0.06)'
                        el.style.borderColor = 'rgba(196,168,130,0.35)'
                        el.style.color = 'rgba(196,168,130,0.85)'
                        el.style.boxShadow = 'none'
                      }}
                    >
                      {/* Play triangle */}
                      <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor" style={{ flexShrink: 0 }}>
                        <path d="M 0 0 L 9 5.5 L 0 11 Z" />
                      </svg>
                      {copy.songs_play}
                    </a>
                  </motion.div>
                )}

                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-warm)]/0 to-transparent group-hover:via-[var(--color-warm)]/40 transition-all duration-500" />

                {/* Кнопка удаления - только для админа */}
                {isAuthenticated && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (confirm(`Вы уверены, что хотите удалить песню "${song.title}"?`)) {
                        handleDeleteSong(song.id)
                      }
                    }}
                    className="absolute top-3 right-3 p-2 rounded-sm bg-red-900/20 border border-red-500/30
                      text-red-400 hover:bg-red-900/40 hover:border-red-500/50
                      transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Кнопка Lyrono */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="https://lyrono.com/music-genres-2/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 
              bg-gradient-to-r from-[rgba(100,175,235,0.12)] to-[rgba(30,160,100,0.12)]
              border border-[rgba(100,175,235,0.30)] rounded-sm
              hover:from-[rgba(100,175,235,0.20)] hover:to-[rgba(30,160,100,0.20)]
              hover:border-[rgba(100,175,235,0.50)]
              transition-all duration-300
              group"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            {/* Lyrono icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10" stroke="rgba(100,175,235,0.80)" strokeWidth="2"/>
              <path d="M8 12l3 3 5-6" stroke="rgba(100,175,235,0.80)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            <span className="font-serif text-lg font-light tracking-wide"
              style={{ 
                color: 'rgba(100,175,235,0.95)',
                textShadow: '0 0 20px rgba(100,175,235,0.20)'
              }}>
              {copy.songs_lyrono}
            </span>

            {/* Arrow */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path 
                d="M7 4l6 6-6 6" 
                stroke="rgba(100,175,235,0.80)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </FadeIn>

      {/* Модальное окно добавления песни */}
      <AddSongModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleSongAdded}
      />
    </section>
  )
}
