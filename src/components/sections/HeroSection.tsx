import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import type { HeroSection as HeroSectionType } from "@/lib/types";
import { cn } from "@/lib/cn";

export function HeroSection({ section }: { section: HeroSectionType }) {
  const hasImage = Boolean(section.image?.asset?._ref);

  return (
    <section className="relative overflow-hidden bg-primary-soft pt-20 md:pt-28">
      <div
        className={cn(
          "grid items-center gap-12 max-w-[1500px] mx-auto",
          hasImage ? "lg:grid-cols-2" : "justify-center text-center",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-6 px-4 pt-16 md:ps-24",
            !hasImage && "max-w-3xl items-center",
          )}
        >
          {section.eyebrow && (
            <p className="text-sm font-bold uppercase tracking-widest text-secondary">
              {section.eyebrow}
            </p>
          )}
          <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-accent-2 md:text-8xl">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="max-w-xl text-xl font-regular text-accent-2">
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
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-4xl md:rounded-tr-none md:rounded-ss-4xl">
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
      </div>
    </section>
  );
}
