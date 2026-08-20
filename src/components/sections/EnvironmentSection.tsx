import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import Image from "next/image";
import type { EnvironmentSection as EnvironmentSectionType } from "@/lib/types";

export function EnvironmentSection({
  section,
}: {
  section: EnvironmentSectionType;
}) {
  const hasImage = Boolean(section.image?.asset?._ref);

  return (
    <section className="bg-secondary-light py-20 md:py-28">
      <Container className="flex flex-col items-center gap-10 text-center">
        {(section.title || section.subtitle) && (
          <div className="flex max-w-3xl flex-col items-center gap-4">
            {section.eyebrow && (
              <p className="text-sm font-bold uppercase tracking-widest text-secondary">
                {section.eyebrow}
              </p>
            )}
            {section.title && (
              <h2 className="relative text-3xl font-extrabold leading-tight tracking-tight text-accent-2 md:text-6xl">
                <Image
                  src="/shapes/shape-13.png"
                  alt=""
                  width={80}
                  height={80}
                  className="absolute top-[-50] right-0 pointer-events-none"
                />
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <p className="text-xl font-regular text-accent-2">
                {section.subtitle}
              </p>
            )}
          </div>
        )}

        {hasImage && (
          <div className="relative aspect-[2/1] w-full max-w-[1200px] overflow-hidden rounded-4xl">
            <SanityImage
              image={section.image!}
              alt={section.image?.alt || section.title || ""}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
