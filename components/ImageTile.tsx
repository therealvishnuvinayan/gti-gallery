"use client";

import Image from "next/image";
import { useState } from "react";
import { BrandImage } from "@/lib/data";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  img: BrandImage;
  onClick: () => void;
};

export function ImageTile({ img, onClick }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative group aspect-box">
      {/* ✅ Ratio wrapper ensures real consistent height (prevents thin skeletons) */}
      <div className="relative w-full aspect-[4/5] rounded-[12px] overflow-hidden">
        {/* ✅ Skeleton appears until image is fully loaded */}
        {!loaded && (
          <Skeleton
            className="absolute inset-0 h-full w-full"
            borderRadius={12}
          />
        )}

        {/* ✅ Actual image */}
        <Image
          src={img.src}
          alt={img.alt}
          fill
          unoptimized
          sizes="(min-width:1280px) 220px, (min-width:768px) 200px, 45vw"
          className={`object-cover rounded-[12px] transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadingComplete={() => setLoaded(true)}
        />
      </div>

      {/* ✅ Entire tile is clickable */}
      <button
        onClick={onClick}
        aria-label={img.alt}
        className="absolute inset-0 z-10"
      />

      {/* ✅ Hover veil */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/10 rounded-[12px] pointer-events-none" />
    </div>
  );
}
