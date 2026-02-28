import { PageHeader } from "@/components/layout/PageHeader";
import { MarketShareChart } from "@/components/competitors/MarketShareChart";
import { CompetitorCards } from "@/components/competitors/CompetitorCards";
import { FeatureComparison } from "@/components/competitors/FeatureComparison";
import { KaipokeAdvantages } from "@/components/competitors/KaipokeAdvantages";
import { SelectionCriteria } from "@/components/competitors/SelectionCriteria";
import { IctSubsidy } from "@/components/competitors/IctSubsidy";

import competitorData from "@/data/competitors.json";

export default function CompetitorsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="競合分析"
        description="介護・障害福祉ソフト市場の競争環境とカイポケのポジショニングを分析する"
      />

      {/* ① 市場シェアチャート */}
      <MarketShareChart data={competitorData.marketOverview} />

      {/* ② 競合製品カード */}
      <CompetitorCards competitors={competitorData.competitors} />

      {/* ③ 機能比較マトリクス */}
      <FeatureComparison competitors={competitorData.competitors} />

      {/* ④ カイポケの競争優位性 */}
      <KaipokeAdvantages data={competitorData.competitiveAnalysis.kaipokeAdvantages} />

      {/* ⑤ 選定基準とカイポケのスコア */}
      <SelectionCriteria data={competitorData.competitiveAnalysis.selectionCriteria} />

      {/* ⑥ ICT導入補助金 */}
      <IctSubsidy data={competitorData.competitiveAnalysis.ictSubsidy} />
    </div>
  );
}
