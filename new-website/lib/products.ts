import {
  defaultCategories,
  defaultProducts,
  type Product,
  type ProductCategory,
} from "@/lib/store-data";

export type { Product, ProductCategory };

export const categories = defaultCategories.map((category) => ({
  slug: category.id,
  name: category.name,
  image: category.bannerImage,
  description: category.description,
}));

export const products: Product[] = defaultProducts;

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(slug: string) {
  const categoryName = categories.find((category) => category.slug === slug)?.name;

  if (!categoryName) {
    return [];
  }

  return products.filter((product) => product.category === categoryName && product.status === "published");
}

export function getFeaturedProducts() {
  return products.filter((product) => product.status === "published" && product.featured).slice(0, 6);
}

export function getCategorySlug(category: ProductCategory) {
  const map: Record<ProductCategory, string> = {
    Sarees: "sarees",
    "Indo-Western": "indo-western",
    "Kurta Pyjama": "kurta-pyjama",
  };

  return map[category];
}
