"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Users,
  TrendingUp,
  Wrench,
  Briefcase,
} from "lucide-react";

interface Position {
  title: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  responsibilities: string[];
  skillset: string[];
  kpis: string[];
  tools: string[];
  headcountGuide: string;
  salaryRange: Record<string, string | null>;
  [key: string]: unknown;
}

interface RolesData {
  title: string;
  description: string;
  positions: Position[];
}

export function SmRoles({ data }: { data: RolesData }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-400" />
          {data.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
      </div>

      {/* ロールカード */}
      <div className="space-y-4">
        {data.positions.map((role) => {
          const isExpanded = expanded === role.title;

          return (
            <Card
              key={role.title}
              className="cursor-pointer transition-all border-l-4"
              style={{
                borderLeftColor: role.color,
                borderColor: isExpanded ? role.color + "60" : undefined,
              }}
              onClick={() => setExpanded(isExpanded ? null : role.title)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold"
                      style={{
                        backgroundColor: role.color + "15",
                        color: role.color,
                      }}
                    >
                      {role.category.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-sm">{role.title}</CardTitle>
                      <Badge
                        variant="outline"
                        className="text-[10px] mt-0.5"
                        style={{
                          borderColor: role.color + "40",
                          color: role.color,
                        }}
                      >
                        {role.category}
                      </Badge>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>

                {/* Collapsed: show description preview */}
                {!isExpanded && (
                  <p className="text-[10px] text-muted-foreground mt-2 line-clamp-2">
                    {role.description}
                  </p>
                )}
              </CardHeader>

              {isExpanded && (
                <CardContent
                  className="space-y-4 pt-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* 概要 */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>

                  {/* 業務内容 */}
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground mb-2 block">
                      主な業務内容
                    </span>
                    <ul className="space-y-1">
                      {role.responsibilities.map((task, i) => (
                        <li key={i} className="text-xs flex items-start gap-2">
                          <span style={{ color: role.color }} className="mt-0.5">
                            ▸
                          </span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* スキルセット */}
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground mb-2 block">
                      必須スキル
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {role.skillset.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
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
                          key={kpi}
                          className="rounded-lg border border-border p-2"
                        >
                          <div
                            className="text-xs font-medium"
                            style={{ color: role.color }}
                          >
                            {kpi}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ツール */}
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground mb-2 block flex items-center gap-1">
                      <Wrench className="h-3 w-3" />
                      使用ツール
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {role.tools.map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* ステージ別人数ガイド */}
                  <div className="rounded-lg bg-muted/30 border border-border p-3">
                    <span className="text-xs font-semibold text-muted-foreground mb-2 block flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      ステージ別人員ガイド
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {role.headcountGuide}
                    </p>
                  </div>

                  {/* 年収レンジ */}
                  {role.salaryRange && (
                    <div className="rounded-lg bg-muted/30 border border-border p-3">
                      <span className="text-xs font-semibold text-muted-foreground mb-2 block">
                        年収レンジ
                      </span>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {Object.entries(role.salaryRange)
                          .filter(([, v]) => v !== null)
                          .map(([level, range]) => (
                            <div
                              key={level}
                              className="flex items-center justify-between text-[11px]"
                            >
                              <span className="text-muted-foreground capitalize">{level}</span>
                              <span className="font-medium">{range}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
