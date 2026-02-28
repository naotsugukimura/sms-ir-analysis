"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  RefreshCw,
  TrendingDown,
  Calculator,
  Activity,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  X,
} from "lucide-react";

interface MetricNode {
  id: string;
  name: string;
  nameEn: string;
  formula?: string;
  whyImportant: string;
  benchmark: string;
  kaipokeEstimate?: string;
  color: string;
}

interface MetricsRelationData {
  title: string;
  description: string;
  metrics: MetricNode[];
  relationships: string[];
}

const categoryConfig: Record<
  string,
  {
    icon: React.ReactNode;
    label: string;
    borderClass: string;
    bgClass: string;
    textClass: string;
    badgeClass: string;
  }
> = {
  blue: {
    icon: <Users className="h-4 w-4" />,
    label: "顧客獲得",
    borderClass: "border-l-blue-500",
    bgClass: "bg-blue-500/5 hover:bg-blue-500/10",
    textClass: "text-blue-400",
    badgeClass: "border-blue-500/30 text-blue-400",
  },
  green: {
    icon: <RefreshCw className="h-4 w-4" />,
    label: "既存顧客維持",
    borderClass: "border-l-emerald-500",
    bgClass: "bg-emerald-500/5 hover:bg-emerald-500/10",
    textClass: "text-emerald-400",
    badgeClass: "border-emerald-500/30 text-emerald-400",
  },
  red: {
    icon: <TrendingDown className="h-4 w-4" />,
    label: "解約/縮小",
    borderClass: "border-l-red-500",
    bgClass: "bg-red-500/5 hover:bg-red-500/10",
    textClass: "text-red-400",
    badgeClass: "border-red-500/30 text-red-400",
  },
  purple: {
    icon: <Calculator className="h-4 w-4" />,
    label: "単位経済性",
    borderClass: "border-l-purple-500",
    bgClass: "bg-purple-500/5 hover:bg-purple-500/10",
    textClass: "text-purple-400",
    badgeClass: "border-purple-500/30 text-purple-400",
  },
  amber: {
    icon: <Activity className="h-4 w-4" />,
    label: "全体健全性",
    borderClass: "border-l-amber-500",
    bgClass: "bg-amber-500/5 hover:bg-amber-500/10",
    textClass: "text-amber-400",
    badgeClass: "border-amber-500/30 text-amber-400",
  },
};

const upstreamDownstream: Record<
  string,
  { upstream: string[]; downstream: string[] }
> = {
  mrr: {
    upstream: ["新規顧客獲得数", "ARPU (顧客単価)"],
    downstream: ["ARR", "NRR", "成長率"],
  },
  arr: {
    upstream: ["MRR"],
    downstream: ["Rule of 40", "企業価値評価"],
  },
  nrr: {
    upstream: ["MRR", "Expansion Revenue", "Churn/Contraction"],
    downstream: ["MRR成長率", "企業価値評価"],
  },
  churn: {
    upstream: ["顧客満足度", "プロダクト品質", "競合環境"],
    downstream: ["NRR", "LTV", "MRR"],
  },
  expansion: {
    upstream: ["アップセル施策", "クロスセル施策", "顧客成長"],
    downstream: ["NRR", "MRR成長"],
  },
  contraction: {
    upstream: ["ダウングレード", "利用量減少"],
    downstream: ["NRR", "MRR減少"],
  },
  ltv: {
    upstream: ["ARPU", "Churn Rate", "粗利率"],
    downstream: ["LTV/CAC比率", "投資判断"],
  },
  cac: {
    upstream: ["マーケティング費用", "セールス費用", "新規獲得数"],
    downstream: ["LTV/CAC比率", "CAC Payback Period"],
  },
  cac_payback: {
    upstream: ["CAC", "月次粗利"],
    downstream: ["キャッシュフロー", "投資回収判断"],
  },
  rule_of_40: {
    upstream: ["ARR成長率", "営業利益率"],
    downstream: ["企業価値評価", "IPO適格性"],
  },
};

const insights = [
  {
    text: "MRRが成長してもChurn Rateが高いと、バケツの穴から水が漏れるのと同じ",
    related: ["mrr", "churn"],
  },
  {
    text: "NRR > 100% は『新規獲得ゼロでも売上が伸びる』状態",
    related: ["nrr"],
  },
  {
    text: "LTV/CAC > 3x は投資効率の目安。1顧客の生涯価値がコストの3倍以上あるべき",
    related: ["ltv", "cac"],
  },
  {
    text: "Rule of 40は成長率+利益率。成長期は成長率で、安定期は利益率で稼ぐ",
    related: ["rule_of_40"],
  },
];

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="h-6 w-px bg-muted-foreground/30" />
      <ArrowDown className="h-4 w-4 text-muted-foreground/50" />
      {label && (
        <span className="text-[10px] text-muted-foreground mt-0.5">
          {label}
        </span>
      )}
    </div>
  );
}

function BranchArrows() {
  return (
    <div className="flex items-center justify-center gap-8 py-1">
      <div className="flex items-center gap-1 text-emerald-400">
        <ArrowUpRight className="h-3.5 w-3.5" />
        <span className="text-[10px]">Expansion</span>
      </div>
      <div className="flex items-center gap-1 text-red-400">
        <ArrowDownRight className="h-3.5 w-3.5" />
        <span className="text-[10px]">Contraction</span>
      </div>
    </div>
  );
}

