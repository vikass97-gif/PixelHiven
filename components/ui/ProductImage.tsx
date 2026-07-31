"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80";

export default function ProductImage({
  src,
  alt,
  fill = true,
  className = "object-cover",
  sizes,
  priority = false,
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);

  return (
    <Image
      src={imgSrc}
      alt={alt || "Digital Product"}
      fill={fill}
      sizes={sizes}
      priority={priority}
      unoptimized
      className={className}
      onError={() => {
        if (imgSrc !== FALLBACK_IMAGE) {
          setImgSrc(FALLBACK_IMAGE);
        }
      }}
    />
  );
}
