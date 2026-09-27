'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

interface AddSongModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddSongModal({ isOpen, onClose, onSuccess }: AddSongModalProps) {
  const [title, setTitle] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [genre, setGenre] = useState('')
  const [story, setStory] = useState('')
  const [translations, setTranslations] = useState({
    en: { title: '', genre: '', story: '' },
    de: { title: '', genre: '', story: '' }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { lang } = useLang()
  const tr = t[lang]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, youtubeUrl, genre, story, translations }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add song')
      }

      // Успех
      setTitle('')
      setYoutubeUrl('')
      setGenre('')
      setStory('')
      setTranslations({ en: { title: '', genre: '', story: '' }, de: { title: '', genre: '', story: '' } })
      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Ошибка при добавлении песни')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-md rounded-sm overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(13,11,9,0.98) 0%, rgba(18,15,12,0.98) 100%)',
              border: '1px solid rgba(196,168,130,0.25)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[rgba(196,168,130,0.15)]">
              <h2
                className="font-serif text-2xl font-light text-[var(--color-paper)]"
                style={{ letterSpacing: '0.02em' }}
              >
                Добавить песню
              </h2>
              <button
                onClick={onClose}
                className="absolute top-5 right-6 text-[var(--color-muted)] hover:text-[var(--color-paper)] transition-colors"
                style={{ fontSize: '1.5rem', lineHeight: 1 }}
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
              {/* Ссылка на YouTube */}
              <div>
                <label
                  htmlFor="youtubeUrl"
                  className="block mb-2 text-sm font-light text-[var(--color-warm)]"
                  style={{ letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}
                >
                  Ссылка на песню Stan Barmotin *
                </label>
                <input
                  id="youtubeUrl"
                  type="url"
                  value={youtubeUrl}
                  onChange={e => setYoutubeUrl(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-sm bg-[rgba(0,0,0,0.3)] border border-[rgba(196,168,130,0.20)]
                    text-[var(--color-paper)] placeholder:text-[var(--color-muted)]/40
                    focus:border-[rgba(196,168,130,0.50)] focus:outline-none transition-colors"
                  placeholder="https://www.youtube.com/watch?v=..."
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}
                />
              </div>

              {/* Описание */}
              <div>
                <label
                  htmlFor="story"
                  className="block mb-2 text-sm font-light text-[var(--color-warm)]"
                  style={{ letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}
                >
                  Описание *
                </label>
                <textarea
                  id="story"
                  value={story}
                  onChange={e => setStory(e.target.value)}
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-sm bg-[rgba(0,0,0,0.3)] border border-[rgba(196,168,130,0.20)]
                    text-[var(--color-paper)] placeholder:text-[var(--color-muted)]/40
                    focus:border-[rgba(196,168,130,0.50)] focus:outline-none transition-colors resize-none"
                  placeholder="История или описание песни..."
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem', lineHeight: 1.6 }}
                />
              </div>

              {/* Название песни */}
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-light text-[var(--color-warm)]"
                  style={{ letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}
                >
                  Название песни *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-sm bg-[rgba(0,0,0,0.3)] border border-[rgba(196,168,130,0.20)]
                    text-[var(--color-paper)] placeholder:text-[var(--color-muted)]/40
                    focus:border-[rgba(196,168,130,0.50)] focus:outline-none transition-colors"
                  placeholder="Например: Вальсок"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.1rem' }}
                />
              </div>

              {/* Жанр */}
              <div>
                <label
                  htmlFor="genre"
                  className="block mb-2 text-sm font-light text-[var(--color-warm)]"
                  style={{ letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}
                >
                  Жанр
                </label>
                <input
                  id="genre"
                  type="text"
                  value={genre}
                  onChange={e => setGenre(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm bg-[rgba(0,0,0,0.3)] border border-[rgba(196,168,130,0.20)]
                    text-[var(--color-paper)] placeholder:text-[var(--color-muted)]/40
                    focus:border-[rgba(196,168,130,0.50)] focus:outline-none transition-colors"
                  placeholder="Например: Вальс"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}
                />
              </div>

              {/* Разделитель переводов */}
              <div className="pt-4 pb-2">
                <p className="text-xs text-[var(--color-muted)]/60 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Переводы (опционально)
                </p>
              </div>

              {/* Английский перевод */}
              <div className="space-y-3">
                <p className="text-sm text-[var(--color-warm)]/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                  🇬🇧 English
                </p>
                <input
                  type="text"
                  value={translations.en.title}
                  onChange={e => setTranslations(prev => ({ ...prev, en: { ...prev.en, title: e.target.value } }))}
                  className="w-full px-4 py-2 rounded-sm bg-[rgba(0,0,0,0.3)] border border-[rgba(196,168,130,0.20)]
                    text-[var(--color-paper)] placeholder:text-[var(--color-muted)]/40
                    focus:border-[rgba(196,168,130,0.50)] focus:outline-none transition-colors"
                  placeholder="Title (название)"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}
                />
                <input
                  type="text"
                  value={translations.en.genre}
                  onChange={e => setTranslations(prev => ({ ...prev, en: { ...prev.en, genre: e.target.value } }))}
                  className="w-full px-4 py-2 rounded-sm bg-[rgba(0,0,0,0.3)] border border-[rgba(196,168,130,0.20)]
                    text-[var(--color-paper)] placeholder:text-[var(--color-muted)]/40
                    focus:border-[rgba(196,168,130,0.50)] focus:outline-none transition-colors"
                  placeholder="Genre (жанр)"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}
                />
                <textarea
                  value={translations.en.story}
                  onChange={e => setTranslations(prev => ({ ...prev, en: { ...prev.en, story: e.target.value } }))}
                  rows={2}
                  className="w-full px-4 py-2 rounded-sm bg-[rgba(0,0,0,0.3)] border border-[rgba(196,168,130,0.20)]
                    text-[var(--color-paper)] placeholder:text-[var(--color-muted)]/40
                    focus:border-[rgba(196,168,130,0.50)] focus:outline-none transition-colors resize-none"
                  placeholder="Story (описание)"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}
                />
              </div>

              {/* Немецкий перевод */}
              <div className="space-y-3">
                <p className="text-sm text-[var(--color-warm)]/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                  🇩🇪 Deutsch
                </p>
                <input
                  type="text"
                  value={translations.de.title}
                  onChange={e => setTranslations(prev => ({ ...prev, de: { ...prev.de, title: e.target.value } }))}
                  className="w-full px-4 py-2 rounded-sm bg-[rgba(0,0,0,0.3)] border border-[rgba(196,168,130,0.20)]
                    text-[var(--color-paper)] placeholder:text-[var(--color-muted)]/40
                    focus:border-[rgba(196,168,130,0.50)] focus:outline-none transition-colors"
                  placeholder="Titel (название)"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}
                />
                <input
                  type="text"
                  value={translations.de.genre}
                  onChange={e => setTranslations(prev => ({ ...prev, de: { ...prev.de, genre: e.target.value } }))}
                  className="w-full px-4 py-2 rounded-sm bg-[rgba(0,0,0,0.3)] border border-[rgba(196,168,130,0.20)]
                    text-[var(--color-paper)] placeholder:text-[var(--color-muted)]/40
                    focus:border-[rgba(196,168,130,0.50)] focus:outline-none transition-colors"
                  placeholder="Genre (жанр)"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}
                />
                <textarea
                  value={translations.de.story}
                  onChange={e => setTranslations(prev => ({ ...prev, de: { ...prev.de, story: e.target.value } }))}
                  rows={2}
                  className="w-full px-4 py-2 rounded-sm bg-[rgba(0,0,0,0.3)] border border-[rgba(196,168,130,0.20)]
                    text-[var(--color-paper)] placeholder:text-[var(--color-muted)]/40
                    focus:border-[rgba(196,168,130,0.50)] focus:outline-none transition-colors resize-none"
                  placeholder="Geschichte (описание)"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}
                />
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {error}
                </motion.p>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-5 py-3 rounded-sm border border-[rgba(196,168,130,0.25)]
                    text-[var(--color-muted)] hover:text-[var(--color-paper)] hover:border-[rgba(196,168,130,0.40)]
                    transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', letterSpacing: '0.05em' }}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-5 py-3 rounded-sm
                    bg-gradient-to-r from-[rgba(196,168,130,0.20)] to-[rgba(196,168,130,0.30)]
                    border border-[rgba(196,168,130,0.40)]
                    text-[var(--color-paper)] hover:from-[rgba(196,168,130,0.30)] hover:to-[rgba(196,168,130,0.40)]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', letterSpacing: '0.05em' }}
                >
                  {loading ? 'Добавление...' : 'Добавить'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
