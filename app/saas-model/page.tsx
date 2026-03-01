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
import { SaasPricing } from "@/components/saas-model/SaasPricing";
import { SaasPlg } from "@/components/saas-model/SaasPlg";
import { SaasCustomerSuccess } from "@/components/saas-model/SaasCustomerSuccess";
import { SaasGtm } from "@/components/saas-model/SaasGtm";
import { SaasCompetitiveStrategy } from "@/components/saas-model/SaasCompetitiveStrategy";
import { SaasFinancialStatements } from "@/components/saas-model/SaasFinancialStatements";

import saasData from "@/data/saas-model.json";

const TAB_ITEMS = [
  { value: "intro", label: "入門" },
  { value: "basics", label: "基本構造" },
  { value: "finance", label: "財務・成長" },
  { value: "categories", label: "分類" },
  { value: "stages", label: "ステージ別" },
  { value: "advanced", label: "上級指標" },
  { value: "pricing", label: "プライシング" },
  { value: "plg", label: "PLG" },
  { value: "cs", label: "CS深掘り" },
  { value: "gtm", label: "GTM戦略" },
  { value: "moat", label: "競争戦略" },
  { value: "financial", label: "財務諸表" },
];

export default function SaasModelPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="SaaS概論 ― 事業モデルを深く理解する"
        description="SaaSビジネスの構造を分解し、体系的に学ぶ。「入門」から始めて、段階的に理解を深める。"
      />

      <Tabs defaultValue="intro" className="w-full">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 -mx-4 px-4 py-2 border-b border-border md:-mx-8 md:px-8">
          <TabsList className="w-full justify-start overflow-x-auto">
            {TAB_ITEMS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

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

        {/* Tab 6: プライシング */}
        <TabsContent value="pricing" className="space-y-6 mt-4">
          <SaasPricing data={saasData.pricing as any} />
        </TabsContent>

        {/* Tab 7: PLG */}
        <TabsContent value="plg" className="space-y-6 mt-4">
          <SaasPlg data={saasData.plg as any} />
        </TabsContent>

        {/* Tab 8: CS深掘り */}
        <TabsContent value="cs" className="space-y-6 mt-4">
          <SaasCustomerSuccess data={saasData.customerSuccess as any} />
        </TabsContent>

        {/* Tab 9: GTM戦略 */}
        <TabsContent value="gtm" className="space-y-6 mt-4">
          <SaasGtm data={saasData.gtm as any} />
        </TabsContent>

        {/* Tab 10: 競争戦略 */}
        <TabsContent value="moat" className="space-y-6 mt-4">
          <SaasCompetitiveStrategy data={(saasData as any).competitiveStrategy} />
        </TabsContent>

        {/* Tab 11: 財務諸表 */}
        <TabsContent value="financial" className="space-y-6 mt-4">
          <SaasFinancialStatements data={(saasData as any).financialStatements} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
