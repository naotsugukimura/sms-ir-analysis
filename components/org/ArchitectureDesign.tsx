"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Shield, Cloud, Cpu, Database, Lock, DollarSign } from "lucide-react";

interface Pattern {
  name: string;
  phase: string;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

interface AwsService {
  service: string;
  purpose: string;
  icon: string;
}

interface AwsLayer {
  name: string;
  services: AwsService[];
}

interface CostOpt {
  strategy: string;
  saving: string;
  target: string;
}

interface SecurityLayer {
  layer: string;
  measures: string[];
}

interface ArchData {
  title: string;
  description: string;
  patterns: Pattern[];
  awsArchitecture: {
    title: string;
    layers: AwsLayer[];
    costOptimization: CostOpt[];
  };
  securityLayers: SecurityLayer[];
}

const layerIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "CDN / Edge": Cloud,
  "コンピュート": Cpu,
  "データ": Database,
  "メッセージング / 非同期": Server,
  "監視 / セキュリティ": Shield,
  "CI/CD": Server,
};

const layerColors: Record<string, string> = {
  "CDN / Edge": "#3B82F6",
  "コンピュート": "#10B981",
  "データ": "#F59E0B",
  "メッセージング / 非同期": "#8B5CF6",
  "監視 / セキュリティ": "#EF4444",
  "CI/CD": "#06B6D4",
};

export function ArchitectureDesign({ data }: { data: ArchData }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Server className="h-5 w-5 text-purple-400" />
          {data.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
      </div>

      {/* アーキテクチャパターン */}
      <div className="grid gap-4 md:grid-cols-2">
        {data.patterns.map((pattern) => (
          <Card
            key={pattern.name}
            className={
              pattern.phase.includes("初期")
                ? "border-blue-500/30"
                : "border-purple-500/30"
            }
          >
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>{pattern.name}</span>
                <Badge
                  variant="outline"
                  className={
                    pattern.phase.includes("初期")
                      ? "border-blue-500/50 text-blue-400"
                      : "border-purple-500/50 text-purple-400"
                  }
                >
                  {pattern.phase}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{pattern.description}</p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 block mb-1">
                    ✓ メリット
                  </span>
                  <ul className="space-y-0.5">
                    {pattern.pros.map((p, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-emerald-400">+</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-semibold text-red-400 block mb-1">
                    ✗ デメリット
                  </span>
                  <ul className="space-y-0.5">
                    {pattern.cons.map((c, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-red-400">−</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-2">
                <span className="text-xs text-muted-foreground">推奨環境: </span>
                <span className="text-xs font-medium">{pattern.bestFor}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AWS アーキテクチャ */}
      <Card className="border-amber-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Cloud className="h-5 w-5 text-amber-400" />
            {data.awsArchitecture.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.awsArchitecture.layers.map((layer) => {
            const Icon = layerIcons[layer.name] || Server;
            const color = layerColors[layer.name] || "#6B7280";

            return (
              <div key={layer.name} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded"
                    style={{ backgroundColor: color + "20", color }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-semibold">{layer.name}</span>
                </div>
                <div className="ml-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {layer.services.map((svc) => (
                    <div
                      key={svc.service}
                      className="rounded-lg border border-border p-2 flex items-start gap-2"
                    >
                      <span className="text-lg">{svc.icon}</span>
                      <div>
                        <div className="text-xs font-semibold">{svc.service}</div>
                        <div className="text-xs text-muted-foreground">{svc.purpose}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* コスト最適化 */}
          <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">コスト最適化戦略</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {data.awsArchitecture.costOptimization.map((opt) => (
                <div key={opt.strategy} className="rounded-lg bg-background/50 p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{opt.strategy}</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                      {opt.saving}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">対象: {opt.target}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* セキュリティレイヤー */}
      <Card className="border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lock className="h-5 w-5 text-red-400" />
            セキュリティレイヤー
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.securityLayers.map((layer, i) => (
              <div key={layer.layer} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-xs font-bold text-red-400">
                  L{i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1">{layer.layer}</div>
                  <div className="flex flex-wrap gap-1">
                    {layer.measures.map((m) => (
                      <Badge key={m} variant="outline" className="text-xs">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
