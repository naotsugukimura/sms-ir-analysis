"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { SegmentBusinessModel, FlowType } from "@/lib/types";
import { FLOW_TYPE_CONFIG } from "@/lib/constants";

const NODE_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  sms: { bg: "#1E3A5F30", border: "#1E3A5F", text: "#93C5FD" },
  customer: { bg: "#3B82F620", border: "#3B82F6", text: "#93C5FD" },
  "end-user": { bg: "#10B98120", border: "#10B981", text: "#6EE7B7" },
  government: { bg: "#F59E0B20", border: "#F59E0B", text: "#FCD34D" },
  partner: { bg: "#8B5CF620", border: "#8B5CF6", text: "#C4B5FD" },
  platform: { bg: "#EF444420", border: "#EF4444", text: "#FCA5A5" },
};

function StakeholderNode({ data }: { data: { label: string; description?: string; nodeType: string } }) {
  const style = NODE_STYLES[data.nodeType] ?? NODE_STYLES.partner;

  return (
    <div
      className="rounded-xl border-2 px-4 py-3 text-center shadow-md"
      style={{ backgroundColor: style.bg, borderColor: style.border, minWidth: 120 }}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0" />
      <div className="whitespace-pre-line text-xs font-bold" style={{ color: style.text }}>
        {data.label}
      </div>
      {data.description && (
        <div className="mt-1 text-[9px] text-muted-foreground">{data.description}</div>
      )}
    </div>
  );
}

const nodeTypes = { stakeholder: StakeholderNode };

export default function FlowChartInner({
  model,
}: {
  model: SegmentBusinessModel;
  segmentColor: string;
}) {
  const nodes: Node[] = model.nodes.map((n) => ({
    id: n.id,
    type: "stakeholder",
    position: n.position,
    data: { label: n.label, description: n.description, nodeType: n.type },
  }));

  const edges: Edge[] = model.edges.map((e) => {
    const flowColor = FLOW_TYPE_CONFIG[e.type as FlowType]?.color ?? "#6B7280";
    return {
      id: e.id,
      source: e.source,
      target: e.target,
      label: e.label,
      style: { stroke: flowColor, strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: flowColor, width: 15, height: 15 },
      labelStyle: { fill: "oklch(0.708 0 0)", fontSize: 10 },
      labelBgStyle: { fill: "oklch(0.205 0 0)", fillOpacity: 0.9 },
      labelBgPadding: [4, 6] as [number, number],
      labelBgBorderRadius: 4,
    };
  });

  const onInit = useCallback(() => {}, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onInit={onInit}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.5}
      maxZoom={2}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="oklch(1 0 0 / 5%)" gap={20} />
      <Controls showInteractive={false} className="!bg-card !border-border" />
    </ReactFlow>
  );
}
