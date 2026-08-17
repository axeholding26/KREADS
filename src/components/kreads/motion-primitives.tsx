import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Word-by-word blur + rise reveal (hero language). */
export function BlurWords({
  text,
  className,
  highlight = [],
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  /** words rendered in turquoise italic */
  highlight?: string[];
  delay?: number;
  as?: "span" | "h1" | "h2";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");
  const normalize = (w: string) => w.replace(/[.,:?!»«]/g, "").toLowerCase();

  return (
    <Tag ref={ref as never} className={cn("inline-block", className)}>
      {words.map((word, i) => {
        const isHighlight = highlight.some((h) => normalize(word) === normalize(h));
        return (
          <motion.span
            key={`${word}-${i}`}
            className={cn(
              "inline-block whitespace-pre",
              isHighlight && "italic text-primary",
            )}
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 60, filter: "blur(12px)" }
            }
            transition={{ duration: 1, ease: EASE, delay: delay + i * 0.06 }}
          >
            {word}{" "}
          </motion.span>
        );
      })}
    </Tag>
  );
}

/** Mask reveal (translate + blur) for blocks. */
export function Reveal({
  children,
  delay = 0,
  x = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60, x, filter: "blur(8px)", scale: 0.98 }}
      animate={
        inView
          ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)", scale: 1 }
          : { opacity: 0, y: 60, x, filter: "blur(8px)", scale: 0.98 }
      }
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Number counter that runs when scrolled into view. */
export function Counter({
  to,
  suffix = "",
  duration = 2.5,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums font-semibold", className)}>
      {value.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}
