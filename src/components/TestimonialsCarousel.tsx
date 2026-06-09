import { useState } from "react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "mėntality helped me recognize patterns I'd never noticed before.",
    name: "Priya K.",
    role: "recovered from burnout",
    emoji: "🌿",
  },
  {
    quote: "The daily check-ins became a ritual I actually look forward to.",
    name: "Marcus T.",
    role: "managing anxiety",
    emoji: "✨",
  },
  {
    quote: "It felt like having a calm, nonjudgmental space in my pocket.",
    name: "Sione L.",
    role: "dealing with grief",
    emoji: "💙",
  },
  {
    quote: "I went from dreading Mondays to actually planning my week.",
    name: "Dana R.",
    role: "ADHD management",
    emoji: "🌟",
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const paginate = (dir: number) => {
    setCurrent((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const getOffset = (i: number) => {
    const diff = ((i - current + TESTIMONIALS.length) % TESTIMONIALS.length);
    if (diff === 0) return 0;
    if (diff === 1) return 1;
    if (diff === TESTIMONIALS.length - 1) return -1;
    return 2;
  };

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-zinc-900">
            Real people, real progress.
          </h2>
          <p className="mt-4 text-zinc-500">Over 2 million people have found their footing here.</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center" style={{ minHeight: 320 }}>
          {TESTIMONIALS.map((t, i) => {
            const offset = getOffset(i);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1;
            if (!isVisible) return null;

            return (
              <motion.div
                key={i}
                className="absolute bg-bg-base rounded-3xl p-8 lg:p-10 cursor-pointer select-none"
                style={{ width: "min(480px, 90vw)" }}
                animate={{
                  x: `${offset * 105}%`,
                  scale: isCenter ? 1 : 0.85,
                  opacity: isCenter ? 1 : 0.5,
                  zIndex: isCenter ? 10 : 5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => !isCenter && paginate(offset > 0 ? 1 : -1)}
              >
                <span className="text-4xl block mb-6">{t.emoji}</span>
                <blockquote className="font-display text-xl lg:text-2xl font-light italic text-zinc-800 leading-snug mb-6">
                  "{t.quote}"
                </blockquote>
                <div>
                  <p className="font-bold text-zinc-900 text-sm">{t.name}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">{t.role}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => paginate(-1)}
            className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setCurrent(i); }}
                className="h-2 rounded-full bg-zinc-300 origin-center"
                animate={{ width: i === current ? 24 : 8, backgroundColor: i === current ? "#1a1a1a" : "#d4d4d8" }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
