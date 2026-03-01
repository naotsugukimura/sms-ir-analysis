"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Server, ShieldCheck, Cloud, Wrench, TrendingUp, DollarSign, Users } from "lucide-react";

interface KPI {
  name: string;
  target: string;
}

interface TechStack {
  [category: string]: string[];
}

interface SalaryRange {
  junior: string;
  mid: string;
  senior: string;
  lead: string;
}

interface Role {
  name: string;
  icon: string;
  color: string;
  description: string;
  techStack: TechStack;
  dailyTasks: string[];
  kpis: KPI[];
  salaryRange?: SalaryRange;
  headcountGuide?: string;
}

interface RolesData {
  title: string;
  description: string;
  roles: Role[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Server,
  ShieldCheck,
  Cloud,
};

export function EngineeringRoles({ data }: { data: RolesData }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Wrench className="h-5 w-5 text-blue-400" />
          {data.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
      </div>

      {/* ロールカード */}
      <div className="grid gap-6 lg:grid-cols-2">
        {data.roles.map((role) => {
          const Icon = iconMap[role.icon] || Monitor;
          return (
            <Card
              key={role.name}
              className="border-l-4"
              style={{ borderLeftColor: role.color }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: role.color + "20", color: role.color }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  {role.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground">{role.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 技術スタック */}
                <div>
                  <span className="text-xs font-semibold text-muted-foreground mb-2 block">
                    技術スタック
                  </span>
                  <div className="space-y-2">
                    {Object.entries(role.techStack).map(([category, techs]) => (
                      <div key={category} className="flex items-start gap-2">
                        <Badge variant="outline" className="text-xs shrink-0 capitalize">
                          {category}
                        </Badge>
                        <div className="flex flex-wrap gap-1">
                          {techs.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 日常業務 */}
                <div>
                  <span className="text-xs font-semibold text-muted-foreground mb-2 block">
                    日常業務
                  </span>
                  <ul className="space-y-1">
                    {role.dailyTasks.map((task, i) => (
                      <li key={i} className="text-xs flex items-start gap-2">
                        <span style={{ color: role.color }} className="mt-0.5">▸</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* KPI */}
                <div>
                  <span className="text-xs font-semibold text-muted-foreground mb-2 block flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    KPI
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {role.kpis.map((kpi) => (
                      <div
                        key={kpi.name}
                        className="rounded-lg border border-border p-2 text-center"
                      >
                        <div className="text-xs text-muted-foreground">{kpi.name}</div>
                        <div
                          className="text-sm font-bold mt-0.5"
                          style={{ color: role.color }}
                        >
                          {kpi.target}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 年収レンジ & 人員ガイド */}
                {(role.salaryRange || role.headcountGuide) && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {role.salaryRange && (
                      <div className="rounded-lg border border-border p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-xs font-semibold text-muted-foreground">年収レンジ</span>
                        </div>
                        <div className="space-y-1.5">
                          {Object.entries(role.salaryRange).map(([level, range]) => {
                            const labels: Record<string, string> = { junior: "ジュニア", mid: "ミドル", senior: "シニア", lead: "リード" };
                            return (
                              <div key={level} className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">{labels[level] || level}</span>
                                <span className="text-xs font-semibold" style={{ color: role.color }}>{range}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {role.headcountGuide && (
                      <div className="rounded-lg border border-border p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-3.5 w-3.5 text-blue-400" />
                          <span className="text-xs font-semibold text-muted-foreground">成長フェーズ別人員</span>
                        </div>
                        <div className="space-y-1.5">
                          {role.headcountGuide.split(", ").map((item) => {
                            const [stage, count] = item.split(": ");
                            return (
                              <div key={stage} className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">{stage}</span>
                                <span className="text-xs font-semibold" style={{ color: role.color }}>{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
