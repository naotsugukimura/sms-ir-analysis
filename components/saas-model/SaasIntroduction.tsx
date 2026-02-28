"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Cloud,
  Package,
  Shield,
  Globe,
  DollarSign,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface SaasIntroData {
  definition: string;
  subtitle: string;
  everydayExamples: { name: string; description: string; icon: string }[];
  comparison: {
    dimensions: {
      label: string;
      packaged: string;
      saas: string;
      saasAdvantage: boolean;
    }[];
  };
  risks: { title: string; description: string }[];
  whyChosen: { title: string; description: string; relevance: string }[];
}

const EXAMPLE_ICONS: Record<string, string> = {
  film: "🎬",
  briefcase: "💼",
  message: "💬",
};

const WHY_ICONS = [DollarSign, RefreshCw, Globe];
const WHY_COLORS = ["#10B981", "#3B82F6", "#8B5CF6"];

const RISK_ICONS = [Shield, Globe, Package, DollarSign, AlertTriangle];
const RISK_COLOR = "#EF4444";

export function SaasIntroduction({ data }: { data: SaasIntroData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-muted-foreground">
        SaaSとは何か
      </h2>

      {/* ─── Section 1: Definition Hero Card ─── */}
      <Card className="border-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/20">
              <Cloud className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold">
                SaaS（Software as a Service）
              </h3>
              <p className="text-[10px] text-muted-foreground">
                {data.subtitle}
              </p>
            </div>
          </div>

          {/* Core definition */}
          <div className="mt-4 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4 text-center">
            <p className="text-xs font-bold text-blue-400">
              {data.definition}
            </p>
          </div>

          {/* Key phrase */}
          <div className="mt-3 text-center">
            <Badge className="bg-blue-500/20 text-[10px] text-blue-400">
              ソフトウェアを所有せず、月額料金で利用するモデル
            </Badge>
          </div>

          {/* Everyday examples */}
          <div className="mt-5">
            <p className="mb-2 text-[10px] font-bold text-muted-foreground">
              身近な例
            </p>
            <div className="grid gap-2 md:grid-cols-3">
              {data.everydayExamples.map((example) => (
                <div
                  key={example.name}
                  className="rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {EXAMPLE_ICONS[example.icon] ?? "☁️"}
                    </span>
                    <p className="text-xs font-bold">{example.name}</p>
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {example.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Section 2: Comparison Table ─── */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20">
              <Package className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold">パッケージソフトとの比較</h3>
              <p className="text-[10px] text-muted-foreground">
                従来型ソフトとSaaSの違い
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr>
                  <th className="p-2 text-left text-[10px] font-bold text-muted-foreground">
                    比較項目
                  </th>
                  <th className="p-2 text-center text-[10px] font-bold text-muted-foreground">
                    パッケージソフト
                  </th>
                  <th
                    className="rounded-t-lg p-2 text-center text-[10px] font-bold"
                    style={{
                      backgroundColor: "rgba(59, 130, 246, 0.08)",
                      color: "#3B82F6",
                    }}
                  >
                    SaaS
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.comparison.dimensions.map((dim, i) => (
                  <tr
                    key={dim.label}
                    className={i % 2 === 0 ? "bg-muted/20" : ""}
                  >
                    <td className="p-2 font-bold">{dim.label}</td>
                    <td className="p-2 text-center text-muted-foreground">
                      {dim.packaged}
                    </td>
                    <td
                      className="p-2 text-center"
                      style={{
                        backgroundColor: "rgba(59, 130, 246, 0.04)",
                      }}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {dim.saasAdvantage ? (
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <XCircle className="h-3 w-3 text-red-400" />
                        )}
                        <span
                          className={
                            dim.saasAdvantage
                              ? "text-emerald-400"
                              : "text-red-400"
                          }
                        >
                          {dim.saas}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ─── Section 3: Risks ─── */}
      <Card className="border-red-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/20">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold">SaaSのリスク・弱点</h3>
              <p className="text-[10px] text-muted-foreground">
                導入前に理解しておくべきデメリット
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {data.risks.map((risk, i) => {
              const Icon = RISK_ICONS[i % RISK_ICONS.length];
              return (
                <div
                  key={risk.title}
                  className="flex items-start gap-3 rounded-lg border p-3"
                  style={{ borderColor: `${RISK_COLOR}20` }}
                >
                  <div
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                    style={{
                      backgroundColor: `${RISK_COLOR}15`,
                      color: RISK_COLOR,
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">{risk.title}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {risk.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ─── Section 4: Why SaaS is Chosen ─── */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-muted-foreground">
          なぜSaaSが選ばれるのか
        </h3>
        <div className="grid gap-3 md:grid-cols-3">
          {data.whyChosen.map((item, i) => {
            const Icon = WHY_ICONS[i % WHY_ICONS.length];
            const color = WHY_COLORS[i % WHY_COLORS.length];
            return (
              <Card
                key={item.title}
                className="transition-all"
                style={{ borderColor: `${color}30` }}
              >
                <CardContent className="p-5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="mt-3 text-xs font-bold">{item.title}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {item.description}
                  </p>
                  <div
                    className="mt-3 rounded-md p-2"
                    style={{
                      backgroundColor: `${color}08`,
                      borderLeft: `3px solid ${color}`,
                    }}
                  >
                    <p className="text-[10px]" style={{ color }}>
                      {item.relevance}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
