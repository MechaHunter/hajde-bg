"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { trendingSearches } from "@/lib/mock-data";

export function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState(trendingSearches);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = trendingSearches.filter((s) =>
        s.text.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.length > 0 ? filtered : trendingSearches);
    } else {
      setSuggestions(trendingSearches);
    }
  }, [query]);

  function handleSearch(searchText?: string) {
    const q = searchText || query;
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      setFocused(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className={`
        relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden transition-all
        ${focused ? "ring-2 ring-orange-500 bg-white dark:bg-gray-900 shadow-lg" : "hover:bg-gray-200/70 dark:hover:bg-gray-700/70"}
        ${large ? "h-14" : "h-11"}
      `}>
        <svg className="w-5 h-5 text-gray-400 ml-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Какво търсиш?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={`w-full bg-transparent border-none outline-none px-3 placeholder-gray-400 ${large ? "text-lg" : "text-sm"}`}
        />
        {query && (
          <button onClick={() => setQuery("")} className="p-2 mr-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          onClick={() => handleSearch()}
          className={`${large ? "px-6 h-10 mr-2" : "px-4 h-8 mr-1.5"} bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium text-sm hover:shadow-md transition-all shrink-0`}
        >
          Търси
        </button>
      </div>

      {/* Suggestions dropdown */}
      {focused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50">
          <div className="p-3">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-2">
              {query ? "Резултати" : "🔥 Популярни търсения"}
            </p>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => { setQuery(s.text); handleSearch(s.text); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group"
              >
                <svg className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="flex-1 text-sm font-medium">{s.text}</span>
                {s.count && (
                  <span className="text-xs text-gray-400">{(s.count / 1000).toFixed(1)}K</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
