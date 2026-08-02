import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Section({ as, className, children }: SectionProps) {
  const Tag = as ?? "section";
  return (
    <Tag className={cn("py-20 md:py-28", className)}>{children}</Tag>
  );
}
