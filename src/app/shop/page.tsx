"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from "lucide-react";

const products = [
  { name: "Family Wellness Kit", category: "Health Tech", price: 89, tag: "Best Seller" },
  { name: "Smart Prayer Journal", category: "Tools", price: 38, tag: "New" },
  { name: "Faith Home Cards", category: "Family Accessories", price: 24, tag: "Popular" },
  { name: "Leadership Workbook", category: "Coaching", price: 42, tag: "Digital" },
  { name: "Purpose Planner", category: "Tools", price: 34, tag: "Featured" },
  { name: "Family Devotional Set", category: "Family Accessories", price: 55, tag: "Limited" },
  { name: "Wellness Reflection Cards", category: "Health Tech", price: 29, tag: "New" },
  { name: "Home Prayer Bundle", category: "Family Accessories", price: 64, tag: "Bundle" },
];

const categories = ["All", "Health Tech", "Tools", "Family Accessories", "Coaching", "Digital"];

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.tag.toLowerCase().includes(query.toLowerCase());

      const matchesCategory = category === "All" || product.category === category;
      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [query, category, sort, maxPrice]);

  return (
    <main className="min-h-screen bg-[#FFF8F2]">
      <Link
        href="/"
        className="fixed left-6 top-24 z-50 inline-flex items-center gap-2 rounded-full border border-[#1F1F1F]/10 bg-white/85 px-5 py-2.5 text-sm font-medium text-[#1F1F1F] shadow-sm backdrop-blur transition hover:bg-white"
      >
        <ArrowLeft size={15} />
        Back to Home
      </Link>

      <section className="px-6 pb-14 pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                Premium Store
              </span>
              <h1 className="mt-5 text-5xl font-semibold tracking-tight text-[#1F1F1F] md:text-7xl">
                Shop Purity
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#1F1F1F]/60">
                Health Tech, Tools, Family Accessories and more.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#1F1F1F]/5 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="text-[#C9A75D]" size={24} />
                <div>
                  <p className="text-sm font-semibold text-[#1F1F1F]">Curated Collection</p>
                  <p className="mt-1 text-xs text-[#1F1F1F]/50">
                    Faith, wellness, leadership, and family.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <div className="flex items-center gap-3 rounded-2xl border border-[#1F1F1F]/10 bg-white px-5 py-4 shadow-sm">
              <Search size={18} className="text-[#1F1F1F]/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, collections, tools..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#1F1F1F]/40"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-2xl border border-[#1F1F1F]/10 bg-white px-5 py-4 text-sm font-medium shadow-sm outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>

            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-[#1F1F1F]/10 bg-white px-5 py-4 text-sm font-medium shadow-sm transition hover:bg-[#F8F3EB]"
            >
              <SlidersHorizontal size={18} />
              Advanced Filters
            </button>
          </div>

          <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  category === item
                    ? "bg-[#1F1F1F] text-white"
                    : "border border-[#1F1F1F]/10 bg-white text-[#1F1F1F]/65 hover:bg-[#F8F3EB]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-6 text-sm text-[#1F1F1F]/50">
            Showing {filteredProducts.length} products
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.name}
                className="group rounded-[2rem] border border-[#1F1F1F]/5 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative mb-5 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-white via-[#FFF8F2] to-[#F5E4E7]">
                  <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#C9A75D]">
                    {product.tag}
                  </div>
                  <ShoppingBag className="text-[#1F1F1F]/20 transition duration-500 group-hover:scale-110" size={58} />
                </div>

                <div className="mb-3 flex items-center gap-1 text-[#C9A75D]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                      {product.category}
                    </p>
                    <h3 className="mt-2 text-base font-semibold text-[#1F1F1F]">{product.name}</h3>
                  </div>
                  <p className="font-semibold text-[#1F1F1F]">${product.price}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#1F1F1F]/5 pt-4">
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-[#1F1F1F] transition hover:text-[#C9A75D]">
                    View Details <ArrowRight size={14} />
                  </button>
                  <Heart size={18} className="text-[#1F1F1F]/35 transition group-hover:text-[#C9A75D]" />
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="rounded-[2rem] border border-[#1F1F1F]/5 bg-white p-10 text-center shadow-sm">
              <p className="text-lg font-semibold">No products found.</p>
              <p className="mt-2 text-sm text-[#1F1F1F]/55">Try a different search or filter.</p>
            </div>
          )}
        </div>
      </section>

      {drawerOpen && (
        <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm" onClick={() => setDrawerOpen(false)}>
          <aside
            onClick={(e) => e.stopPropagation()}
            className="ml-auto h-full w-full max-w-md bg-[#FFF8F2] p-6 shadow-2xl"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Advanced Filters</h2>
                <p className="mt-1 text-sm text-[#1F1F1F]/55">Refine the product catalog.</p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="rounded-full bg-white p-3 shadow-sm">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <p className="mb-4 text-sm font-semibold">Category</p>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((item) => (
                    <button
                      key={item}
                      onClick={() => setCategory(item)}
                      className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                        category === item ? "bg-[#1F1F1F] text-white" : "bg-white text-[#1F1F1F]/65"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">Max Price</p>
                  <p className="text-sm text-[#C9A75D]">${maxPrice}</p>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full rounded-full bg-[#C9A75D] px-6 py-4 text-sm font-medium text-white"
              >
                Apply Filters
              </button>

              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  setSort("featured");
                  setMaxPrice(100);
                }}
                className="w-full rounded-full bg-white px-6 py-4 text-sm font-medium text-[#1F1F1F]"
              >
                Reset All
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
