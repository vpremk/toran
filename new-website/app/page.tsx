import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import { categories, getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="pb-16">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-[#eadcc2] bg-[#f7efe5]">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 p-8 sm:p-10 lg:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-[#7d3c2e]">
                New season arrival
              </p>
              <h1 className="max-w-xl text-5xl leading-none text-[#2f1717] sm:text-6xl">
                Tradition, Woven Beautifully.
              </h1>
              <p className="max-w-lg text-base leading-7 text-[#5e413f]">
                Discover heirloom-inspired silhouettes in handwoven textures, rich
                color stories, and modern tailoring designed for meaningful
                moments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/category/wedding-collection"
                  className="rounded-full bg-[#5a1d1d] px-6 py-3 text-sm font-medium text-[#fffaf4] transition-opacity hover:opacity-90"
                >
                  Shop Collection
                </Link>
                <Link
                  href="/category/sarees"
                  className="rounded-full border border-[#caa878] bg-transparent px-6 py-3 text-sm font-medium text-[#2f1717] transition-colors hover:bg-[#f2e7d7]"
                >
                  Explore Sarees
                </Link>
              </div>
            </div>

            <div className="relative h-[520px] min-h-[420px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
                alt="Woman in a saree"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8a6b63]">
              Curated edit
            </p>
            <h2 className="mt-2 text-4xl text-[#2f1717]">Shop by category</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-[1.7rem] border border-[#eadcc2] bg-[#fffaf4]"
            >
              <div className="relative h-96">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d0e0f]/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-[#fffaf4]">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#f4dcc1]">
                    Collection
                  </p>
                  <h3 className="mt-2 text-3xl">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8a6b63]">
              Most loved
            </p>
            <h2 className="mt-2 text-4xl text-[#2f1717]">Featured pieces</h2>
          </div>
          <Link
            href="/category/sarees"
            className="text-sm font-medium text-[#5a1d1d] hover:text-[#7d3c2e]"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-[#eadcc2] bg-[#f2e8d7]">
          <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative h-[340px]">
              <Image
                src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
                alt="Wedding collection promotional image"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6 p-8 sm:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7d3c2e]">
                Wedding edit
              </p>
              <h2 className="text-4xl text-[#2f1717] sm:text-5xl">
                Celebrate your forever story.
              </h2>
              <p className="max-w-md text-base leading-7 text-[#5a3d3a]">
                Explore statement lehengas, sherwanis, and heirloom-inspired
                ensembles designed for your most cherished rituals.
              </p>
              <Link
                href="/category/wedding-collection"
                className="inline-flex rounded-full bg-[#5a1d1d] px-6 py-3 text-sm font-medium text-[#fffaf4] transition-colors hover:bg-[#3f1616]"
              >
                Discover Wedding Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
