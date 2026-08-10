import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { CtaBannerSection as CtaBannerSectionType } from "@/lib/types";
import { cn } from "@/lib/cn";

export function CtaBanner({ section }: { section: CtaBannerSectionType }) {
  const images = (section.images ?? []).slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-secondary-light">
      <Container>
        <div className="bg-secondary rounded-3xl px-8 py-16 md:px-16 md:py-20 flex gap-6 lg:gap-0 items-start lg:items-center justify-between flex-col lg:flex-row">
          {images.length > 0 && (
            <div className="flex items-center">
              {images.map((item, index) => (
                <div key={item._id} className={cn(index > 0 && "-ml-4")}>
                  {item.image?.asset?._ref && (
                    <SanityImage
                      image={item.image}
                      alt={item.image.alt || item.title || ""}
                      width={55}
                      height={55}
                      className="h-30 w-30 md:h-55 md:w-55 rounded-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold md:text-[40px] text-ink">
              Agendá hoy tu consulta para atenderte.
            </h2>

            {section.cta?.href && (
              <Button
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
