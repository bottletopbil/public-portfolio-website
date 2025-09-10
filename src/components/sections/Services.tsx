import { Box, FileText, MonitorSmartphone, Search, Plug, Rocket } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import React from "react";

export function ServicesSection() {
  return (
    <section id="services" className="w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl text-white">Services & Inclusions</h2>
          <p className="text-neutral-400 mt-2">Everything you need to launch confidently.</p>
        </div>
        {/* Force dark variables so cards are black like the screenshot */}
        <div className="dark">
          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:grid-rows-2">
            <GridItem
              area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
              icon={<Box className="h-4 w-4" />}
              title="Design Setup"
              description="Select a modern template and tailor it to your brand."
            />
            <GridItem
              area="md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]"
              icon={<FileText className="h-4 w-4" />}
              title="Copy & Content"
              description="Light copy polish and content placement across key pages."
            />
            <GridItem
              area="md:[grid-area:2/1/3/7] xl:[grid-area:1/9/2/13]"
              icon={<MonitorSmartphone className="h-4 w-4" />}
              title="Responsive Build"
              description="Pixel‑perfect across desktop, tablet, and mobile."
            />
            <GridItem
              area="md:[grid-area:2/7/3/13] xl:[grid-area:2/1/3/5]"
              icon={<Search className="h-4 w-4" />}
              title="SEO Basics"
              description="Meta tags, sitemap, and accessible markup baked in."
            />
            <GridItem
              area="md:[grid-area:3/1/4/7] xl:[grid-area:2/5/3/9]"
              icon={<Plug className="h-4 w-4" />}
              title="Integrations"
              description="Analytics, forms, CMS hooks, and email capture."
            />
            <GridItem
              area="md:[grid-area:3/7/4/13] xl:[grid-area:2/9/3/13]"
              icon={<Rocket className="h-4 w-4" />}
              title="Launch & Handoff"
              description="Deployment setup, domain wiring, and a short video walkthrough."
            />
          </ul>
        </div>
      </div>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <GlowCard radius={20} customSize className="h-full w-full rounded-[20px] bg-neutral-950 p-6">
        <div className="relative flex h-full flex-col justify-between gap-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg bg-muted p-2">{icon}</div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-neutral-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </GlowCard>
    </li>
  );
};

export default ServicesSection;
