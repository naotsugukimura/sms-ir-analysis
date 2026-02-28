"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Brain,
  CheckCircle2,
  XCircle,
  Zap,
  Users,
  Target,
} from "lucide-react";

interface StageBenchmark {
  stage: string;
  arrRange: string;
  teamSize?: string;
  focusMetrics: string[];
  benchmarks: Record<string, string>;
  realChallenges?: string[];
  mindset?: string[];
  successPatterns?: string[];
  failurePatterns?: string[];
  keyActions?: string[];
}

interface StageBenchmarksData {
  title: string;
  stages: StageBenchmark[];
}

const STAGE_STYLES: Record<
  string,
  { bg: string; text: string; border: string; accent: string }
> = {
  Seed: {
    bg: "bg-gray-500/10",
    text: "text-gray-400",
    border: "border-gray-500/30",
    accent: "#6B7280",
  },
  "Series A": {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    accent: "#3B82F6",
  },
  "Series B": {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/30",
    accent: "#8B5CF6",
  },
  "Growth / Pre-IPO": {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/30",
    accent: "#F97316",
  },
  "Public / 上場後": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    accent: "#10B981",
  },
};

function SectionBlock({
  icon: Icon,
  title,
  items,
  color,
  variant,
}: {
  icon: any;
  title: string;
  items: string[];
  color: string;
  variant: "default" | "success" | "danger" | "warning" | "info";
}) {
  const variantStyles: Record<string, string> = {
    default: "bg-muted/50 border-border",
    success: "bg-emerald-500/5 border-emerald-500/20",
    danger: "bg-red-500/5 border-red-500/20",
    warning: "bg-amber-500/5 border-amber-500/20",
    info: "bg-blue-500/5 border-blue-500/20",
  };

  const iconColor: Record<string, string> = {
    default: "text-muted-foreground",
    success: "text-emerald-400",
    danger: "text-red-400",
    warning: "text-amber-400",
    info: "text-blue-400",
  };

  return (
    <div className={`rounded-lg border p-3 space-y-2 ${variantStyles[variant]}`}>
      <div className="flex items-center gap-2">
        <Icon className={`h-3.5 w-3.5 ${iconColor[variant]}`} />
        <p className={`text-xs font-bold ${iconColor[variant]}`}>{title}</p>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2"
          >
            <span className="shrink-0 mt-1 h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SaasStageBenchmarks({ data }: { data: StageBenchmarksData }) {
  const [expanded, setExpanded] = useState<string | null>("Seed");

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold">{data.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          各ステージで直面するリアルな課題、必要なマインドセット、成功・失敗パターンを深掘り。
        </p>
      </div>

      {data.stages.map((stage) => {
        const isExpanded = expanded === stage.stage;
        const style = STAGE_STYLES[stage.stage] || STAGE_STYLES["Seed"];

        return (
          <Card
            key={stage.stage}
            className="cursor-pointer transition-all"
            style={{
              borderColor: isExpanded ? style.accent + "60" : undefined,
            }}
            onClick={() =>
              setExpanded(isExpanded ? null : stage.stage)
            }
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold"
                    style={{
                      backgroundColor: style.accent + "15",
                      color: style.accent,
                    }}
                  >
                    {stage.stage === "Seed"
                      ? "S"
                      : stage.stage === "Series A"
                      ? "A"
                      : stage.stage === "Series B"
                      ? "B"
                      : stage.stage.startsWith("Growth")
                      ? "G"
                      : "P"}
                  </div>
                  <div>
                    <CardTitle className="text-sm">{stage.stage}</CardTitle>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="text-xs font-bold"
                        style={{ color: style.accent }}
                      >
                        {stage.arrRange}
                      </span>
                      {stage.teamSize && (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {stage.teamSize}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>

              {/* Collapsed: show focus metrics + key benchmarks */}
              {!isExpanded && (
                <div className="mt-2 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {stage.focusMetrics.map((fm) => (
                      <Badge
                        key={fm}
                        variant="outline"
                        className="text-[10px]"
                        style={{
                          borderColor: style.accent + "40",
                          color: style.accent,
                        }}
                      >
                        {fm}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-2">
                    {stage.realChallenges
                      ? stage.realChallenges[0]
                      : stage.benchmarks["重要なこと"]}
                  </p>
                </div>
              )}
            </CardHeader>

            {isExpanded && (
              <CardContent
                className="space-y-4 pt-0"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Focus Metrics */}
                <div className="flex flex-wrap gap-1.5">
                  <Target
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: style.accent }}
                  />
                  {stage.focusMetrics.map((fm) => (
                    <Badge
                      key={fm}
                      variant="outline"
                      className="text-[10px]"
                      style={{
                        borderColor: style.accent + "40",
                        color: style.accent,
                      }}
                    >
                      {fm}
                    </Badge>
                  ))}
                </div>

                {/* Benchmarks Table */}
                <div className="rounded-lg border border-border p-3">
                  <p
                    className="text-xs font-bold mb-2"
                    style={{ color: style.accent }}
                  >
                    KPIベンチマーク
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {Object.entries(stage.benchmarks).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-start justify-between gap-1 text-[11px]"
                      >
                        <span className="text-muted-foreground shrink-0">
                          {key}
                        </span>
                        <span className="text-right font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real Challenges */}
                {stage.realChallenges && stage.realChallenges.length > 0 && (
                  <SectionBlock
                    icon={AlertTriangle}
                    title="リアルな課題"
                    items={stage.realChallenges}
                    color={style.accent}
                    variant="danger"
                  />
                )}

                {/* Mindset */}
                {stage.mindset && stage.mindset.length > 0 && (
                  <SectionBlock
                    icon={Brain}
                    title="このフェーズで持つべきマインドセット"
                    items={stage.mindset}
                    color={style.accent}
                    variant="info"
                  />
                )}

                {/* Success Patterns */}
                {stage.successPatterns && stage.successPatterns.length > 0 && (
                  <SectionBlock
                    icon={CheckCircle2}
                    title="成功パターン"
                    items={stage.successPatterns}
                    color={style.accent}
                    variant="success"
                  />
                )}

                {/* Failure Patterns */}
                {stage.failurePatterns && stage.failurePatterns.length > 0 && (
                  <SectionBlock
                    icon={XCircle}
                    title="失敗パターン"
                    items={stage.failurePatterns}
                    color={style.accent}
                    variant="danger"
                  />
                )}

                {/* Key Actions */}
                {stage.keyActions && stage.keyActions.length > 0 && (
                  <SectionBlock
                    icon={Zap}
                    title="このフェーズでやるべきアクション"
                    items={stage.keyActions}
                    color={style.accent}
                    variant="warning"
                  />
                )}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
