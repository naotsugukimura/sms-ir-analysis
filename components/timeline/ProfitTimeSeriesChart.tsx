"use client";

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import type { ConsolidatedFinancials } from "@/lib/types";
import { CHART_TOOLTIP_STYLE } from "@/lib/constants";
import { formatRevenue, formatPercent } from "@/lib/utils";

const ChartInner = dynamic(() => import("./ProfitChartInner"), { ssr: false });

export function ProfitTimeSeriesChart({ financials }: { financials: ConsolidatedFinancials }) {
  const data = financials.fiscalYears.map((fy) => ({
    year: fy.year.replace("FY", ""),
    revenue: fy.revenue,
    operatingProfit: fy.operatingProfit,
    margin: fy.operatingMargin,
    roe: fy.roe ?? null,
  }));

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-sm font-bold">連結業績推移（売上・営業利益・マージン）</h3>
        <div className="h-[350px]">
          <ChartInner data={data} tooltipStyle={CHART_TOOLTIP_STYLE} formatRevenue={formatRevenue} formatPercent={formatPercent} />
        </div>
      </CardContent>
    </Card>
  );
}
