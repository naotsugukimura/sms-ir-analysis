"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BenchmarkLevel {
  label: string;
  description: string;
}

interface AdvancedMetric {
  key: string;
  name: string;
  nameJa: string;
  formula: string;
  description: string;
  benchmark?: Record<string, BenchmarkLevel>;
  stageGuidelines?: { stage: string; guideline: string }[];
  interpretation?: string[] | string;
  smsContext?: string;
  note?: string;
  seanEllisTest?: {
    question: string;
    threshold: string;
    interpretation: string[];
  };
  quantitativeIndicators?: { indicator: string; pmfAchieved: string; notAchieved: string }[];
  metrics?: {
    key: string;
    name: string;
    formula: string;
    description: string;
    benchmark: Record<string, string>;
    note: string;
  }[];
  relationship?: string;
}

export function SaasAdvancedMetrics({ metrics }: { metrics: AdvancedMetric[] }) {
  const benchmarkColor: Record<string, string> = {
    excellent: "text-emerald-400 border-emerald-500/30",
    amazing: "text-emerald-400 border-emerald-500/30",
    great: "text-blue-400 border-blue-500/30",
    good: "text-blue-400 border-blue-500/30",
    average: "text-yellow-400 border-yellow-500/30",
    bad: "text-red-400 border-red-500/30",
    terrible: "text-red-400 border-red-500/30",
    pureSaaS: "text-emerald-400 border-emerald-500/30",
    saasWithServices: "text-blue-400 border-blue-500/30",
    saasWithBpo: "text-yellow-400 border-yellow-500/30",
    verticalSaaS: "text-purple-400 border-purple-500/30",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SaaS 上級指標</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={metrics[0]?.key} className="w-full">
          <TabsList className="mb-4 flex flex-wrap h-auto gap-1">
            {metrics.map((m) => (
              <TabsTrigger key={m.key} value={m.key} className="text-xs">
                {m.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {metrics.map((metric) => (
            <TabsContent key={metric.key} value={metric.key} className="space-y-4">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold">{metric.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {metric.nameJa}
                  </Badge>
                </div>
                {metric.formula && (
                  <div className="rounded-lg bg-muted p-3 font-mono text-sm">
                    {metric.formula}
                  </div>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>
              </div>

              {/* Benchmark */}
              {metric.benchmark && (
                <div>
                  <h4 className="mb-2 text-sm font-medium">ベンチマーク</h4>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    {Object.entries(metric.benchmark).map(([level, data]) => (
                      <div
                        key={level}
                        className={`rounded-lg border p-3 ${benchmarkColor[level] || "border-border"}`}
                      >
                        <p className="text-sm font-bold">{data.label}</p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          {data.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stage Guidelines */}
              {metric.stageGuidelines && (
                <div>
                  <h4 className="mb-2 text-sm font-medium">ステージ別ガイドライン</h4>
                  <div className="space-y-2">
                    {metric.stageGuidelines.map((sg) => (
                      <div key={sg.stage} className="flex gap-3 rounded-lg border border-border p-3">
                        <Badge variant="secondary" className="shrink-0 text-[10px]">
                          {sg.stage}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{sg.guideline}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interpretation */}
              {metric.interpretation && Array.isArray(metric.interpretation) && (
                <div>
                  <h4 className="mb-2 text-sm font-medium">解釈の仕方</h4>
                  <div className="space-y-1">
                    {metric.interpretation.map((item: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="shrink-0 text-blue-400">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sean Ellis Test (PMF) */}
              {metric.seanEllisTest && (
                <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4 space-y-2">
                  <h4 className="text-sm font-medium text-purple-400">Sean Ellis テスト</h4>
                  <p className="text-xs italic">&quot;{metric.seanEllisTest.question}&quot;</p>
                  <p className="text-xs text-muted-foreground">{metric.seanEllisTest.threshold}</p>
                  <div className="space-y-1 mt-2">
                    {metric.seanEllisTest.interpretation.map((item: string, i: number) => (
                      <p key={i} className="text-[11px] text-muted-foreground">• {item}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantitative Indicators (PMF) */}
              {metric.quantitativeIndicators && (
                <div>
                  <h4 className="mb-2 text-sm font-medium">定量的判断基準</h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {metric.quantitativeIndicators.map((ind) => (
                      <div key={ind.indicator} className="rounded-lg border border-border p-3">
                        <p className="text-xs font-medium">{ind.indicator}</p>
                        <div className="mt-1 flex gap-3">
                          <span className="text-[10px] text-emerald-400">PMF達成: {ind.pmfAchieved}</span>
                          <span className="text-[10px] text-red-400">未達: {ind.notAchieved}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NDR vs GDR metrics */}
              {metric.metrics && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {metric.metrics.map((m) => (
                    <div key={m.key} className="rounded-lg border border-border p-4 space-y-2">
                      <h4 className="text-sm font-bold">{m.name}</h4>
                      <div className="rounded bg-muted p-2 font-mono text-xs">{m.formula}</div>
                      <p className="text-xs text-muted-foreground">{m.description}</p>
                      {m.benchmark && (
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(m.benchmark).map(([level, value]) => (
                            <Badge key={level} variant="outline" className={`text-[10px] ${benchmarkColor[level] || ""}`}>
                              {level}: {value as string}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {metric.relationship && (
                <p className="text-xs text-muted-foreground bg-muted rounded-lg p-3">
                  {metric.relationship}
                </p>
              )}

              {/* SMS Context */}
              {metric.smsContext && (
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <p className="text-[10px] font-medium text-emerald-400 mb-1">SMSへの当てはめ</p>
                  <p className="text-xs text-muted-foreground">{metric.smsContext}</p>
                </div>
              )}

              {/* Note */}
              {metric.note && (
                <p className="text-[10px] text-muted-foreground italic">※ {metric.note}</p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
