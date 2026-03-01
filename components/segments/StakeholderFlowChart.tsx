"use client";

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { SourceBadge } from "@/components/shared/SourceBadge";
import type { SegmentBusinessModel } from "@/lib/types";
import { FLOW_TYPE_CONFIG } from "@/lib/constants";

const FlowChartInner = dynamic(() => import("./FlowChartInner"), {
  ssr: false,
  loading: () => <div className="h-[400px] animate-pulse rounded-lg bg-muted" />,
});

export function StakeholderFlowChart({
  model,
  color,
}: {
  model: SegmentBusinessModel;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-bold">ビジネスモデル - ステークホルダーフロー</h3>
          <SourceBadge sourceRef={model.sourceRef} />
        </div>
        <p className="mb-4 text-xs text-muted-foreground">{model.summary}</p>

        {/* Legend */}
        <div className="mb-3 flex flex-wrap gap-3">
          {Object.entries(FLOW_TYPE_CONFIG).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="h-0.5 w-4" style={{ backgroundColor: cfg.color }} />
              <span className="text-[10px] text-muted-foreground">{cfg.label}</span>
            </div>
          ))}
        </div>

        <div className="h-[400px] rounded-lg border border-border">
          <FlowChartInner model={model} segmentColor={color} />
        </div>
      </CardContent>
    </Card>
  );
}
