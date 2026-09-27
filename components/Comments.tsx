'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

interface Comment {
  id: string
  name: string
  text: string
  timestamp: number
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [cooldownSeconds, setCooldownSeconds] = useState(0)
  const { lang } = useLang()
  const copy = t[lang]

  // Загружаем комментарии и проверяем админа
  useEffect(() => {
    fetchComments()
    checkAdmin()
  }, [])

  async function checkAdmin() {
    try {
      const res = await fetch('/api/auth/verify')
      const data = await res.json()
      setIsAdmin(data.authenticated)
    } catch {
      setIsAdmin(false)
    }
  }

  async function fetchComments() {
    try {
      const res = await fetch('/api/comments')
      const data = await res.json()
      setComments(data.comments || [])
    } catch (err) {
      console.error('Failed to load comments:', err)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, text }),
      })

      const data = await res.json()

      if (!res.ok) {
        // Проверяем, есть ли в ошибке информация о времени ожидания
        const errorMsg = data.error || 'Failed to submit comment'
        setError(errorMsg)
        
        // Если это анти-флуд ошибка, извлекаем количество секунд
        const match = errorMsg.match(/wait (\d+) seconds/)
        if (match) {
          const seconds = parseInt(match[1])
          setCooldownSeconds(seconds)
          startCooldown(seconds)
        }
        
        setIsSubmitting(false)
        return
      }

      // Успех!
      setSuccess(true)
      setName('')
      setText('')
      setIsFormOpen(false)
      
      // Обновляем список комментариев
      await fetchComments()

      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function startCooldown(seconds: number) {
    setCooldownSeconds(seconds)
    const interval = setInterval(() => {
      setCooldownSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  async function handleDelete(commentId: string) {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return
    }

    try {
      const res = await fetch(`/api/comments?id=${commentId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        await fetchComments()
      }
    } catch (err) {
      console.error('Failed to delete comment:', err)
    }
  }

  const translations = {
    ru: {
      title: 'Комментарии',
      leaveComment: 'Оставить комментарий',
      yourName: 'Ваше имя',
      yourComment: 'Ваш комментарий',
      submit: 'Отправить',
      cancel: 'Отмена',
      noComments: 'Пока нет комментариев. Будьте первым!',
      success: 'Комментарий отправлен!',
      maxLength: 'макс. 500 символов',
    },
    en: {
      title: 'Comments',
      leaveComment: 'Leave a Comment',
      yourName: 'Your name',
      yourComment: 'Your comment',
      submit: 'Submit',
      cancel: 'Cancel',
      noComments: 'No comments yet. Be the first!',
      success: 'Comment submitted!',
      maxLength: 'max. 500 characters',
    },
    de: {
      title: 'Kommentare',
      leaveComment: 'Kommentar hinterlassen',
      yourName: 'Ihr Name',
      yourComment: 'Ihr Kommentar',
      submit: 'Senden',
      cancel: 'Abbrechen',
      noComments: 'Noch keine Kommentare. Seien Sie der Erste!',
      success: 'Kommentar gesendet!',
      maxLength: 'max. 500 Zeichen',
    },
  }

  const tr = translations[lang]

  return (
    <section className="bg-[#0a0908] py-16 px-6 md:px-12 border-t border-[rgba(196,168,130,0.06)]">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <h3 className="font-serif text-[clamp(1.5rem,4vw,2.2rem)] font-light text-[var(--color-paper)] mb-8 text-center">
            {tr.title}
          </h3>
        </FadeIn>

        {/* Кнопка "Оставить комментарий" */}
        {!isFormOpen && (
          <FadeIn delay={0.2}>
            <div className="text-center mb-8">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-warm)]/30 rounded-sm
                  bg-[var(--color-warm)]/5 hover:bg-[var(--color-warm)]/15 
                  text-[var(--color-warm)] font-light tracking-wider text-sm uppercase
                  transition-all duration-300 hover:border-[var(--color-warm)]/60"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
                  <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {tr.leaveComment}
              </button>
            </div>
          </FadeIn>
        )}

        {/* Форма добавления комментария */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-[#0d0b09] border border-[var(--color-warm)]/10 rounded-sm">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={tr.yourName}
                    maxLength={50}
                    required
                    className="w-full px-4 py-2 bg-[#080706] border border-[var(--color-warm)]/20 
                      text-[var(--color-paper)] placeholder:text-[var(--color-muted)]/40
                      focus:border-[var(--color-warm)]/50 focus:outline-none rounded-sm
                      font-serif text-base"
                  />
                </div>
                <div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={tr.yourComment}
                    maxLength={500}
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-[#080706] border border-[var(--color-warm)]/20 
                      text-[var(--color-paper)] placeholder:text-[var(--color-muted)]/40
                      focus:border-[var(--color-warm)]/50 focus:outline-none rounded-sm
                      font-serif text-base resize-none"
                  />
                  <p className="text-xs text-[var(--color-muted)]/50 mt-1 text-right">
                    {text.length}/500 {tr.maxLength}
                  </p>
                </div>

                {cooldownSeconds > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-sm"
                  >
                    <p className="text-yellow-400/80 text-sm">
                      ⏱️ Please wait {cooldownSeconds} seconds before commenting again
                    </p>
                  </motion.div>
                )}

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm font-light"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || cooldownSeconds > 0}
                    className="px-6 py-2 bg-[var(--color-warm)]/15 border border-[var(--color-warm)]/30
                      hover:bg-[var(--color-warm)]/25 hover:border-[var(--color-warm)]/60
                      text-[var(--color-warm)] font-light tracking-wider text-sm uppercase
                      transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '...' : cooldownSeconds > 0 ? `${cooldownSeconds}s` : tr.submit}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormOpen(false)
                      setError('')
                      setName('')
                      setText('')
                    }}
                    className="px-6 py-2 border border-[var(--color-paper)]/20
                      hover:border-[var(--color-paper)]/40
                      text-[var(--color-paper)]/60 hover:text-[var(--color-paper)]
                      font-light tracking-wider text-sm uppercase
                      transition-all duration-300 rounded-sm"
                  >
                    {tr.cancel}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Сообщение об успехе */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-sm text-center"
            >
              <p className="text-green-400 font-light">{tr.success}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Список комментариев */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <FadeIn delay={0.3}>
              <p className="text-center text-[var(--color-muted)]/50 font-serif italic py-8">
                {tr.noComments}
              </p>
            </FadeIn>
          ) : (
            comments
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((comment, i) => (
                <FadeIn key={comment.id} delay={0.1 * i}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-[#0d0b09] border border-[var(--color-warm)]/10 rounded-sm
                      hover:border-[var(--color-warm)]/20 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-serif text-[var(--color-warm)] font-light">
                        {comment.name}
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="text-xs text-[var(--color-muted)]/40">
                          {new Date(comment.timestamp).toLocaleDateString(lang === 'ru' ? 'ru-RU' : lang === 'de' ? 'de-DE' : 'en-US')}
                        </p>
                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(comment.id)}
                            className="text-red-400/60 hover:text-red-400 transition-colors"
                            title="Delete comment"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M2 4h12M5.5 4V3a1 1 0 011-1h3a1 1 0 011 1v1M7 7v4M9 7v4M3 4l.8 9a1 1 0 001 1h6.4a1 1 0 001-1l.8-9" 
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="font-serif text-[var(--color-paper)]/80 leading-relaxed">
                      {comment.text}
                    </p>
                  </motion.div>
                </FadeIn>
              ))
          )}
        </div>
      </div>
    </section>
  )
}
