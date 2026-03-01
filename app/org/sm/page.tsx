"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import smData from "@/data/sm-organization.json";
import { SmOverview } from "@/components/org/SmOverview";
import { SmRoles } from "@/components/org/SmRoles";
import { SmFunnel } from "@/components/org/SmFunnel";
import { SmHeadcount } from "@/components/org/SmHeadcount";
import { SmToolStack } from "@/components/org/SmToolStack";

const TABS = [
  { value: "overview", label: "概要" },
  { value: "roles",    label: "役割・KPI" },
  { value: "process",  label: "プロセス" },
  { value: "tools",    label: "規模・ツール" },
];

export default function SmPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="S&M（Sales & Marketing）"
        description="営業・マーケティング組織の全体像 — 職種別の役割・KPI・ツールスタック・成長フェーズ別の組織設計"
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
          <SmOverview data={smData.overview} />
        </TabsContent>
        <TabsContent value="roles" className="space-y-6 mt-4">
          <SmRoles data={smData.roles as any} />
        </TabsContent>
        <TabsContent value="process" className="space-y-6 mt-4">
          <SmFunnel data={smData.funnel as any} />
        </TabsContent>
        <TabsContent value="tools" className="space-y-6 mt-4">
          <SmHeadcount data={smData.headcountByStage as any} />
          <SmToolStack data={smData.toolStack as any} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
