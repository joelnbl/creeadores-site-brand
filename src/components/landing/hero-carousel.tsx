"use client"

const CREATOR_ASSET_BASE = (process.env.NEXT_PUBLIC_CREATOR_ASSET_BASE ?? "https://creeadores-site-creator.vercel.app").replace(/\/$/, "")

const VIDEOS = [
  `${CREATOR_ASSET_BASE}/videos/audoor-molinete.mp4`,
  `${CREATOR_ASSET_BASE}/videos/clean-it-ugc.mp4`,
  `${CREATOR_ASSET_BASE}/videos/conociendo-clasica.mp4`,
  `${CREATOR_ASSET_BASE}/videos/la-clasica-calle.mp4`,
  `${CREATOR_ASSET_BASE}/videos/lamode-cartera.mp4`,
  `${CREATOR_ASSET_BASE}/videos/marroquineria-50.mp4`,
  `${CREATOR_ASSET_BASE}/videos/marroquineria-errores.mp4`,
  `${CREATOR_ASSET_BASE}/videos/neko-sushi.mp4`,
  `${CREATOR_ASSET_BASE}/videos/ugc-reservas.mp4`,
]

export function HeroCarousel({ onVideoClick }: { onVideoClick?: (src: string) => void }) {
  const phones = [...VIDEOS, ...VIDEOS, ...VIDEOS, ...VIDEOS]

  return (
    <div className="w-full overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />

      <div
        className="flex gap-4 sm:gap-5"
        style={{ width: "max-content", animation: "marquee-horizontal 120s linear infinite" }}
      >
        {phones.map((src, i) => (
          <div key={i} className="flex-shrink-0">
            <PhoneMockup videoSrc={src} onClick={() => onVideoClick?.(src)} />
          </div>
        ))}
      </div>
    </div>
  )
}

function PhoneMockup({ videoSrc, onClick }: { videoSrc: string; onClick?: () => void }) {
  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      onClick={onClick}
      style={{
        width: "clamp(130px, 16vw, 180px)",
        height: "clamp(280px, 35vw, 390px)",
        border: "2px solid #2c2c2e",
        borderRadius: "clamp(18px, 3vw, 30px)",
        background: "#2c2c2e",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4), 0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div
        className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20"
        style={{
          width: "clamp(20px, 3vw, 40px)",
          height: "clamp(5px, 1vw, 10px)",
          backgroundColor: "#2c2c2e",
          borderRadius: "10px",
        }}
      />

      <div
        className="absolute inset-[3px] overflow-hidden"
        style={{ borderRadius: "clamp(15px, 2.7vw, 28px)" }}
      >
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)", backdropFilter: "blur(8px)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
              <path d="M8 5.14v13.72a1 1 0 001.5.86l11.25-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

