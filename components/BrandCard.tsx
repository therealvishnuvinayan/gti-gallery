"use client";

import { Brand } from "@/lib/data";

export function BrandCard({
  brand,
  onClick,
}: {
  brand: Brand;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        card p-5 text-left
        transform-gpu will-change-transform
        transition-transform duration-150 ease-out
        hover:-translate-y-0.5 hover:scale-[1.01]
      "
      aria-label={`${brand.name} – view pack formats`}
    >
      <div className="flex items-center gap-4">
        {/* icon / doodle */}
        <div
          className="
            shrink-0 w-16 h-16 rounded-2xl
            grid place-items-center
            border border-[var(--border)]
            bg-white dark:bg-white/5
          "
        >
          {/* Auto-avatar from brand name */}
          <div
            className="
    shrink-0 w-16 h-16 rounded-2xl grid place-items-center
    text-white font-semibold 
    bg-gradient-to-br from-blue-500 to-blue-600
    border border-[var(--border)]
  "
          >
            {brand.name.slice(0, 6)}
          </div>

        </div>

        {/* text */}
        <div>
          <div className="text-lg font-semibold">{brand.name}</div>
          <div className="text-sm text-[var(--muted)]">
            Tap to view pack formats
          </div>
        </div>
      </div>
    </button>
  );
}
