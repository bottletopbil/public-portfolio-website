import { SpiralAnimation } from "@/components/ui/spiral-animation";
import { ParticleTextEffect } from "@/components/ui/interactive-text-particle";
import { useEffect, useState } from "react";

function App() {
  const [showParticle, setShowParticle] = useState(false);
  const [hideSpiral, setHideSpiral] = useState(false);
  const [particleVisible, setParticleVisible] = useState(false);

  // When particle effect mounts, fade it in
  useEffect(() => {
    if (showParticle) {
      const id = requestAnimationFrame(() => setParticleVisible(true));
      return () => cancelAnimationFrame(id);
    } else {
      setParticleVisible(false);
    }
  }, [showParticle]);
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Spiral Animation (plays once, then fades out) */}
      {!hideSpiral && (
        <div
          className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000 ${
            showParticle ? "opacity-0" : "opacity-100"
          }`}
        >
          <SpiralAnimation
            onComplete={() => {
              // When spiral finishes, start showing particle text and fade it in
              setShowParticle(true);
              // Optionally allow fade-out transition before unmounting
              setTimeout(() => setHideSpiral(true), 600);
            }}
          />
        </div>
      )}
      {/* Particle text effect: new interactive-text-particle */}
      {showParticle && (
        <div
          className={`fixed inset-0 z-10 transition-opacity duration-1000 bg-black ${
            particleVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <ParticleTextEffect
            text="HOVER"
            className="absolute top-0 left-0"
            colors={["ff6b6b", "feca57", "48dbfb", "1dd1a1"]}
          />
        </div>
      )}
    </div>
  );
}

export default App;
