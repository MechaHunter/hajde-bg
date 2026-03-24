import { Category } from "./types";

export const categories: Category[] = [
  { id: "jobs", name: "Jobs", nameBg: "Работа", icon: "💼", slug: "rabota", count: 8049, color: "bg-blue-500" },
  { id: "real-estate-sale", name: "Real Estate - Sale", nameBg: "Имоти - Продажби", icon: "🏠", slug: "imoti-prodajbi", count: 74649, color: "bg-emerald-500" },
  { id: "real-estate-rent", name: "Real Estate - Rent", nameBg: "Имоти - Наеми", icon: "🔑", slug: "imoti-naemi", count: 14003, color: "bg-teal-500" },
  { id: "vehicles", name: "Vehicles", nameBg: "Авто-Мото", icon: "🚗", slug: "avto-moto", count: 9794, color: "bg-red-500" },
  { id: "electronics", name: "Electronics", nameBg: "Електроника", icon: "📱", slug: "elektronika", count: 31656, color: "bg-violet-500" },
  { id: "home-garden", name: "Home & Garden", nameBg: "За Дома", icon: "🛋️", slug: "za-doma", count: 26409, color: "bg-amber-500" },
  { id: "fashion", name: "Fashion", nameBg: "Мода", icon: "👗", slug: "moda", count: 11371, color: "bg-pink-500" },
  { id: "services", name: "Services", nameBg: "Услуги", icon: "🔧", slug: "uslugi", count: 8085, color: "bg-orange-500" },
  { id: "tourism", name: "Tourism", nameBg: "Туризъм", icon: "✈️", slug: "turizam", count: 7860, color: "bg-cyan-500" },
  { id: "pets", name: "Pets", nameBg: "Любимци", icon: "🐕", slug: "domashni-liubimtsi", count: 2646, color: "bg-lime-500" },
  { id: "sports", name: "Sports & Hobbies", nameBg: "Спорт и Хоби", icon: "⚽", slug: "sport-hobi", count: 4500, color: "bg-indigo-500" },
  { id: "other", name: "Other", nameBg: "Други", icon: "📦", slug: "drugi", count: 3200, color: "bg-gray-500" },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function formatCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}
