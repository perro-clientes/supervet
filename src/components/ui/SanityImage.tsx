import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/lib/types";

type SanityImageProps = {
  image: SanityImage;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
};

export function SanityImage({
  image,
  alt,
  className,
  fill,
  width,
  height,
  priority,
  sizes,
  quality = 80,
}: SanityImageProps) {
  const src = urlFor(image).width(fill ? 2000 : (width ?? 800) * 2).url();
  const altText = alt || image.alt || "";

  if (fill) {
    return (
      <Image
        src={src}
        alt={altText}
        fill
        priority={priority}
        sizes={sizes}
        quality={quality}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={altText}
      width={width ?? 800}
      height={height ?? 600}
      priority={priority}
      sizes={sizes}
      quality={quality}
      className={className}
    />
  );
}
