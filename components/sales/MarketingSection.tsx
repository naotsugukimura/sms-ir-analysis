"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Search, Monitor, MapPin } from "lucide-react";

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
                        <li key={i} className="text-[10px] text-muted-foreground">💡 {tip}</li>
                      ))}
                    </ul>
                  )}
                  {channel.budgetGuideline.tips && (
                    <ul className="space-y-1 mt-2">
                      {channel.budgetGuideline.tips.map((tip: string, i: number) => (
                        <li key={i} className="text-[10px] text-muted-foreground">💡 {tip}</li>
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
    </div>
  );
}
