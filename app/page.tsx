"use client";

import { useState } from "react";
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

  const onBack = () => {
    if (view === "images") { setView("packs"); setPack(null); return; }
    if (view === "packs") { setView("brands"); setBrand(null); return; }
  };

  return (
    <main className="min-h-screen">
      <div className="appbar">
        <div className="container-pro h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {(view !== "brands") && (
              <button className="btn btn-ghost" onClick={onBack} aria-label="Back">
                <ChevronLeft className="w-5 h-5" /><span className="hidden sm:inline">Back</span>
              </button>
            )}
            <div className="pl-1">
              <div className="text-lg font-semibold">GTI Gallery</div>
              <div className="text-xs text-[var(--muted)]">Clean & professional</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge hidden sm:inline-flex"><Layers className="w-4 h-4" /> {view.toUpperCase()}</span>
            {brand && <span className="badge">{brand.name}</span>}
            {pack && <span className="badge">{pack.name}</span>}
            <ThemeToggle />
          </div>
        </div>
      </div>

      <section className="container-pro py-8 md:py-10">
        {view === "brands" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Choose your brand</h2>
              <p className="text-[var(--muted)] mt-1">Tap a card to explore pack formats.</p>
            </div>
            <div className="grid-auto">
              {BRANDS.map((b) => (
                <BrandCard key={b.id} brand={b} onClick={() => { setBrand(b); setView('packs'); }} />
              ))}
            </div>
          </div>
        )}

        {view === "packs" && brand && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold">Choose pack type</h2>
              <p className="text-[var(--muted)] mt-1">{brand.name}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {brand.packs.map((p) => (
                <PackChip key={p.id} pack={p} onClick={() => { setPack(p); setView('images'); }} />
              ))}
            </div>
          </div>
        )}

        {view === "images" && brand && pack && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold">{pack.name}</h2>
              <p className="text-[var(--muted)] mt-1">{brand.name}</p>
            </div>
            <div className="grid-auto">
              {pack.images.map((img, idx) => (
                <ImageTile key={img.id} img={img} onClick={() => { setSelectedIndex(idx); setIsOpen(true); }} />
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

      <footer className="container-pro pb-10 text-center text-sm text-[var(--muted)]">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] bg-white">
          <span>No backend required • Static demo</span>
        </div>
      </footer>
    </main>
  );
}
