import { useRef, useEffect } from "react";
import { BlurWords, Reveal } from "./motion-primitives";
import { MagneticButton } from "./interactive";

/* ── Vidéos hébergées sur Cloudinary (CDN + optimisation auto) ── */
import {
  VID_FASHION_SPOT,
  VID_SPINNING_HOOK,
  VID_VELO_ACTION,
  VID_RASOIR_01,
  VID_LUNETTES_SPOT,
} from "@/lib/cloudinary-videos";

/** Les 5 vidéos du carousel Hero (depuis Cloudinary) */
const HERO_VIDEOS = [
  VID_FASHION_SPOT,
  VID_SPINNING_HOOK,
  VID_VELO_ACTION,
  VID_RASOIR_01,
  VID_LUNETTES_SPOT,
];

const CLOUD_NAME = "mn6mspfb";

/**
 * Public IDs Cloudinary correspondant aux 5 vidéos Hero
 * (utilisés pour générer les posters JPEG — affichage instantané)
 */
const HERO_PUBLIC_IDS = [
  "kreads/fashion-spot",
  "kreads/spinning-hook",
  "kreads/velo-action",
  "kreads/rasoir-01",
  "kreads/lunettes-spot",
];

/**
 * Génère l'URL de la thumbnail Cloudinary (frame 0 en JPEG léger).
 * Permet un affichage quasi-instantané avant que la vidéo soit prête.
 */
