import Link from "next/link";
import {
  Microscope,
  Cog,
  BarChart3,
  Briefcase,
  ArrowRight,
  BookOpen,
  Users,
  Rocket,
  Target,
  Building2,
  Brain,
  DollarSign,
  TrendingUp,
  Shield,
  FileText,
  Layers,
  Heart,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const LAYERS = [
  {
    layer: "Layer 1",
    title: "SaaS概論",
    subtitle: "SaaS事業の全体像を理解する",
    href: "/saas-model",
    icon: Microscope,
    color: "from-blue-600 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    badge: "12タブ",
    topics: [
      "入門",
      "基本構造",
      "財務・成長",
      "分類",
      "ステージ別",
      "上級指標",
      "プライシング",
      "PLG",
      "CS深掘り",
      "GTM戦略",
      "競争戦略",
      "財務諸表",
    ],
    description:
      "SaaSの定義から収益構造、プライシング、PLG、カスタマーサクセス、GTM戦略、競争優位（Moat）、財務諸表の読み方まで。12タブで体系的にカバー。",
  },
  {
    layer: "Layer 2",
    title: "SaaS組織",
    subtitle: "S&M / R&D / G&A の役割と連携",
    href: "/org",
    icon: Cog,
    color: "from-emerald-600 to-green-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    topics: [
      "R&D（開発）",
      "技術アーキテクチャ",
      "G&A（管理）",
      "S&M（営業）",
    ],
    description:
      "SaaS企業を構成する3つの機能組織。R&Dにはマルチテナンシー、API、セキュリティ認証等の技術アーキテクチャも追加。",
  },
  {
    layer: "Layer 3",
    title: "プロセス・指標",
    subtitle: "各ユニットが追う指標とプロセス",
    href: "/sales/the-model",
    icon: BarChart3,
    color: "from-amber-600 to-yellow-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400",
    topics: [
      "The Model（S&M）",
      "ファネル設計",
      "課題整理シート",
      "KPI設計",
    ],
    description:
      "S&MならThe Model（Marketing→IS→FS→CS）、R&Dならスプリント/アジャイル。各ユニットの指標とプロセスを具体的に。",
  },
  {
    layer: "Layer 4",
    title: "セールス実践",
    subtitle: "日々の営業で使うスクリプト・ツール",
    href: "/sales/spin-script",
    icon: Briefcase,
    color: "from-purple-600 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    topics: [
      "SPIN話法（就労B型）",
      "SPIN話法（相談支援）",
      "ISスクリプト",
      "マーケティング用語集",
    ],
    description:
      "実際の営業現場で使えるスクリプト。SPIN話法、IS架電スクリプト、マーケティング用語の英日対訳集。",
  },
];

const EXTRA_PAGES = [
  {
    title: "ケーススタディ",
    subtitle: "グローバル5社＋日本5社の成長ストーリー",
    href: "/case-studies",
    icon: Building2,
    color: "from-rose-600 to-orange-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    textColor: "text-rose-400",
    detail: "Salesforce, HubSpot, Slack, Shopify, Zoom / freee, Money Forward, Sansan, SmartHR, Rakus",
  },
  {
    title: "AI × SaaS",
    subtitle: "AIがSaaSを変える",
    href: "/ai-saas",
    icon: Brain,
    color: "from-violet-600 to-fuchsia-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-400",
    detail: "AI-native vs AI-enhanced、Copilot/Agent/Platform、福祉SaaS×AI",
  },
  {
    title: "SaaS用語集",
    subtitle: "50+の重要指標と用語",
    href: "/glossary",
    icon: BookOpen,
    color: "from-teal-600 to-cyan-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    textColor: "text-teal-400",
    detail: "計算式、ベンチマーク、アクションティップ付き。5カテゴリ × 10用語。",
  },
];

const QUICK_LINKS = [
  { href: "/saas-model", label: "SaaS概論（12タブ）", icon: Microscope },
  { href: "/case-studies", label: "ケーススタディ", icon: Building2 },
  { href: "/ai-saas", label: "AI × SaaS", icon: Brain },
  { href: "/glossary", label: "SaaS用語集", icon: BookOpen },
  { href: "/sales/spin-script", label: "IS架電 / SPIN", icon: Target },
  { href: "/sales/the-model", label: "The Model", icon: BarChart3 },
  { href: "/org/sm", label: "S&M組織", icon: Users },
  { href: "/org/rd", label: "R&D + 技術アーキ", icon: Rocket },
  { href: "/sales/glossary", label: "MKT用語集", icon: BookOpen },
];

