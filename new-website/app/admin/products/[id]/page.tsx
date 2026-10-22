"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useStoreData } from "@/components/AdminDataProvider";
import {
  CATEGORY_OPTIONS,
  type Product,
  type ProductCategory,
  type ProductStatus,
  slugify,
} from "@/lib/store-data";

const emptyProduct = (category: ProductCategory = "Sarees"): Product => ({
  id: "new-product",
  name: "",
  category,
  price: 0,
  description: "",
  image:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  gallery: [],
  colors: [],
  sizes: [],
  stock: 0,
  sku: "",
  status: "draft",
  featured: false,
  bestselling: false,
});

export default function ProductEditorPage() {
  const router = useRouter();
  const params = useParams();
  const { state, updateProducts } = useStoreData();
  const productId = String(params.id ?? "new");
  const existingProduct = state.products.find((product) => product.id === productId);
  const [product, setProduct] = useState<Product>(existingProduct ?? emptyProduct());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useMemo(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    }
  }, [existingProduct]);

  const handleField = (field: keyof Product, value: Product[keyof Product]) => {
    setProduct((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field as string]: "" }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!product.name.trim()) nextErrors.name = "Product name is required.";
    if (!product.description.trim()) nextErrors.description = "Description is required.";
    if (!product.sku.trim()) nextErrors.sku = "SKU is required.";
    if (!product.price || product.price <= 0) nextErrors.price = "Price must be greater than zero.";
    if (product.stock < 0) nextErrors.stock = "Stock cannot be negative.";
    if (!product.image.trim()) nextErrors.image = "Image URL is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = (status: ProductStatus) => {
    if (!validate()) return;

    const nextProduct: Product = {
      ...product,
      status,
      id:
        product.id === "new-product" || !product.id
          ? `${slugify(product.category)}-${Date.now()}`
          : product.id,
    };

    const nextProducts = existingProduct
      ? state.products.map((item) => (item.id === existingProduct.id ? nextProduct : item))
      : [nextProduct, ...state.products];

    updateProducts(nextProducts);
    router.push("/admin/products");
  };

  const handleDelete = () => {
    if (!window.confirm("Delete this product? This action cannot be undone.")) return;
    const nextProducts = state.products.filter((item) => item.id !== product.id);
    updateProducts(nextProducts);
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#8a6b63]">Catalog</p>
          <h2 className="mt-2 text-4xl text-[#2f1717]">{existingProduct ? "Edit product" : "Add product"}</h2>
        </div>
        {existingProduct && (
          <button type="button" onClick={handleDelete} className="rounded-full bg-[#5a1d1d] px-4 py-2 text-sm font-medium text-[#fffaf4]">
            Delete
          </button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-[1.5rem] border border-[#eadcc2] bg-[#fffaf4] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Product name</span>
              <input value={product.name} onChange={(event) => handleField("name", event.target.value)} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
              {errors.name && <span className="text-red-700">{errors.name}</span>}
            </label>

            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Category</span>
              <select value={product.category} onChange={(event) => handleField("category", event.target.value as ProductCategory)} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5">
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block space-y-2 text-sm text-[#2f1717]">
            <span>Description</span>
            <textarea value={product.description} onChange={(event) => handleField("description", event.target.value)} rows={5} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
            {errors.description && <span className="text-red-700">{errors.description}</span>}
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Price (₹)</span>
              <input type="number" value={product.price} onChange={(event) => handleField("price", Number(event.target.value))} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
              {errors.price && <span className="text-red-700">{errors.price}</span>}
            </label>
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Sale price (₹)</span>
              <input type="number" value={product.salePrice ?? ""} onChange={(event) => handleField("salePrice", Number(event.target.value) || undefined)} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
            </label>
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Stock</span>
              <input type="number" value={product.stock} onChange={(event) => handleField("stock", Number(event.target.value))} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
              {errors.stock && <span className="text-red-700">{errors.stock}</span>}
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>SKU</span>
              <input value={product.sku} onChange={(event) => handleField("sku", event.target.value)} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
              {errors.sku && <span className="text-red-700">{errors.sku}</span>}
            </label>
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Status</span>
              <select value={product.status} onChange={(event) => handleField("status", event.target.value as ProductStatus)} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Colors</span>
              <input value={product.colors.join(", ")} onChange={(event) => handleField("colors", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
            </label>
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Sizes</span>
              <input value={product.sizes.join(", ")} onChange={(event) => handleField("sizes", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
            </label>
          </div>
        </div>

        <div className="space-y-6 rounded-[1.5rem] border border-[#eadcc2] bg-[#fffaf4] p-6">
          <label className="block space-y-2 text-sm text-[#2f1717]">
            <span>Primary image URL</span>
            <input value={product.image} onChange={(event) => handleField("image", event.target.value)} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
            {errors.image && <span className="text-red-700">{errors.image}</span>}
          </label>

          <div className="overflow-hidden rounded-[1.1rem] border border-[#eadcc2] bg-[#f9efe5]">
            <img src={product.image || "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"} alt={product.name || "Product preview"} className="h-64 w-full object-cover" />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm text-[#2f1717]">
              <input type="checkbox" checked={product.featured} onChange={(event) => handleField("featured", event.target.checked)} />
              Mark as featured
            </label>
            <label className="flex items-center gap-3 text-sm text-[#2f1717]">
              <input type="checkbox" checked={product.bestselling} onChange={(event) => handleField("bestselling", event.target.checked)} />
              Mark as bestselling
            </label>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#eadcc2]">
            <button type="button" onClick={() => handleSave("draft")} className="w-full rounded-full border border-[#d8c4a3] bg-[#fff8f0] px-4 py-2.5 text-sm font-medium text-[#2f1717]">
              Save as Draft
            </button>
            <button type="button" onClick={() => handleSave("published")} className="w-full rounded-full bg-[#5a1d1d] px-4 py-2.5 text-sm font-medium text-[#fffaf4]">
              Publish Product
            </button>
            <Link href="/admin/products" className="block w-full rounded-full border border-[#d8c4a3] bg-transparent px-4 py-2.5 text-center text-sm font-medium text-[#2f1717]">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
