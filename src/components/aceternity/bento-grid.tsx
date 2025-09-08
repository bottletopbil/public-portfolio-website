import React from "react";

type BentoGridProps = {
  children: React.ReactNode;
  className?: string;
};

export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div
      className={
        "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto " +
        className
      }
    >
      {children}
    </div>
  );
}

type BentoCardProps = {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

export function BentoCard({ title, description, className = "", children }: BentoCardProps) {
  return (
    <div
      className={
        "rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-3 " +
        className
      }
    >
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}

