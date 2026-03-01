"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { SectionNav, type SectionDef } from "@/components/layout/SectionNav";
import { MissionStatement } from "@/components/mission/MissionStatement";
import { FoundingStory } from "@/components/mission/FoundingStory";
import { PortfolioBreakdown } from "@/components/mission/PortfolioBreakdown";
import { SegmentInterconnections } from "@/components/mission/SegmentInterconnections";
import { getCompanyProfile, getHistory, getFinancials, getSegments } from "@/lib/data";

const SECTIONS: SectionDef[] = [
  { id: "mission", label: "ミッション" },
  { id: "founding", label: "創業ストーリー" },
  { id: "portfolio", label: "ポートフォリオ" },
  { id: "interconnections", label: "事業間連携" },
];

export default function MissionPage() {
  const company = getCompanyProfile();
  const history = getHistory();
  const financials = getFinancials();
  const segments = getSegments();

  return (
    <div className="space-y-8">
      <PageHeader
        title="ミッション & 事業ポートフォリオ"
        description="SMSの創業理念と事業構造の全体像"
      />

      <SectionNav sections={SECTIONS} />

      <section id="mission">
        <MissionStatement company={company} />
      </section>

      <section id="founding">
        <FoundingStory events={history} />
      </section>

      <section id="portfolio">
        <PortfolioBreakdown financials={financials} segments={segments} />
      </section>

      <section id="interconnections">
        <SegmentInterconnections />
      </section>
    </div>
  );
}
