"use client";

import Image from "next/image";
import { BrandImage } from "@/lib/data";

type Props = {
  img: BrandImage;
  onClick: () => void;
};

export function ImageTile({ img, onClick }: Props) {
  return (
    <div
      className="
        aspect-box relative group
        transition-opacity
      "
    >
      {/* Click target */}
      <button
        type="button"
        onClick={onClick}
        aria-label={img.alt}
        className="absolute inset-0 z-10"
      />

      {/* Image */}
      <div className="aspect-square relative pointer-events-none">
        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1280px) 220px, (min-width: 768px) 200px, 45vw" className="object-cover" />
      </div>

      {/* Hover veil */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/10 pointer-events-none" />
    </div>
  );
}
