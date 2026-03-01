"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Network,
  Database,
  Layers,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Package,
} from "lucide-react";

const MOAT_ICONS: Record<string, any> = {
  "Network Effects": Network,
  "Switching Costs": Shield,
  "Data Moats": Database,
  "Ecosystem Lock-in": Layers,
  "Brand & Trust": Award,
};

export function SaasCompetitiveStrategy({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold">{data.title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{data.subtitle}</p>
      </div>

      {/* 5 Moats Grid */}
      {data.moats && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">5つのMoat</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.moats.map((moat: any) => {
              const Icon = MOAT_ICONS[moat.name] || Shield;
              return (
                <Card key={moat.name} className="overflow-hidden">
                  <div className="px-5 py-3" style={{ backgroundColor: moat.color + "15" }}>
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: moat.color + "25", color: moat.color }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold" style={{ color: moat.color }}>
                          {moat.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{moat.nameJa}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    {/* Strength Bar */}
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">強度</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                i < moat.strength ? moat.color : moat.color + "20",
                            }}
                          />
                        ))}
                        <span
                          className="ml-1 text-[10px] font-bold"
                          style={{ color: moat.color }}
                        >
                          {moat.strength}/5
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-muted-foreground">{moat.description}</p>

                    {/* Types */}
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">タイプ</p>
                      {moat.types.map((type: string, i: number) => (
                        <div key={i} className="flex items-start gap-1.5 text-[10px]">
                          <span className="mt-0.5" style={{ color: moat.color }}>
                            *
                          </span>
                          <span className="text-muted-foreground">{type}</span>
                        </div>
                      ))}
                    </div>

                    {/* Examples */}
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">代表例</p>
                      <div className="flex flex-wrap gap-1">
                        {moat.examples.map((ex: string) => (
                          <Badge
                            key={ex}
                            variant="outline"
                            className="text-[10px]"
                            style={{ borderColor: moat.color + "40", color: moat.color }}
                          >
                            {ex}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Build Method */}
                    <div className="rounded-md bg-muted/50 p-2">
                      <p className="text-[10px] font-bold text-muted-foreground">構築方法</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {moat.buildMethod}
                      </p>
                    </div>

                    {/* Kaipoke Relevance Callout */}
                    <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 p-2">
                      <div className="flex items-start gap-1.5">
                        <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                        <div>
                          <p className="text-[10px] font-bold text-emerald-400">
                            カイポケへの適用
                          </p>
                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            {moat.kaipokeRelevance}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Platform Strategy */}
      {data.platformStrategy && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">
            {data.platformStrategy.title}
          </h3>
          <p className="text-[11px] text-muted-foreground">
            {data.platformStrategy.description}
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
            {data.platformStrategy.stages.map((stage: any, idx: number) => {
              const colors = ["#3B82F6", "#8B5CF6", "#10B981"];
              const accent = colors[idx % colors.length];
              return (
                <div key={stage.name} className="flex flex-1 items-stretch gap-2">
                  <Card className="flex-1">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold"
                          style={{ backgroundColor: accent + "20", color: accent }}
                        >
                          {idx + 1}
                        </div>
                        <p className="text-xs font-bold" style={{ color: accent }}>
                          {stage.name}
                        </p>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{stage.description}</p>
                      <div>
                        <p className="mb-1 text-[10px] font-bold text-muted-foreground">代表例</p>
                        <div className="flex flex-wrap gap-1">
                          {stage.examples.map((ex: string) => (
                            <Badge
                              key={ex}
                              variant="outline"
                              className="text-[10px]"
                              style={{ borderColor: accent + "40", color: accent }}
                            >
                              {ex}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-md bg-muted/50 p-2">
                        <p className="text-[10px] font-bold text-muted-foreground">KPI</p>
                        <p className="mt-0.5 text-[10px] font-medium" style={{ color: accent }}>
                          {stage.kpi}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  {idx < data.platformStrategy.stages.length - 1 && (
                    <div className="hidden items-center md:flex">
                      <ArrowRight className="h-5 w-5 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Multi-Product Strategy */}
      {data.multiProduct && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">
            {data.multiProduct.title}
          </h3>
          <p className="text-[11px] text-muted-foreground">{data.multiProduct.description}</p>

          {/* Benefits */}
          <Card>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <p className="text-xs font-bold">メリット</p>
              </div>
              {data.multiProduct.benefits.map((benefit: string, i: number) => (
                <div key={i} className="flex items-start gap-1.5 text-[10px]">
                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-blue-400" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Company Examples */}
          <div className="grid gap-4 md:grid-cols-3">
            {data.multiProduct.examples.map((example: any, idx: number) => {
              const colors = ["#3B82F6", "#8B5CF6", "#10B981"];
              const accent = colors[idx % colors.length];
              const isKaipoke = example.name.includes("カイポケ");
              return (
                <Card
                  key={example.name}
                  className={`overflow-hidden ${isKaipoke ? "border-emerald-500/20" : ""}`}
                >
                  <div
                    className="px-5 py-3"
                    style={{ backgroundColor: (isKaipoke ? "#10B981" : accent) + "15" }}
                  >
                    <div className="flex items-center gap-2">
                      <Package
                        className="h-4 w-4"
                        style={{ color: isKaipoke ? "#10B981" : accent }}
                      />
                      <p
                        className="text-xs font-bold"
                        style={{ color: isKaipoke ? "#10B981" : accent }}
                      >
                        {example.name}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">進化</p>
                      <p className="text-[10px] text-muted-foreground">{example.evolution}</p>
                    </div>
                    <div
                      className="rounded-md p-2"
                      style={{
                        backgroundColor: (isKaipoke ? "#10B981" : accent) + "08",
                        borderColor: (isKaipoke ? "#10B981" : accent) + "20",
                        border: "1px solid",
                      }}
                    >
                      <p className="text-[10px] font-bold text-muted-foreground">結果</p>
                      <p
                        className="mt-0.5 text-[10px] font-medium"
                        style={{ color: isKaipoke ? "#10B981" : accent }}
                      >
                        {example.result}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Risks */}
          <Card className="border-red-500/10">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <p className="text-xs font-bold text-red-400">リスク</p>
              </div>
              {data.multiProduct.risks.map((risk: string, i: number) => (
                <div key={i} className="flex items-start gap-1.5 text-[10px]">
                  <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-red-400" />
                  <span className="text-muted-foreground">{risk}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
