"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Building2, Landmark } from "lucide-react";


export function MarketInsights({ data }: { data: any }) {
  const kpis = [
    {
      icon: Users,
      label: "高齢化率",
      value: `${data.agingDemographics.data[data.agingDemographics.data.length - 4]?.agingRate}%`,
      subLabel: "2024年",
      trend: "→ 2040年 35.3%",
      color: "text-orange-400",
    },
    {
      icon: Building2,
      label: "介護ICT市場",
      value: `${data.ictMarket.data.find((d: { year: number }) => d.year === 2024)?.marketSize}億円`,
      subLabel: "2024年",
      trend: `→ 2030年 ${data.ictMarket.data.find((d: { year: number }) => d.year === 2030)?.marketSize}億円`,
      color: "text-emerald-400",
    },
    {
      icon: TrendingUp,
      label: "ICT市場CAGR",
      value: data.ictMarket.cagr,
      subLabel: "2023-2030",
      trend: "急成長市場",
      color: "text-blue-400",
    },
    {
      icon: Landmark,
      label: "介護人材不足",
      value: `${data.careWorkforce.data.shortageBy2025}万人`,
      subLabel: "2025年予測",
      trend: `→ 2040年 ${data.careWorkforce.data.shortageBy2040}万人不足`,
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.label}
            </CardTitle>
            <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px]">
                {kpi.subLabel}
              </Badge>
              <span className="text-xs text-muted-foreground">{kpi.trend}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