const STATS = [
  { label: "テーマ", value: "10+", icon: Layers },
  { label: "タブ", value: "12", icon: BarChart3 },
  { label: "用語", value: "50+", icon: BookOpen },
  { label: "企業分析", value: "10社", icon: Building2 },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-950/60 via-purple-950/40 to-background border border-white/5 p-8">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            SaaS Deep Dive
          </h1>
          <p className="mt-2 text-base text-muted-foreground leading-relaxed">
            SaaS事業を体系的に学ぶ。概論<span className="text-blue-400 font-medium">12タブ</span>、
            <span className="text-rose-400 font-medium">10社のケーススタディ</span>、
            <span className="text-violet-400 font-medium">AI×SaaS</span>、
            <span className="text-teal-400 font-medium">50+用語集</span>まで。
          </p>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap gap-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5"
                >
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-mono text-sm font-bold">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SaaS全体像テーママップ */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          SaaS全体像テーママップ
        </h3>
        <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[
            { label: "定義・入門", href: "/saas-model", color: "#3B82F6", icon: Microscope },
            { label: "プライシング", href: "/saas-model", color: "#8B5CF6", icon: DollarSign },
            { label: "GTM戦略", href: "/saas-model", color: "#F97316", icon: Target },
            { label: "PLG", href: "/saas-model", color: "#10B981", icon: Rocket },
            { label: "カスタマーサクセス", href: "/saas-model", color: "#EC4899", icon: Heart },
            { label: "競争戦略 & Moat", href: "/saas-model", color: "#EF4444", icon: Shield },
            { label: "財務諸表", href: "/saas-model", color: "#6366F1", icon: FileText },
            { label: "技術アーキテクチャ", href: "/org/rd", color: "#14B8A6", icon: Layers },
            { label: "ケーススタディ", href: "/case-studies", color: "#F43F5E", icon: Building2 },
            { label: "AI × SaaS", href: "/ai-saas", color: "#A855F7", icon: Brain },
            { label: "SaaS用語集", href: "/glossary", color: "#0EA5E9", icon: BookOpen },
            { label: "組織 & プロセス", href: "/org", color: "#22C55E", icon: Cog },
          ].map((theme) => {
            const Icon = theme.icon;
            return (
              <Link key={theme.label} href={theme.href}>
                <div
                  className="flex items-center gap-2 rounded-lg border p-2.5 transition-all hover:border-white/20 hover:bg-white/5"
                  style={{ borderColor: theme.color + "30" }}
                >
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                    style={{ backgroundColor: theme.color + "20", color: theme.color }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-medium truncate">{theme.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4-Layer Grid */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          基礎知識 — 4層構造
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {LAYERS.map((layer) => {
            const Icon = layer.icon;
            return (
              <Link key={layer.layer} href={layer.href}>
                <Card
                  className={`group relative overflow-hidden border ${layer.borderColor} transition-all hover:border-white/20 hover:shadow-lg hover:shadow-black/20 h-full`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                          {layer.layer}
                        </span>
                        {layer.badge && (
                          <span className={`rounded-full ${layer.bgColor} px-2 py-0.5 text-[10px] font-bold ${layer.textColor}`}>
                            {layer.badge}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${layer.color} shadow-lg`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">{layer.title}</h2>
                        <p className="text-xs text-muted-foreground">{layer.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {layer.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.topics.map((topic) => (
                        <span
                          key={topic}
                          className={`inline-block rounded-md ${layer.bgColor} px-2 py-0.5 text-[10px] font-medium ${layer.textColor}`}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Extra Pages */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          分析 & リファレンス
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {EXTRA_PAGES.map((page) => {
            const Icon = page.icon;
            return (
              <Link key={page.title} href={page.href}>
                <Card
                  className={`group overflow-hidden border ${page.borderColor} transition-all hover:border-white/20 hover:shadow-lg hover:shadow-black/20 h-full`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${page.color} shadow-md`}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold">{page.title}</h3>
                          <p className="text-[10px] text-muted-foreground">{page.subtitle}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {page.detail}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          Quick Links
        </h3>
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:bg-accent/50"
              >
                <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
