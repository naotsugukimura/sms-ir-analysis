import Link from "next/link";
import {
  Microscope,
  BarChart3,
  Briefcase,
  ArrowRight,
  BookOpen,
  Users,
  Target,
  Building2,
  Brain,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkline } from "@/components/ui/sparkline";

// --- SMS 実例企業データ（FY2025 確定値 / FY2026 Q3累計より） ---
const SMS_KPIS = [
  {
    label: "売上高",
    value: "552億円",
    meta: "FY2025",
    delta: "+5.3% YoY",
    positive: true,
    sparkline: [35850, 39800, 44600, 52400, 55200],
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-500/5",
  },
  {
    label: "介護SaaS売上",
    value: "158億円",
    meta: "FY2025 / カイポケ",
    delta: "+17.0% YoY",
    positive: true,
    sparkline: [8200, 9800, 11500, 13500, 15800],
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
  },
  {
    label: "営業利益率",
    value: "11.5%",
    meta: "FY2025",
    delta: "SaaS水準を維持",
    positive: true,
    sparkline: [12.0, 13.0, 13.0, 11.8, 11.5],
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
  },
  {
    label: "従業員数",
    value: "4,731名",
    meta: "FY2026 Q3",
    delta: "東証プライム上場",
    positive: true,
    sparkline: [3050, 3280, 3520, 3800, 4000],
    color: "text-purple-400",
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
  },
];

// --- 5章学習マップ ---
const CHAPTERS = [
  {
    num: "01",
    title: "SaaSとは",
    subtitle: "定義・収益構造・主要指標",
    href: "/saas-model",
    icon: Microscope,
    gradient: "from-blue-600 to-cyan-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    topics: ["SaaSの定義", "ARR / MRR", "NRR / Churn", "SaaS分類・Moat"],
    smsLabel: null,
    smsHref: null,
  },
  {
    num: "02",
    title: "財務・数字を読む",
    subtitle: "P&L構造・成長ステージ・Rule of 40",
    href: "/timeline",
    icon: BarChart3,
    gradient: "from-emerald-600 to-green-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    topics: ["SaaS P&Lの見方", "Magic Number", "Rule of 40", "成長ステージ"],
    smsLabel: "SMS財務推移（FY2021-2025）",
    smsHref: "/timeline",
  },
  {
    num: "03",
    title: "戦略・市場",
    subtitle: "GTM・競争優位・市場環境",
    href: "/market",
    icon: Target,
    gradient: "from-amber-600 to-yellow-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    topics: ["GTM戦略", "Land & Expand", "競争優位・Moat", "市場環境分析"],
    smsLabel: "介護ICT市場・競合ポジション",
    smsHref: "/market",
  },
  {
    num: "04",
    title: "組織・実行",
    subtitle: "S&M / R&D / CS の構造と指標",
    href: "/org",
    icon: Users,
    gradient: "from-violet-600 to-purple-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
    topics: ["S&M組織とKPI", "The Model", "CSとリテンション", "コスト構造"],
    smsLabel: null,
    smsHref: null,
  },
  {
    num: "05",
    title: "セールス実践",
    subtitle: "現場で使うスクリプト・ツール",
    href: "/sales/spin-script",
    icon: Briefcase,
    gradient: "from-rose-600 to-pink-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-400",
    topics: ["SPIN話法", "IS架電スクリプト", "課題整理シート", "商談設計"],
    smsLabel: "介護SaaS営業シナリオ",
    smsHref: "/sales/spin-script",
  },
];

