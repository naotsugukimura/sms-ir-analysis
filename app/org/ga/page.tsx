import { PageHeader } from "@/components/layout/PageHeader";
import gaData from "@/data/ga-organization.json";
import { GaOverview } from "@/components/org/GaOverview";
import { FinanceSection } from "@/components/org/FinanceSection";
import { HumanResourcesSection } from "@/components/org/HumanResourcesSection";
import { LegalSection } from "@/components/org/LegalSection";
import { GeneralAffairsSection } from "@/components/org/GeneralAffairsSection";
import { CorporatePlanningSection } from "@/components/org/CorporatePlanningSection";
import { CrossFunctionalSection } from "@/components/org/CrossFunctionalSection";
import { GaHeadcountByStage } from "@/components/org/GaHeadcountByStage";

export default function GaPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="G&A（General & Administrative）"
        description="管理部門の全体像 — 経理・財務・人事・法務・総務・経営企画"
      />
      <GaOverview data={gaData.overview} />
      <FinanceSection data={gaData.finance} />
      <HumanResourcesSection data={gaData.humanResources} />
      <LegalSection data={gaData.legal} />
      <GeneralAffairsSection data={gaData.generalAffairs} />
      <CorporatePlanningSection data={gaData.corporatePlanning} />
      {gaData.headcountByStage && (
        <GaHeadcountByStage data={gaData.headcountByStage} />
      )}
      <CrossFunctionalSection data={gaData.crossFunctional} />
    </div>
  );
}
