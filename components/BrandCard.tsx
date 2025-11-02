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
        card w-full p-5 md:p-6 text-left
        transform-gpu will-change-transform
        transition-transform duration-150 ease-out
        hover:-translate-y-0.5 hover:shadow-xl/30
      "
      aria-label={`${brand.name} – view pack formats`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* single avatar pill (no nested duplications) */}
          <div
            className="
              shrink-0 w-16 h-16 rounded-2xl grid place-items-center
              text-white font-semibold tracking-tight
              bg-gradient-to-br from-blue-500 to-blue-600
              shadow-sm
            "
            aria-hidden
          >
            {brand.name.slice(0, 6)}
          </div>

          <div>
            <div className="text-lg font-semibold">{brand.name}</div>
            <div className="text-sm text-[var(--muted)]">
              Tap to view pack formats
            </div>
          </div>
        </div>

        {/* subtle affordance */}
        <svg
          className="w-5 h-5 text-[var(--muted)] mr-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </button>
  );
}
