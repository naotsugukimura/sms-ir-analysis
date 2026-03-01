"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  Target,
  GitMerge,
  Megaphone,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { GaSectionExtras } from "./GaSectionExtras";

interface Framework {
  name: string;
  purpose: string;
}

interface MAProcess {
  phase: string;
  detail: string;
}

interface IRMaterial {
  name: string;
  frequency: string;
  audience: string;
}

interface SubFunction {
  name: string;
  description: string;
  activities?: string[];
  frameworks?: Framework[];
  process?: MAProcess[];
  materials?: IRMaterial[];
}

interface KPI {
  name: string;
  target: string;
}

interface CPData {
  title: string;
  icon: string;
  color: string;
  description: string;
  subFunctions: SubFunction[];
  tools: string[];
  kpis: KPI[];
  salaryRange?: Record<string, string>;
  headcountGuide?: string;
  bestPractices?: string[];
  commonMistakes?: string[];
}

export function CorporatePlanningSection({ data }: { data: CPData }) {
  return (
    <div className="space-y-6">
      <Card className="border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-red-400" />
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </CardContent>
      </Card>

      {data.subFunctions.map((func) => (
        <Card key={func.name} className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              {func.name === "戦略企画" && <Target className="h-4 w-4 text-red-400" />}
              {func.name === "M&A・アライアンス" && <GitMerge className="h-4 w-4 text-red-400" />}
              {func.name === "IR（Investor Relations）" && <Megaphone className="h-4 w-4 text-red-400" />}
              {func.name}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{func.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 主要活動 */}
            {func.activities && (
              <div>
                <span className="text-xs font-semibold text-muted-foreground mb-2 block">主要活動</span>
                <ul className="space-y-1">
                  {func.activities.map((act, i) => (
                    <li key={i} className="text-xs flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">▸</span>{act}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 戦略フレームワーク */}
            {func.frameworks && (
              <div>
                <span className="text-xs font-semibold text-muted-foreground mb-2 block">活用フレームワーク</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {func.frameworks.map((fw) => (
                    <div key={fw.name} className="rounded-lg border border-border p-2 text-center">
                      <div className="text-xs font-bold text-red-400">{fw.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{fw.purpose}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* M&Aプロセス */}
            {func.process && (
              <div>
                <span className="text-xs font-semibold text-muted-foreground mb-2 block">M&A プロセス</span>
                <div className="space-y-2">
                  {func.process.map((proc, i) => (
                    <div key={proc.phase} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-400">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{proc.phase}</div>
                        <div className="text-xs text-muted-foreground">{proc.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IR資料 */}
            {func.materials && (
              <div>
                <span className="text-xs font-semibold text-muted-foreground mb-2 block">IR 開示資料</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-1.5 px-2 font-semibold text-muted-foreground">資料名</th>
                        <th className="text-left py-1.5 px-2 font-semibold text-muted-foreground">頻度</th>
                        <th className="text-left py-1.5 px-2 font-semibold text-muted-foreground">対象</th>
                      </tr>
                    </thead>
                    <tbody>
                      {func.materials.map((mat) => (
                        <tr key={mat.name} className="border-b border-border/50">
                          <td className="py-1.5 px-2 font-medium">{mat.name}</td>
                          <td className="py-1.5 px-2">
                            <Badge variant="outline" className="text-xs">{mat.frequency}</Badge>
                          </td>
                          <td className="py-1.5 px-2 text-muted-foreground">{mat.audience}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* ツール & KPI */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Wrench className="h-4 w-4 text-red-400" />
              利用ツール
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.tools.map((tool) => (
                <Badge key={tool} variant="outline">{tool}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-red-400" />
              経営企画 KPI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {data.kpis.map((kpi) => (
                <div key={kpi.name} className="rounded-lg border border-border p-2 text-center">
                  <div className="text-xs text-muted-foreground">{kpi.name}</div>
                  <div className="text-sm font-bold text-red-400 mt-0.5">{kpi.target}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <GaSectionExtras
        color={data.color}
        salaryRange={data.salaryRange}
        headcountGuide={data.headcountGuide}
        bestPractices={data.bestPractices}
        commonMistakes={data.commonMistakes}
      />
    </div>
  );
}
