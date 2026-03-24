"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchBar } from "@/components/search/SearchBar";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-xl font-extrabold hidden sm:block">
            <span className="text-orange-500">hajde</span>
            <span className="text-gray-400">.bg</span>
          </span>
        </Link>

        {/* Search - hidden on mobile (shown in hero) */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          <Link
            href="/listing/new"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="hidden sm:inline">+ Публикувай</span>
            <span className="sm:hidden">+ Обява</span>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop user menu */}
          <div className="hidden md:flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center hover:ring-2 ring-orange-500 transition-all">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200/50 dark:border-gray-800/50 p-4 glass">
          <div className="mb-4">
            <SearchBar />
          </div>
          <nav className="space-y-1">
            <Link href="/" className="block px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors" onClick={() => setMenuOpen(false)}>Начало</Link>
            <Link href="/search" className="block px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors" onClick={() => setMenuOpen(false)}>Търсене</Link>
            <Link href="/listing/new" className="block px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors" onClick={() => setMenuOpen(false)}>Публикувай обява</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
