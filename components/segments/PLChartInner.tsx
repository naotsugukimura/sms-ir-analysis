"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatRevenue, formatPercent } from "@/lib/utils";

interface Props {
  data: { year: string; revenue: number; profit: number; margin: number }[];
  color: string;
  tooltipStyle: {
    contentStyle: React.CSSProperties;
    labelStyle: React.CSSProperties;
  };
}

export default function PLChartInner({ data, color, tooltipStyle }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 5, right: 30, bottom: 5, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: "oklch(0.708 0 0)" }} />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 11, fill: "oklch(0.708 0 0)" }}
          tickFormatter={(v) => formatRevenue(v)}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 11, fill: "oklch(0.708 0 0)" }}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={tooltipStyle.contentStyle}
          labelStyle={tooltipStyle.labelStyle}
          formatter={(value: number, name: string) => {
            if (name === "margin") return [formatPercent(value), "利益率"];
            if (name === "profit") return [formatRevenue(value), "営業利益"];
            return [formatRevenue(value), "売上高"];
          }}
        />
        <Legend
          formatter={(value: string) => {
            if (value === "revenue") return "売上高";
            if (value === "profit") return "営業利益";
            if (value === "margin") return "利益率";
            return value;
          }}
          wrapperStyle={{ fontSize: 11 }}
        />
        <Bar yAxisId="left" dataKey="revenue" fill={color} opacity={0.7} radius={[4, 4, 0, 0]} name="revenue" />
        <Bar yAxisId="left" dataKey="profit" fill={`${color}99`} radius={[4, 4, 0, 0]} name="profit" />
        <Line yAxisId="right" dataKey="margin" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} name="margin" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
