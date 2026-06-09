import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const NAV_LINKS = ["service", "patient resources", "about us", "education center"];

function CloverLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8.5" cy="8.5" r="6" fill="#1a1a1a" />
      <circle cx="19.5" cy="8.5" r="6" fill="#1a1a1a" />
      <circle cx="8.5" cy="19.5" r="6" fill="#1a1a1a" />
      <circle cx="19.5" cy="19.5" r="6" fill="#1a1a1a" />
      <circle cx="14" cy="14" r="4" fill="#1a1a1a" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-50 py-5 md:py-7"
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(241,241,241,0)",
          borderBottomColor: scrolled ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(16px)" : "blur(2px)",
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-12 items-center gap-2">
          {/* Logo */}
          <div className="col-span-4 md:col-span-3 flex items-center gap-2.5">
            <CloverLogo />
            <span className="font-display font-semibold text-xl tracking-tight text-[#1a1a1a]">
              mėntality
            </span>
          </div>

          {/* Center nav (desktop) */}
          <nav className="col-span-6 hidden md:flex justify-center items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.replace(/ /g, "-")}`}
                className="text-xs lowercase tracking-wide text-zinc-500 hover:text-zinc-900 transition-colors duration-200 whitespace-nowrap"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right CTA (desktop) */}
          <div className="col-span-3 hidden md:flex items-center justify-end gap-5">
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
              find help
            </a>
            <motion.a
              href="#"
              className="bg-[#1a1a1a] text-white text-xs font-medium px-5 py-2.5 rounded-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              get started →
            </motion.a>
          </div>

          {/* Hamburger (mobile) */}
          <div className="col-span-8 md:hidden flex justify-end">
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg hover:bg-black/5 transition-colors"
            >
              <motion.div
                className="w-5 flex flex-col gap-1.5"
                animate={mobileOpen ? "open" : "closed"}
              >
                <motion.span
                  className="block h-0.5 bg-zinc-800 rounded-full origin-center"
                  variants={{ open: { rotate: 45, y: 8 }, closed: { rotate: 0, y: 0 } }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="block h-0.5 bg-zinc-800 rounded-full"
                  variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 bg-zinc-800 rounded-full origin-center"
                  variants={{ open: { rotate: -45, y: -8 }, closed: { rotate: 0, y: 0 } }}
                  transition={{ duration: 0.25 }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-[64px] left-0 w-full z-40 bg-white/96 backdrop-blur-lg overflow-hidden border-b border-black/5"
          >
            <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.replace(/ /g, "-")}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm text-zinc-700 hover:text-zinc-900 lowercase tracking-wide border-b border-black/5 last:border-0"
                >
                  {link}
                </motion.a>
              ))}
              <motion.a
                href="#"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                className="mt-3 inline-flex items-center justify-center bg-[#1a1a1a] text-white text-sm font-medium px-6 py-3 rounded-full self-start"
              >
                get started →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
