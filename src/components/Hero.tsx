import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedText } from "./AnimatedText";

const SUGGESTIONS = [
  "How do I manage anxiety?",
  "Breathing exercises for stress",
  "Finding a therapist near me",
];

function EyePill() {
  return (
    <span
      className="inline-flex items-center justify-center align-middle mx-1 border-2 border-[#1a1a1a] rounded-full"
      style={{ width: "clamp(16px, 4vw, 62px)", height: "0.85em" }}
    >
      <motion.span
        className="block rounded-full bg-black"
        style={{ width: 8, height: 8 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
}

export default function Hero() {
  const [query, setQuery] = useState("");
  const nextRef = useRef<HTMLElement | null>(null);

  const scrollDown = () => {
    const logoStrip = document.getElementById("logo-strip");
    if (logoStrip) logoStrip.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[110vh] sm:min-h-[140vh] w-full flex flex-col items-center justify-start overflow-hidden bg-bg-base">

      {/* Background video */}
      <div className="absolute w-full z-0 overflow-hidden pointer-events-none"
        style={{ top: "15vh", height: "95vh" }}>
        {/* Top gradient mask */}
        <div className="absolute inset-x-0 top-0 h-24 sm:h-32 z-10"
          style={{ background: "linear-gradient(to bottom, #EDEEF5, transparent)" }} />
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Bottom gradient mask */}
        <div className="absolute inset-x-0 bottom-0 h-32 z-10"
          style={{ background: "linear-gradient(to top, #EDEEF5, transparent)" }} />
      </div>

      {/* Ambient orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full blur-3xl opacity-30"
          style={{ width: 500, height: 500, background: "#9fff00", top: "10%", left: "-10%" }}
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{ width: 400, height: 400, background: "#a78bfa", top: "30%", right: "-5%" }}
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl opacity-15"
          style={{ width: 300, height: 300, background: "#34d399", bottom: "20%", left: "30%" }}
          animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-36 sm:pt-44 grid grid-cols-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2">

          {/* Headline */}
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight">
            <span className="block text-[#1a1a1a]">
              <AnimatedText text="Mentality offers" delay={0.1} />
            </span>
            <span className="block text-[#8e8e8e]">
              <AnimatedText text="information" delay={0.35} />
            </span>
            <span className="block text-[#8e8e8e]">
              <AnimatedText text="and resources to help you manage" delay={0.55} />
            </span>
            <span className="block text-[#8e8e8e]">
              {["your"].map((w, i) => (
                <motion.span key={w} className="inline-block"
                  style={{ marginRight: "0.28em" }}
                  initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.55 + (7 * 0.04) + i * 0.04, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
                  {w}
                </motion.span>
              ))}
              <EyePill />
              {["mental", "wellbeing."].map((w, i) => (
                <motion.span key={w} className="inline-block"
                  style={{ marginRight: i === 0 ? "0.28em" : 0 }}
                  initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.55 + (9 * 0.04) + i * 0.04, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Search pill */}
          <motion.div
            className="relative mt-10 max-w-md"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center bg-white rounded-lg border border-black/[0.06] p-1 pl-4 shadow-sm">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-zinc-800 placeholder:text-zinc-400 py-1.5"
              />
              <motion.button
                className="flex-shrink-0 w-9 h-9 bg-[#1a1a1a] rounded-full flex items-center justify-center"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <motion.svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  variants={{ hover: { rotate: 45 } }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </motion.button>
            </div>

            {/* Suggestions dropdown */}
            <AnimatePresence>
              {query.length > 0 && (
                <motion.div
                  key="suggestions"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-black/[0.06] shadow-lg z-20"
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="w-full text-left px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors border-b border-black/[0.04] last:border-0"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Architectural anchors */}
      <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <div className="bg-white/60 backdrop-blur-sm border border-black/10 rounded-full px-3 py-1.5 text-xs text-zinc-500 tracking-widest">
          pl — en
        </div>
      </div>
      <div className="absolute bottom-12 left-5 sm:left-8 z-10">
        <span className="text-xs text-zinc-400 tracking-widest">2024</span>
      </div>
      <div className="absolute bottom-12 right-5 sm:right-8 z-10">
        <span className="text-xs text-zinc-400 tracking-widest">mental health tools</span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <motion.button
          onClick={scrollDown}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="p-2 rounded-full hover:bg-black/5 transition-colors"
          aria-label="Scroll down"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 8l5 5 5-5" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>

      <div ref={(el) => { nextRef.current = el; }} />
    </section>
  );
}
