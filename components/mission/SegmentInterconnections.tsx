"use client";

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";

const FlowDiagram = dynamic(() => import("./SegmentFlowDiagram"), {
  ssr: false,
  loading: () => <div className="h-[400px] animate-pulse rounded-lg bg-muted" />,
});

export function SegmentInterconnections() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-2 text-sm font-bold">セグメント間の相互関係</h3>
        <p className="mb-4 text-xs text-muted-foreground">
          各事業がどのように連携し、シナジーを生み出しているか
        </p>
        <div className="h-[400px] rounded-lg border border-border">
          <FlowDiagram />
        </div>
      </CardContent>
    </Card>
  );
}
