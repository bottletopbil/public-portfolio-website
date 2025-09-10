import { useMemo, useState } from "react";
import { designs, type Design, type DesignCategory } from "@/data/designs";

const categories: DesignCategory[] = [
  "Startups",
  "Creatives",
  "Small Business",
  "Agencies",
];

function DesignCard({ d }: { d: Design }) {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      onClick={() => window.open(d.url, "_blank", "noopener,noreferrer")}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="group relative w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 text-left transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none"
      aria-label={`${d.title} — open demo`}
    >
      <div
        className="h-40 md:h-48 w-full bg-neutral-800"
        style={{
          backgroundImage: `url(${d.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-white font-medium">{d.title}</h3>
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 border border-neutral-800 rounded px-1.5 py-0.5">
            {d.status === "wip" ? "WIP" : "Live"}
          </span>
        </div>
        {d.tags && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {d.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] text-neutral-400 bg-neutral-800/60 rounded px-1.5 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {d.description && (
          <p className="mt-2 text-sm text-neutral-400 line-clamp-2 group-hover:line-clamp-none transition-[line-clamp]">
            {d.description}
          </p>
        )}
      </div>

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0"}`}
      />
    </button>
  );
}

export function DesignsExplorer() {
  const [activeCategory, setActiveCategory] = useState<DesignCategory | "All">(
    "All"
  );

  const filtered = useMemo(() => {
    if (activeCategory === "All") return designs;
    return designs.filter((d) => d.category === activeCategory);
  }, [activeCategory]);

  // Build a single featured row of exactly 5 cards (fill with placeholders)
  const featuredItems = useMemo(() => {
    const items = filtered.slice(0, 5);
    const placeholders = Math.max(0, 5 - items.length);
    return { items, placeholders };
  }, [filtered]);

  return (
    <section id="designs" className="w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl text-white">Explore Designs</h2>
            <p className="text-neutral-400 mt-2">
              Pick a category. Click a card to open the live demo.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {["All", ...categories].map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c as any)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    activeCategory === c
                      ? "border-lime-400/40 bg-lime-400/10 text-lime-300"
                      : "border-neutral-800 text-neutral-300 hover:bg-neutral-900"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Single Featured row */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-white/90 font-semibold tracking-wide">Featured</h3>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="rounded-md border border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700 px-3 py-1.5 text-sm"
            >
              View all
            </button>
          </div>
          {/* Horizontally scrollable row of 5 cards */}
          <div className="mt-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 min-w-max snap-x snap-mandatory">
              {featuredItems.items.map((d) => (
                <div key={d.id} className="snap-start w-64 md:w-72 lg:w-80 flex-shrink-0">
                  <DesignCard d={d} />
                </div>
              ))}
              {Array.from({ length: featuredItems.placeholders }).map((_, i) => (
                <div
                  key={`ph-${i}`}
                  className="snap-start w-64 md:w-72 lg:w-80 flex-shrink-0 rounded-xl border border-dashed border-neutral-800 bg-neutral-950/40 grid place-items-center p-6 text-center"
                  aria-hidden
                >
                  <span className="text-sm text-neutral-500">More designs coming soon</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
