"use client"

import { useState, useRef, useEffect } from "react"
import { Globe, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { resolveLocale, type Locale } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

const LANGUAGE_OPTIONS: Array<{ value: Locale; label: string; short: string; flag: string }> = [
  { value: "es-AR", label: "Español", short: "ES", flag: "🇪🇸" },
  { value: "en", label: "English", short: "EN", flag: "🇺🇸" },
  { value: "pt", label: "Português", short: "PT", flag: "🇧🇷" },
]

export function LanguageMenu({ variant = "light" }: { variant?: "light" | "dark" }) {
  const router = useRouter()
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const handleSelect = (value: string) => {
    const nextLocale = resolveLocale(value)
    setLocale(nextLocale)
    setOpen(false)
    router.refresh()
  }

  const current = LANGUAGE_OPTIONS.find((o) => o.value === locale) ?? LANGUAGE_OPTIONS[0]
  const isDark = variant === "dark"

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 cursor-pointer transition-colors ${
          isDark
            ? "bg-white/10 text-white hover:bg-white/20"
            : "bg-white/90 text-[#0019DA] hover:bg-white border border-[#0019DA]/12 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
        }`}
        style={{ fontSize: "11px", fontWeight: 600 }}
      >
        <Globe className="h-3 w-3 flex-shrink-0" />
        <span className="hidden sm:inline">{current.short}</span>
        <ChevronDown
          size={12}
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Custom dropdown (all breakpoints) */}
      <div
        className="absolute right-0 mt-2 w-[160px] rounded-xl bg-white overflow-hidden"
        style={{
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06)",
          transformOrigin: "top right",
          transition: "opacity 200ms ease, transform 200ms ease",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1) translateY(0)" : "scale(0.95) translateY(-4px)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer ${
              option.value === locale ? "bg-gray-50" : ""
            }`}
          >
            <span className="text-sm leading-none">{option.flag}</span>
            <span
              className={`text-gray-700 ${option.value === locale ? "font-semibold" : ""}`}
              style={{ fontSize: "12px", fontWeight: option.value === locale ? 600 : 400 }}
            >
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
