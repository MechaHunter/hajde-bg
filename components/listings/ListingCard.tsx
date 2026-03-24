"use client";

import Image from "next/image";
import Link from "next/link";
import { Listing } from "@/lib/types";
import { formatPrice, formatDate, cn } from "@/lib/utils";
import { useState } from "react";

export function ListingCard({ listing, featured = false }: { listing: Listing; featured?: boolean }) {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      href={`/listing/${listing.id}`}
      className={cn(
        "group block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden card-hover border border-gray-100 dark:border-gray-800",
        featured && "ring-2 ring-orange-500/20"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {listing.isFeatured && (
            <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-semibold rounded-lg shadow-sm">
              ⭐ Топ
            </span>
          )}
          {listing.isUrgent && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg shadow-sm">
              🔥 Спешно
            </span>
          )}
          {listing.condition === "new" && (
            <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm">
              Ново
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-all"
        >
          <svg className={cn("w-5 h-5 transition-colors", liked ? "text-red-500 fill-red-500" : "text-gray-400")} fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Image count */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded-lg backdrop-blur-sm">
            📷 {listing.images.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {formatPrice(listing.price, listing.currency)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200 line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors">
          {listing.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{listing.city}</span>
          </div>
          <span>{formatDate(listing.createdAt)}</span>
        </div>

        {/* Seller */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <Image
            src={listing.seller.avatar}
            alt={listing.seller.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{listing.seller.name}</span>
          {listing.seller.isVerified && (
            <svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <div className="ml-auto flex items-center gap-0.5">
            <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-xs font-medium text-gray-500">{listing.seller.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
