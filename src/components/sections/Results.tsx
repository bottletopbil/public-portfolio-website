export function ResultsSection() {
  const stats = [
    { label: "Time to launch", value: "7–14 days" },
    { label: "Avg. Lighthouse", value: "95+" },
    { label: "Core Web Vitals", value: "Good" },
    { label: "Revision window", value: "14 days" },
  ];

  return (
    <section id="results" className="w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl text-white">Results you can expect</h2>
          <p className="text-neutral-400 mt-2">Fast delivery, fast sites, and a smoother process.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border p-6 text-center bg-neutral-950/40 text-neutral-200 border-neutral-800"
            >
              <div className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                {s.value}
              </div>
              <div className="text-xs md:text-sm mt-1 text-neutral-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResultsSection;
