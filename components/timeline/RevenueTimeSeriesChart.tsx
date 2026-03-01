"use client";

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import type { ConsolidatedFinancials } from "@/lib/types";
import { SEGMENT_CONFIG, CHART_TOOLTIP_STYLE } from "@/lib/constants";
import { formatRevenue } from "@/lib/utils";

const ChartInner = dynamic(() => import("./RevenueChartInner"), {
  ssr: false,
  loading: () => <div className="h-[350px] animate-pulse rounded-lg bg-muted" />,
});

export function RevenueTimeSeriesChart({ financials }: { financials: ConsolidatedFinancials }) {
  const data = financials.fiscalYears.map((fy) => {
    const row: Record<string, string | number> = { year: fy.year.replace("FY", "") };
    for (const seg of fy.segments) {
      row[seg.segmentId] = seg.revenue;
    }
    return row;
  });

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-sm font-bold">セグメント別売上推移</h3>
        <div className="h-[350px]">
          <ChartInner data={data} segmentConfig={SEGMENT_CONFIG} tooltipStyle={CHART_TOOLTIP_STYLE} formatRevenue={formatRevenue} />
        </div>
      </CardContent>
    </Card>
  );
}
