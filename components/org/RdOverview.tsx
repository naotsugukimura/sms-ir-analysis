"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, TrendingUp, DollarSign, Gauge } from "lucide-react";

interface CostItem {
  category: string;
  ratio: string;
  detail: string;
}

interface KeyMetric {
  name: string;
  target: string;
  elite: string;
}

interface OverviewData {
  title: string;
  subtitle: string;
  description: string;
  headcountRatio: string;
  costStructure: {
    label: string;
    items: CostItem[];
  };
  keyMetrics: KeyMetric[];
}

export function RdOverview({ data }: { data: OverviewData }) {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-background">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
              <Code2 className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">{data.subtitle}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.description}</p>
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                {data.headcountRatio}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* コスト構成 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              {data.costStructure.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.costStructure.items.map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <Badge variant="secondary">{item.ratio}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500/60"
                      style={{ width: item.ratio.replace(/[^0-9]/g, "").slice(0, 2) + "%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Four Keys メトリクス */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Gauge className="h-4 w-4 text-emerald-400" />
              Four Keys（DORA メトリクス）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.keyMetrics.map((metric) => (
                <div key={metric.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-3 w-3 text-blue-400" />
                      <span className="text-xs text-muted-foreground">目標:</span>
                      <Badge variant="outline" className="text-xs">{metric.target}</Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">Elite:</span>
                      <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">{metric.elite}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
