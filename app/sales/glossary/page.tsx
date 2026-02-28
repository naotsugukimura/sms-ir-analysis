"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search } from "lucide-react";

import glossaryData from "@/data/marketing-glossary.json";

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = glossaryData.categories
    .map((cat: any) => ({
      ...cat,
      terms: cat.terms.filter(
        (term: any) =>
          !search ||
          term.en.toLowerCase().includes(search.toLowerCase()) ||
          (term.enFull && term.enFull.toLowerCase().includes(search.toLowerCase())) ||
          term.ja.includes(search) ||
          term.definition.includes(search)
      ),
    }))
    .filter(
      (cat: any) =>
        cat.terms.length > 0 &&
        (!activeCategory || cat.category === activeCategory)
    );

  const totalTerms = glossaryData.categories.reduce(
    (sum: number, cat: any) => sum + cat.terms.length,
    0
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={glossaryData.title}
        description={glossaryData.description}
      />

      {/* Stats + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold">{totalTerms} 用語</p>
            <p className="text-xs text-muted-foreground">
              {glossaryData.categories.length} カテゴリ
            </p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="用語を検索... (例: ARR, 解約率)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2 text-sm focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 sm:w-72"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            !activeCategory
              ? "bg-white/10 text-foreground"
              : "text-muted-foreground hover:bg-white/5"
          }`}
        >
          All
        </button>
        {glossaryData.categories.map((cat: any) => (
          <button
            key={cat.category}
            onClick={() =>
              setActiveCategory(
                activeCategory === cat.category ? null : cat.category
              )
            }
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeCategory === cat.category
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={{
              backgroundColor:
                activeCategory === cat.category
                  ? cat.color + "20"
                  : undefined,
              borderColor: cat.color + "40",
              border: "1px solid " + (activeCategory === cat.category ? cat.color + "40" : "transparent"),
            }}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Terms */}
      {filteredCategories.map((cat: any) => (
        <div key={cat.category} className="space-y-3">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: cat.color }}
            />
            <h3 className="text-sm font-bold">{cat.category}</h3>
            <span className="text-xs text-muted-foreground">
              {cat.categoryEn} ({cat.terms.length})
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {cat.terms.map((term: any) => (
              <Card key={term.en} className="border-border/50">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className="text-sm font-bold"
                        style={{ color: cat.color }}
                      >
                        {term.en}
                      </span>
                      {term.enFull && (
                        <span className="text-xs text-muted-foreground ml-1">
                          ({term.enFull})
                        </span>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] shrink-0"
                    >
                      {term.ja}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {term.definition}
                  </p>

                  {term.formula && (
                    <div className="rounded-md bg-muted/50 px-2 py-1">
                      <span className="text-[10px] text-muted-foreground">
                        計算式:{" "}
                      </span>
                      <code className="text-[10px] font-mono text-foreground">
                        {term.formula}
                      </code>
                    </div>
                  )}

                  {term.example && (
                    <p className="text-[10px] text-muted-foreground/80">
                      例: {term.example}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">該当する用語が見つかりません</p>
          <p className="text-xs mt-1">検索条件を変更してください</p>
        </div>
      )}
    </div>
  );
}
