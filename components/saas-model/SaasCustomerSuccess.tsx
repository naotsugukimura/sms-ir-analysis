"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Monitor,
  Headphones,
  Activity,
  CheckCircle2,
  XCircle,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BarChart3,
  Shield,
  RefreshCcw,
} from "lucide-react";

export function SaasCustomerSuccess({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold">{data.title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{data.subtitle}</p>
      </div>

      {/* CS 3-Tier Model */}
      {data.touchModel && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.touchModel.title}</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {data.touchModel.tiers.map((tier: any) => {
              const icons: Record<string, any> = { tech: Monitor, low: Headphones, high: Users };
              const Icon = icons[tier.key] || Monitor;
              return (
                <Card key={tier.key} className="overflow-hidden">
                  <div className="px-5 py-3" style={{ backgroundColor: tier.color + "15" }}>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: tier.color + "25", color: tier.color }}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold" style={{ color: tier.color }}>{tier.name}</p>
                        <p className="text-[10px] text-muted-foreground">{tier.nameJa}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <p className="text-[11px] text-muted-foreground">{tier.description}</p>
                    <div className="rounded-md bg-muted/50 p-2">
                      <p className="text-[10px] font-bold text-muted-foreground">対象ARR帯</p>
                      <p className="mt-0.5 font-mono text-xs font-bold" style={{ color: tier.color }}>{tier.arrRange}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground">CSM比率</p>
                      <p className="mt-0.5 text-[11px]">{tier.csmRatio}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">主な施策</p>
                      {tier.tactics.map((t: string, i: number) => (
                        <div key={i} className="flex items-start gap-1.5 text-[10px]">
                          <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0" style={{ color: tier.color }} />
                          <span className="text-muted-foreground">{t}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">ツール例</p>
                      <div className="flex flex-wrap gap-1">
                        {tier.tools.map((tool: string) => (
                          <Badge key={tool} variant="outline" className="text-[10px]">{tool}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {data.touchModel.kaipokeContext && (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-bold text-emerald-400 mb-1">カイポケの場合</p>
                  <p className="text-[11px] text-muted-foreground">{data.touchModel.kaipokeContext}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Health Score */}
      {data.healthScore && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.healthScore.title}</h3>
          <p className="text-[11px] text-muted-foreground">{data.healthScore.description}</p>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-2.5 text-left font-bold text-muted-foreground">スコア要素</th>
                      <th className="px-4 py-2.5 text-left font-bold text-muted-foreground">ウェイト</th>
                      <th className="px-4 py-2.5 text-left font-bold text-emerald-400">Green</th>
                      <th className="px-4 py-2.5 text-left font-bold text-amber-400">Yellow</th>
                      <th className="px-4 py-2.5 text-left font-bold text-red-400">Red</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.healthScore.factors.map((factor: any, i: number) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="px-4 py-2 font-medium">{factor.name}</td>
                        <td className="px-4 py-2 font-mono text-muted-foreground">{factor.weight}</td>
                        <td className="px-4 py-2 text-emerald-400">{factor.green}</td>
                        <td className="px-4 py-2 text-amber-400">{factor.yellow}</td>
                        <td className="px-4 py-2 text-red-400">{factor.red}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-2 md:grid-cols-3">
            {data.healthScore.actions.map((action: any) => {
              const colors: Record<string, string> = { green: "#10B981", yellow: "#F59E0B", red: "#EF4444" };
              const labels: Record<string, string> = { green: "Green → 維持・拡大", yellow: "Yellow → 注意・介入", red: "Red → 緊急対応" };
              return (
                <div key={action.level} className="rounded-lg border p-3" style={{ borderColor: colors[action.level] + "30", backgroundColor: colors[action.level] + "08" }}>
                  <p className="mb-1 text-[10px] font-bold" style={{ color: colors[action.level] }}>{labels[action.level]}</p>
                  {action.items.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-1.5 text-[10px]">
                      <span className="mt-0.5" style={{ color: colors[action.level] }}>•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Onboarding Playbook */}
      {data.onboarding && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.onboarding.title}</h3>
          <div className="space-y-0">
            {data.onboarding.milestones.map((milestone: any, idx: number) => {
              const colors = [
                { accent: "#3B82F6", border: "border-blue-500/30" },
                { accent: "#8B5CF6", border: "border-purple-500/30" },
                { accent: "#F97316", border: "border-orange-500/30" },
                { accent: "#10B981", border: "border-emerald-500/30" },
              ];
              const c = colors[idx % colors.length];
              return (
                <div key={milestone.phase} className="relative">
                  {idx < data.onboarding.milestones.length - 1 && (
                    <div className="absolute left-6 top-full z-0 h-4 w-0.5" style={{ backgroundColor: c.accent + "30" }} />
                  )}
                  <div className="flex gap-4 pb-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl text-xs font-bold" style={{ backgroundColor: c.accent + "15", color: c.accent }}>
                        {milestone.phase}
                      </div>
                    </div>
                    <Card className={`flex-1 ${c.border}`}>
                      <CardContent className="p-4 space-y-2">
                        <p className="text-xs font-bold" style={{ color: c.accent }}>{milestone.name}</p>
                        <p className="text-[11px] text-muted-foreground">{milestone.goal}</p>
                        <div>
                          <p className="mb-1 text-[10px] font-bold text-muted-foreground">アクション</p>
                          {milestone.actions.map((a: string, i: number) => (
                            <div key={i} className="flex items-start gap-1.5 text-[10px]">
                              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0" style={{ color: c.accent }} />
                              <span className="text-muted-foreground">{a}</span>
                            </div>
                          ))}
                        </div>
                        <Badge variant="outline" className="text-[10px]" style={{ borderColor: c.accent + "40", color: c.accent }}>
                          KPI: {milestone.kpi}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
          {data.onboarding.kaipokeContext && (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-bold text-emerald-400 mb-1">カイポケのオンボーディング</p>
                  <p className="text-[11px] text-muted-foreground">{data.onboarding.kaipokeContext}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Expansion Strategy */}
      {data.expansion && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.expansion.title}</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {data.expansion.strategies.map((strategy: any) => (
              <Card key={strategy.name} className="overflow-hidden">
                <div className="px-5 py-3" style={{ backgroundColor: strategy.color + "15" }}>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" style={{ color: strategy.color }} />
                    <p className="text-xs font-bold" style={{ color: strategy.color }}>{strategy.name}</p>
                  </div>
                </div>
                <CardContent className="p-5 space-y-3">
                  <p className="text-[11px] text-muted-foreground">{strategy.description}</p>
                  <div>
                    <p className="mb-1 text-[10px] font-bold text-muted-foreground">具体的施策</p>
                    {strategy.tactics.map((t: string, i: number) => (
                      <div key={i} className="flex items-start gap-1.5 text-[10px]">
                        <ArrowRight className="mt-0.5 h-3 w-3 shrink-0" style={{ color: strategy.color }} />
                        <span className="text-muted-foreground">{t}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-md bg-muted/50 p-2">
                    <p className="text-[10px] font-bold text-muted-foreground">NRRへの寄与</p>
                    <p className="mt-0.5 text-[11px] font-bold" style={{ color: strategy.color }}>{strategy.nrrContribution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {data.expansion.kaipokeContext && (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-bold text-emerald-400 mb-1">カイポケのExpansionパス</p>
                  <p className="text-[11px] text-muted-foreground">{data.expansion.kaipokeContext}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Churn Prevention */}
      {data.churnPrevention && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.churnPrevention.title}</h3>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-2.5 text-left font-bold text-muted-foreground">予兆シグナル</th>
                      <th className="px-4 py-2.5 text-left font-bold text-muted-foreground">検知方法</th>
                      <th className="px-4 py-2.5 text-left font-bold text-muted-foreground">介入アクション</th>
                      <th className="px-4 py-2.5 text-left font-bold text-muted-foreground">タイミング</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.churnPrevention.signals.map((signal: any, i: number) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-1.5">
                            <AlertTriangle className="h-3 w-3 text-amber-400" />
                            <span className="font-medium">{signal.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">{signal.detection}</td>
                        <td className="px-4 py-2 text-muted-foreground">{signal.intervention}</td>
                        <td className="px-4 py-2">
                          <Badge variant="outline" className="text-[10px]">{signal.timing}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          {data.churnPrevention.winBack && (
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <div className="flex items-start gap-2">
                <RefreshCcw className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <div>
                  <p className="text-[10px] font-bold text-blue-400 mb-1">Win-Back戦略</p>
                  <p className="text-[11px] text-muted-foreground">{data.churnPrevention.winBack}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CS Metrics */}
      {data.csMetrics && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.csMetrics.title}</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {data.csMetrics.metrics.map((metric: any) => (
              <Card key={metric.key}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-3.5 w-3.5 text-violet-400" />
                    <p className="text-xs font-bold">{metric.name}</p>
                  </div>
                  {metric.formula && (
                    <div className="rounded-md border border-violet-500/30 bg-violet-500/5 p-2">
                      <p className="font-mono text-[10px] font-bold text-violet-400">{metric.formula}</p>
                    </div>
                  )}
                  <p className="text-[10px] text-muted-foreground">{metric.description}</p>
                  <Badge variant="outline" className="text-[10px] border-violet-500/30 text-violet-400">
                    {metric.benchmark}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
