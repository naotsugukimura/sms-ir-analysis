"use client";

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ConsolidatedFinancials, SegmentId } from "@/lib/types";
import { formatRevenue, formatPercent, calcYoY } from "@/lib/utils";
import { CHART_TOOLTIP_STYLE } from "@/lib/constants";

const PLChartInner = dynamic(() => import("./PLChartInner"), { ssr: false });

export function SegmentPL({
  segmentId,
  financials,
  color,
}: {
  segmentId: SegmentId;
  financials: ConsolidatedFinancials;
  color: string;
}) {
  const data = financials.fiscalYears
    .map((fy) => {
      const seg = fy.segments.find((s) => s.segmentId === segmentId);
      if (!seg) return null;
      return {
        year: fy.year.replace("FY", ""),
        label: fy.fiscalYearLabel,
        revenue: seg.revenue,
        profit: seg.profit,
        margin: seg.revenue > 0 ? (seg.profit / seg.revenue) * 100 : 0,
      };
    })
    .filter(Boolean) as { year: string; label: string; revenue: number; profit: number; margin: number }[];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-sm font-bold">セグメント別PL推移</h3>

        <div className="mb-6 h-[280px]">
          <PLChartInner data={data} color={color} tooltipStyle={CHART_TOOLTIP_STYLE} />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">期</TableHead>
              <TableHead className="text-right text-xs">売上高</TableHead>
              <TableHead className="text-right text-xs">営業利益</TableHead>
              <TableHead className="text-right text-xs">利益率</TableHead>
              <TableHead className="text-right text-xs">売上YoY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => {
              const prevRev = i > 0 ? data[i - 1].revenue : null;
              const yoy = prevRev !== null ? calcYoY(row.revenue, prevRev) : null;
              return (
                <TableRow key={row.year}>
                  <TableCell className="font-mono text-xs">{row.label}</TableCell>
                  <TableCell className="text-right font-mono text-xs">{formatRevenue(row.revenue)}</TableCell>
                  <TableCell className="text-right font-mono text-xs">{formatRevenue(row.profit)}</TableCell>
                  <TableCell className="text-right font-mono text-xs">{formatPercent(row.margin)}</TableCell>
                  <TableCell className="text-right font-mono text-xs">
                    {yoy !== null ? (
                      <span className={yoy >= 0 ? "text-emerald-400" : "text-red-400"}>
                        {yoy >= 0 ? "+" : ""}{yoy.toFixed(1)}%
                      </span>
                    ) : "—"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
