"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BRANDS, Brand, PackType, HOMEPAGE_SLOGAN } from "@/lib/data";
import { BrandCard } from "@/components/BrandCard";
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
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="container-pro py-10 md:py-14">
        {view === "brands" && (
          <div className="home-split">
            {/* Left: centered slogan */}
            <div className="home-slogan">
              <h1 className="home-slogan-text">{HOMEPAGE_SLOGAN}</h1>
              <p className="home-slogan-sub">Tap a brand to explore pack formats and images.</p>
            </div>

            {/* Center: vertical divider */}
            <div className="home-divider" aria-hidden />

            {/* Right: 2×2 black tiles */}
            <div className="home-tiles">
              {BRANDS.slice(0, 4).map((b) => (
                <button
                  key={b.id}
                  className="brand-tile"
                  onClick={() => { setBrand(b); setView("packs"); }}
                  aria-label={`${b.name} – view pack formats`}
                >
                  <span className="brand-tile__label">{b.name.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === "packs" && brand && (
          <div className="packs-wrap">
            <div className="packs-head">
              <h2 className="packs-title">{brand.name}</h2>
            </div>

            <div className="packs-grid">
              {/* row 1: the real packs */}
              {brand.packs.map((p) => (
                <button
                  key={p.id}
                  className="pack-tile"
                  onClick={() => { setPack(p); setView("images"); }}
                  aria-label={`Open ${p.name}`}
                >
                  <span className="pack-tile__label">{p.name.toUpperCase()}</span>
                </button>
              ))}

              {/* row 2: fill to 8 tiles with brand name (to match mock) */}
              {Array.from({ length: Math.max(0, 8 - brand.packs.length) }).map((_, i) => (
                <button
                  key={`brand-fill-${i}`}
                  className="pack-tile"
                  onClick={() => { /* no-op fill tile */ }}
                  aria-hidden
                  tabIndex={-1}
                >
                  <span className="pack-tile__label">{brand.name.toUpperCase()}</span>
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

            <div className="grid-images grid-images--dense">
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
