"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, DollarSign, Shield, AlertCircle } from "lucide-react";

interface Competitor {
  id: string;
  product: string;
  company: string;
  companyOverview: {
    listed: string;
    revenue: string;
    employees: number;
    founded: number;
  };
  facilities: number;
  pricing: {
    monthly: string;
    initialCost: string;
    model: string;
  };
  strengths: string[];
  weaknesses: string[];
  moat: string;
}

export function CompetitorCards({ competitors }: { competitors: Competitor[] }) {
  const isKaipoke = (id: string) => id === "kaipoke";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">主要プレーヤー詳細</h3>
      <div className="grid gap-4 lg:grid-cols-2">
        {competitors.map((comp) => (
          <Card
            key={comp.id}
            className={isKaipoke(comp.id) ? "border-emerald-500/50" : ""}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {comp.product}
                  {isKaipoke(comp.id) && (
                    <Badge className="ml-2 bg-emerald-500/20 text-emerald-400 text-[10px]">
                      SMS
                    </Badge>
                  )}
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  {comp.facilities.toLocaleString()} 事業所
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{comp.company}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Company Overview */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-[10px]">
                  <Building2 className="mr-1 h-3 w-3" />
                  {comp.companyOverview.listed}
                </Badge>
                <Badge variant="secondary" className="text-[10px]">
                  <DollarSign className="mr-1 h-3 w-3" />
                  月額 {comp.pricing.monthly}
                </Badge>
                <Badge variant="secondary" className="text-[10px]">
                  初期 {comp.pricing.initialCost}
                </Badge>
              </div>

              {/* Strengths */}
              <div>
                <div className="mb-1 flex items-center gap-1">
                  <Shield className="h-3 w-3 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-400">強み</span>
                </div>
                <ul className="space-y-1">
                  {comp.strengths.slice(0, 3).map((s, i) => (
                    <li key={i} className="text-[11px] text-muted-foreground pl-2 border-l-2 border-emerald-500/30">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div>
                <div className="mb-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 text-orange-400" />
                  <span className="text-xs font-medium text-orange-400">弱み</span>
                </div>
                <ul className="space-y-1">
                  {comp.weaknesses.slice(0, 3).map((w, i) => (
                    <li key={i} className="text-[11px] text-muted-foreground pl-2 border-l-2 border-orange-500/30">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Moat */}
              <div className="rounded-lg bg-muted/50 p-2">
                <p className="text-[10px] font-medium text-muted-foreground mb-0.5">参入障壁 / Moat</p>
                <p className="text-[11px]">{comp.moat}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
