"use client";

import { useStoreData } from "@/components/AdminDataProvider";
import { useState } from "react";

export default function AdminHomepagePage() {
  const { state, updateHomepage } = useStoreData();
  const [draft, setDraft] = useState(state.homepage);

  const handleChange = (field: string, value: string | string[]) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const saveHomepage = () => {
    updateHomepage(draft);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-[#8a6b63]">Marketing</p>
        <h2 className="mt-2 text-4xl text-[#2f1717]">Homepage content</h2>
      </div>

      <div className="rounded-[1.5rem] border border-[#eadcc2] bg-[#fffaf4] p-5">
        <div className="space-y-5">
          <label className="block space-y-2 text-sm text-[#2f1717]">
            <span>Announcement bar</span>
            <input
              value={draft.announcement}
              onChange={(event) => handleChange("announcement", event.target.value)}
              className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Hero headline</span>
              <input
                value={draft.hero.headline}
                onChange={(event) => setDraft({ ...draft, hero: { ...draft.hero, headline: event.target.value } })}
                className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
              />
            </label>

            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Hero CTA text</span>
              <input
                value={draft.hero.ctaLabel}
                onChange={(event) => setDraft({ ...draft, hero: { ...draft.hero, ctaLabel: event.target.value } })}
                className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
              />
            </label>
          </div>

          <label className="block space-y-2 text-sm text-[#2f1717]">
            <span>Hero subtitle</span>
            <textarea
              value={draft.hero.subtitle}
              onChange={(event) => setDraft({ ...draft, hero: { ...draft.hero, subtitle: event.target.value } })}
              rows={3}
              className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Hero image URL</span>
              <input
                value={draft.hero.image}
                onChange={(event) => setDraft({ ...draft, hero: { ...draft.hero, image: event.target.value } })}
                className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
              />
            </label>
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Hero CTA destination</span>
              <input
                value={draft.hero.ctaLink}
                onChange={(event) => setDraft({ ...draft, hero: { ...draft.hero, ctaLink: event.target.value } })}
                className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Promo title</span>
              <input
                value={draft.promo.title}
                onChange={(event) => setDraft({ ...draft, promo: { ...draft.promo, title: event.target.value } })}
                className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
              />
            </label>
            <label className="space-y-2 text-sm text-[#2f1717]">
              <span>Promo button label</span>
              <input
                value={draft.promo.ctaLabel}
                onChange={(event) => setDraft({ ...draft, promo: { ...draft.promo, ctaLabel: event.target.value } })}
                className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
              />
            </label>
          </div>

          <label className="block space-y-2 text-sm text-[#2f1717]">
            <span>Promo text</span>
            <textarea
              value={draft.promo.text}
              onChange={(event) => setDraft({ ...draft, promo: { ...draft.promo, text: event.target.value } })}
              rows={3}
              className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
            />
          </label>

          <label className="block space-y-2 text-sm text-[#2f1717]">
            <span>Promo image URL</span>
            <input
              value={draft.promo.image}
              onChange={(event) => setDraft({ ...draft, promo: { ...draft.promo, image: event.target.value } })}
              className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5"
            />
          </label>

          <div className="flex flex-wrap gap-3 pt-4">
            <button
              type="button"
              onClick={saveHomepage}
              className="rounded-full bg-[#5a1d1d] px-5 py-2.5 text-sm font-medium text-[#fffaf4]"
            >
              Save homepage
            </button>
            <button
              type="button"
              onClick={() => setDraft(state.homepage)}
              className="rounded-full border border-[#d8c4a3] bg-[#fff8f0] px-5 py-2.5 text-sm font-medium text-[#2f1717]"
            >
              Reset changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
