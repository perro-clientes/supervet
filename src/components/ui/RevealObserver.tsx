"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not(.is-visible)",
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting && entry.boundingClientRect.bottom >= 0) {
            continue;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
