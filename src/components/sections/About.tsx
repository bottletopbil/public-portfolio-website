export function AboutSection() {
  return (
    <section id="about" className="w-full bg-black py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-4xl text-white">About</h2>
          <p className="text-neutral-400 mt-2">A pragmatic approach to beautiful, fast websites.</p>
        </div>
        <div className="prose prose-invert max-w-none text-neutral-300">
          <p>
            I help founders and teams launch focused marketing sites quickly. My work blends
            clear information architecture, tasteful motion, and performance best practices.
          </p>
          <p>
            I’ve built with React, Next.js, Tailwind, and modern tooling across startups and agencies.
            I value strong typography, accessible interactions, and shipping without drama.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {/* left (dark) */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/40 p-4">
            <div className="text-xs text-neutral-400">Based in</div>
            <div className="text-white">USA (remote‑first)</div>
          </div>
          {/* right (dark) */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/40 p-4">
            <div className="text-xs text-neutral-400">Focus</div>
            <div className="text-white">Web design + front‑end dev</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
