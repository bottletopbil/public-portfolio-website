type Case = {
  client: string;
  title: string;
  result: string;
  image?: string;
  url?: string;
};

const CASES: Case[] = [
  {
    client: "Studio Norte",
    title: "Portfolio with bold motion and clear CTAs",
    result: "+38% demo requests",
    image:
      "https://images.unsplash.com/photo-1529336953121-ad421b39be8c?w=1600&h=900&fit=crop&crop=entropy&auto=format&q=60",
  },
  {
    client: "Sprout Labs",
    title: "Launch-ready marketing site on a tight timeline",
    result: "10 days concept → live",
    image:
      "https://images.unsplash.com/photo-1551727974-8af4e6624178?w=1600&h=900&fit=crop&crop=entropy&auto=format&q=60",
  },
  {
    client: "Clerksy",
    title: "Simple service pages that convert",
    result: "+24% contact submissions",
    image:
      "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=1600&h=900&fit=crop&crop=entropy&auto=format&q=60",
  },
];

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl text-white">Case Studies</h2>
          <p className="text-neutral-400 mt-2">A few snapshots of recent work.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {CASES.map((c) => (
            <a
              key={c.title}
              href={c.url || '#'}
              className="group relative overflow-hidden rounded-xl border bg-neutral-950/40 text-neutral-200 border-neutral-800 focus-visible:outline-none"
            >
              <div
                className="h-40 md:h-44 w-full bg-neutral-800"
                style={{
                  backgroundImage: `url(${c.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                aria-hidden
              />
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider text-neutral-400">
                  {c.client}
                </div>
                <h3 className="mt-1 font-medium leading-tight text-white">
                  {c.title}
                </h3>
                <div className="mt-2 text-sm text-lime-300/90">{c.result}</div>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesSection;
