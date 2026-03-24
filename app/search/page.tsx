"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { searchListings, listings } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = query ? searchListings(query) : listings;

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: 16 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>
          {query ? `Резултати за "${query}"` : "Всички обяви"}
        </h1>
        <p style={{ fontSize: 13, color: "#999", margin: "0 0 16px" }}>{results.length} обяви</p>

        {results.length > 0 ? (
          <div>
            {results.map((item) => (
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
          <div style={{ textAlign: "center", padding: 40, color: "#999" }}>
            <p>Няма резултати за &ldquo;{query}&rdquo;</p>
            <Link href="/" style={{ color: "#86b817" }}>Към начална страница</Link>
          </div>
        )}
      </div>
      <SiteFooter />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: 40, color: "#999" }}>Зареждане...</div>}>
      <SearchResults />
    </Suspense>
  );
}
