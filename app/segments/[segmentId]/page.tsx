import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { StakeholderFlowChart } from "@/components/segments/StakeholderFlowChart";
import { StakeholderCards } from "@/components/segments/StakeholderCards";
import { MarketSizeSection } from "@/components/segments/MarketSizeSection";
import { SegmentPL } from "@/components/segments/SegmentPL";
import { SegmentKpiCards } from "@/components/segments/SegmentKpiCards";
import {
  getSegmentById,
  getBusinessModelBySegment,
  getMarketSizingBySegment,
  getFinancials,
} from "@/lib/data";
import type { SegmentId } from "@/lib/types";

export function generateStaticParams() {
  return [
    { segmentId: "career" },
    { segmentId: "care-saas" },
    { segmentId: "healthcare" },
    { segmentId: "international" },
  ];
}

export default async function SegmentDetailPage({
  params,
}: {
  params: Promise<{ segmentId: string }>;
}) {
  const { segmentId } = await params;
  const segment = getSegmentById(segmentId as SegmentId);
  if (!segment) notFound();

  const businessModel = getBusinessModelBySegment(segmentId as SegmentId);
  const marketSizing = getMarketSizingBySegment(segmentId as SegmentId);
  const financials = getFinancials();

  return (
    <div className="space-y-8">
      <PageHeader
        title={segment.name}
        description={segment.nameEn}
      >
        <Badge
          className="text-xs text-white"
          style={{ backgroundColor: segment.color }}
        >
          売上構成比 {(segment.revenueShareLatest * 100).toFixed(1)}%
        </Badge>
      </PageHeader>

      <p className="text-sm text-muted-foreground">{segment.description}</p>

      <SegmentKpiCards segment={segment} />

      {businessModel && (
        <>
          <StakeholderFlowChart model={businessModel} color={segment.color} />
          <StakeholderCards model={businessModel} />
        </>
      )}

      {marketSizing && <MarketSizeSection market={marketSizing} color={segment.color} />}

      <SegmentPL segmentId={segmentId as SegmentId} financials={financials} color={segment.color} />
    </div>
  );
}
