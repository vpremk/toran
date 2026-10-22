export type ProductCategory = "Sarees" | "Indo-Western" | "Kurta Pyjama";
export type ProductStatus = "draft" | "published";

export type Category = {
  id: "sarees" | "indo-western" | "kurta-pyjama";
  name: ProductCategory;
  description: string;
  bannerImage: string;
  order: number;
};

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  description: string;
  image: string;
  gallery: string[];
  colors: string[];
  sizes: string[];
  status: ProductStatus;
  featured: boolean;
  bestselling: boolean;
};

export type HomepageContent = {
  announcement: string;
  hero: {
    headline: string;
    subtitle: string;
    image: string;
    ctaLabel: string;
    ctaLink: string;
  };
  featuredProductIds: string[];
  categoryOrder: Array<Category["id"]>;
  promo: {
    title: string;
    text: string;
    image: string;
    ctaLabel: string;
    ctaLink: string;
  };
};

export type StoreSettings = {
  storeName: string;
  logo: string;
  contactEmail: string;
  contactPhone: string;
  currency: string;
  shippingInfo: string;
  returnPolicy: string;
  socialLinks: {
    instagram: string;
    pinterest: string;
    facebook: string;
  };
};

export type StoreState = {
  products: Product[];
  categories: Category[];
  homepage: HomepageContent;
  settings: StoreSettings;
};

export const STORAGE_KEY = "toran-store-state";

export const CATEGORY_OPTIONS: ProductCategory[] = [
  "Sarees",
  "Indo-Western",
  "Kurta Pyjama",
];

export const defaultCategories: Category[] = [
  {
    id: "sarees",
    name: "Sarees",
    description: "Handwoven drapes for occasions that deserve a grand entrance.",
    bannerImage:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    order: 1,
  },
  {
    id: "indo-western",
    name: "Indo-Western",
    description: "Fusion silhouettes for refined day-to-night dressing.",
    bannerImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    order: 2,
  },
  {
    id: "kurta-pyjama",
    name: "Kurta Pyjama",
    description: "Relaxed elegance and festive ease, tailored for every ritual.",
    bannerImage:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    order: 3,
  },
];

export const defaultProducts: Product[] = [
  {
    id: "saree-kesar-silk",
    name: "Kesar Silk Saree",
    category: "Sarees",
    price: 7490,
    salePrice: 6290,
    sku: "SAREE-KS-101",
    stock: 12,
    description:
      "A luminous silk drape with shimmering zari work and rich festive texture.",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["Mustard", "Maroon", "Ivory"],
    sizes: ["Free Size"],
    status: "published",
    featured: true,
    bestselling: true,
  },
  {
    id: "saree-rosewood-banarasi",
    name: "Rosewood Banarasi Saree",
    category: "Sarees",
    price: 8990,
    sku: "SAREE-RB-220",
    stock: 8,
    description:
      "Rosewood tones with heirloom-inspired gold motifs designed for weddings and rituals.",
    image:
      "https://images.unsplash.com/photo-1571513722275-4b4182f0b0b5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571513722275-4b4182f0b0b5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["Rosewood", "Gold"],
    sizes: ["Free Size"],
    status: "published",
    featured: false,
    bestselling: false,
  },
  {
    id: "saree-ivory-temple-weave",
    name: "Ivory Temple Weave",
    category: "Sarees",
    price: 6790,
    salePrice: 5790,
    sku: "SAREE-IT-319",
    stock: 14,
    description:
      "Minimal ivory elegance with temple-inspired borders for intimate festive styling.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["Ivory", "Gold"],
    sizes: ["Free Size"],
    status: "published",
    featured: true,
    bestselling: false,
  },
  {
    id: "fusion-emerald-suit",
    name: "Emerald Fusion Suit",
    category: "Indo-Western",
    price: 11890,
    salePrice: 9890,
    sku: "INDO-EF-540",
    stock: 6,
    description:
      "A sharply tailored evening suit with a draped silhouette and festive embroidery.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["Emerald", "Onyx", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    status: "published",
    featured: true,
    bestselling: true,
  },
  {
    id: "fusion-saffron-coord",
    name: "Saffron Embroidered Co-ord",
    category: "Indo-Western",
    price: 6990,
    sku: "INDO-SE-602",
    stock: 10,
    description:
      "Contemporary festive separates balancing comfort and elevated detailing.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["Saffron", "Sand", "Wine"],
    sizes: ["XS", "S", "M", "L", "XL"],
    status: "draft",
    featured: false,
    bestselling: false,
  },
  {
    id: "kurta-heritage-ivory",
    name: "Heritage Ivory Kurta",
    category: "Kurta Pyjama",
    price: 5690,
    salePrice: 4890,
    sku: "KURTA-HI-710",
    stock: 16,
    description:
      "A clean ivory kurta with subtle embroidery for a warm, elevated festive look.",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["Ivory", "Sand", "Brown"],
    sizes: ["M", "L", "XL", "XXL"],
    status: "published",
    featured: true,
    bestselling: false,
  },
  {
    id: "kurta-royal-linen",
    name: "Royal Linen Kurta Pyjama",
    category: "Kurta Pyjama",
    price: 7890,
    sku: "KURTA-RL-812",
    stock: 9,
    description:
      "A refined linen set with understated detailing, perfect for ceremonial comfort.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["Sand", "Mocha", "Ivory"],
    sizes: ["M", "L", "XL"],
    status: "published",
    featured: false,
    bestselling: true,
  },
  {
    id: "kurta-night-hues",
    name: "Night Hues Kurta Set",
    category: "Kurta Pyjama",
    price: 6590,
    sku: "KURTA-NH-904",
    stock: 4,
    description:
      "Rich evening tones and soft tailoring designed for festive gatherings.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["Midnight", "Burgundy", "Ivory"],
    sizes: ["M", "L", "XL", "XXL"],
    status: "draft",
    featured: false,
    bestselling: false,
  },
];

