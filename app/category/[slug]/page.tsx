"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, categories } from "@/lib/categories";
import { listings } from "@/lib/mock-data";
import { ListingCard } from "@/components/listings/ListingCard";
import { SearchBar } from "@/components/search/SearchBar";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "newest", label: "Най-нови" },
  { value: "price-asc", label: "Цена ↑" },
  { value: "price-desc", label: "Цена ↓" },
  { value: "popular", label: "Популярни" },
];

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug);
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");

  // Filter listings for this category, or show all if category not found
  const categoryListings = category
    ? listings.filter((l) => l.category === category.id)
    : listings;

  const sorted = [...categoryListings].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "popular") return b.views - a.views;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-orange-500 transition-colors">Начало</Link>
        <span>/</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium">
          {category ? `${category.icon} ${category.nameBg}` : "Всички обяви"}
        </span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {category ? `${category.icon} ${category.nameBg}` : "Всички обяви"}
          </h1>
          <p className="text-gray-500 mt-1">{sorted.length} обяви</p>
        </div>
        <div className="w-full md:w-96">
          <SearchBar />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Quick filters */}
        {["Всички", "Нови", "Топ", "Спешни"].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium hover:border-orange-500 hover:text-orange-500 transition-colors whitespace-nowrap"
          >
            {filter}
          </button>
        ))}

        {/* View toggle */}
        <div className="ml-auto flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setView("grid")}
            className={cn("p-1.5 rounded-lg transition-colors", view === "grid" ? "bg-white dark:bg-gray-700 shadow-sm" : "")}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setView("list")}
            className={cn("p-1.5 rounded-lg transition-colors", view === "list" ? "bg-white dark:bg-gray-700 shadow-sm" : "")}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      {sorted.length > 0 ? (
        <div className={cn(
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : "flex flex-col gap-3"
        )}>
          {sorted.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Няма намерени обяви
          </h3>
          <p className="text-gray-500 mb-6">Опитай с различни филтри или разшири търсенето си</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
          >
            ← Към начало
          </Link>
        </div>
      )}

      {/* Other categories */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold mb-4">Разгледай и други категории</h3>
        <div className="flex gap-2 flex-wrap">
          {categories.filter((c) => c.slug !== slug).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm hover:bg-orange-50 hover:text-orange-500 dark:hover:bg-orange-500/10 transition-colors"
            >
              {cat.icon} {cat.nameBg}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
