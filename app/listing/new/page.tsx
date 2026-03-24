"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { categories } from "@/lib/categories";
import { cities } from "@/lib/mock-data";

export default function NewListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("good");
  const [city, setCity] = useState("");
  const [published, setPublished] = useState(false);
  const [promoTier, setPromoTier] = useState("");

  // Ad visibility score
  const visScore = Math.min(100,
    (title.length > 5 ? 20 : 0) +
    (title.length > 20 ? 10 : 0) +
    (description.length > 20 ? 20 : 0) +
    (description.length > 80 ? 10 : 0) +
    (price ? 15 : 0) +
    (selectedCategory ? 10 : 0) +
    (city ? 15 : 0)
  );
  const visLevel = visScore < 40 ? "low" : visScore < 70 ? "mid" : "high";

  if (published) {
    return (
      <>
        <Header />
        <div className="container" style={{ textAlign: "center", padding: 60 }}>
          <h1 style={{ fontSize: 20, marginBottom: 8 }}>Обявата е публикувана!</h1>
          <p style={{ color: "#999", marginBottom: 20 }}>Вече е видима за потребителите.</p>
          <Link href="/" className="btn-brand">Към начало</Link>
        </div>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: 20, maxWidth: 640 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>Публикувай обява</h1>
        <p style={{ fontSize: 13, color: "#999", margin: "0 0 20px" }}>Безплатно. Попълни полетата по-долу.</p>

        {/* Ad visibility score */}
        <div style={{ background: "#f9f9f9", borderRadius: 8, padding: 12, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
            <span style={{ fontWeight: 600 }}>Видимост на обявата</span>
            <span style={{ fontWeight: 600, color: visLevel === "high" ? "#86b817" : visLevel === "mid" ? "#ffc107" : "#dc3545" }}>{visScore}%</span>
          </div>
          <div className="vis-bar">
            <div className={`vis-fill ${visLevel}`} style={{ width: `${visScore}%` }} />
          </div>
          <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
            {visScore < 40 ? "Добави повече детайли за по-добра видимост" :
             visScore < 70 ? "Добро начало! Добави снимки и описание" :
             "Отлична обява!"}
          </div>
        </div>

        {/* Category */}
        <div style={{ marginBottom: 16 }}>
          <label>Категория *</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Избери категория...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 16 }}>
          <label>Заглавие *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="напр. iPhone 15 Pro Max, 256GB, нов"
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: 16 }}>
          <label>Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Опиши подробно какво предлагаш..."
          />
        </div>

        {/* Price + Condition */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label>Цена (лв) *</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
            />
            {price && Number(price) > 0 && (
              <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
                Подобни обяви: 800 - 3 500 лв
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <label>Състояние</label>
            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
              <option value="new">Ново</option>
              <option value="like-new">Като ново</option>
              <option value="good">Добро</option>
              <option value="fair">Задоволително</option>
            </select>
          </div>
        </div>

        {/* City */}
        <div style={{ marginBottom: 16 }}>
          <label>Град *</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Избери град...</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Photos */}
        <div style={{ marginBottom: 16 }}>
          <label>Снимки</label>
          <div style={{ border: "2px dashed #ddd", borderRadius: 8, padding: 32, textAlign: "center", color: "#999", cursor: "pointer" }}>
            <div style={{ fontSize: 14, marginBottom: 4 }}>Плъзни снимки тук или кликни за избор</div>
            <div style={{ fontSize: 12 }}>Максимум 10 снимки, до 5MB всяка</div>
          </div>
        </div>

        {/* Promotion tiers - 3-tier Gumtree style */}
        <div style={{ marginBottom: 20, background: "#f9f9f9", borderRadius: 8, padding: 16 }}>
          <label style={{ marginBottom: 8 }}>Промотиране (по избор)</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            <div
              className={`promo-tier ${promoTier === "" ? "selected" : ""}`}
              onClick={() => setPromoTier("")}
            >
              <div className="tier-name">Безплатно</div>
              <div className="tier-price">0 лв</div>
              <div className="tier-desc">Стандартна обява</div>
            </div>
            <div
              className={`promo-tier ${promoTier === "top" ? "selected" : ""}`}
              onClick={() => setPromoTier("top")}
            >
              <div className="tier-name">ТОП</div>
              <div className="tier-price">7.99 лв</div>
              <div className="tier-desc">14 дни на преден план</div>
            </div>
            <div
              className={`promo-tier ${promoTier === "spotlight" ? "selected" : ""}`}
              onClick={() => setPromoTier("spotlight")}
            >
              <div className="tier-name">Прожектор</div>
              <div className="tier-price">19.99 лв</div>
              <div className="tier-desc">7 дни в галерията</div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #eee", paddingTop: 16, marginBottom: 20 }}>
          <Link href="/" style={{ fontSize: 13, color: "#999" }}>Отказ</Link>
          <button
            onClick={() => setPublished(true)}
            disabled={!title || !price || !selectedCategory || !city}
            className="btn-brand"
            style={{
              opacity: (!title || !price || !selectedCategory || !city) ? 0.5 : 1,
              cursor: (!title || !price || !selectedCategory || !city) ? "not-allowed" : "pointer",
              padding: "10px 32px",
            }}
          >
            Публикувай
          </button>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
