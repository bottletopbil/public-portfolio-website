import { Button } from "@/components/ui/button";

type Tier = {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  highlight?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "$1,500",
    blurb: "1–3 pages. Great for lean launches.",
    features: [
      "Template choice + branding",
      "Responsive build",
      "SEO basics",
      "Email capture or simple form",
    ],
  },
  {
    name: "Standard",
    price: "$3,000",
    blurb: "Up to 6 pages. Most teams choose this.",
    features: [
      "Everything in Starter",
      "Expanded pages + sections",
      "Custom interactions",
      "CMS-ready structure",
    ],
    highlight: true,
  },
  {
    name: "Plus",
    price: "$5,000+",
    blurb: "Complex layouts, integrations, or extra polish.",
    features: [
      "Everything in Standard",
      "Advanced motion",
      "Custom components",
      "Integration support",
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl text-white">Pricing</h2>
          <p className="text-neutral-400 mt-2">Simple, transparent packages for clear outcomes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {TIERS.map((t) => {
            const base = "bg-neutral-950/40 text-neutral-200 border-neutral-800";
            const heading = "text-white";
            const price = "text-white";
            const blurb = "text-neutral-400";
            const feature = "text-neutral-300";
            const cardClass = `${base} ${t.highlight ? "border-lime-500/40 shadow-[0_0_0_1px_rgba(163,230,53,0.1)]" : ""}`;
            return (
              <div key={t.name} className={`rounded-xl border p-6 ${cardClass}`}>
                <div className="flex items-baseline justify-between">
                  <h3 className={`text-lg font-semibold ${heading}`}>{t.name}</h3>
                  <div className={`text-2xl font-semibold ${price}`}>{t.price}</div>
                </div>
                <p className={`text-sm mt-1 ${blurb}`}>{t.blurb}</p>
                <ul className="mt-4 space-y-2">
                  {t.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${feature}`}>
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-lime-400/80" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button
                    className={
                      t.highlight
                        ? "bg-lime-500 text-black hover:bg-lime-500/90"
                        : "bg-neutral-800 hover:bg-neutral-700"
                    }
                    onClick={() => (window.location.href = '#contact')}
                  >
                    Get started
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
