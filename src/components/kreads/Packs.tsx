import { Check } from "lucide-react";
import { BlurWords, Counter, Reveal } from "./motion-primitives";
import { MagneticButton, TiltCard } from "./interactive";

type Pack = {
  name: string;
  price: number;
  period?: string;
  pitch: string;
  groups: { label?: string; items: string[] }[];
  featured?: boolean;
  dim?: boolean;
};

const packs: Pack[] = [
  {
    name: "Starter",
    price: 21000,
    pitch: "Pour tester un produit ou une nouvelle offre.",
    dim: true,
    groups: [
      {
        items: [
          "3 vidéos publicitaires",
          "3 angles marketing distincts",
          "Recommandations créatives",
        ],
      },
    ],
  },
  {
    name: "Growth",
    price: 45000,
    pitch: "Pour accélérer les performances.",
    featured: true,
    groups: [
      {
        items: [
          "Analyse stratégique",
          "Carte de Croissance Produit",
          "3 vidéos publicitaires UGC IA",
          "3 angles marketing distincts",
          "3 créatives statiques",
          "Recommandations créatives",
        ],
      },
    ],
  },
  {
    name: "Scale",
    price: 200000,
    period: "par mois",
    pitch:
      "Pour les entreprises qui veulent améliorer continuellement leurs performances publicitaires.",
    groups: [
      {
        label: "Analyse mensuelle",
        items: ["Analyse du produit", "Analyse des performances", "Analyse des concurrents"],
      },
      {
        label: "Recherche créative",
        items: ["Nouveaux angles marketing", "Nouveaux hooks", "Nouvelles idées de créatives"],
      },
      {
        label: "Production créative par semaine",
        items: ["10 vidéos publicitaires", "6 créas statiques"],
      },
      {
        label: "Accompagnement",
        items: ["Recommandations hebdomadaires", "Ajustements créatifs"],
      },
      {
        label: "Livrable stratégique",
        items: ["Rapport d'opportunités", "Plan d'action mensuel"],
      },
    ],
  },
];

export function Packs() {
  return (
    <section id="packs" className="scene bg-scene px-6 py-28">
      <span
        aria-hidden="true"
        className="halo left-1/2 top-10 size-[560px] -translate-x-1/2"
        style={{ background: "oklch(0.3077 0.1223 293.38 / 0.5)" }}
      />
      <div className="mx-auto max-w-6xl">
        <BlurWords
          as="h2"
          text="Choisissez le pack adapté à votre ambition"
          highlight={["ambition"]}
className="text-center text-[clamp(1.6rem,4.2vw,3.6rem)] font-bold"
        />

        <div className="mt-20 grid items-start gap-8 lg:grid-cols-3">
          {packs.map((pack, i) => (
            <Reveal
              key={pack.name}
              delay={pack.featured ? 0 : 0.2 + i * 0.1}
              className={pack.featured ? "lg:-mt-10" : ""}
            >
              <TiltCard className="h-full">
                <div
                  className={`relative h-full overflow-hidden rounded-2xl p-8 ${
                    pack.dim ? "opacity-90" : ""
                  }`}
                  style={{
                    background: "color-mix(in oklab, var(--violet) 28%, transparent)",
                    backdropFilter: "blur(18px)",
                    border: pack.featured
                      ? "1px solid transparent"
                      : `1px solid ${pack.dim ? "oklch(0.3077 0.1223 293.38 / 0.55)" : "oklch(0.3077 0.1223 293.38 / 0.9)"}`,
                  }}
                >
                  {pack.featured && (
                    <>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-[120%] -z-10"
                        style={{
                          background:
                            "conic-gradient(from 0deg, var(--primary), var(--violet-glow), var(--primary))",
                          animation: "kreads-spin-border 6s linear infinite",
                        }}
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-px -z-10 rounded-2xl bg-scene"
                      />
                      <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                        Populaire
                      </span>
                    </>
                  )}

                  <h3 className="font-display text-2xl font-medium">Pack {pack.name}</h3>
                  <p className="mt-6 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-none">
                    <Counter to={pack.price} duration={1.8} />
                    <span className="ml-2 text-lg font-normal text-muted-foreground">FCFA</span>
                  </p>
                  {pack.period && (
                    <p className="mt-1 text-sm text-muted-foreground">{pack.period}</p>
                  )}
                  <p className="mt-5 text-muted-foreground">{pack.pitch}</p>

                  <div className="mt-8 space-y-6">
                    {pack.groups.map((group, gi) => (
                      <div key={group.label ?? gi}>
                        {group.label && (
                          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">
                            {group.label}
                          </p>
                        )}
                        <ul className="space-y-2.5">
                          {group.items.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm">
                              <Check
                                className="mt-0.5 size-4 shrink-0 text-primary"
                                strokeWidth={1.6}
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <MagneticButton 
                      href={`https://wa.me/237670042210?text=${encodeURIComponent(`Bonjour/Bonsoir, je souhaite lancer mon projet avec le Pack ${pack.name}`)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full"
                    >
                      Je lance mon projet
                    </MagneticButton>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
