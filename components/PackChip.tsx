"use client";

import { motion } from "framer-motion";
import { PackType } from "@/lib/data";

export function PackChip({ pack, onClick }: { pack: PackType; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="btn btn-primary"
      onClick={onClick}
    >
      {pack.name}
    </motion.button>
  );
}
