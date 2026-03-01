"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BarChart3,
  Lightbulb,
  Building2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

export function SaasPlg({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold">{data.title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{data.subtitle}</p>
      </div>

      {/* PLG vs SLG vs CLG */}
      {data.comparison && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">
            {data.comparison.title}
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {data.comparison.models.map((model: any) => (
              <Card key={model.key} className="overflow-hidden">
                <div
                  className="px-5 py-3"
                  style={{ backgroundColor: model.color + "20" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-lg px-3 py-1 text-sm font-bold text-white"
                      style={{ backgroundColor: model.color }}
                    >
                      {model.key.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-bold">{model.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {model.nameJa}
                  </p>
                </div>
                <CardContent className="p-5 space-y-3">
                  <p className="text-[11px] text-muted-foreground">
                    {model.definition}
                  </p>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-muted-foreground">特徴</p>
                    {model.characteristics.map((c: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-[11px]">
                        <span className="mt-0.5" style={{ color: model.color }}>•</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground">組織構造</p>
                    <p className="mt-0.5 text-[11px]">{model.orgStructure}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground">ファネル形状</p>
                    <p className="mt-0.5 text-[11px]">{model.funnelShape}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground">ACV帯</p>
                    <Badge variant="outline" className="text-[10px]" style={{ borderColor: model.color + "40", color: model.color }}>
                      {model.acvRange}
                    </Badge>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold text-muted-foreground">代表例</p>
                    <div className="flex flex-wrap gap-1">
                      {model.examples.map((ex: string) => (
                        <Badge key={ex} variant="outline" className="text-[10px]">{ex}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* PLG Funnel */}
      {data.plgFunnel && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.plgFunnel.title}</h3>
          <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
            {data.plgFunnel.stages.map((stage: any, idx: number) => {
              const colors = [
                { accent: "#3B82F6", border: "border-blue-500/30", text: "text-blue-400" },
                { accent: "#8B5CF6", border: "border-purple-500/30", text: "text-purple-400" },
                { accent: "#F97316", border: "border-orange-500/30", text: "text-orange-400" },
                { accent: "#10B981", border: "border-emerald-500/30", text: "text-emerald-400" },
              ];
              const c = colors[idx % colors.length];
              return (
                <div key={stage.stage} className="flex flex-1 items-stretch gap-2">
                  <Card className={`flex-1 ${c.border}`}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold" style={{ backgroundColor: c.accent + "20", color: c.accent }}>
                          {idx + 1}
                        </div>
                        <p className={`text-xs font-bold ${c.text}`}>{stage.stage}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{stage.description}</p>
                      <Badge variant="outline" className="text-[10px]" style={{ borderColor: c.accent + "40", color: c.accent }}>
                        {stage.benchmark}
                      </Badge>
                      <div>
                        <p className="mb-1 text-[10px] font-bold text-emerald-400">ベストプラクティス</p>
                        <div className="space-y-1">
                          {stage.bestPractices.map((bp: string, i: number) => (
                            <div key={i} className="flex items-start gap-1.5 text-[10px]">
                              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                              <span className="text-muted-foreground">{bp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] font-bold text-red-400">アンチパターン</p>
                        <div className="space-y-1">
                          {stage.antiPatterns.map((ap: string, i: number) => (
                            <div key={i} className="flex items-start gap-1.5 text-[10px]">
                              <XCircle className="mt-0.5 h-3 w-3 shrink-0 text-red-400" />
                              <span className="text-muted-foreground">{ap}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {idx < data.plgFunnel.stages.length - 1 && (
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

      {/* PLG Metrics */}
      {data.plgMetrics && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.plgMetrics.title}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {data.plgMetrics.metrics.map((metric: any) => (
              <Card key={metric.key}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-violet-400" />
                    <p className="text-xs font-bold">{metric.name}</p>
                  </div>
                  <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-2.5">
                    <p className="font-mono text-[11px] font-bold text-violet-400">{metric.formula}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{metric.description}</p>
                  <Badge variant="outline" className="text-[10px] border-violet-500/30 text-violet-400">
                    {metric.benchmark}
                  </Badge>
                  <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5">
                    <div className="flex items-start gap-1.5">
                      <Lightbulb className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" />
                      <p className="text-[10px] text-amber-300">{metric.actionTip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* PLG Success Stories */}
      {data.plgSuccessStories && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.plgSuccessStories.title}</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {data.plgSuccessStories.companies.map((company: any) => (
              <Card key={company.name}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-400" />
                    <p className="text-sm font-bold">{company.name}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold text-muted-foreground">フライホイール</p>
                    <p className="text-[11px] text-muted-foreground">{company.flywheel}</p>
                  </div>
                  <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-2.5">
                    <p className="text-[10px] font-bold text-purple-400 mb-0.5">Aha Moment</p>
                    <p className="text-[11px] italic text-purple-300">&quot;{company.ahamoment}&quot;</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground">Key Metric</p>
                    <p className="mt-0.5 text-xs font-bold text-blue-400">{company.keyMetric}</p>
                  </div>
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5">
                    <div className="flex items-start gap-1.5">
                      <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                      <p className="text-[10px] text-emerald-300">{company.lesson}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* PLG + Sales Hybrid */}
      {data.plgPlusSales && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.plgPlusSales.title}</h3>
          <p className="text-[11px] text-muted-foreground">{data.plgPlusSales.description}</p>
          <div className="space-y-0">
            {data.plgPlusSales.stages.map((phase: any, idx: number) => {
              const phaseColors = [
                { accent: "#3B82F6", border: "border-blue-500/30", text: "text-blue-400" },
                { accent: "#8B5CF6", border: "border-purple-500/30", text: "text-purple-400" },
                { accent: "#F97316", border: "border-orange-500/30", text: "text-orange-400" },
              ];
              const c = phaseColors[idx % phaseColors.length];
              return (
                <div key={phase.stage} className="relative">
                  {idx < data.plgPlusSales.stages.length - 1 && (
                    <div className="absolute left-6 top-full z-0 h-4 w-0.5" style={{ backgroundColor: c.accent + "30" }} />
                  )}
                  <div className="flex gap-4 pb-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold" style={{ backgroundColor: c.accent + "15", color: c.accent }}>
                        {idx + 1}
                      </div>
                    </div>
                    <Card className={`flex-1 ${c.border}`}>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className={`text-xs font-bold ${c.text}`}>{phase.stage}</p>
                          <Badge variant="outline" className="text-[10px]" style={{ borderColor: c.accent + "40", color: c.accent }}>
                            {phase.arrRange}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{phase.description}</p>
                        <div className="rounded-md bg-muted/50 p-2">
                          <p className="text-[10px] font-bold text-muted-foreground">フォーカス</p>
                          <p className="mt-0.5 text-[11px]">{phase.focus}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Vertical SaaS PLG */}
      {data.plgInVerticalSaas && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.plgInVerticalSaas.title}</h3>
          <p className="text-[11px] text-muted-foreground">{data.plgInVerticalSaas.description}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-red-500/20">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <p className="text-xs font-bold text-red-400">課題</p>
                </div>
                <div className="space-y-2">
                  {data.plgInVerticalSaas.challenges.map((challenge: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 rounded-md border border-red-500/10 bg-red-500/5 p-2">
                      <XCircle className="mt-0.5 h-3 w-3 shrink-0 text-red-400" />
                      <p className="text-[11px] text-muted-foreground">{challenge}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-emerald-500/20">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <p className="text-xs font-bold text-emerald-400">適用可能な要素</p>
                </div>
                <div className="space-y-2">
                  {data.plgInVerticalSaas.adaptableElements.map((element: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 rounded-md border border-emerald-500/10 bg-emerald-500/5 p-2">
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                      <p className="text-[11px] text-muted-foreground">{element}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
              <div>
                <p className="text-[10px] font-bold text-blue-400 mb-1">まとめ</p>
                <p className="text-[11px] text-muted-foreground">{data.plgInVerticalSaas.conclusion}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
