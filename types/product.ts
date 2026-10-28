export type ProductVariant = {
  id: string;
  label: string;
  weight: string;
  price: number;
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  benefits: string[];
  nutrition: {
    energy: string;
    carbs: string;
    sugars: string;
    protein: string;
  };
  image: string;
  visible: boolean;
  variants: ProductVariant[];
};
