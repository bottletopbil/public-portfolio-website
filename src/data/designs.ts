export type DesignCategory = "Startups" | "Creatives" | "Small Business" | "Agencies";

export type Design = {
  id: string;
  title: string;
  category: DesignCategory;
  url: string; // live site or demo link
  thumbnail: string; // image url or import path
  tags?: string[];
  description?: string;
  status?: "live" | "wip";
};

// Replace these with your real projects. Add new entries here only —
// the UI updates automatically without code changes.
export const designs: Design[] = [
  {
    id: "innovator",
    title: "The Innovator",
    category: "Startups",
    url: "https://your-innovator-site.com",
    thumbnail:
      "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1600&h=900&fit=crop&crop=entropy&auto=format&q=80",
    tags: ["Fast", "Minimal", "Launch-ready"],
    description: "Bold hero, clear value prop, and conversion-focused layout.",
    status: "live",
  },
  {
    id: "minimalist",
    title: "The Minimalist",
    category: "Creatives",
    url: "https://your-minimalist-site.com",
    thumbnail:
      "https://images.unsplash.com/photo-1611162616675-c701a99a8b5b?w=1600&h=900&fit=crop&crop=entropy&auto=format&q=80",
    tags: ["Portfolio", "Clean", "Editorial"],
    description: "Whitespace-driven grid with elegant typography.",
    status: "live",
  },
  {
    id: "professional",
    title: "The Professional",
    category: "Small Business",
    url: "https://your-professional-site.com",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop&crop=entropy&auto=format&q=80",
    tags: ["Services", "Trust", "SEO"],
    description: "Service pages with contact-focused CTAs and trust cues.",
    status: "live",
  },
  {
    id: "agency",
    title: "The Agency",
    category: "Agencies",
    url: "https://your-agency-site.com",
    thumbnail:
      "https://images.unsplash.com/photo-1529336953121-ad421b39be8c?w=1600&h=900&fit=crop&crop=entropy&auto=format&q=80",
    tags: ["Case studies", "Team", "Credibility"],
    description: "Case-study forward layout with strong social proof slots.",
    status: "live",
  },
];

