import { useEffect, useRef, useState } from "react";

/** Point + trailing turquoise halo cursor. Desktop / fine-pointer only. */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let hx = mx;
    let hy = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("pointermove", onMove);

    const loop = () => {
      hx += (mx - hx) * 0.12;
      hy += (my - hy) * 0.12;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (halo.current) halo.current.style.transform = `translate3d(${hx}px, ${hy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={dot}
        className="absolute -ml-[3px] -mt-[3px] size-[6px] rounded-full bg-foreground mix-blend-difference"
      />
      <div
        ref={halo}
        className="absolute rounded-full transition-[width,height,margin,opacity] duration-300"
        style={{
          width: active ? 64 : 32,
          height: active ? 64 : 32,
          marginLeft: active ? -32 : -16,
          marginTop: active ? -32 : -16,
          background: active
            ? "var(--gradient-brand)"
            : "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          opacity: active ? 0.35 : 0.5,
          filter: active ? "blur(6px)" : "blur(4px)",
        }}
      />
    </div>
  );
}
