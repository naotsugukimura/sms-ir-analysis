"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Monitor,
  Calendar,
  CalendarDays,
  CalendarRange,
  Shield,
  TrendingUp,
  Wrench,
} from "lucide-react";

interface SubFunction {
  name: string;
  description: string;
  dailyTasks: string[];
  monthlyTasks?: string[];
  yearlyTasks?: string[];
  managedTools?: Record<string, string[]>;
  securityFramework?: Array<{
    area: string;
    measures: string[];
  }>;
}

interface KPI {
  name: string;
  target: string;
}

interface GAData {
  title: string;
  icon: string;
  color: string;
  description: string;
  subFunctions: SubFunction[];
  tools: string[];
  kpis: KPI[];
}

const toolCategoryLabels: Record<string, string> = {
  communication: "コミュニケーション",
  productivity: "生産性",
  security: "セキュリティ",
  device: "デバイス管理",
  network: "ネットワーク",
};

export function GeneralAffairsSection({ data }: { data: GAData }) {
  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-purple-400" />
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </CardContent>
      </Card>

      {data.subFunctions.map((func) => (
        <Card key={func.name} className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              {func.name.includes("総務") ? (
                <Building className="h-4 w-4 text-purple-400" />
              ) : (
                <Monitor className="h-4 w-4 text-purple-400" />
              )}
              {func.name}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{func.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 日次業務 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-xs font-semibold text-muted-foreground">日次業務</span>
              </div>
              <ul className="space-y-1">
                {func.dailyTasks.map((task, i) => (
                  <li key={i} className="text-xs flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">▸</span>{task}
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
                  <CalendarRange className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-xs font-semibold text-muted-foreground">年次業務</span>
                </div>
                <ul className="space-y-1">
                  {func.yearlyTasks.map((task, i) => (
                    <li key={i} className="text-xs flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">▸</span>{task}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 管理ツール一覧（情シス） */}
            {func.managedTools && (
              <div>
                <span className="text-xs font-semibold text-muted-foreground mb-2 block">管理ツール一覧</span>
                <div className="space-y-2">
                  {Object.entries(func.managedTools).map(([category, tools]) => (
                    <div key={category} className="flex items-start gap-2">
                      <Badge variant="outline" className="text-xs shrink-0">
                        {toolCategoryLabels[category] || category}
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {tools.map((tool) => (
                          <Badge key={tool} variant="secondary" className="text-xs">{tool}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* セキュリティフレームワーク */}
            {func.securityFramework && (
              <div className="rounded-lg border border-red-500/20 bg-red-950/10 p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-red-400" />
                  <span className="text-xs font-semibold text-red-400">情報セキュリティフレームワーク</span>
                </div>
                <div className="space-y-2">
                  {func.securityFramework.map((sf) => (
                    <div key={sf.area} className="rounded-lg bg-background/50 p-2">
                      <div className="text-xs font-semibold mb-1">{sf.area}</div>
                      <div className="flex flex-wrap gap-1">
                        {sf.measures.map((m) => (
                          <Badge key={m} variant="outline" className="text-xs">{m}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* KPI */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-purple-400" />
            総務・情シス KPI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {data.kpis.map((kpi) => (
              <div key={kpi.name} className="rounded-lg border border-border p-2 text-center">
                <div className="text-xs text-muted-foreground">{kpi.name}</div>
                <div className="text-sm font-bold text-purple-400 mt-0.5">{kpi.target}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
