"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Megaphone,
  Phone,
  Handshake,
  Heart,
  ArrowRight,
  TrendingUp,
  Target,
  CheckCircle2,
  Calculator,
} from "lucide-react";

interface FunnelStage {
  stage: string;
  goal: string;
  description: string;
  keyActivities: string[];
  conversionTarget: string;
  typicalKpis: string[];
  bestPractices: string[];
}

interface FunnelMathStep {
  stage: string;
  value: string;
  formula: string;
}

interface FunnelMath {
  title: string;
  description: string;
  example: {
    target: string;
    arpa: string;
    calculation: FunnelMathStep[];
    headcountImplication: Record<string, string>;
  };
}

interface FunnelData {
  title: string;
  description: string;
  stages: FunnelStage[];
  funnelMath: FunnelMath;
}

const STAGE_STYLES: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  Marketing: { color: "#3B82F6", icon: Megaphone },
  "IS（Inside Sales）": { color: "#F59E0B", icon: Phone },
  "FS（Field Sales）": { color: "#10B981", icon: Handshake },
  "CS（Customer Success）": { color: "#8B5CF6", icon: Heart },
};

export function SmFunnel({ data }: { data: FunnelData }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-400" />
          {data.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
      </div>

      {/* ファネルステージ */}
      <div className="space-y-3">
        {data.stages.map((stage, index) => {
          const style = STAGE_STYLES[stage.stage] || { color: "#6B7280", icon: Megaphone };
          const Icon = style.icon;

          return (
            <div key={stage.stage}>
              <Card
                className="border-l-4 transition-all"
                style={{ borderLeftColor: style.color }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: style.color + "15",
                        color: style.color,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-sm">{stage.stage}</CardTitle>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{stage.goal}</p>
                      <Badge
                        variant="outline"
                        className="text-[10px] mt-1"
                        style={{
                          borderColor: style.color + "40",
                          color: style.color,
                        }}
                      >
                        {stage.conversionTarget}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {/* 説明 */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {stage.description}
                  </p>

                  {/* 主な活動 */}
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                      主な活動
                    </span>
                    <ul className="space-y-1">
                      {stage.keyActivities.map((activity, i) => (
                        <li key={i} className="text-xs flex items-start gap-2">
                          <span
                            style={{ color: style.color }}
                            className="mt-0.5"
                          >
                            ▸
                          </span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* KPI */}
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground mb-1.5 block flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      KPI
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {stage.typicalKpis.map((kpi) => (
                        <div
                          key={kpi}
                          className="rounded-lg border border-border p-2"
                        >
                          <div
                            className="text-xs font-medium"
                            style={{ color: style.color }}
                          >
                            {kpi}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground mb-1.5 block flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      ベストプラクティス
                    </span>
                    <ul className="space-y-1">
                      {stage.bestPractices.map((bp, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="shrink-0 mt-1 h-1 w-1 rounded-full bg-green-400/60" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow connector between stages */}
              {index < data.stages.length - 1 && (
                <div className="flex items-center justify-center py-1">
                  <div className="flex items-center gap-1 text-muted-foreground/40">
                    <div className="h-4 w-px bg-muted-foreground/20" />
                    <ArrowRight className="h-3.5 w-3.5 rotate-90" />
                    <div className="h-4 w-px bg-muted-foreground/20" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ファネル試算 */}
      {data.funnelMath && (
        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calculator className="h-4 w-4 text-blue-400" />
              {data.funnelMath.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{data.funnelMath.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                目標: {data.funnelMath.example.target}
              </Badge>
              <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                ARPA: {data.funnelMath.example.arpa}
              </Badge>
            </div>

            <div className="space-y-2">
              {data.funnelMath.example.calculation.map((step) => (
                <div key={step.stage} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <span className="text-xs font-semibold">{step.stage}</span>
                    <p className="text-[10px] text-muted-foreground">{step.formula}</p>
                  </div>
                  <span className="text-sm font-bold text-blue-400">{step.value}</span>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-muted/30 border border-border p-3">
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">
                必要人員の目安
              </span>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(data.funnelMath.example.headcountImplication).map(
                  ([role, count]) => (
                    <div key={role} className="text-center">
                      <div className="text-xs text-muted-foreground">{role}</div>
                      <div className="text-sm font-bold text-blue-400">{count}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
