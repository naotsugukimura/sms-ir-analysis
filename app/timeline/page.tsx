"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BarChart3, Layers, Target } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionNav, type SectionDef } from "@/components/layout/SectionNav";
import { RevenueTimeSeriesChart } from "@/components/timeline/RevenueTimeSeriesChart";
import { ProfitTimeSeriesChart } from "@/components/timeline/ProfitTimeSeriesChart";
import { StrategicShiftsTimeline } from "@/components/timeline/StrategicShiftsTimeline";
import { SmsCta } from "@/components/shared/SmsCta";
import { getFinancials, getHistory, getStrategies } from "@/lib/data";

const SECTIONS: SectionDef[] = [
  { id: "revenue",  label: "売上推移" },
  { id: "profit",   label: "利益推移" },
  { id: "strategy", label: "戦略シフト" },
];

export default function TimelinePage() {
  const financials = getFinancials();
  const history    = getHistory();
  const strategies = getStrategies();

  return (
    <div className="space-y-8">
      <PageHeader
        title="SMS実例：財務推移（FY2021–2025）"
        description="第2章「KPI・財務」で学んだP&L構造・Magic Number・Rule of 40 を、SMSの実際の財務データで確認する。"
      />

      {/* SMS実例コンテキストバナー */}
      <div className="flex flex-col gap-2 rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="shrink-0 rounded-md bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-400">
            SMS実例
          </span>
          <span className="text-sm text-muted-foreground">
            この分析は
            <span className="text-foreground font-medium">第2章「KPI・財務」</span>
            の実データ確認ページです。財務理論と照らし合わせながら読むと理解が深まります。
          </span>
        </div>
        <Link
          href="/saas-model"
          className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          第2章に戻る
        </Link>
      </div>

      <SectionNav sections={SECTIONS} />

      <section id="revenue">
        <RevenueTimeSeriesChart financials={financials} />
      </section>

      <section id="profit">
        <ProfitTimeSeriesChart financials={financials} />
      </section>

      <section id="strategy">
        <StrategicShiftsTimeline events={history} strategies={strategies} />
      </section>

      {/* 次のSMS実例へのクロスナビ */}
      <div className="border-t border-border pt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          他のSMS実例を見る
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <SmsCta
            href="/segments"
            label="セグメント分析"
            description="4セグメントの売上構成・ビジネスモデルをセグメント単位で比較する"
            icon={Layers}
            color="#10B981"
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