export const defaultHomepage: HomepageContent = {
  announcement: "Seasonal edit: festive handloom and heirloom tailoring. Shop the new collection.",
  hero: {
    headline: "Tradition, Woven Beautifully.",
    subtitle:
      "Discover premium Indian ethnic silhouettes in rich, modern silhouettes made for celebrations and everyday rituals.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "Shop Collection",
    ctaLink: "/category/sarees",
  },
  featuredProductIds: ["saree-kesar-silk", "fusion-emerald-suit", "kurta-heritage-ivory"],
  categoryOrder: ["sarees", "indo-western", "kurta-pyjama"],
  promo: {
    title: "Celebrate beautifully.",
    text: "Explore wedding-ready drapes, fusion silhouettes, and festive kurta dressing made to be treasured.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "Discover the edit",
    ctaLink: "/category/sarees",
  },
};

export const defaultSettings: StoreSettings = {
  storeName: "toran",
  logo: "toran",
  contactEmail: "hello@toran.in",
  contactPhone: "+91 98765 43210",
  currency: "INR (₹)",
  shippingInfo: "Free shipping on orders above ₹3999. Standard delivery within 5-7 days across India.",
  returnPolicy: "Easy 7-day returns on unused, undamaged pieces. Store credit available for selected items.",
  socialLinks: {
    instagram: "https://instagram.com/toranstudio",
    pinterest: "https://pinterest.com/toranstudio",
    facebook: "https://facebook.com/toranstudio",
  },
};

export const defaultState: StoreState = {
  products: defaultProducts,
  categories: defaultCategories,
  homepage: defaultHomepage,
  settings: defaultSettings,
};

export function getCategoryBySlug(slug: string) {
  return defaultCategories.find((category) => category.id === slug) ?? defaultCategories[0];
}

export function getPublishedProducts(products: Product[]) {
  return products.filter((product) => product.status === "published");
}

export function getDefaultStoreState(): StoreState {
  if (typeof window === "undefined") {
    return defaultState;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<StoreState>;
    return {
      products: parsed.products?.length ? parsed.products : defaultProducts,
      categories: parsed.categories?.length ? parsed.categories : defaultCategories,
      homepage: parsed.homepage ?? defaultHomepage,
      settings: parsed.settings ?? defaultSettings,
    };
  } catch {
    return defaultState;
  }
}

export function saveStoreState(nextState: StoreState) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatINR(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
