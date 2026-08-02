"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import type { FaqSection as FaqSectionType } from "@/lib/types";
import { cn } from "@/lib/cn";

export function FaqAccordion({ section }: { section: FaqSectionType }) {
  const faqs = section.faqs ?? [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-4xl">
        {(section.eyebrow || section.title) && (
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            {section.eyebrow && <Badge>{section.eyebrow}</Badge>}
            {section.title && (
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
                {section.title}
              </h2>
            )}
          </div>
        )}

        <div className="divide-y divide-black/10 rounded-3xl border border-black/10 bg-white px-6">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq._id}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="text-lg font-bold text-ink">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-primary transition-transform",
                      open && "rotate-45",
                    )}
                    aria-hidden="true"
                  >
                    <span className="absolute h-0.5 w-4 bg-current" />
                    <span className="absolute h-4 w-0.5 bg-current" />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    open
                      ? "grid-rows-[1fr] pb-6"
                      : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="font-medium text-muted">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
