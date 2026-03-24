import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CategorySidebar } from "@/components/layout/CategorySidebar";
import { CategoryIcons } from "@/components/layout/CategoryIcons";
import { categories } from "@/lib/categories";
import { listings, getFeaturedListings } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";

export default function HomePage() {
  const featured = getFeaturedListings();
  const recent = listings;

  return (
    <>
      <Header />

      <div className="container" style={{ marginTop: 20 }}>
        <div style={{ display: "flex", gap: 24 }}>
          {/* Left sidebar - Categories (Locanto style with colored icons) */}
          <CategorySidebar />

          {/* Right content area */}
          <main style={{ flex: 1, minWidth: 0 }}>
            {/* Milanuncios-style horizontal category icons */}
            <CategoryIcons />

            {/* Gallery - Featured listings (Kleinanzeigen style) */}
            <section style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#33322e", margin: 0 }}>Галерия</h2>
                <Link href="/listing/new" style={{ fontSize: 12, color: "#86b817" }}>Публикувай тук</Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {featured.slice(0, 4).map((item) => (
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
            </section>

            {/* Latest listings (Kleinanzeigen style grid) */}
            <section>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#33322e", marginBottom: 12 }}>Нови обяви</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {recent.map((item) => (
                  <Link key={item.id} href={`/listing/${item.id}`} style={{ textDecoration: "none" }}>
                    <div className="ad-card" style={{ position: "relative" }}>
                      <Image src={item.images[0]} alt={item.title} width={300} height={225} style={{ width: "100%", height: 140, objectFit: "cover" }} />
                      <div className="ad-info">
                        <div className="ad-location">{item.city}</div>
                        <div className="ad-title">{item.title}</div>
                        <div className="ad-price">
                          {formatPrice(item.price, item.currency)}
                          {item.isFeatured && <span className="ad-badge top" style={{ marginLeft: 6 }}>ТОП</span>}
                          {item.isUrgent && <span className="ad-badge urgent" style={{ marginLeft: 6 }}>Спешно</span>}
                        </div>
                        <div style={{ fontSize: 11, color: "#bbb", marginTop: 4 }}>{formatDate(item.createdAt)}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Post ad CTA */}
            <section style={{ marginTop: 32, padding: 24, background: "#f5f5f5", borderRadius: 8, textAlign: "center" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 16, color: "#33322e" }}>Имаш нещо за продан?</h3>
              <p style={{ margin: "0 0 16px", fontSize: 13, color: "#999" }}>Публикувай безплатна обява и я види хиляди хора в България.</p>
              <Link href="/listing/new" className="btn-brand">Публикувай обява</Link>
            </section>
          </main>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
