"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { GallerySection as GallerySectionType } from "@/lib/types";

export function GalleryLightbox({ section }: { section: GallerySectionType }) {
  const images = section.images ?? [];
  const [selected, setSelected] = useState<number | null>(null);

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
            {section.eyebrow && <Badge>{section.eyebrow}</Badge>}
            {section.title && (
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
                {section.title}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((item, index) => (
            <button
              key={item._id}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`Ampliar imagen ${index + 1}: ${item.title || "Galería"}`}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              {item.image?.asset?._ref && (
                <SanityImage
                  image={item.image}
                  alt={item.image.alt || item.title || ""}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </button>
          ))}
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
