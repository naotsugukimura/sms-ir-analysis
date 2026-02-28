"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface GrowthDriver {
  driver: string;
  description: string;
  impact: string;
}


export function IctGrowthDrivers({ data }: { data: any }) {
  const impactColor: Record<string, string> = {
    "高": "bg-red-500/20 text-red-400",
    "中": "bg-orange-500/20 text-orange-400",
    "低": "bg-gray-500/20 text-gray-400",
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          <CardTitle>ICT市場の成長ドライバー</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.growthDrivers.map((driver: GrowthDriver) => (
            <div
              key={driver.driver}
              className="rounded-lg border border-border p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{driver.driver}</h4>
                <Badge className={`text-[10px] ${impactColor[driver.impact] || ""}`}>
                  影響度: {driver.impact}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {driver.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
