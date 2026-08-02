"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";
import type { TestimonialsSection as TestimonialsSectionType } from "@/lib/types";
import { cn } from "@/lib/cn";

function Star() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-accent"
    >
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.7 1.2 6.6-5.9-3.1-5.9 3.1 1.2-6.6L2.5 9.4l6.6-.9 2.9-6z" />
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
    <section className="overflow-hidden bg-cream-soft py-20 md:py-28">
      <Container>
        {section.title && (
          <h2 className="mb-12 text-center text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
            {section.title}
          </h2>
        )}

        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm md:p-12">
            <div className="mb-6 flex justify-center gap-1">
              {Array.from({ length: current.rating ?? 5 }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>
            <blockquote className="text-2xl font-bold leading-snug text-ink md:text-3xl">
              “{current.quote}”
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
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
                      ? "w-8 bg-primary"
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
