import { motion } from "framer-motion";

const LINES = ["Got a mind?", "We've got you."];

export default function FinalCTA() {
  return (
    <section className="relative py-32 lg:py-44 px-4 sm:px-8 bg-[#1a1a1a] overflow-hidden">
      {/* Rotating glow orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "#9fff00", filter: "blur(120px)", opacity: 0.18 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Headline with line reveal */}
        <div className="overflow-hidden mb-3">
          {LINES.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.p
                className="font-display font-black text-6xl sm:text-7xl lg:text-8xl text-white leading-tight"
                initial={{ y: 80 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {line}
              </motion.p>
            </div>
          ))}
        </div>

        <motion.p
          className="mt-6 text-zinc-400 text-lg max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.35, duration: 0.55 }}
        >
          Join over 2 million people building healthier mental habits.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.a
            href="#"
            className="px-8 py-4 bg-brand-green text-black font-semibold rounded-full text-sm inline-flex items-center justify-center gap-2"
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(159,255,0,0.35)" }}
            whileTap={{ scale: 0.97 }}
          >
            Start for free →
          </motion.a>
          <motion.a
            href="#"
            className="px-8 py-4 border border-white/25 text-white font-semibold rounded-full text-sm inline-flex items-center justify-center hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            See how it works
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
