"use client";

import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { GalleryImage, GallerySection as GallerySectionType } from "@/lib/types";

type Span = "wide" | "big" | "square";

function getSpan(image: GalleryImage): Span {
  const ratio = image.aspectRatio ?? 1;
  if (ratio >= 1.15) return "wide";
  if (ratio <= 0.9) return "big";
  return "square";
}

const spanClass: Record<Span, string> = {
  wide: "col-span-2 aspect-[2/1]",
  big: "col-span-2 row-span-2 aspect-square",
  square: "aspect-square",
};

const spanSizes: Record<Span, string> = {
  wide: "(max-width: 768px) 100vw, 50vw",
  big: "(max-width: 768px) 100vw, 50vw",
  square: "(max-width: 768px) 50vw, 25vw",
};

export function GallerySection({ section }: { section: GallerySectionType }) {
  const images = useMemo(() => section.images ?? [], [section.images]);
  const [selected, setSelected] = useState<number | null>(null);

  // Los tiles se reordenan por proporción para llenar la grilla bento sin
  // huecos. Cada celda conserva su índice original para el lightbox.
  const cells = useMemo(() => {
    const buckets: Record<Span, number[]> = { wide: [], big: [], square: [] };
    images.forEach((image, index) => buckets[getSpan(image)].push(index));
    const order = [...buckets.wide, ...buckets.big, ...buckets.square];
    return order.map((index) => ({ index, span: getSpan(images[index]) }));
  }, [images]);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight")
        setSelected((v) =>
          v === null ? v : (v + 1) % Math.max(images.length, 1),
        );
      if (event.key === "ArrowLeft")
        setSelected((v) =>
          v === null ? v : (v - 1 + images.length) % Math.max(images.length, 1),
        );
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, images.length]);

  if (images.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <Container>
        {(section.eyebrow || section.title) && (
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            {section.eyebrow && (
              <p className="text-sm font-bold uppercase tracking-widest text-secondary">
                {section.eyebrow}
              </p>
            )}
            {section.title && (
              <h2
                data-reveal
                className="text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl"
              >
                {section.title}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {cells.map(({ index, span }) => {
            const item = images[index];
            return (
              <button
                key={item._id}
                type="button"
                data-reveal="fade"
                onClick={() => setSelected(index)}
                aria-label={`Ampliar imagen ${index + 1}: ${item.title || "Galería"}`}
                className={`group relative overflow-hidden rounded-2xl ${spanClass[span]}`}
              >
                {item.image?.asset?._ref && (
                  <SanityImage
                    image={item.image}
                    alt={item.image.alt || item.title || ""}
                    fill
                    sizes={spanSizes[span]}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </button>
            );
          })}
        </div>
      </Container>

      {selected !== null && images[selected]?.image?.asset?._ref && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <SanityImage
                image={images[selected].image!}
                alt={images[selected].image?.alt || images[selected].title || ""}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-white">
              <div>
                <p className="text-lg font-bold">
                  {images[selected].title}
                </p>
                {images[selected].category && (
                  <p className="text-sm text-white/70">
                    {images[selected].category}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelected(
                      (selected - 1 + images.length) % images.length,
                    )
                  }
                  className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/25"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={() => setSelected((selected + 1) % images.length)}
                  className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/25"
                >
                  Siguiente
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/25"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
