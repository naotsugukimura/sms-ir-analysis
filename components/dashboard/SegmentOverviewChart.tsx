"use client";

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import type { ConsolidatedFinancials, SegmentDefinition } from "@/lib/types";
import { SEGMENT_CONFIG, CHART_TOOLTIP_STYLE } from "@/lib/constants";
import { formatRevenue } from "@/lib/utils";

const ChartInner = dynamic(() => import("./SegmentOverviewChartInner"), { ssr: false });

export function SegmentOverviewChart({
  financials,
  segments: _segments,
}: {
  financials: ConsolidatedFinancials;
  segments: SegmentDefinition[];
}) {
  const data = financials.fiscalYears.map((fy) => {
    const row: Record<string, string | number> = { year: fy.year.replace("FY", "") };
    for (const seg of fy.segments) {
      row[seg.segmentId] = seg.revenue;
    }
    row.total = fy.revenue;
    return row;
  });

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="mb-4 text-sm font-bold">セグメント別売上推移</h3>
        <ChartInner
          data={data}
          segmentConfig={SEGMENT_CONFIG}
          tooltipStyle={CHART_TOOLTIP_STYLE}
          formatRevenue={formatRevenue}
        />
      </CardContent>
    </Card>
  );
}
