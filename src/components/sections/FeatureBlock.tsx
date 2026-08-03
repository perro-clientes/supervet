import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SanityImage } from "@/components/ui/SanityImage";
import type { FeatureBlockSection as FeatureBlockSectionType } from "@/lib/types";
import { cn } from "@/lib/cn";

export function FeatureBlock({
  section,
  index = 0,
}: {
  section: FeatureBlockSectionType;
  index?: number;
}) {
  const hasImage = Boolean(section.image?.asset?._ref);
  const reversed = index % 2 === 1;

  return (
    <section className="py-10 md:py-14">
      <Container>
        <div
          className={cn(
            "grid items-center gap-10",
            hasImage && "lg:grid-cols-2",
            !hasImage && "justify-center text-center",
          )}
        >
          {hasImage && (
            <div
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-3xl",
                reversed && "lg:order-last",
              )}
            >
              <SanityImage
                image={section.image!}
                alt={section.image?.alt || section.title || ""}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}

          <div
            className={cn(
              "flex flex-col gap-4",
              !hasImage && "max-w-2xl items-center",
            )}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white">
              <Icon name={section.icon} className="h-7 w-7" />
            </span>
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink md:text-3xl">
              {section.title}
            </h2>
            {section.description && (
              <p className="whitespace-pre-line text-lg font-medium leading-relaxed text-muted">
                {section.description}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
