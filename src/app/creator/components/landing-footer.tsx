"use client"

import { Globe, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { useLanguage } from "@/components/language-provider"
import { resolveLocale, type Locale } from "@/lib/i18n";
import { useRouter } from "next/navigation";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.3 0 .59.05.86.12V9.01a6.27 6.27 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15Z" />
    </svg>
  )
}

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/creeadores/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/creeadores/", label: "LinkedIn" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@creeadores.app", label: "TikTok" },
]


const footerLocales: { value: Locale; label: string }[] = [
  { value: "es-AR", label: "Español" },
  { value: "en", label: "English" },
  { value: "pt", label: "Português" },
]

const legalPaths = ["https://app.creeadores.com/privacy-policy", "https://app.creeadores.com/terms-of-service"]

export function LandingFooter({ hideNavLinks = false }: { hideNavLinks?: boolean } = {}) {
  const { dictionary, locale, setLocale } = useLanguage()
  const router = useRouter();
  
  const t = dictionary.home.landingFooter
  const links = dictionary.home.nav.links

  
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLocale = resolveLocale(event.target.value);
      // Update context which will update all components instantly
      setLocale(newLocale);
      // Also refresh the page to update server components
      router.refresh();
    };

  return (
    <footer className="bg-[#0019DA] text-white pt-8 pb-6 sm:pt-10 sm:pb-8">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col items-center gap-5 mb-6 text-center">
          <div className="max-w-[540px]">
            <div className="mb-4 flex justify-center">
              <Logo href="/" variant="white" className="h-5" />
            </div>
            <p className="text-white/60 text-[11px] sm:text-[12px]" style={{ lineHeight: 1.7 }}>
              {t.description}
            </p>
          </div>

          {!hideNavLinks && (
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-white/60 hover:text-white transition-colors pb-1 text-[12px] sm:text-[13px]"
                  style={{ fontWeight: 500 }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-1/2 h-[2px] w-0 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"
                    style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))" }}
                  />
                </a>
              ))}
            </div>
          )}

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid transparent" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent" }}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              )
            })}
          </div>
        </div>

        <div className="h-px w-full mb-6" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {t.legal.map((item, i) => (
              <Link
                key={item}
                href={legalPaths[i] || "#"}
                className="text-white/40 hover:text-white/70 transition-colors"
                style={{ fontSize: "12px", fontWeight: 400 }}
              >
                {item}
              </Link>
            ))}
            <div className="relative inline-flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-white/40 pointer-events-none" />
              <select
                value={locale}
                onChange={handleLanguageChange}
                className="appearance-none bg-transparent text-white/40 hover:text-white/70 transition-colors cursor-pointer pr-4 outline-none w-[78px]"
                style={{ fontSize: "12px", fontWeight: 400 }}
              >
                {footerLocales.map((loc) => (
                  <option key={loc.value} value={loc.value} className="bg-[#0019DA] text-white">
                    {loc.label}
                  </option>
                ))}
              </select>
              <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-white/40" style={{ fontSize: "12px", fontWeight: 400 }}>
            {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

