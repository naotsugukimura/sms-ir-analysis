"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  FileText,
  Lightbulb,
  Sparkles,
  Calculator,
  BookOpen,
} from "lucide-react";

export function SaasFinancialStatements({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold">{data.title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{data.subtitle}</p>
      </div>

      {/* P&L Waterfall */}
      {data.plStructure && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">
            {data.plStructure.title}
          </h3>
          <p className="text-[11px] text-muted-foreground">
            {data.plStructure.description}
          </p>

          {/* Waterfall Visualization */}
          <div className="space-y-0">
            {data.plStructure.waterfall.map((row: any, idx: number) => {
              const isRevenue = idx === 0;
              const isGrossProfit = idx === 2;
              const isOperating = idx === data.plStructure.waterfall.length - 1;
              const isCost = !isRevenue && !isGrossProfit && !isOperating;

              let accent = "#3B82F6";
              if (isRevenue) accent = "#10B981";
              else if (isGrossProfit) accent = "#8B5CF6";
              else if (isOperating) accent = "#F59E0B";
              else if (isCost) accent = "#EF4444";

              return (
                <div key={row.item}>
                  <Card
                    className="overflow-hidden"
                    style={{ borderColor: accent + "20" }}
                  >
                    <div className="flex items-stretch">
                      {/* Left color bar */}
                      <div
                        className="w-1.5 shrink-0"
                        style={{ backgroundColor: accent }}
                      />
                      <div className="flex flex-1 flex-col gap-1 px-4 py-3 md:flex-row md:items-center md:gap-4">
                        <div className="flex items-center gap-2 md:w-56 md:shrink-0">
                          <p className="text-xs font-bold" style={{ color: accent }}>
                            {row.item}
                          </p>
                        </div>
                        <div className="md:w-24 md:shrink-0">
                          <Badge
                            variant="outline"
                            className="font-mono text-[10px]"
                            style={{ borderColor: accent + "40", color: accent }}
                          >
                            {row.typical}
                          </Badge>
                        </div>
                        <p className="flex-1 text-[10px] text-muted-foreground">
                          {row.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                  {idx < data.plStructure.waterfall.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* P&L Phases */}
          <div className="mt-4 space-y-2">
            <p className="text-[10px] font-bold text-muted-foreground">
              SaaS企業の成長フェーズ
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {data.plStructure.phases.map((phase: any) => (
                <Card
                  key={phase.name}
                  className="overflow-hidden"
                  style={{ borderColor: phase.color + "30" }}
                >
                  <div
                    className="px-5 py-3"
                    style={{ backgroundColor: phase.color + "15" }}
                  >
                    <p className="text-xs font-bold" style={{ color: phase.color }}>
                      {phase.name}
                    </p>
                  </div>
                  <CardContent className="p-5 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground">
                          売上規模
                        </p>
                        <p
                          className="mt-0.5 font-mono text-[11px] font-bold"
                          style={{ color: phase.color }}
                        >
                          {phase.revenue}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground">
                          営業利益率
                        </p>
                        <p
                          className="mt-0.5 font-mono text-[11px] font-bold"
                          style={{ color: phase.color }}
                        >
                          {phase.margin}
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {phase.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GAAP vs Non-GAAP */}
      {data.gaapVsNonGaap && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">
            {data.gaapVsNonGaap.title}
          </h3>
          <p className="text-[11px] text-muted-foreground">
            {data.gaapVsNonGaap.description}
          </p>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-2.5 text-left font-bold text-muted-foreground">
                        項目
                      </th>
                      <th className="px-4 py-2.5 text-left font-bold text-blue-400">
                        GAAP
                      </th>
                      <th className="px-4 py-2.5 text-left font-bold text-violet-400">
                        Non-GAAP
                      </th>
                      <th className="px-4 py-2.5 text-left font-bold text-muted-foreground">
                        影響
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.gaapVsNonGaap.differences.map((diff: any, i: number) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="px-4 py-2 font-medium">{diff.item}</td>
                        <td className="px-4 py-2 text-blue-400">{diff.gaap}</td>
                        <td className="px-4 py-2 text-violet-400">{diff.nonGaap}</td>
                        <td className="px-4 py-2 text-muted-foreground">{diff.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <div>
                <p className="text-[10px] font-bold text-amber-400 mb-1">
                  投資家の視点
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {data.gaapVsNonGaap.investorView}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deferred Revenue */}
      {data.deferredRevenue && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">
            {data.deferredRevenue.title}
          </h3>
          <p className="text-[11px] text-muted-foreground">
            {data.deferredRevenue.description}
          </p>
          <Card className="border-blue-500/20">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-400" />
                <p className="text-xs font-bold text-blue-400">具体例</p>
              </div>
              <div className="rounded-md border border-blue-500/20 bg-blue-500/5 p-3">
                <p className="text-[11px] text-muted-foreground">
                  {data.deferredRevenue.explanation}
                </p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                  なぜ重要か
                </p>
                {data.deferredRevenue.significance.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-1.5 text-[10px]">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-blue-400" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* FCF */}
      {data.fcf && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">{data.fcf.title}</h3>
          <p className="text-[11px] text-muted-foreground">{data.fcf.description}</p>

          {/* Formula */}
          <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-4 text-center">
            <p className="font-mono text-sm font-bold text-violet-400">
              {data.fcf.formula}
            </p>
          </div>

          {/* Why Important */}
          <Card>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-violet-400" />
                <p className="text-xs font-bold">なぜFCFが重要か</p>
              </div>
              {data.fcf.whyImportant.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-1.5 text-[10px]">
                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-violet-400" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Benchmarks Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-2.5 text-left font-bold text-muted-foreground">
                        ステージ
                      </th>
                      <th className="px-4 py-2.5 text-left font-bold text-violet-400">
                        FCF Margin
                      </th>
                      <th className="px-4 py-2.5 text-left font-bold text-muted-foreground">
                        備考
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.fcf.benchmarks.map((bench: any, i: number) => {
                      const colors = ["#EF4444", "#F59E0B", "#10B981"];
                      return (
                        <tr key={i} className="border-b border-border/50">
                          <td className="px-4 py-2 font-medium">{bench.stage}</td>
                          <td
                            className="px-4 py-2 font-mono font-bold"
                            style={{ color: colors[i] }}
                          >
                            {bench.fcfMargin}
                          </td>
                          <td className="px-4 py-2 text-muted-foreground">
                            {bench.note}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Revenue Recognition */}
      {data.revenueRecognition && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">
            {data.revenueRecognition.title}
          </h3>
          <p className="text-[11px] text-muted-foreground">
            {data.revenueRecognition.description}
          </p>

          {/* 5 Steps as numbered flow */}
          <div className="space-y-0">
            {data.revenueRecognition.steps.map((step: any, idx: number) => {
              const colors = [
                { accent: "#3B82F6", border: "border-blue-500/30" },
                { accent: "#8B5CF6", border: "border-purple-500/30" },
                { accent: "#F97316", border: "border-orange-500/30" },
                { accent: "#10B981", border: "border-emerald-500/30" },
                { accent: "#EF4444", border: "border-red-500/30" },
              ];
              const c = colors[idx % colors.length];
              return (
                <div key={step.step} className="relative">
                  {idx < data.revenueRecognition.steps.length - 1 && (
                    <div
                      className="absolute left-6 top-full z-0 h-4 w-0.5"
                      style={{ backgroundColor: c.accent + "30" }}
                    />
                  )}
                  <div className="flex gap-4 pb-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold"
                        style={{
                          backgroundColor: c.accent + "15",
                          color: c.accent,
                        }}
                      >
                        {step.step}
                      </div>
                    </div>
                    <Card className={`flex-1 ${c.border}`}>
                      <CardContent className="p-4 space-y-2">
                        <p className="text-xs font-bold" style={{ color: c.accent }}>
                          {step.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
