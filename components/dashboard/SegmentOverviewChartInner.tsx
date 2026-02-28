"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { SegmentId } from "@/lib/types";

interface Props {
  data: Record<string, string | number>[];
  segmentConfig: Record<SegmentId, { name: string; color: string }>;
  tooltipStyle: {
    contentStyle: React.CSSProperties;
    labelStyle: React.CSSProperties;
  };
  formatRevenue: (v: number) => string;
}

const SEGMENT_ORDER: SegmentId[] = ["career", "care-saas", "healthcare", "international"];

export default function SegmentOverviewChartInner({ data, segmentConfig, tooltipStyle, formatRevenue }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: "oklch(0.708 0 0)" }} />
        <YAxis
          tick={{ fontSize: 11, fill: "oklch(0.708 0 0)" }}
          tickFormatter={(v) => formatRevenue(v)}
        />
        <Tooltip
          contentStyle={tooltipStyle.contentStyle}
          labelStyle={tooltipStyle.labelStyle}
          formatter={(value: number, name: string) => {
            const segId = name as SegmentId;
            const label = segmentConfig[segId]?.name ?? name;
            return [formatRevenue(value), label];
          }}
        />
        <Legend
          formatter={(value: string) => {
            const segId = value as SegmentId;
            return segmentConfig[segId]?.name ?? value;
          }}
          wrapperStyle={{ fontSize: 11 }}
        />
        {SEGMENT_ORDER.map((segId) => (
          <Bar
            key={segId}
            dataKey={segId}
            stackId="revenue"
            fill={segmentConfig[segId]?.color ?? "#6B7280"}
            radius={segId === "international" ? [4, 4, 0, 0] : undefined}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
