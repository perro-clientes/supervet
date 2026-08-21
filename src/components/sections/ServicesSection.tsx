import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SanityImage } from "@/components/ui/SanityImage";
import type { ServicesSection as ServicesSectionType } from "@/lib/types";

export function ServicesSection({ section }: { section: ServicesSectionType }) {
  const services = section.services ?? [];
  const showCtas = section.showCtas !== false;

  return (
    <section className="py-20 md:py-28">
      <Container>
        {(section.title || section.intro) && (
          <div className="relative mx-auto mb-16 flex max-w-3xl flex-col items-center gap-4 text-center">
            <Image
              data-reveal
              src="/shapes/shape-2.png"
              alt=""
              width={50}
              height={50}
              className="animate-wiggle absolute bottom-0 right-0 -z-10 pointer-events-none"
            />
            {section.eyebrow && (
              <p className="text-sm font-bold uppercase tracking-widest text-secondary">
                {section.eyebrow}
              </p>
            )}
            {section.title && (
              <h2
                data-reveal
                className="text-3xl font-extrabold leading-tight tracking-tight text-accent-2 md:text-4xl"
              >
                {section.title}
              </h2>
            )}
            {section.intro && (
              <p data-reveal className="text-xl font-regular text-accent-2">
                {section.intro}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service._id}
              data-reveal="fade"
              className="group flex flex-col overflow-hidden rounded-3xl bg-primary/20"
            >
              <div className="flex flex-1 gap-6 p-8">
                <span className="hidden sm:block shrink-0 h-18 w-18">
                  {service.iconImage?.asset?._ref ? (
                    <SanityImage
                      image={service.iconImage}
                      alt={service.iconImage.alt || service.title || ""}
                      width={24}
                      height={24}
                      unoptimized
                      className="w-full rounded-full object-contain"
                    />
                  ) : (
                    <Icon name="paw" className="h-6 w-6" />
                  )}
                </span>

                <div className="flex flex-col gap-1">
                  <h3 className="text-3xl font-extrabold text-accent-2">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="text-lg font-regular text-accent-2">{service.description}</p>
                  )}
                </div>
              </div>

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
            </article>
          ))}
        </div>

        {showCtas && (section.primaryCta?.href || section.secondaryCta?.href) && (
          <div
            data-reveal
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {section.primaryCta?.href && (
              <Button href={section.primaryCta.href}>
                {section.primaryCta.label || "Contactanos"}
              </Button>
            )}
            {section.secondaryCta?.href && (
              <Button href={section.secondaryCta.href} variant="secondary">
                {section.secondaryCta.label || "Ver todos los servicios"}
              </Button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
