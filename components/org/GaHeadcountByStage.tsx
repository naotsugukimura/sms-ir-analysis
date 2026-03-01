"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Target,
  Star,
  UserPlus,
} from "lucide-react";

interface Stage {
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
  stages: Stage[];
}

const stageColors = ["#8B5CF6", "#3B82F6", "#10B981", "#EF4444"];

export function GaHeadcountByStage({ data }: { data: HeadcountData }) {
  const [expandedStage, setExpandedStage] = useState<number>(0);

  return (
    <div className="space-y-6">
      <Card className="border-indigo-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-400" />
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{data.description}</p>

          {/* ステージ概要バー */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
            {data.stages.map((stage, i) => (
              <button
                key={stage.stage}
                onClick={() =>
                  setExpandedStage(expandedStage === i ? -1 : i)
                }
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap border ${
                  expandedStage === i
                    ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-400"
                    : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/60"
                }`}
              >
                <span className="font-bold">{stage.totalHeadcount}</span>
                <span>{stage.stage.split("（")[0]}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ステージ詳細 */}
      <div className="space-y-3">
        {data.stages.map((stage, i) => {
          const isExpanded = expandedStage === i;
          const color = stageColors[i] || "#6B7280";

          return (
            <Card
              key={stage.stage}
              className="border-l-4"
              style={{ borderLeftColor: color }}
            >
              <button
                className="w-full text-left"
                onClick={() => setExpandedStage(isExpanded ? -1 : i)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                        style={{ backgroundColor: color }}
                      >
                        {stage.totalHeadcount.split("-")[0]}+
                      </div>
                      <div>
                        <div>{stage.stage}</div>
                        <div className="text-xs text-muted-foreground font-normal">
                          合計: {stage.totalHeadcount}
                        </div>
                      </div>
                    </CardTitle>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
              </button>

              {isExpanded && (
                <CardContent className="space-y-4 pt-0">
                  {/* フォーカス */}
                  <p className="text-sm text-muted-foreground rounded-lg bg-muted/30 p-3">
                    {stage.focus}
                  </p>

                  {/* 部門別人員 */}
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground mb-2 block">
                      部門別人員構成
                    </span>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                      {Object.entries(stage.breakdown).map(([dept, count]) => (
                        <div
                          key={dept}
                          className="rounded-lg border border-border p-2 text-center"
                        >
                          <div className="text-xs text-muted-foreground">
                            {dept}
                          </div>
                          <div
                            className="text-sm font-bold mt-0.5"
                            style={{ color }}
                          >
                            {count.split("（")[0]}
                          </div>
                          {count.includes("（") && (
                            <div className="text-[10px] text-muted-foreground mt-0.5">
                              {count.split("（")[1].replace("）", "")}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 優先事項 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-3.5 w-3.5" style={{ color }} />
                      <span className="text-xs font-semibold text-muted-foreground">
                        優先事項
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {stage.priorities.map((p, j) => (
                        <li
                          key={j}
                          className="text-xs flex items-start gap-2"
                        >
                          <span style={{ color }} className="mt-0.5">
                            ▸
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* よくある失敗 */}
                  <div className="rounded-lg border border-red-500/20 bg-red-950/10 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                      <span className="text-xs font-semibold text-red-400">
                        よくある失敗
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {stage.mistakes.map((m, j) => (
                        <li
                          key={j}
                          className="text-xs text-muted-foreground flex items-start gap-2"
                        >
                          <span className="shrink-0 mt-1 h-1 w-1 rounded-full bg-red-400/60" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* キー採用 */}
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 p-3">
                    <UserPlus className="h-4 w-4 shrink-0" style={{ color }} />
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground">
                        キー採用:{" "}
                      </span>
                      <span className="text-xs" style={{ color }}>
                        {stage.keyHire}
                      </span>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
