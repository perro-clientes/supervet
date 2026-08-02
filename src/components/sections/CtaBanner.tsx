import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { CtaBannerSection as CtaBannerSectionType } from "@/lib/types";

export function CtaBanner({ section }: { section: CtaBannerSectionType }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-white md:px-16 md:py-20">
          {section.image?.asset?._ref && (
            <div className="absolute inset-0 opacity-20">
              <SanityImage
                image={section.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="relative flex flex-col items-center gap-4 text-center">
            <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {section.title}
              {section.subtitle && (
                <>
                  {" "}
                  <span className="block text-2xl font-semibold text-white/90 md:text-3xl">
                    {section.subtitle}
                  </span>
                </>
              )}
            </h2>
            {section.cta?.href && (
              <div className="mt-4">
                <Button
                  href={section.cta.href}
                  className="bg-white text-primary hover:bg-cream hover:border-cream"
                >
                  {section.cta.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
