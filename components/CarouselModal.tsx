"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
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

  // Clamp index whenever modal opens or images change
  useEffect(() => {
    const maxIdx = Math.max(0, len - 1);
    const clamped = Math.min(Math.max(0, startIndex), maxIdx);
    setIndex(clamped);
  }, [startIndex, len, isOpen]);

  const hasImages = len > 0;
  const current = hasImages ? images[index] : undefined;

  const prev = () => hasImages && setIndex((i) => (i - 1 + len) % len);
  const next = () => hasImages && setIndex((i) => (i + 1) % len);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !hasImages) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, hasImages, len]); // eslint-disable-line react-hooks/exhaustive-deps

  // Preload neighbors (cheap optimization)
  const neighbors = useMemo(() => {
    if (!hasImages) return [];
    return [images[(index + 1) % len], images[(index - 1 + len) % len]];
  }, [index, hasImages, len, images]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
              <Dialog.Panel className="card w-full max-w-5xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
                  <Dialog.Title className="text-lg font-semibold">
                    {title}
                  </Dialog.Title>
                  <button className="btn btn-ghost" onClick={onClose}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Slide */}
                <div className="relative bg-black">
                  <div className="aspect-[16/9] relative">
                    {current ? (
                      <Image
                        src={current.src}
                        alt={current.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 80vw"
                        className="object-contain"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-white/60">
                        No images
                      </div>
                    )}
                  </div>

                  {/* Nav buttons – now clearly visible */}
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 text-white p-3 backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-40"
                    onClick={prev}
                    disabled={!hasImages || len < 2}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 text-white p-3 backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-40"
                    onClick={next}
                    disabled={!hasImages || len < 2}
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2 py-3 border-t border-[var(--border)] bg-black/5">
                  {hasImages &&
                    images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all ${i === index
                            ? "w-8 bg-brand-500"
                            : "w-3 bg-[var(--dot)] outline outline-1 outline-white/5"
                          }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                </div>

                {/* Hidden preloaders */}
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
                      ),
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
