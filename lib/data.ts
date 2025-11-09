// lib/data.ts
export type BrandImage = { id: string; src: string; alt: string };
export type PackType = { id: string; name: string; images: BrandImage[] };
export type Brand = { id: string; name: string; logo: string; packs: PackType[] };

export const HOMEPAGE_SLOGAN = "WELCOME TO GTI PORTFOLIO";

/* ------------------------------ helpers (inline literals only) ------------------------------ */
/* We’re not generating anything at runtime; these are just constants to keep paths readable. */

const mk = (base: string, files: string[]): BrandImage[] =>
  files.map((file) => {
    const id = file.replace(/\.[^.]+$/, "");
    return {
      id,
      src: `${base}/${file}`,
      alt: file.replace(/[-_]/g, " ").replace(/\.[^.]+$/, ""),
    };
  });

/* MILANO */
const MILANO = {
  FLAVORS: mk("/images/Milano/Milano-Flavors", [
    "Milano-Flavors-1.jpg", "Milano-Flavors-2.jpg", "Milano-Flavors-3.jpg", "Milano-Flavors-4.jpg",
    "Milano-Flavors-5.jpg", "Milano-Flavors-6.jpg", "Milano-Flavors-7.jpg", "Milano-Flavors-8.jpg",
    "Milano-Flavors-9.jpg", "Milano-Flavors-10.jpg", "Milano-Flavors-11.jpg", "Milano-Flavors-12.jpg",
    "Milano-Flavors-13.jpg", "Milano-Flavors-14.jpg",
  ]),
  NANO_FSP: mk("/images/Milano/Milano-Nano-FSP", [
    "Milano-Nano-Fsp-1.jpg", "Milano-Nano-Fsp-2.jpg", "Milano-Nano-Fsp-3.jpg", "Milano-Nano-Fsp-4.jpg",
    "Milano-Nano-Fsp-5.jpg", "Milano-Nano-Fsp-6.jpg", "Milano-Nano-Fsp-7.jpg", "Milano-Nano-Fsp-8.jpg",
    "Milano-Nano-Fsp-9.jpg", "Milano-Nano-Fsp-10.jpg", "Milano-Nano-Fsp-11.jpg", "Milano-Nano-Fsp-12.jpg",
    "Milano-Nano-Fsp-13.jpg", "Milano-Nano-Fsp-14.jpg",
  ]),
  NANO_REGULAR: mk("/images/Milano/Milano-Nano-Regulars", [
    "Milano-Nano-Regular-1.jpg", "Milano-Nano-Regular-2.jpg", "Milano-Nano-Regular-3.jpg",
    "Milano-Nano-Regular-4.jpg", "Milano-Nano-Regular-5.jpg", "Milano-Nano-Regular-6.jpg",
    "Milano-Nano-Regular-7.jpg", "Milano-Nano-Regular-8.jpg", "Milano-Nano-Regular-9.jpg",
    "Milano-Nano-Regular-10.jpg",
  ]),
  QUEEN_FLAVORS: mk("/images/Milano/Milano-Queen-Flavors", [
    "Milano-Queen-Flavors-1.jpg", "Milano-Queen-Flavors-2.jpg", "Milano-Queen-Flavors-3.jpg",
    "Milano-Queen-Flavors-4.jpg", "Milano-Queen-Flavors-5.jpg", "Milano-Queen-Flavors-6.jpg",
    "Milano-Queen-Flavors-7.jpg", "Milano-Queen-Flavors-8.jpg", "Milano-Queen-Flavors-9.jpg",
  ]),
  QUEEN_REGULAR: mk("/images/Milano/Milano-Queen-Regulars", [
    "Milano-Queen-Regular-1.jpg", "Milano-Queen-Regular-2.jpg", "Milano-Queen-Regular-3.jpg",
    "Milano-Queen-Regular-4.jpg", "Milano-Queen-Regular-5.jpg", "Milano-Queen-Regular-6.jpg",
    "Milano-Queen-Regular-7.jpg",
  ]),
  SUPERSLIM_FLAVORS: mk("/images/Milano/Milano-Superslim-Flavors", [
    "Milano-Superslim-Flavors-1.jpg", "Milano-Superslim-Flavors-2.jpg", "Milano-Superslim-Flavors-3.jpg",
    "Milano-Superslim-Flavors-4.jpg", "Milano-Superslim-Flavors-5.jpg", "Milano-Superslim-Flavors-6.jpg",
    "Milano-Superslim-Flavors-7.jpg", "Milano-Superslim-Flavors-8.jpg", "Milano-Superslim-Flavors-9.jpg",
    "Milano-Superslim-Flavors-10.jpg", "Milano-Superslim-Flavors-11.jpg", "Milano-Superslim-Flavors-12.jpg",
    "Milano-Superslim-Flavors-13.jpg", "Milano-Superslim-Flavors-14.jpg", "Milano-Superslim-Flavors-15.jpg",
    "Milano-Superslim-Flavors-16.jpg", "Milano-Superslim-Flavors-17.jpg",
  ]),
  SUPERSLIM_REGULAR: mk("/images/Milano/Milano-Superslim-Regular", [
    "Milano-Superslim-Regular-1.jpg", "Milano-Superslim-Regular-2.jpg",
    "Milano-Superslim-Regular-3.jpg", "Milano-Superslim-Regular-4.jpg",
  ]),
  KINGS_ROUNDED_CORNER: mk("/images/Milano/Milano-Kings-Rounded-Corner", [
    "Milano-Kings-Rounded-Corner-1.jpg", "Milano-Kings-Rounded-Corner-2.jpg", "Milano-Kings-Rounded-Corner-3.jpg",
    "Milano-Kings-Rounded-Corner-4.jpg", "Milano-Kings-Rounded-Corner-5.jpg", "Milano-Kings-Rounded-Corner-6.jpg",
    "Milano-Kings-Rounded-Corner-7.jpg", "Milano-Kings-Rounded-Corner-8.jpg", "Milano-Kings-Rounded-Corner-9.jpg",
    "Milano-Kings-Rounded-Corner-10.jpg", "Milano-Kings-Rounded-Corner-11.jpg",
  ]),
  KINGS_FSP: mk("/images/Milano/Milano-Kings-FSP", [
    "Milano-Kings-FSP-1.jpg", "Milano-Kings-FSP-2.jpg",
  ]),
  KINGS_REGULAR: mk("/images/Milano/Milano-Kings-Regular", [
    "Milano-Kings-Regular-1.jpg", "Milano-Kings-Regular-2.jpg", "Milano-Kings-Regular-3.jpg",
    "Milano-Kings-Regular-4.jpg", "Milano-Kings-Regular-5.jpg", "Milano-Kings-Regular-6.jpg",
    "Milano-Kings-Regular-7.jpg", "Milano-Kings-Regular-8.jpg", "Milano-Kings-Regular-9.jpg",
    "Milano-Kings-Regular-10.jpg",
  ]),
  FANPACK: mk("/images/Milano/Milano-Fanpack", [
    "Milano-Fanpack-1.jpg", "Milano-Fanpack-2.jpg", "Milano-Fanpack-3.jpg", "Milano-Fanpack-4.jpg",
    "Milano-Fanpack-5.jpg", "Milano-Fanpack-6.jpg", "Milano-Fanpack-7.jpg", "Milano-Fanpack-8.jpg",
    "Milano-Fanpack-9.jpg", "Milano-Fanpack-10.jpg", "Milano-Fanpack-11.jpg",
  ]),
  HNB: mk("/images/Milano/Milano-HnB", [
    "Milano-HnB-1.jpg", "Milano-HnB-2.jpg", "Milano-HnB-3.jpg", "Milano-HnB-4.jpg", "Milano-HnB-5.jpg", "Milano-HnB-6.jpg",
  ]),
  SLIDEPACKS: mk("/images/Milano/Milano-Slidepacks", [
    "Milano-Slidepacks-1.jpg", "Milano-Slidepacks-2.jpg", "Milano-Slidepacks-3.jpg", "Milano-Slidepacks-4.jpg",
    "Milano-Slidepacks-5.jpg", "Milano-Slidepacks-6.jpg", "Milano-Slidepacks-7.jpg",
  ]),
  TIN_BOXES: mk("/images/Milano/Milano-Tin-Boxes", [
    "Milano-Tinbox-1.jpg", "Milano-Tinbox-2.jpg", "Milano-Tinbox-3.jpg", "Milano-Tinbox-4.jpg", "Milano-Tinbox-5.jpg",
  ]),
};

