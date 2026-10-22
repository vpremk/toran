import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const productHref = `/product/${product.id}`;
  const priceText = product.salePrice ? `₹${product.salePrice.toLocaleString("en-IN")}` : `₹${product.price.toLocaleString("en-IN")}`;

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-[#eadfc8] bg-[#fffaf4] shadow-[0_10px_30px_rgba(47,23,23,0.04)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(47,23,23,0.08)]">
      <Link href={productHref} className="block">
        <div className="relative h-80 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.salePrice && (
            <span className="absolute left-4 top-4 rounded-full bg-[#5a1d1d] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#f9f2ea]">
              Sale
            </span>
          )}
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d6a58]">{product.category}</p>
          <Link href={productHref} className="mt-2 block text-xl font-medium text-[#2f1717] hover:text-[#7d3c2e]">
            {product.name}
          </Link>
        </div>

        <div className="flex items-center gap-2 text-base font-medium">
          <span className="text-[#2f1717]">{priceText}</span>
          {product.salePrice && (
            <span className="text-sm text-[#8d6a58] line-through">₹{product.price.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </article>
  );
}
