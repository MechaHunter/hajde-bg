export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number, currency: "BGN" | "EUR" = "BGN"): string {
  const symbol = currency === "EUR" ? "€" : "лв";
  const formatted = new Intl.NumberFormat("bg-BG").format(price);
  return currency === "EUR" ? `${formatted} ${symbol}` : `${formatted} ${symbol}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Току-що";
  if (diffMins < 60) return `Преди ${diffMins} мин`;
  if (diffHours < 24) return `Преди ${diffHours} ч`;
  if (diffDays < 7) return `Преди ${diffDays} дни`;
  return date.toLocaleDateString("bg-BG", { day: "numeric", month: "short" });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}
