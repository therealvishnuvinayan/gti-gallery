"use client";

import Image from "next/image";
import { useState } from "react";
import type { BrandImage } from "@/lib/data";

type Props = {
  img: BrandImage;
  onClick: () => void;
};

export function ImageTile({ img, onClick }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="aspect-box relative group bg-[var(--panel)]"
      aria-busy={!loaded && !failed}
    >
      {/* full-tile click target */}
      <button
        type="button"
        onClick={onClick}
        aria-label={img.alt}
        className="absolute inset-0 z-10"
      />

      {/* skeleton shimmer until the image finishes */}
      {!loaded && !failed && (
        <div className="absolute inset-0 rounded-2xl skeleton">
          {/* optional subtle “caption bar” shimmer to feel like content */}
          <div className="absolute left-3 right-3 bottom-3 h-3 rounded-md bg-black/5 dark:bg-white/10" />
        </div>
      )}

      {/* actual image */}
      <div className="aspect-square relative pointer-events-none">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          loading="lazy"
          sizes="(min-width:1280px) 220px, (min-width:768px) 200px, 45vw"
          className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"
            }`}
          onLoadingComplete={() => setLoaded(true)}
          onError={() => setFailed(true)}
          // keep Next from reserving extra space when intrinsic is unknown
          priority={false}
        />
      </div>

      {/* hover veil */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/10 pointer-events-none" />
    </div>
  );
}
