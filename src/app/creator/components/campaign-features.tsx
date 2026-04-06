"use client"

import {
  Calendar,
  Clapperboard,
  MapPin,
  UsersRound,
  Wallet,
  Lock,
  SlidersHorizontal,
  Users,
  Send,
  Settings,
  Package,
  ArrowRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { appLink } from "@/lib/links"
import ShinyText from "@/components/ui/shiny-text"
import type { CampaignFeatureBlock, CampaignFloatingCard, SpotlightCard as SpotlightCardType } from "@/lib/i18n"

const CREATOR_ASSET_BASE = (process.env.NEXT_PUBLIC_CREATOR_ASSET_BASE ?? "https://creeadores-site-creator.vercel.app").replace(/\/$/, "")

const iconMap: Record<string, LucideIcon> = {
  clapperboard: Clapperboard,
  mappin: MapPin,
  usersround: UsersRound,
  wallet: Wallet,
  lock: Lock,
  sliders: SlidersHorizontal,
  users: Users,
  send: Send,
  package: Package,
  calendar: Calendar,
}

const blockAccent = [
  { color: "#E04006", bg: "rgba(224, 64, 6, 0.10)", gradientAlpha: "14" },
  { color: "#059669", bg: "rgba(5, 150, 105, 0.08)", gradientAlpha: "12" },
]

export function CampaignFeatures({ registerHref }: { registerHref?: string } = {}) {
  const { dictionary } = useLanguage()
  const t = dictionary.home.campaignFeatures

  return (
    <section id="features" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-16 overflow-hidden">
      <style>{`
        @keyframes floatingCardPulse {
          0%, 100% { transform: translateY(0); box-shadow: 0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06); }
          50% { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08); }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0, 25, 218, 0.07) 1.2px, transparent 1.2px)", backgroundSize: "16px 16px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(245,243,255,0.2) 50%, rgba(255,255,255,0.3) 100%)" }} />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm" style={{ background: "linear-gradient(135deg, rgba(0, 25, 218, 0.08) 0%, rgba(99, 60, 255, 0.08) 100%)", border: "1px solid rgba(0, 25, 218, 0.12)", boxShadow: "0 2px 8px rgba(0, 25, 218, 0.06)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", color: "#0019DA" }}>
            <Settings size={13} />
            <ShinyText text={t.badge} color="#0019DA" shineColor="#93C5FD" speed={2} spread={90} />
          </span>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.2, color: "#0A0A1A", whiteSpace: "pre-line", textTransform: "uppercase", letterSpacing: "-0.02em" }}>{t.title}</h2>
          <p className="mt-4 mx-auto max-w-2xl text-gray-500 text-[14px] sm:text-[16px]" style={{ lineHeight: 1.7 }}>{t.description}</p>
          <a href={registerHref ?? appLink("/creator/register")} className="inline-flex items-center justify-center gap-2 mt-6 bg-[#0019DA] text-white px-6 py-3 sm:px-10 sm:py-4 rounded-full hover:bg-[#0014B0] transition-colors cursor-pointer border-2 border-black/20 uppercase" style={{ fontSize: "clamp(13px, 3.5vw, 16px)", fontWeight: 700, letterSpacing: "0.04em" }}>
            <Sparkles size={18} className="sm:w-[20px] sm:h-[20px]" />
            CREAR MI PERFIL
          </a>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          {t.blocks.map((block, i) => (
            <FeatureBlock key={block.title} block={block} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MercadoPagoIcon() {
  return <img src="/mercadopago.png" alt="Mercado Pago" className="w-7 h-7 object-contain" />
}

function CampaignStatusIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#ECFDF5"/>
      <circle cx="12" cy="12" r="7" stroke="#22C55E" strokeWidth="1.5" fill="none"/>
      <path d="M10.5 9L15 12L10.5 15V9Z" fill="#22C55E"/>
    </svg>
  )
}

function FloatingCard({ card, delay = 0 }: { card: CampaignFloatingCard; delay?: number }) {
  const Icon = iconMap[card.iconName] || SlidersHorizontal
  return (
    <div className={`absolute ${card.position} hidden md:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl z-10 md:scale-[0.85] lg:scale-100`} style={{ background: "rgba(255, 255, 255, 0.98)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1.5px solid ${card.iconBg}26`, boxShadow: "0 8px 32px rgba(0, 0, 0, 0.10), 0 2px 8px rgba(0, 0, 0, 0.06)", animation: `floatingCardPulse 3s ease-in-out ${delay}s infinite` }}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${card.iconBg}18`, border: `1.5px solid ${card.iconBg}26` }}>
        {card.customIcon === "campaign-status" ? <CampaignStatusIcon size={24} /> : card.customIcon === "mercadopago" ? <MercadoPagoIcon /> : <Icon size={16} style={{ color: card.iconBg }} />}
      </div>
      <div className="min-w-0">
        <p style={{ fontSize: "12.5px", fontWeight: 600, color: "#0A0A1A", lineHeight: 1.35 }}>{card.text}</p>
        {card.subtext && <p style={{ fontSize: "11px", color: "#9CA3AF", lineHeight: 1.35, marginTop: "1px" }}>{card.subtext}</p>}
      </div>
    </div>
  )
}

function LaptopMockup({ image, floatingCards }: { image: string; floatingCards?: CampaignFloatingCard[] }) {
  const resolvedImage = image.startsWith("/") ? `${CREATOR_ASSET_BASE}${image}` : image

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[471px] mx-auto">
      {floatingCards?.map((card, i) => <FloatingCard key={card.text} card={card} delay={i * 1.5} />)}
      <div className="relative rounded-xl overflow-hidden" style={{ border: "2px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15)" }}>
        <div className="flex items-center gap-1 px-2 py-1" style={{ background: "#1E1E1E" }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF5F57" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FEBC2E" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#28C840" }} />
          <div className="flex-1 mx-6 h-3 rounded-sm" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>
        <div className="relative overflow-hidden bg-[#f5f5f5]">
          <img src={resolvedImage} alt="" className="w-full h-auto block" loading="lazy" />
          <div className="absolute inset-0 bg-black/5" />
        </div>
      </div>
      <div className="mx-auto h-3 rounded-b-xl" style={{ width: "60%", background: "linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 100%)", borderLeft: "2px solid rgba(255,255,255,0.06)", borderRight: "2px solid rgba(255,255,255,0.06)", borderBottom: "2px solid rgba(255,255,255,0.06)" }} />
    </div>
  )
}

function FeatureBlock({ block, index }: { block: CampaignFeatureBlock; index: number }) {
  const accent = blockAccent[index % blockAccent.length]
  const BlockIcon = iconMap[block.iconName] || SlidersHorizontal
  const reversed = index % 2 !== 0

  return (
    <div className="rounded-3xl overflow-hidden backdrop-blur-lg relative" style={{ background: "rgba(255, 255, 255, 0.60)", border: `1px solid ${accent.color}30`, boxShadow: "0 8px 32px rgba(0, 0, 0, 0.10), 0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)" }}>
      <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: `linear-gradient(to top, ${accent.color}${accent.gradientAlpha}, transparent 50%)` }} />
      <div className={`relative flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-6 sm:gap-8 lg:gap-12 p-5 sm:p-8 lg:p-12`}>
        <div className="w-full lg:w-1/2 flex-shrink-0"><LaptopMockup image={block.image} floatingCards={block.floatingCards} /></div>
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accent.bg, border: `1px solid ${accent.color}25` }}>
              <BlockIcon size={20} style={{ color: accent.color }} />
            </div>
          </div>
          <h3 className="mb-2" style={{ fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 700, color: "#0A0A1A", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{block.title}</h3>
          <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.6 }}>{block.subtitle}</p>
          <ul className="flex flex-col gap-0 mt-3">
            {block.cards.map((card) => <FeatureItem key={card.title} card={card} accentColor={accent.color} />)}
          </ul>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ card, accentColor }: { card: SpotlightCardType; accentColor: string }) {
  const Icon = iconMap[card.iconName] || SlidersHorizontal
  return (
    <li className="flex items-start gap-3 p-2 sm:p-3">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${accentColor}12`, border: `1px solid ${accentColor}25` }}>
        <Icon size={15} style={{ color: accentColor }} />
      </div>
      <div>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#0A0A1A", marginBottom: "2px" }}>{card.title}</p>
        <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5 }}>{card.description}</p>
      </div>
    </li>
  )
}
