import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "raw-classic",
    slug: "raw-classic",
    name: "Nectare Raw Classic",
    description:
      "Single-origin raw honey with cold extraction and no thermal processing.",
    benefits: [
      "Natural enzymes preserved",
      "Unfiltered and additive free",
      "Sourced from seasonal floral zones",
    ],
    nutrition: {
      energy: "304 kcal / 100g",
      carbs: "82.4g",
      sugars: "82.1g",
      protein: "0.3g",
    },
    image: "/jar-placeholder.svg",
    visible: true,
    variants: [
      { id: "raw-classic-250", label: "250g", weight: "250g", price: 499, stock: 28 },
      { id: "raw-classic-500", label: "500g", weight: "500g", price: 899, stock: 16 },
      { id: "raw-classic-1kg", label: "1kg", weight: "1kg", price: 1599, stock: 8 },
    ],
  },
  {
    id: "forest-gold",
    slug: "forest-gold",
    name: "Nectare Forest Gold",
    description:
      "Dark amber honey with bold woody notes and elevated mineral profile.",
    benefits: [
      "Rich antioxidant profile",
      "Trace mineral concentration",
      "Small-batch hand filtration",
    ],
    nutrition: {
      energy: "298 kcal / 100g",
      carbs: "80.9g",
      sugars: "80.4g",
      protein: "0.4g",
    },
    image: "/jar-placeholder.svg",
    visible: true,
    variants: [
      { id: "forest-gold-250", label: "250g", weight: "250g", price: 549, stock: 20 },
      { id: "forest-gold-500", label: "500g", weight: "500g", price: 999, stock: 14 },
      { id: "forest-gold-1kg", label: "1kg", weight: "1kg", price: 1799, stock: 6 },
    ],
  },
];

export const visibleProducts = products.filter((product) => product.visible);
