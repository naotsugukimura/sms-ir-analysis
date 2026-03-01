"use client";

import { BarChart3, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelOverview } from "@/components/sales/ModelOverview";
import { MarketingSection } from "@/components/sales/MarketingSection";
import { InsideSalesSection } from "@/components/sales/InsideSalesSection";
import { FieldSalesSection } from "@/components/sales/FieldSalesSection";
import { CustomerSuccessSection } from "@/components/sales/CustomerSuccessSection";
import { SmsCta } from "@/components/shared/SmsCta";

import modelData from "@/data/the-model.json";

const TAB_ITEMS = [
  { value: "marketing", label: "Marketing" },
  { value: "is",        label: "Inside Sales" },
  { value: "fs",        label: "Field Sales" },
  { value: "cs",        label: "Customer Success" },
];

export default function TheModelPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="第4章：組織・実行 ― The Model（セールスファネル）"
        description="Marketing → Inside Sales → Field Sales → Customer Success の4ステージで構成されるSaaSセールスの実行フレームワーク。各ステージのKPI・プロセス・役割を体系化する。"
      />

      {/* 全体ファネル（常時表示） */}
      <ModelOverview data={modelData.overview} />

      {/* タブUI */}
      <Tabs defaultValue="marketing" className="w-full">
        <div className="sticky top-0 z-10 -mx-4 border-b border-border bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:-mx-8 md:px-8">
          <TabsList className="w-full justify-start overflow-x-auto">
            {TAB_ITEMS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="marketing" className="space-y-6 mt-4">
          <MarketingSection data={modelData.marketing as any} />
          <SmsCta
            href="/segments"
            label="SMS セグメント別売上構成"
            description="どのセグメントがどの顧客層をターゲットにしているか — マーケティング戦略の実例"
            icon={BarChart3}
            color="#3B82F6"
          />
        </TabsContent>

        <TabsContent value="is" className="space-y-6 mt-4">
          <InsideSalesSection data={modelData.insideSales as any} />
          <SmsCta
            href="/sales/spin-script"
            label="介護SaaS IS架電 / SPIN商談スクリプト"
            description="このページで学んだISプロセスを、介護SaaS営業の実際のスクリプトで体験する"
            icon={BarChart3}
            color="#10B981"
          />
        </TabsContent>

        <TabsContent value="fs" className="space-y-6 mt-4">
          <FieldSalesSection data={modelData.fieldSales as any} />
          <SmsCta
            href="/sales/spin-script"
            label="SPIN話法スクリプト（就労B型・相談支援）"
            description="Field SalesのSPIN活用を、福祉SaaS商談の実例スクリプトで確認する"
            icon={BarChart3}
            color="#F59E0B"
          />
        </TabsContent>

        <TabsContent value="cs" className="space-y-6 mt-4">
          <CustomerSuccessSection data={modelData.customerSuccess as any} />
          <SmsCta
            href="/timeline"
            label="SMS 財務推移でCSの成果を確認"
            description="Care-SaaS売上 +17% YoY の成長はCSによるリテンション・拡張の結果 — 財務データで検証"
            icon={TrendingUp}
            color="#EC4899"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
