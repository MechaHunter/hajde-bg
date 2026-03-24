"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getCategoryBySlug, categories } from "@/lib/categories";
import { listings } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";
import { useState } from "react";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug);
  const [view, setView] = useState<"list" | "grid">("list");
  const [sort, setSort] = useState("newest");

  const catListings = category
    ? listings.filter((l) => l.category === category.id)
    : listings;

  const sorted = [...catListings].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: 16 }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: 12, color: "#999", marginBottom: 12 }}>
          <Link href="/" style={{ color: "#999" }}>hajde.bg</Link>
          {" > "}
          <span style={{ color: "#33322e" }}>{category?.name || "Всички обяви"}</span>
        </nav>

        <div style={{ display: "flex", gap: 24 }}>
          {/* Left sidebar - Filters (Craigslist style) */}
          <aside style={{ width: 200, flexShrink: 0 }} className="hide-mobile">
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>{category?.name || "Обяви"}</h2>

            {/* Subcategories */}
            {category?.subcategories.map((sub) => (
              <Link key={sub.slug} href={`/category/${slug}`} style={{ display: "block", fontSize: 13, padding: "3px 0" }}>
                {sub.name}
              </Link>
            ))}

            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "12px 0" }} />

            {/* Filters */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12 }}>Подреди по:</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: "100%", marginTop: 4 }}>
                <option value="newest">Най-нови</option>
                <option value="price-asc">Цена (ниска - висока)</option>
                <option value="price-desc">Цена (висока - ниска)</option>
              </select>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 4, fontWeight: 400, cursor: "pointer" }}>
                <input type="checkbox" /> само с картинка
              </label>
              <label style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 4, fontWeight: 400, cursor: "pointer" }}>
                <input type="checkbox" /> публикувано днес
              </label>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "12px 0" }} />

            {/* Other categories */}
            <div style={{ fontSize: 12, color: "#999", marginBottom: 6 }}>Други категории:</div>
            {categories.filter(c => c.slug !== slug).slice(0, 6).map((c) => (
              <Link key={c.id} href={`/category/${c.slug}`} style={{ display: "block", fontSize: 12, padding: "2px 0" }}>
                {c.name}
              </Link>
            ))}
          </aside>

          {/* Main content */}
          <main style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: "#999" }}>
                1 - {sorted.length} от {sorted.length} обяви
              </span>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => setView("list")} style={{ padding: "4px 8px", border: "1px solid #ddd", borderRadius: 4, background: view === "list" ? "#eee" : "#fff", cursor: "pointer", fontSize: 12 }}>Списък</button>
                <button onClick={() => setView("grid")} style={{ padding: "4px 8px", border: "1px solid #ddd", borderRadius: 4, background: view === "grid" ? "#eee" : "#fff", cursor: "pointer", fontSize: 12 }}>Решетка</button>
              </div>
            </div>

            {view === "list" ? (
              /* Craigslist-style list view */
              <div>
                {sorted.map((item) => (
                  <div key={item.id} className="result-row">
                    {item.images[0] && (
                      <Image src={item.images[0]} alt="" width={80} height={60} className="result-thumb" />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link href={`/listing/${item.id}`} className="result-title">
                        {item.title}
                      </Link>
                      <div className="result-meta">
                        {item.city}
                        {item.isFeatured && <span className="ad-badge top" style={{ marginLeft: 6 }}>ТОП</span>}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="result-price">{formatPrice(item.price, item.currency)}</div>
                      <div className="result-date">{formatDate(item.createdAt)}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Kleinanzeigen-style grid view */
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {sorted.map((item) => (
                  <Link key={item.id} href={`/listing/${item.id}`} style={{ textDecoration: "none" }}>
                    <div className="ad-card">
                      <Image src={item.images[0]} alt={item.title} width={300} height={225} style={{ width: "100%", height: 140, objectFit: "cover" }} />
                      <div className="ad-info">
                        <div className="ad-location">{item.city} - {formatDate(item.createdAt)}</div>
                        <div className="ad-title">{item.title}</div>
                        <div className="ad-price">{formatPrice(item.price, item.currency)}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {sorted.length === 0 && (
              <div style={{ textAlign: "center", padding: 40, color: "#999" }}>
                <p style={{ fontSize: 16 }}>Няма обяви в тази категория.</p>
                <Link href="/" style={{ color: "#86b817" }}>Към начална страница</Link>
              </div>
            )}
          </main>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
