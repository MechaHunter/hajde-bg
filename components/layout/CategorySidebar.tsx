"use client";

import Link from "next/link";
import { categories } from "@/lib/categories";

const categoryIcons: Record<string, { color: string; icon: string }> = {
  vehicles: {
    color: "#1a8a7d",
    icon: `<path d="M18.9 8H5.1C3.9 8 3 8.9 3 10.1v5.8C3 16.6 3.4 17 4 17h1c.6 0 1-.4 1-1v-1h12v1c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-5.9C21 8.9 20.1 8 18.9 8zM6.5 14c-.8 0-1.5-.7-1.5-1.5S5.7 11 6.5 11s1.5.7 1.5 1.5S7.3 14 6.5 14zm11 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM5 7l1.5-4.5C6.7 1.6 7.5 1 8.5 1h7c1 0 1.8.6 2 1.5L19 7H5z"/>`
  },
  "real-estate-sale": {
    color: "#e67e22",
    icon: `<path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>`
  },
  "real-estate-rent": {
    color: "#f39c12",
    icon: `<path d="M17 11h-1V7c0-2.8-2.2-5-5-5S6 4.2 6 7v4H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-5 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM8 11V7c0-2.2 1.8-4 4-4s4 1.8 4 4v4H8z"/>`
  },
  "home-garden": {
    color: "#27ae60",
    icon: `<path d="M12 3L2 12h3v8h14v-8h3L12 3zm1 14h-2v-4h2v4zm4 0h-2v-6H9v6H7v-7.8l5-4.5 5 4.5V17z"/>`
  },
  fashion: {
    color: "#c0392b",
    icon: `<path d="M21.6 7.2l-4.2-4.8c-.2-.2-.5-.4-.8-.4H7.4c-.3 0-.6.2-.8.4L2.4 7.2c-.3.3-.4.7-.4 1.1V20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8.3c0-.4-.1-.8-.4-1.1zM12 17.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5zm0-7c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5S13.4 10.5 12 10.5z"/>`
  },
  electronics: {
    color: "#8e44ad",
    icon: `<path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14zm-5 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>`
  },
  pets: {
    color: "#16a085",
    icon: `<path d="M4.5 9.5C5.9 9.5 7 8.4 7 7S5.9 4.5 4.5 4.5 2 5.6 2 7s1.1 2.5 2.5 2.5zm15 0C20.9 9.5 22 8.4 22 7s-1.1-2.5-2.5-2.5S17 5.6 17 7s1.1 2.5 2.5 2.5zm-11.5 0C9.1 9.5 10 8.4 10 7S9.1 4.5 8 4.5 5.5 5.6 5.5 7 6.9 9.5 8 9.5zm8 0c1.1 0 2-1.1 2-2.5S17.1 4.5 16 4.5 14 5.6 14 7s.9 2.5 2 2.5zM12 11.5c-2.3 0-7 1.5-7 4.5v2h14v-2c0-3-4.7-4.5-7-4.5z"/>`
  },
  family: {
    color: "#e74c3c",
    icon: `<path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm-6 2c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm12 0c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm-6 1c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z"/>`
  },
  jobs: {
    color: "#2c3e50",
    icon: `<path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z"/>`
  },
  services: {
    color: "#d35400",
    icon: `<path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>`
  },
  sports: {
    color: "#2980b9",
    icon: `<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 17.9V18h-2v1.9C7.1 19.4 4.6 16.9 4.1 13H6v-2H4.1C4.6 7.1 7.1 4.6 11 4.1V6h2V4.1c3.9.5 6.4 3 6.9 6.9H18v2h1.9c-.5 3.9-3 6.4-6.9 6.9z"/>`
  },
  tourism: {
    color: "#3498db",
    icon: `<path d="M21 16v-2l-8-5V3.5c0-.8-.7-1.5-1.5-1.5S10 2.7 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>`
  },
  education: {
    color: "#1abc9c",
    icon: `<path d="M5 13.2v4L12 21l7-3.8v-4L12 17l-7-3.8zM12 3L1 9l11 6 9-4.9V17h2V9L12 3z"/>`
  },
  other: {
    color: "#95a5a6",
    icon: `<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>`
  },
};

export function CategorySidebar() {
  return (
    <aside style={{ width: 240, flexShrink: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 8, borderBottom: "2px solid #eee" }}>
        <span style={{ fontWeight: 700, fontSize: 15, color: "#33322e" }}>Категории</span>
        <Link href="/search" style={{ fontSize: 12, color: "#86b817", fontWeight: 500 }}>Всички обяви</Link>
      </div>

      {categories.map((cat) => {
        const iconData = categoryIcons[cat.id] || categoryIcons.other;
        return (
          <div key={cat.id} style={{ marginBottom: 18 }}>
            {/* Category header with icon */}
            <Link
              href={`/category/${cat.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                marginBottom: 6,
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: iconData.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" dangerouslySetInnerHTML={{ __html: iconData.icon }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#33322e" }}>
                {cat.name}
              </span>
            </Link>

            {/* Subcategories */}
            {cat.subcategories.slice(0, 2).map((sub) => (
              <Link
                key={sub.slug}
                href={`/category/${cat.slug}`}
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "#555",
                  padding: "2px 0 2px 38px",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#86b817"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#555"; }}
              >
                {sub.name}
              </Link>
            ))}
            {cat.subcategories.length > 2 && (
              <Link
                href={`/category/${cat.slug}`}
                style={{
                  display: "block",
                  fontSize: 12,
                  color: "#86b817",
                  fontWeight: 600,
                  padding: "3px 0 0 38px",
                  textDecoration: "none",
                }}
              >
                Още {cat.name} &raquo;
              </Link>
            )}
          </div>
        );
      })}
    </aside>
  );
}
