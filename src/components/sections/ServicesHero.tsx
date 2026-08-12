import { Container } from "@/components/ui/Container";
import type { ServicesHeroSection as ServicesHeroSectionType } from "@/lib/types";

export function ServicesHero({
  section,
}: {
  section: ServicesHeroSectionType;
}) {
  return (
    <section className="bg-white pt-28 md:pt-36">
      <Container>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 pb-16 pt-10 text-center md:pb-24">
          {section.title && (
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-accent-2 md:text-6xl">
              {section.title}
            </h1>
          )}

          {section.subtitle && (
            <p className="max-w-3xl text-xl font-regular text-accent-2">
              {section.subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
