"use client";

import { useState } from "react";
import { categories } from "@/lib/categories";
import { cities } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const steps = ["Категория", "Детайли", "Снимки", "Местоположение", "Преглед"];

export default function NewListingPage() {
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("good");
  const [city, setCity] = useState("");
  const [published, setPublished] = useState(false);

  const progress = ((step + 1) / steps.length) * 100;
  const canNext = step === 0 ? !!selectedCategory : step === 1 ? !!title && !!price : step === 3 ? !!city : true;

  if (published) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-6 animate-bounce">🎉</div>
        <h1 className="text-3xl font-bold mb-3">Обявата е публикувана!</h1>
        <p className="text-gray-500 mb-8">Вече е видима за хиляди потребители в цяла България</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            Към начало
          </Link>
          <button onClick={() => { setPublished(false); setStep(0); setTitle(""); setDescription(""); setPrice(""); setSelectedCategory(""); setCity(""); }} className="px-5 py-2.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors">
            + Нова обява
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Публикувай обява</h1>
        <p className="text-gray-500 text-sm mt-1">Безплатно и лесно - само за минута</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => i < step && setStep(i)}
              className={cn(
                "text-xs font-medium transition-colors",
                i <= step ? "text-orange-500" : "text-gray-400"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {/* Step 0: Category */}
        {step === 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Избери категория</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center",
                    selectedCategory === cat.id
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                  )}
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.nameBg}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Details */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold mb-4">Детайли за обявата</h2>
            <div>
              <label className="block text-sm font-medium mb-1.5">Заглавие *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Напр. iPhone 15 Pro Max, 256GB, нов"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Описание</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Опиши подробно какво предлагаш..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Цена *</label>
                <div className="relative">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">лв</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Състояние</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="new">Ново</option>
                  <option value="like-new">Като ново</option>
                  <option value="good">Добро</option>
                  <option value="fair">Задоволително</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Photos */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Добави снимки</h2>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-12 text-center hover:border-orange-500 transition-colors cursor-pointer">
              <div className="text-5xl mb-4">📸</div>
              <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">Плъзни снимки тук</p>
              <p className="text-sm text-gray-500">или кликни за да избереш от устройството</p>
              <p className="text-xs text-gray-400 mt-3">Максимум 10 снимки, до 5MB всяка</p>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-300 text-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                  +
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Местоположение</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1.5">Град *</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Избери град...</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400">
              🗺️ Картата ще се покаже тук
            </div>
          </div>
        )}

        {/* Step 4: Preview */}
        {step === 4 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Преглед на обявата</h2>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-4xl">📸</div>
              <div className="p-5">
                <div className="text-2xl font-bold mb-1">{price ? `${Number(price).toLocaleString("bg-BG")} лв` : "Без цена"}</div>
                <h3 className="text-lg font-medium mb-2">{title || "Без заглавие"}</h3>
                <p className="text-gray-500 text-sm mb-3">{description || "Без описание"}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>📍 {city || "Без локация"}</span>
                  <span>🏷️ {categories.find((c) => c.id === selectedCategory)?.nameBg || "Без категория"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-5 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            ← Назад
          </button>
        ) : (
          <div />
        )}
        {step < steps.length - 1 ? (
          <button
            onClick={() => canNext && setStep(step + 1)}
            disabled={!canNext}
            className={cn(
              "px-6 py-2.5 rounded-xl font-semibold transition-all",
              canNext
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg"
                : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
            )}
          >
            Напред →
          </button>
        ) : (
          <button
            onClick={() => setPublished(true)}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            🚀 Публикувай
          </button>
        )}
      </div>
    </div>
  );
}
