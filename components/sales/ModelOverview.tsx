"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";

interface Stage { key: string; label: string; labelJa: string; color: string; kpi: string; }
interface FunnelStep { stage: string; volume: number; unit: string; conversionRate?: string; }
interface OverviewData { stages: Stage[]; funnel: FunnelStep[]; }

export function ModelOverview({ data }: { data: OverviewData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>The Model ファネル全体像</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stage overview */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {data.stages.map((stage) => (
            <div
              key={stage.key}
              className="rounded-lg border p-3 text-center"
              style={{ borderColor: `${stage.color}40` }}
            >
              <p className="text-lg font-bold" style={{ color: stage.color }}>{stage.label}</p>
              <p className="text-xs text-muted-foreground">{stage.labelJa}</p>
              <Badge variant="secondary" className="mt-1 text-[10px]">KPI: {stage.kpi}</Badge>
            </div>
          ))}
        </div>

        {/* Funnel */}
        <div className="space-y-1">
          {data.funnel.map((step, i) => {
            const width = Math.max(20, 100 - i * 15);
            return (
              <div key={step.stage} className="flex flex-col items-center">
                {i > 0 && (
                  <div className="flex items-center gap-2 py-1">
                    <ArrowDown className="h-3 w-3 text-muted-foreground" />
                    {step.conversionRate && (
                      <span className="text-[10px] text-muted-foreground">CVR {step.conversionRate}</span>
                    )}
                  </div>
                )}
                <div
                  className="rounded-lg border border-border bg-card px-4 py-2 text-center transition-all"
                  style={{ width: `${width}%` }}
                >
                  <p className="text-xs font-medium">{step.stage}</p>
                  <p className="text-sm font-bold">{step.volume.toLocaleString()} <span className="text-[10px] font-normal text-muted-foreground">{step.unit}</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
