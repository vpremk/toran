"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/components/CartProvider";
import { getCategorySlug, getProductById, products } from "@/lib/products";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    notFound();
  }

  const categoryHref = `/category/${getCategorySlug(product.category)}`;
  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 text-sm text-[#6f4d4b]">
        <Link href="/" className="hover:text-[#7d3c2e]">Home</Link>
        <span className="mx-2">/</span>
        <Link href={categoryHref} className="hover:text-[#7d3c2e]">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="relative h-[500px] overflow-hidden rounded-[1.8rem] border border-[#eadcc2] bg-[#fffaf4] sm:h-[620px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1000px) 100vw, 55vw"
              className="object-cover"
            />
          </div>

          {product.gallery && product.gallery.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {product.gallery.map((image) => (
                <div key={image} className="relative h-40 overflow-hidden rounded-[1.2rem] border border-[#eadcc2] bg-[#fffaf4]">
                  <Image src={image} alt={`${product.name} lifestyle`} fill sizes="(max-width: 768px) 50vw, 30vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[1.8rem] border border-[#eadcc2] bg-[#fffaf4] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8a6b63]">{product.category}</p>
          <h1 className="mt-3 text-4xl text-[#2f1717] sm:text-5xl">{product.name}</h1>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-2xl font-semibold text-[#2f1717]">
              ₹{(product.salePrice ?? product.price).toLocaleString("en-IN")}
            </span>
            {product.salePrice && (
              <span className="text-lg text-[#8d6a58] line-through">₹{product.price.toLocaleString("en-IN")}</span>
            )}
          </div>

          <p className="mt-6 text-base leading-7 text-[#563f3d]">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-[#2f1717]">Available colors</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-3 py-2 text-sm transition-colors ${
                      selectedColor === color
                        ? "border-[#5a1d1d] bg-[#5a1d1d] text-[#fefaf7]"
                        : "border-[#d4c1a5] bg-[#fffaf4] text-[#4d2d2c] hover:bg-[#f3eade]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-[#2f1717]">Available sizes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-3 py-2 text-sm transition-colors ${
                      selectedSize === size
                        ? "border-[#5a1d1d] bg-[#5a1d1d] text-[#fefaf7]"
                        : "border-[#d4c1a5] bg-[#fffaf4] text-[#4d2d2c] hover:bg-[#f3eade]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center overflow-hidden rounded-full border border-[#d4c1a5] bg-[#fffaf5]">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="flex h-11 w-11 items-center justify-center text-lg text-[#2f1717] hover:bg-[#f2e6d4]"
              >
                −
              </button>
              <span className="w-12 text-center text-sm font-medium text-[#2f1717]">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((current) => current + 1)}
                className="flex h-11 w-11 items-center justify-center text-lg text-[#2f1717] hover:bg-[#f2e6d4]"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-[#5a1d1d] px-6 py-3 text-sm font-medium text-[#fffaf4] transition-opacity hover:opacity-90"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-8 border-t border-[#e8d8c3] pt-6">
            <h2 className="text-xl text-[#2f1717]">Fabric & care</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#563f3d]">
              <li>
                <span className="font-medium text-[#2f1717]">Fabric:</span> {product.fabric}
              </li>
              <li>
                <span className="font-medium text-[#2f1717]">Care:</span> {product.care}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#8a6b63]">Recommended</p>
            <h2 className="mt-2 text-4xl text-[#2f1717]">Related picks</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
