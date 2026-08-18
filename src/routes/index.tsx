import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

import { Preloader } from "@/components/kreads/Preloader";
import { CustomCursor } from "@/components/kreads/CustomCursor";
import { Hero } from "@/components/kreads/Hero";
import { Problem } from "@/components/kreads/Problem";
import { Method } from "@/components/kreads/Method";
import { Deliverables } from "@/components/kreads/Deliverables";
import { Packs } from "@/components/kreads/Packs";
import { WhyKreads } from "@/components/kreads/WhyKreads";
import { Faq } from "@/components/kreads/Faq";
import { FinalCta } from "@/components/kreads/FinalCta";
import { Footer } from "@/components/kreads/Footer";
import { Trust } from "@/components/kreads/Trust";
import { Realisations } from "@/components/kreads/Realisations";

import homeLogo from "@/assets/kreads-home-logo.png";

const TITLE = "KREADS — Studio de créatives publicitaires qui vendent";
const DESCRIPTION =
  "KREADS identifie les meilleurs angles marketing pour transformer vos produits en campagnes publicitaires qui captent l'attention et génèrent des ventes.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const sections = [
  { id: "hero", label: "Studio" },
  { id: "probleme", label: "Le problème" },
  { id: "methode", label: "Notre méthode" },
  { id: "livrables", label: "Ce que vous recevez" },
  { id: "confiance", label: "Ils nous font confiance" },
  { id: "realisations", label: "Nos réalisations" },
  { id: "packs", label: "Packs" },
  { id: "pourquoi", label: "Pourquoi KREADS" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const navItems = [
  { id: "methode", label: "Méthode" },
  { id: "livrables", label: "Livrables" },
  { id: "confiance", label: "Ils nous font confiance" },
  { id: "realisations", label: "Réalisations" },
  { id: "packs", label: "Packs" },
  { id: "faq", label: "FAQ" },
];

function Index() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <span className="grain" aria-hidden="true" />

      <motion.span
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
        style={{ scaleX: progress, background: "var(--gradient-brand)" }}
      />

<header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 py-4 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
          <a
            href="#hero"
            className="flex items-center"
          >
            <img
              src={homeLogo}
              alt="KREADS"
              className="h-12 w-auto object-contain md:h-14"
            />
          </a>

          <nav aria-label="Navigation principale" className="flex items-center gap-6">
            <ul className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
              {navItems.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="transition-colors duration-300 hover:text-foreground"
                    style={{ color: active === s.id ? "var(--primary)" : undefined }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/237670042210?text=Bonjour/Bonsoir%2C%20je%20souhaite%20r%C3%A9server%20un%20audit%20gratuit."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 rounded-full border border-primary/50 px-5 py-2 text-sm transition-colors duration-500 hover:bg-primary/10 lg:inline-block"
            >
              Réserver un audit
            </a>
            <button
              type="button"
              aria-label="Ouvrir la navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border/60 text-foreground lg:hidden"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile navigation dropdown */}
      {menuOpen && (
        <div className="fixed inset-x-0 top-[64px] z-40 border-b border-border/60 bg-background/95 backdrop-blur-xl lg:hidden">
          <nav aria-label="Navigation mobile" className="mx-auto max-w-6xl px-6 py-4">
            <ul className="flex flex-col gap-1">
              {navItems.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    style={{ color: active === s.id ? "var(--primary)" : undefined }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/237670042210?text=Bonjour/Bonsoir%2C%20je%20souhaite%20r%C3%A9server%20un%20audit%20gratuit."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-3 block rounded-full border border-primary/50 px-5 py-2.5 text-center text-sm transition-colors duration-500 hover:bg-primary/10"
            >
              Réserver un audit
            </a>
          </nav>
        </div>
      )}

      {/* Section progress indicators */}
      <nav
        aria-label="Progression des sections"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3 text-xs text-muted-foreground"
          >
            <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {s.label}
            </span>
            <span
              aria-hidden="true"
              className="h-px transition-all duration-500"
              style={{
                width: active === s.id ? 32 : 14,
                background: active === s.id ? "var(--primary)" : "var(--muted-foreground)",
              }}
            />
            <span className="sr-only">{s.label}</span>
          </a>
        ))}
      </nav>

      <main>
        <Hero />
        <Problem />
        <Method />
        <Deliverables />
        <Trust />
        <Realisations />
        <Packs />
        <WhyKreads />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
