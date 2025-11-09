"use client";

import Image from "next/image";
import { useState } from "react";
import { BrandImage } from "@/lib/data";

type Props = {
  img: BrandImage;
  onClick: () => void;
};

/**
 * Image tile with CSS skeleton shimmer until the image finishes loading.
 * Fixed square aspect so rows stay aligned while images load.
 */
export function ImageTile({ img, onClick }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="aspect-box relative group">
      {/* Whole-tile clickable */}
      <button
        type="button"
        onClick={onClick}
        aria-label={img.alt}
        className="absolute inset-0 z-10"
      />

      {/* Skeleton */}
      {!loaded && <div className="absolute inset-0 rounded-2xl skeleton" />}

      {/* Image */}
      <div className="relative pointer-events-none" style={{ aspectRatio: "1 / 1" }}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width:1280px) 220px, (min-width:768px) 200px, 45vw"
          className={`object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadingComplete={() => setLoaded(true)}
        />
      </div>

      {/* Hover veil */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/10 pointer-events-none rounded-2xl" />
    </div>
  );
}
