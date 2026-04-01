"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowRight, Handshake, Sparkles, UserRound } from "lucide-react"
import { Logo } from "@/components/logo"
import { LanguageMenu } from "@/components/language-menu"
import { useLanguage } from "@/components/language-provider"
import { appLink } from "@/lib/links"
import { CampaignTypes } from "@/app/creator/components/campaign-types"
import { CampaignFeatures } from "@/app/creator/components/campaign-features"
import { Pricing } from "@/app/creator/components/pricing"
import { LandingFooter } from "@/app/creator/components/landing-footer"
import RotatingText from "@/components/ui/rotating-text"
import { HeroCarousel3D } from "@/components/landing/hero-carousel-3d"

function LandingHeader() {
  const { dictionary } = useLanguage()
  const { nav } = dictionary.home

  return (
    <header className="sticky top-0 z-50 bg-[#0019DA] backdrop-blur-lg" style={{ boxShadow: "0 2px 20px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.08)" }}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 sm:py-[22px] relative">
        <Logo href="/" variant="white" className="h-[22px] flex-shrink-0" />

        <div className="flex items-center gap-3">
          <a
            href={appLink("/creator/register?cohort=early_adopter")}
            className="bg-white text-[#0019DA] px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full hover:bg-white/90 transition-colors cursor-pointer flex items-center gap-1.5"
            style={{ fontSize: "12px", fontWeight: 600 }}
          >
            {nav.startFree}
            <ArrowRight size={14} />
          </a>

          <LanguageMenu variant="dark" />
        </div>
      </nav>
    </header>
  )
}

