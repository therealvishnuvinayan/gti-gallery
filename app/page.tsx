"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BRANDS, Brand, PackType, HOMEPAGE_SLOGAN } from "@/lib/data";
import { ImageTile } from "@/components/ImageTile";
import { CarouselModal } from "@/components/CarouselModal";
import { ChevronLeft } from "lucide-react";

type View = "brands" | "packs" | "images";

export default function Page() {
  const [view, setView] = useState<View>("brands");
  const [brand, setBrand] = useState<Brand | null>(null);
  const [pack, setPack] = useState<PackType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [themeLogo, setThemeLogo] = useState("/logos/gulbahar-logodark.svg");

  const goBrands = () => { setView("brands"); setBrand(null); setPack(null); };
  const goPacks = () => { if (brand) { setView("packs"); setPack(null); } };

  const onBack = () => {
    if (view === "images") { setView("packs"); setPack(null); return; }
    if (view === "packs") { setView("brands"); setBrand(null); return; }
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

          {/* Breadcrumb (flat, with home icon) */}
          <nav className="crumb-flat hidden sm:flex">
            {view === "brands" ? (
              <span className="c-item is-active">
                <span className="c-home">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="c-home-ico">
                    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      d="M3 11.5L12 3l9 8.5M5 10.5V21h5v-6h4v6h5V10.5" />
                  </svg>
                </span>
                <span>Home</span>
              </span>
            ) : (
              <button className="c-item" onClick={goBrands} aria-label="Go to Home">
                <span className="c-home">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="c-home-ico">
                    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      d="M3 11.5L12 3l9 8.5M5 10.5V21h5v-6h4v6h5V10.5" />
                  </svg>
                </span>
                <span>Home</span>
              </button>
            )}

            {brand && view !== "brands" && (
              <>
                <span className="c-sep">›</span>
                <button className="c-item" onClick={goPacks} title={brand.name}>
                  {brand.name}
                </button>
              </>
            )}

            {pack && (
              <>
                <span className="c-sep">›</span>
                <span className="c-item is-active">{pack.name}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="container-pro py-10 md:py-14">
        {/* BRANDS VIEW */}
        {view === "brands" && (
          <div className="home-split">
            <div className="home-slogan">
              <h1 className="home-slogan-text">{HOMEPAGE_SLOGAN}</h1>
              <p className="home-slogan-sub">Tap a brand to explore pack formats and images.</p>
            </div>

            <div className="home-divider" />

            <div className="home-tiles">
              {BRANDS.slice(0, 4).map((b) => {
                const brandDisabled = Array.isArray(b.packs) && b.packs.length === 0;
                return (
                  <button
                    key={b.id}
                    className={`brand-tile ${brandDisabled ? "pack-tile--disabled" : ""}`}
                    onClick={() => {
                      if (brandDisabled) return;
                      setBrand(b);
                      setView("packs");
                    }}
                    disabled={brandDisabled}
                    aria-disabled={brandDisabled}
                  >
                    <span className="brand-tile__label">{b.name.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* PACKS VIEW */}
        {view === "packs" && brand && (
          <div className="packs-wrap">
            <div className="packs-head">
              <h2 className="packs-title">{brand.name}</h2>
            </div>

            <div className="packs-grid">
              {brand.packs.map((p) => (
                <button
                  key={p.id}
                  className="pack-tile"
                  onClick={() => { setPack(p); setView("images"); }}
                >
                  <span className="pack-tile__label">{p.name.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* IMAGES VIEW */}
        {view === "images" && brand && pack && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {pack.name}
              </h2>
              <p className="text-[var(--muted)] mt-2">{brand.name}</p>
            </div>

            <div className={`grid-images grid-images--dense ${pack.images.length === 0 ? "images-disabled" : ""}`}>
              {pack.images.length === 0 ? (
                <div className="empty-image-box">NO IMAGES</div>
              ) : (
                pack.images.map((img, idx) => (
                  <ImageTile
                    key={img.id}
                    img={img}
                    onClick={() => { setSelectedIndex(idx); setIsOpen(true); }}
                  />
                ))
              )}
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