function cloudinaryPoster(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto,f_jpg,so_0/${publicId}.jpg`;
}

/* ─────────────────────────────────────────────────────────────
   VideoTile — lecture auto dès que la tuile est visible
   • poster         → thumbnail Cloudinary (JPEG frame 0) instantanée
   • preload="metadata" → 1ʳᵉ frame + durée chargées sans tout dl
   • IntersectionObserver → play/pause selon visibilité
───────────────────────────────────────────────────────────────*/
function VideoTile({ index, src }: { index: number; src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {/* autoplay bloqué silencieusement */});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const hueShift = [0, 20, -15, 35][index] ?? 0;
  const poster = cloudinaryPoster(HERO_PUBLIC_IDS[index % HERO_PUBLIC_IDS.length]);

  return (
    <div
      className="hero-video-tile"
      style={{ "--hue": `${hueShift}deg` } as React.CSSProperties}
    >
      <div className="hero-video-border" />
      <span className="hero-video-label">0{index + 1}</span>

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"     /* charge 1ʳᵉ frame + durée sans tout télécharger */
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />

      <div className="hero-video-vignette" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VideoCarousel — 4 blocs qui défilent de droite à gauche en boucle
───────────────────────────────────────────────────────────────*/
const VIDEO_COUNT = 5;

function VideoCarousel() {
  const tiles = Array.from({ length: VIDEO_COUNT * 2 });

  return (
    <div
      aria-hidden="true"
      className="hero-carousel-wrapper"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="hero-carousel-track">
        {tiles.map((_, i) => (
          <VideoTile key={i} index={i % VIDEO_COUNT} src={HERO_VIDEOS[i % HERO_VIDEOS.length]!} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Fond cosmique
───────────────────────────────────────────────────────────────*/
function CosmicBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -2,
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 120% 80% at 60% 40%, oklch(0.18 0.06 285) 0%, oklch(0.11 0.026 294) 55%, oklch(0.07 0.015 295) 100%)",
      }}
    >
      {/* Halo turquoise gauche */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "-8%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.77 0.14 177 / 0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "hero-halo-drift 12s ease-in-out infinite alternate",
        }}
      />
      {/* Halo violet droite */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.55 0.23 285 / 0.22) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "hero-halo-drift 16s ease-in-out infinite alternate-reverse",
        }}
      />
      {/* Micro-étoiles SVG */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 80 }).map((_, i) => {
          const cx = ((i * 137.508) % 100).toFixed(2);
          const cy = ((i * 97.321 + 13) % 100).toFixed(2);
          const r = (0.3 + (i % 5) * 0.18).toFixed(2);
          const op = (0.25 + (i % 4) * 0.18).toFixed(2);
          return (
            <circle
              key={i}
              cx={`${cx}%`}
              cy={`${cy}%`}
              r={r}
              fill="white"
              opacity={op}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Composant principal Hero
───────────────────────────────────────────────────────────────*/
export function Hero() {
  return (
    <>
      <style>{`
        /* ── Carousel track ── */
        .hero-carousel-wrapper {
          pointer-events: none;
        }

        .hero-carousel-track {
          display: flex;
          align-items: center;
          gap: 2rem;
          animation: hero-scroll-rtl 28s linear infinite;
          will-change: transform;
        }

        @keyframes hero-scroll-rtl {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Tuile vidéo ── */
        .hero-video-tile {
          position: relative;
          flex-shrink: 0;
          width: clamp(240px, 28vw, 420px);
          aspect-ratio: 9 / 16;
          border-radius: 1.5rem;
          overflow: hidden;
          filter: hue-rotate(var(--hue, 0deg));
          box-shadow:
            0 0 0 1px oklch(1 0 0 / 0.08),
            0 20px 60px -15px oklch(0 0 0 / 0.7),
            0 0 30px -5px oklch(0.77 0.14 177 / 0.15);
          transform: perspective(900px) rotateY(-4deg) rotateX(2deg);
          transition: transform 0.5s ease;
        }

        .hero-video-tile:hover {
          transform: perspective(900px) rotateY(0deg) rotateX(0deg) scale(1.02);
        }

        /* Bordure animée */
        .hero-video-border {
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          border: 1px solid oklch(0.77 0.14 177 / 0.35);
          z-index: 2;
          pointer-events: none;
        }

        /* Numéro */
        .hero-video-label {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 3;
          font-size: 0.65rem;
          font-family: var(--font-display);
          font-weight: 700;
          letter-spacing: 0.15em;
          color: oklch(0.77 0.14 177 / 0.85);
          background: oklch(0 0 0 / 0.4);
          backdrop-filter: blur(6px);
          padding: 0.25rem 0.5rem;
          border-radius: 99px;
          border: 1px solid oklch(0.77 0.14 177 / 0.25);
        }

        /* Vignette */
        .hero-video-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(
            ellipse 80% 80% at 50% 50%,
            transparent 40%,
            oklch(0 0 0 / 0.55) 100%
          );
          pointer-events: none;
        }

        /* ── Halo drift ── */
        @keyframes hero-halo-drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(3%, 4%) scale(1.08); }
        }

        /* ── Overlay fondu gauche / droite ── */
        .hero-carousel-fade-left,
        .hero-carousel-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 15vw;
          pointer-events: none;
          z-index: 1;
        }
        .hero-carousel-fade-left {
          left: 0;
          background: linear-gradient(to right, var(--background) 0%, transparent 100%);
        }
        .hero-carousel-fade-right {
          right: 0;
          background: linear-gradient(to left, var(--background) 0%, transparent 100%);
        }

        /* ── Overlay global pour lisibilité du texte ── */
        .hero-text-overlay {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(
            to right,
            oklch(0.11 0.026 294 / 0.85) 0%,
            oklch(0.11 0.026 294 / 0.45) 55%,
            transparent 100%
          );
          pointer-events: none;
        }
      `}</style>

      <section
        id="hero"
        className="scene flex min-h-screen flex-col justify-center px-6 pt-24 pb-16"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* Fond cosmique */}
        <CosmicBackground />

        {/* Carousel vidéo */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}
        >
          <VideoCarousel />
          {/* Fondu gauche / droite */}
          <div className="hero-carousel-fade-left" />
          <div className="hero-carousel-fade-right" />
          {/* Overlay texte */}
          <div className="hero-text-overlay" />
        </div>

        {/* Contenu texte */}
        <div
          className="mx-auto w-full max-w-6xl"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="flex w-full flex-col items-center text-center md:items-start md:text-left">
            <BlurWords
              as="h1"
              text="Vos publicités ne manquent pas de budget. Elles manquent d'une meilleure stratégie créative."
              highlight={["budget.", "stratégie", "créative."]}
              className="text-[clamp(1.6rem,4.2vw,3.6rem)] font-bold"
            />

            <Reveal delay={0.5} className="mt-10 max-w-2xl">
              <p className="text-lg text-muted-foreground">
                Chez KREADS, nous identifions les meilleurs angles marketing pour transformer vos
                produits en campagnes publicitaires qui captent l'attention et génèrent des ventes.
              </p>
            </Reveal>

            <Reveal delay={0.75} className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <MagneticButton href="#packs">Découvrir nos packs</MagneticButton>
              <MagneticButton href="https://wa.me/237670042210?text=Bonjour/Bonsoir%2C%20je%20souhaite%20r%C3%A9server%20un%20audit%20gratuit." variant="outline" target="_blank" rel="noopener noreferrer">
                Réserver un audit
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