export default function EarlyAdoptersPage() {
  const { dictionary } = useLanguage()
  const { hero } = dictionary.home
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVideoSrc, setModalVideoSrc] = useState("/videos/hero-reel-3.mp4")

  const openVideoModal = (videoSrc: string) => {
    setModalVideoSrc(videoSrc)
    setShowVideoModal(true)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setModalVisible(true)),
    )
  }

  const closeModal = () => {
    setModalVisible(false)
    modalVideoRef.current?.pause()
    setTimeout(() => setShowVideoModal(false), 300)
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        @keyframes subtleGlow {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes playRipple {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes floatingCardPulse {
          0%, 100% { transform: translateY(0); box-shadow: 0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06); }
          50% { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08); }
        }
      `}</style>
      {/* Navigation */}
      <LandingHeader />

      {/* Hero Section — side-by-side layout */}
      <section className="relative overflow-hidden" style={{ marginTop: "-72px", paddingTop: "72px" }}>
        {/* Subtle dot texture */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(circle, rgba(0, 25, 218, 0.07) 1.2px, transparent 1.2px)", backgroundSize: "16px 16px" }} />

        {/* Hero content — flex row on desktop */}
        <div className="min-h-[90vh] md:min-h-[calc(75vh-12px)] lg:min-h-[calc(84vh-12px)] max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative z-20 flex items-center justify-start">
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-center gap-10 sm:gap-10 lg:gap-8 py-8 sm:py-12">
            {/* Left: Text content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div
                className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full mb-3 sm:mb-6 backdrop-blur-lg animate-shine"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.6)", border: "1px solid rgba(0, 25, 218, 0.25)", boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)" }}
              >
                <span className="flex items-center gap-1.5 uppercase text-[12px]" style={{ fontWeight: 700, letterSpacing: "0.06em", color: "#030870" }}>
                  <Handshake size={13} />
                  {hero.badge}
                </span>
                <span className="w-px h-3.5" style={{ backgroundColor: "rgba(0, 25, 218, 0.15)" }} />
                <div className="flex items-center gap-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="14" viewBox="0 0 60 18" fill="none">
                    <g clipPath="url(#clip0_tiktok_ea)">
                      <path d="M11.4664 6.4964C12.5952 7.32678 13.9781 7.81536 15.4717 7.81536V4.85775C15.189 4.85781 14.9071 4.82748 14.6306 4.76719V7.09525C13.1371 7.09525 11.7544 6.60667 10.6253 5.77635V11.812C10.6253 14.8313 8.24675 17.2788 5.31287 17.2788C4.21817 17.2788 3.20069 16.9382 2.35547 16.3541C3.32015 17.3691 4.66547 17.9988 6.15383 17.9988C9.08789 17.9988 11.4665 15.5513 11.4665 12.5319V6.4964H11.4664ZM12.504 3.51253C11.9271 2.86396 11.5484 2.02579 11.4664 1.09916V0.71875H10.6693C10.8699 1.89649 11.5543 2.90269 12.504 3.51253ZM4.21115 14.0372C3.88883 13.6023 3.71465 13.0703 3.71543 12.5233C3.71543 11.1423 4.80335 10.0227 6.14555 10.0227C6.39569 10.0226 6.64433 10.062 6.88271 10.1398V7.11613C6.60413 7.07684 6.32297 7.06016 6.04193 7.06628V9.41979C5.80337 9.34195 5.55461 9.30241 5.30441 9.30266C3.96221 9.30266 2.87435 10.4222 2.87435 11.8033C2.87435 12.7799 3.41813 13.6253 4.21115 14.0372Z" fill="#FF004F"/>
                      <path d="M10.6237 5.77629C11.7529 6.60661 13.1356 7.09519 14.629 7.09519V4.76713C13.7954 4.5844 13.0574 4.13609 12.5025 3.51253C11.5527 2.90263 10.8684 1.89643 10.6678 0.71875H8.57402V12.5318C8.56928 13.9089 7.48322 15.024 6.1439 15.024C5.35466 15.024 4.6535 14.6369 4.20944 14.0372C3.41648 13.6253 2.8727 12.7798 2.8727 11.8034C2.8727 10.4224 3.96056 9.30272 5.30276 9.30272C5.55992 9.30272 5.80778 9.34393 6.04028 9.41985V7.06634C3.15794 7.12762 0.839844 9.55118 0.839844 12.5318C0.839844 14.0198 1.4171 15.3686 2.354 16.3542C3.19922 16.9382 4.2167 17.2788 5.3114 17.2788C8.24534 17.2788 10.6238 14.8312 10.6238 11.812V5.77629H10.6237Z" fill="black"/>
                      <path d="M14.6303 4.76837V4.13888C13.8785 4.14005 13.1416 3.92341 12.5038 3.51371C13.0684 4.14981 13.8118 4.58842 14.6303 4.76837ZM10.669 0.71999C10.6499 0.607436 10.6352 0.49414 10.625 0.380412V0H7.73406V11.8132C7.72944 13.1901 6.64344 14.3052 5.304 14.3052C4.91076 14.3052 4.53948 14.2092 4.21068 14.0385C4.65474 14.6381 5.3559 15.0252 6.14514 15.0252C7.48434 15.0252 8.57058 13.9102 8.57526 12.5331V0.71999H10.669ZM6.04164 7.06758V6.39744C5.80008 6.36346 5.55654 6.34642 5.3127 6.34654C2.37852 6.34648 0 8.79407 0 11.8132C0 13.7059 0.9348 15.3741 2.3553 16.3553C1.4184 15.3698 0.84114 14.0209 0.84114 12.533C0.84114 9.55242 3.15918 7.12886 6.04164 7.06758Z" fill="#00F2EA"/>
                      <path d="M48.1293 14.8032C50.2287 14.8032 51.9306 13.0651 51.9306 10.9213C51.9306 8.77748 50.2287 7.03906 48.1293 7.03906H47.5566C49.656 7.03906 51.3579 8.77742 51.3579 10.9213C51.3579 13.0651 49.656 14.8032 47.5566 14.8032H48.1293Z" fill="#FF004F"/>
                      <path d="M47.5011 7.03906H46.9284C44.8292 7.03906 43.127 8.77742 43.127 10.9213C43.127 13.0651 44.8292 14.8032 46.9284 14.8032H47.5011C45.4015 14.8032 43.6996 13.0651 43.6996 10.9213C43.6995 8.77748 45.4015 7.03906 47.5011 7.03906Z" fill="#00F2EA"/>
                      <path d="M18.6055 5.28516V7.25288H20.8441V14.7508H23.0837V7.30601H24.906L25.5308 5.28522L18.6055 5.28516ZM36.9344 5.28516V7.25288H39.173V14.7508H41.4126V7.30601H43.2349L43.8596 5.28522L36.9344 5.28516ZM25.9478 6.40181C25.9478 5.78523 26.4365 5.28516 27.0404 5.28516C27.6448 5.28516 28.1341 5.78523 28.1341 6.40181C28.1341 7.01845 27.6451 7.51852 27.0404 7.51852C26.4365 7.51821 25.9478 7.01845 25.9478 6.40181ZM25.9478 8.3164H28.1341V14.7508H25.9478V8.3164ZM29.0715 5.28516V14.7507H31.2586V12.3048L31.9356 11.6661L34.0702 14.8039H36.4132L33.3408 10.2306L36.1006 7.46508H33.4451L31.2586 9.69844V5.28516H29.0715ZM52.6591 5.28516V14.7507H54.8465V12.3048L55.5232 11.6661L57.6584 14.8039H60.0017L56.9293 10.2306L59.689 7.46508H57.0337L54.8465 9.69844V5.28516H52.6591Z" fill="black"/>
                      <path d="M47.5524 14.8032C49.6517 14.8032 51.3539 13.0651 51.3539 10.9213C51.3539 8.77748 49.6517 7.03906 47.5524 7.03906H47.5005C45.4011 7.03906 43.6992 8.77742 43.6992 10.9213C43.6992 13.0651 45.4011 14.8032 47.5005 14.8032H47.5524ZM45.6779 10.9213C45.6779 9.87844 46.5059 9.03372 47.5269 9.03372C48.5472 9.03372 49.3752 9.87844 49.3752 10.9213C49.3752 11.9641 48.5472 12.8093 47.5269 12.8093C46.5059 12.8091 45.6779 11.9641 45.6779 10.9213Z" fill="black"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_tiktok_ea"><rect width="60" height="18" fill="white"/></clipPath>
                    </defs>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="55" height="11" viewBox="0 0 71 14" fill="none">
                    <g clipPath="url(#clip0_meta_ea)">
                      <path d="M2.31822 9.07838C2.31822 9.86974 2.4981 10.4773 2.7332 10.8449C3.04145 11.3264 3.50121 11.5303 3.96993 11.5303C4.57449 11.5303 5.12755 11.3855 6.19337 9.962C7.04721 8.82108 8.05332 7.2196 8.73027 6.21562L9.87669 4.51468C10.6731 3.3334 11.5948 2.02022 12.6517 1.13011C13.5145 0.403612 14.4452 0 15.3819 0C16.9545 0 18.4525 0.880017 19.5989 2.5305C20.8535 4.3381 21.4626 6.61491 21.4626 8.9645C21.4626 10.3613 21.1775 11.3876 20.6923 12.1984C20.2236 12.9826 19.31 13.766 17.7733 13.766V11.5303C19.0891 11.5303 19.4175 10.3627 19.4175 9.02648C19.4175 7.1223 18.9578 5.00911 17.9449 3.49917C17.2262 2.42816 16.2947 1.77373 15.27 1.77373C14.1616 1.77373 13.2697 2.58095 12.2673 4.02026C11.7344 4.78496 11.1873 5.71687 10.5731 6.76842L9.89685 7.9252C8.53846 10.251 8.19438 10.7808 7.51518 11.655C6.32473 13.1858 5.30817 13.766 3.96993 13.766C2.38241 13.766 1.37854 13.1022 0.756818 12.1019C0.249287 11.2867 0 10.2171 0 8.99838L2.31822 9.07838Z" fill="#0081FB"/>
                      <path d="M1.82812 2.68834C2.89095 1.10633 4.42474 0 6.18393 0C7.20272 0 8.21555 0.291177 9.27315 1.12507C10.43 2.0368 11.663 3.53809 13.2013 6.01237L13.7529 6.90032C15.0844 9.04234 15.8419 10.1443 16.2853 10.664C16.8555 11.3314 17.2548 11.5303 17.7735 11.5303C19.0894 11.5303 19.4178 10.3627 19.4178 9.02648L21.4628 8.9645C21.4628 10.3613 21.1777 11.3876 20.6926 12.1984C20.2239 12.9826 19.3103 13.766 17.7735 13.766C16.8182 13.766 15.9718 13.5657 15.0359 12.713C14.3164 12.0586 13.4752 10.8961 12.8281 9.85101L10.9032 6.74608C9.93742 5.18785 9.05148 4.02603 8.53872 3.49989C7.98716 2.93411 7.27811 2.25086 6.14661 2.25086C5.23082 2.25086 4.4531 2.87141 3.80227 3.82062L1.82812 2.68834Z" fill="url(#paint0_meta_ea)"/>
                      <path d="M6.14634 2.25086C5.23055 2.25086 4.45283 2.87141 3.802 3.82062C2.88173 5.1619 2.31822 7.15978 2.31822 9.07838C2.31822 9.86974 2.4981 10.4773 2.7332 10.8449L0.756818 12.1019C0.249287 11.2867 0 10.2171 0 8.99838C0 6.78212 0.629935 4.47216 1.82786 2.68834C2.89069 1.10633 4.42447 0 6.18366 0L6.14634 2.25086Z" fill="url(#paint1_meta_ea)"/>
                      <path d="M25.9688 0.437012H28.6505L33.21 8.40257L37.7703 0.437012H40.3938V13.5256H38.2062V3.49437L34.2072 10.4408H32.1547L28.1564 3.49437V13.5256H25.9688V0.437012ZM47.2485 5.31711C45.6796 5.31711 44.7347 6.45731 44.5085 7.86923H49.8331C49.7234 6.41479 48.8546 5.31711 47.2485 5.31711ZM42.3396 8.67357C42.3396 5.7027 44.3279 3.5405 47.2865 3.5405C50.1966 3.5405 51.9342 5.67531 51.9342 8.83213V9.41232H44.5085C44.772 10.9482 45.8274 11.9832 47.5291 11.9832C48.8867 11.9832 49.7354 11.5832 50.54 10.8516L51.702 12.2261C50.6071 13.1983 49.2144 13.7591 47.4515 13.7591C44.2488 13.7591 42.3396 11.5039 42.3396 8.67357ZM54.5868 5.5045H52.5731V3.77474H54.5868V0.914138H56.6975V3.77474H59.7569V5.5045H56.6975V9.88873C56.6975 11.3857 57.1931 11.9176 58.4112 11.9176C58.9672 11.9176 59.2859 11.8715 59.7569 11.7958V13.5068C59.1702 13.6668 58.6104 13.7403 58.0044 13.7403C55.7257 13.7403 54.5868 12.5382 54.5868 10.1316V5.5045ZM68.6446 7.18669C68.2207 6.15316 67.275 5.39206 65.8853 5.39206C64.0791 5.39206 62.9229 6.62957 62.9229 8.64546C62.9229 10.6109 63.9873 11.9082 65.7987 11.9082C67.2228 11.9082 68.2393 11.1082 68.6446 10.1129V7.18669ZM70.7553 13.5256H68.6834V12.1605C68.1042 12.9641 67.0504 13.7591 65.3434 13.7591C62.5983 13.7591 60.7637 11.5399 60.7637 8.64546C60.7637 5.7236 62.6423 3.5405 65.4599 3.5405C66.8526 3.5405 67.9453 4.07816 68.6834 5.02737V3.77474H70.7553V13.5256Z" fill="#192830"/>
                    </g>
                    <defs>
                      <linearGradient id="paint0_meta_ea" x1="4.55312" y1="8.4326" x2="19.3285" y2="9.20537" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0064E1"/><stop offset="0.4" stopColor="#0064E1"/><stop offset="0.83" stopColor="#0073EE"/><stop offset="1" stopColor="#0082FB"/>
                      </linearGradient>
                      <linearGradient id="paint1_meta_ea" x1="3.35866" y1="10.0182" x2="3.35866" y2="4.75685" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0082FB"/><stop offset="1" stopColor="#0064E0"/>
                      </linearGradient>
                      <clipPath id="clip0_meta_ea"><rect width="70.7557" height="13.766" fill="white"/></clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

              <h1
                className="text-[#0019DA] mb-3 sm:mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
                style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}
              >
                <span style={{ letterSpacing: "-0.05em" }}>{hero.line1} {hero.line2}</span><br /><RotatingText
                  texts={hero.rotatingWords}
                  rotationInterval={3500}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  textStyle={{ fontWeight: 800, background: "linear-gradient(90deg, #0019DA 0%, #2201B2 35%, #ED4B00 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } as React.CSSProperties}
                >
                  <svg className="inline align-baseline ml-1" style={{ height: "0.28em", width: "auto" }} viewBox="0 0 54 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M53.4307 13.373V15.6679C53.4015 15.8136 53.3724 15.9666 53.336 16.1123C53.0081 17.4237 52.8405 18.8006 52.3087 20.0246C50.0794 25.168 46.1526 28.1914 40.572 28.92C39.1514 29.1021 37.6944 28.9928 36.2519 28.9928C29.1705 28.9928 22.0964 29.0001 15.0151 28.9928C14.0461 28.9928 13.0553 28.9782 12.1082 28.7888C6.46938 27.696 2.6373 24.4395 0.735827 19.0119C0.364274 17.9482 0.233131 16.7899 0 15.6752C0 14.9103 0 14.1453 0 13.3803C0.0291414 13.2346 0.072857 13.0816 0.094713 12.9359C0.706682 8.13489 3.10351 4.49221 7.24159 2.00791C9.59475 0.594552 12.1884 0.0481555 14.9204 0.0481555C22.2786 0.0554408 29.6367 0.0481555 36.9949 0.0481555C37.2936 0.0481555 37.5851 0.0408655 37.8838 0.0262948C44.7174 -0.367114 50.6768 3.68354 52.7677 10.1894C53.0955 11.2166 53.2267 12.3167 53.4453 13.3803L53.4307 13.373ZM29.4692 14.5023C29.4255 19.6384 33.6364 23.8931 38.8162 23.9441C44.018 23.9951 48.2872 19.806 48.3236 14.6188C48.3674 9.42439 44.2147 5.16246 39.064 5.10418C33.7603 5.0459 29.5202 9.20583 29.4692 14.5023Z" fill="#ED4B00"/></svg>
                </RotatingText>
              </h1>

              <p className="text-gray-500 mb-4 sm:mb-8 max-w-lg text-[12px] sm:text-[14px]" style={{ fontWeight: 400, lineHeight: 1.7 }}>
                {hero.description}
              </p>

              <div className="flex flex-row gap-3">
                <a
                  href={appLink("/creator/register?cohort=early_adopter")}
                  className="text-[#0019DA] px-5 py-2.5 sm:px-7 sm:py-3 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    backgroundColor: "white",
                    border: "2px solid rgba(0, 25, 218, 0.2)",
                    boxShadow: "0 2px 12px rgba(0, 25, 218, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(0,25,218,0.06) 0%, rgba(75,60,255,0.10) 100%)";
                    e.currentTarget.style.borderColor = "rgba(0, 25, 218, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.borderColor = "rgba(0, 25, 218, 0.2)";
                  }}
                >
                  <UserRound size={15} />
                  {hero.ctas.primary}
                </a>
                <a
                  href={appLink("/creator/register?cohort=early_adopter")}
                  className="bg-[#0019DA] text-white px-5 py-2.5 sm:px-7 sm:py-3 rounded-full hover:bg-[#0014B0] transition-colors cursor-pointer flex items-center justify-center gap-2"
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  <Sparkles size={15} />
                  Crear Contenido
                </a>
              </div>
            </div>

            {/* Right: 3D Phone Carousel */}
            <HeroCarousel3D onVideoClick={openVideoModal} />
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0, 25, 218, 0.1), transparent)" }}
        />
      </section>

      {/* Campaign Types */}
      <CampaignTypes />
      {/* Campaign Features */}
      <CampaignFeatures registerHref={appLink("/creator/register?cohort=early_adopter")} />
      {/* Pricing / Reputation */}
      <Pricing registerHref={appLink("/creator/register?cohort=early_adopter")} />
      {/* Footer */}
      <LandingFooter hideNavLinks />

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out"
          style={{
            backgroundColor: "rgba(0,0,0,0.85)",
            opacity: modalVisible ? 1 : 0,
          }}
          onClick={closeModal}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer"
            onClick={closeModal}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div
            className="relative transition-all duration-300 ease-out"
            style={{
              width: "min(380px, 90vw)",
              aspectRatio: "9/16",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              transform: modalVisible ? "scale(1)" : "scale(0.85)",
              opacity: modalVisible ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={modalVideoSrc}
              autoPlay
              loop
              playsInline
              controls
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  )
}
