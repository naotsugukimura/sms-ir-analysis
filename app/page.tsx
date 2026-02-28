import { PageHeader } from "@/components/layout/PageHeader";
import { KpiSummaryCards } from "@/components/dashboard/KpiSummaryCards";
import { SegmentOverviewChart } from "@/components/dashboard/SegmentOverviewChart";
import { LatestEarningsDigest } from "@/components/dashboard/LatestEarningsDigest";
import { getFinancials, getCompanyProfile, getSegments } from "@/lib/data";

export default function HomePage() {
  const financials = getFinancials();
  const company = getCompanyProfile();
  const segments = getSegments();

  return (
    <div className="space-y-8">
      <PageHeader
        title="SMS IR分析ダッシュボード"
        description={`${company.name}（${company.stockCode}）の事業分析`}
      />

      <KpiSummaryCards financials={financials} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SegmentOverviewChart financials={financials} segments={segments} />
        </div>
        <div>
          <LatestEarningsDigest />
        </div>
      </div>
    </div>
  );
}
