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
import { ChevronLeft, Filter } from "lucide-react";
import PackFilterOverlay from "@/components/PackFilterOverlay";

type View = "brands" | "images";

export default function Page() {
  const [view, setView] = useState<View>("brands");
  const [brand, setBrand] = useState<Brand | null>(null);

  // carousel state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState<BrandImage[]>([]);

  // full-screen filter page
  const [showPackFilter, setShowPackFilter] = useState(false);

  const [themeLogo, setThemeLogo] = useState("/logos/gulbahar-logodark.svg");

  // Merge all images from a brand’s packs
  const mergedImages: BrandImage[] = useMemo(() => {
    if (!brand) return [];
    return brand.packs.flatMap((p) => p.images);
  }, [brand]);

  const openCarouselAll = (idx: number) => {
    setCarouselImages(mergedImages);
    setSelectedIndex(idx);
    setIsOpen(true);
  };

  const openCarouselFiltered = (pack: PackType) => {
    setCarouselImages(pack.images);
    setSelectedIndex(0);
    setIsOpen(true);
  };

  const goBrands = () => {
    setView("brands");
    setBrand(null);
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
      {/* Appbar */}
      <div className="appbar">
        <div className="container-pro h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {view !== "brands" && (
              <button className="btn btn-ghost" onClick={goBrands}>
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

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

          {/* Filter icon only on Images view */}
          {view === "images" && brand && brand.packs?.length > 0 && (
            <button
              type="button"
              onClick={() => setShowPackFilter(true)}
              title="Filter by pack"
              className="p-1 hover:opacity-70 transition"
              aria-label="Open pack filter"
            >
              {/* black icon, no background */}
              <Filter
                className="w-6 h-6"
                stroke="black"
                strokeWidth={2.2}
              />
            </button>
          )}
        </div>
      </div>

      <section className="container-pro py-10 md:py-14">
        {/* BRANDS */}
        {view === "brands" && (
          <div className="home-split">
            <div className="home-slogan">
              <h1 className="home-slogan-text">{HOMEPAGE_SLOGAN}</h1>
              <p className="home-slogan-sub mt-4 text-lg max-w-[480px]">
                Tap a brand to view all images instantly.
              </p>
            </div>

            <div className="home-divider" />

            <div className="home-tiles">
              {BRANDS.map((b) => {
                const brandDisabled =
                  Array.isArray(b.packs) && b.packs.length === 0;

                return (
                  <button
                    key={b.id}
                    className={`brand-tile ${brandDisabled ? "opacity-45 pointer-events-none" : ""
                      }`}
                    onClick={() => {
                      if (brandDisabled) return;
                      setBrand(b);
                      setView("images");
                    }}
                    disabled={brandDisabled}
                    aria-disabled={brandDisabled}
                    aria-label={
                      brandDisabled
                        ? `${b.name} has no packs`
                        : `Open ${b.name} images`
                    }
                  >
                    <span className="brand-tile__label">
                      {b.name.toUpperCase()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* IMAGES */}
        {view === "images" && brand && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-semibold">{brand.name}</h2>
              <p className="text-[var(--muted)] mt-2">All images</p>
            </div>

            {/* Grid with empty state + skeleton handled in ImageTile */}
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
              title={`${brand.name} Images`}
              images={carouselImages}
              isOpen={isOpen}
              startIndex={selectedIndex}
              onClose={() => setIsOpen(false)}
            />
          </div>
        )}
      </section>

      {/* Full-screen pack filter page */}
      {showPackFilter && brand && (
        <PackFilterOverlay
          brandName={brand.name}
          packs={brand.packs}
          onClose={() => setShowPackFilter(false)}
          onPick={(p) => openCarouselFiltered(p)}
        />
      )}
    </main>
  );
}
