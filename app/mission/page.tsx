"use client";

import Link from "next/link";
import { TrendingUp, Layers, Target } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionNav, type SectionDef } from "@/components/layout/SectionNav";
import { MissionStatement } from "@/components/mission/MissionStatement";
import { FoundingStory } from "@/components/mission/FoundingStory";
import { PortfolioBreakdown } from "@/components/mission/PortfolioBreakdown";
import { SegmentInterconnections } from "@/components/mission/SegmentInterconnections";
import { SmsCta } from "@/components/shared/SmsCta";
import { getCompanyProfile, getHistory, getFinancials, getSegments } from "@/lib/data";

const SECTIONS: SectionDef[] = [
  { id: "mission",          label: "ミッション" },
  { id: "founding",         label: "創業ストーリー" },
  { id: "portfolio",        label: "ポートフォリオ" },
  { id: "interconnections", label: "事業間連携" },
];

export default function MissionPage() {
  const company    = getCompanyProfile();
  const history    = getHistory();
  const financials = getFinancials();
  const segments   = getSegments();

  return (
    <div className="space-y-8">
      <PageHeader
        title="SMS実例：会社・ミッション"
        description="SMSの創業理念・事業ポートフォリオ・セグメント間連携の全体像。各章でSMS実例として登場するデータの背景を理解する出発点。"
      />

      {/* SMS実例コンテキストバナー */}
      <div className="flex items-center gap-3 rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3">
        <span className="shrink-0 rounded-md bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-400">
          SMS実例
        </span>
        <span className="text-sm text-muted-foreground">
          SMS（エス・エム・エス）の会社概要ページです。財務・セグメント・市場の各分析ページを読む前にここで全体像を掴むと理解が深まります。
        </span>
      </div>

      <SectionNav sections={SECTIONS} />

      <section id="mission">
        <MissionStatement company={company} />
      </section>

      <section id="founding">
        <FoundingStory events={history} />
      </section>

      <section id="portfolio">
        <PortfolioBreakdown financials={financials} segments={segments} />
      </section>

      <section id="interconnections">
        <SegmentInterconnections />
      </section>

      {/* 各SMS実例ページへのクロスナビ */}
      <div className="border-t border-border pt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          SMS実例の詳細を見る
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <SmsCta
            href="/timeline"
            label="財務推移"
            description="FY2021–2025の売上・利益・セグメント成長を時系列で確認"
            icon={TrendingUp}
            color="#3B82F6"
          />
          <SmsCta
            href="/segments"
            label="セグメント分析"
            description="4セグメントのビジネスモデル・市場規模・KPIを深掘り"
            icon={Layers}
            color="#10B981"
          />
          <SmsCta
            href="/market"
            label="市場環境"
            description="介護ICT市場の規模・成長ドライバー・競合ポジション"
            icon={Target}
            color="#F59E0B"
          />
        </div>
      </div>
    </div>
  );
}
