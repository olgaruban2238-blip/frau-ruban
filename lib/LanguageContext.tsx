'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type Lang, langMeta, isLang } from './translations'

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangContextType>({ lang: 'en', setLang: () => {} })

function applyDocumentLang(l: Lang) {
  document.documentElement.lang = l
  document.documentElement.dir = langMeta[l].dir
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('lang')
    const next: Lang = isLang(saved) ? saved : 'en'
    if (saved && !isLang(saved)) localStorage.setItem('lang', 'en')
    setLangState(next)
    applyDocumentLang(next)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
    applyDocumentLang(l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
