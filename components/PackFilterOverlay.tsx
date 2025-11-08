"use client";

import { PackType } from "@/lib/data";
import { X } from "lucide-react";

type Props = {
  brandName: string;
  packs: PackType[];
  onPick: (pack: PackType) => void;
  onClose: () => void;
};

/**
 * Full-screen white page that lists pack tiles for the current brand.
 * Clicking a tile calls onPick(pack) and leaves the page open so the carousel opens on top.
 * Close button (X) returns to the images grid.
 */
export default function PackFilterOverlay({
  brandName,
  packs,
  onPick,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-[70] bg-white dark:bg-[var(--panel)]">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-[var(--border)] bg-white/90 dark:bg-[var(--panel)]/90 backdrop-blur">
        <div className="container-pro h-16 flex items-center justify-between">
          <div className="text-lg font-semibold">
            Filter – <span className="opacity-70">{brandName}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost"
            aria-label="Close filter"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container-pro py-8">
        {packs.length === 0 ? (
          <div className="text-[var(--muted)]">No packs available.</div>
        ) : (
          <div className="packs-grid">
            {packs.map((p) => (
              <button
                key={p.id}
                className="pack-tile"
                onClick={() => onPick(p)}
                aria-label={`Open ${p.name}`}
              >
                <span className="pack-tile__label">{p.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
