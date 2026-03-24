import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between" }}>
          <div>
            <Link href="#" style={{ marginRight: 12 }}>Помощ</Link>
            <Link href="#" style={{ marginRight: 12 }}>Безопасност</Link>
            <Link href="#" style={{ marginRight: 12 }}>Поверителност</Link>
            <Link href="#" style={{ marginRight: 12 }}>Условия</Link>
            <Link href="#" style={{ marginRight: 12 }}>За нас</Link>
            <Link href="#">Контакти</Link>
          </div>
          <div>&copy; 2026 hajde.bg</div>
        </div>
      </div>
    </footer>
  );
}