/* MOND */
const MOND = {
  KINGS_REGULAR: mk("/images/Mond/Mond-Kings-Regular", [
    "Mond-Kings-Regular-1.jpg", "Mond-Kings-Regular-2.jpg", "Mond-Kings-Regular-3.jpg", "Mond-Kings-Regular-4.jpg",
    "Mond-Kings-Regular-5.jpg", "Mond-Kings-Regular-6.jpg", "Mond-Kings-Regular-7.jpg", "Mond-Kings-Regular-8.jpg",
  ]),
  KINGS_FSP: mk("/images/Mond/Mond-Kings-FSP", [
    "Mond-Kings-FSP-1.jpg", "Mond-Kings-FSP-2.jpg",
  ]),
  QUEENS_REGULAR: mk("/images/Mond/Mond-Queens-Regular", [
    "Mond-Queens-Regular-1.jpg", "Mond-Queens-Regular-2.jpg", "Mond-Queens-Regular-3.jpg", "Mond-Queens-Regular-4.jpg",
  ]),
  SUPERSLIM_FLAVORS: mk("/images/Mond/Mond-Superslim-Flavors", [
    "Mond-Superslim-Flavors-1.jpg", "Mond-Superslim-Flavors-2.jpg", "Mond-Superslim-Flavors-3.jpg", "Mond-Superslim-Flavors-4.jpg",
    "Mond-Superslim-Flavors-5.jpg", "Mond-Superslim-Flavors-6.jpg", "Mond-Superslim-Flavors-7.jpg", "Mond-Superslim-Flavors-8.jpg",
    "Mond-Superslim-Flavors-9.jpg", "Mond-Superslim-Flavors-10.jpg", "Mond-Superslim-Flavors-11.jpg", "Mond-Superslim-Flavors-12.jpg",
    "Mond-Superslim-Flavors-13.jpg", "Mond-Superslim-Flavors-14.jpg", "Mond-Superslim-Flavors-15.jpg", "Mond-Superslim-Flavors-16.jpg",
    "Mond-Superslim-Flavors-17.jpg", "Mond-Superslim-Flavors-18.jpg", "Mond-Superslim-Flavors-19.jpg", "Mond-Superslim-Flavors-20.jpg",
  ]),
  SUPERSLIM_REGULAR: mk("/images/Mond/Mond-Superslim-Regular", [
    "Mond-Superslim-Regular-1.jpg", "Mond-Superslim-Regular-2.jpg", "Mond-Superslim-Regular-3.jpg",
    "Mond-Superslim-Regular-4.jpg", "Mond-Superslim-Regular-5.jpg", "Mond-Superslim-Regular-6.jpg",
  ]),
};

