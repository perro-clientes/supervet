import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SanityImage } from "@/components/ui/SanityImage";
import type { ServicesSection as ServicesSectionType } from "@/lib/types";

export function ServicesGrid({ section }: { section: ServicesSectionType }) {
  const services = section.services ?? [];

  return (
    <section className="py-20 md:py-28">
      <Container>
        {(section.eyebrow || section.title || section.intro) && (
          <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center gap-4 text-center">
            {section.eyebrow && <Badge>{section.eyebrow}</Badge>}
            {section.title && (
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
                {section.title}
              </h2>
            )}
            {section.intro && (
              <p className="text-lg font-medium text-muted">{section.intro}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service._id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              {service.image?.asset?._ref && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <SanityImage
                    image={service.image}
                    alt={service.image.alt || service.title || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-3 p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-secondary">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-bold text-ink">
                    {service.title}
                  </h3>
                </div>
                {service.description && (
                  <p className="font-medium text-muted">{service.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
