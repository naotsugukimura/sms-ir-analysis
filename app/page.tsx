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
    topics: [
      "LTV / ARR / MRR",
      "B2B vs B2C SaaS",
      "ホリゾンタル vs バーティカル",
      "PMFとフェーズ",
      "SaaS収益モデル",
    ],
    description:
      "SaaSビジネスの基本構造を学ぶ。LTV、ARR、解約率などの核心指標から、B2B/B2C・ホリゾンタル/バーティカルの分類、PMF達成前後のフェーズまで。",
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
      "G&A（管理）",
      "S&M（営業）",
      "組織間連携",
    ],
    description:
      "SaaS企業を構成する3つの機能組織。R&Dのアジャイル開発、G&Aの経理・人事・法務、S&Mの営業プロセス。それぞれの役割と有機的なつながりを深掘りする。",
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
      "S&MならThe Model（Marketing→IS→FS→CS）、R&Dならスプリント/アジャイル。各ユニットが追っている指標とプロセスを具体的に見る。",
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
      "実際の営業現場で使えるスクリプト。SPIN話法による1ヶ月のセールスプラン、IS架電スクリプト、マーケティング用語の英日対訳集。",
  },
];

const QUICK_LINKS = [
  { href: "/sales/spin-script", label: "IS架電 / SPIN商談", icon: Target },
  { href: "/sales/the-model", label: "The Model", icon: BarChart3 },
  { href: "/org/sm", label: "S&M組織", icon: Users },
  { href: "/org/rd", label: "R&D組織", icon: Rocket },
  { href: "/sales/glossary", label: "用語集", icon: BookOpen },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-950/60 via-purple-950/40 to-background border border-white/5 p-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            SaaS Deep Dive
          </h1>
          <p className="mt-2 text-base text-muted-foreground leading-relaxed">
            SaaS事業を<span className="text-blue-400 font-medium">4つの層</span>で体系的に学ぶ。
            概論から組織構造、プロセス設計、日々のオペレーションまで。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["概論", "組織", "指標", "実践"].map((tag, i) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium"
              >
                <span className="text-[10px] text-muted-foreground">L{i + 1}</span>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4-Layer Grid (Z-pattern: 2x2) */}
      <div className="grid gap-4 md:grid-cols-2">
        {LAYERS.map((layer) => {
          const Icon = layer.icon;
          return (
            <Link key={layer.layer} href={layer.href}>
              <Card
                className={`group relative overflow-hidden border ${layer.borderColor} transition-all hover:border-white/20 hover:shadow-lg hover:shadow-black/20 h-full`}
              >
                <CardContent className="p-6">
                  {/* Layer label */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                      {layer.layer}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>

                  {/* Icon + Title */}
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

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {layer.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5">
                    {layer.topics.map((topic) => (
                      <span
                        key={topic}
                        className={`inline-block rounded-md ${layer.bgColor} px-2 py-0.5 text-xs font-medium ${layer.textColor}`}
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
                key={link.href}
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
