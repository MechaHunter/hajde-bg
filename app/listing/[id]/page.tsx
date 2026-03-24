"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { listings } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";
import { ListingCard } from "@/components/listings/ListingCard";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const listing = listings.find((l) => l.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold mb-2">Обявата не е намерена</h1>
        <p className="text-gray-500 mb-6">Може да е изтрита или адресът да е грешен</p>
        <Link href="/" className="text-orange-500 font-medium hover:underline">← Към начало</Link>
      </div>
    );
  }

  const similar = listings.filter((l) => l.category === listing.category && l.id !== listing.id).slice(0, 4);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-orange-500 transition-colors">Начало</Link>
          <span>/</span>
          <Link href={`/category/${listing.category}`} className="hover:text-orange-500 transition-colors">Категория</Link>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-300 truncate">{listing.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Images + Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
                <Image
                  src={listing.images[activeImage]}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Image navigation dots */}
                {listing.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {listing.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={cn(
                          "w-2.5 h-2.5 rounded-full transition-all",
                          i === activeImage ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              {listing.images.length > 1 && (
                <div className="flex gap-2">
                  {listing.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        "relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all",
                        i === activeImage ? "border-orange-500" : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Meta */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{listing.title}</h1>
                <button
                  onClick={() => setLiked(!liked)}
                  className={cn(
                    "shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center transition-all",
                    liked ? "border-red-200 bg-red-50 dark:bg-red-500/10" : "border-gray-200 dark:border-gray-700 hover:border-red-300"
                  )}
                >
                  <svg className={cn("w-5 h-5", liked ? "text-red-500 fill-red-500" : "text-gray-400")} fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {listing.location}
                </span>
                <span>•</span>
                <span>{formatDate(listing.createdAt)}</span>
                <span>•</span>
                <span>👁 {listing.views} преглеждания</span>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mt-3">
                {listing.isFeatured && <span className="px-3 py-1 bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 text-xs font-semibold rounded-lg">⭐ Топ обява</span>}
                {listing.isUrgent && <span className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 text-xs font-semibold rounded-lg">🔥 Спешно</span>}
                {listing.condition && <span className="px-3 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-semibold rounded-lg">
                  {listing.condition === "new" ? "Ново" : listing.condition === "like-new" ? "Като ново" : listing.condition === "good" ? "Добро" : "Задоволително"}
                </span>}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold mb-3">Описание</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{listing.description}</p>
            </div>

            {/* Specs */}
            {listing.specs && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                <h2 className="text-lg font-semibold mb-3">Характеристики</h2>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(listing.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <span className="text-sm text-gray-500">{key}</span>
                      <span className="ml-auto text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Price Card */}
            <div className="sticky top-20 space-y-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {formatPrice(listing.price, listing.currency)}
                </div>
                <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-medium rounded-md">
                  ✓ Добра цена
                </span>

                <div className="mt-6 space-y-3">
                  <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]">
                    💬 Изпрати съобщение
                  </button>
                  <button
                    onClick={() => setShowPhone(!showPhone)}
                    className="w-full py-3 bg-gray-100 dark:bg-gray-800 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {showPhone ? "📞 +359 88 888 8888" : "📞 Покажи телефон"}
                  </button>
                </div>
              </div>

              {/* Seller Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={listing.seller.avatar}
                    alt={listing.seller.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold">{listing.seller.name}</span>
                      {listing.seller.isVerified && (
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="font-medium">{listing.seller.rating}</span>
                      <span>({listing.seller.reviewCount} отзива)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-500">Член от</span>
                    <span className="font-medium">{new Date(listing.seller.memberSince).toLocaleDateString("bg-BG", { year: "numeric", month: "long" })}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-500">Отговаря за</span>
                    <span className="font-medium text-emerald-500">{listing.seller.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-500">Активни обяви</span>
                    <span className="font-medium">{listing.seller.activeListings}</span>
                  </div>
                </div>

                <Link
                  href={`/profile/${listing.seller.id}`}
                  className="block text-center text-sm text-orange-500 font-medium mt-4 hover:underline"
                >
                  Виж профил →
                </Link>
              </div>

              {/* Share & Report */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm hover:border-orange-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Сподели
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm hover:border-red-500 hover:text-red-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Докладвай
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Listings */}
        {similar.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-6">Подобни обяви</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile bottom bar */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 glass border-t border-gray-200/50 dark:border-gray-800/50 px-4 py-3 flex items-center gap-3">
        <div className="flex-1">
          <div className="text-xl font-bold">{formatPrice(listing.price, listing.currency)}</div>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl">
          💬 Съобщение
        </button>
      </div>
    </div>
  );
}
