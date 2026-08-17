import { ParticleSphere } from "./ParticleSphere";
import { BlurWords, Reveal } from "./motion-primitives";
import { MagneticButton } from "./interactive";

export function FinalCta() {
  return (
    <section
      id="contact"
      className="scene flex min-h-[90vh] flex-col items-center justify-center px-6 py-28 text-center"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 scale-110 opacity-70">
        <ParticleSphere count={800} />
      </div>
      <span
        aria-hidden="true"
        className="halo left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "oklch(0.3077 0.1223 293.38 / 0.55)" }}
      />

<h2 className="mx-auto max-w-4xl text-[clamp(1.6rem,4.2vw,3.6rem)] font-bold">
        <BlurWords text="Votre produit" />{" "}
        <span className="text-sheen italic">mérite mieux</span>{" "}
        <BlurWords text="qu'une publicité créée au hasard." delay={0.2} />
      </h2>

      <Reveal delay={0.5} className="mt-8 max-w-xl">
        <p className="text-lg text-muted-foreground">
          Découvrez les angles qui peuvent réellement faire la différence.
        </p>
      </Reveal>

      <Reveal delay={0.7} className="mt-12">
        <MagneticButton href="https://wa.me/237670042210?text=Bonjour/Bonsoir%2C%20je%20souhaite%20r%C3%A9server%20un%20audit%20gratuit." target="_blank" rel="noopener noreferrer" size="lg" pulse>
          Réserver un échange gratuit
        </MagneticButton>
      </Reveal>
    </section>
  );
}
