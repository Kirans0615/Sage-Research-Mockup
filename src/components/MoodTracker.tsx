import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";

const MOODS = [
  { emoji: "😔", label: "Very Low",  color: "#6366f1" },
  { emoji: "😕", label: "Low",       color: "#818cf8" },
  { emoji: "😐", label: "Neutral",   color: "#f59e0b" },
  { emoji: "🙂", label: "Good",      color: "#4ade80" },
  { emoji: "😄", label: "Great",     color: "#9fff00" },
];

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BAR_HEIGHTS = [60, 45, 75, 50, 80, 40, 90];

export default function MoodTracker() {
  const [selected, setSelected] = useState<number | null>(null);
  const [logged, setLogged] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const bgColor = selected !== null ? MOODS[selected].color : "#2d2d2d";

  const handleLog = () => {
    setLogged(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#9fff00", "#ffffff", "#a78bfa"],
    });
    setTimeout(() => setLogged(false), 2000);
  };

  return (
    <section id="patient-resources" className="py-24 lg:py-32 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden relative"
          animate={{ backgroundColor: bgColor }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Inner grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">

            {/* Left */}
            <div>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight mb-8">
                How are you feeling today?
              </h2>

              {/* Emoji selector */}
              <div className="flex gap-4 flex-wrap">
                {MOODS.map((mood, i) => (
                  <motion.button
                    key={mood.label}
                    onClick={() => setSelected(i)}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-colors"
                    style={{ background: selected === i ? "rgba(255,255,255,0.2)" : "transparent" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={selected === i ? { scale: [1, 1.4, 1.2] } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <span className="text-3xl select-none">{mood.emoji}</span>
                    <span className="text-[10px] text-white/70 font-medium">{mood.label}</span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={handleLog}
                disabled={selected === null}
                className="mt-10 px-8 py-3.5 bg-brand-green text-black font-semibold rounded-full text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                whileHover={selected !== null ? { scale: 1.04 } : {}}
                whileTap={selected !== null ? { scale: 0.96 } : {}}
              >
                {logged ? "Feeling logged! ✓" : "log this feeling"}
              </motion.button>
            </div>

            {/* Right: Weekly chart */}
            <div className="flex flex-col justify-end">
              <p className="text-white/60 text-xs font-medium tracking-wide mb-5 uppercase">
                This week's mood
              </p>
              <div className="flex items-end gap-3 h-32">
                {BAR_HEIGHTS.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      className="w-full rounded-t-lg"
                      style={{
                        height: `${h}%`,
                        backgroundColor:
                          selected !== null && i === new Date().getDay()
                            ? MOODS[selected].color
                            : "rgba(255,255,255,0.25)",
                      }}
                      initial={{ scaleY: 0, originY: 1 }}
                      animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ delay: i * 0.07 + 0.2, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    <span className="text-[10px] text-white/50">{WEEK[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative circle */}
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-10 pointer-events-none"
            style={{ background: "rgba(255,255,255,0.4)" }} />
        </motion.div>
      </div>
    </section>
  );
}
