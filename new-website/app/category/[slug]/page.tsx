"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGrid } from "@/components/ProductGrid";
import { categories, getProductsByCategory } from "@/lib/products";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "sale", label: "On Sale" },
  { value: "wedding", label: "Wedding" },
  { value: "classic", label: "Classic" },
  { value: "festive", label: "Festive" },
];

function getPriceDisplayValue(product: (typeof import("@/lib/products").products)[number]) {
  return product.salePrice ?? product.price;
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryConfig = categories.find((category) => category.slug === params.slug);

  if (!categoryConfig) {
    notFound();
  }

  const allProducts = getProductsByCategory(params.slug);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    let nextProducts = [...allProducts];

    if (filter !== "all") {
      const filterMap: Record<string, (product: (typeof products)[number]) => boolean> = {
        sale: (product) => Boolean(product.salePrice),
        wedding: (product) => product.category === "Sarees" || product.category === "Indo-Western",
        classic: (product) => product.name.toLowerCase().includes("saree") || product.category === "Kurta Pyjama",
        festive: (product) => product.stock > 0,
      };

      nextProducts = nextProducts.filter((product) => filterMap[filter](product));
    }

    if (sort === "low-high") {
      nextProducts.sort((a, b) => (getPriceDisplayValue(a) > getPriceDisplayValue(b) ? 1 : -1));
    }

    if (sort === "high-low") {
      nextProducts.sort((a, b) => (getPriceDisplayValue(a) < getPriceDisplayValue(b) ? 1 : -1));
    }

    return nextProducts;
  }, [allProducts, filter, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-[#eadcc2] bg-[#fffaf4]">
        <div className="grid items-center gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 p-8 sm:p-10 lg:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7d3c2e]">Collection</p>
            <h1 className="text-5xl text-[#2f1717] sm:text-6xl">{categoryConfig.name}</h1>
            <p className="max-w-md text-base leading-7 text-[#5a3d3a]">{categoryConfig.description}</p>
          </div>
          <div className="relative h-[300px] lg:h-full">
            <Image
              src={categoryConfig.image}
              alt={categoryConfig.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 rounded-[1.5rem] border border-[#eadcc2] bg-[#fffaf4] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                filter === option.value
                  ? "border-[#5a1d1d] bg-[#5a1d1d] text-[#fffaf4]"
                  : "border-[#d8c4a3] bg-[#fff8f0] text-[#3c2120] hover:bg-[#f9efdf]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm text-[#4f2d2a]">
          <label htmlFor="sort" className="font-medium">
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2 focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        {filteredProducts.length ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-[#d1b28a] bg-[#fffaf4] p-10 text-center text-[#5f3e3a]">
            No products currently match the selected filter. Try another style to continue shopping.
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/" className="rounded-full border border-[#caa878] px-5 py-3 text-sm font-medium text-[#2f1717] transition-colors hover:bg-[#f2e7d7]">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
