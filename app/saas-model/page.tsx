"use client";

import { TrendingUp, BarChart3, Target, Heart } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SmsCta } from "@/components/shared/SmsCta";
import { SectionNav } from "@/components/layout/SectionNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SaasIntroduction } from "@/components/saas-model/SaasIntroduction";
import { FlowVsStock } from "@/components/saas-model/FlowVsStock";
import { SaasRevenueFormula } from "@/components/saas-model/SaasRevenueFormula";
import { SaasPredictability } from "@/components/saas-model/SaasPredictability";
import { SaasCategories } from "@/components/saas-model/SaasCategories";
import { SmsKaipokeApplied } from "@/components/saas-model/SmsKaipokeApplied";
import { SaasKeyMetrics } from "@/components/saas-model/SaasKeyMetrics";
import { MetricsRelationMap } from "@/components/saas-model/MetricsRelationMap";
import { ChurnSimulation } from "@/components/saas-model/ChurnSimulation";
import { SaasFinancialConcepts } from "@/components/saas-model/SaasFinancialConcepts";
import { SaasAdvancedMetrics } from "@/components/saas-model/SaasAdvancedMetrics";
import { SaasFinancialStatements } from "@/components/saas-model/SaasFinancialStatements";
import { SaasStageBenchmarks } from "@/components/saas-model/SaasStageBenchmarks";
import { SaasPricing } from "@/components/saas-model/SaasPricing";
import { SaasPlg } from "@/components/saas-model/SaasPlg";
import { SaasGtm } from "@/components/saas-model/SaasGtm";
import { SaasCompetitiveStrategy } from "@/components/saas-model/SaasCompetitiveStrategy";
import { SaasCustomerSuccess } from "@/components/saas-model/SaasCustomerSuccess";

import saasData from "@/data/saas-model.json";

const TAB_ITEMS = [
  { value: "what",     label: "SaaSとは" },
  { value: "kpi",      label: "KPI・財務" },
  { value: "strategy", label: "成長・戦略" },
  { value: "cs",       label: "CS・リテンション" },
];

export default function SaasModelPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="第1章：SaaSとは ― ビジネスモデルを体系的に学ぶ"
        description="定義・収益構造・指標・戦略・CSの4セクションで、SaaSビジネスの全体像を掴む。各セクション末尾にSMS（カイポケ）の実例リンクあり。"
      />

      <Tabs defaultValue="what" className="w-full">
        {/* タブナビ */}
        <div className="sticky top-0 z-10 -mx-4 border-b border-border bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:-mx-8 md:px-8">
          <TabsList className="w-full justify-start">
            {TAB_ITEMS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* ── タブ①：SaaSとは ── */}
        <TabsContent value="what" className="space-y-6 mt-4">
          {/* 定義・仕組み */}
          <SaasIntroduction data={saasData.introduction as any} />
          <FlowVsStock data={saasData.flowVsStock as any} />
          {/* 収益の基本構造 */}
          <SaasRevenueFormula data={saasData.revenueFormula} />
          <SaasPredictability data={saasData.predictability} />
          {/* SaaSの分類 */}
          <SaasCategories categories={saasData.saasCategories} />
          {/* SMS実例（このページ内で完結するコンポーネント） */}
          <SmsKaipokeApplied data={saasData.smsApplied} />
          {/* セグメント詳細への導線 */}
          <SmsCta
            href="/segments"
            label="SMS セグメント分析"
            description="カイポケが属するCare-SaaSセグメントのビジネスモデルと市場規模を確認する"
            icon={TrendingUp}
            color="#10B981"
          />
        </TabsContent>

        {/* ── タブ②：KPI・財務 ── */}
        <TabsContent value="kpi" className="space-y-6 mt-4">
          <SectionNav sections={[
            { id: "kpi-metrics",    label: "主要KPI" },
            { id: "kpi-relation",   label: "指標関係図" },
            { id: "kpi-churn",      label: "Churnシミュ" },
            { id: "kpi-concepts",   label: "財務概念" },
            { id: "kpi-advanced",   label: "上級指標" },
            { id: "kpi-statements", label: "財務諸表" },
          ]} />
          <section id="kpi-metrics">
            <SaasKeyMetrics metrics={saasData.keyMetrics} />
          </section>
          <section id="kpi-relation">
            <MetricsRelationMap data={saasData.metricsRelation as any} />
          </section>
          <section id="kpi-churn">
            <ChurnSimulation data={saasData.churnSimulation as any} />
          </section>
          <section id="kpi-concepts">
            <SaasFinancialConcepts data={saasData.financialConcepts as any} />
          </section>
          <section id="kpi-advanced">
            <SaasAdvancedMetrics metrics={saasData.advancedMetrics as any} />
          </section>
          <section id="kpi-statements">
            <SaasFinancialStatements data={(saasData as any).financialStatements} />
          </section>
          {/* SMS財務データへの導線 */}
          <SmsCta
            href="/timeline"
            label="SMS 財務推移（FY2021–2025）"
            description="学んだP&L構造・Magic Number・Rule of 40 を、SMSの実際の財務データで確認する"
            icon={BarChart3}
            color="#3B82F6"
          />
        </TabsContent>

        {/* ── タブ③：成長・戦略 ── */}
        <TabsContent value="strategy" className="space-y-6 mt-4">
          {/* 成長ステージ */}
          <SaasStageBenchmarks data={saasData.stageBenchmarks as any} />
          {/* プライシング */}
          <SaasPricing data={saasData.pricing as any} />
          {/* PLG */}
          <SaasPlg data={saasData.plg as any} />
          {/* GTM戦略 */}
          <SaasGtm data={saasData.gtm as any} />
          {/* 競争戦略・Moat */}
          <SaasCompetitiveStrategy data={(saasData as any).competitiveStrategy} />
          {/* SMS市場・競合への導線 */}
          <SmsCta
            href="/market"
            label="SMS 市場環境・競合ポジション"
            description="介護ICT市場のGTM戦略・競合分析・政策環境をSMSの実例で確認する"
            icon={Target}
            color="#F59E0B"
          />
        </TabsContent>

        {/* ── タブ④：CS・リテンション ── */}
        <TabsContent value="cs" className="space-y-6 mt-4">
          {/* CSの理論と実践 */}
          <SaasCustomerSuccess data={saasData.customerSuccess as any} />
          {/* セグメントKPI（NRR等）への導線 */}
          <SmsCta
            href="/segments"
            label="SMS セグメント別KPI"
            description="カイポケのリテンション戦略・NRR向上施策をセグメント分析から読み解く"
            icon={Heart}
            color="#EC4899"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
