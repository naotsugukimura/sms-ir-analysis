"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Users,
  Activity,
  Layers,
  Gift,
  Clock,
  Monitor,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
  AlertTriangle,
  Target,
  Sparkles,
} from "lucide-react";

const MODEL_ICONS: Record<string, any> = {
  flatRate: DollarSign,
  perSeat: Users,
  usage: Activity,
  hybrid: Layers,
};

const ACQUISITION_ICONS: Record<string, any> = {
  freemium: Gift,
  freeTrial: Clock,
  demo: Monitor,
};

export function SaasPricing({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold">{data.title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{data.subtitle}</p>
      </div>

      {/* Pricing Models */}
      {data.pricingModels && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">
            {data.pricingModels.title}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {data.pricingModels.models.map((model: any) => {
              const Icon = MODEL_ICONS[model.key] || DollarSign;
              return (
                <Card key={model.key} className="overflow-hidden">
                  <div
                    className="px-5 py-3"
                    style={{ backgroundColor: model.color + "15" }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: model.color + "25", color: model.color }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">{model.name}</p>
                        <p className="text-[10px] text-muted-foreground">{model.nameEn}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <p className="text-[11px] text-muted-foreground">{model.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="mb-1 text-[10px] font-bold text-emerald-400">メリット</p>
                        {model.pros.map((p: string, i: number) => (
                          <div key={i} className="flex items-start gap-1.5 text-[10px]">
                            <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                            <span className="text-muted-foreground">{p}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] font-bold text-red-400">デメリット</p>
                        {model.cons.map((c: string, i: number) => (
                          <div key={i} className="flex items-start gap-1.5 text-[10px]">
                            <XCircle className="mt-0.5 h-3 w-3 shrink-0 text-red-400" />
                            <span className="text-muted-foreground">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">代表例</p>
                      <div className="flex flex-wrap gap-1">
                        {model.examples.map((ex: string) => (
                          <Badge
                            key={ex}
                            variant="outline"
                            className="text-[10px]"
                            style={{ borderColor: model.color + "40", color: model.color }}
                          >
                            {ex}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">適合パターン</p>
                      <p className="text-[11px] text-muted-foreground">{model.bestFor}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {data.pricingModels.kaipokeContext && (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-bold text-emerald-400 mb-1">カイポケの場合</p>
                  <p className="text-[11px] text-muted-foreground">{data.pricingModels.kaipokeContext}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Acquisition Models */}
      {data.acquisitionModels && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">
            {data.acquisitionModels.title}
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {data.acquisitionModels.models.map((model: any) => {
              const Icon = ACQUISITION_ICONS[model.key] || Gift;
              return (
                <Card key={model.key} className="overflow-hidden">
                  <div
                    className="px-5 py-3"
                    style={{ backgroundColor: model.color + "15" }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" style={{ color: model.color }} />
                      <p className="text-xs font-bold">{model.name}</p>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <p className="text-[11px] text-muted-foreground">{model.description}</p>
                    <div className="rounded-lg border p-2.5" style={{ borderColor: model.color + "30", backgroundColor: model.color + "08" }}>
                      <p className="text-[10px] font-bold" style={{ color: model.color }}>変換率ベンチマーク</p>
                      <p className="mt-0.5 font-mono text-sm font-bold" style={{ color: model.color }}>{model.conversionRate}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">最適なACV帯</p>
                      <Badge variant="outline" className="text-[10px]" style={{ borderColor: model.color + "40", color: model.color }}>
                        {model.bestAcvRange}
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
              );
            })}
          </div>
        </div>
      )}

      {/* Good/Better/Best Packaging */}
      {data.packaging && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.packaging.title}</h3>
          <p className="text-[11px] text-muted-foreground">{data.packaging.description}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {data.packaging.tiers.map((tier: any, idx: number) => {
              const tierColors = [
                { accent: "#6B7280", border: "border-gray-500/30" },
                { accent: "#3B82F6", border: "border-blue-500/30" },
                { accent: "#F59E0B", border: "border-amber-500/30" },
              ];
              const c = tierColors[idx % tierColors.length];
              return (
                <Card key={tier.name} className={`overflow-hidden ${c.border}`}>
                  <div className="px-5 py-3" style={{ backgroundColor: c.accent + "15" }}>
                    <p className="text-xs font-bold" style={{ color: c.accent }}>{tier.name}</p>
                    <p className="text-[10px] text-muted-foreground">{tier.nameJa}</p>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <p className="text-[11px] text-muted-foreground">{tier.purpose}</p>
                    <div>
                      <p className="mb-1 text-[10px] font-bold text-muted-foreground">含まれる機能</p>
                      {tier.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-start gap-1.5 text-[10px]">
                          <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0" style={{ color: c.accent }} />
                          <span className="text-muted-foreground">{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-md bg-muted/50 p-2">
                      <p className="text-[10px] font-bold text-muted-foreground">ターゲット</p>
                      <p className="mt-0.5 text-[11px]">{tier.target}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div>
            <p className="mb-2 text-[10px] font-bold text-muted-foreground">設計原則</p>
            <div className="grid gap-2 md:grid-cols-3">
              {data.packaging.principles.map((p: string, i: number) => (
                <div key={i} className="flex items-start gap-2 rounded-md border border-blue-500/10 bg-blue-500/5 p-2.5">
                  <Lightbulb className="mt-0.5 h-3 w-3 shrink-0 text-blue-400" />
                  <p className="text-[10px] text-muted-foreground">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Price Increase Strategy */}
      {data.priceIncrease && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.priceIncrease.title}</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {data.priceIncrease.strategies.map((strategy: any) => (
              <Card key={strategy.name}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold">{strategy.name}</p>
                    <Badge
                      variant="outline"
                      className="text-[10px]"
                      style={{
                        borderColor: strategy.risk === "低" ? "#10B98140" : strategy.risk === "中" ? "#F59E0B40" : "#EF444440",
                        color: strategy.risk === "低" ? "#10B981" : strategy.risk === "中" ? "#F59E0B" : "#EF4444",
                      }}
                    >
                      リスク: {strategy.risk}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{strategy.description}</p>
                  <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-2.5">
                    <p className="text-[10px] font-bold text-violet-400 mb-0.5">NRRへの影響</p>
                    <p className="text-[11px] text-violet-300">{strategy.nrrImpact}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold text-muted-foreground">例</p>
                    <p className="text-[10px] text-muted-foreground">{strategy.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {data.priceIncrease.grandfathering && (
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <div>
                  <p className="text-[10px] font-bold text-amber-400 mb-1">Grandfathering（既存顧客保護）</p>
                  <p className="text-[11px] text-muted-foreground">{data.priceIncrease.grandfathering}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pricing Methodology */}
      {data.methodology && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.methodology.title}</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {data.methodology.methods.map((method: any) => (
              <Card key={method.name} className="overflow-hidden">
                <div className="px-5 py-3" style={{ backgroundColor: method.color + "15" }}>
                  <p className="text-xs font-bold" style={{ color: method.color }}>{method.name}</p>
                  <p className="text-[10px] text-muted-foreground">{method.nameJa}</p>
                </div>
                <CardContent className="p-5 space-y-3">
                  <p className="text-[11px] text-muted-foreground">{method.description}</p>
                  <div className="rounded-md bg-muted/50 p-2">
                    <p className="font-mono text-[11px] font-bold" style={{ color: method.color }}>{method.formula}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold text-emerald-400">メリット</p>
                    <p className="text-[10px] text-muted-foreground">{method.advantage}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold text-red-400">注意点</p>
                    <p className="text-[10px] text-muted-foreground">{method.caveat}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {data.methodology.kaipokeContext && (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-bold text-emerald-400 mb-1">カイポケの価格戦略</p>
                  <p className="text-[11px] text-muted-foreground">{data.methodology.kaipokeContext}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
