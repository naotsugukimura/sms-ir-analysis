"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp, Layers } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IctMarketChart } from "@/components/market/IctMarketChart";
import { AgingDemographics } from "@/components/market/AgingDemographics";
import { CareWorkforce } from "@/components/market/CareWorkforce";
import { PolicyTimeline } from "@/components/market/PolicyTimeline";
import { IctGrowthDrivers } from "@/components/market/IctGrowthDrivers";
import { MarketInsights } from "@/components/market/MarketInsights";
import { SmsCta } from "@/components/shared/SmsCta";

import marketData from "@/data/market-environment.json";

const TABS = [
  { value: "market",  label: "市場・成長" },
  { value: "social",  label: "社会変化" },
  { value: "policy",  label: "制度・政策" },
];

export default function MarketPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="SMS実例：市場環境（第3章連動）"
        description="第3章「戦略・市場」で学んだGTM・競争優位を、SMSが戦う介護ICT市場の実データで確認する。"
      />

      {/* SMS実例コンテキストバナー */}
      <div className="flex flex-col gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="shrink-0 rounded-md bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
            SMS実例
          </span>
          <span className="text-sm text-muted-foreground">
            この分析は
            <span className="text-foreground font-medium">第3章「戦略・市場」</span>
            の実データ確認ページです。市場環境・成長ドライバーとSMSの戦略を照合しながら読んでください。
          </span>
        </div>
        <Link
          href="/saas-model"
          className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          第3章に戻る
        </Link>
      </div>

      <Tabs defaultValue="market" className="w-full">
        <div className="sticky top-0 z-10 -mx-4 border-b border-border bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:-mx-8 md:px-8">
          <TabsList className="w-full justify-start">
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="text-xs">{t.label}</TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="market" className="space-y-6 mt-4">
          <MarketInsights data={marketData} />
          <IctMarketChart data={marketData.ictMarket} />
          <IctGrowthDrivers data={marketData.ictMarket} />
        </TabsContent>

        <TabsContent value="social" className="space-y-6 mt-4">
          <AgingDemographics data={marketData.agingDemographics} />
          <CareWorkforce data={marketData.careWorkforce} />
        </TabsContent>

        <TabsContent value="policy" className="space-y-6 mt-4">
          <PolicyTimeline events={marketData.policyTimeline.events} />
        </TabsContent>
      </Tabs>

      {/* 次のSMS実例へのクロスナビ */}
      <div className="border-t border-border pt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          他のSMS実例を見る
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <SmsCta
            href="/timeline"
            label="財務推移（FY2021–2025）"
            description="市場成長がどう財務数値に反映されているかを時系列で確認する"
            icon={TrendingUp}
            color="#3B82F6"
          />
          <SmsCta
            href="/segments"
            label="セグメント分析"
            description="市場別セグメントの収益構造・ビジネスモデルを確認する"
            icon={Layers}
            color="#10B981"
          />
        </div>
      </div>
    </div>
  );
}
