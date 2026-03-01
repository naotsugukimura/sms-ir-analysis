"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gaData from "@/data/ga-organization.json";
import { GaOverview } from "@/components/org/GaOverview";
import { FinanceSection } from "@/components/org/FinanceSection";
import { HumanResourcesSection } from "@/components/org/HumanResourcesSection";
import { LegalSection } from "@/components/org/LegalSection";
import { GeneralAffairsSection } from "@/components/org/GeneralAffairsSection";
import { CorporatePlanningSection } from "@/components/org/CorporatePlanningSection";
import { CrossFunctionalSection } from "@/components/org/CrossFunctionalSection";
import { GaHeadcountByStage } from "@/components/org/GaHeadcountByStage";

const TABS = [
  { value: "overview",  label: "概要" },
  { value: "finance",   label: "財務・経理" },
  { value: "people",    label: "人事・法務・総務" },
  { value: "planning",  label: "経営企画・連携" },
];

export default function GaPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="G&A（General & Administrative）"
        description="管理部門の全体像 — 経理・財務・人事・法務・総務・経営企画"
      />
      <Tabs defaultValue="overview" className="w-full">
        <div className="sticky top-0 z-10 -mx-4 border-b border-border bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:-mx-8 md:px-8">
          <TabsList className="w-full justify-start">
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="text-xs">{t.label}</TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="overview" className="space-y-6 mt-4">
          <GaOverview data={gaData.overview} />
          {gaData.headcountByStage && (
            <GaHeadcountByStage data={gaData.headcountByStage} />
          )}
        </TabsContent>
        <TabsContent value="finance" className="space-y-6 mt-4">
          <FinanceSection data={gaData.finance} />
        </TabsContent>
        <TabsContent value="people" className="space-y-6 mt-4">
          <HumanResourcesSection data={gaData.humanResources} />
          <LegalSection data={gaData.legal} />
          <GeneralAffairsSection data={gaData.generalAffairs} />
        </TabsContent>
        <TabsContent value="planning" className="space-y-6 mt-4">
          <CorporatePlanningSection data={gaData.corporatePlanning} />
          <CrossFunctionalSection data={gaData.crossFunctional} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
