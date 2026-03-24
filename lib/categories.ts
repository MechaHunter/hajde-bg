export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  subcategories: { name: string; slug: string }[];
}

export const categories: Category[] = [
  {
    id: "vehicles", name: "Авто, Мото", slug: "avto-moto", count: 9794,
    subcategories: [
      { name: "Автомобили", slug: "avtomobili" },
      { name: "Части и аксесоари", slug: "chasti" },
      { name: "Мотоциклети", slug: "mototsikleti" },
    ]
  },
  {
    id: "real-estate-sale", name: "Имоти - Продажби", slug: "imoti-prodajbi", count: 74649,
    subcategories: [
      { name: "Апартаменти", slug: "apartamenti" },
      { name: "Къщи, Вили", slug: "kashti" },
      { name: "Парцели", slug: "partseli" },
    ]
  },
  {
    id: "real-estate-rent", name: "Имоти - Наеми", slug: "imoti-naemi", count: 14003,
    subcategories: [
      { name: "Апартаменти", slug: "apartamenti-naem" },
      { name: "Стаи", slug: "stai" },
    ]
  },
  {
    id: "home-garden", name: "За Дома и Градината", slug: "za-doma", count: 26409,
    subcategories: [
      { name: "Мебели", slug: "mebeli" },
      { name: "Домакински уреди", slug: "uredi" },
      { name: "Градинска техника", slug: "gradina" },
    ]
  },
  {
    id: "fashion", name: "Мода и Красота", slug: "moda", count: 11371,
    subcategories: [
      { name: "Дамско облекло", slug: "damsko" },
      { name: "Мъжко облекло", slug: "majko" },
      { name: "Обувки", slug: "obuvki" },
    ]
  },
  {
    id: "electronics", name: "Електроника", slug: "elektronika", count: 31656,
    subcategories: [
      { name: "Телефони", slug: "telefoni" },
      { name: "Компютри", slug: "kompiutri" },
      { name: "Телевизори и аудио", slug: "tv-audio" },
    ]
  },
  {
    id: "pets", name: "Домашни любимци", slug: "domashni-liubimtsi", count: 2646,
    subcategories: [
      { name: "Кучета", slug: "kucheta" },
      { name: "Котки", slug: "kotki" },
    ]
  },
  {
    id: "family", name: "Семейство, Деца", slug: "semeistvo", count: 4800,
    subcategories: [
      { name: "Детски дрехи", slug: "detski-drehi" },
      { name: "Колички и столчета", slug: "kolichki" },
    ]
  },
  {
    id: "jobs", name: "Работа", slug: "rabota", count: 8049,
    subcategories: [
      { name: "ИТ и програмиране", slug: "it" },
      { name: "Обслужване и търговия", slug: "obsluzhvane" },
      { name: "Строителство", slug: "stroitelstvo-rabota" },
    ]
  },
  {
    id: "services", name: "Услуги", slug: "uslugi", count: 8085,
    subcategories: [
      { name: "Строителни услуги", slug: "stroitelni" },
      { name: "Транспортни услуги", slug: "transportni" },
      { name: "Ремонти", slug: "remonti" },
    ]
  },
  {
    id: "sports", name: "Спорт, Хоби", slug: "sport-hobi", count: 4500,
    subcategories: [
      { name: "Велосипеди", slug: "velosipedi" },
      { name: "Фитнес оборудване", slug: "fitnes" },
    ]
  },
  {
    id: "tourism", name: "Туризъм, Нощувки", slug: "turizam", count: 7860,
    subcategories: [
      { name: "Хотели и стаи", slug: "hoteli" },
      { name: "Къщи за гости", slug: "kashti-gosti" },
    ]
  },
  {
    id: "education", name: "Обучение, Курсове", slug: "obuchenie", count: 7183,
    subcategories: [
      { name: "Уроци", slug: "urotsi" },
      { name: "Езиково обучение", slug: "ezikovo" },
    ]
  },
  {
    id: "other", name: "Други", slug: "drugi", count: 3200,
    subcategories: [
      { name: "Съобщения", slug: "saobshtenia" },
    ]
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
