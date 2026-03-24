"use client";

import Link from "next/link";

interface CatIcon {
  id: string;
  name: string;
  slug: string;
  svg: string;
}

const catIcons: CatIcon[] = [
  { id: "vehicles", name: "Авто-Мото", slug: "avto-moto",
    svg: `<path d="M18.9 6H5.1C3.9 6 3 6.9 3 8.1V15h1c0 1.7 1.3 3 3 3s3-1.3 3-3h4c0 1.7 1.3 3 3 3s3-1.3 3-3h1V8.1C21 6.9 20.1 6 18.9 6zM7 16.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm10 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM5 4l1.5 2h11L19 4H5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>` },
  { id: "real-estate-sale", name: "Имоти", slug: "imoti-prodajbi",
    svg: `<path d="M3 21h18M5 21V10l7-7 7 7v11M9 21v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>` },
  { id: "jobs", name: "Работа", slug: "rabota",
    svg: `<rect x="4" y="7" width="16" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 7V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="12" x2="12" y2="12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
  { id: "electronics", name: "Електроника", slug: "elektronika",
    svg: `<rect x="5" y="2" width="14" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="18" x2="12" y2="18.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
  { id: "home-garden", name: "За Дома", slug: "za-doma",
    svg: `<path d="M20 9V21H4V9M2 11l10-9 10 9M12 21V14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 14h8v7H8z" fill="none" stroke="currentColor" stroke-width="1.5"/>` },
  { id: "fashion", name: "Мода", slug: "moda",
    svg: `<path d="M7 2l-5 5 3.5 3L12 4l6.5 6L22 7l-5-5M7 2l5 2 5-2M12 4v18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>` },
  { id: "services", name: "Услуги", slug: "uslugi",
    svg: `<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>` },
  { id: "pets", name: "Любимци", slug: "domashni-liubimtsi",
    svg: `<circle cx="6" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 13c-3 0-5.5 2.5-5.5 5.5 0 2 1.5 3.5 3 3.5.8 0 1.4-.3 2-.9.3-.3.7-.3 1 0 .6.6 1.2.9 2 .9 1.5 0 3-1.5 3-3.5 0-3-2.5-5.5-5.5-5.5z" fill="none" stroke="currentColor" stroke-width="1.5"/>` },
  { id: "sports", name: "Спорт", slug: "sport-hobi",
    svg: `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.5"/>` },
  { id: "tourism", name: "Туризъм", slug: "turizam",
    svg: `<path d="M21 16v-2l-8-5V3.5c0-.8-.7-1.5-1.5-1.5S10 2.7 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>` },
  { id: "education", name: "Обучение", slug: "obuchenie",
    svg: `<path d="M2 10l10-5 10 5-10 5-10-5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="22" y1="10" x2="22" y2="17" stroke="currentColor" stroke-width="1.5"/>` },
  { id: "family", name: "Семейство", slug: "semeistvo",
    svg: `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>` },
];

export function CategoryIcons() {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#33322e", margin: 0 }}>Всички категории</h2>
      </div>
      <div style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        paddingBottom: 8,
        scrollbarWidth: "none",
      }}>
        {catIcons.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              minWidth: 72,
              padding: "10px 4px",
              textDecoration: "none",
              borderRadius: 8,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f5f5f5"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <div style={{
              width: 40,
              height: 40,
              color: "#555",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: cat.svg }} />
            </div>
            <span style={{ fontSize: 11, color: "#555", textAlign: "center", lineHeight: 1.2 }}>
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
