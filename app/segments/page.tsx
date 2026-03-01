import Link from "next/link";
import { ArrowLeft, TrendingUp, Target } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SmsCta } from "@/components/shared/SmsCta";
import { getSegments, getFinancials } from "@/lib/data";
import { formatRevenue, formatPercent } from "@/lib/utils";
import type { SegmentId } from "@/lib/types";

export default function SegmentsPage() {
  const segments = getSegments();
  const financials = getFinancials();
  const latestFull = financials.fiscalYears[financials.fiscalYears.length - 2];

  return (
    <div className="space-y-8">
      <PageHeader
        title="SMS実例：セグメント分析"
        description="第1章「SaaSとは（分類）」で学んだSaaSの分類・収益構造を、SMSの4事業セグメントで確認する。"
      />

      {/* SMS実例コンテキストバナー */}
      <div className="flex flex-col gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="shrink-0 rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            SMS実例
          </span>
          <span className="text-sm text-muted-foreground">
            この分析は
            <span className="text-foreground font-medium">第1章「SaaSとは」</span>
            の実データ確認ページです。SaaS分類・収益モデルとセグメントを対応させながら読んでください。
          </span>
        </div>
        <Link
          href="/saas-model"
          className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          第1章に戻る
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {segments.map((seg) => {
          const fin = latestFull.segments.find((s) => s.segmentId === seg.id);
          const totalRev = latestFull.segments.reduce((s, x) => s + x.revenue, 0);
          const pct = fin ? (fin.revenue / totalRev) * 100 : 0;

          return (
            <Link key={seg.id} href={`/segments/${seg.id}`}>
              <Card className="h-full transition-all hover:border-[color:var(--seg-color)] hover:bg-accent/20" style={{ "--seg-color": seg.color } as React.CSSProperties}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-white text-xs font-bold"
                      style={{ backgroundColor: seg.color }}
                    >
                      {seg.nameEn.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold">{seg.name}</h3>
                      <p className="text-xs text-muted-foreground">{seg.nameEn}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-mono text-2xl font-bold">
                      {fin ? formatRevenue(fin.revenue) : "—"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      売上構成比 {formatPercent(pct)}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground line-clamp-2">
                    {seg.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {seg.subServices.map((sub) => (
                      <Badge key={sub.name} variant="outline" className="text-[10px]">
                        {sub.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* 次のSMS実例へのクロスナビ */}
      <div className="border-t border-border pt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          他のSMS実例を見る
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <SmsCta
            href="/timeline"
            label="財務推移（FY2021–2025）"
            description="各セグメントの売上成長をP&L・時系列グラフで確認する"
            icon={TrendingUp}
            color="#3B82F6"
          />
          <SmsCta
            href="/market"
            label="市場環境・競合ポジション"
            description="SMSが戦う介護ICT市場の規模・成長ドライバー・競合ポジションを確認する"
            icon={Target}
            color="#F59E0B"
          />
        </div>
      </div>
    </div>
  );
}
