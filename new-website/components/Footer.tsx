import Link from "next/link";

const links = [
  { label: "About Us", href: "/" },
  { label: "Contact", href: "/" },
  { label: "Shipping", href: "/" },
  { label: "Returns", href: "/" },
  { label: "Privacy Policy", href: "/" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#e3d7c7] bg-[#f7f3ee]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 text-sm text-[#5a3a36] sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-[0.18em] text-[#2f1717] uppercase">toran</p>
          <p className="mt-4 max-w-md leading-7 text-[#604d49]">
            Thoughtfully crafted ethnicwear for meaningful celebrations, intimate rituals, and unforgettable moments.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors hover:text-[#7d3c2e]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
