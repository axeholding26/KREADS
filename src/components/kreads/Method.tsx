import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BlurWords, Reveal } from "./motion-primitives";

const steps = [
  { n: "01", title: "Analyse", desc: "Analyse du produit et du marché." },
  {
    n: "02",
    title: "Écoute client",
    desc: "Identification des frustrations, désirs et objections des clients.",
  },
  { n: "03", title: "Angles", desc: "Sélection des angles marketing les plus prometteurs." },
  { n: "04", title: "Création", desc: "Création des créatives publicitaires." },
  { n: "05", title: "Croissance", desc: "Tests et recommandations de croissance." },
];

export function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 85%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="methode" className="scene bg-scene px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <BlurWords
          as="h2"
          text="Notre approche : comprendre avant de créer"
          highlight={["comprendre"]}
className="text-center text-[clamp(1.6rem,4.2vw,3.6rem)] font-bold"
        />

        <div ref={ref} className="relative mt-24">
          <div
            aria-hidden="true"
            className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2"
          >
            <motion.span
              className="absolute inset-x-0 top-0 block w-px"
              style={{ height, background: "var(--gradient-line)" }}
            />
          </div>

          <div className="space-y-20">
            {steps.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal
                  key={step.n}
                  x={left ? -80 : 80}
                  className={`relative pl-14 md:w-1/2 md:pl-0 ${
                    left ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-3 -ml-[5px] size-[10px] rounded-full bg-primary shadow-[var(--shadow-glow)] md:left-auto md:right-0 md:translate-x-1/2"
                    style={left ? undefined : { left: 0, right: "auto", transform: "translateX(-50%)" }}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-16 select-none font-display text-[8rem] font-bold leading-none transition-transform duration-700 md:text-[13rem]"
                    style={{
                      color: "oklch(0.3077 0.1223 293.38 / 0.32)",
                      [left ? "right" : "left"]: "1rem",
                    }}
                  >
                    {step.n}
                  </span>
                  <div className="group relative">
                    <h3 className="inline-block text-3xl font-medium md:text-4xl">
                      {step.title}
                      <span
                        aria-hidden="true"
                        className="block h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                        style={{ background: "var(--gradient-brand)" }}
                      />
                    </h3>
                    <p className="mt-3 text-lg text-muted-foreground">{step.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
