'use client'

import FadeIn from '@/components/ui/FadeIn'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

export default function Footer() {
  const { lang } = useLang()
  const tr = t[lang]
  const links = [
    { label: tr.nav_story, href: '#story' },
    { label: tr.nav_songs, href: '#songs' },
    { label: tr.nav_stories, href: '#stories' },
    { label: tr.nav_youtube, href: 'https://www.youtube.com/@stanbarmotin9618', external: true },
    { label: tr.nav_contacts, href: '#contact' },
  ]

  return (
    <footer id="contact" className="bg-[#080706] border-t border-[rgba(196,168,130,0.06)] py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-serif text-xl font-light text-[var(--color-paper)]">
              {tr.hero_eyebrow}
            </p>
          </div>
          <nav className="flex flex-wrap gap-6 md:gap-8">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-[0.78rem] tracking-[0.1em] uppercase font-light text-[var(--color-paper)]/50 hover:text-[var(--color-warm)] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12 pt-8 border-t border-[rgba(196,168,130,0.05)]">
          <p className="font-serif text-[0.95rem] italic text-[var(--color-paper)]/35 text-center">
            {tr.footer_tagline}
          </p>
        </FadeIn>
      </div>
    </footer>
  )
}
