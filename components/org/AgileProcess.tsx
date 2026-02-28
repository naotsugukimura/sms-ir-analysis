"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  RefreshCw,
  Calendar,
  Users,
  Clock,
  Target,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  FileText,
} from "lucide-react";

interface Ceremony {
  name: string;
  timing: string;
  duration: string;
  participants: string[];
  purpose: string;
  outputs?: string[];
  format?: string | string[];
  tips: string[];
}

interface Role {
  name: string;
  responsibility: string;
  tasks: string[];
  ratio: string;
}

interface Artifact {
  name: string;
  owner: string;
  description: string;
}

interface AgileData {
  title: string;
  description: string;
  sprintCycle: {
    duration: string;
    ceremonies: Ceremony[];
  };
  roles: Role[];
  artifacts: Artifact[];
}

const ceremonyColors: Record<string, string> = {
  "スプリントプランニング": "border-blue-500/50 bg-blue-950/20",
  "デイリースクラム": "border-green-500/50 bg-green-950/20",
  "スプリントレビュー": "border-amber-500/50 bg-amber-950/20",
  "レトロスペクティブ": "border-purple-500/50 bg-purple-950/20",
  "バックログリファインメント": "border-cyan-500/50 bg-cyan-950/20",
};

const ceremonyIcons: Record<string, string> = {
  "スプリントプランニング": "🗓️",
  "デイリースクラム": "☀️",
  "スプリントレビュー": "🎬",
  "レトロスペクティブ": "🔄",
  "バックログリファインメント": "✂️",
};

export function AgileProcess({ data }: { data: AgileData }) {
  const [expandedCeremony, setExpandedCeremony] = useState<string | null>(
    "スプリントプランニング"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-blue-400" />
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">{data.description}</p>
          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
            スプリント周期: {data.sprintCycle.duration}
          </Badge>
        </CardContent>
      </Card>

      {/* セレモニー一覧 */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          スクラムセレモニー
        </h3>
        {data.sprintCycle.ceremonies.map((ceremony) => {
          const isExpanded = expandedCeremony === ceremony.name;
          const colorClass = ceremonyColors[ceremony.name] || "border-border";
          const icon = ceremonyIcons[ceremony.name] || "📌";

          return (
            <Card key={ceremony.name} className={colorClass}>
              <button
                className="w-full text-left"
                onClick={() =>
                  setExpandedCeremony(isExpanded ? null : ceremony.name)
                }
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span>{icon}</span>
                      {ceremony.name}
                    </CardTitle>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="mr-1 h-3 w-3" />
                      {ceremony.duration}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="mr-1 h-3 w-3" />
                      {ceremony.timing}
                    </Badge>
                  </div>
                </CardHeader>
              </button>

              {isExpanded && (
                <CardContent className="space-y-4 pt-0">
                  {/* 目的 */}
                  <div className="rounded-lg bg-background/50 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-3.5 w-3.5 text-blue-400" />
                      <span className="text-xs font-semibold text-muted-foreground">目的</span>
                    </div>
                    <p className="text-sm">{ceremony.purpose}</p>
                  </div>

                  {/* 参加者 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-3.5 w-3.5 text-blue-400" />
                      <span className="text-xs font-semibold text-muted-foreground">参加者</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ceremony.participants.map((p) => (
                        <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* フォーマット（ある場合） */}
                  {ceremony.format && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-xs font-semibold text-muted-foreground">フォーマット</span>
                      </div>
                      {Array.isArray(ceremony.format) ? (
                        <ul className="space-y-1">
                          {ceremony.format.map((f, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-blue-400 mt-0.5">•</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Badge variant="outline">{ceremony.format}</Badge>
                      )}
                    </div>
                  )}

                  {/* アウトプット */}
                  {ceremony.outputs && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs font-semibold text-muted-foreground">アウトプット</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {ceremony.outputs.map((o) => (
                          <Badge key={o} className="bg-emerald-500/20 text-emerald-400 text-xs">
                            {o}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tips */}
                  <div className="rounded-lg bg-amber-950/20 border border-amber-500/20 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-xs font-semibold text-amber-400">Tips</span>
                    </div>
                    <ul className="space-y-1">
                      {ceremony.tips.map((tip, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* スクラムロール & アーティファクト */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* ロール */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              スクラムロール
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.roles.map((role) => (
              <div key={role.name} className="space-y-2 rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{role.name}</span>
                  <Badge variant="outline" className="text-xs">{role.ratio}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{role.responsibility}</p>
                <div className="flex flex-wrap gap-1">
                  {role.tasks.map((task) => (
                    <Badge key={task} variant="secondary" className="text-xs">
                      {task}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* アーティファクト */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              スクラムアーティファクト
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.artifacts.map((artifact) => (
              <div key={artifact.name} className="space-y-1.5 rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{artifact.name}</span>
                  <Badge variant="outline" className="text-xs">Owner: {artifact.owner}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{artifact.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
