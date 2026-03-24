"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="inner">
        <Link href="/" className="logo">
          <span>hajde</span>.bg
        </Link>

        <nav className="hide-mobile">
          <Link href="/listing/new" className="btn-brand">Публикувай обява</Link>
          <Link href="#" className="btn-outline">Регистрация</Link>
          <Link href="#" className="btn-outline">Вход</Link>
        </nav>
      </div>

      {/* Search bar */}
      <div className="container" style={{ marginTop: 10 }}>
        <SearchBarInline />
      </div>
    </header>
  );
}

function SearchBarInline() {
  return (
    <form action="/search" method="get" className="search-bar">
      <input type="text" name="q" placeholder="Какво търсиш?" />
      <select name="cat" style={{ border: "none", borderLeft: "1px solid #ddd", padding: "10px 12px", fontSize: 13, background: "transparent", color: "#555", outline: "none" }}>
        <option value="">Всички категории</option>
        <option value="jobs">Работа</option>
        <option value="real-estate-sale">Имоти - Продажби</option>
        <option value="real-estate-rent">Имоти - Наеми</option>
        <option value="vehicles">Авто-Мото</option>
        <option value="electronics">Електроника</option>
        <option value="home-garden">За Дома</option>
        <option value="fashion">Мода</option>
        <option value="services">Услуги</option>
        <option value="tourism">Туризъм</option>
        <option value="pets">Любимци</option>
        <option value="sports">Спорт и Хоби</option>
      </select>
      <input type="text" name="location" placeholder="Цяла България" style={{ borderLeft: "1px solid #ddd", maxWidth: 160 }} />
      <button type="submit">Търси</button>
    </form>
  );
}
