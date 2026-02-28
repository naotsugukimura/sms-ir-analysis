"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SaasIntroduction } from "@/components/saas-model/SaasIntroduction";
import { FlowVsStock } from "@/components/saas-model/FlowVsStock";
import { SaasRevenueFormula } from "@/components/saas-model/SaasRevenueFormula";
import { SaasPredictability } from "@/components/saas-model/SaasPredictability";
import { SaasKeyMetrics } from "@/components/saas-model/SaasKeyMetrics";
import { MetricsRelationMap } from "@/components/saas-model/MetricsRelationMap";
import { ChurnSimulation } from "@/components/saas-model/ChurnSimulation";
import { SaasFinancialConcepts } from "@/components/saas-model/SaasFinancialConcepts";
import { SaasCategories } from "@/components/saas-model/SaasCategories";
import { SmsKaipokeApplied } from "@/components/saas-model/SmsKaipokeApplied";
import { SaasStageBenchmarks } from "@/components/saas-model/SaasStageBenchmarks";
import { SaasAdvancedMetrics } from "@/components/saas-model/SaasAdvancedMetrics";

import saasData from "@/data/saas-model.json";

const TAB_ITEMS = [
  { value: "intro", label: "入門" },
  { value: "basics", label: "基本構造" },
  { value: "finance", label: "財務・成長" },
  { value: "categories", label: "分類" },
  { value: "stages", label: "ステージ別" },
  { value: "advanced", label: "上級指標" },
];

export default function SaasModelPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="SaaS概論 ― 事業モデルを深く理解する"
        description="SaaSビジネスの構造を分解し、体系的に学ぶ。「入門」から始めて、段階的に理解を深める。"
      />

      <Tabs defaultValue="intro" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {TAB_ITEMS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab 0: 入門 */}
        <TabsContent value="intro" className="space-y-6 mt-4">
          <SaasIntroduction data={saasData.introduction as any} />
          <FlowVsStock data={saasData.flowVsStock as any} />
        </TabsContent>

        {/* Tab 1: 基本構造 */}
        <TabsContent value="basics" className="space-y-6 mt-4">
          <SaasRevenueFormula data={saasData.revenueFormula} />
          <SaasPredictability data={saasData.predictability} />
          <SaasKeyMetrics metrics={saasData.keyMetrics} />
          <MetricsRelationMap data={saasData.metricsRelation as any} />
        </TabsContent>

        {/* Tab 2: 財務・成長 */}
        <TabsContent value="finance" className="space-y-6 mt-4">
          <ChurnSimulation data={saasData.churnSimulation as any} />
          <SaasFinancialConcepts data={saasData.financialConcepts as any} />
        </TabsContent>

        {/* Tab 3: 分類 */}
        <TabsContent value="categories" className="space-y-6 mt-4">
          <SaasCategories categories={saasData.saasCategories} />
          <SmsKaipokeApplied data={saasData.smsApplied} />
        </TabsContent>

        {/* Tab 4: ステージ別 */}
        <TabsContent value="stages" className="space-y-6 mt-4">
          <SaasStageBenchmarks data={saasData.stageBenchmarks as any} />
        </TabsContent>

        {/* Tab 5: 上級指標 */}
        <TabsContent value="advanced" className="space-y-6 mt-4">
          <SaasAdvancedMetrics metrics={saasData.advancedMetrics as any} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
