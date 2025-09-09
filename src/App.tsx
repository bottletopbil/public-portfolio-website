import { useEffect, useState } from "react";
import { ParticleTextEffect } from "@/components/ui/interactive-text-particle";
import { GlassNavbar } from "@/components/ui/glass";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
// removed flower overlay in favor of WavyBackground
import gradient1 from "@/assets/gradient-1.jpg";
// removed center poster image and unused centerVideo
// import centerImage from "@/assets/center-image.jpg";
// import centerVideo from "@/assets/center-video.mp4";
import heroVideo from "@/assets/hero-video.mp4";
import { Timeline } from "@/components/ui/timeline";
 

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
      title: "Discovery",
      content: (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-neutral-300">
          <p className="text-sm md:text-base">
            We start with a quick call to understand your goals, audience,
            brand, and success criteria. I turn this into a concise plan.
          </p>
        </div>
      ),
    },
    {
      title: "Design",
      content: (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-neutral-300">
          <p className="text-sm md:text-base">
            I craft a focused visual direction and interactive prototypes.
            You review and we iterate quickly until it feels right.
          </p>
        </div>
      ),
    },
    {
      title: "Build",
      content: (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-neutral-300">
          <p className="text-sm md:text-base">
            Production-grade implementation with modern React, motion, and
            performance best practices. I share progress as we go.
          </p>
        </div>
      ),
    },
    {
      title: "Launch",
      content: (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-neutral-300">
          <p className="text-sm md:text-base">
            Final polish, analytics, SEO, accessibility checks, and deploy.
            Post-launch support to ensure everything lands smoothly.
          </p>
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

      {/* HELLO hero section */}
      <section className="relative h-screen overflow-hidden">
        <ParticleTextEffect
          text={"Riley's\nWeb Designs"}
          fontSizeOffsetPx={15}
          className={`w-full h-full relative z-10 transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        />
      </section>

      {/* Zoom Parallax below HELLO */}
      <main className="relative z-0">
        <ZoomParallax images={images} />

        {/* How it works: Timeline */}
        <section className="relative min-h-screen w-full overflow-hidden bg-black">
          <div className="dark">
            <Timeline
              title="How It Works"
              subtitle="A quick, collaborative process from idea to launch."
              data={timelineData}
            />
          </div>
        </section>

        
      </main>
    </div>
  );
}

export default App;
