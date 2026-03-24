"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { listings } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";
import { useState } from "react";

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const listing = listings.find((l) => l.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [showPhone, setShowPhone] = useState(false);

  if (!listing) {
    return (
      <>
        <Header />
        <div className="container" style={{ textAlign: "center", padding: 60 }}>
          <h1 style={{ fontSize: 18 }}>Обявата не е намерена</h1>
          <p style={{ color: "#999" }}>Може да е изтрита или адресът да е грешен.</p>
          <Link href="/" style={{ color: "#86b817" }}>Към начална страница</Link>
        </div>
        <SiteFooter />
      </>
    );
  }

  const similar = listings.filter((l) => l.category === listing.category && l.id !== listing.id).slice(0, 3);

  // Price intelligence
  const catListings = listings.filter(l => l.category === listing.category && l.id !== listing.id);
  const avgPrice = catListings.length > 0 ? catListings.reduce((s, l) => s + l.price, 0) / catListings.length : 0;
  const priceDiff = avgPrice > 0 ? ((listing.price - avgPrice) / avgPrice) * 100 : 0;
  const priceLabel = priceDiff < -10 ? "good" : priceDiff > 15 ? "high" : "fair";
  const priceText = priceLabel === "good" ? "Добра цена" : priceLabel === "high" ? "Над средната" : "Средна цена";

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: 16 }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: 12, color: "#999", marginBottom: 12 }}>
          <Link href="/" style={{ color: "#999" }}>hajde.bg</Link>
          {" > "}
          <Link href={`/category/${listing.category}`} style={{ color: "#999" }}>Категория</Link>
          {" > "}
          <span style={{ color: "#33322e" }}>{listing.title}</span>
        </nav>

        <div style={{ display: "flex", gap: 24 }}>
          {/* Left - Images & Details */}
          <div style={{ flex: 1 }}>
            {/* Image */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ background: "#f5f5f5", borderRadius: 8, overflow: "hidden", marginBottom: 8 }}>
                <Image
                  src={listing.images[activeImage]}
                  alt={listing.title}
                  width={700}
                  height={450}
                  style={{ width: "100%", height: "auto", maxHeight: 450, objectFit: "contain", display: "block" }}
                  priority
                />
              </div>
              {listing.images.length > 1 && (
                <div style={{ display: "flex", gap: 6 }}>
                  {listing.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      style={{
                        width: 64, height: 48, borderRadius: 4, overflow: "hidden",
                        border: i === activeImage ? "2px solid #86b817" : "2px solid #ddd",
                        cursor: "pointer", padding: 0, background: "none"
                      }}
                    >
                      <Image src={img} alt="" width={64} height={48} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", color: "#33322e" }}>{listing.title}</h1>

            {/* Meta */}
            <div style={{ fontSize: 12, color: "#999", marginBottom: 12 }}>
              {listing.location} &middot; {formatDate(listing.createdAt)} &middot; {listing.views} преглеждания
            </div>

            {/* Badges */}
            <div style={{ marginBottom: 16 }}>
              {listing.isFeatured && <span className="ad-badge top">ТОП обява</span>}
              {listing.isUrgent && <span className="ad-badge urgent">Спешно</span>}
              {listing.condition === "new" && <span className="ad-badge new">Ново</span>}
              {listing.condition === "like-new" && <span className="ad-badge new">Като ново</span>}
            </div>

            {/* Description */}
            <div style={{ background: "#f9f9f9", borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 8px" }}>Описание</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#444" }}>{listing.description}</p>
            </div>

            {/* Specs */}
            {listing.specs && (
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 8px" }}>Характеристики</h3>
                <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                  <tbody>
                    {Object.entries(listing.specs).map(([key, val]) => (
                      <tr key={key} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "6px 0", color: "#999", width: 140 }}>{key}</td>
                        <td style={{ padding: "6px 0", fontWeight: 500 }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside style={{ width: 280, flexShrink: 0 }} className="hide-mobile">
            {/* Price */}
            <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#33322e" }}>
                {formatPrice(listing.price, listing.currency)}
              </div>
              <span className={`price-badge ${priceLabel}`} style={{ marginTop: 4 }}>
                {priceText}
              </span>

              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <button className="btn-brand" style={{ width: "100%", justifyContent: "center", borderRadius: 8 }}>
                  Изпрати съобщение
                </button>
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="btn-outline"
                  style={{ width: "100%", justifyContent: "center", borderRadius: 8 }}
                >
                  {showPhone ? "+359 88 888 8888" : "Покажи телефон"}
                </button>
              </div>
            </div>

            {/* Seller */}
            <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <Image src={listing.seller.avatar} alt="" width={40} height={40} style={{ borderRadius: "50%" }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {listing.seller.name}
                    {listing.seller.isVerified && <span style={{ color: "#86b817", marginLeft: 4 }} title="Потвърден">&#10003;</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "#999" }}>
                    {listing.seller.rating}/5 ({listing.seller.reviewCount} отзива)
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <span style={{ color: "#999" }}>Член от</span>
                  <span>{new Date(listing.seller.memberSince).getFullYear()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <span style={{ color: "#999" }}>Отговаря за</span>
                  <span style={{ color: "#86b817" }}>{listing.seller.responseTime}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                  <span style={{ color: "#999" }}>Активни обяви</span>
                  <span>{listing.seller.activeListings}</span>
                </div>
              </div>

              <Link href={`/profile/${listing.seller.id}`} style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 13, color: "#86b817" }}>
                Виж профил
              </Link>
            </div>

            {/* Promotion tiers */}
            <div style={{ background: "#f9f9f9", borderRadius: 8, padding: 12, fontSize: 12, color: "#777" }}>
              <div style={{ fontWeight: 600, marginBottom: 6, color: "#33322e" }}>Промотирай тази обява</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 8px", background: "#fff", borderRadius: 4, border: "1px solid #eee" }}>
                  <span>Издигни</span><span style={{ fontWeight: 600, color: "#86b817" }}>2.99 лв</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 8px", background: "#fff", borderRadius: 4, border: "1px solid #eee" }}>
                  <span>ТОП обява</span><span style={{ fontWeight: 600, color: "#86b817" }}>7.99 лв</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 8px", background: "#fff3cd", borderRadius: 4, border: "1px solid #ffc107" }}>
                  <span>Прожектор</span><span style={{ fontWeight: 600, color: "#856404" }}>19.99 лв</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div style={{ marginTop: 32, borderTop: "1px solid #eee", paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Подобни обяви</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {similar.map((item) => (
                <Link key={item.id} href={`/listing/${item.id}`} style={{ textDecoration: "none" }}>
                  <div className="ad-card">
                    <Image src={item.images[0]} alt={item.title} width={300} height={200} style={{ width: "100%", height: 120, objectFit: "cover" }} />
                    <div className="ad-info">
                      <div className="ad-location">{item.city}</div>
                      <div className="ad-title">{item.title}</div>
                      <div className="ad-price">{formatPrice(item.price, item.currency)}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
