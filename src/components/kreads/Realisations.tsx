import { useRef, useEffect } from "react";
import { BlurWords, Reveal } from "./motion-primitives";

/* ── Vidéos hébergées sur Cloudinary (CDN + optimisation auto) ── */
import {
  VID_FASHION_SPOT,
  VID_SPINNING_HOOK,
  VID_VELO_ACTION,
  VID_RASOIR_01,
  VID_LUNETTES_SPOT,
  VID_FITNESS_HOOK,
  VID_MODE_STORYTELLING,
} from "@/lib/cloudinary-videos";

const CLOUD_NAME = "mn6mspfb";

/**
 * Génère l'URL d'une thumbnail Cloudinary à partir de l'ID public de la vidéo.
 * On demande le frame 0 en JPEG optimisé — chargement quasi-instantané.
 */
function cloudinaryPoster(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto,f_jpg,so_0/${publicId}.jpg`;
}

type Work = {
  title: string;
  tag: string;
  src: string;
  publicId: string;
};

const works: Work[] = [
  { title: "Vêtement — Spot fashion",        tag: "Fashion",          src: VID_FASHION_SPOT,       publicId: "kreads/fashion-spot" },
  { title: "Vélo — Spinning hook",            tag: "Sport",            src: VID_SPINNING_HOOK,      publicId: "kreads/spinning-hook" },
  { title: "Vélo — Produit en action",        tag: "Performance",      src: VID_VELO_ACTION,        publicId: "kreads/velo-action" },
  { title: "Rasoir — Spot produit 01",        tag: "Publicité produit", src: VID_RASOIR_01,         publicId: "kreads/rasoir-01" },
  { title: "Lunettes — Spot publicitaire",    tag: "Brand",            src: VID_LUNETTES_SPOT,      publicId: "kreads/lunettes-spot" },
  { title: "Fitness — Hook 3 secondes",       tag: "UGC",              src: VID_FITNESS_HOOK,       publicId: "kreads/fitness-hook" },
  { title: "Mode — Storytelling produit",     tag: "Brand",            src: VID_MODE_STORYTELLING,  publicId: "kreads/mode-storytelling" },
];

/* ─────────────────────────────────────────────────────────────
   Carte vidéo — lecture auto dès l'entrée dans le viewport
   • poster        → thumbnail Cloudinary (frame 0) chargée en JPEG
                     léger pour un affichage quasi-instantané
   • preload="metadata" → première frame + durée sans tout télécharger
   • IntersectionObserver → play/pause selon visibilité
   • loop + muted  → lecture silencieuse en boucle
───────────────────────────────────────────────────────────────*/
function Card({ work }: { work: Work }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          video.play().catch(() => { /* autoplay bloqué silencieusement */ });
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const poster = cloudinaryPoster(work.publicId);

  return (
    <figure className="reel-card group">
      <video
        ref={videoRef}
        className="reel-video"
        src={work.src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"   /* charge la 1ʳᵉ frame + métadonnées sans tout télécharger */
      />

      {/* Vignette */}
      <span
        aria-hidden="true"
        className="reel-vignette"
      />

      {/* Légende */}
      <figcaption className="reel-caption">
        <span className="reel-tag">{work.tag}</span>
        <p className="reel-title">{work.title}</p>
      </figcaption>
    </figure>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section Nos Réalisations
───────────────────────────────────────────────────────────────*/
export function Realisations() {
  return (
    <>
      <style>{`
        /* ── Carousel de réalisations ── */
        .realisations-marquee-wrapper {
          overflow: hidden;
          margin-top: 3.5rem;
          position: relative;
          display: flex;
          align-items: center;
          width: 100vw;
          margin-left: 50%;
          transform: translateX(-50%);
        }

        .realisations-marquee-track {
          display: flex;
          gap: 1.25rem;
          padding: 0 1rem;
          animation: realisations-scroll-rtl 40s linear infinite;
          will-change: transform;
        }

        .realisations-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes realisations-scroll-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Carte ── */
        .reel-card {
          flex-shrink: 0;
          width: clamp(220px, 70vw, 280px);
          position: relative;
          aspect-ratio: 9 / 16;
          border-radius: 1.25rem;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid oklch(1 0 0 / 0.08);
          box-shadow: 0 8px 32px oklch(0 0 0 / 0.45);
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.35s ease;
          background: oklch(0.13 0.03 285);
        }

        .reel-card:hover {
          transform: scale(1.04) translateY(-4px);
          box-shadow: 0 20px 60px oklch(0 0 0 / 0.6),
                      0 0 0 1px oklch(0.77 0.14 177 / 0.4);
          z-index: 10;
        }

        /* ── Vidéo ── */
        .reel-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── Vignette dégradée ── */
        .reel-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            oklch(0 0 0 / 0.75) 0%,
            oklch(0 0 0 / 0.2) 45%,
            transparent 70%
          );
          pointer-events: none;
        }

        /* ── Légende ── */
        .reel-caption {
          position: absolute;
          inset-x: 0;
          bottom: 0;
          padding: 1rem 1rem 0.85rem;
          text-align: left;
        }

        .reel-tag {
          display: inline-block;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: oklch(0.77 0.14 177);
          background: oklch(0 0 0 / 0.45);
          backdrop-filter: blur(6px);
          padding: 0.2rem 0.55rem;
          border-radius: 99px;
          border: 1px solid oklch(0.77 0.14 177 / 0.3);
        }

        .reel-title {
          margin-top: 0.5rem;
          font-size: 0.82rem;
          font-weight: 600;
          line-height: 1.35;
          color: oklch(0.97 0 0);
        }
      `}</style>

      <section id="realisations" className="scene bg-background py-24" style={{ overflow: "hidden" }}>
        <div className="relative px-6">
          <span
            aria-hidden="true"
            className="halo right-0 top-1/4 size-[420px]"
            style={{ background: "oklch(0.5489 0.2341 285.4 / 0.24)" }}
          />

          <div className="mx-auto max-w-6xl text-center">
            <BlurWords
              as="h2"
              text="Nos Réalisations"
              highlight={["Réalisations"]}
              className="text-[clamp(1.6rem,4.2vw,3.6rem)] font-bold"
            />
            <Reveal delay={0.2} className="mx-auto mt-6 max-w-2xl">
              <p className="text-muted-foreground">
                Une sélection de créatives publicitaires conçues autour d'un angle marketing précis :
                hook, promesse, preuve, passage à l'action.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Carousel infini — 7 vidéos en lecture auto */}
        <div className="realisations-marquee-wrapper">
          <div className="realisations-marquee-track">
            {/* Dupliquer pour l'effet infini */}
            {[...works, ...works].map((work, i) => (
              <Card key={`${work.title}-${i}`} work={work} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
