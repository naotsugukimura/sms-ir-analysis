"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { SectionNav, type SectionDef } from "@/components/layout/SectionNav";
import { IctMarketChart } from "@/components/market/IctMarketChart";
import { AgingDemographics } from "@/components/market/AgingDemographics";
import { CareWorkforce } from "@/components/market/CareWorkforce";
import { PolicyTimeline } from "@/components/market/PolicyTimeline";
import { IctGrowthDrivers } from "@/components/market/IctGrowthDrivers";
import { MarketInsights } from "@/components/market/MarketInsights";

import marketData from "@/data/market-environment.json";

const SECTIONS: SectionDef[] = [
  { id: "insights", label: "インサイト" },
  { id: "ict-market", label: "ICT市場規模" },
  { id: "aging", label: "高齢化" },
  { id: "workforce", label: "介護人材" },
  { id: "drivers", label: "成長ドライバー" },
  { id: "policy", label: "制度改定" },
];

export default function MarketPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="マーケット環境"
        description="介護・障害福祉市場の構造とICT市場の成長ドライバーを理解する"
      />

      <SectionNav sections={SECTIONS} />

      <section id="insights">
        <MarketInsights data={marketData} />
      </section>

      <section id="ict-market">
        <IctMarketChart data={marketData.ictMarket} />
      </section>

      <section id="aging">
        <AgingDemographics data={marketData.agingDemographics} />
      </section>

      <section id="workforce">
        <CareWorkforce data={marketData.careWorkforce} />
      </section>

      <section id="drivers">
        <IctGrowthDrivers data={marketData.ictMarket} />
      </section>

      <section id="policy">
        <PolicyTimeline events={marketData.policyTimeline.events} />
      </section>
    </div>
  );
}
