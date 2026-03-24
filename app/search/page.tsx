"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { ListingCard } from "@/components/listings/ListingCard";
import { searchListings, listings } from "@/lib/mock-data";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = query ? searchListings(query) : listings;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="max-w-2xl mb-8">
        <SearchBar large />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {query ? `Резултати за "${query}"` : "Всички обяви"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{results.length} обяви</p>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Няма резултати за &ldquo;{query}&rdquo;</h3>
          <p className="text-gray-500">Опитай с различни ключови думи</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-6"><div className="h-14 skeleton rounded-2xl mb-8 max-w-2xl" /><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-72 skeleton rounded-2xl" />)}</div></div>}>
      <SearchResults />
    </Suspense>
  );
}
