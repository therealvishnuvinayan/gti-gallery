export type BrandImage = { id: string; src: string; alt: string };
export type PackType = { id: string; name: string; images: BrandImage[] };
export type Brand = { id: string; name: string; logo: string; packs: PackType[] };

const imgs = (prefix: string): BrandImage[] => [
  { id: `${prefix}-1`, src: `/images/${prefix}/01.jpg`, alt: `${prefix} 01` },
  { id: `${prefix}-2`, src: `/images/${prefix}/02.jpg`, alt: `${prefix} 02` },
  { id: `${prefix}-3`, src: `/images/${prefix}/03.jpg`, alt: `${prefix} 03` },
  { id: `${prefix}-4`, src: `/images/${prefix}/04.jpg`, alt: `${prefix} 04` },
  { id: `${prefix}-5`, src: `/images/${prefix}/05.jpg`, alt: `${prefix} 05` },
];

export const BRANDS = [
  {
    id: "milano",
    name: "Milano",
    logo: "/logos/milano.svg",
    packs: [
      { id: "kings", name: "KINGS", images: imgs("milano/kings") },
      { id: "kings-fsp", name: "KINGS FSP", images: imgs("milano/kings-fsp") },
      { id: "queen", name: "QUEEN", images: imgs("milano/queen") },
      { id: "nano", name: "NANO", images: imgs("milano/nano") },
    ],
  },
  {
    id: "monde",
    name: "Monde",
    logo: "/logos/monde.svg",
    packs: [
      { id: "kings", name: "KINGS", images: imgs("monde/kings") },
      { id: "queen", name: "QUEEN", images: imgs("monde/queen") },
    ],
  },
  {
    id: "cavallo",
    name: "Cavallo",
    logo: "/logos/cavallo.svg",
    packs: [
      { id: "kings", name: "KINGS", images: imgs("cavallo/kings") },
      { id: "nano", name: "NANO", images: imgs("cavallo/nano") },
    ],
  },
] as const;
