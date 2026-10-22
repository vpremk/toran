"use client";

import Link from "next/link";

import { useStoreData } from "@/components/AdminDataProvider";

export default function AdminDashboard() {
  const { state } = useStoreData();
  const productCount = state.products.length;
  const published = state.products.filter((product) => product.status === "published").length;
  const draft = state.products.filter((product) => product.status === "draft").length;
  const lowStock = state.products.filter((product) => product.stock <= 5).length;

  const statCards = [
    { label: "Total products", value: productCount },
    { label: "Published", value: published },
    { label: "Drafts", value: draft },
    { label: "Low-stock", value: lowStock },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#8a6b63]">Overview</p>
          <h2 className="mt-2 text-4xl text-[#2f1717]">Dashboard</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-[1.4rem] border border-[#eadcc2] bg-[#fffaf4] p-5 shadow-sm">
            <p className="text-sm text-[#6c4d49]">{card.label}</p>
            <p className="mt-4 text-4xl font-semibold text-[#2f1717]">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[1.5rem] border border-[#eadcc2] bg-[#fffaf4] p-6">
        <h3 className="text-2xl text-[#2f1717]">Quick actions</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Link href="/admin/products/new" className="rounded-[1.25rem] bg-[#5a1d1d] px-5 py-4 text-center text-sm font-medium text-[#fffaf4]">
            Add New Product
          </Link>
          <Link href="/admin/homepage" className="rounded-[1.25rem] border border-[#d8c4a3] bg-[#fff8f0] px-5 py-4 text-center text-sm font-medium text-[#2f1717]">
            Edit Homepage
          </Link>
          <Link href="/admin/categories" className="rounded-[1.25rem] border border-[#d8c4a3] bg-[#fff8f0] px-5 py-4 text-center text-sm font-medium text-[#2f1717]">
            Manage Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
