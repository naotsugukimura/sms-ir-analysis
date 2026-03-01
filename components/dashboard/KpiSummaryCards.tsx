import { Card, CardContent } from "@/components/ui/card";
import { Sparkline } from "@/components/ui/sparkline";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Percent, Users } from "lucide-react";
import type { ConsolidatedFinancials } from "@/lib/types";
import { formatRevenue, formatPercent, formatNumber, calcYoY } from "@/lib/utils";

export function KpiSummaryCards({ financials }: { financials: ConsolidatedFinancials }) {
  const years = financials.fiscalYears;
  const latest = years[years.length - 2]; // FY2025 (full year)
  const prev = years[years.length - 3]; // FY2024

  const revenueYoY = calcYoY(latest.revenue, prev.revenue);
  const profitYoY = calcYoY(latest.operatingProfit, prev.operatingProfit);

  // Sparkline data from last 5 full years
  const recentYears = years.slice(-7, -1);
  const revenueHistory = recentYears.map((y) => y.revenue);
  const profitHistory = recentYears.map((y) => y.operatingProfit);
  const marginHistory = recentYears.map((y) => y.operatingMargin * 100);
  const employeeHistory = recentYears
    .map((y) => y.employees ?? 0)
    .filter((v) => v > 0);

  const kpis = [
    {
      label: "売上高",
      value: formatRevenue(latest.revenue),
      sub: latest.fiscalYearLabel,
      yoy: revenueYoY,
      sparkData: revenueHistory,
      sparkColor: "#10B981",
      icon: DollarSign,
    },
    {
      label: "営業利益",
      value: formatRevenue(latest.operatingProfit),
      sub: `営業利益率 ${formatPercent(latest.operatingMargin)}`,
      yoy: profitYoY,
      sparkData: profitHistory,
      sparkColor: "#3B82F6",
      icon: BarChart3,
    },
    {
      label: "ROE",
      value: latest.roe ? formatPercent(latest.roe) : "—",
      sub: "自己資本利益率",
      sparkData: marginHistory,
      sparkColor: "#F59E0B",
      icon: Percent,
    },
    {
      label: "従業員数",
      value: latest.employees ? formatNumber(latest.employees) + "人" : "—",
      sub: "連結",
      sparkData: employeeHistory,
      sparkColor: "#8B5CF6",
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-3.5 w-3.5" />
                <span className="text-xs">{kpi.label}</span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <p className="font-mono text-xl font-bold">{kpi.value}</p>
                {kpi.sparkData.length >= 2 && (
                  <Sparkline
                    data={kpi.sparkData}
                    color={kpi.sparkColor}
                    className="opacity-40"
                  />
                )}
              </div>
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
        );
      })}
    </div>
  );
}
