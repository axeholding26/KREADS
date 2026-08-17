import { BlurWords } from "./motion-primitives";
import L1 from "@/assets/L1.jpeg";
import L2 from "@/assets/L2.jpeg";
import L3 from "@/assets/L3.jpeg";
import L4 from "@/assets/L4.jpeg";
import L5 from "@/assets/L5.jpeg";
import L6 from "@/assets/L6.jpeg";
import L7 from "@/assets/L7.jpeg";
import L8 from "@/assets/L8.jpeg";

const brands = [L1, L2, L3, L4, L5, L6, L7, L8];

export function Trust() {
  return (
    <section id="confiance" className="scene bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <BlurWords
          as="h2"
          text="Ils nous font confiance"
          highlight={["confiance"]}
className="text-[clamp(1.6rem,4.2vw,3.6rem)] font-bold"
        />
      </div>

      <div
        aria-hidden="true"
        className="relative mt-14 flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max shrink-0 items-center gap-6 pr-6">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-xl border-2 border-emerald-500 shadow-sm transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <img
                src={brand}
                alt={`Logo client ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
