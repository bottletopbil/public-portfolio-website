type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "How fast can we launch?",
    a: "Most sites launch in 1–2 weeks depending on content readiness and scope.",
  },
  {
    q: "What do you need from me?",
    a: "Brand assets (logo, colors), copy or rough drafts, and any reference links you like.",
  },
  {
    q: "Can you work with our CMS?",
    a: "Yes. I structure the build so it can plug into your preferred CMS later if needed.",
  },
  {
    q: "Do you offer ongoing help?",
    a: "I can support updates post‑launch via light retainers or as‑needed engagements.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="w-full bg-black py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl text-white">FAQ</h2>
          <p className="text-neutral-400 mt-2">Answers to common questions.</p>
        </div>

        <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-xl overflow-hidden">
          {FAQS.map((item) => (
            <details key={item.q} className="group bg-neutral-950/40">
              <summary className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between text-left">
                <span className="text-white text-sm md:text-base">{item.q}</span>
                <span className="ml-4 text-neutral-500 transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-5 pb-5 -mt-2 text-neutral-300 text-sm md:text-base">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
