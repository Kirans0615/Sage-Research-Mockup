import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatItem {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 94,  suffix: "%",  label: "users report reduced anxiety after 30 days" },
  { value: 2.4, suffix: "M+", label: "journal entries written" },
  { value: 180, suffix: "+",  label: "CBT exercises in the library" },
  { value: 4.9, suffix: "★",  label: "average app store rating" },
];

function CountUp({ value, suffix, label }: StatItem) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const isFloat = value !== Math.floor(value);

    const step = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setCount(parseFloat((eased * value).toFixed(isFloat ? 1 : 0)));
      if (elapsed < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center px-6 py-4">
      <p className="font-display font-black text-5xl lg:text-6xl text-black tabular-nums leading-none">
        {value === Math.floor(value) ? Math.round(count as number) : (count as number).toFixed(1)}
        <span className="text-3xl lg:text-4xl">{suffix}</span>
      </p>
      <p className="mt-3 text-sm text-black/60 max-w-[180px] mx-auto leading-snug">{label}</p>
    </div>
  );
}

export default function StatsBanner() {
  return (
    <section className="py-20 px-4 sm:px-8 bg-brand-green">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-black/20">
          {STATS.map((stat, i) => (
            <CountUp key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
