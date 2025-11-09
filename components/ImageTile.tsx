// components/ImageTile.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import type { BrandImage } from "@/lib/data";

type Props = { img: BrandImage; onClick: () => void };

export function ImageTile({ img, onClick }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative group">
      {/* Fixed square so the grid doesn’t jump */}
      <div className="relative aspect-square overflow-hidden rounded-[12px] border border-black/10 dark:border-white/10">
        {/* Skeleton sits above until the image finishes */}
        {!loaded && (
          <div className="absolute inset-0 z-10">
            <Skeleton className="h-full w-full !rounded-[12px]" />
          </div>
        )}

        <Image
          key={img.src}               // ensures swap if src changes
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width:1280px) 220px, (min-width:768px) 200px, 45vw"
          decoding="async"
          loading="lazy"
          className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoadingComplete={() => setLoaded(true)}     // <- reliable
          onError={() => setLoaded(true)}               // hide skeleton even on 404
        />
      </div>

      {/* Click target (above image, above skeleton) */}
      <button
        type="button"
        onClick={onClick}
        aria-label={img.alt}
        className="absolute inset-0 z-20"
      />

      {/* Hover veil */}
      <div className="pointer-events-none absolute inset-0 rounded-[12px] bg-black/10 opacity-0 transition group-hover:opacity-100" />
    </div>
  );
}
