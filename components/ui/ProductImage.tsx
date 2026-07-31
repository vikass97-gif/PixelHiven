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

export default function ProductImage({
  src,
  alt,
  fill = true,
  className = "object-cover",
  sizes,
  priority = false,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  // Si l'image charge mal ou est bloquée, on affiche une superbe carte de licence 3D
  if (hasError || !src) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-center text-white select-none">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/30 text-indigo-400 ring-1 ring-indigo-500/40 backdrop-blur-md shadow-lg">
          <span className="text-2xl font-bold">🔑</span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Genuine Digital License
        </span>
        <h4 className="mt-2 line-clamp-2 text-sm font-bold text-slate-100">
          {alt || "Software License"}
        </h4>
        <div className="mt-3 rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
          Instant Key Delivery
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "Digital Software Key"}
      fill={fill}
      sizes={sizes}
      priority={priority}
      unoptimized
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
