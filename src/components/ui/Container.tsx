import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Container({ as, className, children }: ContainerProps) {
  const Tag = as ?? "div";
  return (
    <Tag className={cn("mx-auto w-full max-w-container px-6", className)}>
      {children}
    </Tag>
  );
}
