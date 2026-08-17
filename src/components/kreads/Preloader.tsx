import { motion } from "motion/react";
import { useEffect, useState } from "react";
import logo from "@/assets/kreads-logo.png";

/** 2s preloader: KREADS logo revealed by a light scan, then fades out. */
export function Preloader({ onDone }: { onDone?: () => void }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHidden(true);
      onDone?.();
    }, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        if (hidden) document.body.style.removeProperty("overflow");
      }}
      style={{ pointerEvents: hidden ? "none" : "auto" }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background"
      aria-hidden="true"
    >
      <div className="relative overflow-hidden">
        <img
          src={logo}
          alt="KREADS"
          className="size-28 object-contain sm:size-40"
        />
        <motion.span
          className="absolute inset-y-0 w-24"
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.817 0.139 179.71 / 0.45), transparent)",
            filter: "blur(6px)",
          }}
        />
      </div>
    </motion.div>
  );
}
