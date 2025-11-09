"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { PackType } from "@/lib/data";

type Props = {
  brandName: string;
  packs: PackType[];
  onPick: (pack: PackType) => void; // parent decides whether to open a page/carousel
  onClose: () => void;
};

/**
 * Full-screen overlay for choosing a Pack within a Brand.
 * - Top appbar shows the GTI logo only (same height as site appbar).
 * - Below the appbar, a header row shows "Filter — {brand}" on the left and a Close button on the right.
 * - Grid of black square pack tiles follows.
 */
export default function PackFilterOverlay({
  brandName,
  packs,
  onPick,
  onClose,
}: Props) {
  const [themeLogo, setThemeLogo] = useState("/logos/gulbahar-logodark.svg");

  // Keep logo in sync with current theme (light/dark) like the rest of the app
  useEffect(() => {
    const updateLogo = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setThemeLogo(
        theme === "dark"
          ? "/logos/gulbahar-logolight.png"
          : "/logos/gulbahar-logodark.svg"
      );
    };
    updateLogo();
    const observer = new MutationObserver(updateLogo);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 z-[70] bg-white dark:bg-[var(--panel)] flex flex-col">
      {/* ── Top appbar with ONLY the GTI logo (no text/close here) ───────────── */}
      <div className="appbar">
        <div className="container-pro h-16 flex items-center">
          <Image
            src={themeLogo}
            alt="Gulbahar"
            width={120}
            height={32}
            className="h-8 w-auto md:h-10"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* ── Header row BELOW the appbar ────────────────────────────────────── */}
      <div className="border-b border-[var(--border)]">
        <div className="container-pro h-14 flex items-center justify-between">
          <div className="text-base md:text-lg font-semibold">
            Filter — <span className="opacity-70">{brandName}</span>
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

      {/* ── Content: pack tiles ────────────────────────────────────────────── */}
      <div className="container-pro py-8 grow">
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
                <span className="pack-tile__label">{p.name.toUpperCase()}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
