import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { BlurWords, Reveal } from "./motion-primitives";

const faq = [
  {
    q: "Pourquoi produire plusieurs vidéos ?",
    a: "Parce qu'il est rare qu'un seul angle soit le meilleur dès le départ.",
  },
  {
    q: "Pourquoi inclure une analyse stratégique ?",
    a: "Parce qu'une bonne publicité commence par une bonne compréhension du client.",
  },
  {
    q: "Travaillez-vous avec tous les secteurs ?",
    a: "Nous travaillons principalement avec les marques, e-commerçants et entreprises souhaitant améliorer leurs performances publicitaires.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scene bg-scene px-6 py-28">
      <span
        aria-hidden="true"
        className="halo left-0 top-1/4 size-[360px]"
        style={{ background: "oklch(0.7725 0.1428 177.43 / 0.14)" }}
      />
      <span
        aria-hidden="true"
        className="halo right-0 bottom-1/4 size-[360px]"
        style={{ background: "oklch(0.5489 0.2341 285.4 / 0.22)" }}
      />
      <div className="mx-auto max-w-[800px]">
        <BlurWords
          as="h2"
          text="Questions fréquentes"
className="text-center text-[clamp(1.6rem,4.2vw,3.6rem)] font-bold"
        />

        <div className="mt-16 divide-y divide-border border-y border-border">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.1} x={i % 2 === 0 ? -40 : 40}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="relative text-xl font-medium transition-colors duration-500 group-hover:text-primary sm:text-[1.75rem]">
                      {item.q}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 block h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                        style={{ background: "var(--gradient-brand)" }}
                      />
                    </span>
                    <Plus
                      aria-hidden="true"
                      className="size-6 shrink-0 text-primary transition-transform duration-400"
                      style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="relative overflow-hidden"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-1"
                        style={{ background: "var(--primary)", opacity: 0.15 }}
                      />
                      <p className="pb-7 pl-5 pr-10 text-lg text-muted-foreground">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
