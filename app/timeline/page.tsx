import { PageHeader } from "@/components/layout/PageHeader";
import { RevenueTimeSeriesChart } from "@/components/timeline/RevenueTimeSeriesChart";
import { ProfitTimeSeriesChart } from "@/components/timeline/ProfitTimeSeriesChart";
import { StrategicShiftsTimeline } from "@/components/timeline/StrategicShiftsTimeline";
import { getFinancials, getHistory, getStrategies } from "@/lib/data";

export default function TimelinePage() {
  const financials = getFinancials();
  const history = getHistory();
  const strategies = getStrategies();

  return (
    <div className="space-y-8">
      <PageHeader
        title="時系列分析"
        description="SMSの事業成長・戦略シフトの時系列推移"
      />

      <RevenueTimeSeriesChart financials={financials} />
      <ProfitTimeSeriesChart financials={financials} />
      <StrategicShiftsTimeline events={history} strategies={strategies} />
    </div>
  );
}
