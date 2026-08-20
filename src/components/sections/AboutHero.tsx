import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { AboutHeroSection as AboutHeroSectionType } from "@/lib/types";
import { cn } from "@/lib/cn";

const backgroundClasses: Record<string, string> = {
  white: "bg-white",
  "primary-soft": "bg-primary-soft",
  "secondary-light": "bg-secondary-light",
  "accent-3": "bg-accent-3",
  primary: "bg-primary",
};

const imageSizeClasses = ["w-120", "w-80", "w-90", "w-60"];

export function AboutHero({ section }: { section: AboutHeroSectionType }) {
  const images = section.images?.filter((item) => item.image?.asset?._ref) ?? [];

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-20 md:pt-28",
        backgroundClasses[section.backgroundColor ?? "primary-soft"] ??
        "bg-primary-soft",
      )}
    >
      <Container>
        <div className=" mx-auto flex max-w-6xl flex-col items-center gap-8 pb-10 pt-16 text-center md:pb-16">
          <h1 className="relative text-6xl font-extrabold leading-tight tracking-tight text-accent-2 md:text-8xl">
            {section.title}
            <Image
              src="/shapes/shape-4.png"
              alt=""
              width={100}
              height={100}
              className="absolute top-[-20] right-[-100] -z-10 pointer-events-none"
            />
            <Image
              src="/shapes/shape-8.png"
              alt=""
              width={100}
              height={100}
              className="absolute top-[-20] left-[-80] -z-10 pointer-events-none"
            />
          </h1>
          {section.subtitle && (
            <p className="max-w-3xl text-xl font-regular text-accent-2">
              {section.subtitle}
            </p>
          )}
        </div>

        {images.length > 0 && (
          <div className="hidden flex-row flex-nowrap items-center justify-center gap-8 pb-10 lg:flex">
            {images.slice(0, 4).map((item, index) => (
              <div
                key={item._key || index}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-4xl",
                  imageSizeClasses[index % imageSizeClasses.length],
                )}
              >
                <SanityImage
                  image={item.image!}
                  alt={item.image?.alt || section.title || ""}
                  fill
                  sizes="(max-width: 1024px) 0px, 832px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
