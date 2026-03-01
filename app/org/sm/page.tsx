import { PageHeader } from "@/components/layout/PageHeader";
import smData from "@/data/sm-organization.json";
import { SmOverview } from "@/components/org/SmOverview";
import { SmRoles } from "@/components/org/SmRoles";
import { SmFunnel } from "@/components/org/SmFunnel";
import { SmHeadcount } from "@/components/org/SmHeadcount";
import { SmToolStack } from "@/components/org/SmToolStack";

export default function SmPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="S&M（Sales & Marketing）"
        description="営業・マーケティング組織の全体像 — 職種別の役割・KPI・ツールスタック・成長フェーズ別の組織設計"
      />
      <SmOverview data={smData.overview} />
      <SmRoles data={smData.roles as any} />
      <SmFunnel data={smData.funnel as any} />
      <SmHeadcount data={smData.headcountByStage as any} />
      <SmToolStack data={smData.toolStack as any} />
    </div>
  );
}
