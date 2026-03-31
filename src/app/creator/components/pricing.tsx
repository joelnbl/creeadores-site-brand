"use client"

import React, { useRef } from "react"
import { Check, Users, Megaphone, Percent, ArrowRight, BadgeDollarSign, type LucideIcon } from "lucide-react"
import { motion, useInView } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { appLink } from "@/lib/links"
import ShinyText from "@/components/ui/shiny-text"
import type { PricingPlan } from "@/lib/i18n"

const featureIconMap: Record<string, LucideIcon> = {
  users: Users,
  megaphone: Megaphone,
  percent: Percent,
}

const planStyle: { emoji: string; accent: string; gradient: string; glow: string }[] = [
  { emoji: "🚀", accent: "#0019DA", gradient: "linear-gradient(135deg, #0019DA 0%, #030870 100%)", glow: "rgba(0, 25, 218, 0.35)" },
  { emoji: "🥉", accent: "#CD7F32", gradient: "linear-gradient(135deg, #CD7F32 0%, #8B5A20 100%)", glow: "rgba(205, 127, 50, 0.30)" },
  { emoji: "🥈", accent: "#7B8794", gradient: "linear-gradient(135deg, #8B9DAF 0%, #5A6B7D 100%)", glow: "rgba(139, 157, 175, 0.30)" },
  { emoji: "🥇", accent: "#D4A017", gradient: "linear-gradient(135deg, #F59E0B 0%, #B8860B 100%)", glow: "rgba(245, 158, 11, 0.35)" },
]

export function Pricing() {
  const { dictionary } = useLanguage()
  const t = dictionary.home.pricing
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="reputation" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-16 bg-[#FAFAFE] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0, 25, 218, 0.07) 1.2px, transparent 1.2px)", backgroundSize: "16px 16px" }} />
      <div ref={ref} className="relative max-w-[1440px] mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(0, 25, 218, 0.08) 0%, rgba(99, 60, 255, 0.08) 100%)",
              border: "1px solid rgba(0, 25, 218, 0.12)",
              boxShadow: "0 2px 8px rgba(0, 25, 218, 0.06)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "#0019DA",
            }}
          >
            <BadgeDollarSign size={13} />
            <ShinyText text={t.badge} color="#0019DA" shineColor="#93C5FD" speed={2} spread={90} />
          </span>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.2, color: "#0A0A1A", textTransform: "uppercase", letterSpacing: "-0.02em", whiteSpace: "pre-line" }}>
            {t.title}
          </h2>
          <p className="mt-4 mx-auto max-w-[520px] text-gray-500" style={{ fontSize: "16px", lineHeight: 1.7 }}>
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-[960px] mx-auto">
          {t.plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-12 sm:mt-20">
          <a
            href={appLink("/creator/register")}
            className="relative inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#0019DA] text-white text-[13px] sm:text-[15px] font-semibold transition-colors hover:bg-[#0014B0] cursor-pointer overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.25)", boxShadow: "0 0 0 1px rgba(0,25,218,0.5), 0 4px 16px rgba(0,25,218,0.3)" }}
          >
            <span className="absolute inset-0 animate-shine-loop" />
            <span className="relative">✨ {t.ctaButton} ✨</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function PlanCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const style = planStyle[index % planStyle.length]
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 cursor-default group${plan.popular ? " animate-pulse-subtle" : ""}`}
      style={{
        boxShadow: `0 8px 32px ${style.glow}, 0 2px 8px rgba(0,0,0,0.06)`,
      }}
    >
      {plan.popular && plan.popularLabel && (
        <div
          className="absolute -top-0 left-1/2 -translate-x-1/2 px-4 py-1 rounded-b-lg whitespace-nowrap z-20"
          style={{
            backgroundColor: "#FFD700",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "#0A0A1A",
          }}
        >
          🚀 {plan.popularLabel}
        </div>
      )}

      <div className="h-1.5 w-full" style={{ background: style.gradient }} />

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-30 z-10"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${style.accent}40, transparent 70%)`,
        }}
      />

      <div className="relative p-5 sm:p-6 flex flex-col flex-1 bg-white">
        <div
          className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-[0.08]"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${style.accent}, transparent 70%)`,
          }}
        />

        <span
          className="absolute -top-2 -right-1 select-none pointer-events-none"
          style={{
            fontSize: "90px",
            fontWeight: 800,
            color: `${style.accent}08`,
            lineHeight: 1,
          }}
        >
          {style.emoji}
        </span>

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative z-10"
          style={{
            background: `linear-gradient(135deg, ${style.accent}20, ${style.accent}08)`,
            border: `2px solid ${style.accent}30`,
            boxShadow: `0 4px 16px ${style.accent}20`,
          }}
        >
          <span className="text-[28px]" style={{ lineHeight: 1 }}>
            {style.emoji}
          </span>
        </div>

        <h3 className="text-[17px] sm:text-[19px] relative z-10" style={{ fontWeight: 700, color: "#0A0A1A", marginBottom: "3px" }}>
          {plan.name}
        </h3>
        <p className="relative z-10" style={{ fontSize: "12px", color: "#888", marginBottom: "16px" }}>
          {plan.description}
        </p>

        <div className="mb-4 relative z-10">
          {plan.price ? (
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] sm:text-[34px]" style={{ fontWeight: 800, color: style.accent, lineHeight: 1 }}>
                  {plan.arsPrice ?? plan.price}
                </span>
                <span style={{ fontSize: "13px", color: "#999", fontWeight: 500 }}>
                  {plan.period}
                </span>
              </div>
              {plan.arsPrice && (
                <span style={{ fontSize: "12px", fontWeight: 500, color: "#999", marginTop: "4px", display: "block" }}>
                  ({plan.price}{plan.period})
                </span>
              )}
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: `linear-gradient(135deg, ${style.accent}15, ${style.accent}08)`, border: `1px solid ${style.accent}25` }}>
              <span style={{ fontSize: "15px", fontWeight: 700, color: style.accent }}>
                {plan.customPriceLabel}
              </span>
            </div>
          )}
        </div>

        <div className="h-px w-full mb-4" style={{ background: `linear-gradient(90deg, transparent, ${style.accent}30, transparent)` }} />

        <ul className="flex flex-col gap-2.5 mb-5 flex-1 relative z-10">
          {plan.features.map((feature) => {
            const FeatureIcon = featureIconMap[feature.iconName] || Check
            return (
              <li key={feature.text} className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${style.accent}12`, border: `1px solid ${style.accent}20` }}>
                  <FeatureIcon size={12} style={{ color: style.accent }} />
                </div>
                <span className="text-[11.5px] sm:text-[12px]" style={{ fontWeight: 500, color: "#555" }}>
                  {feature.text}
                </span>
              </li>
            )
          })}
        </ul>

        <a
          href={appLink("/creator/register")}
          className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer hover:opacity-90 relative z-10"
          style={{
            background: style.gradient,
            color: "#FFFFFF",
            fontSize: "13px",
            fontWeight: 600,
            boxShadow: `0 4px 16px ${style.glow}`,
          }}
        >
          {plan.cta}
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  )
}
