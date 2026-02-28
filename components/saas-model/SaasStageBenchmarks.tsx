"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StageBenchmark {
  stage: string;
  arrRange: string;
  focusMetrics: string[];
  benchmarks: Record<string, string>;
}

interface StageBenchmarksData {
  title: string;
  stages: StageBenchmark[];
}

export function SaasStageBenchmarks({ data }: { data: StageBenchmarksData }) {
  const stageColors: Record<string, string> = {
    Seed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    "Series A": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Series B": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Growth / Pre-IPO": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "Public / 上場後": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data.stages.map((stage) => (
            <div
              key={stage.stage}
              className="rounded-lg border border-border p-4 space-y-3"
            >
              {/* Stage Header */}
              <div>
                <Badge
                  variant="outline"
                  className={`text-xs ${stageColors[stage.stage] || ""}`}
                >
                  {stage.stage}
                </Badge>
                <p className="mt-1 text-sm font-bold">{stage.arrRange}</p>
              </div>

              {/* Focus Metrics */}
              <div>
                <p className="text-[10px] font-medium text-muted-foreground mb-1">
                  注力指標
                </p>
                <div className="flex flex-wrap gap-1">
                  {stage.focusMetrics.map((fm) => (
                    <Badge key={fm} variant="secondary" className="text-[10px]">
                      {fm}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Benchmarks */}
              <div className="space-y-1">
                {Object.entries(stage.benchmarks).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-start justify-between gap-1 text-[10px]"
                  >
                    <span className="text-muted-foreground shrink-0">{key}</span>
                    <span className="text-right font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
