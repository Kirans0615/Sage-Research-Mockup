import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";

interface Plan {
  name: string;
  monthly: number;
  annual: number;
  features: { text: string; included: boolean }[];
  highlight?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    features: [
      { text: "Daily mood check-in",         included: true },
      { text: "3 journal entries / month",   included: true },
      { text: "Basic insights",              included: true },
      { text: "CBT exercises",               included: false },
      { text: "AI companion",                included: false },
    ],
  },
  {
    name: "Plus",
    monthly: 12,
    annual: 9,
    highlight: true,
    features: [
      { text: "Unlimited mood tracking",     included: true },
      { text: "Unlimited journaling",        included: true },
      { text: "Advanced insights & trends",  included: true },
      { text: "Full CBT library (180+ exercises)", included: true },
      { text: "AI companion",                included: false },
    ],
  },
  {
    name: "Pro",
    monthly: 24,
    annual: 18,
    features: [
      { text: "Everything in Plus",          included: true },
      { text: "Unlimited AI companion",      included: true },
      { text: "Therapist connect network",   included: true },
      { text: "Priority support",            included: true },
      { text: "Family plan (up to 5)",       included: true },
    ],
  },
];

export default function PricingCards() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="about-us" className="py-24 lg:py-32 px-4 sm:px-8 bg-bg-base">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-zinc-900">
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 text-zinc-500">No hidden fees. Cancel anytime.</p>

          {/* Billing toggle */}
          <LayoutGroup>
            <div className="mt-8 inline-flex items-center gap-3 bg-white rounded-full p-1.5 border border-black/[0.06] shadow-sm">
              {(["Monthly", "Annual"] as const).map((label) => {
                const isActive = (label === "Annual") === annual;
                return (
                  <button
                    key={label}
                    onClick={() => setAnnual(label === "Annual")}
                    className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors z-10"
                    style={{ color: isActive ? "#fff" : "#71717a" }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="billing-pill"
                        className="absolute inset-0 bg-[#1a1a1a] rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    {label}
                    {label === "Annual" && (
                      <span className="ml-1.5 text-[10px] text-brand-green font-bold">-25%</span>
                    )}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </motion.div>

        {/* Cards row */}
        <div className="flex flex-col md:flex-row gap-5 items-stretch justify-center">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              className="relative flex-1 max-w-sm"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.10)" }}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="px-4 py-1.5 bg-brand-green text-black text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
                    Most Popular
                  </span>
                </motion.div>
              )}

              <div
                className={`h-full flex flex-col p-8 rounded-3xl ${
                  plan.highlight
                    ? "bg-[#1a1a1a] text-white scale-[1.05]"
                    : "bg-white text-zinc-900 border border-black/[0.05]"
                }`}
              >
                <p className="font-display font-bold text-xl mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1 mt-3 mb-6">
                  <span className="font-display font-black text-5xl">
                    ${annual ? plan.annual : plan.monthly}
                  </span>
                  <span className={`text-sm ${plan.highlight ? "text-white/50" : "text-zinc-400"}`}>
                    {plan.monthly === 0 ? "forever free" : "/mo"}
                  </span>
                </div>

                <ul className="space-y-3.5 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3 text-sm">
                      <span
                        className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          f.included
                            ? "bg-brand-green text-black"
                            : plan.highlight
                            ? "bg-white/10 text-white/30"
                            : "bg-zinc-100 text-zinc-300"
                        }`}
                      >
                        {f.included ? "✓" : "–"}
                      </span>
                      <span className={f.included ? "" : plan.highlight ? "text-white/40" : "text-zinc-300"}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-3.5 rounded-full text-sm font-semibold ${
                    plan.highlight
                      ? "bg-brand-green text-black hover:bg-[#b8ff20]"
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  } transition-colors`}
                  whileTap={{ scale: 0.97 }}
                >
                  {plan.monthly === 0 ? "Get started free" : `Choose ${plan.name}`}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
