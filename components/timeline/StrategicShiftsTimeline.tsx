import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { HistoryEvent, StrategicPlan } from "@/lib/types";
import { HISTORY_CATEGORY_CONFIG, SEGMENT_CONFIG } from "@/lib/constants";
import { formatYearMonth } from "@/lib/utils";
import type { SegmentId } from "@/lib/types";

export function StrategicShiftsTimeline({
  events,
  strategies,
}: {
  events: HistoryEvent[];
  strategies: StrategicPlan[];
}) {
  const sorted = [...events]
    .filter((e) => e.significance === "high")
    .sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return (a.month ?? 0) - (b.month ?? 0);
    });

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-bold">主要な戦略シフト</h3>
          <div className="relative ml-4 border-l-2 border-border pl-6">
            {sorted.map((event, i) => {
              const catConfig = HISTORY_CATEGORY_CONFIG[event.category];
              const segConfig = event.relatedSegment
                ? SEGMENT_CONFIG[event.relatedSegment as SegmentId]
                : null;
              return (
                <div key={i} className="relative mb-5 last:mb-0">
                  <div
                    className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background"
                    style={{ backgroundColor: catConfig?.color ?? "#6B7280" }}
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatYearMonth(event.year, event.month)}
                    </span>
                    {segConfig && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{ backgroundColor: `${segConfig.color}20`, color: segConfig.color }}
                      >
                        {segConfig.name}
                      </span>
                    )}
                  </div>
                  <h4 className="mt-1 text-sm font-bold">{event.title}</h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">{event.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-bold">中期経営計画・長期ビジョン</h3>
          <div className="space-y-4">
            {strategies.map((plan, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">{plan.name}</h4>
                  <Badge variant="outline" className="text-[10px]">{plan.period}</Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{plan.targets.description}</p>
                {plan.targets.revenue && (
                  <div className="mt-2 flex gap-4">
                    <div>
                      <p className="text-[10px] text-muted-foreground">売上目標</p>
                      <p className="font-mono text-sm font-bold">{(plan.targets.revenue / 10).toLocaleString()}億円</p>
                    </div>
                    {plan.targets.operatingProfit && (
                      <div>
                        <p className="text-[10px] text-muted-foreground">営業利益目標</p>
                        <p className="font-mono text-sm font-bold">{(plan.targets.operatingProfit / 10).toLocaleString()}億円</p>
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-3 space-y-1.5">
                  {plan.keyStrategies.map((strat, j) => (
                    <div key={j} className="rounded-md bg-muted/50 p-2">
                      <p className="text-xs font-medium">{strat.title}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{strat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
