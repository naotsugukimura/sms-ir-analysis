import { PageHeader } from "@/components/layout/PageHeader";
import { MissionStatement } from "@/components/mission/MissionStatement";
import { FoundingStory } from "@/components/mission/FoundingStory";
import { PortfolioBreakdown } from "@/components/mission/PortfolioBreakdown";
import { SegmentInterconnections } from "@/components/mission/SegmentInterconnections";
import { getCompanyProfile, getHistory, getFinancials, getSegments } from "@/lib/data";

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

      <MissionStatement company={company} />
      <FoundingStory events={history} />
      <PortfolioBreakdown financials={financials} segments={segments} />
      <SegmentInterconnections />
    </div>
  );
}
