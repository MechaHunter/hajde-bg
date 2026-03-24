import { Listing, Seller } from "./types";

const sellers: Seller[] = [
  { id: "s1", name: "Иван Петров", avatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 4.8, reviewCount: 47, isVerified: true, memberSince: "2021-03-15", responseTime: "< 1 час", activeListings: 12 },
  { id: "s2", name: "Мария Иванова", avatar: "https://randomuser.me/api/portraits/women/44.jpg", rating: 4.9, reviewCount: 89, isVerified: true, memberSince: "2020-06-20", responseTime: "< 30 мин", activeListings: 5 },
  { id: "s3", name: "Георги Димитров", avatar: "https://randomuser.me/api/portraits/men/67.jpg", rating: 4.5, reviewCount: 23, isVerified: false, memberSince: "2023-01-10", responseTime: "< 2 часа", activeListings: 3 },
  { id: "s4", name: "Елена Стоянова", avatar: "https://randomuser.me/api/portraits/women/28.jpg", rating: 5.0, reviewCount: 156, isVerified: true, memberSince: "2019-11-05", responseTime: "< 15 мин", activeListings: 28 },
  { id: "s5", name: "Димитър Колев", avatar: "https://randomuser.me/api/portraits/men/45.jpg", rating: 4.3, reviewCount: 12, isVerified: true, memberSince: "2024-02-14", responseTime: "< 3 часа", activeListings: 2 },
  { id: "s6", name: "Анна Тодорова", avatar: "https://randomuser.me/api/portraits/women/55.jpg", rating: 4.7, reviewCount: 34, isVerified: true, memberSince: "2022-08-01", responseTime: "< 1 час", activeListings: 8 },
];

