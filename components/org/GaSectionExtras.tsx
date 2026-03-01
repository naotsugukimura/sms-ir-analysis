"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface GaSectionExtrasProps {
  color: string;
  salaryRange?: Record<string, string>;
  headcountGuide?: string;
  bestPractices?: string[];
  commonMistakes?: string[];
}

export function GaSectionExtras({
  color,
  salaryRange,
  headcountGuide,
  bestPractices,
  commonMistakes,
}: GaSectionExtrasProps) {
  if (!salaryRange && !headcountGuide && !bestPractices && !commonMistakes) {
    return null;
  }

  return (
    <>
      {/* 年収レンジ & 人員ガイド */}
      {(salaryRange || headcountGuide) && (
        <div className="grid gap-4 md:grid-cols-2">
          {salaryRange && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="h-4 w-4" style={{ color }} />
                  年収レンジ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(salaryRange).map(([level, range]) => (
                    <div
                      key={level}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-muted-foreground">
                        {range.includes("（")
                          ? range.split("（")[1].replace("）", "")
                          : level}
                      </span>
                      <span
                        className="text-xs font-semibold"
                        style={{ color }}
                      >
                        {range.includes("（") ? range.split("（")[0] : range}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {headcountGuide && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" style={{ color }} />
                  成長フェーズ別人員
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {headcountGuide.split(", ").map((item) => {
                    const [stage, count] = item.split(": ");
                    return (
                      <div
                        key={stage}
                        className="flex items-center justify-between"
                      >
                        <span className="text-xs text-muted-foreground">
                          {stage}
                        </span>
                        <span
                          className="text-xs font-semibold"
                          style={{ color }}
                        >
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ベストプラクティス & よくある失敗 */}
      {(bestPractices || commonMistakes) && (
        <div className="grid gap-4 md:grid-cols-2">
          {bestPractices && (
            <Card className="border-emerald-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ベストプラクティス
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {bestPractices.map((bp, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground flex items-start gap-2"
                    >
                      <span className="shrink-0 mt-1 h-1 w-1 rounded-full bg-emerald-400/60" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          {commonMistakes && (
            <Card className="border-red-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  よくある失敗
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {commonMistakes.map((cm, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground flex items-start gap-2"
                    >
                      <span className="shrink-0 mt-1 h-1 w-1 rounded-full bg-red-400/60" />
                      <span>{cm}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  );
}
