import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { TextSection as TextSectionType } from "@/lib/types";
import { cn } from "@/lib/cn";

const backgroundClasses: Record<string, string> = {
  white: "bg-white",
  "primary-soft": "bg-primary-soft",
  "secondary-light": "bg-secondary-light",
  "accent-3": "bg-accent-3",
  primary: "bg-primary",
};

export function TextSection({ section }: { section: TextSectionType }) {
  const hasImage = Boolean(section.image?.asset?._ref);
  const hasBackgroundImage = Boolean(section.backgroundImage?.asset?._ref);
  const imageLeft = section.imageSide !== "right";

  const imageBlock = hasImage && (
    <div className="w-full lg:w-1/2">
      <div className="relative aspect-square overflow-hidden rounded-4xl">
        <SanityImage
          image={section.image!}
          alt={section.image?.alt || section.title || ""}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );

  const textBlock = (
    <div
      className={cn(
        "relative flex w-full flex-col gap-6",
        hasImage ? "lg:w-1/2" : "lg:max-w-3xl lg:items-center lg:text-center",
      )}
    >

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
            className="absolute top-[-50] right-0  pointer-events-none"
          />
          {section.title}
        </h2>
      )}
      {section.subtitle && (
        <p className="text-xl font-regular text-accent-2">{section.subtitle}</p>
      )}
      {section.cta?.href && (
        <div className="mt-2">
          <Button href={section.cta.href} variant="primary">
            {section.cta.label}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 md:py-28",
        backgroundClasses[section.backgroundColor ?? "white"] ??
        "bg-white",
      )}
    >
      {hasBackgroundImage && (
        <div className="absolute inset-0" aria-hidden>
          <SanityImage
            image={section.backgroundImage!}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-soft" />
        </div>
      )}

      <Container className="relative">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          {imageLeft ? (
            <>
              {imageBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {imageBlock}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
