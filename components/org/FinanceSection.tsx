"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Calendar, CalendarDays, CalendarRange, TrendingUp, Wrench, Zap } from "lucide-react";

interface SubFunction {
  name: string;
  description: string;
  dailyTasks: string[];
  monthlyTasks?: string[];
  yearlyTasks?: string[];
  tools: string[];
  saasSpecific: string[];
}

interface KPI {
  name: string;
  target: string;
}

interface FinanceData {
  title: string;
  icon: string;
  color: string;
  description: string;
  subFunctions: SubFunction[];
  kpis: KPI[];
}

export function FinanceSection({ data }: { data: FinanceData }) {
  return (
    <div className="space-y-6">
      <Card className="border-emerald-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-400" />
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </CardContent>
      </Card>

      {data.subFunctions.map((func) => (
        <Card key={func.name} className="border-l-4 border-l-emerald-500">
          <CardHeader>
            <CardTitle className="text-base">{func.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{func.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 日次業務 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-muted-foreground">日次業務</span>
              </div>
              <ul className="space-y-1">
                {func.dailyTasks.map((task, i) => (
                  <li key={i} className="text-xs flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">▸</span>{task}
                  </li>
                ))}
              </ul>
            </div>

            {/* 月次業務 */}
            {func.monthlyTasks && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CalendarDays className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs font-semibold text-muted-foreground">月次業務</span>
                </div>
                <ul className="space-y-1">
                  {func.monthlyTasks.map((task, i) => (
                    <li key={i} className="text-xs flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">▸</span>{task}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 年次業務 */}
            {func.yearlyTasks && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CalendarRange className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-xs font-semibold text-muted-foreground">年次業務</span>
                </div>
                <ul className="space-y-1">
                  {func.yearlyTasks.map((task, i) => (
                    <li key={i} className="text-xs flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">▸</span>{task}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SaaS特有 */}
            <div className="rounded-lg bg-emerald-950/20 border border-emerald-500/20 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">SaaS特有の業務</span>
              </div>
              <ul className="space-y-1">
                {func.saasSpecific.map((item, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-400">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* ツール */}
            <div className="flex items-center gap-2 flex-wrap">
              <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
              {func.tools.map((tool) => (
                <Badge key={tool} variant="outline" className="text-xs">{tool}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* KPI */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            経理・財務 KPI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {data.kpis.map((kpi) => (
              <div key={kpi.name} className="rounded-lg border border-border p-2 text-center">
                <div className="text-xs text-muted-foreground">{kpi.name}</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">{kpi.target}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
