"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { SectionNav, type SectionDef } from "@/components/layout/SectionNav";
import { RevenueTimeSeriesChart } from "@/components/timeline/RevenueTimeSeriesChart";
import { ProfitTimeSeriesChart } from "@/components/timeline/ProfitTimeSeriesChart";
import { StrategicShiftsTimeline } from "@/components/timeline/StrategicShiftsTimeline";
import { getFinancials, getHistory, getStrategies } from "@/lib/data";

const SECTIONS: SectionDef[] = [
  { id: "revenue", label: "売上推移" },
  { id: "profit", label: "利益推移" },
  { id: "strategy", label: "戦略シフト" },
];

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

      <SectionNav sections={SECTIONS} />

      <section id="revenue">
        <RevenueTimeSeriesChart financials={financials} />
      </section>

      <section id="profit">
        <ProfitTimeSeriesChart financials={financials} />
      </section>

      <section id="strategy">
        <StrategicShiftsTimeline events={history} strategies={strategies} />
      </section>
    </div>
  );
}
