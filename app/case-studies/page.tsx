"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Globe,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  Sparkles,
  BarChart3,
  DollarSign,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import caseData from "@/data/saas-case-studies.json";

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState<"all" | "global" | "japan">("all");
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const filtered = caseData.companies.filter(
    (c: any) => filter === "all" || c.region === filter
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="SaaSケーススタディ ― 10社の成長ストーリー"
        description="グローバル5社＋日本5社のSaaS企業を徹底分析。創業からPMF、成長、現在までの戦略と指標を学ぶ。"
      />

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { key: "all", label: "全て" },
          { key: "global", label: "グローバル" },
          { key: "japan", label: "日本" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as any)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f.key
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                : "bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Company Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((company: any) => {
          const isExpanded = expandedCompany === company.name;
          return (
            <Card
              key={company.name}
              className="overflow-hidden cursor-pointer transition-all hover:border-white/20"
              onClick={() => setExpandedCompany(isExpanded ? null : company.name)}
            >
              {/* Header */}
              <div
                className="px-5 py-3"
                style={{ backgroundColor: company.color + "15" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold text-white"
                      style={{ backgroundColor: company.color }}
                    >
                      {company.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{company.name}</p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>{company.market}</span>
                        <span>•</span>
                        <span>{company.foundedYear}年〜</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px]"
                    style={{ borderColor: company.color + "40", color: company.color }}
                  >
                    {company.region === "global" ? "Global" : "Japan"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-5 space-y-3">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "ARR", value: company.metrics.arr },
                    { label: "NRR", value: company.metrics.nrr },
                    { label: "粗利率", value: company.metrics.grossMargin },
                  ].map((m) => (
                    <div key={m.label} className="rounded-md bg-muted/50 p-2 text-center">
                      <p className="text-[10px] text-muted-foreground">{m.label}</p>
                      <p className="font-mono text-xs font-bold">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* GTM & Pricing */}
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-[10px]">
                    GTM: {company.gtmModel}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    {company.pricingModel}
                  </Badge>
                </div>

                {/* Story (condensed) */}
                <div>
                  <p className="mb-1 text-[10px] font-bold text-muted-foreground">ストーリー</p>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                    {company.story.founding}
                  </p>
                </div>

                {/* Key Innovation */}
                <div className="rounded-lg border p-2.5" style={{ borderColor: company.color + "20", backgroundColor: company.color + "08" }}>
                  <div className="flex items-start gap-1.5">
                    <Lightbulb className="mt-0.5 h-3 w-3 shrink-0" style={{ color: company.color }} />
                    <p className="text-[10px]" style={{ color: company.color }}>{company.keyInnovation}</p>
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="space-y-3 border-t border-border/50 pt-3">
                    {/* Full Story */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-muted-foreground">成長ストーリー</p>
                      {[
                        { label: "創業", text: company.story.founding, color: "#3B82F6" },
                        { label: "PMF", text: company.story.pmf, color: "#8B5CF6" },
                        { label: "成長", text: company.story.growth, color: "#F97316" },
                        { label: "現在", text: company.story.current, color: "#10B981" },
                      ].map((phase) => (
                        <div key={phase.label} className="flex gap-3">
                          <Badge
                            variant="outline"
                            className="mt-0.5 shrink-0 text-[10px]"
                            style={{ borderColor: phase.color + "40", color: phase.color }}
                          >
                            {phase.label}
                          </Badge>
                          <p className="text-[10px] text-muted-foreground">{phase.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* All Metrics */}
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">詳細指標</p>
                      <div className="grid grid-cols-5 gap-1.5">
                        {Object.entries(company.metrics).map(([key, val]: [string, any]) => (
                          <div key={key} className="rounded-md bg-muted/50 p-1.5 text-center">
                            <p className="text-[9px] text-muted-foreground">{key}</p>
                            <p className="font-mono text-[10px] font-bold">{val}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Success Factors */}
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">成功要因</p>
                      {company.successFactors.map((f: string, i: number) => (
                        <div key={i} className="flex items-start gap-1.5 text-[10px]">
                          <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0" style={{ color: company.color }} />
                          <span className="text-muted-foreground">{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Lessons for Kaipoke */}
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5">
                      <div className="flex items-start gap-1.5">
                        <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                        <div>
                          <p className="text-[10px] font-bold text-emerald-400 mb-0.5">カイポケへの示唆</p>
                          <p className="text-[10px] text-muted-foreground">{company.lessonsForKaipoke}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Expand indicator */}
                <p className="text-center text-[10px] text-muted-foreground/60">
                  {isExpanded ? "▲ 閉じる" : "▼ 詳細を見る"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Synthesis */}
      {caseData.kaipokeSynthesis && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{(caseData.kaipokeSynthesis as any).title}</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {(caseData.kaipokeSynthesis as any).keyTakeaways.map((item: any, i: number) => (
              <Card key={i} className="border-emerald-500/10">
                <CardContent className="p-4 space-y-2">
                  <p className="text-xs font-bold text-emerald-400">{item.theme}</p>
                  <p className="text-[10px] text-muted-foreground">{item.insight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
