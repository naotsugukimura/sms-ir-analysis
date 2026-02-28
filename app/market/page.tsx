import { PageHeader } from "@/components/layout/PageHeader";
import { IctMarketChart } from "@/components/market/IctMarketChart";
import { AgingDemographics } from "@/components/market/AgingDemographics";
import { CareWorkforce } from "@/components/market/CareWorkforce";
import { PolicyTimeline } from "@/components/market/PolicyTimeline";
import { IctGrowthDrivers } from "@/components/market/IctGrowthDrivers";
import { MarketInsights } from "@/components/market/MarketInsights";

import marketData from "@/data/market-environment.json";

export default function MarketPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="マーケット環境"
        description="介護・障害福祉市場の構造とICT市場の成長ドライバーを理解する"
      />

      {/* ① マーケット全体の構造的インサイト */}
      <MarketInsights data={marketData} />

      {/* ② 介護ICT市場規模の推移 */}
      <IctMarketChart data={marketData.ictMarket} />

      {/* ③ 高齢化の進行と将来推計 */}
      <AgingDemographics data={marketData.agingDemographics} />

      {/* ④ 介護人材の需給ギャップ */}
      <CareWorkforce data={marketData.careWorkforce} />

      {/* ⑤ ICT市場の成長ドライバー */}
      <IctGrowthDrivers data={marketData.ictMarket} />

      {/* ⑥ 制度改定タイムライン */}
      <PolicyTimeline events={marketData.policyTimeline.events} />
    </div>
  );
}
