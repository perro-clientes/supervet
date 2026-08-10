"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { TestimonialsSection as TestimonialsSectionType } from "@/lib/types";
import { cn } from "@/lib/cn";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

export function TestimonialsSlider({
  section,
}: {
  section: TestimonialsSectionType;
}) {
  const testimonials = section.testimonials ?? [];
  const [active, setActive] = useState(0);

  if (testimonials.length === 0) return null;
  const current = testimonials[active];

  return (
    <section className="overflow-hidden bg-secondary-light py-20 md:py-28">
      <Container>
        {section.title && (
          <h2 className="mb-12 text-center text-4xl font-extrabold text-accent-2 md:text-6xl max-w-2xl mx-auto">
            {section.title}
          </h2>
        )}

        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-center gap-4">
            {testimonials.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setActive(
                    (active - 1 + testimonials.length) % testimonials.length,
                  )
                }
                aria-label="Testimonio anterior"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white text-secondary transition-colors hover:bg-primary"
              >
                <ChevronIcon direction="left" />
              </button>
            )}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div>
                {current.image?.asset?._ref && (
                  <div className="relative aspect-square w-80 shrink-0 overflow-hidden rounded-3xl md:w-110">
                    <SanityImage
                      image={current.image}
                      alt={current.image.alt || current.author || ""}
                      fill
                      sizes="(max-width: 768px) 160px, 192px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 text-left">
                <blockquote className="text-2xl font-medium text-accent-2 md:text-4xl">
                  “{current.quote}”
                </blockquote>

                <div className="mt-8 flex items-center justify-start gap-3">
                  <span className="text-lg font-extrabold text-ink">
                    {current.author}
                  </span>
                  {current.location && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-muted" aria-hidden="true" />
                      <span className="font-medium text-muted">
                        {current.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {testimonials.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setActive((active + 1) % testimonials.length)
                }
                aria-label="Testimonio siguiente"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white text-secondary transition-colors hover:bg-primary"
              >
                <ChevronIcon direction="right" />
              </button>
            )}
          </div>

          {testimonials.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial._id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Testimonio ${index + 1}`}
                  className={cn(
                    "h-2.5 rounded-full transition-all",
                    index === active
                      ? "w-8 bg-secondary"
                      : "w-2.5 bg-black/15 hover:bg-black/30",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
