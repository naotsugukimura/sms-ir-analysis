"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Target, MessageSquare, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";

interface Issue {
  id: number;
  managementIssue: string;
  causeL: string;
  causeS: string;
  detail: string;
  idealState: string;
  mainMessage: string;
  valueProposition: string;
  output: string;
  outcome: string;
  closing: string;
}

interface Column {
  key: string;
  label: string;
  color: string;
}

export function IssueSheetCards({ issues, columns }: { issues: Issue[]; columns: Column[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const managementIssueGroups = issues.reduce<Record<string, Issue[]>>((acc, issue) => {
    if (!acc[issue.managementIssue]) acc[issue.managementIssue] = [];
    acc[issue.managementIssue].push(issue);
    return acc;
  }, {});

  const _ = columns; // acknowledge prop

  return (
    <div className="space-y-6">
      {Object.entries(managementIssueGroups).map(([groupName, groupIssues]) => (
        <div key={groupName} className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
              経営課題
            </Badge>
            <h3 className="text-sm font-semibold">{groupName}</h3>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {groupIssues.map((issue) => {
              const isExpanded = expandedId === issue.id;
              return (
                <Card
                  key={issue.id}
                  className="cursor-pointer transition-all hover:border-emerald-500/30"
                  onClick={() => setExpandedId(isExpanded ? null : issue.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-400">
                            {issue.causeL}
                          </Badge>
                        </div>
                        <CardTitle className="text-sm">{issue.causeS}</CardTitle>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="space-y-3 pt-0">
                      {/* 課題詳細 */}
                      <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-[10px] font-medium text-muted-foreground mb-1">課題詳細</p>
                        <p className="text-xs">{issue.detail}</p>
                      </div>

                      {/* 理想状態 */}
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-medium text-blue-400">こうなったらいいよね</p>
                          <p className="text-xs">{issue.idealState}</p>
                        </div>
                      </div>

                      {/* メインメッセージ */}
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-medium text-purple-400">メインメッセージ</p>
                          <p className="text-xs font-medium">{issue.mainMessage}</p>
                        </div>
                      </div>

                      {/* 利便性と価値 */}
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-medium text-emerald-400">利便性と価値</p>
                          <p className="text-xs">{issue.valueProposition}</p>
                        </div>
                      </div>

                      {/* アウトプット → アウトカム */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2">
                          <p className="text-[10px] font-medium text-emerald-400 mb-0.5">
                            <CheckCircle2 className="inline h-3 w-3 mr-1" />アウトプット
                          </p>
                          <p className="text-[10px]">{issue.output}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="flex-1 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2">
                          <p className="text-[10px] font-medium text-emerald-400 mb-0.5">
                            <CheckCircle2 className="inline h-3 w-3 mr-1" />アウトカム
                          </p>
                          <p className="text-[10px]">{issue.outcome}</p>
                        </div>
                      </div>

                      {/* クロージング */}
                      <div className="rounded-lg border border-pink-500/20 bg-pink-500/5 p-3">
                        <p className="text-[10px] font-medium text-pink-400 mb-1">🎯 クロージング</p>
                        <p className="text-xs italic">&ldquo;{issue.closing}&rdquo;</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
