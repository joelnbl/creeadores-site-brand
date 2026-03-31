"use client"

import { useState } from "react"
import { Rocket, Users, ShieldCheck, CircleCheckBig, type LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { analytics } from "@/lib/analytics"

const iconMap: LucideIcon[] = [Rocket, Users, ShieldCheck, CircleCheckBig]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const { dictionary } = useLanguage()
  const t = dictionary.home.howItWorks

  function trackStepSelection(stepIndex: number, interactionType: "step_click" | "previous" | "next") {
    const step = t.steps[stepIndex]
    analytics.track("how_it_works_step_selected", {
      step_number: stepIndex + 1,
      step_title: step.title,
      interaction_type: interactionType,
      location: "how_it_works",
    })
  }

  function handleStepClick(stepIndex: number) {
    setActiveStep(stepIndex)
    trackStepSelection(stepIndex, "step_click")
  }

  function handlePreviousStep() {
    const nextStep = Math.max(0, activeStep - 1)
    if (nextStep === activeStep) {
      return
    }

    setActiveStep(nextStep)
    trackStepSelection(nextStep, "previous")
  }

  function handleNextStep() {
    const nextStep = Math.min(t.steps.length - 1, activeStep + 1)
    if (nextStep === activeStep) {
      return
    }

    setActiveStep(nextStep)
    trackStepSelection(nextStep, "next")
  }

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(0, 25, 218, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 25, 218, 0.03) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <div
            className="inline-block px-5 py-2 rounded-full mb-6"
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              backgroundColor: "rgba(0, 25, 218, 0.08)",
              color: "#0019DA",
            }}
          >
            {t.badge}
          </div>
          <h2
            className="text-gray-900 mb-4"
            style={{ fontSize: "clamp(22px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.15 }}
          >
            {t.title}
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto" style={{ fontSize: "15px", lineHeight: 1.7 }}>
            {t.description}
          </p>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:block">
          {/* Step selector - horizontal timeline */}
          <div className="relative mb-14">
            <div className="absolute top-6 left-[12.5%] right-[12.5%] h-[2px] bg-gray-200" />
            <div
              className="absolute top-6 left-[12.5%] h-[2px] transition-all duration-500 ease-out"
              style={{
                width: `${(activeStep / 3) * 75}%`,
                background: "linear-gradient(90deg, #0019DA, #3B5BFF)",
              }}
            />

            <div className="relative flex justify-between px-[12.5%]">
              {t.steps.map((step, i) => {
                const isActive = i === activeStep
                const isPast = i < activeStep
                return (
                  <button
                    key={step.number}
                    onClick={() => handleStepClick(i)}
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative z-10"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, #0019DA, #3B5BFF)"
                          : isPast
                            ? "#0019DA"
                            : "#fff",
                        border: isActive || isPast ? "none" : "2px solid #e5e7eb",
                        boxShadow: isActive ? "0 4px 20px rgba(0, 25, 218, 0.3)" : "none",
                        transform: isActive ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: isActive || isPast ? "#fff" : "#9ca3af",
                        }}
                      >
                        {step.number}
                      </span>
                    </div>
                    <span
                      className="transition-colors duration-300"
                      style={{
                        fontSize: "13px",
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "#0019DA" : isPast ? "#374151" : "#9ca3af",
                      }}
                    >
                      {step.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active step content card */}
          <div
            className="rounded-3xl p-10 lg:p-14 flex items-center gap-14 transition-all duration-500"
            style={{
              background: "linear-gradient(135deg, rgba(0, 25, 218, 0.04) 0%, rgba(59, 91, 255, 0.02) 100%)",
              border: "1px solid rgba(0, 25, 218, 0.08)",
            }}
          >
            <div className="flex-shrink-0">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #0019DA, #3B5BFF)",
                  boxShadow: "0 8px 32px rgba(0, 25, 218, 0.25)",
                }}
              >
                {(() => {
                  const Icon = iconMap[activeStep]
                  return <Icon size={40} color="#fff" strokeWidth={1.8} />
                })()}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0019DA",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.stepLabel} {t.steps[activeStep].number}
                </span>
              </div>
              <h3
                className="text-gray-900 mb-4"
                style={{ fontSize: "26px", fontWeight: 700, lineHeight: 1.2 }}
              >
                {t.steps[activeStep].title}
              </h3>
              <p className="text-gray-500 max-w-xl" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                {t.steps[activeStep].description}
              </p>
            </div>

            <div className="flex flex-col gap-3 flex-shrink-0">
              <button
                onClick={handlePreviousStep}
                disabled={activeStep === 0}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#0019DA] hover:text-[#0019DA] transition-colors disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 12L8 4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={handleNextStep}
                disabled={activeStep === t.steps.length - 1}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#0019DA] hover:text-[#0019DA] transition-colors disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 4L8 12M8 12L12 8M8 12L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile layout - stacked cards */}
        <div className="lg:hidden flex flex-col gap-5">
          {t.steps.map((step, i) => {
            const Icon = iconMap[i]
            return (
              <div
                key={step.number}
                className="rounded-2xl p-5 sm:p-6 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 25, 218, 0.04) 0%, rgba(59, 91, 255, 0.02) 100%)",
                  border: "1px solid rgba(0, 25, 218, 0.08)",
                }}
              >
                <span
                  className="absolute -top-2 -right-1 select-none pointer-events-none"
                  style={{
                    fontSize: "100px",
                    fontWeight: 800,
                    color: "rgba(0, 25, 218, 0.04)",
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #0019DA, #3B5BFF)" }}
                    >
                      <Icon size={22} color="#fff" strokeWidth={1.8} />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#0019DA",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {t.stepLabel} {step.number}
                      </span>
                      <h3 className="text-gray-900 text-[16px] sm:text-[18px]" style={{ fontWeight: 700 }}>
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-500 text-[13px] sm:text-[14px]" style={{ lineHeight: 1.7 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
