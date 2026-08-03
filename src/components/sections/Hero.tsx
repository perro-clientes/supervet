import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { HeroSection as HeroSectionType } from "@/lib/types";
import { cn } from "@/lib/cn";

export function Hero({ section }: { section: HeroSectionType }) {
  const hasImage = Boolean(section.image?.asset?._ref);

  return (
    <section className="relative overflow-hidden bg-primary-soft py-20 md:py-28">
      <Container
        className={cn(
          "grid items-center gap-12",
          hasImage ? "lg:grid-cols-2" : "justify-center text-center",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-6",
            !hasImage && "max-w-3xl items-center",
          )}
        >
          {section.eyebrow && (
            <span className="text-sm font-bold uppercase tracking-widest text-secondary">
              {section.eyebrow}
            </span>
          )}
          <h1 className="text-xl font-extrabold leading-tight tracking-tight text-accent-2 md:text-8xl">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="max-w-xl text-lg font-medium text-muted">
              {section.subtitle}
            </p>
          )}
          {section.cta?.href && (
            <div className="mt-2">
              <Button href={section.cta.href}>{section.cta.label}</Button>
            </div>
          )}
        </div>

        {hasImage && (
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <SanityImage
              image={section.image!}
              alt={section.image?.alt || section.title || ""}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
