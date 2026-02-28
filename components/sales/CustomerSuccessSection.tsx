"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Bot, Users, ArrowRight } from "lucide-react";

export function CustomerSuccessSection({ data }: { data: any }) {
  const tm = data.touchModels;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 text-purple-400" />
        <h2 className="text-xl font-bold">{data.title}</h2>
      </div>
      <p className="text-xs text-muted-foreground">{data.description}</p>

      {/* Tech Touch */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-base">{tm.techTouch.title}</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground">{tm.techTouch.description}</p>
          <Badge variant="outline" className="text-[10px] w-fit">{tm.techTouch.targetSegment}</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {tm.techTouch.tactics.map((tactic: any) => (
            <div key={tactic.tactic} className="rounded-lg border border-border p-3 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">{tactic.tactic}</p>
                <Badge variant="secondary" className="text-[10px]">{tactic.tool}</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground">{tactic.description}</p>
              <p className="text-[10px] text-blue-400">KPI: {tactic.kpi}</p>
            </div>
          ))}

          <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3">
            <p className="text-xs font-medium text-blue-400 mb-2">構築ステップ</p>
            {tm.techTouch.buildSteps.map((step: string, i: number) => (
              <p key={i} className="text-[10px] text-muted-foreground">{step}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* People Touch */}
      <Card className="border-purple-500/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-400" />
            <CardTitle className="text-base">{tm.peoplesTouch.title}</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground">{tm.peoplesTouch.description}</p>
          <Badge variant="outline" className="text-[10px] w-fit">{tm.peoplesTouch.targetSegment}</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {tm.peoplesTouch.levels.map((level: any) => (
            <div key={level.level} className="rounded-lg border border-border p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-500/20 text-purple-400 text-[10px]">{level.level}</Badge>
                <span className="text-[10px] text-muted-foreground">{level.target}</span>
              </div>
              {level["csm1人あたり担当数"] && (
                <p className="text-[10px] text-muted-foreground">CSM 1人あたり: {level["csm1人あたり担当数"]}</p>
              )}
              <ul className="space-y-1">
                {level.activities.map((act: string, i: number) => (
                  <li key={i} className="text-[10px] text-muted-foreground">• {act}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-lg bg-purple-500/5 border border-purple-500/20 p-3">
            <p className="text-xs font-medium text-purple-400 mb-2">構築ステップ</p>
            {tm.peoplesTouch.buildSteps.map((step: string, i: number) => (
              <p key={i} className="text-[10px] text-muted-foreground">{step}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hybrid Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{tm.hybridApproach.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tm.hybridApproach.phases.map((phase: any, i: number) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-xs font-bold">
                    {i + 1}
                  </div>
                  {i < tm.hybridApproach.phases.length - 1 && (
                    <div className="flex-1 w-px bg-border my-1" />
                  )}
                </div>
                <div className="flex-1 rounded-lg border border-border p-3 space-y-2">
                  <p className="text-xs font-medium">{phase.phase}</p>
                  <p className="text-[10px] text-muted-foreground">{phase.focus}</p>
                  <div className="flex flex-wrap gap-1">
                    {phase.actions.map((action: string) => (
                      <Badge key={action} variant="secondary" className="text-[10px]">{action}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CS KPIs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">CS KPI目標</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(data.kpis).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-border p-3 text-center">
                <p className="text-[10px] text-muted-foreground">{key}</p>
                <p className="text-sm font-bold mt-1">{value as string}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
