"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BRANDS, Brand, PackType } from "@/lib/data";
import { BrandCard } from "@/components/BrandCard";
import { PackChip } from "@/components/PackChip";
import { ImageTile } from "@/components/ImageTile";
import { CarouselModal } from "@/components/CarouselModal";
import { ChevronLeft, Layers } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

type View = "brands" | "packs" | "images";

export default function Page() {
  const [view, setView] = useState<View>("brands");
  const [brand, setBrand] = useState<Brand | null>(null);
  const [pack, setPack] = useState<PackType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [themeLogo, setThemeLogo] = useState("/logos/gulbahar-logodark.svg");

  const onBack = () => {
    if (view === "images") { setView("packs"); setPack(null); return; }
    if (view === "packs") { setView("brands"); setBrand(null); return; }
  };

  // keep logo in sync with theme (default is light)
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
    <main className="min-h-screen">
      {/* App Bar */}
      <div className="appbar">
        <div className="container-pro h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {view !== "brands" && (
              <button className="btn btn-ghost" onClick={onBack} aria-label="Back">
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
            <div className="pl-1">
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

          <div className="flex items-center gap-2">
            <span className="badge hidden sm:inline-flex">
              <Layers className="w-4 h-4" /> {view.toUpperCase()}
            </span>
            {brand && <span className="badge">{brand.name}</span>}
            {pack && <span className="badge">{pack.name}</span>}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="container-pro py-10 md:py-14">
        {view === "brands" && (
          <div>
            <div className="mb-8 md:mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Choose your brand
              </h1>
              <p className="text-[var(--muted)] mt-2">
                Tap a card to explore pack formats.
              </p>
            </div>

            {/* Vertical list */}
            <div className="flex flex-col gap-4 w-full max-w-sm mx-auto pt-4">
              {BRANDS.map((b) => (
                <BrandCard
                  key={b.id}
                  brand={b}
                  onClick={() => { setBrand(b); setView("packs"); }}
                />
              ))}
            </div>
          </div>
        )}

        {view === "packs" && brand && (
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                {brand.name}
              </h2>
              <p className="text-[var(--muted)] mt-2">
                Choose your Pack Type
              </p>
            </div>

            {/* Card style list like brand selection */}
            <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
              {brand.packs.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setPack(p); setView("images"); }}
                  className="
            card p-5 text-left flex items-center justify-between
            transform-gpu transition hover:-translate-y-0.5 hover:shadow-lg
          "
                >
                  <span className="text-lg font-medium">{p.name}</span>
                  <span className="text-[var(--muted)]">{">"}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === "images" && brand && pack && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {pack.name}
              </h2>
              <p className="text-[var(--muted)] mt-2">{brand.name}</p>
            </div>

            <div className="grid-images">
              {pack.images.map((img, idx) => (
                <ImageTile
                  key={img.id}
                  img={img}
                  onClick={() => { setSelectedIndex(idx); setIsOpen(true); }}
                />
              ))}
            </div>

            <CarouselModal
              title={`${brand.name} — ${pack.name}`}
              images={pack.images}
              isOpen={isOpen}
              startIndex={selectedIndex}
              onClose={() => setIsOpen(false)}
            />
          </div>
        )}
      </section>
    </main>
  );
}
