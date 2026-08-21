import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { PetShopSection as PetShopSectionType } from "@/lib/types";

export function PetShopSection({ section }: { section: PetShopSectionType }) {
  const hasBackground = Boolean(section.backgroundImage?.asset?._ref);

  const addressContent = (
    <>
      <Image
        src="/brand/location-icon.svg"
        alt=""
        width={24}
        height={24}
        className="h-12 w-12 shrink-0 rounded-full mr-2"
      />
      <span>{section.address}</span>
    </>
  );

  const addressBlock = section.mapsLink ? (
    <a
      href={section.mapsLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-secondary underline underline-offset-4 transition-colors hover:text-secondary-dark"
    >
      {addressContent}
    </a>
  ) : (
    <div className="inline-flex items-center gap-2 text-secondary">
      {addressContent}
    </div>
  );

  return (
    <section className="py-20 md:py-28 bg-white">
      <Container className="flex flex-col items-center gap-10 bg-white">
        {(section.title || section.subtitle) && (
          <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
            {section.title && (
              <h2
                data-reveal
                className="text-3xl font-extrabold leading-tight tracking-tight text-accent-2 md:text-5xl"
              >
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <p data-reveal className="text-xl font-regular text-accent-2">
                {section.subtitle}
              </p>
            )}
          </div>
        )}

        <div
          data-reveal="fade"
          className="relative w-full overflow-hidden rounded-4xl md:min-h-[500px] flex items-end"
        >
          {hasBackground && (
            <div className="absolute inset-0" aria-hidden>
              <SanityImage
                image={section.backgroundImage!}
                alt=""
                fill
                sizes="(max-width: 1366px) 100vw, 1366px"
                className="object-cover"
              />
            </div>
          )}

          <div data-reveal className="relative p-6 md:p-10">
            <div className="w-full rounded-2xl bg-[#f9f5eb] p-6 shadow-sm md:p-8 lg:w-[50%]">
              {section.cardTitle && (
                <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-accent-2 md:text-3xl">
                  {section.cardTitle}
                </h3>
              )}
              {section.cardSubtitle && (
                <p className="mt-3 whitespace-pre-line text-lg font-medium leading-relaxed text-accent-2">
                  {section.cardSubtitle}
                </p>
              )}
              {section.address && (
                <div className="mt-6 text-base font-extrabold md:text-lg">
                  {addressBlock}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
