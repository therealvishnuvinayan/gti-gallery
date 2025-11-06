"use client";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { BrandImage } from "@/lib/data";

type Props = {
  title: string;
  images: BrandImage[];
  isOpen: boolean;
  startIndex?: number;
  onClose: () => void;
};

export function CarouselModal({
  title,
  images,
  isOpen,
  startIndex = 0,
  onClose,
}: Props) {
  const len = images?.length ?? 0;
  const [index, setIndex] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);

  // clamp & sync on open
  useEffect(() => {
    const maxIdx = Math.max(0, len - 1);
    setIndex(Math.min(Math.max(0, startIndex), maxIdx));
  }, [startIndex, len, isOpen]);

  const hasImages = len > 0;
  const current = hasImages ? images[index] : undefined;

  const prev = () => hasImages && setIndex((i) => (i - 1 + len) % len);
  const next = () => hasImages && setIndex((i) => (i + 1) % len);

  // keyboard nav
  useEffect(() => {
    if (!isOpen || !hasImages) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, hasImages, len, onClose]);

  // center active thumbnail into view
  useEffect(() => {
    const el = railRef.current?.querySelector<HTMLButtonElement>(
      `[data-thumb-idx="${index}"]`
    );
    if (!el) return;
    const rail = railRef.current!;
    const thumbCenter = el.offsetLeft + el.offsetWidth / 2;
    rail.scrollTo({
      left: Math.max(0, thumbCenter - rail.clientWidth / 2),
      behavior: "smooth",
    });
  }, [index]);

  // preload neighbors
  const neighbors = useMemo(() => {
    if (!hasImages) return [];
    return [images[(index + 1) % len], images[(index - 1 + len) % len]];
  }, [index, hasImages, len, images]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* very light backdrop so page behind still feels present */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10" />
        </Transition.Child>

        {/* FULL-SCREEN PANEL with 3-row grid: header | stage | thumbs */}
        <div className="fixed inset-0">
          <div className="flex min-h-full items-stretch justify-center">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-200 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-150 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="
                  w-full h-screen bg-[var(--panel)] 
                  md:rounded-2xl md:m-4 shadow-lg overflow-hidden
                  grid grid-rows-[auto,1fr,auto]
                "
              >
                {/* HEADER (fixed height) */}
                <div className="relative flex items-center justify-center px-5 py-3 border-b border-[var(--border)]">
                  <Dialog.Title className="text-base font-semibold tracking-wide">
                    {title}
                  </Dialog.Title>
                  <button
                    className="btn btn-ghost absolute right-3 top-2.5"
                    onClick={onClose}
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* STAGE (fills remaining height; no page scroll) */}
                <div className="relative min-h-0">
                  <div className="absolute inset-0 p-2 md:p-6 pb-6 md:pb-8">
                    <div className="relative w-full h-full">
                      {current ? (
                        <Image
                          src={current.src}
                          alt={current.alt}
                          fill
                          sizes="100vw"
                          className="object-contain select-none"
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center text-[var(--muted)]">
                          No images
                        </div>
                      )}

                      {/* arrows float over the image; no layout shift */}
                      <button
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] p-3 shadow-sm transition hover:bg-black/5 disabled:opacity-40"
                        onClick={prev}
                        disabled={!hasImages || len < 2}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-10 h-10" />
                      </button>
                      <button
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] p-3 shadow-sm transition hover:bg-black/5 disabled:opacity-40"
                        onClick={next}
                        disabled={!hasImages || len < 2}
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-10 h-10" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* THUMB STRIP (fixed height, always visible; horizontal scroll if overflow) */}
                {hasImages && (
                  <div className="border-t border-[var(--border)] bg-[var(--panel)]">
                    {/* Thumbnail Rail */}
                    <div
                      ref={railRef}
                      className="flex gap-4 px-4 py-3 overflow-x-auto scrollbar-thin"
                      style={{ height: "120px" }}
                    >
                      {images.map((img, i) => {
                        const active = i === index;
                        return (
                          <button
                            key={img.id}
                            data-thumb-idx={i}
                            onClick={() => setIndex(i)}
                            className={[
                              "relative shrink-0 overflow-hidden rounded-md",
                              "h-[90px] w-[135px] md:h-[100px] md:w-[150px]",
                              active
                                ? "border-2 border-blue-500 ring-blue-500/20 ring-2"
                                : "border border-[var(--border)] hover:scale-[1.03]"
                            ].join(" ")}
                          >
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              sizes="150px"
                              className="object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* EXTRA SAFE PADDING BELOW (this prevents clipping on macOS / browsers) */}
                    <div style={{ height: "40px" }} />
                  </div>
                )}

                {/* neighbor preloads (hidden) */}
                <div className="hidden">
                  {neighbors.map(
                    (img) =>
                      img && (
                        <Image
                          key={img.id}
                          src={img.src}
                          alt=""
                          width={1}
                          height={1}
                          priority
                        />
                      )
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
