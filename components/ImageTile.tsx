"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BrandImage } from "@/lib/data";

export function ImageTile({ img, onClick }: { img: BrandImage; onClick: () => void }) {
  return (
    <motion.button
      className="group aspect-box"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative">
        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 300px, 40vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/10" />
    </motion.button>
  );
}
