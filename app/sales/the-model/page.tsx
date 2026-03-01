"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelOverview } from "@/components/sales/ModelOverview";
import { MarketingSection } from "@/components/sales/MarketingSection";
import { InsideSalesSection } from "@/components/sales/InsideSalesSection";
import { FieldSalesSection } from "@/components/sales/FieldSalesSection";
import { CustomerSuccessSection } from "@/components/sales/CustomerSuccessSection";

import modelData from "@/data/the-model.json";

const TAB_ITEMS = [
  { value: "marketing", label: "Marketing" },
  { value: "is", label: "Inside Sales" },
  { value: "fs", label: "Field Sales" },
  { value: "cs", label: "Customer Success" },
];

export default function TheModelPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title={modelData.title}
        description={modelData.description}
      />

      {/* 全体ファネル（常時表示） */}
      <ModelOverview data={modelData.overview} />

      {/* タブUI */}
      <Tabs defaultValue="marketing" className="w-full">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 -mx-4 px-4 py-2 border-b border-border md:-mx-8 md:px-8">
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
        </TabsContent>

        <TabsContent value="is" className="space-y-6 mt-4">
          <InsideSalesSection data={modelData.insideSales as any} />
        </TabsContent>

        <TabsContent value="fs" className="space-y-6 mt-4">
          <FieldSalesSection data={modelData.fieldSales as any} />
        </TabsContent>

        <TabsContent value="cs" className="space-y-6 mt-4">
          <CustomerSuccessSection data={modelData.customerSuccess as any} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
