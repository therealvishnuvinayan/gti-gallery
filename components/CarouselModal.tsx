"use client";

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

import type { BrandImage } from "@/lib/data";

type Props = {
  title: string;
  images: BrandImage[];
  isOpen: boolean;
  startIndex?: number;
  onClose: () => void;
};

export default function CarouselModal({
  title,
  images,
  isOpen,
  startIndex = 0,
  onClose,
}: Props) {
  if (!isOpen) return null;

  const slides = images.map((i) => ({
    src: i.src,
    alt: i.alt,
    description: title,
  }));

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={slides}
      index={startIndex}
      plugins={[Thumbnails, Zoom, Captions]}
      carousel={{ imageFit: "contain", spacing: 0, padding: 0 }}
      thumbnails={{ height: 100, width: 150, border: 2, gap: 10, vignette: false }}
      captions={{ descriptionTextAlign: "center", descriptionMaxLines: 1 }}
      animation={{ swipe: 250, fade: 200 }}
    />
  );
}
