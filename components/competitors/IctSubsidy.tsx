"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, CheckCircle2 } from "lucide-react";

interface SubsidyData {
  title: string;
  maxAmount: string;
  subsidyRate: string;
  targetItems: string[];
  impact: string;
}

export function IctSubsidy({ data }: { data: SubsidyData }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-yellow-400" />
          <CardTitle>{data.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground">補助上限</p>
            <p className="text-lg font-bold text-yellow-400">{data.maxAmount}</p>
          </div>
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground">補助率</p>
            <p className="text-lg font-bold text-yellow-400">{data.subsidyRate}</p>
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-medium">対象品目</h4>
          <div className="flex flex-wrap gap-2">
            {data.targetItems.map((item) => (
              <Badge key={item} variant="secondary" className="text-xs">
                <CheckCircle2 className="mr-1 h-3 w-3 text-emerald-400" />
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
          <p className="text-xs font-medium text-emerald-400 mb-1">カイポケへの影響</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{data.impact}</p>
        </div>
      </CardContent>
    </Card>
  );
}
