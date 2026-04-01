"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"

const ITEMS = [
  { videoSrc: "/videos/hero-reel-3.mp4" },
  { videoSrc: "/videos/hero-reel-2.mp4" },
  { videoSrc: "/videos/hero-reel.mp4" },
  { videoSrc: "/videos/phone-demo-1.mp4" },
  { videoSrc: "/videos/phone-demo-2.mp4" },
]

const COUNT = ITEMS.length
const STEP = 360 / COUNT

interface HeroCarousel3DProps {
  onVideoClick: (videoSrc: string) => void
}

export function HeroCarousel3D({ onVideoClick }: HeroCarousel3DProps) {
  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const [radius, setRadius] = useState(180)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setRadius(w < 640 ? 120 : w < 1024 ? 160 : 180)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      mainVideoRef.current?.play().catch(() => {})
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center relative">
      {/* Background glow */}
      <div
        className="absolute pointer-events-none -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(237, 75, 0, 0.12) 0%, rgba(0, 25, 218, 0.08) 40%, rgba(0, 25, 218, 0.03) 60%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      <div
        className="relative w-full"
        style={{
          perspective: "1200px",
          height: "clamp(340px, 55vw, 510px)",
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {ITEMS.map((item, i) => {
            const itemAngle = i * STEP
            const theta = (itemAngle * Math.PI) / 180
            const x = Math.sin(theta) * radius
            const z = Math.cos(theta) * radius - radius
            const isFront = i === 0
            const normalizedZ = (z + radius * 2) / (radius * 2)
            const scale = isFront ? 1 : 0.55 + normalizedZ * 0.45
            const rotateY = (x / radius) * -25
            const opacity = isFront ? 1 : 0.3 + normalizedZ * 0.4
            const zIndex = Math.round(z + radius + 10)
            const overlayOpacity = isFront ? 0 : 0.6 - normalizedZ * 0.3

            return (
              <motion.div
                key={i}
                className={`absolute ${isFront ? "cursor-pointer" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity }}
                transition={{ duration: 0.7, delay: isFront ? 0 : 0.15 + i * 0.08 }}
                style={{ x, z, scale, rotateY, zIndex }}
                onClick={isFront ? () => onVideoClick(item.videoSrc) : undefined}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: isFront
                      ? "clamp(150px, 24vw, 230px)"
                      : "clamp(110px, 20vw, 210px)",
                    height: isFront
                      ? "clamp(330px, 53vw, 506px)"
                      : "clamp(242px, 44vw, 462px)",
                    border: "2px solid #2c2c2e",
                    borderRadius: isFront
                      ? "clamp(22px, 4vw, 40px)"
                      : "clamp(18px, 3.5vw, 36px)",
                    background: "#2c2c2e",
                    boxShadow: isFront
                      ? "inset 0 0 0 1px rgba(255,255,255,0.5), 0 25px 60px rgba(0,0,0,0.3), 0 10px 25px rgba(0,0,0,0.18), 0 3px 8px rgba(0,0,0,0.1)"
                      : "inset 0 0 0 1px rgba(255,255,255,0.4), 0 12px 32px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Notch */}
                  <div
                    className="absolute top-2 left-1/2 -translate-x-1/2 z-20"
                    style={{
                      width: "clamp(24px, 4vw, 52px)",
                      height: "clamp(6px, 1.3vw, 14px)",
                      backgroundColor: "#2c2c2e",
                      borderRadius: "12px",
                    }}
                  />

                  {/* Screen */}
                  <div
                    className="absolute inset-[3px] overflow-hidden"
                    style={{
                      borderRadius: isFront
                        ? "clamp(19px, 3.7vw, 38px)"
                        : "clamp(15px, 3.2vw, 34px)",
                    }}
                  >
                    <video
                      ref={isFront ? mainVideoRef : undefined}
                      src={item.videoSrc}
                      autoPlay={!isFront}
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />

                    {!isFront && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
                        }}
                      />
                    )}

                    {isFront && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <PlayButton />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ━━━ Play button ━━━ */

function PlayButton() {
  return (
    <div className="relative w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(255,255,255,0.25)",
          animation: "playRipple 2.5s ease-out 0s infinite",
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(255,255,255,0.2)",
          animation: "playRipple 2.5s ease-out 0.8s infinite",
        }}
      />
      <div
        className="w-full h-full rounded-full flex items-center justify-center backdrop-blur-md"
        style={{
          backgroundColor: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
          <path d="M8 5.14v13.72a1 1 0 001.5.86l11.25-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" />
        </svg>
      </div>
    </div>
  )
}
