import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { PhotoGridSection as PhotoGridSectionType } from "@/lib/types";

export function PhotoGrid({ section }: { section: PhotoGridSectionType }) {
  const photos = section.photos ?? [];

  if (photos.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <Container>
        {section.title && (
          <h2
            data-reveal
            className="mb-12 text-center text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl"
          >
            {section.title}
          </h2>
        )}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {photos.map((photo, index) => (
            <div
              key={index}
              data-reveal="fade"
              className={
                index === 0
                  ? "relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl md:row-span-2"
                  : "relative aspect-square overflow-hidden rounded-2xl"
              }
            >
              <SanityImage
                image={photo}
                alt={photo.alt || ""}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
