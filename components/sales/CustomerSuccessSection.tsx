"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Bot,
  Users,
  Activity,
  AlertTriangle,
  TrendingUp,
  ClipboardList,
} from "lucide-react";

export function CustomerSuccessSection({ data }: { data: any }) {
  const tm = data.touchModels;

  const signalColors: Record<string, string> = {
    yellow: "border-l-yellow-500",
    orange: "border-l-orange-500",
    red: "border-l-red-500",
  };

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

      {/* Health Score Model */}
      {data.healthScoreModel && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-base">{data.healthScoreModel.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.healthScoreModel.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-muted-foreground">指標</th>
                    <th className="text-center p-2 text-muted-foreground">重み</th>
                    <th className="text-left p-2 text-muted-foreground">スコアリング基準</th>
                    <th className="text-center p-2 text-muted-foreground">データソース</th>
                  </tr>
                </thead>
                <tbody>
                  {data.healthScoreModel.indicators.map((ind: any) => (
                    <tr key={ind.indicator} className="border-b border-border/50">
                      <td className="p-2 font-medium">{ind.indicator}</td>
                      <td className="p-2 text-center text-purple-400 font-bold">{ind.weight}</td>
                      <td className="p-2 text-muted-foreground">{ind.scoring}</td>
                      <td className="p-2 text-center">
                        <Badge variant="secondary" className="text-[10px]">{ind.dataSource}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {Object.entries(data.healthScoreModel.thresholds).map(([key, threshold]: [string, any]) => {
                const colorMap: Record<string, string> = {
                  healthy: "border-emerald-500/30 bg-emerald-500/5",
                  atRisk: "border-orange-500/30 bg-orange-500/5",
                  critical: "border-red-500/30 bg-red-500/5",
                };
                const textColorMap: Record<string, string> = {
                  healthy: "text-emerald-400",
                  atRisk: "text-orange-400",
                  critical: "text-red-400",
                };
                return (
                  <div key={key} className={`rounded-lg border p-3 ${colorMap[key] || ""}`}>
                    <div className={`text-xs font-bold ${textColorMap[key] || ""}`}>{threshold.range}</div>
                    <p className="text-[10px] text-muted-foreground mt-1">{threshold.action}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Churn Signals */}
      {data.churnSignals && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <CardTitle className="text-base">{data.churnSignals.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.churnSignals.description}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.churnSignals.stages.map((stage: any) => (
              <div key={stage.stage} className={`rounded-lg border border-l-4 border-border p-3 space-y-2 ${signalColors[stage.color] || ""}`}>
                <span className="text-xs font-bold">{stage.stage}</span>
                <ul className="space-y-1">
                  {stage.signals.map((signal: string, i: number) => (
                    <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                      <span className="text-red-400 shrink-0">!</span>{signal}
                    </li>
                  ))}
                </ul>
                <div className="rounded bg-muted/30 p-2">
                  <span className="text-[10px] font-medium text-purple-400">対応: </span>
                  <span className="text-[10px] text-muted-foreground">{stage.action}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Expansion Playbook */}
      {data.expansionPlaybook && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-base">{data.expansionPlaybook.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.expansionPlaybook.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.expansionPlaybook.opportunities.map((opp: any) => (
              <div key={opp.type} className="rounded-lg border border-l-4 border-l-purple-500 border-border p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">{opp.type}</span>
                  <Badge className="bg-purple-500/20 text-purple-400 text-[10px]">{opp.expectedArpaLift}</Badge>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <span className="text-[10px] font-medium text-muted-foreground">トリガー:</span>
                    <p className="text-[10px] text-muted-foreground">{opp.trigger}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium text-muted-foreground">タイミング:</span>
                    <p className="text-[10px] text-muted-foreground">{opp.timing}</p>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  <span className="font-medium">アプローチ:</span> {opp.approach}
                </p>
              </div>
            ))}

            <div className="rounded-lg bg-purple-500/5 border border-purple-500/20 p-3">
              <p className="text-xs font-medium text-purple-400 mb-2">ベストプラクティス</p>
              <ul className="space-y-1">
                {data.expansionPlaybook.bestPractices.map((bp: string, i: number) => (
                  <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                    <span className="text-purple-400 shrink-0">▸</span>{bp}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* QBR Template */}
      {data.qbrTemplate && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-base">{data.qbrTemplate.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.qbrTemplate.description}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.qbrTemplate.agenda.map((section: any) => (
              <div key={section.section} className="rounded-lg border border-border p-3 space-y-2">
                <span className="text-xs font-bold">{section.section}</span>
                <ul className="space-y-1">
                  {section.items.map((item: string, i: number) => (
                    <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                      <span className="text-purple-400 shrink-0">▸</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Common Mistakes */}
      {data.commonMistakes && (
        <Card className="border-red-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              CSでよくある失敗
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {data.commonMistakes.map((mistake: string, i: number) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="shrink-0 mt-1 h-1 w-1 rounded-full bg-red-400/60" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
