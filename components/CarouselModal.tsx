"use client";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BrandImage } from "@/lib/data";

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
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-[2px]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-200 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-150 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="card w-full max-w-6xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
                  <Dialog.Title className="text-lg font-semibold">
                    {title}
                  </Dialog.Title>
                  <button className="btn btn-ghost" onClick={onClose} aria-label="Close">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main stage */}
                <div className="relative bg-black">
                  <div className="relative aspect-[16/9]">
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
                      <div className="absolute inset-0 grid place-items-center text-white/60">
                        No images
                      </div>
                    )}
                  </div>

                  {/* Nav arrows (visible on dark/light) */}
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 text-white p-3 backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-40"
                    onClick={prev}
                    disabled={!hasImages || len < 2}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 text-white p-3 backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-40"
                    onClick={next}
                    disabled={!hasImages || len < 2}
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Thumbnail rail */}
                {hasImages && (
                  <div className="border-t border-[var(--border)] bg-[var(--panel)]">
                    <div
                      ref={railRef}
                      className="flex gap-3 px-4 py-4 overflow-x-auto scrollbar-thin"
                    >
                      {images.map((img, i) => {
                        const active = i === index;
                        return (
                          <button
                            key={img.id}
                            data-thumb-idx={i}
                            onClick={() => setIndex(i)}
                            aria-current={active ? "true" : undefined}
                            aria-label={`Open image ${i + 1}`}
                            className={[
                              "group relative h-16 w-24 shrink-0 overflow-hidden rounded-lg",
                              "border transition-all duration-200 ease-out",
                              active
                                ? "border-transparent ring-2 ring-blue-500 ring-offset-2 ring-offset-[var(--panel)] shadow-lg scale-[1.06]"
                                : "border-[var(--border)] hover:border-blue-300 hover:scale-[1.02]",
                            ].join(" ")}
                            style={{ transformOrigin: "center" }}
                          >
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              sizes="120px"
                              className={[
                                "object-cover transition-all duration-200 ease-out",
                                active ? "saturate-100 brightness-100" : "opacity-85 saturate-90",
                              ].join(" ")}
                              priority={active}
                            />

                            {/* subtle dark veil on inactive thumbs */}
                            <div
                              className={[
                                "pointer-events-none absolute inset-0 transition-opacity duration-200",
                                active ? "opacity-0" : "opacity-15 group-hover:opacity-0",
                              ].join(" ")}
                              style={{ background: "linear-gradient(0deg, rgba(0,0,0,.25), rgba(0,0,0,.1))" }}
                            />
                          </button>
                        );
                      })}

                    </div>
                  </div>
                )}

                {/* Preload neighbors invisibly */}
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
