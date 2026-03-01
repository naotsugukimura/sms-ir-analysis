"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import rdData from "@/data/rd-organization.json";
import { RdOverview } from "@/components/org/RdOverview";
import { AgileProcess } from "@/components/org/AgileProcess";
import { DevelopmentFlow } from "@/components/org/DevelopmentFlow";
import { EngineeringRoles } from "@/components/org/EngineeringRoles";
import { ArchitectureDesign } from "@/components/org/ArchitectureDesign";
import { SaasTechArchitecture } from "@/components/org/SaasTechArchitecture";

const TABS = [
  { value: "overview", label: "概要" },
  { value: "roles",    label: "役割" },
  { value: "process",  label: "開発プロセス" },
  { value: "arch",     label: "アーキテクチャ" },
];

export default function RdPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="R&D（Research & Development）"
        description="プロダクト開発組織の全体像 — アジャイル開発・エンジニアリング職種・システムアーキテクチャ・SaaS技術基盤"
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
          <RdOverview data={rdData.overview} />
        </TabsContent>
        <TabsContent value="roles" className="space-y-6 mt-4">
          <EngineeringRoles data={rdData.engineeringRoles as any} />
        </TabsContent>
        <TabsContent value="process" className="space-y-6 mt-4">
          <DevelopmentFlow data={rdData.developmentFlow as any} />
          <AgileProcess data={rdData.agile} />
        </TabsContent>
        <TabsContent value="arch" className="space-y-6 mt-4">
          <ArchitectureDesign data={rdData.architecture as any} />
          {(rdData as any).techArchitecture && (
            <SaasTechArchitecture data={(rdData as any).techArchitecture} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
