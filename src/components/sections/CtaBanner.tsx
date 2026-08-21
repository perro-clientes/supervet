import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { CtaBannerSection as CtaBannerSectionType } from "@/lib/types";
import { cn } from "@/lib/cn";

export function CtaBanner({ section }: { section: CtaBannerSectionType }) {
  const images = (section.images ?? []).slice(0, 3);
  const hasBackground = Boolean(section.image?.asset?._ref);

  return (
    <section className="py-20 md:py-28 bg-secondary-light">
      <Container>
        <div className="relative overflow-hidden bg-secondary rounded-3xl px-8 py-16 md:px-16 md:py-20 flex gap-6 lg:gap-0 items-start lg:items-center justify-between flex-col lg:flex-row">
          {hasBackground && (
            <div data-reveal="fade" className="absolute inset-0" aria-hidden>
              <SanityImage
                image={section.image!}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-secondary/80" />
            </div>
          )}

          {images.length > 0 && (
            <div
              data-reveal="fade"
              className="relative z-10 flex items-center"
            >
              {images.map((item, index) => (
                <div key={item._id} className={cn(index > 0 && "-ml-4")}>
                  {item.image?.asset?._ref && (
                    <SanityImage
                      image={item.image}
                      alt={item.image.alt || item.title || ""}
                      width={220}
                      height={220}
                      className="h-30 w-30 md:h-55 md:w-55 rounded-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="relative z-10 max-w-lg">
            <h2
              data-reveal
              className="text-3xl font-extrabold md:text-[40px] text-ink"
            >
              {section.title}
            </h2>

            {section.subtitle && (
              <p data-reveal className="mt-3 text-lg font-medium text-ink/80">
                {section.subtitle}
              </p>
            )}

            {section.cta?.href && (
              <Button
                data-reveal
                href={section.cta.href}
                className="mt-6 bg-secondary-dark"
              >
                {section.cta.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
