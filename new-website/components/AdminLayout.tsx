"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const navItems = [
	{ label: "Dashboard", href: "/admin" },
	{ label: "Products", href: "/admin/products" },
	{ label: "Categories", href: "/admin/categories" },
	{ label: "Homepage Content", href: "/admin/homepage" },
	{ label: "Store Settings", href: "/admin/settings" },
];

function AdminNavigation({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="min-h-screen bg-[#f8f3ee] text-[#2f1717]">
			<div className="border-b border-[#e7d9c6] bg-[#fffaf4]">
				<div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
					<div>
						<p className="text-xs uppercase tracking-[0.26em] text-[#7d3c2e]">
							toran Studio
						</p>
						<h1 className="mt-1 text-2xl text-[#2f1717]">Admin Panel</h1>
					</div>
					<Link
						href="/"
						className="rounded-full border border-[#d8c4a3] bg-[#fff8f0] px-4 py-2 text-sm font-medium text-[#2f1717]"
					>
						View storefront
					</Link>
				</div>
			</div>

			<div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
				<aside className="rounded-[1.5rem] border border-[#eadcc2] bg-[#fffaf4] p-4">
					<nav className="space-y-2">
						{navItems.map((item) => {
							const active = pathname === item.href;
							return (
								<Link
									key={item.href}
									href={item.href}
									className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
										active
											? "bg-[#5a1d1d] text-[#fffaf4]"
											: "text-[#4b2e2a] hover:bg-[#f6ecdf]"
									}`}
								>
									{item.label}
								</Link>
							);
						})}
					</nav>
				</aside>

				<div className="min-w-0">{children}</div>
			</div>
		</div>
	);
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={<div className="min-h-screen bg-[#f8f3ee] text-[#2f1717]">Loading admin…</div>}>
			<AdminNavigation>{children}</AdminNavigation>
		</Suspense>
	);
}
