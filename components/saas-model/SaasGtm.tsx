"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Phone,
  Briefcase,
  Users,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Layers,
  Megaphone,
  Building2,
} from "lucide-react";

const MOTION_ICONS: Record<string, any> = {
  selfServe: Target,
  insideSales: Phone,
  fieldSales: Briefcase,
  channel: Users,
};

export function SaasGtm({ data }: { data: any }) {
  const [activeMotion, setActiveMotion] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold">{data.title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{data.subtitle}</p>
      </div>

      {/* GTM Motions */}
      {data.motions && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.motions.title}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {data.motions.items.map((motion: any) => {
              const Icon = MOTION_ICONS[motion.key] || Target;
              const isActive = activeMotion === motion.key;
              return (
                <Card
                  key={motion.key}
                  className={`cursor-pointer overflow-hidden transition-all ${isActive ? "ring-1" : ""}`}
                  style={isActive ? { borderColor: motion.color } : {}}
                  onClick={() => setActiveMotion(isActive ? null : motion.key)}
                >
                  <div className="px-5 py-3" style={{ backgroundColor: motion.color + "15" }}>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: motion.color + "25", color: motion.color }}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold" style={{ color: motion.color }}>{motion.name}</p>
                        <p className="text-[10px] text-muted-foreground">{motion.nameJa}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <p className="text-[11px] text-muted-foreground">{motion.description}</p>
                    <div className="rounded-md bg-muted/50 p-2">
                      <p className="text-[10px] font-bold text-muted-foreground">最適ACV帯</p>
                      <p className="mt-0.5 font-mono text-xs font-bold" style={{ color: motion.color }}>{motion.acvRange}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground">セールスサイクル</p>
                        <p className="mt-0.5 text-[11px]">{motion.salesCycle}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground">CAC回収期間</p>
                        <p className="mt-0.5 text-[11px]">{motion.cacPayback}</p>
                      </div>
                    </div>
                    {isActive && (
                      <div className="space-y-2 border-t border-border/50 pt-3">
                        <div>
                          <p className="mb-1 text-[10px] font-bold text-emerald-400">適している場合</p>
                          {motion.bestFor.map((b: string, i: number) => (
                            <div key={i} className="flex items-start gap-1.5 text-[10px]">
                              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                              <span className="text-muted-foreground">{b}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="mb-1 text-[10px] font-bold text-muted-foreground">代表例</p>
                          <div className="flex flex-wrap gap-1">
                            {motion.examples.map((ex: string) => (
                              <Badge key={ex} variant="outline" className="text-[10px]" style={{ borderColor: motion.color + "40", color: motion.color }}>
                                {ex}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* GTM Fit Framework */}
      {data.gtmFit && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.gtmFit.title}</h3>
          <p className="text-[11px] text-muted-foreground">{data.gtmFit.description}</p>
          <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
            {data.gtmFit.stages.map((stage: any, idx: number) => {
              const colors = [
                { accent: "#3B82F6", border: "border-blue-500/30" },
                { accent: "#8B5CF6", border: "border-purple-500/30" },
                { accent: "#F97316", border: "border-orange-500/30" },
                { accent: "#10B981", border: "border-emerald-500/30" },
              ];
              const c = colors[idx % colors.length];
              return (
                <div key={stage.name} className="flex flex-1 items-stretch gap-2">
                  <Card className={`flex-1 ${c.border}`}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold" style={{ backgroundColor: c.accent + "20", color: c.accent }}>
                          {idx + 1}
                        </div>
                        <p className="text-xs font-bold" style={{ color: c.accent }}>{stage.name}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{stage.description}</p>
                      <div>
                        <p className="mb-1 text-[10px] font-bold text-muted-foreground">判定基準</p>
                        {stage.criteria.map((cr: string, i: number) => (
                          <div key={i} className="flex items-start gap-1.5 text-[10px]">
                            <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0" style={{ color: c.accent }} />
                            <span className="text-muted-foreground">{cr}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  {idx < data.gtmFit.stages.length - 1 && (
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

      {/* Land & Expand */}
      {data.landAndExpand && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.landAndExpand.title}</h3>
          <p className="text-[11px] text-muted-foreground">{data.landAndExpand.description}</p>
          <div className="space-y-0">
            {data.landAndExpand.phases.map((phase: any, idx: number) => {
              const colors = [
                { accent: "#3B82F6", border: "border-blue-500/30" },
                { accent: "#8B5CF6", border: "border-purple-500/30" },
                { accent: "#10B981", border: "border-emerald-500/30" },
              ];
              const c = colors[idx % colors.length];
              return (
                <div key={phase.name} className="relative">
                  {idx < data.landAndExpand.phases.length - 1 && (
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
                        <p className="text-xs font-bold" style={{ color: c.accent }}>{phase.name}</p>
                        <p className="text-[11px] text-muted-foreground">{phase.description}</p>
                        <div>
                          <p className="mb-1 text-[10px] font-bold text-muted-foreground">プレイブック</p>
                          {phase.playbook.map((p: string, i: number) => (
                            <div key={i} className="flex items-start gap-1.5 text-[10px]">
                              <ArrowRight className="mt-0.5 h-3 w-3 shrink-0" style={{ color: c.accent }} />
                              <span className="text-muted-foreground">{p}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
          {data.landAndExpand.kaipokeContext && (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-bold text-emerald-400 mb-1">カイポケのLand & Expand</p>
                  <p className="text-[11px] text-muted-foreground">{data.landAndExpand.kaipokeContext}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Channel Partnership */}
      {data.channelPartnership && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.channelPartnership.title}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {data.channelPartnership.types.map((type: any) => (
              <Card key={type.name}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" style={{ color: type.color }} />
                    <div>
                      <p className="text-xs font-bold">{type.name}</p>
                      <p className="text-[10px] text-muted-foreground">{type.nameJa}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{type.description}</p>
                  <div>
                    <p className="mb-1 text-[10px] font-bold text-muted-foreground">代表例</p>
                    <div className="flex flex-wrap gap-1">
                      {type.examples.map((ex: string) => (
                        <Badge key={ex} variant="outline" className="text-[10px]">{ex}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {data.channelPartnership.welfareChannels && (
            <Card className="border-emerald-500/20">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <p className="text-xs font-bold text-emerald-400">福祉業界のチャネル</p>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  {data.channelPartnership.welfareChannels.map((ch: any, i: number) => (
                    <div key={i} className="flex items-start gap-2 rounded-md border border-emerald-500/10 bg-emerald-500/5 p-2.5">
                      <Building2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                      <div>
                        <p className="text-[10px] font-bold">{ch.name}</p>
                        <p className="text-[10px] text-muted-foreground">{ch.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ABM */}
      {data.abm && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.abm.title}</h3>
          <p className="text-[11px] text-muted-foreground">{data.abm.description}</p>
          <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
            {data.abm.steps.map((step: any, idx: number) => {
              const colors = ["#3B82F6", "#8B5CF6", "#F97316", "#10B981"];
              const accent = colors[idx % colors.length];
              return (
                <div key={step.name} className="flex flex-1 items-stretch gap-2">
                  <Card className="flex-1">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold" style={{ backgroundColor: accent + "20", color: accent }}>
                          {idx + 1}
                        </div>
                        <p className="text-xs font-bold" style={{ color: accent }}>{step.name}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{step.description}</p>
                      <div>
                        <p className="mb-1 text-[10px] font-bold text-muted-foreground">施策</p>
                        {step.tactics.map((t: string, i: number) => (
                          <div key={i} className="flex items-start gap-1.5 text-[10px]">
                            <span className="mt-0.5" style={{ color: accent }}>•</span>
                            <span className="text-muted-foreground">{t}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  {idx < data.abm.steps.length - 1 && (
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

      {/* Failure Patterns */}
      {data.failurePatterns && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.failurePatterns.title}</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {data.failurePatterns.patterns.map((pattern: any, i: number) => (
              <Card key={i} className="border-red-500/10">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                    <p className="text-xs font-bold text-red-400">{pattern.name}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{pattern.description}</p>
                  <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 p-2">
                    <p className="text-[10px] font-bold text-emerald-400 mb-0.5">対処法</p>
                    <p className="text-[10px] text-muted-foreground">{pattern.remedy}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
