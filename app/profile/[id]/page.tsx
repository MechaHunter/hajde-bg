"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { listings } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const sellerListings = listings.filter((l) => l.seller.id === id);
  const seller = sellerListings[0]?.seller || listings[0].seller;

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: 20 }}>
        {/* Seller info */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, padding: 20, background: "#f9f9f9", borderRadius: 8 }}>
          <Image src={seller.avatar} alt="" width={64} height={64} style={{ borderRadius: "50%" }} />
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>
              {seller.name}
              {seller.isVerified && <span style={{ color: "#86b817", marginLeft: 6 }} title="Потвърден">&#10003;</span>}
            </h1>
            <div style={{ fontSize: 13, color: "#999" }}>
              {seller.rating}/5 ({seller.reviewCount} отзива) &middot; Член от {new Date(seller.memberSince).getFullYear()} &middot; Отговаря за {seller.responseTime}
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Обяви ({sellerListings.length || listings.length})</h2>

        {/* Listings - Craigslist list style */}
        <div>
          {(sellerListings.length > 0 ? sellerListings : listings.slice(0, 6)).map((item) => (
            <div key={item.id} className="result-row">
              {item.images[0] && (
                <Image src={item.images[0]} alt="" width={80} height={60} className="result-thumb" />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <Link href={`/listing/${item.id}`} className="result-title">{item.title}</Link>
                <div className="result-meta">{item.city} &middot; {formatDate(item.createdAt)}</div>
              </div>
              <div className="result-price">{formatPrice(item.price, item.currency)}</div>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
