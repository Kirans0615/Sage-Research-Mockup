import { useRef } from "react";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";

const FEATURES = [
  "Auto-organized by date, mood, and theme",
  "Private and end-to-end encrypted",
  "Prompts that actually help you write",
  "Weekly insights from your entries",
];

function JournalPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
  const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, perspective: 800, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="bg-white rounded-3xl p-8 shadow-xl shadow-black/8 border border-black/[0.05] cursor-default"
    >
      {/* Date header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-medium text-zinc-400 tracking-wide uppercase">Tuesday</p>
          <p className="font-display font-bold text-lg text-zinc-900">June 9, 2026</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-[11px] font-semibold">😌 Calm</span>
          <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-500 text-[11px]">342 words</span>
        </div>
      </div>

      {/* Journal text */}
      <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
        <p>
          Today I noticed something different — the morning felt less heavy. I took ten minutes to sit by the window before reaching for my phone. The light was soft, almost hesitant.
        </p>
        <p>
          I've been thinking about the patterns my therapist mentioned. Avoidance has a way of disguising itself as productivity. I kept busy all week, but in the right ways this time.
        </p>
        <p className="flex items-end gap-0.5">
          <span>The hard part is letting go without losing grip entirely —</span>
          <motion.span
            className="inline-block w-0.5 h-4 bg-zinc-800 rounded-full align-middle ml-0.5"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-6">
        {["#growth", "#patterns", "#mindfulness", "#gratitude"].map((tag) => (
          <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-50 text-zinc-400 border border-zinc-100">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function JournalPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 px-4 sm:px-8 bg-bg-base">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-zinc-900 leading-tight">
            Your thoughts, beautifully organized.
          </h2>
          <ul className="mt-8 space-y-4">
            {FEATURES.map((feature, i) => (
              <motion.li
                key={feature}
                className="flex items-start gap-3 text-zinc-600"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <motion.span
                  className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-green flex items-center justify-center text-black text-[10px] font-bold mt-0.5"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 400, damping: 20 }}
                >
                  ✓
                </motion.span>
                <span className="text-[15px] leading-snug">{feature}</span>
              </motion.li>
            ))}
          </ul>

          <motion.button
            className="mt-10 px-8 py-3.5 bg-[#1a1a1a] text-white font-medium rounded-full text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start journaling free →
          </motion.button>
        </motion.div>

        {/* Right: Journal panel */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <JournalPanel />
        </motion.div>
      </div>
    </section>
  );
}
