import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSegments, getFinancials } from "@/lib/data";
import { formatRevenue, formatPercent } from "@/lib/utils";
import type { SegmentId } from "@/lib/types";

export default function SegmentsPage() {
  const segments = getSegments();
  const financials = getFinancials();
  const latestFull = financials.fiscalYears[financials.fiscalYears.length - 2];

  return (
    <div className="space-y-8">
      <PageHeader
        title="事業セグメント"
        description="各事業のビジネスモデル・市場規模・管理会計PLの詳細分析"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {segments.map((seg) => {
          const fin = latestFull.segments.find((s) => s.segmentId === seg.id);
          const totalRev = latestFull.segments.reduce((s, x) => s + x.revenue, 0);
          const pct = fin ? (fin.revenue / totalRev) * 100 : 0;

          return (
            <Link key={seg.id} href={`/segments/${seg.id}`}>
              <Card className="h-full transition-all hover:border-[color:var(--seg-color)] hover:bg-accent/20" style={{ "--seg-color": seg.color } as React.CSSProperties}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-white text-xs font-bold"
                      style={{ backgroundColor: seg.color }}
                    >
                      {seg.nameEn.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold">{seg.name}</h3>
                      <p className="text-xs text-muted-foreground">{seg.nameEn}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-mono text-2xl font-bold">
                      {fin ? formatRevenue(fin.revenue) : "—"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      売上構成比 {formatPercent(pct)}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground line-clamp-2">
                    {seg.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {seg.subServices.map((sub) => (
                      <Badge key={sub.name} variant="outline" className="text-[10px]">
                        {sub.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