export const listings: Listing[] = [
  {
    id: "1", title: "Тристаен апартамент в центъра на София", description: "Просторен тристаен апартамент с южно изложение, ново обзавеждане и паркомясто. На 5 минути от метрото. Напълно ремонтиран през 2024г.", price: 245000, currency: "EUR", category: "real-estate-sale", subcategory: "apartments",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
    location: "София, Център", city: "София", createdAt: new Date(Date.now() - 3600000).toISOString(), views: 342, isFeatured: true, isUrgent: false, condition: "like-new", seller: sellers[0],
    specs: { "Площ": "95 кв.м", "Етаж": "4 от 8", "Строителство": "Тухла", "Година": "2018" }
  },
  {
    id: "2", title: "BMW 320d, 2020, автоматик, LED фарове", description: "BMW 320d в отлично състояние. Сервизна история, нови гуми. Без забележки по купето.", price: 38500, currency: "EUR", category: "vehicles", subcategory: "cars",
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800"],
    location: "Пловдив", city: "Пловдив", createdAt: new Date(Date.now() - 7200000).toISOString(), views: 567, isFeatured: true, isUrgent: false, condition: "like-new", seller: sellers[1],
    specs: { "Година": "2020", "Двигател": "2.0 Diesel", "Мощност": "190 к.с.", "Скорости": "Автоматик", "Пробег": "85 000 км" }
  },
  {
    id: "3", title: "iPhone 15 Pro Max 256GB - нов, с гаранция", description: "Чисто нов iPhone 15 Pro Max, неразопакован, с гаранция 2 години. Цвят Natural Titanium.", price: 2399, currency: "BGN", category: "electronics", subcategory: "phones",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800"],
    location: "София, Младост", city: "София", createdAt: new Date(Date.now() - 1800000).toISOString(), views: 892, isFeatured: false, isUrgent: true, condition: "new", seller: sellers[2]
  },
  {
    id: "4", title: "Уеб разработка - сайтове и онлайн магазини", description: "Професионално изграждане на уеб сайтове и онлайн магазини. React, Next.js, WordPress. Бързо и качествено.", price: 1500, currency: "BGN", category: "services",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"],
    location: "Дистанционно", city: "Дистанционно", createdAt: new Date(Date.now() - 86400000).toISOString(), views: 156, isFeatured: false, isUrgent: false, seller: sellers[3]
  },
  {
    id: "5", title: "Ъглов диван, естествена италианска кожа", description: "Луксозен ъглов диван от естествена италианска кожа. Разтегателен, с ракла за съхранение. 280x200 см.", price: 3200, currency: "BGN", category: "home-garden", subcategory: "furniture",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800"],
    location: "Варна", city: "Варна", createdAt: new Date(Date.now() - 43200000).toISOString(), views: 234, isFeatured: true, isUrgent: false, condition: "new", seller: sellers[4]
  },
  {
    id: "6", title: "Дамска чанта Louis Vuitton Neverfull MM", description: "Оригинална Louis Vuitton Neverfull MM. С оригинална кутия и документи. Перфектно състояние.", price: 1850, currency: "EUR", category: "fashion",
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"],
    location: "София, Лозенец", city: "София", createdAt: new Date(Date.now() - 14400000).toISOString(), views: 445, isFeatured: false, isUrgent: false, condition: "like-new", seller: sellers[5]
  },
  {
    id: "7", title: "Front-End Developer (React) - remote", description: "Търсим опитен React developer за нашия екип. Работа от вкъщи, конкурентно заплащане.", price: 5000, currency: "BGN", category: "jobs",
    images: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"],
    location: "София / Remote", city: "София", createdAt: new Date(Date.now() - 28800000).toISOString(), views: 1203, isFeatured: true, isUrgent: true, seller: sellers[3]
  },
  {
    id: "8", title: "Нощувки в Банско - апартамент до лифта", description: "Уютен апартамент за 4 души на 100м от лифта. WiFi, паркинг, ски гардероб.", price: 120, currency: "BGN", category: "tourism",
    images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"],
    location: "Банско", city: "Банско", createdAt: new Date(Date.now() - 172800000).toISOString(), views: 678, isFeatured: true, isUrgent: false, seller: sellers[0],
    specs: { "Капацитет": "4 души", "Спални": "2", "До лифт": "100м" }
  },
  {
    id: "9", title: "Златен ретривър - кученца с документи", description: "Кученца Златен ретривър с пълни документи, ваксини и микрочип. Родители шампиони.", price: 1200, currency: "BGN", category: "pets",
    images: ["https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800"],
    location: "Стара Загора", city: "Стара Загора", createdAt: new Date(Date.now() - 259200000).toISOString(), views: 890, isFeatured: false, isUrgent: false, seller: sellers[5]
  },
  {
    id: "10", title: "Велоергометър Kettler - нов, с LCD", description: "Нов велоергометър Kettler с LCD дисплей, 16 програми, пулсомер.", price: 450, currency: "BGN", category: "sports",
    images: ["https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800"],
    location: "Бургас", city: "Бургас", createdAt: new Date(Date.now() - 345600000).toISOString(), views: 123, isFeatured: false, isUrgent: false, condition: "new", seller: sellers[2]
  },
  {
    id: "11", title: "Двустаен под наем, Младост 1, до метро", description: "Обзаведен двустаен апартамент до метростанция. Включени ТЕЦ, интернет.", price: 850, currency: "EUR", category: "real-estate-rent",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
    location: "София, Младост 1", city: "София", createdAt: new Date(Date.now() - 5400000).toISOString(), views: 445, isFeatured: true, isUrgent: true, seller: sellers[1],
    specs: { "Площ": "65 кв.м", "Етаж": "3 от 10", "Обзавеждане": "Пълно" }
  },
  {
    id: "12", title: "MacBook Pro 14 M3 Pro, 18GB, 512GB", description: "MacBook Pro 14 инча, M3 Pro чип, 18GB RAM, 512GB SSD. Използван 3 месеца, с гаранция.", price: 3800, currency: "BGN", category: "electronics",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"],
    location: "София, Витоша", city: "София", createdAt: new Date(Date.now() - 10800000).toISOString(), views: 567, isFeatured: false, isUrgent: false, condition: "like-new", seller: sellers[4]
  },
];

export const cities = [
  "София", "Пловдив", "Варна", "Бургас", "Русе", "Стара Загора", "Плевен",
  "Добрич", "Сливен", "Шумен", "Перник", "Хасково", "Ямбол", "Пазарджик",
  "Благоевград", "Велико Търново", "Враца", "Габрово", "Банско",
];

export function getListingsByCategory(categoryId: string): Listing[] {
  return listings.filter((l) => l.category === categoryId);
}

export function getFeaturedListings(): Listing[] {
  return listings.filter((l) => l.isFeatured);
}

export function searchListings(query: string): Listing[] {
  const q = query.toLowerCase();
  return listings.filter(
    (l) => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.city.toLowerCase().includes(q)
  );
}
