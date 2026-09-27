'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import AdminLogin from '@/components/AdminLogin'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const { lang } = useLang()
  const tr = t[lang]

  const navLinks = [
    { label: tr.nav_story,    href: '#story' },
    { label: tr.nav_songs,    href: '#songs' },
    { label: tr.nav_stories,  href: '#stories' },
    { label: tr.nav_youtube,  href: 'https://www.youtube.com/@stanbarmotin9618', external: true },
    { label: tr.nav_contacts, href: '#contact' },
  ]

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.nav className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-4 flex items-center justify-between">
        {/* Фон */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: bgOpacity }}>
          <div className="absolute inset-0 bg-[#0a0806]/95 backdrop-blur-md border-b border-[rgba(196,168,130,0.10)]" />
        </motion.div>

        {/* Лого */}
        <div className="relative z-10">
          <a href="#" onClick={closeMenu}
            className="font-serif text-xl tracking-wide text-[var(--color-paper)] hover:text-[var(--color-warm)] transition-colors duration-300 block">
            {tr.hero_eyebrow}
          </a>
          <p className="text-[0.85rem] text-white mt-1 font-normal tracking-wide"
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', fontWeight: 400 }}>
            © Все стихи защищены авторским правом
          </p>
        </div>

        {/* Desktop nav */}
        <div className="relative z-10 hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group relative px-3 py-2 transition-all duration-300"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 300,
                color: link.external ? 'rgba(100,175,235,0.80)' : 'rgba(196,168,130,0.65)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = link.external ? 'rgba(140,205,255,1)' : '#f0ebe0'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = link.external ? 'rgba(100,175,235,0.80)' : 'rgba(196,168,130,0.65)'
              }}
            >
              {link.label}
              <span className="absolute bottom-0 left-3 right-3 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: link.external ? 'rgba(100,175,235,0.50)' : 'rgba(196,168,130,0.45)' }} />
            </a>
          ))}

          {/* Разделитель */}
          <div style={{ width: '1px', height: '16px', background: 'rgba(196,168,130,0.20)', margin: '0 6px' }} />

          {/* Переключатель языка */}
          <LanguageSwitcher />
          
          {/* Разделитель */}
          <div style={{ width: '1px', height: '16px', background: 'rgba(196,168,130,0.20)', margin: '0 6px' }} />
          
          {/* Кнопка входа */}
          <AdminLogin />
        </div>

        {/* Бургер — мобильный */}
        <div className="relative z-[60] md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="flex flex-col justify-center items-center w-10 h-10 gap-[6px]"
            aria-label={menuOpen ? tr.menu_close : tr.menu_open}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }}
              className="block w-6 h-[1.5px] bg-[var(--color-warm)] origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }}
              className="block w-4 h-[1.5px] bg-[var(--color-warm)] origin-center" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }}
              className="block w-6 h-[1.5px] bg-[var(--color-warm)] origin-center" />
          </button>
        </div>
      </motion.nav>

      {/* Мобильное меню */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-[#0a0806]/98 backdrop-blur-sm" onClick={closeMenu} />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 px-8">
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="font-serif text-base text-[var(--color-warm)]/50 mb-4 tracking-widest uppercase"
              >
                {tr.hero_eyebrow}
              </motion.p>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  onClick={closeMenu}
                  className="font-serif font-light text-[var(--color-paper)] hover:text-[var(--color-warm)] transition-colors duration-300 leading-tight"
                  style={{ fontSize: 'clamp(1.8rem, 5vw, 2.2rem)' }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 w-8 h-px bg-[var(--color-warm)]/30"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
