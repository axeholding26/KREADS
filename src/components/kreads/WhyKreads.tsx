import { ParticleSphere } from "./ParticleSphere";
import { BlurWords, Reveal } from "./motion-primitives";

const marquee = ["ANGLE MARKETING", "HOOK", "STRATÉGIE", "CRÉATIVE", "TEST"];

export function WhyKreads() {
  return (
    <section id="pourquoi" className="scene bg-background py-28">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
<h2 className="mx-auto text-center text-[clamp(1.6rem,4.2vw,3.6rem)] font-bold md:mx-0 md:text-left">
            <BlurWords text="Nous ne créons pas des publicités. Nous construisons des" />{" "}
            <span className="text-sheen italic">arguments de vente.</span>
          </h2>
          <Reveal delay={0.2} className="mx-auto mt-8 max-w-xl text-center md:mx-0 md:text-left">
            <p className="text-lg text-muted-foreground">
              Beaucoup d'agences produisent du contenu. Nous commençons par comprendre pourquoi
              quelqu'un devrait acheter. C'est cette différence qui permet de créer des campagnes
              plus pertinentes et plus performantes.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal delay={0.1}>
            <div
              className="h-full rounded-2xl border border-border p-7 grayscale"
              style={{
                background: "oklch(0.1837 0.0303 289.16 / 0.7)",
                transform: "perspective(900px) rotateX(-6deg)",
              }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Agences classiques
              </p>
              <p className="mt-6 text-2xl font-medium text-muted-foreground">
                Produire du contenu, beaucoup de contenu.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Livrables jolis, arguments absents, performances aléatoires.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div
              className="scene h-full rounded-2xl p-7 shadow-[var(--shadow-glow)]"
              style={{
                background: "color-mix(in oklab, var(--violet) 28%, transparent)",
                border: "1px solid oklch(0.7725 0.1428 177.43 / 0.4)",
                transform: "perspective(900px) rotateX(6deg)",
              }}
            >
              <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
                <ParticleSphere count={380} speed={1.6} />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary">KREADS</p>
              <p className="mt-6 text-2xl font-medium">
                Comprendre pourquoi quelqu'un devrait acheter.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Angles testés, hooks pensés, créatives au service de la vente.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mt-24 flex overflow-hidden border-y border-border py-6"
      >
        <div className="marquee-track flex w-max shrink-0 gap-12 pr-12">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="font-display text-2xl font-medium uppercase tracking-wide transition-colors duration-300 sm:text-4xl"
              style={{
                color: i % 2 === 0 ? "var(--primary)" : "var(--violet-glow)",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
