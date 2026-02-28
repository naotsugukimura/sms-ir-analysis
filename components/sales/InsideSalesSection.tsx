"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Users, Handshake } from "lucide-react";

export function InsideSalesSection({ data }: { data: any }) {
  const roleIcons: Record<string, any> = { SDR: Phone, BDR: Users, PartnerSales: Handshake };
  const roleColors: Record<string, string> = {
    SDR: "border-blue-500/30",
    BDR: "border-orange-500/30",
    PartnerSales: "border-purple-500/30",
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
    </div>
  );
}
