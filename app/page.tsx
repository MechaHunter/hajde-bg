import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";
import { ListingCard } from "@/components/listings/ListingCard";
import { categories, formatCount } from "@/lib/categories";
import { listings, getFeaturedListings } from "@/lib/mock-data";

export default function HomePage() {
  const featured = getFeaturedListings();
  const recent = listings.slice(0, 12);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Хайде, намери го!
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Най-лесният начин да купуваш и продаваш в България. Безплатни обяви, бързи сделки.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar large />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-10 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">200K+</span>
              <span>обяви</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">50K+</span>
              <span>потребители</span>
            </div>
            <div className="w-px h-8 bg-white/20 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-2xl font-bold text-white">12K+</span>
              <span>сделки/месец</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-800 whitespace-nowrap card-hover"
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{cat.nameBg}</p>
                <p className="text-xs text-gray-400">{formatCount(cat.count)} обяви</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">⭐ Топ обяви</h2>
            <p className="text-sm text-gray-500 mt-1">Избрани предложения за теб</p>
          </div>
          <Link href="/search?featured=true" className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
            Виж всички →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} featured />
          ))}
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📂 Всички категории</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 card-hover text-center"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <div>
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:text-orange-500 transition-colors">{cat.nameBg}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatCount(cat.count)} обяви</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Listings */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🕐 Нови обяви</h2>
            <p className="text-sm text-gray-500 mt-1">Последно публикувани</p>
          </div>
          <Link href="/search?sort=newest" className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
            Виж всички →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recent.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-20" />
          <div className="relative z-10 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Имаш нещо за продан?
            </h2>
            <p className="text-gray-300 mb-6">
              Публикувай безплатна обява за секунди и достигни до хиляди купувачи в цяла България.
            </p>
            <Link
              href="/listing/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-orange-500/25 transition-all hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Публикувай безплатно
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
