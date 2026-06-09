const LOGOS = [
  "MINDFUL",
  "HEADSPACE PARTNER",
  "APA RECOGNIZED",
  "FEATURED IN WIRED",
  "NAMI ALLY",
  "CALM CERTIFIED",
  "STANFORD RESEARCH",
  "FEATURED IN TIME",
];

export default function LogoStrip() {
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section
      id="logo-strip"
      className="relative py-10 overflow-hidden border-y border-black/[0.05] bg-bg-base"
      style={{
        maskImage: "linear-gradient(to right, #EDEEF5 0%, transparent 10%, transparent 90%, #EDEEF5 100%)",
        WebkitMaskImage: "linear-gradient(to right, #EDEEF5 0%, transparent 10%, transparent 90%, #EDEEF5 100%)",
      }}
    >
      <div className="marquee-inner">
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display font-medium text-xs tracking-[0.22em] uppercase text-zinc-400 px-10 whitespace-nowrap select-none"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
