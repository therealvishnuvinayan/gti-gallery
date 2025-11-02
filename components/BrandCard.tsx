"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Brand } from "@/lib/data";

export function BrandCard({ brand, onClick }: { brand: Brand; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="card p-5 text-left"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0 w-14 h-14 rounded-2xl bg-surface-100 grid place-items-center border border-[var(--border)]">
          <Image src={brand.logo} width={40} height={40} alt={`${brand.name} logo`} className="logo-shadow" />
        </div>
        <div>
          <div className="text-lg font-semibold">{brand.name}</div>
          <div className="text-sm text-[var(--muted)]">Tap to view pack formats</div>
        </div>
      </div>
    </motion.button>
  );
}
