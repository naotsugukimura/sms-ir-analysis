"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, FileText, Shield, Landmark, TrendingUp, Wrench } from "lucide-react";
import { GaSectionExtras } from "./GaSectionExtras";

interface SaasContract {
  type: string;
  description: string;
  frequency: string;
}

interface ComplianceArea {
  area: string;
  laws: string[];
  actions: string[];
}

interface SubFunction {
  name: string;
  description: string;
  dailyTasks?: string[];
  saasContracts?: SaasContract[];
  areas?: ComplianceArea[];
  tasks?: string[];
}

interface KPI {
  name: string;
  target: string;
}

interface LegalData {
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

export function LegalSection({ data }: { data: LegalData }) {
  return (
    <div className="space-y-6">
      <Card className="border-amber-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-amber-400" />
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </CardContent>
      </Card>

      {data.subFunctions.map((func) => (
        <Card key={func.name} className="border-l-4 border-l-amber-500">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              {func.name === "契約法務" && <FileText className="h-4 w-4 text-amber-400" />}
              {func.name === "コンプライアンス" && <Shield className="h-4 w-4 text-amber-400" />}
              {func.name === "IPO準備法務（成長フェーズ）" && <Landmark className="h-4 w-4 text-amber-400" />}
              {func.name}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{func.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 日次業務 */}
            {func.dailyTasks && (
              <div>
                <span className="text-xs font-semibold text-muted-foreground mb-2 block">日次業務</span>
                <ul className="space-y-1">
                  {func.dailyTasks.map((task, i) => (
                    <li key={i} className="text-xs flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">▸</span>{task}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SaaS契約類型 */}
            {func.saasContracts && (
              <div>
                <span className="text-xs font-semibold text-muted-foreground mb-2 block">SaaS特有の契約類型</span>
                <div className="space-y-2">
                  {func.saasContracts.map((contract) => (
                    <div key={contract.type} className="rounded-lg border border-border p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold">{contract.type}</span>
                        <Badge variant="outline" className="text-xs">{contract.frequency}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{contract.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* コンプライアンス領域 */}
            {func.areas && (
              <div className="space-y-3">
                {func.areas.map((area) => (
                  <div key={area.area} className="rounded-lg border border-border p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{area.area}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {area.laws.map((law) => (
                        <Badge key={law} variant="secondary" className="text-xs">{law}</Badge>
                      ))}
                    </div>
                    <ul className="space-y-0.5">
                      {area.actions.map((action, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-amber-400">•</span>{action}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* IPO準備タスク */}
            {func.tasks && (
              <ul className="space-y-1">
                {func.tasks.map((task, i) => (
                  <li key={i} className="text-xs flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">▸</span>{task}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      ))}

      {/* ツール & KPI */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Wrench className="h-4 w-4 text-amber-400" />
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
              <TrendingUp className="h-4 w-4 text-amber-400" />
              法務 KPI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {data.kpis.map((kpi) => (
                <div key={kpi.name} className="rounded-lg border border-border p-2 text-center">
                  <div className="text-xs text-muted-foreground">{kpi.name}</div>
                  <div className="text-sm font-bold text-amber-400 mt-0.5">{kpi.target}</div>
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
