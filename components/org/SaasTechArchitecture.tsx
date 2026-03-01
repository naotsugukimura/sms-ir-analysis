"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  Globe,
  Shield,
  Cloud,
  GitBranch,
  CheckCircle2,
  XCircle,
  Server,
  Zap,
  Lock,
  Wrench,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export function SaasTechArchitecture({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Layers className="h-5 w-5 text-blue-400" />
          {data.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{data.subtitle}</p>
      </div>

      {/* ── Section 1: マルチテナンシー ── */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Server className="h-4 w-4 text-blue-400" />
            {data.multiTenancy.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {data.multiTenancy.description}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {data.multiTenancy.patterns.map((pattern: any) => (
            <Card key={pattern.name} className="border-t-4" style={{ borderTopColor: pattern.color }}>
              <CardHeader className="pb-2">
                <div
                  className="rounded-lg px-3 py-2 mb-2"
                  style={{ backgroundColor: pattern.color + "15" }}
                >
                  <CardTitle className="text-sm" style={{ color: pattern.color }}>
                    {pattern.name}
                  </CardTitle>
                  <span className="text-[10px] text-muted-foreground">{pattern.nameEn}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">{pattern.description}</p>

                {/* Pros */}
                <div>
                  <span className="text-[11px] font-semibold text-emerald-400 block mb-1">
                    メリット
                  </span>
                  <ul className="space-y-0.5">
                    {pattern.pros.map((p: string, i: number) => (
                      <li key={i} className="text-[11px] text-muted-foreground flex items-start gap-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <span className="text-[11px] font-semibold text-red-400 block mb-1">
                    デメリット
                  </span>
                  <ul className="space-y-0.5">
                    {pattern.cons.map((c: string, i: number) => (
                      <li key={i} className="text-[11px] text-muted-foreground flex items-start gap-1">
                        <XCircle className="h-3 w-3 text-red-400 shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best for */}
                <div className="rounded-lg bg-muted/50 p-2">
                  <span className="text-[10px] text-muted-foreground">推奨: </span>
                  <span className="text-[11px] font-medium">{pattern.bestFor}</span>
                </div>

                {/* Examples */}
                <div className="flex flex-wrap gap-1">
                  {pattern.examples.map((ex: string) => (
                    <Badge
                      key={ex}
                      variant="outline"
                      className="text-[10px]"
                      style={{ borderColor: pattern.color + "50", color: pattern.color }}
                    >
                      {ex}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Section 2: API & インテグレーション経済圏 ── */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-400" />
            {data.apiEconomy.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {data.apiEconomy.description}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.apiEconomy.apiTypes.map((api: any) => (
            <Card key={api.name} className="border-l-4" style={{ borderLeftColor: api.color }}>
              <CardHeader className="pb-2">
                <div
                  className="rounded-lg px-3 py-2"
                  style={{ backgroundColor: api.color + "15" }}
                >
                  <CardTitle className="text-sm" style={{ color: api.color }}>
                    {api.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">{api.description}</p>

                <div className="rounded-lg bg-muted/50 p-2">
                  <span className="text-[10px] text-muted-foreground block">最適な用途</span>
                  <span className="text-[11px] font-medium">{api.bestFor}</span>
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-2">
                  <span className="text-[10px] text-emerald-400 block mb-0.5">ベンチマーク</span>
                  <span className="text-[11px] text-muted-foreground">{api.benchmark}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Section 3: セキュリティ認証 ── */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-400" />
            {data.security.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {data.security.description}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {data.security.certifications.map((cert: any) => (
            <Card key={cert.name} className="border-t-4" style={{ borderTopColor: cert.color }}>
              <CardHeader className="pb-2">
                <div
                  className="rounded-lg px-3 py-2"
                  style={{ backgroundColor: cert.color + "15" }}
                >
                  <CardTitle className="text-sm" style={{ color: cert.color }}>
                    {cert.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">{cert.description}</p>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-border p-2 text-center">
                    <div className="text-[10px] text-muted-foreground">難易度</div>
                    <div className="text-xs font-bold mt-0.5" style={{ color: cert.color }}>
                      {cert.difficulty}
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-2 text-center">
                    <div className="text-[10px] text-muted-foreground">コスト</div>
                    <div className="text-[11px] font-bold mt-0.5" style={{ color: cert.color }}>
                      {cert.cost}
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-2 text-center">
                    <div className="text-[10px] text-muted-foreground">期間</div>
                    <div className="text-xs font-bold mt-0.5" style={{ color: cert.color }}>
                      {cert.duration}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-2">
                  <span className="text-[10px] text-emerald-400 block mb-0.5">ビジネスインパクト</span>
                  <span className="text-[11px] text-muted-foreground">{cert.impact}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Section 4: インフラ選択 ── */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Cloud className="h-4 w-4 text-blue-400" />
            {data.infrastructure.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {data.infrastructure.description}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {data.infrastructure.providers.map((provider: any) => (
            <Card key={provider.name} className="border-t-4" style={{ borderTopColor: provider.color }}>
              <CardHeader className="pb-2">
                <div
                  className="rounded-lg px-3 py-2 flex items-center justify-between"
                  style={{ backgroundColor: provider.color + "15" }}
                >
                  <CardTitle className="text-sm" style={{ color: provider.color }}>
                    {provider.name}
                  </CardTitle>
                  <Badge
                    className="text-[10px]"
                    style={{ backgroundColor: provider.color + "20", color: provider.color }}
                  >
                    {provider.share}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-[10px] text-muted-foreground block mb-1">強み</span>
                  <p className="text-[11px]">{provider.strength}</p>
                </div>

                <div className="rounded-lg bg-muted/50 p-2">
                  <span className="text-[10px] text-muted-foreground block">最適なSaaS</span>
                  <span className="text-[11px] font-medium">{provider.bestFor}</span>
                </div>

                <div className="rounded-lg border border-border p-2">
                  <span className="text-[10px] text-muted-foreground block mb-1">SaaS推奨スタック</span>
                  <div className="flex flex-wrap gap-1">
                    {provider.saasStack.split(" + ").map((item: string) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="text-[10px]"
                        style={{ borderColor: provider.color + "50", color: provider.color }}
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Section 5: CI/CD & DevOps ── */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-blue-400" />
            {data.cicd.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {data.cicd.description}
          </p>
        </div>

        {/* Benchmarks Table */}
        <Card className="border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-400" />
              DORA Metrics ベンチマーク
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 text-[11px] text-muted-foreground font-semibold">
                      メトリクス
                    </th>
                    <th className="text-center py-2 px-2">
                      <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px]">Elite</Badge>
                    </th>
                    <th className="text-center py-2 px-2">
                      <Badge className="bg-blue-500/20 text-blue-400 text-[10px]">High</Badge>
                    </th>
                    <th className="text-center py-2 px-2">
                      <Badge className="bg-amber-500/20 text-amber-400 text-[10px]">Medium</Badge>
                    </th>
                    <th className="text-center py-2 px-2">
                      <Badge className="bg-red-500/20 text-red-400 text-[10px]">Low</Badge>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.cicd.benchmarks.map((bm: any) => (
                    <tr key={bm.metric} className="border-b border-border/50">
                      <td className="py-2 px-2 text-[11px] font-semibold">{bm.metric}</td>
                      <td className="py-2 px-2 text-center text-[11px] text-emerald-400">{bm.elite}</td>
                      <td className="py-2 px-2 text-center text-[11px] text-blue-400">{bm.high}</td>
                      <td className="py-2 px-2 text-center text-[11px] text-amber-400">{bm.medium}</td>
                      <td className="py-2 px-2 text-center text-[11px] text-red-400">{bm.low}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Tools */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.cicd.tools.map((tool: any) => (
            <div
              key={tool.name}
              className="rounded-lg border border-border p-3 space-y-1"
            >
              <div className="flex items-center gap-2">
                <Wrench className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-xs font-semibold">{tool.name}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{tool.usage}</p>
            </div>
          ))}
        </div>

        {/* Emerald callout */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
          <div className="flex items-start gap-2">
            <Zap className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-emerald-400 block mb-1">
                Elite パフォーマンスの実現
              </span>
              <p className="text-[11px] text-muted-foreground">
                DORA Metrics の Elite レベルを達成するSaaS企業は、デプロイ頻度が1日複数回、リードタイムが1時間以内を実現しています。これにはCI/CDパイプラインの完全自動化、フィーチャーフラグによるリリース制御、カナリアリリースによる段階的ロールアウトが不可欠です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
