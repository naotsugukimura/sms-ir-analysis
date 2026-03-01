"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Presentation,
  ShieldAlert,
  Calendar,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

export function FieldSalesSection({ data }: { data: any }) {
  const importanceColor: Record<string, string> = {
    "最重要": "bg-red-500/20 text-red-400",
    "必須": "bg-orange-500/20 text-orange-400",
    "重要": "bg-blue-500/20 text-blue-400",
    "状況次第": "bg-gray-500/20 text-gray-400",
    "有効": "bg-emerald-500/20 text-emerald-400",
  };

  const categoryColors: Record<string, string> = {
    "予算": "border-l-emerald-500",
    "競合": "border-l-blue-500",
    "タイミング": "border-l-orange-500",
    "社内承認": "border-l-purple-500",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-6 w-6 text-emerald-400" />
        <h2 className="text-xl font-bold">{data.title}</h2>
      </div>
      <p className="text-xs text-muted-foreground">{data.description}</p>

      {/* Phases */}
      <div className="space-y-4">
        {data.preConversion.phases.map((phase: any, i: number) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{phase.phase}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {phase.tasks.map((task: any, j: number) => (
                  <div key={j} className="flex items-start gap-3 rounded-lg border border-border p-3">
                    <Badge className={`shrink-0 text-[10px] ${importanceColor[task.importance] || ""}`}>
                      {task.importance}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-xs font-medium">{task.task}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conversion Rate */}
      <Card className="border-emerald-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">有料化率ベンチマーク</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm font-bold text-emerald-400">目標: {data.conversionRate.target}</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(data.conversionRate.benchmarks).map(([key, value]) => (
              <Badge key={key} variant="secondary" className="text-[10px]">
                {key}: {value as string}
              </Badge>
            ))}
          </div>
          <div>
            <p className="text-[10px] font-medium text-muted-foreground mb-1">改善レバー</p>
            <ul className="space-y-1">
              {data.conversionRate.improvementLevers.map((lever: string, i: number) => (
                <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                  <span className="text-emerald-400 shrink-0">▸</span>{lever}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Demo Script */}
      {data.demoScript && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Presentation className="h-5 w-5 text-emerald-400" />
              <CardTitle className="text-base">{data.demoScript.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.demoScript.description}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.demoScript.scenarios.map((scenario: any) => (
              <div key={scenario.feature} className="rounded-lg border border-l-4 border-l-emerald-500 border-border p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">{scenario.feature}</span>
                  <Badge variant="outline" className="text-[10px]">{scenario.duration}</Badge>
                  <Badge className={`text-[10px] ${scenario.impact === "最大" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
                    インパクト: {scenario.impact}
                  </Badge>
                </div>
                <ol className="space-y-1">
                  {scenario.flow.map((step: string, i: number) => (
                    <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-2">
                      <span className="text-emerald-400 font-mono shrink-0">{i + 1}.</span>{step}
                    </li>
                  ))}
                </ol>
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-2">
                  <span className="text-[10px] font-medium text-emerald-400">キルフレーズ: </span>
                  <span className="text-[10px] text-muted-foreground italic">{scenario.killPhrase}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Objection Handling */}
      {data.objectionHandling && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-emerald-400" />
              <CardTitle className="text-base">{data.objectionHandling.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.objectionHandling.description}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.objectionHandling.patterns.map((pattern: any) => (
              <div key={pattern.category} className={`rounded-lg border border-l-4 border-border p-3 space-y-2 ${categoryColors[pattern.category] || "border-l-gray-500"}`}>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">{pattern.category}</Badge>
                  <span className="text-xs font-medium">「{pattern.objection}」</span>
                </div>
                <ul className="space-y-1">
                  {pattern.responses.map((resp: string, i: number) => (
                    <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                      <span className="text-emerald-400 shrink-0">▸</span>{resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Weekly Workflow */}
      {data.weeklyWorkflow && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-400" />
              <CardTitle className="text-base">{data.weeklyWorkflow.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.weeklyWorkflow.schedule.map((day: any) => (
                <div key={day.day} className="flex gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-12 items-center justify-center rounded-md bg-emerald-500/10 text-xs font-bold text-emerald-400 shrink-0">
                    {day.day}
                  </div>
                  <ul className="space-y-0.5 flex-1">
                    {day.tasks.map((task: string, i: number) => (
                      <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                        <span className="text-emerald-400 shrink-0">▸</span>{task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Strategy */}
      {data.pricingStrategy && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-400" />
              <CardTitle className="text-base">{data.pricingStrategy.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.pricingStrategy.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-[10px] font-semibold text-muted-foreground">基本原則:</span>
              <ul className="mt-1 space-y-1">
                {data.pricingStrategy.principles.map((p: string, i: number) => (
                  <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                    <span className="text-emerald-400 shrink-0">▸</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-muted-foreground">条件</th>
                    <th className="text-center p-2 text-muted-foreground">割引</th>
                    <th className="text-center p-2 text-muted-foreground">承認</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pricingStrategy.discountPolicy.map((policy: any) => (
                    <tr key={policy["条件"]} className="border-b border-border/50">
                      <td className="p-2 font-medium">{policy["条件"]}</td>
                      <td className="p-2 text-center text-emerald-400 font-medium">{policy["割引"]}</td>
                      <td className="p-2 text-center text-muted-foreground">{policy["承認"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Common Mistakes */}
      {data.commonMistakes && (
        <Card className="border-red-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              FSでよくある失敗
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {data.commonMistakes.map((mistake: string, i: number) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="shrink-0 mt-1 h-1 w-1 rounded-full bg-red-400/60" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
