"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { BrandImage } from "@/lib/data";

export function CarouselModal({
  title,
  images,
  isOpen,
  startIndex = 0,
  onClose,
}: {
  title: string;
  images: BrandImage[];
  isOpen: boolean;
  startIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  useEffect(() => setIndex(startIndex), [startIndex, isOpen]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="transition-opacity ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-[2px]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child as={Fragment} enter="transition ease-out duration-200 transform" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-150 transform" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="card w-full max-w-5xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
                  <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
                  <button className="btn btn-ghost" onClick={onClose}><X className="w-5 h-5" /></button>
                </div>

                <div className="relative bg-black">
                  <div className="aspect-[16/9] relative">
                    <Image src={images[index].src} alt={images[index].alt} fill sizes="100vw" className="object-contain" />
                  </div>
                  <button className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-ghost" onClick={prev}><ChevronLeft className="w-6 h-6" /></button>
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-ghost" onClick={next}><ChevronRight className="w-6 h-6" /></button>
                </div>

                <div className="flex items-center justify-center gap-2 py-3 border-t border-[var(--border)]">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setIndex(i)} className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-brand-500" : "w-3 bg-black/20"}`} aria-label={`Go to slide ${i+1}`} />
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
