"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SaasRevenueFormula } from "@/components/saas-model/SaasRevenueFormula";
import { SaasPredictability } from "@/components/saas-model/SaasPredictability";
import { SaasKeyMetrics } from "@/components/saas-model/SaasKeyMetrics";
import { SaasCategories } from "@/components/saas-model/SaasCategories";
import { SmsKaipokeApplied } from "@/components/saas-model/SmsKaipokeApplied";
import { SaasAdvancedMetrics } from "@/components/saas-model/SaasAdvancedMetrics";
import { SaasStageBenchmarks } from "@/components/saas-model/SaasStageBenchmarks";
import { SaasFinancialConcepts } from "@/components/saas-model/SaasFinancialConcepts";

import saasData from "@/data/saas-model.json";

const TAB_ITEMS = [
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
        description="SaaSビジネスの構造を分解し、体系的に学ぶ。タブで切り替えて必要な情報にアクセス。"
      />

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {TAB_ITEMS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab 1: 基本構造 */}
        <TabsContent value="basics" className="space-y-6 mt-4">
          <SaasRevenueFormula data={saasData.revenueFormula} />
          <SaasPredictability data={saasData.predictability} />
          <SaasKeyMetrics metrics={saasData.keyMetrics} />
        </TabsContent>

        {/* Tab 2: 財務・成長 */}
        <TabsContent value="finance" className="space-y-6 mt-4">
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
