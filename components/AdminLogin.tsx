'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/lib/LanguageContext'

export default function AdminLogin() {
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { lang } = useLang()

  const translations = {
    ru: {
      login: 'Вход',
      logout: 'Выйти',
      username: 'Логин',
      password: 'Пароль',
      submit: 'Войти',
      cancel: 'Отмена',
      welcome: 'Добро пожаловать, владелец',
      adminPanel: 'Админ-панель',
    },
    en: {
      login: 'Login',
      logout: 'Logout',
      username: 'Username',
      password: 'Password',
      submit: 'Sign In',
      cancel: 'Cancel',
      welcome: 'Welcome, owner',
      adminPanel: 'Admin Panel',
    },
    de: {
      login: 'Anmelden',
      logout: 'Abmelden',
      username: 'Benutzername',
      password: 'Passwort',
      submit: 'Einloggen',
      cancel: 'Abbrechen',
      welcome: 'Willkommen, Eigentümer',
      adminPanel: 'Admin-Panel',
    },
  }

  const tr = translations[lang]

  // Проверяем аутентификацию при загрузке
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

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      console.log('Attempting login with:', { username })
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      console.log('Response status:', res.status)
      const data = await res.json()
      console.log('Response data:', data)

      if (!res.ok) {
        setError('Invalid credentials')
        setIsLoading(false)
        return
      }

      setIsAuthenticated(true)
      setIsOpen(false)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.error('Login error:', err)
      setError('Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <>
      {/* Кнопка входа/выхода в навигации */}
      <div className="relative">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--color-warm)]/60 hidden md:inline">
              {tr.welcome}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs tracking-wider uppercase
                border border-[var(--color-warm)]/30 rounded-sm
                text-[var(--color-warm)] hover:bg-[var(--color-warm)]/10
                transition-all duration-300"
            >
              {tr.logout}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-1.5 text-xs tracking-wider uppercase
              border border-[var(--color-paper)]/20 rounded-sm
              text-[var(--color-paper)]/60 hover:text-[var(--color-paper)]
              hover:border-[var(--color-paper)]/40
              transition-all duration-300"
          >
            {tr.login}
          </button>
        )}
      </div>

      {/* Модальное окно */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-[#0d0b09] border border-[var(--color-warm)]/20 rounded-sm
                max-w-md w-full p-8 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-[var(--color-paper)]/40
                    hover:text-[var(--color-paper)] transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>

                {/* Title */}
                <h2 className="font-serif text-2xl font-light text-[var(--color-warm)] mb-6">
                  {tr.adminPanel}
                </h2>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm text-[var(--color-paper)]/60 mb-2">
                      {tr.username}
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      autoComplete="username"
                      className="w-full px-4 py-2 bg-[#080706] border border-[var(--color-warm)]/20
                        text-[var(--color-paper)] focus:border-[var(--color-warm)]/50
                        focus:outline-none rounded-sm font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[var(--color-paper)]/60 mb-2">
                      {tr.password}
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="w-full px-4 py-2 bg-[#080706] border border-[var(--color-warm)]/20
                        text-[var(--color-paper)] focus:border-[var(--color-warm)]/50
                        focus:outline-none rounded-sm font-mono text-sm"
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 px-6 py-2.5 bg-[var(--color-warm)]/15
                        border border-[var(--color-warm)]/30
                        hover:bg-[var(--color-warm)]/25 hover:border-[var(--color-warm)]/60
                        text-[var(--color-warm)] font-light tracking-wider text-sm uppercase
                        transition-all duration-300 rounded-sm disabled:opacity-50"
                    >
                      {isLoading ? '...' : tr.submit}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-2.5 border border-[var(--color-paper)]/20
                        hover:border-[var(--color-paper)]/40
                        text-[var(--color-paper)]/60 hover:text-[var(--color-paper)]
                        font-light tracking-wider text-sm uppercase
                        transition-all duration-300 rounded-sm"
                    >
                      {tr.cancel}
                    </button>
                  </div>
                </form>

                {/* Security notice */}
                <p className="mt-6 text-xs text-[var(--color-muted)]/40 text-center">
                  🔒 Secure connection
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
