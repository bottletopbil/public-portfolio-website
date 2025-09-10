import { useEffect, useState } from "react";
import { GlassNavbar } from "@/components/ui/glass";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
// removed flower overlay in favor of WavyBackground
import gradient1 from "@/assets/gradient-1.jpg";
// removed center poster image and unused centerVideo
// import centerImage from "@/assets/center-image.jpg";
// import centerVideo from "@/assets/center-video.mp4";
import heroVideo from "@/assets/hero-video.mp4";
import { Timeline } from "@/components/ui/timeline";
import { DesignsExplorer } from "@/components/designs/DesignsExplorer";
import { TrustBar } from "@/components/trust/TrustBar";
import { ServicesSection } from "@/components/sections/Services";
import { ResultsSection } from "@/components/sections/Results";
// Case studies removed — no real case studies yet
// Replaced TestimonialsSection with testimonials-columns-1 demo
// Pricing section removed — pricing is individualized per project
import { FAQSection } from "@/components/sections/FAQ";
import { AboutSection } from "@/components/sections/About";
import { ContactCTASection } from "@/components/sections/ContactCTA";
import { TestimonialsColumn, type TestimonialItem } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";
 

function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const images: { src: string; alt?: string; type?: 'image' | 'video'; poster?: string }[] = [
    {
      src: heroVideo,
      type: 'video',
      alt: 'Center video',
    },
    {
      src: gradient1,
      alt: 'Gradient 1 background',
    },
    {
      src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Abstract geometric pattern',
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Mountain landscape',
    },
    {
      src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Minimalist design elements',
    },
    {
      src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Ocean waves and beach',
    },
    {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Forest trees and sunlight',
    },
  ];

  // no background from parallax for About; keep it solid black

  const timelineData = [
    {
      title: "Kickoff",
      content: (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-neutral-300">
          <p className="text-sm md:text-base">Align goals, scope, and examples. Define success.</p>
        </div>
      ),
    },
    {
      title: "Design & Build",
      content: (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-neutral-300">
          <p className="text-sm md:text-base leading-relaxed">Iterate quickly. You review async; we ship.</p>
        </div>
      ),
    },
    {
      title: "Launch",
      content: (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-neutral-300">
          <p className="text-sm md:text-base">QA, analytics, domain wiring, and handoff.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[300vh] bg-black">
      {/* Glass Navbar - fades in with HELLO */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 pt-4 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <GlassNavbar />
      </header>

      {/* Removed hero section per request */}

      {/* Zoom Parallax below HELLO */}
      <main className="relative z-0">
        {/* Start the parallax around midway for a strong first frame.
            You can override with a URL param: ?start=0.48 */}
        {(() => {
          // Default that closely matches the screenshot
          let start: number | undefined = 0.53;
          if (typeof window !== 'undefined') {
            const qs = new URLSearchParams(window.location.search);
            const raw = qs.get('start') || qs.get('p');
            if (raw) {
              const n = parseFloat(raw);
              if (!Number.isNaN(n)) start = Math.max(0, Math.min(n, 0.99));
            }
          }
          return (
            <ZoomParallax
              images={images}
              initialProgress={start}
              anchorAtInitial
            />
          );
        })()}

        {/* Trust Bar */}
        <TrustBar />

        {/* Designs Explorer */}
        <DesignsExplorer />
        {/* Compact Timeline directly under Explore */}
        <section className="relative w-full overflow-hidden bg-black py-12 md:py-16">
          <div className="dark">
            <Timeline
              title="Process"
              subtitle="From brief to live—fast and calm."
              data={timelineData}
              compact
            />
          </div>
        </section>

        {/* New Sections */}
        <ServicesSection />
        <ResultsSection />
        {/* Testimonials (21st.dev columns-1) */}
        {(() => {
          const testimonials: TestimonialItem[] = [
            {
              text:
                "Riley redesigned our marketing site and sign‑up flow—page speed jumped into the 90s and trials increased 32% in the first month.",
              image: "https://randomuser.me/api/portraits/women/1.jpg",
              name: "Briana Patel",
              role: "Head of Growth, SplineFox",
            },
            {
              text:
                "The new brand system and homepage finally tell our story. Stakeholders keep commenting on the polish and motion details.",
              image: "https://randomuser.me/api/portraits/men/2.jpg",
              name: "Bilal Ahmed",
              role: "Creative Director, Norte Studio",
            },
            {
              text:
                "CMS handoff was spotless. Our team can publish in minutes without touching code, and the layout options are flexible but safe.",
              image: "https://randomuser.me/api/portraits/women/3.jpg",
              name: "Saman Malik",
              role: "Content Lead, Helio",
            },
            {
              text:
                "We launched a week early. Comms were crisp, and every decision was anchored in conversion or performance—super refreshing.",
              image: "https://randomuser.me/api/portraits/men/4.jpg",
              name: "Omar Raza",
              role: "Product Manager, Orbit Systems",
            },
            {
              text:
                "Our Lighthouse scores went from orange to solid green. Organic traffic is up and bounce rate down across key pages.",
              image: "https://randomuser.me/api/portraits/women/5.jpg",
              name: "Zainab Hussain",
              role: "SEO Manager, Kindred",
            },
            {
              text:
                "The pricing page rewrite paid for itself in two weeks. Clearer tiers and micro‑copy lifted paid conversions by 18%.",
              image: "https://randomuser.me/api/portraits/women/6.jpg",
              name: "Aliza Khan",
              role: "Revenue Ops, Fathomly",
            },
            {
              text:
                "Animations feel purposeful—not flashy. The site loads fast on low‑end devices while still feeling premium.",
              image: "https://randomuser.me/api/portraits/men/7.jpg",
              name: "Farhan Siddiqui",
              role: "Engineering Lead, VectorAI",
            },
            {
              text:
                "Riley’s kickoff deck and weekly checkpoints made the project unusually calm. No surprises, just steady momentum.",
              image: "https://randomuser.me/api/portraits/women/8.jpg",
              name: "Sana Sheikh",
              role: "Program Manager, Nimbus",
            },
            {
              text:
                "Our checkout flow is cleaner and faster. Mobile revenue is up 22% and support tickets dropped noticeably.",
              image: "https://randomuser.me/api/portraits/men/9.jpg",
              name: "Hassan Ali",
              role: "E‑commerce Lead, Alder Supply",
            },
          ];

          const firstColumn = testimonials.slice(0, 3);
          const secondColumn = testimonials.slice(3, 6);
          const thirdColumn = testimonials.slice(6, 9);

          return (
            <section className="my-20 relative bg-black font-sans">
              <div className="container z-10 mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
                >
                  <div className="flex justify-center">
                    <div className="border border-neutral-800 py-1 px-4 rounded-lg text-neutral-200 tracking-tight">Client feedback</div>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight mt-5 text-white">
                    What clients say
                  </h2>
                  <p className="text-center mt-5 text-neutral-400 tracking-tight">
                    Real outcomes from fast, conversion‑focused websites.
                  </p>
                </motion.div>

                <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                  <TestimonialsColumn testimonials={firstColumn} duration={15} />
                  <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                  <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
              </div>
            </section>
          );
        })()}
        
        <FAQSection />
        <AboutSection />
        <ContactCTASection />
      </main>
    </div>
  );
}

export default App;