/* CAVALLO */
const CAVALLO = {
  FANPACK: mk("/images/Cavallo/Cavallo-Fanpack", [
    "Cavallo-Fanpack-1.jpg", "Cavallo-Fanpack-2.jpg", "Cavallo-Fanpack-3.jpg",
  ]),
  QUEEN_FLAVORS: mk("/images/Cavallo/Cavallo-Queen-Flavors", [
    "Cavallo-Queen-Flavors-1.jpg", "Cavallo-Queen-Flavors-2.jpg", "Cavallo-Queen-Flavors-3.jpg",
    "Cavallo-Queen-Flavors-4.jpg", "Cavallo-Queen-Flavors-5.jpg", "Cavallo-Queen-Flavors-6.jpg",
  ]),
  QUEEN_REGULAR: mk("/images/Cavallo/Cavallo-Queen-Regular", [
    "Cavallo-Queen-Regular-1.jpg", "Cavallo-Queen-Regular-2.jpg", "Cavallo-Queen-Regular-3.jpg",
    "Cavallo-Queen-Regular-4.jpg", "Cavallo-Queen-Regular-5.jpg", "Cavallo-Queen-Regular-6.jpg",
    "Cavallo-Queen-Regular-7.jpg",
  ]),
};

/* HAVANOVE */
const HAVANOVE = mk("/images/Havanove", [
  "Havanove-1.jpg", "Havanove-2.jpg", "Havanove-3.jpg", "Havanove-4.jpg", "Havanove-5.jpg", "Havanove-6.jpg", "Havanove-7.jpg",
]);

