"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import type { PackType } from "@/lib/data";

type Props = {
  brandName: string;
  packs: PackType[];
  onPick: (pack: PackType) => void;
  onClose: () => void;
};

export default function PackFilterOverlay({
  brandName,
  packs,
  onPick,
  onClose,
}: Props) {
  const router = useRouter();
  const [themeLogo, setThemeLogo] = useState("/logos/gulbahar-logodark.svg");

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
    const obs = new MutationObserver(updateLogo);
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 z-[70] bg-white dark:bg-[var(--panel)] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="appbar">
        <div className="container-pro h-16 flex items-center">
          <button
            onClick={() => {
              onClose();
              router.push("/");
            }}
            aria-label="Go Home"
            className="cursor-pointer"
          >
            <Image
              src={themeLogo}
              alt="Gulbahar"
              width={120}
              height={32}
              className="h-8 w-auto md:h-10"
              priority
              unoptimized
            />
          </button>
        </div>
      </div>

      {/* Header */}
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

      {/* Scroll content */}
      <div className="grow overflow-auto">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-8">
          {packs.length === 0 ? (
            <div className="text-[var(--muted)]">No packs available.</div>
          ) : (
            <div className="
              grid gap-6 sm:gap-7 lg:gap-8
              grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
              justify-items-center
            ">
              {packs.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onPick(p)}
                  className="
                    w-full max-w-[260px] aspect-square
                    bg-[#111] border border-[#111]
                    grid place-items-center
                    transition-transform duration-150
                    hover:-translate-y-0.5
                  "
                >
                  <span className="text-white font-bold tracking-wider text-sm sm:text-base text-center">
                    {p.name.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
