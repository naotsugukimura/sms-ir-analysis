"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { SectionNav, type SectionDef } from "@/components/layout/SectionNav";
import { MarketShareChart } from "@/components/competitors/MarketShareChart";
import { CompetitorCards } from "@/components/competitors/CompetitorCards";
import { FeatureComparison } from "@/components/competitors/FeatureComparison";
import { KaipokeAdvantages } from "@/components/competitors/KaipokeAdvantages";
import { SelectionCriteria } from "@/components/competitors/SelectionCriteria";
import { IctSubsidy } from "@/components/competitors/IctSubsidy";

import competitorData from "@/data/competitors.json";

const SECTIONS: SectionDef[] = [
  { id: "market-share", label: "市場シェア" },
  { id: "competitors", label: "競合製品" },
  { id: "features", label: "機能比較" },
  { id: "advantages", label: "競争優位性" },
  { id: "criteria", label: "選定基準" },
  { id: "subsidy", label: "ICT補助金" },
];

export default function CompetitorsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="競合分析"
        description="介護・障害福祉ソフト市場の競争環境とカイポケのポジショニングを分析する"
      />

      <SectionNav sections={SECTIONS} />

      <section id="market-share">
        <MarketShareChart data={competitorData.marketOverview} />
      </section>

      <section id="competitors">
        <CompetitorCards competitors={competitorData.competitors} />
      </section>

      <section id="features">
        <FeatureComparison competitors={competitorData.competitors} />
      </section>

      <section id="advantages">
        <KaipokeAdvantages data={competitorData.competitiveAnalysis.kaipokeAdvantages} />
      </section>

      <section id="criteria">
        <SelectionCriteria data={competitorData.competitiveAnalysis.selectionCriteria} />
      </section>

      <section id="subsidy">
        <IctSubsidy data={competitorData.competitiveAnalysis.ictSubsidy} />
      </section>
    </div>
  );
}
