"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Target,
  TrendingUp,
  BarChart3,
  Briefcase,
  Search,
  Lightbulb,
} from "lucide-react";

import glossaryData from "@/data/saas-glossary.json";

const CATEGORY_ICONS: Record<string, any> = {
  revenue: DollarSign,
  efficiency: Target,
  growth: TrendingUp,
  product: BarChart3,
  financial: Briefcase,
};

export default function GlossaryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return glossaryData.terms.filter((term: any) => {
      const matchCategory = activeCategory === "all" || term.category === activeCategory;
      const matchSearch =
        searchQuery === "" ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.termEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.description.includes(searchQuery);
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const categoryMap = useMemo(() => {
    const map: Record<string, any> = {};
    glossaryData.categories.forEach((c: any) => {
      map[c.key] = c;
    });
    return map;
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="SaaS用語集 ― 50+の重要指標と用語"
        description="SaaSビジネスを理解するための重要用語。各用語に計算式、ベンチマーク、アクションティップ付き。"
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="用語を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-white/10 text-white border border-white/20"
              : "bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted"
          }`}
        >
          全て ({glossaryData.terms.length})
        </button>
        {glossaryData.categories.map((cat: any) => {
          const Icon = CATEGORY_ICONS[cat.key] || BarChart3;
          const count = glossaryData.terms.filter((t: any) => t.category === cat.key).length;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat.key
                  ? "border"
                  : "bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted"
              }`}
              style={
                activeCategory === cat.key
                  ? { backgroundColor: cat.color + "15", color: cat.color, borderColor: cat.color + "40" }
                  : {}
              }
            >
              <Icon className="h-3 w-3" />
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Terms Grid */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((term: any) => {
          const cat = categoryMap[term.category];
          return (
            <Card key={term.term} className="overflow-hidden">
              <div className="px-4 py-2" style={{ backgroundColor: (cat?.color || "#666") + "10" }}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold">{term.term}</p>
                  <Badge
                    variant="outline"
                    className="text-[9px]"
                    style={{ borderColor: (cat?.color || "#666") + "40", color: cat?.color || "#666" }}
                  >
                    {cat?.name}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">{term.termEn}</p>
              </div>
              <CardContent className="p-4 space-y-2.5">
                <p className="text-[11px] text-muted-foreground">{term.description}</p>
                {term.formula && (
                  <div className="rounded-md border p-2" style={{ borderColor: (cat?.color || "#666") + "30", backgroundColor: (cat?.color || "#666") + "08" }}>
                    <p className="text-[9px] font-bold text-muted-foreground mb-0.5">計算式</p>
                    <p className="font-mono text-[10px] font-bold" style={{ color: cat?.color || "#666" }}>{term.formula}</p>
                  </div>
                )}
                <div className="rounded-md bg-muted/50 p-2">
                  <p className="text-[9px] font-bold text-muted-foreground mb-0.5">ベンチマーク</p>
                  <p className="text-[10px]">{term.benchmark}</p>
                </div>
                <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-2">
                  <div className="flex items-start gap-1.5">
                    <Lightbulb className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" />
                    <p className="text-[10px] text-amber-300">{term.actionTip}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">該当する用語が見つかりません。</p>
        </div>
      )}
    </div>
  );
}
