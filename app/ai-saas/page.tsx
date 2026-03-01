"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Cpu,
  Layers,
  Bot,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sparkles,
  BarChart3,
  Building2,
  AlertTriangle,
  Zap,
  RefreshCcw,
} from "lucide-react";

import aiData from "@/data/ai-saas.json";

const MODEL_ICONS: Record<string, any> = {
  copilot: Bot,
  agent: Cpu,
  platform: Layers,
};

export default function AiSaasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI × SaaS ― AIがSaaSを変える"
        description="AI-native SaaSの台頭、3つのAIモデル、SaaS指標への影響、福祉SaaS×AIの可能性を探る。"
      />

      {/* AI-native vs AI-enhanced */}
      {aiData.comparison && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{aiData.comparison.title}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {aiData.comparison.types.map((type: any) => (
              <Card key={type.key} className="overflow-hidden">
                <div className="px-5 py-3" style={{ backgroundColor: type.color + "15" }}>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" style={{ color: type.color }} />
                    <div>
                      <p className="text-xs font-bold" style={{ color: type.color }}>{type.name}</p>
                      <p className="text-[10px] text-muted-foreground">{type.nameJa}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5 space-y-3">
                  <p className="text-[11px] text-muted-foreground">{type.definition}</p>
                  <div>
                    <p className="mb-1 text-[10px] font-bold text-muted-foreground">特徴</p>
                    {type.characteristics.map((c: string, i: number) => (
                      <div key={i} className="flex items-start gap-1.5 text-[10px]">
                        <span className="mt-0.5" style={{ color: type.color }}>•</span>
                        <span className="text-muted-foreground">{c}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold text-muted-foreground">代表例</p>
                    <div className="flex flex-wrap gap-1">
                      {type.examples.map((ex: string) => (
                        <Badge key={ex} variant="outline" className="text-[10px]" style={{ borderColor: type.color + "40", color: type.color }}>
                          {ex}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-md bg-muted/50 p-2">
                    <p className="text-[10px] font-bold text-muted-foreground">収益モデル</p>
                    <p className="mt-0.5 text-[11px]">{type.revenueModel}</p>
                  </div>
                  <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-2">
                    <p className="text-[10px] font-bold text-amber-400">粗利率への影響</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{type.grossMarginImpact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 3 AI SaaS Models */}
      {aiData.aiModels && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{aiData.aiModels.title}</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {aiData.aiModels.models.map((model: any) => {
              const Icon = MODEL_ICONS[model.key] || Brain;
              return (
                <Card key={model.key} className="overflow-hidden">
                  <div className="px-5 py-3" style={{ backgroundColor: model.color + "15" }}>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: model.color + "25", color: model.color }}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold" style={{ color: model.color }}>{model.name}</p>
                        <p className="text-[10px] text-muted-foreground">{model.nameJa}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <p className="text-[11px] text-muted-foreground">{model.description}</p>
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">ユースケース</p>
                      {model.useCases.map((uc: string, i: number) => (
                        <div key={i} className="flex items-start gap-1.5 text-[10px]">
                          <Zap className="mt-0.5 h-3 w-3 shrink-0" style={{ color: model.color }} />
                          <span className="text-muted-foreground">{uc}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">代表例</p>
                      <div className="flex flex-wrap gap-1">
                        {model.examples.map((ex: string) => (
                          <Badge key={ex} variant="outline" className="text-[10px]">{ex}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="mb-1 text-[10px] font-bold text-emerald-400">メリット</p>
                        {model.pros.map((p: string, i: number) => (
                          <div key={i} className="flex items-start gap-1 text-[10px]">
                            <CheckCircle2 className="mt-0.5 h-2.5 w-2.5 shrink-0 text-emerald-400" />
                            <span className="text-muted-foreground">{p}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] font-bold text-red-400">デメリット</p>
                        {model.cons.map((c: string, i: number) => (
                          <div key={i} className="flex items-start gap-1 text-[10px]">
                            <XCircle className="mt-0.5 h-2.5 w-2.5 shrink-0 text-red-400" />
                            <span className="text-muted-foreground">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Metrics Impact */}
      {aiData.metricsImpact && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{aiData.metricsImpact.title}</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiData.metricsImpact.impacts.map((impact: any) => {
              const DirectionIcon = impact.direction === "up" ? TrendingUp : impact.direction === "down" ? TrendingDown : RefreshCcw;
              return (
                <Card key={impact.metric}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" style={{ color: impact.color }} />
                        <p className="text-xs font-bold">{impact.metric}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <DirectionIcon className="h-3.5 w-3.5" style={{ color: impact.color }} />
                        <Badge variant="outline" className="text-[10px]" style={{ borderColor: impact.color + "40", color: impact.color }}>
                          {impact.direction === "up" ? "上昇" : impact.direction === "down" ? "低下" : "変化"}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{impact.description}</p>
                    <div className="rounded-md bg-muted/50 p-2">
                      <p className="text-[10px] font-bold text-muted-foreground">ベンチマーク</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{impact.benchmark}</p>
                    </div>
                    <div className="rounded-md border border-blue-500/20 bg-blue-500/5 p-2">
                      <p className="text-[10px] font-bold text-blue-400">実例</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{impact.example}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Welfare SaaS x AI */}
      {aiData.welfareSaasAi && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{aiData.welfareSaasAi.title}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {aiData.welfareSaasAi.opportunities.map((opp: any) => (
              <Card key={opp.name} className="border-emerald-500/10">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-400" />
                      <p className="text-xs font-bold">{opp.name}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px]"
                      style={{
                        borderColor: opp.feasibility === "high" ? "#10B98140" : opp.feasibility === "medium" ? "#F59E0B40" : "#EF444440",
                        color: opp.feasibility === "high" ? "#10B981" : opp.feasibility === "medium" ? "#F59E0B" : "#EF4444",
                      }}
                    >
                      実現性: {opp.feasibility === "high" ? "高" : opp.feasibility === "medium" ? "中" : "低"}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{opp.description}</p>
                  <div className="rounded-md bg-emerald-500/5 border border-emerald-500/20 p-2">
                    <p className="text-[10px] font-bold text-emerald-400">インパクト</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{opp.impact}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">
                      {opp.timeline}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* AI Case Studies */}
      {aiData.aiCaseStudies && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{aiData.aiCaseStudies.title}</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiData.aiCaseStudies.companies.map((company: any) => (
              <Card key={company.name} className="overflow-hidden">
                <div className="px-5 py-3" style={{ backgroundColor: company.color + "15" }}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" style={{ color: company.color }} />
                    <div>
                      <p className="text-xs font-bold">{company.name}</p>
                      <Badge variant="outline" className="text-[9px]" style={{ borderColor: company.color + "40", color: company.color }}>
                        {company.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5 space-y-3">
                  <p className="text-[11px] text-muted-foreground">{company.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-md bg-muted/50 p-1.5">
                      <p className="text-[9px] text-muted-foreground">ARR/売上</p>
                      <p className="font-mono text-[10px] font-bold">{company.arrOrRevenue}</p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-1.5">
                      <p className="text-[9px] text-muted-foreground">ユーザー数</p>
                      <p className="font-mono text-[10px] font-bold">{company.userCount}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground">課金モデル</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{company.pricingModel}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground">AI技術スタック</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{company.aiTechStack}</p>
                  </div>
                  <div className="rounded-md border p-2" style={{ borderColor: company.color + "20", backgroundColor: company.color + "08" }}>
                    <p className="text-[10px] font-bold" style={{ color: company.color }}>Key Metric</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{company.keyMetric}</p>
                  </div>
                  <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-2">
                    <div className="flex items-start gap-1.5">
                      <Lightbulb className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" />
                      <p className="text-[10px] text-amber-300">{company.lesson}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* AI SaaS Glossary */}
      {aiData.glossary && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{(aiData.glossary as any).title}</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {(aiData.glossary as any).terms.map((term: any) => (
              <Card key={term.term}>
                <CardContent className="p-4 space-y-1.5">
                  <p className="text-xs font-bold">{term.term}</p>
                  <p className="text-[10px] text-muted-foreground">{term.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
