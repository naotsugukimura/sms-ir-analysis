"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, AlertTriangle, Calculator } from "lucide-react";

interface ChurnSimulationData {
  title: string;
  description: string;
  welfareInsight: string;
}

const CHURN_RATES = [0.01, 0.02, 0.03, 0.05, 0.08, 0.10] as const;

const CHURN_INSIGHTS: Record<number, string> = {
  0.01: "月1%解約 → 年間残存率89% → 優良SaaS水準",
  0.02: "月2%解約 → 年間残存率78% → 年間の22%が消える。100社で22社が離脱",
  0.03: "月3%解約 → 年間残存率69% → 約3分の1が消える。深刻な水準",
  0.05: "月5%解約 → 年間残存率54% → 半分近くが消える。事業継続に赤信号",
  0.08: "月8%解約 → 年間残存率37% → 3分の2が消える。SaaSとして破綻",
  0.10: "月10%解約 → 年間残存率28% → ほぼ全滅。ストック型の意味がない",
};

function getBarColor(remaining: number): string {
  if (remaining >= 80) return "bg-emerald-500";
  if (remaining >= 60) return "bg-green-500";
  if (remaining >= 45) return "bg-yellow-500";
  if (remaining >= 30) return "bg-orange-500";
  return "bg-red-500";
}

function getInsightSeverity(rate: number): string {
  if (rate <= 0.01) return "border-emerald-500/30 bg-emerald-500/5";
  if (rate <= 0.02) return "border-yellow-500/30 bg-yellow-500/5";
  if (rate <= 0.03) return "border-orange-500/30 bg-orange-500/5";
  return "border-red-500/30 bg-red-500/5";
}

function getInsightTextColor(rate: number): string {
  if (rate <= 0.01) return "text-emerald-400";
  if (rate <= 0.02) return "text-yellow-400";
  if (rate <= 0.03) return "text-orange-400";
  return "text-red-400";
}

export function ChurnSimulation({ data }: { data: ChurnSimulationData }) {
  const [selectedRate, setSelectedRate] = useState<number>(0.03);

  // Compute retention for each month (0..12)
  const months = Array.from({ length: 13 }, (_, i) => i);
  const retentionData = months.map((month) => {
    const remaining = Math.round(100 * Math.pow(1 - selectedRate, month));
    return { month, remaining };
  });

  const finalRemaining = retentionData[12].remaining;

  // NRR simulation data
  const nrrScenarios = [
    {
      nrr: 90,
      label: "NRR 90%",
      color: "bg-red-500",
      textColor: "text-red-400",
      values: [100, 90, 81, 72.9],
      description: "縮小",
    },
    {
      nrr: 100,
      label: "NRR 100%",
      color: "bg-gray-500",
      textColor: "text-gray-400",
      values: [100, 100, 100, 100],
      description: "横ばい",
    },
    {
      nrr: 120,
      label: "NRR 120%",
      color: "bg-emerald-500",
      textColor: "text-emerald-400",
      values: [100, 120, 144, 172.8],
      description: "成長",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-red-400" />
          {data.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{data.description}</p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* 1. Churn Rate Selector */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            月次解約率を選択
          </h3>
          <div className="flex flex-wrap gap-2">
            {CHURN_RATES.map((rate) => (
              <button
                key={rate}
                onClick={() => setSelectedRate(rate)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedRate === rate
                    ? "border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/20"
                    : "border-border bg-muted text-muted-foreground hover:border-red-500/50 hover:text-foreground"
                }`}
              >
                {Math.round(rate * 100)}%
              </button>
            ))}
          </div>
        </div>

        {/* 2. Visual Bar Chart - Customer Retention Over 12 Months */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">
            顧客残存シミュレーション（初期100社）
          </h3>
          <div className="flex items-end gap-1 sm:gap-2 h-48 sm:h-56">
            {retentionData.map(({ month, remaining }) => (
              <div
                key={month}
                className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
              >
                {/* Number label */}
                <span
                  className={`text-[10px] sm:text-xs font-bold transition-all duration-500 ${
                    month === 12 ? "text-red-400" : "text-muted-foreground"
                  }`}
                >
                  {remaining}
                </span>
                {/* Bar */}
                <div
                  className={`w-full rounded-t-sm transition-all duration-500 ease-out ${getBarColor(remaining)}`}
                  style={{
                    height: `${remaining}%`,
                    opacity: month === 0 ? 1 : 0.7 + (remaining / 100) * 0.3,
                  }}
                />
                {/* Month label */}
                <span className="text-[9px] sm:text-[10px] text-muted-foreground">
                  {month === 0 ? "開始" : `${month}M`}
                </span>
              </div>
            ))}
          </div>
          {/* Final result badge */}
          <div className="flex justify-center">
            <Badge
              variant="destructive"
              className="text-sm px-4 py-1"
            >
              12ヶ月後: 100社 → {finalRemaining}社（{100 - finalRemaining}社が解約）
            </Badge>
          </div>
        </div>

        {/* 3. Key Insight Panel */}
        <div
          className={`rounded-lg border p-4 transition-all duration-300 ${getInsightSeverity(selectedRate)}`}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              className={`h-5 w-5 shrink-0 mt-0.5 ${getInsightTextColor(selectedRate)}`}
            />
            <p
              className={`text-sm font-medium leading-relaxed ${getInsightTextColor(selectedRate)}`}
            >
              {CHURN_INSIGHTS[selectedRate]}
            </p>
          </div>
        </div>

        {/* 4. NRR Simulation Panel */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            NRRシミュレーション
          </h3>
          <p className="text-xs text-muted-foreground">
            NRRが100%超なら、新規顧客ゼロでも成長する
          </p>
          <div className="space-y-4">
            {nrrScenarios.map((scenario) => (
              <div key={scenario.nrr} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${scenario.textColor}`}
                  >
                    {scenario.label}（{scenario.description}）
                  </Badge>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  {scenario.values.map((value, i) => (
                    <div key={i} className="flex items-center gap-1 sm:gap-2">
                      {i > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                          →
                        </span>
                      )}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] text-muted-foreground">
                          {i === 0 ? "初年" : `${i}年後`}
                        </span>
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`rounded-sm transition-all duration-500 ${scenario.color}`}
                            style={{
                              width: "clamp(40px, 8vw, 80px)",
                              height: `${Math.max(
                                16,
                                (value / 172.8) * 80
                              )}px`,
                              opacity:
                                0.6 + (value / 172.8) * 0.4,
                            }}
                          />
                          <span className="text-[10px] sm:text-xs font-bold mt-1">
                            {value}M
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Welfare SaaS Insight */}
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
          <h3 className="text-sm font-medium text-emerald-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            福祉SaaSとの接続
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {data.welfareInsight}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