// --- リファレンス ---
const REFERENCES = [
  {
    title: "ケーススタディ",
    subtitle: "グローバル5社＋日本5社",
    href: "/case-studies",
    icon: Building2,
    detail:
      "Salesforce, HubSpot, SmartHR, freee 等 10社の成長ストーリーと財務パターン",
    gradient: "from-rose-600 to-orange-500",
    border: "border-rose-500/30",
    text: "text-rose-400",
  },
  {
    title: "AI × SaaS",
    subtitle: "AIがSaaSを変える",
    href: "/ai-saas",
    icon: Brain,
    detail:
      "AI-native vs AI-enhanced、Copilot / Agent / Platform モデル、福祉SaaS×AI",
    gradient: "from-violet-600 to-fuchsia-500",
    border: "border-violet-500/30",
    text: "text-violet-400",
  },
  {
    title: "SaaS用語集",
    subtitle: "50+の重要指標と定義",
    href: "/glossary",
    icon: BookOpen,
    detail:
      "計算式・ベンチマーク・アクションティップ付き。NRR, CAC, LTV, Rule of 40 等",
    gradient: "from-teal-600 to-cyan-500",
    border: "border-teal-500/30",
    text: "text-teal-400",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* ── Hero ── */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-950/60 via-purple-950/40 to-background border border-white/5 p-8">
        <div className="max-w-2xl">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-blue-400">
            SaaS Business Guide
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            実在企業・SMSで学ぶ
            <br />
            <span className="text-muted-foreground">SaaSビジネスの教科書</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            福祉×SaaSという日本固有市場で成長する
            <span className="text-foreground font-medium">
              SMS（カイポケ）を実例
            </span>
            に、SaaSビジネスの本質を体系的に学ぶガイド。
            概念を覚えたその場で、実際の財務・組織・戦略データで確認できる。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/saas-model"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              第1章から始める
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/glossary"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            >
              用語を調べる
            </Link>
          </div>
        </div>
      </div>

      {/* ── SMS 実例企業パネル ── */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground">
            実例企業：SMS（エス・エム・エス）とは
          </h2>
          <Link
            href="/mission"
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
          >
            会社概要 <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
          2003年創業。「高齢社会に適した情報インフラを構築する」をミッションに、介護・医療・障害福祉領域でSaaSとBPOを展開する東証プライム上場企業（証券コード：2175）。
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SMS_KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className={`rounded-xl border ${kpi.border} ${kpi.bg} p-4`}
            >
              <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
              <div className="mt-1 flex items-end justify-between gap-2">
                <p className={`text-2xl font-bold tabular-nums leading-none ${kpi.color}`}>
                  {kpi.value}
                </p>
                {kpi.sparkline && (
                  <Sparkline
                    data={kpi.sparkline}
                    width={56}
                    height={20}
                    color="currentColor"
                    className={`shrink-0 opacity-60 ${kpi.color}`}
                  />
                )}
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground/70">
                  {kpi.meta}
                </span>
                <span
                  className={`text-[10px] font-medium ${kpi.positive ? "text-emerald-400" : "text-red-400"}`}
                >
                  {kpi.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5章学習マップ ── */}
      <div>
        <h2 className="mb-1 text-sm font-semibold text-muted-foreground">
          学習の流れ（全5章）
        </h2>
        <p className="mb-4 text-xs text-muted-foreground">
          第1章から順に読むと、SaaS概念→財務→戦略→組織→実践へと自然に理解が深まる。
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CHAPTERS.map((ch) => {
            const Icon = ch.icon;
            return (
              <Link key={ch.num} href={ch.href}>
                <Card
                  className={`group relative h-full overflow-hidden border ${ch.border} transition-all hover:border-white/20 hover:shadow-lg hover:shadow-black/20`}
                >
                  <CardContent className="p-5">
                    {/* Header */}
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`font-mono text-xs font-bold ${ch.text} opacity-60`}
                      >
                        CHAPTER {ch.num}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                    </div>

                    {/* Icon + Title */}
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${ch.gradient} shadow-lg`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold leading-tight">
                          {ch.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground">
                          {ch.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {ch.topics.map((t) => (
                        <span
                          key={t}
                          className={`inline-block rounded-md ${ch.bg} px-2 py-0.5 text-[10px] font-medium ${ch.text}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* SMS実例バッジ */}
                    {ch.smsLabel && (
                      <div className="mt-auto flex items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1.5">
                        <TrendingUp className="h-3 w-3 text-muted-foreground/60" />
                        <span className="text-[10px] text-muted-foreground">
                          SMS実例：{ch.smsLabel}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── リファレンス ── */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          参考・リファレンス
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {REFERENCES.map((ref) => {
            const Icon = ref.icon;
            return (
              <Link key={ref.href} href={ref.href}>
                <Card
                  className={`group h-full overflow-hidden border ${ref.border} transition-all hover:border-white/20 hover:shadow-lg hover:shadow-black/20`}
                >
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${ref.gradient} shadow-md`}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold">{ref.title}</h3>
                          <p className="text-[10px] text-muted-foreground">
                            {ref.subtitle}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {ref.detail}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
