"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GitBranch,
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  Wrench,
  FileOutput,
  ListChecks,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

interface Phase {
  id: number;
  name: string;
  englishName: string;
  duration: string;
  owner: string;
  description: string;
  activities: string[];
  outputs: string[];
  tools: string[];
  structure?: Record<string, unknown>;
  elements?: Array<{ symbol: string; name: string; description: string }>;
  sections?: Array<{ name: string; content: string }>;
  practices?: Array<{ name: string; detail: string }>;
  strategies?: Array<{ name: string; description: string; risk: string }>;
  bestPractices?: string[];
  antiPatterns?: string[];
  gateConditions?: string[];
}

interface FlowData {
  title: string;
  description: string;
  phases: Phase[];
}

const phaseColors: Record<number, string> = {
  1: "border-l-violet-500",
  2: "border-l-blue-500",
  3: "border-l-cyan-500",
  4: "border-l-teal-500",
  5: "border-l-emerald-500",
  6: "border-l-amber-500",
  7: "border-l-orange-500",
  8: "border-l-red-500",
  9: "border-l-pink-500",
};

export function DevelopmentFlow({ data }: { data: FlowData }) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-cyan-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-cyan-400" />
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{data.description}</p>

          {/* フロー概要バー */}
          <div className="mt-4 flex items-center gap-1 overflow-x-auto pb-2">
            {data.phases.map((phase, i) => (
              <button
                key={phase.id}
                onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                  expandedPhase === phase.id
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <span className="font-bold">{phase.id}</span>
                <span>{phase.name}</span>
                {i < data.phases.length - 1 && (
                  <span className="ml-1 text-muted-foreground">→</span>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* フェーズ詳細 */}
      <div className="space-y-3">
        {data.phases.map((phase) => {
          const isExpanded = expandedPhase === phase.id;
          const borderColor = phaseColors[phase.id] || "border-l-border";

          return (
            <Card key={phase.id} className={`border-l-4 ${borderColor}`}>
              <button
                className="w-full text-left"
                onClick={() =>
                  setExpandedPhase(isExpanded ? null : phase.id)
                }
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold">
                        {phase.id}
                      </span>
                      <div>
                        <div>{phase.name}</div>
                        <div className="text-xs text-muted-foreground font-normal">
                          {phase.englishName}
                        </div>
                      </div>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        {phase.duration}
                      </Badge>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </button>

              {isExpanded && (
                <CardContent className="space-y-4 pt-0">
                  {/* オーナー & 説明 */}
                  <div className="rounded-lg bg-background/50 p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-cyan-400" />
                      <span className="text-xs font-semibold text-muted-foreground">担当</span>
                      <Badge variant="secondary" className="text-xs">{phase.owner}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </div>

                  {/* アクティビティ */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ListChecks className="h-3.5 w-3.5 text-cyan-400" />
                      <span className="text-xs font-semibold text-muted-foreground">主要アクティビティ</span>
                    </div>
                    <ul className="space-y-1.5">
                      {phase.activities.map((activity, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">▸</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* BPMN要素（Phase 4） */}
                  {phase.elements && (
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground mb-2 block">
                        BPMN 2.0 基本要素
                      </span>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {phase.elements.map((el) => (
                          <div key={el.name} className="rounded-lg border border-border p-2 text-center">
                            <div className="text-2xl mb-1">{el.symbol}</div>
                            <div className="text-xs font-semibold">{el.name}</div>
                            <div className="text-xs text-muted-foreground">{el.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PRDセクション（Phase 5） */}
                  {phase.sections && (
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground mb-2 block">
                        PRD 構成セクション
                      </span>
                      <div className="space-y-2">
                        {phase.sections.map((sec, i) => (
                          <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-2">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-cyan-500/20 text-xs font-bold text-cyan-400">
                              {i + 1}
                            </span>
                            <div>
                              <div className="text-xs font-semibold">{sec.name}</div>
                              <div className="text-xs text-muted-foreground">{sec.content}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 開発プラクティス（Phase 7） */}
                  {phase.practices && (
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground mb-2 block">
                        開発プラクティス
                      </span>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {phase.practices.map((p) => (
                          <div key={p.name} className="rounded-lg border border-border p-2">
                            <div className="text-xs font-semibold">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{p.detail}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* リリース戦略（Phase 9） */}
                  {phase.strategies && (
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground mb-2 block">
                        リリース戦略
                      </span>
                      <div className="space-y-2">
                        {phase.strategies.map((s) => (
                          <div key={s.name} className="flex items-center justify-between rounded-lg border border-border p-2">
                            <div>
                              <div className="text-xs font-semibold">{s.name}</div>
                              <div className="text-xs text-muted-foreground">{s.description}</div>
                            </div>
                            <Badge
                              className={
                                s.risk === "最低"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-blue-500/20 text-blue-400"
                              }
                            >
                              リスク: {s.risk}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ベストプラクティス & アンチパターン */}
                  {(phase.bestPractices || phase.antiPatterns) && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {phase.bestPractices && (
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/10 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-xs font-semibold text-emerald-400">ベストプラクティス</span>
                          </div>
                          <ul className="space-y-1">
                            {phase.bestPractices.map((bp, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="shrink-0 mt-1 h-1 w-1 rounded-full bg-emerald-400/60" />
                                <span>{bp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {phase.antiPatterns && (
                        <div className="rounded-lg border border-red-500/20 bg-red-950/10 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                            <span className="text-xs font-semibold text-red-400">アンチパターン</span>
                          </div>
                          <ul className="space-y-1">
                            {phase.antiPatterns.map((ap, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="shrink-0 mt-1 h-1 w-1 rounded-full bg-red-400/60" />
                                <span>{ap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* フェーズゲート条件 */}
                  {phase.gateConditions && (
                    <div className="rounded-lg border border-amber-500/20 bg-amber-950/10 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-xs font-semibold text-amber-400">フェーズゲート条件（次フェーズへの移行基準）</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.gateConditions.map((gc, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-amber-500/30 text-amber-400">
                            {gc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* アウトプット & ツール */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileOutput className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs font-semibold text-muted-foreground">アウトプット</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.outputs.map((o) => (
                          <Badge key={o} className="bg-emerald-500/20 text-emerald-400 text-xs">
                            {o}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Wrench className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-xs font-semibold text-muted-foreground">ツール</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.tools.map((t) => (
                          <Badge key={t} variant="outline" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
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
