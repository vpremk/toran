"use client";

import { useStoreData } from "@/components/AdminDataProvider";

export default function AdminSettingsPage() {
  const { state, updateSettings } = useStoreData();

  const handleChange = (field: keyof typeof state.settings, value: string) => {
    updateSettings({ ...state.settings, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-[#8a6b63]">Store</p>
        <h2 className="mt-2 text-4xl text-[#2f1717]">Store settings</h2>
      </div>

      <div className="rounded-[1.5rem] border border-[#eadcc2] bg-[#fffaf4] p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-[#2f1717]">
            <span>Store name</span>
            <input value={state.settings.storeName} onChange={(event) => handleChange("storeName", event.target.value)} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
          </label>
          <label className="space-y-2 text-sm text-[#2f1717]">
            <span>Logo text</span>
            <input value={state.settings.logo} onChange={(event) => handleChange("logo", event.target.value)} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
          </label>
          <label className="space-y-2 text-sm text-[#2f1717]">
            <span>Contact email</span>
            <input value={state.settings.contactEmail} onChange={(event) => handleChange("contactEmail", event.target.value)} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
          </label>
          <label className="space-y-2 text-sm text-[#2f1717]">
            <span>Contact phone</span>
            <input value={state.settings.contactPhone} onChange={(event) => handleChange("contactPhone", event.target.value)} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
          </label>
          <label className="space-y-2 text-sm text-[#2f1717] md:col-span-2">
            <span>Currency</span>
            <input value={state.settings.currency} onChange={(event) => handleChange("currency", event.target.value)} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
          </label>
          <label className="space-y-2 text-sm text-[#2f1717] md:col-span-2">
            <span>Shipping information</span>
            <textarea value={state.settings.shippingInfo} onChange={(event) => handleChange("shippingInfo", event.target.value)} rows={3} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
          </label>
          <label className="space-y-2 text-sm text-[#2f1717] md:col-span-2">
            <span>Return policy</span>
            <textarea value={state.settings.returnPolicy} onChange={(event) => handleChange("returnPolicy", event.target.value)} rows={3} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
          </label>
          <label className="space-y-2 text-sm text-[#2f1717]">
            <span>Instagram</span>
            <input value={state.settings.socialLinks.instagram} onChange={(event) => updateSettings({ ...state.settings, socialLinks: { ...state.settings.socialLinks, instagram: event.target.value } })} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
          </label>
          <label className="space-y-2 text-sm text-[#2f1717]">
            <span>Pinterest</span>
            <input value={state.settings.socialLinks.pinterest} onChange={(event) => updateSettings({ ...state.settings, socialLinks: { ...state.settings.socialLinks, pinterest: event.target.value } })} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
          </label>
          <label className="space-y-2 text-sm text-[#2f1717] md:col-span-2">
            <span>Facebook</span>
            <input value={state.settings.socialLinks.facebook} onChange={(event) => updateSettings({ ...state.settings, socialLinks: { ...state.settings.socialLinks, facebook: event.target.value } })} className="w-full rounded-xl border border-[#d8c4a3] bg-[#fff8f0] px-3 py-2.5" />
          </label>
        </div>
      </div>
    </div>
  );
}
