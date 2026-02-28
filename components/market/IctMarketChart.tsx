"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const IctMarketChartInner = dynamic(() => import("./IctMarketChartInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-80 items-center justify-center text-muted-foreground">
      読み込み中...
    </div>
  ),
});


export function IctMarketChart({ data }: { data: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>{data.title}</CardTitle>
          <Badge variant="outline" className="text-xs">
            CAGR {data.cagr}
          </Badge>
        </div>
        <CardDescription>
          出典: {data.sourceRef}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <IctMarketChartInner data={data.data} unit={data.unit} />
      </CardContent>
    </Card>
  );
}