/* ------------------------------ export BRANDS ------------------------------ */

export const BRANDS: readonly Brand[] = [
  {
    id: "milano",
    name: "Milano",
    logo: "/logos/gulbahar-logodark.svg",
    packs: [
      { id: "flavors", name: "FLAVORS", images: MILANO.FLAVORS },
      { id: "nano-fsp", name: "NANO FSP", images: MILANO.NANO_FSP },
      { id: "nano-regular", name: "NANO REGULAR", images: MILANO.NANO_REGULAR },
      { id: "queen-flavors", name: "QUEEN FLAVORS", images: MILANO.QUEEN_FLAVORS },
      { id: "queen-regular", name: "QUEEN REGULAR", images: MILANO.QUEEN_REGULAR },
      { id: "superslim-flavors", name: "SUPERSLIM FLAVORS", images: MILANO.SUPERSLIM_FLAVORS },
      { id: "superslim-regular", name: "SUPERSLIM REGULAR", images: MILANO.SUPERSLIM_REGULAR },
      { id: "kings-rounded-corner", name: "KINGS ROUNDED CORNER", images: MILANO.KINGS_ROUNDED_CORNER },
      { id: "kings-fsp", name: "KINGS FSP", images: MILANO.KINGS_FSP },
      { id: "kings-regular", name: "KINGS REGULAR", images: MILANO.KINGS_REGULAR },
      { id: "fanpack", name: "FANPACK", images: MILANO.FANPACK },
      { id: "hnb", name: "HnB", images: MILANO.HNB },
      { id: "slidepacks", name: "SLIDEPACKS", images: MILANO.SLIDEPACKS },
      { id: "tin-boxes", name: "TIN BOXES", images: MILANO.TIN_BOXES },
    ],
  },
  {
    id: "mond",
    name: "Mond",
    logo: "/logos/gulbahar-logodark.svg",
    packs: [
      { id: "kings-regular", name: "KINGS REGULAR", images: MOND.KINGS_REGULAR },
      { id: "kings-fsp", name: "KINGS FSP", images: MOND.KINGS_FSP },
      { id: "queens-regular", name: "QUEENS REGULAR", images: MOND.QUEENS_REGULAR },
      { id: "superslim-flavors", name: "SUPERSLIM FLAVORS", images: MOND.SUPERSLIM_FLAVORS },
      { id: "superslim-regular", name: "SUPERSLIM REGULAR", images: MOND.SUPERSLIM_REGULAR },
    ],
  },
  {
    id: "cavallo",
    name: "Cavallo",
    logo: "/logos/gulbahar-logodark.svg",
    packs: [
      { id: "fanpack", name: "FANPACK", images: CAVALLO.FANPACK },
      { id: "queen-flavors", name: "QUEEN FLAVORS", images: CAVALLO.QUEEN_FLAVORS },
      { id: "queen-regular", name: "QUEEN REGULAR", images: CAVALLO.QUEEN_REGULAR },
    ],
  },
  {
    id: "havanove",
    name: "Havanove",
    logo: "/logos/gulbahar-logodark.svg",
    packs: [
      { id: "all", name: "ALL", images: HAVANOVE },
    ],
  },
] as const;
