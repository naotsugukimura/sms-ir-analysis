"use client";

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { CHART_TOOLTIP_STYLE } from "@/lib/constants";

interface DataPoint {
  year: number;
  totalPopulation: number;
  over65: number;
  over75: number;
  agingRate: number;
  type: string;
}

export default function AgingChartInner({ data }: { data: DataPoint[] }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 30, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
          <XAxis
            dataKey="year"
            tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
            axisLine={{ stroke: "oklch(1 0 0 / 10%)" }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
            axisLine={{ stroke: "oklch(1 0 0 / 10%)" }}
            label={{
              value: "万人",
              position: "insideTopLeft",
              offset: -5,
              style: { fill: "oklch(0.708 0 0)", fontSize: 11 },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[25, 40]}
            tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
            axisLine={{ stroke: "oklch(1 0 0 / 10%)" }}
            label={{
              value: "%",
              position: "insideTopRight",
              offset: -5,
              style: { fill: "oklch(0.708 0 0)", fontSize: 11 },
            }}
          />
          <Tooltip
            {...CHART_TOOLTIP_STYLE}
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                over65: "65歳以上",
                over75: "75歳以上",
                agingRate: "高齢化率",
              };
              const unit = name === "agingRate" ? "%" : "万人";
              return [`${value.toLocaleString()}${unit}`, labels[name] || name];
            }}
          />
          <Legend
            formatter={(value: string) => {
              const labels: Record<string, string> = {
                over65: "65歳以上人口",
                over75: "75歳以上人口",
                agingRate: "高齢化率",
              };
              return labels[value] || value;
            }}
            wrapperStyle={{ fontSize: 11 }}
          />
          <ReferenceLine
            x={2024}
            yAxisId="left"
            stroke="oklch(1 0 0 / 25%)"
            strokeDasharray="5 5"
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="over65"
            fill="#F59E0B22"
            stroke="#F59E0B"
            strokeWidth={2}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="over75"
            fill="#EF444422"
            stroke="#EF4444"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="agingRate"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={{ fill: "#8B5CF6", r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
