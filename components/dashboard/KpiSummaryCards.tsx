import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ConsolidatedFinancials } from "@/lib/types";
import { formatRevenue, formatPercent, formatNumber, calcYoY } from "@/lib/utils";

export function KpiSummaryCards({ financials }: { financials: ConsolidatedFinancials }) {
  const latest = financials.fiscalYears[financials.fiscalYears.length - 2]; // FY2025 (full year)
  const prev = financials.fiscalYears[financials.fiscalYears.length - 3]; // FY2024

  const revenueYoY = calcYoY(latest.revenue, prev.revenue);
  const profitYoY = calcYoY(latest.operatingProfit, prev.operatingProfit);

  const kpis = [
    {
      label: "売上高",
      value: formatRevenue(latest.revenue),
      sub: latest.fiscalYearLabel,
      yoy: revenueYoY,
    },
    {
      label: "営業利益",
      value: formatRevenue(latest.operatingProfit),
      sub: `営業利益率 ${formatPercent(latest.operatingMargin)}`,
      yoy: profitYoY,
    },
    {
      label: "ROE",
      value: latest.roe ? formatPercent(latest.roe) : "—",
      sub: "自己資本利益率",
    },
    {
      label: "従業員数",
      value: latest.employees ? formatNumber(latest.employees) + "人" : "—",
      sub: "連結",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
            <p className="mt-1 font-mono text-xl font-bold">{kpi.value}</p>
            <div className="mt-1 flex items-center gap-1">
              {kpi.yoy !== undefined && kpi.yoy !== null && (
                <span className={`flex items-center gap-0.5 text-xs font-medium ${kpi.yoy >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {kpi.yoy >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.yoy >= 0 ? "+" : ""}{kpi.yoy.toFixed(1)}%
                </span>
              )}
              <span className="text-[10px] text-muted-foreground">{kpi.sub}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
