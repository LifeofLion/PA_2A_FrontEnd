"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types pour nos traductions (on accepte tous les codes dynamiquement)
type Language = string

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isLoading: boolean
  availableLocales: Language[]
  addLocale: (lang: Language) => Promise<void>
  removeLocale: (lang: Language) => Promise<void>
}

// Valeur par défaut pour le contexte
const defaultContextValue: LanguageContextType = {
  language: "EN",
  setLanguage: async () => {},
  t: (key) => key,
  isLoading: true,
  availableLocales: [],
  addLocale: async () => {},
  removeLocale: async () => {},
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)
export function useLanguage() {
  return useContext(LanguageContext)
}

const STORAGE_KEY = "ecodeli-language"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ?? 'EN'
    }
    return 'EN'
  })
  const [translations, setTranslations] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Liste dynamique des locales
  const [availableLocales, setAvailableLocales] = useState<Language[]>(['EN', 'FR', 'ES'])

  // Charge les traductions pour la locale active
  const fetchTranslations = async (loc: Language) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/translations/${loc.toLowerCase()}`, { cache: 'no-store' })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      const data = await res.json()
      setTranslations(data)
    } catch {
      setTranslations({})
    } finally {
      setIsLoading(false)
    }
  }

  // Effet : recharger translations à chaque changement de `language`
  useEffect(() => {
    fetchTranslations(language)
  }, [language])

  // Change la langue courante
  const setLanguage = (loc: Language) => {
    setLanguageState(loc)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, loc)
    }
  }

  // Ajoute une nouvelle locale : crée le fichier JSON puis met à jour la liste
  const addLocale = async (loc: Language) => {
    const code = loc.toLowerCase()
    try {
      const res = await fetch(`/api/translations/${code}`, { method: 'PUT' })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      setAvailableLocales(prev => prev.includes(loc) ? prev : [...prev, loc])
      setLanguage(loc)
    } catch (err) {
      console.error('addLocale error', err)
    }
  }

  // Supprime une locale : efface le fichier JSON, retire de la liste
  const removeLocale = async (loc: Language) => {
    try {
      const res = await fetch(`/api/translations/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale: loc }),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      setAvailableLocales(prev => prev.filter(l => l !== loc))
      if (language === loc) setLanguage('EN')
    } catch (err) {
      console.error('removeLocale error', err)
    }
  }

  // Fonction de traduction par clé
  const t = (key: string): string => {
    if (isLoading) return key
    const parts = key.split('.')
    let result: any = translations
    for (const p of parts) {
      if (result && typeof result === 'object' && p in result) {
        result = result[p]
      } else {
        return key
      }
    }
    return typeof result === 'string' ? result : key
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isLoading,
        availableLocales,
        addLocale,
        removeLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
