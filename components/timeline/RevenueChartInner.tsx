"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { SegmentId } from "@/lib/types";

const SEGMENT_ORDER: SegmentId[] = ["career", "care-saas", "healthcare", "international"];

interface Props {
  data: Record<string, string | number>[];
  segmentConfig: Record<SegmentId, { name: string; color: string }>;
  tooltipStyle: { contentStyle: React.CSSProperties; labelStyle: React.CSSProperties };
  formatRevenue: (v: number) => string;
}

export default function RevenueChartInner({ data, segmentConfig, tooltipStyle, formatRevenue }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: "oklch(0.708 0 0)" }} />
        <YAxis
          tick={{ fontSize: 11, fill: "oklch(0.708 0 0)" }}
          tickFormatter={(v) => formatRevenue(v)}
        />
        <Tooltip
          contentStyle={tooltipStyle.contentStyle}
          labelStyle={tooltipStyle.labelStyle}
          formatter={(value: number, name: string) => [
            formatRevenue(value),
            segmentConfig[name as SegmentId]?.name ?? name,
          ]}
        />
        <Legend
          formatter={(v: string) => segmentConfig[v as SegmentId]?.name ?? v}
          wrapperStyle={{ fontSize: 11 }}
        />
        {SEGMENT_ORDER.map((segId) => (
          <Area
            key={segId}
            type="monotone"
            dataKey={segId}
            stackId="rev"
            fill={segmentConfig[segId]?.color ?? "#6B7280"}
            stroke={segmentConfig[segId]?.color ?? "#6B7280"}
            fillOpacity={0.6}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
