"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AgingChartInner = dynamic(() => import("./AgingChartInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-72 items-center justify-center text-muted-foreground">
      読み込み中...
    </div>
  ),
});


export function AgingDemographics({ data }: { data: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>
          出典: {data.sourceRef}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AgingChartInner data={data.data} />
        <div className="grid gap-2 sm:grid-cols-2">
          {data.insights.map((insight: string, i: number) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border border-border p-3">
              <Badge variant="outline" className="mt-0.5 shrink-0 text-[10px]">
                {i + 1}
              </Badge>
              <p className="text-xs text-muted-foreground">{insight}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
