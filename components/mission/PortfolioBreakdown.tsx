"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { ConsolidatedFinancials, SegmentDefinition } from "@/lib/types";
import { SEGMENT_CONFIG } from "@/lib/constants";
import { formatRevenue, formatPercent } from "@/lib/utils";
import type { SegmentId } from "@/lib/types";

export function PortfolioBreakdown({
  financials,
  segments,
}: {
  financials: ConsolidatedFinancials;
  segments: SegmentDefinition[];
}) {
  const latestFull = financials.fiscalYears[financials.fiscalYears.length - 2]; // FY2025
  const totalRevenue = latestFull.segments.reduce((sum, s) => sum + s.revenue, 0);

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-2 text-sm font-bold">事業ポートフォリオ</h3>
        <p className="mb-6 text-xs text-muted-foreground">
          {latestFull.fiscalYearLabel} セグメント別売上構成
        </p>

        {/* Visual bar */}
        <div className="mb-6 flex h-8 overflow-hidden rounded-lg">
          {latestFull.segments.map((seg) => {
            const pct = (seg.revenue / totalRevenue) * 100;
            const config = SEGMENT_CONFIG[seg.segmentId as SegmentId];
            return (
              <div
                key={seg.segmentId}
                className="flex items-center justify-center text-[10px] font-bold text-white transition-all"
                style={{ width: `${pct}%`, backgroundColor: config?.color ?? "#6B7280" }}
              >
                {pct > 10 ? `${pct.toFixed(0)}%` : ""}
              </div>
            );
          })}
        </div>

        {/* Segment cards */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {segments.map((seg) => {
            const fin = latestFull.segments.find((s) => s.segmentId === seg.id);
            const pct = fin ? (fin.revenue / totalRevenue) * 100 : 0;
            return (
              <Link key={seg.id} href={`/segments/${seg.id}`}>
                <Card className="transition-colors hover:bg-accent/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: seg.color }}
                      />
                      <span className="text-sm font-bold">{seg.name}</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-mono text-lg font-bold">
                        {fin ? formatRevenue(fin.revenue) : "—"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({formatPercent(pct)})
                      </span>
                    </div>
                    {fin && fin.profit !== undefined && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        営業利益: {formatRevenue(fin.profit)}
                      </p>
                    )}
                    <p className="mt-2 text-[10px] text-muted-foreground line-clamp-2">
                      {seg.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
