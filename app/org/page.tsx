"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionNav, type SectionDef } from "@/components/layout/SectionNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Megaphone,
  Code,
  Building,
  ArrowRight,
  ArrowDown,
  Users,
  DollarSign,
  Lightbulb,
  RefreshCw,
} from "lucide-react";

const UNITS = [
  {
    key: "sm",
    name: "S&M",
    fullName: "Sales & Marketing",
    nameJa: "営業・マーケティング",
    color: "#3B82F6",
    icon: Megaphone,
    href: "/sales/the-model",
    costRatio: "30-50%",
    mission: "顧客を見つけ、獲得し、売上を作る",
    keyRoles: ["マーケター", "SDR/BDR", "フィールドセールス", "カスタマーサクセス"],
    keyMetrics: ["CAC", "MQL→SQL転換率", "Win Rate", "NRR"],
    keyProcesses: ["The Model（Marketing→IS→FS→CS）", "SPIN話法", "ファネル管理"],
    outputToOthers: [
      { to: "R&D", flow: "顧客の声・要望フィードバック", type: "info" },
      { to: "G&A", flow: "売上実績・契約データ", type: "data" },
    ],
  },
  {
    key: "rd",
    name: "R&D",
    fullName: "Research & Development",
    nameJa: "研究・開発",
    color: "#10B981",
    icon: Code,
    href: "/org/rd",
    costRatio: "20-35%",
    mission: "顧客の課題を解決するプロダクトを作る",
    keyRoles: ["PdM", "フロントエンド", "バックエンド", "QA", "インフラ/SRE"],
    keyMetrics: ["Velocity", "バグ率", "リリース頻度", "DORA Metrics"],
    keyProcesses: ["アジャイル/スクラム", "スプリント", "USM→PRD→開発→QA→リリース"],
    outputToOthers: [
      { to: "S&M", flow: "新機能・改善リリース情報", type: "product" },
      { to: "G&A", flow: "開発コスト・リソース計画", type: "data" },
    ],
  },
  {
    key: "ga",
    name: "G&A",
    fullName: "General & Administrative",
    nameJa: "管理部門",
    color: "#8B5CF6",
    icon: Building,
    href: "/org/ga",
    costRatio: "10-20%",
    mission: "組織全体の基盤を支え、経営を健全に保つ",
    keyRoles: ["経理", "人事", "法務", "総務/情シス", "経営企画"],
    keyMetrics: ["人件費率", "採用リードタイム", "コンプライアンス遵守率"],
    keyProcesses: ["月次決算サイクル", "採用→オンボーディング", "予実管理"],
    outputToOthers: [
      { to: "S&M", flow: "予算配分・採用支援", type: "resource" },
      { to: "R&D", flow: "予算配分・採用支援・法務チェック", type: "resource" },
    ],
  },
];

const CROSS_FLOWS = [
  {
    name: "プロダクトフィードバックループ",
    icon: RefreshCw,
    color: "#F59E0B",
    description: "S&Mが顧客の声を集め → R&Dがプロダクトに反映 → S&Mが新機能で売る",
    steps: [
      { unit: "S&M", action: "CS/FSが顧客課題・要望を収集", color: "#3B82F6" },
      { unit: "R&D", action: "PdMが優先順位付け → スプリントで開発", color: "#10B981" },
      { unit: "S&M", action: "新機能をリリースノートで告知 → アップセル提案", color: "#3B82F6" },
    ],
  },
  {
    name: "採用・組織スケール",
    icon: Users,
    color: "#EC4899",
    description: "事業成長に合わせてG&Aが採用計画を立て、各ユニットに人材を供給する",
    steps: [
      { unit: "S&M/R&D", action: "事業計画に基づく増員リクエスト", color: "#6B7280" },
      { unit: "G&A", action: "予算確保 → 採用活動 → オファー", color: "#8B5CF6" },
      { unit: "全ユニット", action: "オンボーディング → 戦力化", color: "#6B7280" },
    ],
  },
  {
    name: "予実管理・経営判断",
    icon: DollarSign,
    color: "#10B981",
    description: "G&Aが各ユニットの数字を統合し、経営判断の材料を提供する",
    steps: [
      { unit: "S&M", action: "売上・パイプライン実績を報告", color: "#3B82F6" },
      { unit: "R&D", action: "開発進捗・コスト実績を報告", color: "#10B981" },
      { unit: "G&A", action: "統合して月次レポート → 経営会議", color: "#8B5CF6" },
    ],
  },
  {
    name: "新規事業・PMF検証",
    icon: Lightbulb,
    color: "#F59E0B",
    description: "新たな機能/サービスのPMF検証を3ユニットが連携して実行する",
    steps: [
      { unit: "S&M", action: "市場ニーズの仮説立案 → 顧客ヒアリング", color: "#3B82F6" },
      { unit: "R&D", action: "MVP開発 → ベータリリース", color: "#10B981" },
      { unit: "S&M", action: "ベータユーザーのフィードバック収集", color: "#3B82F6" },
      { unit: "G&A", action: "事業性評価 → 投資判断サポート", color: "#8B5CF6" },
    ],
  },
];

