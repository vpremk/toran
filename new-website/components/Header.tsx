"use client";

import Link from "next/link";

import { useCart } from "@/components/CartProvider";

const navItems = [
  { label: "Sarees", href: "/category/sarees" },
  { label: "Women's Ethnic Wear", href: "/category/womens-ethnic-wear" },
  { label: "Men's Ethnic Wear", href: "/category/mens-ethnic-wear" },
  { label: "Wedding Collection", href: "/category/wedding-collection" },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M6 9h12l-1 11H7L6 9Z" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-[#e3d7c7] bg-[#f7f3ee]/95 backdrop-blur-sm">
      <div className="bg-[#2f1717] px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-[#f3e5d2]">
        Seasonal edit: festive silhouettes, handwoven textures & heirloom details.
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-semibold tracking-[0.18em] text-[#2f1717] uppercase">
            toran
          </Link>
        </div>

        <nav className="hidden items-center gap-7 text-sm text-[#4b2e2a] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-[#7d3c2e]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-[#2f1717]">
          <button
            type="button"
            aria-label="Search products"
            className="rounded-full border border-[#dcc8aa] p-2.5 transition-colors hover:bg-[#f2e8db]"
          >
            <SearchIcon />
          </button>

          <Link
            href="/cart"
            aria-label="View shopping cart"
            className="relative flex items-center gap-2 rounded-full border border-[#dcc8aa] bg-[#fffaf4] px-3 py-2 text-sm font-medium transition-colors hover:bg-[#f5ebdf]"
          >
            <BagIcon />
            <span>Bag</span>
            {itemCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#5a1d1d] px-1 text-[10px] font-semibold text-[#fffaf4]">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
