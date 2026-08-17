import logo from "@/assets/kreads-logo.png";
import { Facebook, Instagram, MapPin } from "lucide-react";

const navLinks = [
  { id: "methode", label: "Méthode" },
  { id: "livrables", label: "Livrables" },
  { id: "confiance", label: "Ils nous font confiance" },
  { id: "realisations", label: "Réalisations" },
  { id: "packs", label: "Packs" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

function TikTokIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9.37a8.16 8.16 0 0 0 4.91 1.62V7.55a4.85 4.85 0 0 1-1-.86z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="scene relative border-t border-border/40 bg-background px-6 py-14">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--gradient-brand)" }}
      />
      <span
        aria-hidden="true"
        className="halo left-1/2 -bottom-40 size-[420px] -translate-x-1/2"
        style={{ background: "oklch(0.7725 0.1428 177.43 / 0.12)" }}
      />

      <div className="mx-auto max-w-6xl space-y-10">
        {/* Top Footer Section */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Preloader Logo & Location */}
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <a href="#hero" className="inline-block transition-transform duration-300 hover:scale-105">
              <img
                src={logo}
                alt="KREADS"
                className="h-16 w-auto object-contain sm:h-20"
              />
            </a>
            <p className="max-w-xs text-sm text-muted-foreground">
              Studio de créatives publicitaires qui vendent.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary shrink-0" />
              <span>Ange Raphael, fin barrière ESSEC</span>
            </div>
          </div>

          {/* Navigation Links (Aligned Vertically) */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </span>
            <nav aria-label="Navigation footer" className="flex flex-col items-center gap-2.5 text-sm text-muted-foreground md:items-start">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="transition-colors duration-300 hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-border/40" />

        {/* Bottom Footer Section */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Social Network Icons */}
          <nav aria-label="Réseaux sociaux" className="flex items-center gap-4 text-muted-foreground">
            <a
              href="https://www.facebook.com/share/17iATtAdNC/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-110"
            >
              <Facebook className="size-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-110"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-110"
            >
              <TikTokIcon className="size-5" />
            </a>
          </nav>

          {/* Legal info & Copyright */}
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground sm:items-end">
            <a href="#faq" className="transition-colors hover:text-primary">
              Mentions légales
            </a>
            <p>© {new Date().getFullYear()} KREADS. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

