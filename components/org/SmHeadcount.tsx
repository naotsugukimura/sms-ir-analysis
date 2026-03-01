"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Users,
  Target,
  AlertTriangle,
  Star,
} from "lucide-react";

interface HeadcountStage {
  stage: string;
  totalHeadcount: string;
  breakdown: Record<string, string>;
  focus: string;
  priorities: string[];
  mistakes: string[];
  keyHire: string;
}

interface HeadcountData {
  title: string;
  description: string;
  stages: HeadcountStage[];
}

const STAGE_STYLES: Record<
  string,
  { bg: string; text: string; border: string; accent: string; label: string }
> = {
  "Seed（0-1億ARR）": {
    bg: "bg-gray-500/10",
    text: "text-gray-400",
    border: "border-gray-500/30",
    accent: "#6B7280",
    label: "S",
  },
  "Series A（1-5億ARR）": {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    accent: "#3B82F6",
    label: "A",
  },
  "Series B（5-20億ARR）": {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/30",
    accent: "#8B5CF6",
    label: "B",
  },
  "Growth / Pre-IPO（20-100億ARR）": {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/30",
    accent: "#F97316",
    label: "G",
  },
};

const DEFAULT_STYLE = {
  bg: "bg-gray-500/10",
  text: "text-gray-400",
  border: "border-gray-500/30",
  accent: "#6B7280",
  label: "?",
};

export function SmHeadcount({ data }: { data: HeadcountData }) {
  const [expanded, setExpanded] = useState<string | null>(data.stages[0]?.stage ?? null);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-400" />
          {data.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
      </div>

      {data.stages.map((stage) => {
        const isExpanded = expanded === stage.stage;
        const style = STAGE_STYLES[stage.stage] || DEFAULT_STYLE;

        return (
          <Card
            key={stage.stage}
            className="cursor-pointer transition-all"
            style={{
              borderColor: isExpanded ? style.accent + "60" : undefined,
            }}
            onClick={() => setExpanded(isExpanded ? null : stage.stage)}
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
                    {style.label}
                  </div>
                  <div>
                    <CardTitle className="text-sm">{stage.stage}</CardTitle>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        S&M {stage.totalHeadcount}
                      </span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>

              {/* Collapsed preview */}
              {!isExpanded && (
                <div className="mt-2">
                  <p className="text-[10px] text-muted-foreground line-clamp-2">
                    {stage.focus}
                  </p>
                </div>
              )}
            </CardHeader>

            {isExpanded && (
              <CardContent
                className="space-y-4 pt-0"
                onClick={(e) => e.stopPropagation()}
              >
                {/* フォーカス */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {stage.focus}
                </p>

                {/* ファンクション別内訳 */}
                <div className="rounded-lg border border-border p-3">
                  <p
                    className="text-xs font-bold mb-2"
                    style={{ color: style.accent }}
                  >
                    ファンクション別人員
                  </p>
                  <div className="space-y-1.5">
                    {Object.entries(stage.breakdown).map(([func, count]) => (
                      <div
                        key={func}
                        className="flex items-center justify-between text-[11px]"
                      >
                        <span className="text-muted-foreground">{func}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 注力ポイント */}
                <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-3.5 w-3.5 text-blue-400" />
                    <p className="text-xs font-bold text-blue-400">
                      このフェーズの注力ポイント
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {stage.priorities.map((area, i) => (
                      <li
                        key={i}
                        className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="shrink-0 mt-1 h-1 w-1 rounded-full bg-blue-400/60" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* よくある失敗 */}
                <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                    <p className="text-xs font-bold text-red-400">
                      よくある失敗パターン
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {stage.mistakes.map((mistake, i) => (
                      <li
                        key={i}
                        className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="shrink-0 mt-1 h-1 w-1 rounded-full bg-red-400/60" />
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* キーハイヤー */}
                <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-3.5 w-3.5 text-amber-400" />
                    <p className="text-xs font-bold text-amber-400">
                      このフェーズのキーハイヤー
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {stage.keyHire}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
