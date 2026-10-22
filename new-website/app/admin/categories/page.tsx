"use client";

import { useStoreData } from "@/components/AdminDataProvider";

export default function AdminCategoriesPage() {
  const { state, updateCategories } = useStoreData();

  const handleChange = (id: string, key: "name" | "description" | "bannerImage", value: string) => {
    const nextCategories = state.categories.map((category) =>
      category.id === id ? { ...category, [key]: value } : category,
    );
    updateCategories(nextCategories);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-[#8a6b63]">Catalog</p>
        <h2 className="mt-2 text-4xl text-[#2f1717]">Categories</h2>
      </div>

      <div className="space-y-5">
        {state.categories.map((category) => (
          <div key={category.id} className="rounded-[1.5rem] border border-[#eadcc2] bg-[#fffaf4] p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-2xl text-[#2f1717]">{category.name}</h3>
              <span className="rounded-full bg-[#f5ebdf] px-2.5 py-1 text-xs uppercase tracking-[0.18em] text-[#5a1d1d]">
                {category.id}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
              <label className="space-y-2 text-sm text-[#2f1717]">
                <span>Display name</span>
                <input
                  value={category.name}
                  onChange={(event) => handleChange(category.id, "name", event.target.value)}
                  className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
                />
              </label>

              <label className="space-y-2 text-sm text-[#2f1717]">
                <span>Banner image URL</span>
                <input
                  value={category.bannerImage}
                  onChange={(event) => handleChange(category.id, "bannerImage", event.target.value)}
                  className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
                />
              </label>
            </div>

            <label className="mt-4 block space-y-2 text-sm text-[#2f1717]">
              <span>Description</span>
              <textarea
                value={category.description}
                onChange={(event) => handleChange(category.id, "description", event.target.value)}
                rows={4}
                className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
