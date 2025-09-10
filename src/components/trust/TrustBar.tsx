import LogoLoop, { type LogoItem } from "@/components/ui/LogoLoop";

// Neutral gray logos using Simple Icons with a fixed color.
const GRAY = "9CA3AF"; // Tailwind neutral-400
const logos: LogoItem[] = [
  { src: `https://cdn.simpleicons.org/react/${GRAY}`, alt: "React", href: "https://react.dev", title: "React" },
  { src: `https://cdn.simpleicons.org/typescript/${GRAY}`, alt: "TypeScript", href: "https://www.typescriptlang.org", title: "TypeScript" },
  { src: `https://cdn.simpleicons.org/tailwindcss/${GRAY}`, alt: "Tailwind CSS", href: "https://tailwindcss.com", title: "Tailwind CSS" },
  { src: `https://cdn.simpleicons.org/vite/${GRAY}`, alt: "Vite", href: "https://vitejs.dev", title: "Vite" },
  { src: `https://cdn.simpleicons.org/framer/${GRAY}`, alt: "Framer Motion", href: "https://www.framer.com/motion/", title: "Framer Motion" },
  { src: `https://cdn.simpleicons.org/greensock/${GRAY}`, alt: "GSAP", href: "https://gsap.com", title: "GSAP" },
  { src: `https://cdn.simpleicons.org/nextdotjs/${GRAY}`, alt: "Next.js", href: "https://nextjs.org", title: "Next.js" },
  { src: `https://cdn.simpleicons.org/nodedotjs/${GRAY}`, alt: "Node.js", href: "https://nodejs.org", title: "Node.js" },
  { src: `https://cdn.simpleicons.org/threedotjs/${GRAY}`, alt: "Three.js", href: "https://threejs.org", title: "Three.js" },
  { src: `https://cdn.simpleicons.org/figma/${GRAY}`, alt: "Figma", href: "https://figma.com", title: "Figma" },
  { src: `https://cdn.simpleicons.org/vercel/${GRAY}`, alt: "Vercel", href: "https://vercel.com", title: "Vercel" },
  { src: `https://cdn.simpleicons.org/netlify/${GRAY}`, alt: "Netlify", href: "https://netlify.com", title: "Netlify" },
  { src: `https://cdn.simpleicons.org/cloudflare/${GRAY}`, alt: "Cloudflare", href: "https://cloudflare.com", title: "Cloudflare" },
  { src: `https://cdn.simpleicons.org/stripe/${GRAY}`, alt: "Stripe", href: "https://stripe.com", title: "Stripe" },
  { src: `https://cdn.simpleicons.org/supabase/${GRAY}`, alt: "Supabase", href: "https://supabase.com", title: "Supabase" },
];

export function TrustBar() {
  return (
    <section className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 pt-10 md:pt-14 pb-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm md:text-base">Built with modern tools</p>
          <div className="flex-1" />
        </div>
      </div>
      {/* Full-bleed logo loop touching screen edges */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <LogoLoop
          logos={logos}
          speed={90}
          direction="left"
          logoHeight={48}
          gap={56}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Tools I build with"
          className=""
        />
      </div>
    </section>
  );
}

export default TrustBar;
