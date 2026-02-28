"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  ArrowDown,
  FileSpreadsheet,
  DollarSign,
  BarChart3,
  Layers,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const CONCEPT_ICONS: Record<string, any> = {
  T2D3: TrendingUp,
  JCurve: ArrowDown,
  BusinessPlan: FileSpreadsheet,
  CapitalEfficiency: DollarSign,
  SaaSValuation: BarChart3,
  CohortAnalysis: Layers,
  CompoundGrowth: RefreshCw,
};

const CONCEPT_COLORS: Record<string, string> = {
  T2D3: "#3B82F6",
  JCurve: "#EF4444",
  BusinessPlan: "#10B981",
  CapitalEfficiency: "#F59E0B",
  SaaSValuation: "#8B5CF6",
  CohortAnalysis: "#06B6D4",
  CompoundGrowth: "#EC4899",
};

export function SaasFinancialConcepts({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<string | null>("T2D3");

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold">{data.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          T2D3、Jカーブ、事業計画の組み方、バリュエーション。SaaS事業の財務を体系的に理解する。
        </p>
      </div>

      {data.concepts.map((concept: any) => {
        const isExpanded = expanded === concept.key;
        const Icon = CONCEPT_ICONS[concept.key] || TrendingUp;
        const color = CONCEPT_COLORS[concept.key] || "#3B82F6";

        return (
          <Card
            key={concept.key}
            className="cursor-pointer transition-all"
            style={{ borderColor: isExpanded ? color + "60" : undefined }}
            onClick={() => setExpanded(isExpanded ? null : concept.key)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: color + "20", color }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">{concept.name}</CardTitle>
                    <p className="text-[10px] text-muted-foreground">{concept.nameJa}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              {!isExpanded && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{concept.description}</p>
              )}
            </CardHeader>

            {isExpanded && (
              <CardContent className="space-y-4 pt-0" onClick={(e) => e.stopPropagation()}>
                <p className="text-sm text-muted-foreground">{concept.description}</p>

                {/* T2D3 Trajectory */}
                {concept.trajectory && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold" style={{ color }}>成長軌道</p>
                    <div className="grid grid-cols-6 gap-1">
                      {concept.trajectory.map((t: any) => (
                        <div key={t.year} className="rounded-lg border border-border p-2 text-center">
                          <p className="text-[10px] text-muted-foreground">{t.year}</p>
                          <p className="text-sm font-bold" style={{ color }}>{t.arr}</p>
                          <Badge variant="outline" className="text-[8px] mt-1">{t.growth}</Badge>
                        </div>
                      ))}
                    </div>
                    {concept.reality && (
                      <div className="rounded-lg bg-muted/50 p-2">
                        <p className="text-[10px] text-muted-foreground">{concept.reality}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* J-Curve Phases */}
                {concept.phases && (
                  <div className="space-y-3">
                    {concept.phases.map((phase: any, i: number) => (
                      <div key={i} className="rounded-lg border border-border p-3 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px]" style={{ borderColor: color + "40", color }}>
                            {phase.period}
                          </Badge>
                          <span className="text-xs font-bold">{phase.phase}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{phase.characteristics}</p>
                        <p className="text-[10px] text-muted-foreground/80">{phase.financials}</p>
                        <div className="rounded-md bg-muted/30 px-2 py-1">
                          <p className="text-[10px] text-muted-foreground"><span className="font-semibold">なぜ？</span> {phase.why}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Business Plan Structure */}
                {concept.structure && (
                  <div className="space-y-3">
                    {concept.structure.map((section: any, i: number) => (
                      <div key={i} className="rounded-lg border border-border p-3 space-y-2">
                        <p className="text-xs font-bold" style={{ color }}>{section.section}</p>
                        <div className="rounded-md bg-muted/30 px-2 py-1">
                          <code className="text-[10px] font-mono">{section.formula}</code>
                        </div>
                        <ul className="space-y-0.5">
                          {section.components.map((c: string, j: number) => (
                            <li key={j} className="text-[10px] text-muted-foreground">• {c}</li>
                          ))}
                        </ul>
                        <div className="rounded-md bg-amber-500/5 border border-amber-500/20 px-2 py-1">
                          <p className="text-[10px] text-amber-400">💡 {section.tip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Capital Efficiency Metrics */}
                {concept.metrics && concept.key === "CapitalEfficiency" && (
                  <div className="space-y-3">
                    {concept.metrics.map((m: any, i: number) => (
                      <div key={i} className="rounded-lg border border-border p-3 space-y-1">
                        <p className="text-xs font-bold">{m.name}</p>
                        <div className="rounded-md bg-muted/30 px-2 py-1">
                          <code className="text-[10px] font-mono">{m.formula}</code>
                        </div>
                        <p className="text-[10px] text-muted-foreground">{m.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.entries(m.benchmarks).map(([k, v]) => (
                            <Badge key={k} variant="outline" className="text-[8px]">
                              {k}: {v as string}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Valuation Multiples */}
                {concept.multiples && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold" style={{ color }}>ARRマルチプル目安</p>
                    <div className="space-y-1">
                      {concept.multiples.map((m: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2">
                          <span className="text-[10px] w-28 shrink-0 text-muted-foreground">{m.growth}</span>
                          <span className="text-xs font-bold" style={{ color }}>{m.multiple}</span>
                          <span className="text-[10px] text-muted-foreground/80">{m.note}</span>
                        </div>
                      ))}
                    </div>
                    {concept.whatAffectsMultiple && (
                      <div className="rounded-lg bg-muted/50 p-2">
                        <p className="text-[10px] font-semibold text-muted-foreground mb-1">マルチプルに影響する要因</p>
                        <ul className="space-y-0.5">
                          {concept.whatAffectsMultiple.map((w: string, i: number) => (
                            <li key={i} className="text-[10px] text-muted-foreground">• {w}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Cohort Analysis */}
                {concept.whyImportant && concept.key === "CohortAnalysis" && (
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold" style={{ color }}>なぜ重要か</p>
                      {concept.whyImportant.map((w: string, i: number) => (
                        <p key={i} className="text-[10px] text-muted-foreground">• {w}</p>
                      ))}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold" style={{ color }}>読み方</p>
                      {concept.howToRead.map((h: string, i: number) => (
                        <p key={i} className="text-[10px] text-muted-foreground">• {h}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Compound Growth Simulation */}
                {concept.simulation && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold" style={{ color }}>シミュレーション（月5万MRR新規獲得の場合）</p>
                    <div className="space-y-1">
                      {concept.simulation.map((s: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2">
                          <span className="text-[10px] w-32 shrink-0 font-medium">{s.scenario}</span>
                          <span className="text-[10px] text-muted-foreground">3年後: </span>
                          <span className="text-xs font-bold" style={{ color }}>{s.year3}</span>
                          <span className="text-[10px] text-muted-foreground/80 flex-1">{s.note}</span>
                        </div>
                      ))}
                    </div>
                    {concept.insight && (
                      <div className="rounded-lg bg-pink-500/5 border border-pink-500/20 p-2">
                        <p className="text-[10px] text-pink-400">{concept.insight}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* How to Achieve / General Lists */}
                {concept.howToAchieve && (
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-[10px] font-semibold text-muted-foreground mb-1">達成のための条件</p>
                    <ul className="space-y-0.5">
                      {concept.howToAchieve.map((h: string, i: number) => (
                        <li key={i} className="text-[10px] text-muted-foreground">• {h}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Investor Perspective */}
                {concept.investorPerspective && (
                  <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-2">
                    <p className="text-[10px] text-blue-400">📈 投資家の視点: {concept.investorPerspective}</p>
                  </div>
                )}

                {/* SMS Example */}
                {concept.smsExample && (
                  <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-2">
                    <p className="text-[10px] text-emerald-400">🏢 カイポケの場合: {concept.smsExample}</p>
                  </div>
                )}

                {/* Why it matters */}
                {concept.whyItMatters && (
                  <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-2">
                    <p className="text-[10px] text-amber-400">💡 なぜ重要か: {concept.whyItMatters}</p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
