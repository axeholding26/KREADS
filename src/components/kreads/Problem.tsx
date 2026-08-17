import { Crosshair, MessageSquareX, Layers, ShieldQuestion } from "lucide-react";
import { BlurWords, Counter, Reveal } from "./motion-primitives";
import { TiltCard } from "./interactive";

const problems = [
  { icon: Crosshair, title: "Mauvais angle marketing" },
  { icon: MessageSquareX, title: "Message peu convaincant" },
  { icon: Layers, title: "Créatives mal adaptées" },
  { icon: ShieldQuestion, title: "Objections non traitées" },
];

export function Problem() {
  return (
    <section id="probleme" className="scene bg-background px-6 py-28">
      <span
        aria-hidden="true"
        className="halo right-0 top-24 size-[420px]"
        style={{ background: "oklch(0.3077 0.1223 293.38 / 0.45)" }}
      />
      <div className="mx-auto max-w-6xl">
        <BlurWords
          as="h2"
          text="Pourquoi certaines publicités vendent pendant que d'autres brûlent simplement du budget ?"
          highlight={["brûlent"]}
          className="mx-auto max-w-4xl text-center text-[clamp(1.6rem,4.2vw,3.6rem)] font-bold md:mx-0 md:text-left"
        />

        <Reveal delay={0.15} className="mx-auto mt-8 max-w-2xl text-center md:mx-0 md:text-left">
          <p className="text-lg text-muted-foreground">
            La majorité des entreprises pensent que leurs résultats dépendent du budget
            publicitaire. En réalité, la différence se joue souvent avant même le lancement de la
            campagne.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.15} x={i % 2 === 0 ? -60 : 60}>
              <TiltCard className="glass-card group h-full rounded-2xl p-8">
                <p.icon
                  className="size-9 text-muted-foreground transition-colors duration-500 group-hover:text-primary"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                <h3 className="mt-6 text-2xl font-medium">{p.title}</h3>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-16">
          <div
            className="flex flex-col items-start justify-between gap-4 rounded-2xl px-8 py-7 sm:flex-row sm:items-center"
            style={{ background: "var(--gradient-brand)" }}
          >
            <p className="text-xl font-medium text-primary-foreground">
              Des campagnes qui coûtent cher et rapportent peu.
            </p>
            <p className="text-3xl font-semibold text-primary-foreground">
              <Counter to={70} suffix=" %" /> <span className="text-base font-normal">du budget gaspillé</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
