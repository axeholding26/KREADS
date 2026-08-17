import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Button that drifts toward the cursor, with gradient fill + turquoise glow. */
export function MagneticButton({
  children,
  variant = "solid",
  href = "#packs",
  size = "md",
  className,
  pulse = false,
  target,
  rel,
}: {
  children: ReactNode;
  variant?: "solid" | "outline";
  href?: string;
  size?: "md" | "lg";
  className?: string;
  pulse?: boolean;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-[box-shadow,color] duration-500",
        size === "lg" ? "px-10 py-5 text-lg" : "px-7 py-3.5 text-base",
        variant === "solid"
          ? "text-primary-foreground shadow-[var(--shadow-glow)]"
          : "border border-primary/60 text-foreground hover:shadow-[var(--shadow-glow)]",
        pulse && "pulse-cta",
        className,
      )}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 400ms var(--ease-signature)",
        background: variant === "solid" ? "var(--gradient-brand)" : "transparent",
      }}
      onPointerMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setOffset({
          x: ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 14,
          y: ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 14,
        });
      }}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {variant === "outline" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 bg-foreground/10 transition-transform duration-500 group-hover:scale-x-100"
          style={{ transitionTimingFunction: "var(--ease-signature)" }}
        />
      )}
      {variant === "solid" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(100deg, var(--violet-glow), var(--primary-light))",
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </a>
  );
}

/** 3D tilt + internal cursor glow. Disabled on coarse pointers. */
export function TiltCard({
  children,
  className,
  max = 8,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  return (
    <div
      ref={ref}
      data-cursor-hover
      className={cn("relative rounded-2xl", className)}
      style={{
        transform: `perspective(1000px) rotateX(${style.rx}deg) rotateY(${style.ry}deg)`,
        transition: "transform 500ms var(--ease-signature)",
        transformStyle: "preserve-3d",
      }}
      onPointerMove={(e) => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        setStyle({
          rx: -(py - 0.5) * 2 * max,
          ry: (px - 0.5) * 2 * max,
          gx: px * 100,
          gy: py * 100,
          on: true,
        });
      }}
      onPointerLeave={() => setStyle({ rx: 0, ry: 0, gx: 50, gy: 50, on: false })}
    >
      {glow && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            opacity: style.on ? 1 : 0,
            background: `radial-gradient(300px circle at ${style.gx}% ${style.gy}%, oklch(0.7725 0.1428 177.43 / 0.16), transparent 70%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
