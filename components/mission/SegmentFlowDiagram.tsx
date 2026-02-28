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

function SegmentNode({ data }: { data: { label: string; sub: string; color: string; revenue: string } }) {
  return (
    <div
      className="rounded-xl border-2 bg-card px-4 py-3 text-center shadow-lg"
      style={{ borderColor: data.color }}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0" />
      <div className="text-xs font-bold" style={{ color: data.color }}>{data.label}</div>
      <div className="mt-0.5 text-[10px] text-muted-foreground">{data.sub}</div>
      <div className="mt-1 font-mono text-sm font-bold">{data.revenue}</div>
    </div>
  );
}

const nodeTypes = { segment: SegmentNode };

const nodes: Node[] = [
  {
    id: "career",
    type: "segment",
    position: { x: 50, y: 50 },
    data: { label: "キャリア事業", sub: "人材紹介", color: "#3B82F6", revenue: "268億" },
  },
  {
    id: "care-saas",
    type: "segment",
    position: { x: 350, y: 50 },
    data: { label: "介護・障害福祉SaaS", sub: "カイポケ+BPO", color: "#10B981", revenue: "158億" },
  },
  {
    id: "healthcare",
    type: "segment",
    position: { x: 50, y: 250 },
    data: { label: "ヘルスケア", sub: "健康経営+メディア", color: "#F59E0B", revenue: "126億" },
  },
  {
    id: "international",
    type: "segment",
    position: { x: 350, y: 250 },
    data: { label: "海外事業", sub: "MIMS (APAC)", color: "#8B5CF6", revenue: "—" },
  },
];

const edges: Edge[] = [
  {
    id: "e1",
    source: "career",
    target: "care-saas",
    label: "カイポケ顧客への人材供給",
    style: { stroke: "#3B82F6" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#3B82F6" },
    labelStyle: { fill: "oklch(0.708 0 0)", fontSize: 10 },
    labelBgStyle: { fill: "oklch(0.205 0 0)", fillOpacity: 0.8 },
  },
  {
    id: "e2",
    source: "care-saas",
    target: "career",
    label: "SaaS経由の採用ニーズ",
    style: { stroke: "#10B981" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#10B981" },
    labelStyle: { fill: "oklch(0.708 0 0)", fontSize: 10 },
    labelBgStyle: { fill: "oklch(0.205 0 0)", fillOpacity: 0.8 },
  },
  {
    id: "e3",
    source: "care-saas",
    target: "healthcare",
    label: "事業所データ共有",
    style: { stroke: "#8B5CF6", strokeDasharray: "5 5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8B5CF6" },
    labelStyle: { fill: "oklch(0.708 0 0)", fontSize: 10 },
    labelBgStyle: { fill: "oklch(0.205 0 0)", fillOpacity: 0.8 },
  },
  {
    id: "e4",
    source: "healthcare",
    target: "international",
    label: "ヘルスケアノウハウの海外展開",
    style: { stroke: "#F59E0B", strokeDasharray: "5 5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#F59E0B" },
    labelStyle: { fill: "oklch(0.708 0 0)", fontSize: 10 },
    labelBgStyle: { fill: "oklch(0.205 0 0)", fillOpacity: 0.8 },
  },
  {
    id: "e5",
    source: "career",
    target: "healthcare",
    label: "産業保健人材の供給",
    style: { stroke: "#3B82F6", strokeDasharray: "5 5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#3B82F6" },
    labelStyle: { fill: "oklch(0.708 0 0)", fontSize: 10 },
    labelBgStyle: { fill: "oklch(0.205 0 0)", fillOpacity: 0.8 },
  },
];

export default function SegmentFlowDiagram() {
  const onInit = useCallback(() => {}, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onInit={onInit}
      fitView
      minZoom={0.5}
      maxZoom={1.5}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="oklch(1 0 0 / 5%)" gap={20} />
      <Controls
        showInteractive={false}
        className="!bg-card !border-border"
      />
    </ReactFlow>
  );
}
