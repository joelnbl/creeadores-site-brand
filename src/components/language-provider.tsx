"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { type Locale, resolveLocale, LANGUAGE_COOKIE_NAME, LANGUAGE_STORAGE_KEY, getCreatorDictionary, getDictionary, type AppDictionary } from "@/lib/i18n"

type LanguageContextType = {
  locale: Locale
  dictionary: AppDictionary
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  initialLocale
}: {
  children: React.ReactNode
  initialLocale: Locale
}) {
  const pathname = usePathname()
  const isCreatorRoute = (pathname?.startsWith("/creator") || pathname?.startsWith("/early-adopters")) ?? false
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const [dictionary, setDictionary] = useState<AppDictionary>(
    isCreatorRoute ? getCreatorDictionary(initialLocale) : getDictionary(initialLocale),
  )

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    setDictionary(isCreatorRoute ? getCreatorDictionary(newLocale) : getDictionary(newLocale))

    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLocale)
    }

    document.cookie = `${LANGUAGE_COOKIE_NAME}=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    document.documentElement.lang = newLocale
    window.dispatchEvent(new CustomEvent("language-change"))
  }

  useEffect(() => {
    setDictionary(isCreatorRoute ? getCreatorDictionary(locale) : getDictionary(locale))
  }, [locale, isCreatorRoute])

  return (
    <LanguageContext.Provider value={{ locale, dictionary, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
