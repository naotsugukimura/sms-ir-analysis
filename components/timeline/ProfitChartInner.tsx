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

interface Props {
  data: { year: string; revenue: number; operatingProfit: number; margin: number; roe: number | null }[];
  tooltipStyle: { contentStyle: React.CSSProperties; labelStyle: React.CSSProperties };
  formatRevenue: (v: number) => string;
  formatPercent: (v: number) => string;
}

export default function ProfitChartInner({ data, tooltipStyle, formatRevenue, formatPercent }: Props) {
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
            if (name === "営業利益率") return [formatPercent(value), name];
            if (name === "ROE") return [value !== null ? formatPercent(value) : "—", name];
            return [formatRevenue(value), name];
          }}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" opacity={0.5} radius={[4, 4, 0, 0]} name="売上高" />
        <Bar yAxisId="left" dataKey="operatingProfit" fill="#10B981" radius={[4, 4, 0, 0]} name="営業利益" />
        <Line yAxisId="right" dataKey="margin" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} name="営業利益率" />
        <Line yAxisId="right" dataKey="roe" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" name="ROE" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
