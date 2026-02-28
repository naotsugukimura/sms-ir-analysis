"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, Briefcase } from "lucide-react";


export function CareWorkforce({ data }: { data: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <CardTitle>{data.title}</CardTitle>
        </div>
        <CardDescription>出典: {data.sourceRef}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* KPI Row */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <Users className="mx-auto mb-2 h-5 w-5 text-blue-400" />
            <p className="text-xs text-muted-foreground">現在の介護従事者数</p>
            <p className="mt-1 text-2xl font-bold">{data.data.currentWorkers}万人</p>
            <p className="text-[10px] text-muted-foreground">{data.data.currentWorkersUnit.replace(/[\d.]+万人/, "")}</p>
          </div>
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-center">
            <AlertTriangle className="mx-auto mb-2 h-5 w-5 text-red-400" />
            <p className="text-xs text-muted-foreground">2025年 人材不足</p>
            <p className="mt-1 text-2xl font-bold text-red-400">
              {data.data.shortageBy2025}万人
            </p>
            <p className="text-[10px] text-muted-foreground">
              必要数 {data.data.requiredBy2025}万人
            </p>
          </div>
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-center">
            <AlertTriangle className="mx-auto mb-2 h-5 w-5 text-red-400" />
            <p className="text-xs text-muted-foreground">2040年 人材不足</p>
            <p className="mt-1 text-2xl font-bold text-red-400">
              {data.data.shortageBy2040}万人
            </p>
            <p className="text-[10px] text-muted-foreground">
              必要数 {data.data.requiredBy2040}万人
            </p>
          </div>
        </div>

        {/* 有効求人倍率 */}
        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-orange-400" />
            <p className="text-sm font-medium">有効求人倍率</p>
            <Badge className="bg-orange-500/20 text-orange-400 text-xs">
              {data.data.jobOpeningRatio}倍
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {data.data.jobOpeningRatioNote}
          </p>
        </div>

        {/* Implications */}
        <div>
          <h4 className="mb-2 text-sm font-medium">カイポケへのインプリケーション</h4>
          <div className="grid gap-2 sm:grid-cols-2">
            {data.implications.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border p-3">
                <span className="mt-0.5 shrink-0 text-emerald-400">→</span>
                <p className="text-xs text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