export function MetricsRelationMap({
  data,
}: {
  data: MetricsRelationData;
}) {
  const [selectedMetricId, setSelectedMetricId] = useState<string | null>(null);
  const [showInsights, setShowInsights] = useState(true);

  const selectedMetric = data.metrics.find((m) => m.id === selectedMetricId);
  const config = selectedMetric
    ? categoryConfig[selectedMetric.color] || categoryConfig.blue
    : null;

  const flowOrder = [
    { ids: ["mrr", "arr"], stage: "顧客獲得" },
    { ids: ["nrr"], stage: "既存顧客" },
    { ids: ["churn", "expansion", "contraction"], stage: "解約/縮小" },
    { ids: ["ltv", "cac", "cac_payback"], stage: "単位経済性" },
    { ids: ["rule_of_40"], stage: "全体健全性" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{data.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Flow Map */}
        <div className="space-y-0">
          {flowOrder.map((group, groupIndex) => {
            const groupMetrics = group.ids
              .map((id) => data.metrics.find((m) => m.id === id))
              .filter(Boolean) as MetricNode[];

            if (groupMetrics.length === 0) return null;

            return (
              <div key={group.stage}>
                {/* Arrow between groups */}
                {groupIndex > 0 && <FlowArrow />}

                {/* Stage label */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    {group.stage}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Metric nodes */}
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {groupMetrics.map((metric) => {
                    const nodeConfig =
                      categoryConfig[metric.color] || categoryConfig.blue;
                    const isSelected = selectedMetricId === metric.id;

                    return (
                      <button
                        key={metric.id}
                        type="button"
                        onClick={() =>
                          setSelectedMetricId(
                            isSelected ? null : metric.id
                          )
                        }
                        className={`
                          text-left w-full rounded-lg border border-l-4 p-3
                          transition-all duration-200 cursor-pointer
                          ${nodeConfig.borderClass}
                          ${isSelected ? nodeConfig.bgClass.replace("hover:", "") : ""}
                          ${nodeConfig.bgClass}
                          ${isSelected ? "ring-1 ring-offset-1 ring-offset-background ring-border shadow-sm" : ""}
                        `}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={nodeConfig.textClass}>
                              {nodeConfig.icon}
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-bold truncate">
                                {metric.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {metric.nameEn}
                              </p>
                            </div>
                          </div>
                          {isSelected ? (
                            <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                          )}
                        </div>

                        {metric.formula && (
                          <div className="mt-2 rounded bg-muted/50 px-2 py-1 font-mono text-[11px] text-muted-foreground truncate">
                            {metric.formula}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Branch arrows for churn group */}
                {group.ids.includes("churn") && <BranchArrows />}
              </div>
            );
          })}
        </div>

        {/* Detail Panel */}
        {selectedMetric && config && (
          <div
            className={`rounded-lg border ${config.borderClass} border-l-4 p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold">{selectedMetric.name}</h3>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${config.badgeClass}`}
                  >
                    {selectedMetric.nameEn}
                  </Badge>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMetricId(null)}
                className="rounded-md p-1 hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Formula */}
            {selectedMetric.formula && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-1">
                  計算式
                </h4>
                <div className="rounded-lg bg-muted p-3 font-mono text-sm">
                  {selectedMetric.formula}
                </div>
              </div>
            )}

            {/* Why it matters */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-1">
                なぜ重要か
              </h4>
              <p className="text-sm leading-relaxed">
                {selectedMetric.whyImportant}
              </p>
            </div>

            {/* Benchmark */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-1">
                ベンチマーク
              </h4>
              <p className="text-sm">{selectedMetric.benchmark}</p>
            </div>

            {/* Kaipoke Estimate */}
            {selectedMetric.kaipokeEstimate && (
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <p className="text-[10px] font-medium text-emerald-400 mb-1">
                  カイポケ推定値
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedMetric.kaipokeEstimate}
                </p>
              </div>
            )}

            {/* Upstream / Downstream */}
            {upstreamDownstream[selectedMetric.id] && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">
                    上流 (この指標に影響するもの)
                  </h4>
                  <div className="space-y-1">
                    {upstreamDownstream[selectedMetric.id].upstream.map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground"
                        >
                          <span className={config.textClass}>&#8592;</span>
                          <span>{item}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">
                    下流 (この指標が影響するもの)
                  </h4>
                  <div className="space-y-1">
                    {upstreamDownstream[selectedMetric.id].downstream.map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground"
                        >
                          <span className={config.textClass}>&#8594;</span>
                          <span>{item}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Related insights */}
            {insights
              .filter((i) => i.related.includes(selectedMetric.id))
              .map((insight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3"
                >
                  <Lightbulb className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    {insight.text}
                  </p>
                </div>
              ))}
          </div>
        )}

        {/* Key Relationship Insights */}
        <div>
          <button
            type="button"
            onClick={() => setShowInsights(!showInsights)}
            className="flex items-center gap-2 text-sm font-medium mb-3 hover:text-foreground transition-colors cursor-pointer"
          >
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <span>指標間の関係性インサイト</span>
            {showInsights ? (
              <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </button>

          {showInsights && (
            <div className="space-y-2">
              {insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-lg border border-border p-3"
                >
                  <span className="text-amber-400 shrink-0 mt-0.5">
                    <Lightbulb className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {insight.text}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {insight.related.map((id) => {
                        const metric = data.metrics.find((m) => m.id === id);
                        if (!metric) return null;
                        const c =
                          categoryConfig[metric.color] || categoryConfig.blue;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setSelectedMetricId(id)}
                            className="cursor-pointer"
                          >
                            <Badge
                              variant="outline"
                              className={`text-[10px] ${c.badgeClass} hover:bg-muted transition-colors`}
                            >
                              {metric.name}
                            </Badge>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Data-driven relationships */}
        {data.relationships.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">その他の関係性</h4>
            <div className="space-y-1">
              {data.relationships.map((rel, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <span className="text-blue-400 shrink-0">&#8226;</span>
                  <span>{rel}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
