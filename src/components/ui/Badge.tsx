import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type BadgeProps = {
  className?: string;
  children: ReactNode;
};

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill bg-cream px-4 py-1.5 text-sm font-semibold text-primary-dark",
        className,
      )}
    >
      {children}
    </span>
  );
}
