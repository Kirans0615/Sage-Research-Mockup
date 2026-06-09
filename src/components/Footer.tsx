import { motion } from "framer-motion";

const LINKS = {
  Product: ["Mood Journal", "Daily Check-In", "CBT Exercises", "AI Companion", "Sleep Tracker"],
  Resources: ["Blog", "Research", "Help Center", "Community", "Crisis Support"],
  Company: ["About Us", "Careers", "Press", "Privacy Policy", "Terms of Service"],
};

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIAL = [
  { icon: XIcon,         label: "X / Twitter" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: LinkedInIcon,  label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-bg-base border-t border-black/[0.06] pt-16 pb-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <circle cx="8.5" cy="8.5" r="6" fill="#1a1a1a" />
                <circle cx="19.5" cy="8.5" r="6" fill="#1a1a1a" />
                <circle cx="8.5" cy="19.5" r="6" fill="#1a1a1a" />
                <circle cx="19.5" cy="19.5" r="6" fill="#1a1a1a" />
                <circle cx="14" cy="14" r="4" fill="#1a1a1a" />
              </svg>
              <span className="font-display font-semibold text-lg text-[#1a1a1a]">mėntality</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              A mental wellness platform built for real humans navigating real life. Private, evidence-based, always here.
            </p>

            {/* Newsletter */}
            <div className="mt-6 flex items-center bg-white rounded-lg border border-black/[0.06] p-1 pl-4 shadow-sm max-w-xs">
              <input
                type="email"
                placeholder="Your email..."
                className="flex-1 bg-transparent outline-none text-sm text-zinc-700 placeholder:text-zinc-400 py-1"
              />
              <button className="flex-shrink-0 px-4 py-2 bg-[#1a1a1a] text-white text-xs font-medium rounded-md">
                Subscribe
              </button>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([col, items]) => (
            <div key={col}>
              <p className="text-xs font-bold text-zinc-900 tracking-wide uppercase mb-4">{col}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/[0.05]">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} mėntality, Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            {SOCIAL.map(({ icon: Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white border border-black/[0.06] flex items-center justify-center text-zinc-400"
                whileHover={{ scale: 1.2, color: "#9fff00" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
