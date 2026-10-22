"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { useStoreData } from "@/components/AdminDataProvider";
import { formatINR } from "@/lib/store-data";

export default function AdminProductsPage() {
  const { state } = useStoreData();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const visibleProducts = useMemo(() => {
    return state.products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" ? true : product.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [filter, search, state.products]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#8a6b63]">Catalog</p>
          <h2 className="mt-2 text-4xl text-[#2f1717]">Products</h2>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-[#5a1d1d] px-5 py-3 text-sm font-medium text-[#fffaf4]"
        >
          + Add Product
        </Link>
      </div>

      <div className="rounded-[1.4rem] border border-[#eadcc2] bg-[#fffaf4] p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or SKU"
            className="w-full rounded-full border border-[#d8c4a3] bg-[#fff8f0] px-4 py-2.5 text-sm text-[#2f1717] outline-none md:max-w-xs"
          />
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-full border border-[#d8c4a3] bg-[#fff8f0] px-4 py-2.5 text-sm text-[#2f1717] outline-none"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {visibleProducts.map((product) => (
          <div key={product.id} className="flex flex-col gap-4 rounded-[1.4rem] border border-[#eadcc2] bg-[#fffaf4] p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-[#eadcc2] bg-[#f9efe5]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-lg font-medium text-[#2f1717]">{product.name}</p>
                <p className="text-sm text-[#6f4d4b]">{product.category}</p>
                <p className="mt-1 text-sm text-[#6f4d4b]">{product.status}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-[#2f1717] md:justify-end">
              <span>{formatINR(product.price)}</span>
              <span className="rounded-full bg-[#f5ebdf] px-2.5 py-1">{product.stock} in stock</span>
              <Link href={`/admin/products/${product.id}`} className="rounded-full border border-[#d8c4a3] px-3 py-2">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {!visibleProducts.length && (
        <div className="rounded-[1.4rem] border border-dashed border-[#d8c4a3] bg-[#fffaf4] p-8 text-center text-[#5c3d39]">
          No products match your current filters.
        </div>
      )}
    </div>
  );
}
