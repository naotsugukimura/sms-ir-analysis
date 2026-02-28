"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserPlus,
  Award,
  Heart,
  TrendingUp,
  Wrench,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Channel {
  channel: string;
  ratio: string;
  cost: string;
  quality: string;
}

interface Process {
  step: number;
  name: string;
  detail: string;
}

interface Grade {
  grade: string;
  title: string;
  description: string;
}

interface CompElement {
  element: string;
  description: string;
}

interface SubFunction {
  name: string;
  description: string;
  dailyTasks?: string[];
  processes?: Process[];
  channels?: Channel[];
  frameworks?: Array<{
    name: string;
    description: string;
    levels?: Grade[];
    cycle?: string;
    process?: string[];
    components?: CompElement[];
  }>;
  activities?: string[];
}

interface KPI {
  name: string;
  target: string;
}

interface HRData {
  title: string;
  icon: string;
  color: string;
  description: string;
  subFunctions: SubFunction[];
  tools: string[];
  kpis: KPI[];
}

const costColors: Record<string, string> = {
  "最低": "bg-emerald-500/20 text-emerald-400",
  "低": "bg-blue-500/20 text-blue-400",
  "中": "bg-amber-500/20 text-amber-400",
  "高（年収35%）": "bg-red-500/20 text-red-400",
};

const qualityColors: Record<string, string> = {
  "最高": "bg-emerald-500/20 text-emerald-400",
  "高": "bg-blue-500/20 text-blue-400",
  "中-高": "bg-cyan-500/20 text-cyan-400",
  "中": "bg-amber-500/20 text-amber-400",
};

export function HumanResourcesSection({ data }: { data: HRData }) {
  const [expandedFunc, setExpandedFunc] = useState<string | null>("採用（Recruiting）");

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </CardContent>
      </Card>

      {/* サブ機能 */}
      {data.subFunctions.map((func) => {
        const isExpanded = expandedFunc === func.name;
        return (
          <Card key={func.name} className="border-l-4 border-l-blue-500">
            <button
              className="w-full text-left"
              onClick={() => setExpandedFunc(isExpanded ? null : func.name)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    {func.name === "採用（Recruiting）" && <UserPlus className="h-4 w-4 text-blue-400" />}
                    {func.name === "人事制度・評価（HR Operations）" && <Award className="h-4 w-4 text-blue-400" />}
                    {func.name === "組織開発（Organization Development）" && <Heart className="h-4 w-4 text-blue-400" />}
                    {func.name}
                  </CardTitle>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{func.description}</p>
              </CardHeader>
            </button>

            {isExpanded && (
              <CardContent className="space-y-4 pt-0">
                {/* 日次業務 */}
                {func.dailyTasks && (
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground mb-2 block">日次業務</span>
                    <ul className="space-y-1">
                      {func.dailyTasks.map((task, i) => (
                        <li key={i} className="text-xs flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>{task}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 採用プロセス */}
                {func.processes && (
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground mb-2 block">採用プロセス</span>
                    <div className="space-y-2">
                      {func.processes.map((proc) => (
                        <div key={proc.step} className="flex items-start gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                            {proc.step}
                          </div>
                          <div>
                            <div className="text-xs font-semibold">{proc.name}</div>
                            <div className="text-xs text-muted-foreground">{proc.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 採用チャネル */}
                {func.channels && (
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground mb-2 block">採用チャネル構成</span>
                    <div className="space-y-2">
                      {func.channels.map((ch) => (
                        <div key={ch.channel} className="rounded-lg border border-border p-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold">{ch.channel}</span>
                            <Badge variant="secondary" className="text-xs">{ch.ratio}</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={`text-xs ${costColors[ch.cost] || ""}`}>
                              コスト: {ch.cost}
                            </Badge>
                            <Badge className={`text-xs ${qualityColors[ch.quality] || ""}`}>
                              質: {ch.quality}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 人事フレームワーク */}
                {func.frameworks && func.frameworks.map((fw) => (
                  <div key={fw.name} className="rounded-lg border border-border p-3 space-y-2">
                    <div className="text-sm font-semibold">{fw.name}</div>
                    <p className="text-xs text-muted-foreground">{fw.description}</p>

                    {/* 等級 */}
                    {fw.levels && (
                      <div className="space-y-1">
                        {fw.levels.map((level) => (
                          <div key={level.grade} className="flex items-center gap-3 rounded bg-muted/30 px-2 py-1">
                            <Badge variant="outline" className="text-xs font-mono min-w-[3rem] justify-center">
                              {level.grade}
                            </Badge>
                            <span className="text-xs font-medium min-w-[5rem]">{level.title}</span>
                            <span className="text-xs text-muted-foreground">{level.description}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 評価プロセス */}
                    {fw.process && (
                      <div>
                        <Badge variant="outline" className="text-xs mb-2">サイクル: {fw.cycle}</Badge>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {fw.process.map((step, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <Badge variant="secondary" className="text-xs">{step}</Badge>
                              {i < fw.process!.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 報酬構成 */}
                    {fw.components && (
                      <div className="grid grid-cols-2 gap-2">
                        {fw.components.map((comp) => (
                          <div key={comp.element} className="rounded bg-muted/30 p-2">
                            <div className="text-xs font-semibold">{comp.element}</div>
                            <div className="text-xs text-muted-foreground">{comp.description}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* 組織開発の活動 */}
                {func.activities && (
                  <ul className="space-y-1">
                    {func.activities.map((act, i) => (
                      <li key={i} className="text-xs flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>{act}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            )}
          </Card>
        );
      })}

      {/* ツール & KPI */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Wrench className="h-4 w-4 text-blue-400" />
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
              <TrendingUp className="h-4 w-4 text-blue-400" />
              人事 KPI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {data.kpis.map((kpi) => (
                <div key={kpi.name} className="rounded-lg border border-border p-2 text-center">
                  <div className="text-xs text-muted-foreground">{kpi.name}</div>
                  <div className="text-sm font-bold text-blue-400 mt-0.5">{kpi.target}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
