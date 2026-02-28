"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export function FieldSalesSection({ data }: { data: any }) {
  const importanceColor: Record<string, string> = {
    "最重要": "bg-red-500/20 text-red-400",
    "必須": "bg-orange-500/20 text-orange-400",
    "重要": "bg-blue-500/20 text-blue-400",
    "状況次第": "bg-gray-500/20 text-gray-400",
    "有効": "bg-emerald-500/20 text-emerald-400",
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
                <li key={i} className="text-[10px] text-muted-foreground">→ {lever}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
