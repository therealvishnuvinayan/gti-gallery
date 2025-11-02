"use client";

import { PackType } from "@/lib/data";

export function PackChip({
  pack,
  onClick,
}: {
  pack: PackType;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Select ${pack.name}`}
      className="
        btn btn-primary
        transform-gpu transition-transform duration-150 ease-out
        hover:-translate-y-0.5 active:scale-95
      "
    >
      {pack.name}
    </button>
  );
}
