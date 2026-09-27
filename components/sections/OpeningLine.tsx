'use client'

import FadeIn from '@/components/ui/FadeIn'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'

export default function OpeningLine() {
  const { lang } = useLang()
  return (
    <section className="py-32 md:py-48 flex items-center justify-center bg-[#0d0b09]">
      <FadeIn className="text-center px-6">
        <p className="font-serif font-light italic tracking-wide"
          style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', color: 'rgba(240,235,224,0.75)' }}>
          {t[lang].opening}
        </p>
      </FadeIn>
    </section>
  )
}
