import { useEffect, useState } from "react";
import { ParticleTextEffect } from "@/components/ui/interactive-text-particle";
import { GlassNavbar } from "@/components/ui/glass";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Modern architecture building',
    },
    {
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Urban cityscape at sunset',
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
      <section className="relative h-screen">
        <ParticleTextEffect
          text="HELLO"
          className={`w-full h-full transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        />
      </section>

      {/* Zoom Parallax below HELLO */}
      <main className="relative z-0">
        <ZoomParallax images={images} />
      </main>
    </div>
  );
}

export default App;
