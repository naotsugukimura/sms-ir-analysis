"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, MessageCircle, Lightbulb } from "lucide-react";

interface WeekPlan {
  week: string;
  phase: string;
  goal: string;
  approach: string;
  script: any;
}

export function SpinTimeline({ plan }: { plan: WeekPlan[] }) {
  const [expandedWeek, setExpandedWeek] = useState<number>(0);

  const phaseColors: Record<string, string> = {
    "アポ取り": "bg-gray-500/20 text-gray-400 border-gray-500/30",
    "課題ヒアリング（SPIN：S/P）": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "課題深掘り + 示唆（SPIN：I/N）": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "無料体験・価値実感": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "クロージング": "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "契約後フォロー / 未契約フォロー": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">1ヶ月 商談スクリプト</h3>

      {plan.map((week, i) => {
        const isExpanded = expandedWeek === i;
        return (
          <Card
            key={i}
            className="cursor-pointer transition-all hover:border-blue-500/30"
            onClick={() => setExpandedWeek(isExpanded ? -1 : i)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={`text-[10px] ${phaseColors[week.phase] || ""}`}>
                      {week.phase}
                    </Badge>
                    <span className="text-xs font-mono text-muted-foreground">{week.week}</span>
                  </div>
                  <CardTitle className="text-sm">{week.goal}</CardTitle>
                  <p className="text-xs text-muted-foreground">{week.approach}</p>
                </div>
                {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </div>
            </CardHeader>

            {isExpanded && (
              <CardContent className="space-y-4 pt-0" onClick={(e) => e.stopPropagation()}>
                {/* Render script content based on week type */}
                {week.script.opening && (
                  <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3">
                    <p className="text-[10px] font-medium text-blue-400 mb-1">
                      <MessageCircle className="inline h-3 w-3 mr-1" />オープニング
                    </p>
                    <p className="text-xs italic">&ldquo;{week.script.opening}&rdquo;</p>
                  </div>
                )}

                {week.script.situation && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-blue-400">S（状況質問）</p>
                    {week.script.situation.map((q: string, j: number) => (
                      <div key={j} className="rounded-lg border border-border p-2">
                        <p className="text-xs">&ldquo;{q}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                )}

                {week.script.situationQuestions && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-blue-400">S（状況質問）</p>
                    {week.script.situationQuestions.map((q: any, j: number) => (
                      <div key={j} className="rounded-lg border border-border p-3 space-y-1">
                        <p className="text-xs font-medium">&ldquo;{q.question}&rdquo;</p>
                        <p className="text-[10px] text-muted-foreground">意図: {q.intent}</p>
                        {q.followUp && <p className="text-[10px] text-blue-400">→ 深掘り: &ldquo;{q.followUp}&rdquo;</p>}
                      </div>
                    ))}
                  </div>
                )}

                {week.script.problemQuestions && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-orange-400">P（問題質問）</p>
                    {week.script.problemQuestions.map((q: any, j: number) => (
                      <div key={j} className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3 space-y-1">
                        <p className="text-xs font-medium">&ldquo;{q.question}&rdquo;</p>
                        <p className="text-[10px] text-muted-foreground">意図: {q.intent}</p>
                        {q.expectedAnswer && <p className="text-[10px] text-orange-400">想定回答: {q.expectedAnswer}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {week.script.implicationQuestions && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-red-400">I（示唆質問）</p>
                    {week.script.implicationQuestions.map((q: any, j: number) => (
                      <div key={j} className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 space-y-1">
                        <p className="text-xs font-medium">&ldquo;{q.question}&rdquo;</p>
                        <p className="text-[10px] text-muted-foreground">意図: {q.intent}</p>
                        {q.guide && <p className="text-[10px] text-red-400">ガイド: {q.guide}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {week.script.needPayoffQuestions && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-emerald-400">N（解決質問）</p>
                    {week.script.needPayoffQuestions.map((q: any, j: number) => (
                      <div key={j} className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-1">
                        <p className="text-xs font-medium">&ldquo;{q.question}&rdquo;</p>
                        <p className="text-[10px] text-muted-foreground">意図: {q.intent}</p>
                        {q.guide && <p className="text-[10px] text-emerald-400">ガイド: {q.guide}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {week.script.closeToTrial && (
                  <div className="rounded-lg bg-pink-500/5 border border-pink-500/20 p-3">
                    <p className="text-[10px] font-medium text-pink-400 mb-1">🎯 無料体験へのクロージング</p>
                    <p className="text-xs italic">&ldquo;{week.script.closeToTrial}&rdquo;</p>
                  </div>
                )}

                {week.script.bridge && (
                  <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                    <p className="text-[10px] font-medium text-emerald-400 mb-1">ブリッジ（アポ獲得）</p>
                    <p className="text-xs italic">&ldquo;{week.script.bridge}&rdquo;</p>
                  </div>
                )}

                {week.script.kickoff && (
                  <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                    <p className="text-[10px] font-medium text-emerald-400 mb-1">キックオフ</p>
                    <p className="text-xs italic">&ldquo;{week.script.kickoff}&rdquo;</p>
                  </div>
                )}

                {week.script.week1Focus && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium">導入スケジュール</p>
                    {week.script.week1Focus.map((item: any, j: number) => (
                      <div key={j} className="flex gap-3 rounded-lg border border-border p-2">
                        <Badge variant="secondary" className="text-[10px] shrink-0">{item.day}</Badge>
                        <div>
                          <p className="text-xs font-medium">{item.action}</p>
                          <p className="text-[10px] text-muted-foreground">{item.support}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {week.script.checkInCall && (
                  <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3">
                    <p className="text-[10px] font-medium text-blue-400 mb-1">チェックインコール</p>
                    <p className="text-xs italic">&ldquo;{week.script.checkInCall}&rdquo;</p>
                  </div>
                )}

                {week.script.reviewQuestions && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium">レビュー質問</p>
                    {week.script.reviewQuestions.map((q: string, j: number) => (
                      <div key={j} className="rounded-lg border border-border p-2">
                        <p className="text-xs">{q}</p>
                      </div>
                    ))}
                  </div>
                )}

                {week.script.closingScript && (
                  <div className="rounded-lg bg-pink-500/5 border border-pink-500/20 p-3">
                    <p className="text-[10px] font-medium text-pink-400 mb-1">🎯 クロージング</p>
                    <p className="text-xs italic">&ldquo;{week.script.closingScript}&rdquo;</p>
                  </div>
                )}

                {week.script.objectionHandling && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-orange-400">反論処理</p>
                    {week.script.objectionHandling.map((obj: any, j: number) => (
                      <div key={j} className="rounded-lg border border-orange-500/20 p-3 space-y-1">
                        <p className="text-xs font-medium text-orange-400">&ldquo;{obj.objection}&rdquo;</p>
                        <p className="text-xs">→ {obj.response}</p>
                      </div>
                    ))}
                  </div>
                )}

                {week.script.contractedFollowUp && (
                  <div className="space-y-2">
                    <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                      <p className="text-[10px] font-medium text-emerald-400 mb-1">契約済みフォロー</p>
                      <p className="text-xs">{week.script.contractedFollowUp}</p>
                    </div>
                    <div className="rounded-lg bg-orange-500/5 border border-orange-500/20 p-3">
                      <p className="text-[10px] font-medium text-orange-400 mb-1">未契約フォロー</p>
                      <p className="text-xs">{week.script.notContractedFollowUp}</p>
                    </div>
                  </div>
                )}

                {/* Tips */}
                {week.script.tips && (
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-[10px] font-medium text-muted-foreground mb-1">
                      <Lightbulb className="inline h-3 w-3 mr-1" />Tips
                    </p>
                    <ul className="space-y-1">
                      {week.script.tips.map((tip: string, j: number) => (
                        <li key={j} className="text-[10px] text-muted-foreground">• {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
