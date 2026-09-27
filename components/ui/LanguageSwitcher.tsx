'use client'

import { useLang } from '@/lib/LanguageContext'
import { langMeta, langOrder, t, type Lang } from '@/lib/translations'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()

  return (
    <div
      role="group"
      aria-label={t[lang].switch_lang}
      style={{
        display: 'inline-flex',
        alignItems: 'stretch',
        border: '1px solid rgba(196,168,130,0.22)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}
    >
      {langOrder.map((code: Lang, i) => {
        const active = code === lang
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={langMeta[code].label}
            title={langMeta[code].label}
            style={{
              padding: '6px 10px',
              minWidth: '40px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: active ? 500 : 300,
              color: active ? '#f0ebe0' : 'rgba(196,168,130,0.62)',
              background: active ? 'rgba(196,168,130,0.16)' : 'transparent',
              border: 'none',
              borderLeft: i === 0 ? 'none' : '1px solid rgba(196,168,130,0.18)',
              cursor: 'pointer',
              transition: 'color 0.2s ease, background 0.2s ease',
              minHeight: 'unset',
            }}
          >
            {langMeta[code].short}
          </button>
        )
      })}
    </div>
  )
}
