import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  sectionId?: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}

export function SectionWrapper({
  sectionId,
  className,
  children,
  dark = false,
}: SectionWrapperProps) {
  return (
    <section
      id={sectionId}
      className={cn(
        "py-20 lg:py-28 relative overflow-hidden transition-colors",
        dark ? "bg-card/40 dark:bg-card/25" : "bg-transparent",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
}
