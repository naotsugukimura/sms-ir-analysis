"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Users,
  Handshake,
  MessageSquare,
  PhoneOutgoing,
  ShieldAlert,
  Target,
  Calendar,
  AlertTriangle,
} from "lucide-react";

export function InsideSalesSection({ data }: { data: any }) {
  const roleIcons: Record<string, any> = { SDR: Phone, BDR: Users, PartnerSales: Handshake };
  const roleColors: Record<string, string> = {
    SDR: "border-blue-500/30",
    BDR: "border-orange-500/30",
    PartnerSales: "border-purple-500/30",
  };

  const priorityColors: Record<string, string> = {
    red: "bg-red-500/10 text-red-400 border-red-500/30",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    gray: "bg-gray-500/10 text-gray-400 border-gray-500/30",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Phone className="h-6 w-6 text-yellow-400" />
        <h2 className="text-xl font-bold">{data.title}</h2>
      </div>
      <p className="text-xs text-muted-foreground">{data.description}</p>

      {/* Roles */}
      <div className="grid gap-4 lg:grid-cols-3">
        {data.roles.map((role: any) => {
          const Icon = roleIcons[role.role] || Phone;
          return (
            <Card key={role.role} className={roleColors[role.role]}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <div>
                    <CardTitle className="text-base">{role.role}</CardTitle>
                    <p className="text-[10px] text-muted-foreground">{role.nameJa}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">{role.description}</p>

                <div>
                  <p className="text-[10px] font-medium text-muted-foreground mb-1">特徴</p>
                  <ul className="space-y-1">
                    {role.characteristics.map((c: string, i: number) => (
                      <li key={i} className="text-[10px] text-muted-foreground">• {c}</li>
                    ))}
                  </ul>
                </div>

                {role.dayInLife && (
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground mb-1">1日のスケジュール</p>
                    <div className="space-y-0.5">
                      {role.dayInLife.map((item: string, i: number) => (
                        <p key={i} className="text-[10px] text-muted-foreground font-mono">{item}</p>
                      ))}
                    </div>
                  </div>
                )}

                {role.partnerTypes && (
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground mb-1">パートナー種別</p>
                    {role.partnerTypes.map((p: any) => (
                      <div key={p.type} className="rounded border border-border p-2 mb-1">
                        <p className="text-[10px] font-medium">{p.type}</p>
                        <p className="text-[10px] text-muted-foreground">{p.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* KPIs */}
                <div className="rounded-lg bg-muted/50 p-2">
                  <p className="text-[10px] font-medium mb-1">KPI</p>
                  {Object.entries(role.kpi).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Keyword Investment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{data.keywordInvestment.title}</CardTitle>
          <p className="text-xs text-muted-foreground">{data.keywordInvestment.principle}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.keywordInvestment.tiers.map((tier: any) => (
            <div key={tier.tier} className="rounded-lg border border-border p-3 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">{tier.tier}</Badge>
                <span className="text-[10px] text-muted-foreground">検索量: {tier.searchVolume}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {tier.keywords.map((kw: string) => (
                  <Badge key={kw} variant="outline" className="text-[10px]">{kw}</Badge>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">{tier.action}</p>
              <Badge className="bg-yellow-500/20 text-yellow-400 text-[10px]">{tier.investmentRatio}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* SDR Script */}
      {data.sdrScript && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-amber-400" />
              <CardTitle className="text-base">{data.sdrScript.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.sdrScript.description}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.sdrScript.phases.map((phase: any, i: number) => (
              <div key={phase.phase} className="rounded-lg border border-l-4 border-l-amber-500 border-border p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500/20 text-amber-400 text-[10px]">{phase.phase}</Badge>
                  <span className="text-[10px] text-muted-foreground">{phase.goal}</span>
                </div>
                <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-2">
                  <p className="text-[10px] italic text-muted-foreground">「{phase.script}」</p>
                </div>
                {phase.questions && (
                  <div>
                    <span className="text-[10px] font-medium text-muted-foreground">ヒアリング質問例:</span>
                    <ul className="mt-1 space-y-0.5">
                      {phase.questions.map((q: string, j: number) => (
                        <li key={j} className="text-[10px] text-muted-foreground">? {q}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <ul className="space-y-0.5">
                  {phase.tips.map((tip: string, j: number) => (
                    <li key={j} className="text-[10px] text-muted-foreground flex items-start gap-1">
                      <span className="text-amber-400 shrink-0">▸</span>{tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* BDR Script */}
      {data.bdrScript && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PhoneOutgoing className="h-5 w-5 text-orange-400" />
              <CardTitle className="text-base">{data.bdrScript.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.bdrScript.description}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.bdrScript.phases.map((phase: any) => (
              <div key={phase.phase} className="rounded-lg border border-l-4 border-l-orange-500 border-border p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-500/20 text-orange-400 text-[10px]">{phase.phase}</Badge>
                  <span className="text-[10px] text-muted-foreground">{phase.goal}</span>
                </div>
                <div className="rounded-lg bg-orange-500/5 border border-orange-500/20 p-2">
                  <p className="text-[10px] italic text-muted-foreground">「{phase.script}」</p>
                </div>
                <ul className="space-y-0.5">
                  {phase.tips.map((tip: string, j: number) => (
                    <li key={j} className="text-[10px] text-muted-foreground flex items-start gap-1">
                      <span className="text-orange-400 shrink-0">▸</span>{tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Objection Handling */}
      {data.objectionHandling && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-400" />
              <CardTitle className="text-base">{data.objectionHandling.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.objectionHandling.description}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.objectionHandling.patterns.map((pattern: any) => (
              <div key={pattern.objection} className="rounded-lg border border-border p-3 space-y-2">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="text-[10px] shrink-0 border-red-500/30 text-red-400">断り</Badge>
                  <span className="text-xs font-medium">「{pattern.objection}」</span>
                </div>
                <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-2">
                  <span className="text-[10px] font-medium text-amber-400">切り返し: </span>
                  <span className="text-[10px] text-muted-foreground">「{pattern.response}」</span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  <span className="font-medium">原則:</span> {pattern.principle}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Lead Scoring Model */}
      {data.leadScoringModel && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-400" />
              <CardTitle className="text-base">{data.leadScoringModel.title}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{data.leadScoringModel.description}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.leadScoringModel.tiers.map((tier: any) => (
              <div key={tier.priority} className="rounded-lg border border-border p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-[10px] ${priorityColors[tier.color] || ""}`}>
                    {tier.priority}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tier.conditions.map((cond: string) => (
                    <Badge key={cond} variant="secondary" className="text-[10px]">{cond}</Badge>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground">{tier.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Weekly Workflow */}
      {data.weeklyWorkflow && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-400" />
              <CardTitle className="text-base">{data.weeklyWorkflow.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.weeklyWorkflow.schedule.map((day: any) => (
                <div key={day.day} className="flex gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-12 items-center justify-center rounded-md bg-amber-500/10 text-xs font-bold text-amber-400 shrink-0">
                    {day.day}
                  </div>
                  <ul className="space-y-0.5 flex-1">
                    {day.tasks.map((task: string, i: number) => (
                      <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                        <span className="text-amber-400 shrink-0">▸</span>{task}
                      </li>
                    ))}
                  </ul>
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
              ISでよくある失敗
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