const COST_STRUCTURE = {
  title: "SaaS企業の典型的なコスト構造",
  description: "売上に対する各ユニットのコスト比率（成長ステージにより変動）",
  items: [
    { name: "S&M", ratio: "30-50%", description: "成長ステージで最も大きい。成熟するにつれ効率化。", color: "#3B82F6" },
    { name: "R&D", ratio: "20-35%", description: "プロダクト投資。バーティカルSaaSは制度対応で高め。", color: "#10B981" },
    { name: "G&A", ratio: "10-20%", description: "管理コスト。スケールすると比率は低下。", color: "#8B5CF6" },
    { name: "COGS", ratio: "15-30%", description: "売上原価（インフラ+BPO人件費）。粗利率70-85%。", color: "#6B7280" },
  ],
};

const SECTIONS: SectionDef[] = [
  { id: "units", label: "3ユニット" },
  { id: "cost-structure", label: "コスト構造" },
  { id: "cross-flows", label: "連携フロー" },
  { id: "detail-links", label: "詳細リンク" },
];

export default function OrgOverviewPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="SaaS組織 全体マップ"
        description="S&M（営業）/ R&D（開発）/ G&A（管理）の3つの機能組織がどう連携してSaaS事業を動かすか"
      />

      <SectionNav sections={SECTIONS} />

      {/* 3 Unit Cards - Z-pattern top row */}
      <section id="units">
      <div className="grid gap-4 md:grid-cols-3">
        {UNITS.map((unit) => {
          const Icon = unit.icon;
          return (
            <Link key={unit.key} href={unit.href}>
              <Card className="group h-full border transition-all hover:shadow-lg hover:shadow-black/20" style={{ borderColor: unit.color + "40" }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: unit.color + "20", color: unit.color }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{unit.name}</CardTitle>
                        <p className="text-[10px] text-muted-foreground">{unit.fullName}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">{unit.mission}</p>

                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground mb-1">主要な役割</p>
                    <div className="flex flex-wrap gap-1">
                      {unit.keyRoles.map((role) => (
                        <Badge key={role} variant="outline" className="text-[10px]">{role}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground mb-1">主要KPI</p>
                    <div className="flex flex-wrap gap-1">
                      {unit.keyMetrics.map((m) => (
                        <Badge key={m} variant="secondary" className="text-[10px]" style={{ backgroundColor: unit.color + "15", color: unit.color }}>
                          {m}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-md bg-muted/50 px-2 py-1.5">
                    <span className="text-[10px] text-muted-foreground">コスト比率: </span>
                    <span className="text-xs font-bold" style={{ color: unit.color }}>{unit.costRatio}</span>
                    <span className="text-[10px] text-muted-foreground"> of 売上</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
      </section>

      {/* Cost Structure Bar */}
      <section id="cost-structure">
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{COST_STRUCTURE.title}</CardTitle>
          <p className="text-xs text-muted-foreground">{COST_STRUCTURE.description}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {COST_STRUCTURE.items.map((item) => {
              const maxPct = parseInt(item.ratio.split("-")[1]) || parseInt(item.ratio);
              return (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="w-10 text-xs font-bold" style={{ color: item.color }}>{item.name}</span>
                  <div className="flex-1 h-6 bg-muted/30 rounded-md overflow-hidden relative">
                    <div
                      className="h-full rounded-md transition-all"
                      style={{ width: `${maxPct}%`, backgroundColor: item.color + "30" }}
                    />
                    <span className="absolute inset-0 flex items-center px-2 text-[10px] font-medium">
                      {item.ratio} — {item.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      </section>

      {/* Cross-functional Flows */}
      <section id="cross-flows">
      <div>
        <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-amber-400" />
          ユニット間の有機的な連携フロー
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {CROSS_FLOWS.map((flow) => {
            const FlowIcon = flow.icon;
            return (
              <Card key={flow.name} className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FlowIcon className="h-4 w-4" style={{ color: flow.color }} />
                    {flow.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{flow.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {flow.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="flex flex-col items-center">
                          <div
                            className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                            style={{ backgroundColor: step.color }}
                          >
                            {i + 1}
                          </div>
                          {i < flow.steps.length - 1 && (
                            <div className="w-px h-4 bg-border" />
                          )}
                        </div>
                        <div className="flex-1 pb-1">
                          <Badge variant="outline" className="text-[10px] mb-0.5" style={{ borderColor: step.color + "40", color: step.color }}>
                            {step.unit}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{step.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      </section>

      {/* Detail Links */}
      <section id="detail-links">
      <div className="grid gap-3 sm:grid-cols-3">
        {UNITS.map((unit) => {
          const Icon = unit.icon;
          return (
            <Link
              key={unit.key}
              href={unit.href}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: unit.color + "20", color: unit.color }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">{unit.name} 詳細を見る</p>
                <p className="text-xs text-muted-foreground">{unit.nameJa}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          );
        })}
      </div>
      </section>
    </div>
  );
}
