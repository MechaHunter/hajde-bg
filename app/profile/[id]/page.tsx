"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { listings } from "@/lib/mock-data";
import { ListingCard } from "@/components/listings/ListingCard";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const sellerListings = listings.filter((l) => l.seller.id === id);
  const seller = sellerListings[0]?.seller || listings[0].seller;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="relative mb-8">
        <div className="h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl" />
        <div className="flex flex-col sm:flex-row items-start gap-4 -mt-12 px-6">
          <Image
            src={seller.avatar}
            alt={seller.name}
            width={96}
            height={96}
            className="rounded-2xl border-4 border-white dark:border-gray-950 shadow-lg"
          />
          <div className="pt-2 sm:pt-14">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{seller.name}</h1>
              {seller.isVerified && (
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {seller.rating} ({seller.reviewCount} отзива)
              </span>
              <span>Член от {new Date(seller.memberSince).getFullYear()}</span>
              <span className="text-emerald-500">Отговаря за {seller.responseTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Listings */}
      <h2 className="text-xl font-bold mb-4">Обяви ({sellerListings.length || listings.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {(sellerListings.length > 0 ? sellerListings : listings.slice(0, 4)).map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
