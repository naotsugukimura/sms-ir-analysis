"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Megaphone,
  Search,
  Monitor,
  MapPin,
  FileText,
  Mail,
  Calendar,
  DollarSign,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export function MarketingSection({ data }: { data: any }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Megaphone className="h-6 w-6 text-blue-400" />
        <h2 className="text-xl font-bold">{data.title}</h2>
      </div>

      {/* Online - Paid */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-base">{data.online.paid.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.online.paid.channels.map((channel: any) => (
            <div key={channel.channel} className="space-y-3">
              <h4 className="text-sm font-medium">{channel.channel}</h4>
              <p className="text-xs text-muted-foreground">{channel.description}</p>

              {channel.keywords && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-2 text-muted-foreground">キーワード</th>
                        <th className="text-right p-2 text-muted-foreground">検索量</th>
                        <th className="text-right p-2 text-muted-foreground">CPC</th>
                        <th className="text-center p-2 text-muted-foreground">意図</th>
                        <th className="text-center p-2 text-muted-foreground">優先度</th>
                      </tr>
                    </thead>
                    <tbody>
                      {channel.keywords.map((kw: any) => (
                        <tr key={kw.keyword} className="border-b border-border/50">
                          <td className="p-2 font-medium">{kw.keyword}</td>
                          <td className="p-2 text-right text-muted-foreground">{kw.searchVolume}</td>
                          <td className="p-2 text-right text-muted-foreground">{kw.cpc}</td>
                          <td className="p-2 text-center">
                            <Badge variant="outline" className={`text-[10px] ${kw.intent === "高" ? "border-red-500/30 text-red-400" : "border-orange-500/30 text-orange-400"}`}>
                              {kw.intent}
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <Badge variant="secondary" className="text-[10px]">{kw.priority}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {channel.budgetGuideline && (
                <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                  <p className="text-xs font-medium">予算ガイドライン</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div><span className="text-[10px] text-muted-foreground">月額予算:</span> <span className="text-xs font-medium">{channel.budgetGuideline.monthly}</span></div>
                    {channel.budgetGuideline.targetCPA && <div><span className="text-[10px] text-muted-foreground">目標CPA:</span> <span className="text-xs font-medium">{channel.budgetGuideline.targetCPA}</span></div>}
                    {channel.budgetGuideline.targetCPSQL && <div><span className="text-[10px] text-muted-foreground">目標CPSQL:</span> <span className="text-xs font-medium">{channel.budgetGuideline.targetCPSQL}</span></div>}
                  </div>
                  {channel.budgetGuideline.optimizationTips && (
                    <ul className="space-y-1 mt-2">
                      {channel.budgetGuideline.optimizationTips.map((tip: string, i: number) => (
                        <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                          <span className="text-blue-400 shrink-0">▸</span>{tip}
                        </li>
                      ))}
                    </ul>
                  )}
                  {channel.budgetGuideline.tips && (
                    <ul className="space-y-1 mt-2">
                      {channel.budgetGuideline.tips.map((tip: string, i: number) => (
                        <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                          <span className="text-blue-400 shrink-0">▸</span>{tip}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Budget allocation */}
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
            <p className="text-xs font-medium text-blue-400 mb-2">広告費の最適配分</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(data.online.paid.totalBudgetAllocation).map(([key, value]) => (
                <Badge key={key} variant="secondary" className="text-[10px]">
                  {key}: {value as string}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Online - SEO */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-emerald-400" />
            <CardTitle className="text-base">{data.online.seo.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">{data.online.seo.description}</p>

          <div className="grid gap-3 md:grid-cols-3">
            {data.online.seo.strategy.map((s: any) => (
              <div key={s.category} className="rounded-lg border border-border p-3 space-y-2">
                <Badge variant="secondary" className="text-[10px]">{s.category}</Badge>
                <ul className="space-y-1">
                  {s.examples.map((ex: string, i: number) => (
                    <li key={i} className="text-[10px] text-muted-foreground">• {ex}</li>
                  ))}
                </ul>
                <p className="text-[10px]">
                  <span className="text-muted-foreground">CV path:</span> {s.conversionPath}
                </p>
              </div>
            ))}
          </div>

          {/* Paid vs SEO ratio */}
          <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
            <p className="text-xs font-medium text-emerald-400 mb-2">Paid vs SEO の理想比率</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {Object.entries(data.online.seo.vsPayd.idealRatio).map(([period, ratio]: [string, any]) => (
                <div key={period} className="rounded border border-border p-2 text-center">
                  <p className="text-[10px] text-muted-foreground">{period}</p>
                  <p className="text-xs">Paid <span className="font-bold">{ratio.paid}</span> / SEO <span className="font-bold">{ratio.seo}</span></p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Offline */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-orange-400" />
            <CardTitle className="text-base">{data.offline.exhibitions.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-muted-foreground">イベント</th>
                  <th className="text-center p-2 text-muted-foreground">頻度</th>
                  <th className="text-center p-2 text-muted-foreground">規模</th>
                  <th className="text-right p-2 text-muted-foreground">費用</th>
                  <th className="text-right p-2 text-muted-foreground">期待リード</th>
                </tr>
              </thead>
              <tbody>
                {data.offline.exhibitions.majorEvents.map((ev: any) => (
                  <tr key={ev.name} className="border-b border-border/50">
                    <td className="p-2 font-medium">{ev.name}</td>
                    <td className="p-2 text-center text-muted-foreground">{ev.frequency}</td>
                    <td className="p-2 text-center text-muted-foreground">{ev.scale}</td>
                    <td className="p-2 text-right text-muted-foreground">{ev.cost}</td>
                    <td className="p-2 text-right font-medium">{ev.expected}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs font-medium mb-2">年間計画</p>
            {Object.entries(data.offline.exhibitions.annualPlan).map(([key, value]) => (
              <p key={key} className="text-[10px] text-muted-foreground">• {key}: {value as string}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Marketing */}
      {data.contentMarketing && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-base">{data.contentMarketing.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.contentMarketing.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.contentMarketing.contentTypes.map((ct: any) => (
              <div key={ct.type} className="rounded-lg border border-border p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{ct.type}</span>
                  <Badge variant="outline" className="text-[10px] text-blue-400 border-blue-500/30">{ct.kpi}</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">{ct.purpose}</p>
                <div>
                  <span className="text-[10px] font-medium text-muted-foreground">コンテンツ例:</span>
                  <ul className="mt-1 space-y-0.5">
                    {ct.examples.map((ex: string, i: number) => (
                      <li key={i} className="text-[10px] text-muted-foreground">• {ex}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-muted-foreground">制作フロー:</span>
                  <div className="flex flex-wrap items-center gap-1 mt-1">
                    {ct.productionFlow.map((step: string, i: number) => (
                      <span key={i} className="flex items-center gap-1">
                        <Badge variant="secondary" className="text-[10px]">{step}</Badge>
                        {i < ct.productionFlow.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Annual Content Calendar */}
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
              <p className="text-xs font-medium text-blue-400 mb-2">年間コンテンツカレンダー</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {Object.entries(data.contentMarketing.annualContentCalendar).map(([quarter, focus]) => (
                  <div key={quarter} className="rounded border border-border p-2">
                    <span className="text-[10px] font-medium">{quarter}</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{focus as string}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* MA Strategy */}
      {data.maStrategy && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-base">{data.maStrategy.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.maStrategy.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Lead Scoring */}
            <div className="space-y-3">
              <p className="text-xs font-medium">{data.maStrategy.leadScoring.title}</p>
              <div className="grid gap-3 md:grid-cols-2">
                {/* Attributes */}
                <div className="rounded-lg border border-border p-3">
                  <span className="text-[10px] font-semibold text-muted-foreground">属性スコア</span>
                  <div className="mt-2 space-y-1.5">
                    {data.maStrategy.leadScoring.attributes.map((attr: any) => (
                      <div key={attr.item} className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">{attr.item}</span>
                        <Badge variant="secondary" className="text-[10px] font-mono">{attr.score}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Behaviors */}
                <div className="rounded-lg border border-border p-3">
                  <span className="text-[10px] font-semibold text-muted-foreground">行動スコア</span>
                  <div className="mt-2 space-y-1.5">
                    {data.maStrategy.leadScoring.behaviors.map((beh: any) => (
                      <div key={beh.item} className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">{beh.item}</span>
                        <Badge variant="secondary" className={`text-[10px] font-mono ${beh.score.startsWith("-") ? "bg-red-500/10 text-red-400" : ""}`}>{beh.score}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Thresholds */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(data.maStrategy.leadScoring.thresholds).map(([level, desc]) => (
                  <Badge key={level} variant="outline" className="text-[10px]">
                    {level}: {desc as string}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Nurturing Flows */}
            <div className="space-y-3">
              <p className="text-xs font-medium">ナーチャリングフロー</p>
              {data.maStrategy.nurturingFlows.map((flow: any) => (
                <div key={flow.name} className="rounded-lg border border-border p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{flow.name}</span>
                    <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400">
                      トリガー: {flow.trigger}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {flow.steps.map((step: string, i: number) => (
                      <p key={i} className="text-[10px] text-muted-foreground font-mono">{step}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Workflow */}
      {data.weeklyWorkflow && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-base">{data.weeklyWorkflow.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.weeklyWorkflow.schedule.map((day: any) => (
                <div key={day.day} className="flex gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-12 items-center justify-center rounded-md bg-blue-500/10 text-xs font-bold text-blue-400 shrink-0">
                    {day.day}
                  </div>
                  <ul className="space-y-0.5 flex-1">
                    {day.tasks.map((task: string, i: number) => (
                      <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                        <span className="text-blue-400 shrink-0">▸</span>{task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Budget Simulation */}
      {data.budgetSimulation && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-base">{data.budgetSimulation.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.budgetSimulation.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {data.budgetSimulation.scenarios.map((scenario: any) => (
                <div key={scenario.budget} className="rounded-lg border border-border p-3 space-y-3">
                  <div className="text-xs font-bold text-blue-400">{scenario.budget}</div>
                  <div className="space-y-1">
                    {Object.entries(scenario.allocation).map(([item, amount]) => (
                      <div key={item} className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">{item}</span>
                        <span className="font-medium">{amount as string}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded bg-blue-500/5 border border-blue-500/20 p-2 text-center">
                    <p className="text-[10px] text-muted-foreground">期待リード: <span className="font-bold text-blue-400">{scenario.expectedLeads}</span></p>
                    <p className="text-[10px] text-muted-foreground">期待SQL: <span className="font-bold text-blue-400">{scenario.expectedSQL}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Common Mistakes */}
      {data.commonMistakes && (
        <Card className="border-red-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              マーケティングでよくある失敗
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
