import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Card A: Animated line chart ─── */
function MoodJournalCard({ inView }: { inView: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${len}`;
    pathRef.current.style.strokeDashoffset = inView ? "0" : `${len}`;
    pathRef.current.style.transition = inView ? "stroke-dashoffset 1.6s ease 0.2s" : "none";
  }, [inView]);

  return (
    <div className="h-full flex flex-col">
      <p className="text-xs font-medium text-zinc-400 mb-1">Mood Journal</p>
      <h3 className="font-display font-bold text-xl text-zinc-900 mb-4">Track every feeling.</h3>
      <div className="flex-1 relative">
        <svg viewBox="0 0 260 120" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9fff00" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#9fff00" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Area fill */}
          <path
            d="M0 90 C30 70, 50 100, 80 60 S110 30, 140 50 S180 20, 210 40 S240 60, 260 30 L260 120 L0 120 Z"
            fill="url(#chartGrad)"
          />
          {/* Line */}
          <path
            ref={pathRef}
            d="M0 90 C30 70, 50 100, 80 60 S110 30, 140 50 S180 20, 210 40 S240 60, 260 30"
            fill="none"
            stroke="#9fff00"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Dots */}
          {[[80, 60], [140, 50], [210, 40]].map(([x, y]) => (
            <motion.circle
              key={`${x}-${y}`}
              cx={x} cy={y} r={4}
              fill="#9fff00"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 1.5, duration: 0.3 }}
            />
          ))}
        </svg>
      </div>
      <div className="flex gap-3 mt-3">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d} className="flex-1 text-center text-[10px] text-zinc-400">{d}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Card B: Progress ring ─── */
function DailyCheckInCard({ inView }: { inView: boolean }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const progress = 0.73;
  return (
    <div className="h-full flex flex-col items-center justify-center gap-3">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#f4f4f5" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r={r} fill="none"
            stroke="#9fff00" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: inView ? circ * (1 - progress) : circ }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-bold text-xl text-zinc-900">73%</span>
        </div>
      </div>
      <h3 className="font-display font-semibold text-base text-zinc-900">Daily Check-In</h3>
      <p className="text-xs text-zinc-400 text-center">Streak: 12 days</p>
    </div>
  );
}

/* ─── Card C: Sleep bars ─── */
const SLEEP_DATA = [6.5, 7.2, 5.8, 8.1, 7.5, 6.9, 8.3];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function SleepTrackerCard({ inView }: { inView: boolean }) {
  const max = Math.max(...SLEEP_DATA);
  return (
    <div className="h-full flex flex-col">
      <h3 className="font-display font-semibold text-base text-zinc-900 mb-1">Sleep Tracker</h3>
      <p className="text-xs text-zinc-400 mb-4">Hours per night</p>
      <div className="flex-1 flex items-end gap-2 pb-4">
        {SLEEP_DATA.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              className="w-full rounded-t-md"
              initial={{ scaleY: 0, originY: 1 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ delay: 0.1 * i + 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ height: `${(h / max) * 80}px`, backgroundColor: i === 5 || i === 6 ? "#9fff00" : "#e4e4e7" }}
            />
            <span className="text-[10px] text-zinc-400">{DAYS[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Card D: Card flip ─── */
function CBTCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="h-full cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 flex items-center gap-5" style={{ backfaceVisibility: "hidden" }}>
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center flex-shrink-0 text-2xl">🧠</div>
          <div>
            <h3 className="font-display font-bold text-lg text-zinc-900">CBT Exercises</h3>
            <p className="text-xs text-zinc-400 mt-1">Hover to learn more</p>
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 bg-[#1a1a1a] rounded-2xl flex items-center px-6"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-sm text-zinc-300 leading-relaxed">
            180+ evidence-based cognitive behavioral exercises, guided by clinical best practices to reshape thought patterns.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Card E: AI typewriter ─── */
const MESSAGES = [
  "I'm feeling a bit anxious today...",
  "Tell me what's on your mind 💬",
  "Try the 4-7-8 breathing technique right now.",
];

function AICompanionCard() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setDisplayed("");
    setTyping(true);
    const msg = MESSAGES[msgIdx];
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(msg.slice(0, i));
      if (i >= msg.length) {
        clearInterval(timer);
        setTyping(false);
        setTimeout(() => setMsgIdx((prev) => (prev + 1) % MESSAGES.length), 2200);
      }
    }, 38);
    return () => clearInterval(timer);
  }, [msgIdx]);

  const isUser = msgIdx % 2 === 0;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center text-xs font-bold text-black">AI</div>
        <h3 className="font-display font-semibold text-base text-zinc-900">AI Companion</h3>
        <div className="ml-auto flex gap-1">
          {[0, 1, 2].map((i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-3 overflow-hidden">
        {/* Bubble */}
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-snug min-h-[2.5rem] ${
              isUser ? "bg-[#1a1a1a] text-white rounded-br-sm" : "bg-zinc-100 text-zinc-800 rounded-bl-sm"
            }`}
          >
            {displayed}
            {typing && (
              <motion.span
                className="inline-block ml-0.5 w-0.5 h-4 bg-current align-middle rounded-full"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            )}
          </div>
        </div>
      </div>
      <p className="text-[10px] text-zinc-400 mt-3">Available 24/7 · Completely private</p>
    </div>
  );
}

/* ─── Main grid ─── */
const cardBase = "bg-white rounded-3xl p-6 shadow-sm border border-black/[0.04]";

export default function FeaturesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="service" ref={ref} className="py-24 lg:py-32 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-14"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-zinc-900 leading-tight">
            Everything you need to take care of your mind.
          </h2>
          <p className="mt-4 text-zinc-500 text-lg">Built around how real people actually cope.</p>
        </motion.div>

        {/* Bento grid — 4 cols, 3 rows */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4"
          style={{ gridTemplateRows: "auto auto auto" }}>

          {/* A: Mood Journal — 2×2 */}
          <motion.div
            className={`${cardBase} md:col-span-2 md:row-span-2 min-h-[260px]`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <MoodJournalCard inView={inView} />
          </motion.div>

          {/* B: Daily Check-In — 1×1 */}
          <motion.div
            className={`${cardBase} md:col-span-1`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <DailyCheckInCard inView={inView} />
          </motion.div>

          {/* E: AI Companion — 1×2 (spans rows 1-2, col 4) */}
          <motion.div
            className={`${cardBase} md:col-span-1 md:row-span-2`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.19 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <AICompanionCard />
          </motion.div>

          {/* C: Sleep Tracker — 1×1 (col 3, row 2) */}
          <motion.div
            className={`${cardBase} md:col-span-1`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.26 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <SleepTrackerCard inView={inView} />
          </motion.div>

          {/* D: CBT Exercises — 3×1 (row 3) */}
          <motion.div
            className={`${cardBase} md:col-span-3 min-h-[100px]`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.33 }}
          >
            <CBTCard />
          </motion.div>

          {/* Filler — 1×1 (row 3, col 4) */}
          <motion.div
            className={`${cardBase} hidden md:flex items-center justify-center`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.38 }}
          >
            <p className="font-display font-bold text-3xl text-brand-green">+</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
