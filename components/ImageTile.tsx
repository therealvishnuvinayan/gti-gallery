// components/ImageTile.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import type { BrandImage } from "@/lib/data";

type Props = {
  img: BrandImage;
  onClick: () => void;
};

export function ImageTile({ img, onClick }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative group">
      {/* Square box that defines the tile height */}
      <div className="relative aspect-square overflow-hidden rounded-[12px] border border-black/10 dark:border-white/10">
        {/* Skeleton (above image until it loads) */}
        {!loaded && (
          <div className="absolute inset-0 z-10">
            <Skeleton className="h-full w-full !rounded-[12px]" />
          </div>
        )}

        {/* Image */}
        <Image
          src={img.src}
          alt={img.alt}
          fill
          loading="lazy"
          sizes="(min-width:1280px) 220px, (min-width:768px) 200px, 45vw"
          className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"
            }`}
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Click target */}
      <button
        type="button"
        onClick={onClick}
        aria-label={img.alt}
        className="absolute inset-0"
      />

      {/* Hover veil */}
      <div className="pointer-events-none absolute inset-0 rounded-[12px] bg-black/10 opacity-0 transition group-hover:opacity-100" />
    </div>
  );
}
