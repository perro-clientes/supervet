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
          <div className="mb-12 flex flex-col items-center text-center max-w-[600px] mx-auto">
            <p className="text-lg font-regular text-black/50">Preguntas frecuentes</p>
            {section.title && (
              <h2 className="text-4xl font-medium leading-tight tracking-tight text-accent-2 md:text-6xl">
                {section.title}
              </h2>
            )}
          </div>
        )}

        <div className="">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq._id} className="border rounded-2xl mb-4 p-6 md:px-8 md:py-10">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="text-xl font-bold text-accent-2 md:text-2xl mb-4">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "relative flex h-8 w-8 shrink-0 items-center justify-center text-accent-2 transition-transform",
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
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-xl font-regular text-accent-2 max-w-[1200px]">{faq.answer}</p>
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
