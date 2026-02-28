import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MetricData {
  key: string;
  name: string;
  nameJa: string;
  formula?: string;
  description: string;
  benchmark?: Record<string, string>;
  components?: { name: string; description: string; example: string }[];
  subMetrics?: {
    key: string;
    name: string;
    nameJa: string;
    formula: string;
    alternativeFormula?: string;
    description: string;
    example?: string;
    benchmark?: Record<string, string>;
  }[];
  breakdown?: { name: string; description: string }[];
  smsContext?: string;
}

const BENCHMARK_COLORS: Record<string, string> = {
  excellent: "#10B981",
  good: "#3B82F6",
  average: "#F59E0B",
  bad: "#EF4444",
};

const BENCHMARK_LABELS: Record<string, string> = {
  excellent: "優秀",
  good: "良好",
  average: "普通",
  bad: "要改善",
};

export function SaasKeyMetrics({ metrics }: { metrics: MetricData[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-muted-foreground">SaaSに必要な指標</h2>

      {metrics.map((metric) => (
        <Card key={metric.key}>
          <CardContent className="p-6">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-violet-500/20 px-3 py-1 font-mono text-sm font-bold text-violet-400">
                    {metric.key}
                  </span>
                  <span className="text-xs text-muted-foreground">{metric.name}</span>
                </div>
                <h3 className="mt-1 text-base font-bold">{metric.nameJa}</h3>
              </div>
            </div>

            <p className="mb-4 text-xs text-muted-foreground">{metric.description}</p>

            {/* Formula */}
            {metric.formula && (
              <div className="mb-4 rounded-lg border border-violet-500/30 bg-violet-500/5 p-3 text-center">
                <p className="font-mono text-sm font-bold text-violet-400">{metric.formula}</p>
              </div>
            )}

            {/* Benchmark */}
            {metric.benchmark && (
              <div className="mb-4">
                <p className="mb-2 text-[10px] font-bold text-muted-foreground">ベンチマーク水準</p>
                <div className="flex gap-2">
                  {Object.entries(metric.benchmark).map(([level, value]) => (
                    <div
                      key={level}
                      className="flex-1 rounded-lg border p-2 text-center"
                      style={{ borderColor: `${BENCHMARK_COLORS[level]}40` }}
                    >
                      <p className="text-[10px]" style={{ color: BENCHMARK_COLORS[level] }}>
                        {BENCHMARK_LABELS[level]}
                      </p>
                      <p className="mt-0.5 font-mono text-xs font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NRR Components */}
            {metric.components && (
              <div className="mb-4">
                <p className="mb-2 text-[10px] font-bold text-muted-foreground">構成要素</p>
                <div className="grid gap-2 md:grid-cols-3">
                  {metric.components.map((comp) => (
                    <div key={comp.name} className="rounded-lg border border-border p-3">
                      <p className="text-xs font-bold">{comp.name}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{comp.description}</p>
                      <div className="mt-2 rounded-md bg-[#1E3A5F]/20 p-1.5">
                        <p className="text-[10px] text-blue-300">例: {comp.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unit Economics sub-metrics */}
            {metric.subMetrics && (
              <div className="mb-4 space-y-3">
                {metric.subMetrics.map((sub) => (
                  <div key={sub.key} className="rounded-lg border border-border p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-orange-500/20 px-2 py-0.5 font-mono text-xs font-bold text-orange-400">
                        {sub.key}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{sub.name}</span>
                    </div>
                    <p className="mt-1 text-xs font-bold">{sub.nameJa}</p>
                    <div className="mt-2 rounded-md border border-orange-500/20 bg-orange-500/5 p-2 text-center">
                      <p className="font-mono text-xs font-bold text-orange-400">{sub.formula}</p>
                      {sub.alternativeFormula && (
                        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                          = {sub.alternativeFormula}
                        </p>
                      )}
                    </div>
                    <p className="mt-2 text-[11px] text-muted-foreground">{sub.description}</p>
                    {sub.example && (
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                        計算例: {sub.example}
                      </p>
                    )}
                    {sub.benchmark && (
                      <div className="mt-2 flex gap-1.5">
                        {Object.entries(sub.benchmark).map(([level, value]) => (
                          <Badge
                            key={level}
                            variant="outline"
                            className="text-[9px]"
                            style={{ borderColor: BENCHMARK_COLORS[level], color: BENCHMARK_COLORS[level] }}
                          >
                            {BENCHMARK_LABELS[level]}: {value}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* S&M Breakdown */}
            {metric.breakdown && (
              <div className="mb-4">
                <p className="mb-2 text-[10px] font-bold text-muted-foreground">S&Mの内訳</p>
                <div className="space-y-2">
                  {metric.breakdown.map((item) => (
                    <div key={item.name} className="rounded-lg border border-border p-3">
                      <p className="text-xs font-bold">{item.name}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SMS Context */}
            {metric.smsContext && (
              <div className="rounded-md bg-[#1E3A5F]/20 p-3">
                <p className="text-[10px] font-medium text-blue-300">SMS カイポケへの示唆</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{metric.smsContext}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
