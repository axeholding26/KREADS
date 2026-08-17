import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** density multiplier */
  count?: number;
  speed?: number;
};

/**
 * Generative particle sphere (canvas 2D projection).
 * Lightweight replacement for a WebGL sphere: turquoise -> violet gradient,
 * continuous slow rotation, pointer parallax with delay. Disabled/simplified
 * on small screens and for reduced-motion users.
 */
export function ParticleSphere({ className, count = 900, speed = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;
    const total = isSmall ? Math.round(count * 0.45) : count;

    const points: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < total; i++) {
      const t = (i + 0.5) / total;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      points.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      });
    }

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let pointer = { x: 0, y: 0 };
    let parallax = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      pointer = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    if (!isSmall) window.addEventListener("pointermove", onMove);

    let raf = 0;
    let angle = 0;
    const draw = () => {
      angle += 0.0016 * speed;
      parallax.x += (pointer.x * 40 - parallax.x) * 0.045;
      parallax.y += (pointer.y * 40 - parallax.y) * 0.045;

      ctx.clearRect(0, 0, w, h);
      const radius = Math.min(w, h) * 0.36;
      const cx = w / 2 + parallax.x;
      const cy = h / 2 + parallax.y;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const tilt = 0.42;

      for (const p of points) {
        // rotate around Y then tilt around X
        const x1 = p.x * cos - p.z * sin;
        const z1 = p.x * sin + p.z * cos;
        const y1 = p.y * Math.cos(tilt) - z1 * Math.sin(tilt);
        const z2 = p.y * Math.sin(tilt) + z1 * Math.cos(tilt);

        const persp = 1 / (2.2 - z2);
        const sx = cx + x1 * radius * persp * 2.2;
        const sy = cy + y1 * radius * persp * 2.2;
        const depth = (z2 + 1) / 2;
        const size = 0.5 + depth * 1.7;

        // turquoise at front, violet at back
        const hue = 175 - 0;
        const alpha = 0.12 + depth * 0.65;
        ctx.beginPath();
        ctx.fillStyle =
          depth > 0.5
            ? `hsla(${hue}, 100%, ${45 + depth * 20}%, ${alpha})`
            : `hsla(258, 82%, ${38 + depth * 24}%, ${alpha})`;
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [count, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
