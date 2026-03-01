import { PageHeader } from "@/components/layout/PageHeader";
import rdData from "@/data/rd-organization.json";
import { RdOverview } from "@/components/org/RdOverview";
import { AgileProcess } from "@/components/org/AgileProcess";
import { DevelopmentFlow } from "@/components/org/DevelopmentFlow";
import { EngineeringRoles } from "@/components/org/EngineeringRoles";
import { ArchitectureDesign } from "@/components/org/ArchitectureDesign";
import { SaasTechArchitecture } from "@/components/org/SaasTechArchitecture";

export default function RdPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="R&D（Research & Development）"
        description="プロダクト開発組織の全体像 — アジャイル開発・エンジニアリング職種・システムアーキテクチャ・SaaS技術基盤"
      />
      <RdOverview data={rdData.overview} />
      <AgileProcess data={rdData.agile} />
      <DevelopmentFlow data={rdData.developmentFlow as any} />
      <EngineeringRoles data={rdData.engineeringRoles as any} />
      <ArchitectureDesign data={rdData.architecture as any} />
      {(rdData as any).techArchitecture && (
        <SaasTechArchitecture data={(rdData as any).techArchitecture} />
      )}
    </div>
  );
}
