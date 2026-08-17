import { BlurWords, Reveal } from "./motion-primitives";

const items = [
  "Analyse stratégique",
  "Recherche d'angles marketing",
  "Créatives publicitaires",
  "Recommandations de croissance",
  "Dossier stratégique personnalisé",
];

export function Deliverables() {
  return (
    <section id="livrables" className="scene bg-background px-6 py-28">
      <span
        aria-hidden="true"
        className="halo left-0 top-1/3 size-[420px]"
        style={{ background: "oklch(0.5489 0.2341 285.4 / 0.28)" }}
      />
      <div className="mx-auto max-w-5xl">
        <BlurWords
          as="h2"
          text="Plus qu'une vidéo publicitaire : une stratégie de vente"
          highlight={["stratégie", "vente"]}
          className="mx-auto text-center text-[clamp(1.6rem,4.2vw,3.6rem)] font-bold md:mx-0 md:text-left"
        />

        <p className="mt-8 text-center text-sm uppercase tracking-[0.3em] text-muted-foreground md:text-left">
          Chaque projet inclut
        </p>

        <ul className="mt-10 border-t border-border">
          {items.map((item, i) => (
            <Reveal key={item} delay={i * 0.12}>
              <li className="group relative flex items-center gap-6 border-b border-border py-7 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-primary">
                <span
                  aria-hidden="true"
                  className="relative grid size-8 shrink-0 place-items-center rounded-md border border-primary/70 transition-colors duration-500 group-hover:bg-primary/10"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="var(--primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="24"
                      strokeDashoffset="0"
                    />
                  </svg>
                </span>
                <span className="relative text-[clamp(1.4rem,3.4vw,3.2rem)] font-medium leading-tight">
                  {item}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-40"
                    style={{ background: "var(--gradient-brand)" }}
                  />
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
