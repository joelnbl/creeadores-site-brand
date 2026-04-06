"use client"

import { useRef } from "react"

interface HeroLaptopMockupProps {
  videoSrc: string
  onVideoClick: (videoSrc: string) => void
}

export function HeroLaptopMockup({ videoSrc, onVideoClick }: HeroLaptopMockupProps) {
  const videoRef = useRef<HTMLVideoElement>(null)


  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center relative">
      {/* Background glow */}
      <div
        className="absolute pointer-events-none -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(237, 75, 0, 0.10) 0%, rgba(0, 25, 218, 0.07) 40%, rgba(0, 25, 218, 0.02) 60%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      <div
        className="relative w-full max-w-[520px] lg:max-w-[560px] mx-auto cursor-pointer group"
        onClick={() => onVideoClick(videoSrc)}
      >
        {/* Laptop body */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            border: "2px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.20), 0 10px 25px rgba(0,0,0,0.12), 0 3px 8px rgba(0,0,0,0.08)",
          }}
        >
          {/* Top bar (browser chrome) */}
          <div
            className="flex items-center gap-1 px-2.5 py-1.5"
            style={{ background: "#1E1E1E" }}
          >
            <div className="w-[7px] h-[7px] rounded-full" style={{ background: "#FF5F57" }} />
            <div className="w-[7px] h-[7px] rounded-full" style={{ background: "#FEBC2E" }} />
            <div className="w-[7px] h-[7px] rounded-full" style={{ background: "#28C840" }} />
            <div
              className="flex-1 mx-6 h-3.5 rounded-sm"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
          </div>

          {/* Screen with video */}
          <div className="relative overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
            <video
              ref={videoRef}
              src={videoSrc}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Hover overlay + play button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
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
                    boxShadow:
                      "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                    <path d="M8 5.14v13.72a1 1 0 001.5.86l11.25-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop base */}
        <div
          className="mx-auto h-3 rounded-b-xl"
          style={{
            width: "60%",
            background: "linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 100%)",
            borderLeft: "2px solid rgba(255,255,255,0.06)",
            borderRight: "2px solid rgba(255,255,255,0.06)",
            borderBottom: "2px solid rgba(255,255,255,0.06)",
          }}
        />
      </div>
    </div>
  )
}
