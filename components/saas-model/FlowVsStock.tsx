"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  TrendingUp,
  Repeat,
  Layers,
  Lightbulb,
  Building2,
} from "lucide-react";

interface FlowVsStockData {
  title: string;
  flowType: { label: string; description: string; examples: string[] };
  stockType: { label: string; description: string; examples: string[] };
  insight: string;
  simulation: { month: number; flow: number; stock: number }[];
  kaipokeInsight: string;
}

export function FlowVsStock({ data }: { data: FlowVsStockData }) {
  // Bar heights for flow type (all same)
  const flowBarHeight = 40;
  // Bar heights for stock type (growing accumulation)
  const stockBarHeights = [20, 35, 48, 60, 70, 78];
  // Existing vs new split for stock bars (existing = previous month's total)
  const stockExisting = [0, 20, 35, 48, 60, 70];
  const stockNew = stockBarHeights.map((h, i) => h - stockExisting[i]);

  const maxBarHeight = 78;

  // Simulation data
  const simulation = data.simulation;
  const totalFlow = simulation.reduce((sum, s) => sum + s.flow, 0);
  const totalStock = simulation.reduce((sum, s) => sum + s.stock, 0);
  const multiplier = totalStock > 0 && totalFlow > 0 ? (totalStock / totalFlow).toFixed(1) : "N/A";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Layers className="h-5 w-5 text-emerald-400" />
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* ===== Side-by-side comparison ===== */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* --- Flow type --- */}
          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Repeat className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-bold">{data.flowType.label}</span>
              <Badge variant="secondary" className="ml-auto text-[10px]">
                売り切り
              </Badge>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              {data.flowType.description}
            </p>

            {/* Flow bar chart */}
            <div className="mb-3 flex items-end gap-2" style={{ height: maxBarHeight + 28 }}>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-gray-400/60 transition-all duration-500"
                    style={{ height: flowBarHeight }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {i + 1}月
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1 rounded-md bg-gray-500/10 px-2 py-1.5">
              <ArrowRight className="h-3 w-3 text-gray-400" />
              <span className="text-[11px] font-bold text-gray-400">
                毎月ゼロからスタート
              </span>
            </div>

            {/* Examples */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {data.flowType.examples.map((ex) => (
                <Badge
                  key={ex}
                  variant="outline"
                  className="text-[10px] text-muted-foreground"
                >
                  {ex}
                </Badge>
              ))}
            </div>
          </div>

          {/* --- Stock type --- */}
          <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-bold">{data.stockType.label}</span>
              <Badge className="ml-auto bg-emerald-500/20 text-[10px] text-emerald-400">
                SaaS
              </Badge>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              {data.stockType.description}
            </p>

            {/* Stock bar chart */}
            <div className="mb-3 flex items-end gap-2" style={{ height: maxBarHeight + 28 }}>
              {stockBarHeights.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="flex w-full flex-col justify-end overflow-hidden rounded-t-md transition-all duration-500"
                    style={{ height: h }}
                  >
                    {/* New segment (top) */}
                    <div
                      className="w-full shrink-0"
                      style={{
                        height: stockNew[i],
                        background:
                          "linear-gradient(180deg, #34d399 0%, #10b981 100%)",
                      }}
                    />
                    {/* Existing segment (bottom) */}
                    {stockExisting[i] > 0 && (
                      <div
                        className="w-full shrink-0"
                        style={{
                          height: stockExisting[i],
                          background:
                            "linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)",
                        }}
                      />
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {i + 1}月
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mb-2 flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-sm bg-emerald-400" />
                <span className="text-[10px] text-muted-foreground">新規</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
                <span className="text-[10px] text-muted-foreground">既存</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1.5">
              <TrendingUp className="h-3 w-3 text-emerald-400" />
              <span className="text-[11px] font-bold text-emerald-400">
                積み上がる
              </span>
            </div>

            {/* Examples */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {data.stockType.examples.map((ex) => (
                <Badge
                  key={ex}
                  variant="outline"
                  className="border-emerald-500/30 text-[10px] text-emerald-400"
                >
                  {ex}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Key insight box ===== */}
        <div className="rounded-xl border-2 border-amber-500/30 bg-amber-500/5 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-400">
              ストック型の本質
            </span>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {data.insight}
          </p>
        </div>

        {/* ===== Numbers that matter (simulation) ===== */}
        <div className="rounded-xl border border-border p-5">
          <h4 className="mb-4 text-xs font-bold text-muted-foreground">
            数字で見る違い
          </h4>

          {/* Simulation header */}
          <div className="mb-4 rounded-lg bg-muted/50 p-3">
            <p className="text-[11px] text-muted-foreground">
              例: 月10万円MRRの新規顧客を毎月5社獲得、解約率0%の場合
            </p>
          </div>

          {/* Monthly comparison table */}
          <div className="mb-4 overflow-x-auto">
            <div className="grid grid-cols-[auto_1fr_1fr] gap-x-4 gap-y-1 text-[11px]">
              {/* Header */}
              <div className="font-bold text-muted-foreground" />
              <div className="text-center font-bold text-gray-400">
                フロー型
              </div>
              <div className="text-center font-bold text-emerald-400">
                ストック型
              </div>

              {simulation.map((s) => (
                <>
                  <div
                    key={`label-${s.month}`}
                    className="font-mono text-muted-foreground"
                  >
                    {s.month}ヶ月目
                  </div>
                  <div
                    key={`flow-${s.month}`}
                    className="text-center font-mono text-gray-400"
                  >
                    {s.flow.toLocaleString()}万円
                  </div>
                  <div
                    key={`stock-${s.month}`}
                    className="text-center font-mono font-bold text-emerald-400"
                  >
                    {s.stock.toLocaleString()}万円
                  </div>
                </>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <p className="text-[10px] text-muted-foreground">
                フロー型 年間合計
              </p>
              <p className="mt-1 font-mono text-lg font-bold text-gray-400">
                {totalFlow.toLocaleString()}万円
              </p>
            </div>
            <div className="rounded-lg border-2 border-emerald-500/30 bg-emerald-500/5 p-3 text-center">
              <p className="text-[10px] text-emerald-400">
                ストック型 年間合計
              </p>
              <p className="mt-1 font-mono text-lg font-bold text-emerald-400">
                {totalStock.toLocaleString()}万円
              </p>
            </div>
          </div>

          {/* Multiplier callout */}
          <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 p-3">
            <ArrowRight className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-sm font-bold text-emerald-400">
              ストック型は{multiplier}倍の年間売上
            </span>
          </div>
        </div>

        {/* ===== カイポケの場合 ===== */}
        <div className="rounded-xl border border-blue-500/30 bg-[#1E3A5F]/20 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-300">
              カイポケの場合
            </span>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {data.kaipokeInsight}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
