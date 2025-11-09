// app/page.tsx (or wherever this file lives)
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  BRANDS,
  Brand,
  PackType,
  HOMEPAGE_SLOGAN,
  BrandImage,
} from "@/lib/data";
import { ImageTile } from "@/components/ImageTile";
import CarouselModal from "@/components/CarouselModal";
import PackFilterOverlay from "@/components/PackFilterOverlay";
import { ChevronLeft, Filter, Sparkles } from "lucide-react";
import { HeroBlock } from "@/components/HeroBlock";

type View = "brands" | "images" | "packImages";

export default function Page() {
  const [view, setView] = useState<View>("brands");
  const [brand, setBrand] = useState<Brand | null>(null);
  const [currentPack, setCurrentPack] = useState<PackType | null>(null);

  // carousel
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState<BrandImage[]>([]);

  // full-screen filter
  const [showPackFilter, setShowPackFilter] = useState(false);

  const [themeLogo, setThemeLogo] = useState("/logos/gulbahar-logodark.svg");

  // merge all images of a brand
  const mergedImages: BrandImage[] = useMemo(() => {
    if (!brand) return [];
    return brand.packs.flatMap((p) => p.images);
  }, [brand]);

  // open carousel for ALL brand images
  const openCarouselAll = (idx: number) => {
    setCarouselImages(mergedImages);
    setSelectedIndex(idx);
    setIsOpen(true);
  };

  // open carousel for CURRENT PACK images
  const openCarouselPack = (idx: number) => {
    if (!currentPack) return;
    setCarouselImages(currentPack.images);
    setSelectedIndex(idx);
    setIsOpen(true);
  };

  const goBrands = () => {
    setView("brands");
    setBrand(null);
    setCurrentPack(null);
    setShowPackFilter(false);
  };

  const goImages = (nextBrand: Brand) => {
    setBrand(nextBrand);
    setView("images");
    setCurrentPack(null);
    setShowPackFilter(false);
  };

  const goPackImages = (p: PackType) => {
    setCurrentPack(p);
    setView("packImages");
    setShowPackFilter(false);
  };

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
      {/* Global AppBar: logo only */}
      <div className="appbar">
        <div className="container-pro h-16 flex items-center justify-between">
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
          {/* intentionally empty right side */}
          <div />
        </div>
      </div>

      <section className="container-pro py-8 md:py-10">
        {/* Inline page header with Back + Title + Filter (when applicable) */}
        {view !== "brands" && (
          <div className="mb-6 flex items-center justify-between gap-4">
            <button
              className="btn btn-ghost"
              onClick={view === "packImages" ? () => setView("images") : goBrands}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="flex-1 min-w-0 px-2">
              {view === "images" && brand && (
                <>
                  <h2 className="text-2xl md:text-3xl font-semibold truncate">
                    {brand.name}
                  </h2>
                  <p className="text-[var(--muted)] mt-1">All images</p>
                </>
              )}
              {view === "packImages" && brand && currentPack && (
                <>
                  <h2 className="text-2xl md:text-3xl font-semibold truncate">
                    {brand.name} — {currentPack.name}
                  </h2>
                  <p className="text-[var(--muted)] mt-1">Pack images</p>
                </>
              )}
            </div>

            {/* Filter only on images/packImages and only when packs exist */}
            {brand && brand.packs?.length > 0 && (
              <button
                type="button"
                onClick={() => setShowPackFilter(true)}
                title="Filter by pack"
                className="p-1 hover:opacity-70 transition"
                aria-label="Open pack filter"
              >
                <div className="flex items-center gap-1">
                  <Filter className="w-5 h-5" strokeWidth={2.2} />
                  <span className="text-sm font-medium hidden sm:inline">Filter by pack</span>
                </div>
              </button>
            )}
          </div>
        )}

        {/* BRANDS (home) */}
        {view === "brands" && (
          <div className="home-split">
            {/* NEW HERO */}
            <HeroBlock />

            <div className="home-divider" />

            <div className="home-tiles">
              {BRANDS.map((b) => {
                const brandDisabled = Array.isArray(b.packs) && b.packs.length === 0;
                return (
                  <button
                    key={b.id}
                    className={`brand-tile ${brandDisabled ? "opacity-45 pointer-events-none" : ""}`}
                    onClick={() => { if (!brandDisabled) goImages(b); }}
                    disabled={brandDisabled}
                    aria-disabled={brandDisabled}
                    aria-label={brandDisabled ? `${b.name} has no packs` : `Open ${b.name} images`}
                  >
                    <span className="brand-tile__label">{b.name.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}


        {/* BRAND IMAGES (all packs merged) */}
        {view === "images" && brand && (
          <div>
            <div
              className={`grid-images grid-images--dense ${mergedImages.length === 0 ? "images-disabled" : ""
                }`}
            >
              {mergedImages.length === 0 ? (
                <div className="empty-image-box">NO IMAGES</div>
              ) : (
                mergedImages.map((img, idx) => (
                  <ImageTile
                    key={img.id}
                    img={img}
                    onClick={() => openCarouselAll(idx)}
                  />
                ))
              )}
            </div>

            <CarouselModal
              title={`${brand.name} — All`}
              images={carouselImages}
              isOpen={isOpen}
              startIndex={selectedIndex}
              onClose={() => setIsOpen(false)}
            />
          </div>
        )}

        {/* PACK IMAGES (only selected pack) */}
        {view === "packImages" && brand && currentPack && (
          <div>
            <div
              className={`grid-images grid-images--dense ${currentPack.images.length === 0 ? "images-disabled" : ""
                }`}
            >
              {currentPack.images.length === 0 ? (
                <div className="empty-image-box">NO IMAGES</div>
              ) : (
                currentPack.images.map((img, idx) => (
                  <ImageTile
                    key={img.id}
                    img={img}
                    onClick={() => openCarouselPack(idx)}
                  />
                ))
              )}
            </div>

            <CarouselModal
              title={`${brand.name} — ${currentPack.name}`}
              images={carouselImages}
              isOpen={isOpen}
              startIndex={selectedIndex}
              onClose={() => setIsOpen(false)}
            />
          </div>
        )}
      </section>

      {/* Full-screen pack selector */}
      {showPackFilter && brand && (
        <PackFilterOverlay
          brandName={brand.name}
          packs={brand.packs}
          onClose={() => setShowPackFilter(false)}
          onPick={(p) => goPackImages(p)}
        />
      )}

      <div
        className="
    fixed bottom-4 right-4 z-50
    inline-flex items-center gap-2
    rounded-xl px-3.5 py-2
    text-sm font-semibold
    shadow-md ring-1 ring-[var(--border)]
    bg-black/80 text-white
    backdrop-blur
    transition
    dark:bg-white/10 dark:text-[var(--text)]
  "
        aria-hidden="true"
      >
        <Sparkles className="h-4 w-4" />
        <span>Powered by Zyypher</span>
      </div>

    </main>
  );
}
