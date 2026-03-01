"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MarketShareChartInner = dynamic(() => import("./MarketShareChartInner"), {
  ssr: false,
  loading: () => <div className="h-72 animate-pulse rounded-lg bg-muted" />,
});

export function MarketShareChart({ data }: { data: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>{data.title}</CardTitle>
        </div>
        <CardDescription className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-[10px]">
            対象事業所: {data.totalAddressableMarket.total.toLocaleString()} {data.totalAddressableMarket.unit}
          </Badge>
          <Badge variant="outline" className="text-[10px]">
            ソフト導入率: {data.softwarePenetrationRate.overall}%
          </Badge>
          <Badge variant="outline" className="text-[10px]">
            残り{100 - data.softwarePenetrationRate.overall}%が紙・Excel
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MarketShareChartInner ranking={data.topShareRanking} />
      </CardContent>
    </Card>
  );
}
