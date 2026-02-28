"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { CHART_TOOLTIP_STYLE } from "@/lib/constants";

interface RankingItem {
  rank: number;
  product: string;
  company: string;
  facilities: number;
  share: number;
}

export default function MarketShareChartInner({
  ranking,
}: {
  ranking: RankingItem[];
}) {
  const colors = [
    "#6B7280", // ほのぼの
    "#6B7280", // ワイズマン
    "#10B981", // カイポケ (highlight)
    "#6B7280", // カナミック
    "#6B7280", // ケアカルテ
    "#6B7280", // まもる君
    "#6B7280", // 介舟
  ];

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={ranking}
          layout="vertical"
          margin={{ top: 5, right: 60, bottom: 5, left: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
          <XAxis
            type="number"
            tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
            axisLine={{ stroke: "oklch(1 0 0 / 10%)" }}
          />
          <YAxis
            type="category"
            dataKey="product"
            tick={{ fill: "oklch(0.985 0 0)", fontSize: 12 }}
            axisLine={{ stroke: "oklch(1 0 0 / 10%)" }}
            width={95}
          />
          <Tooltip
            {...CHART_TOOLTIP_STYLE}
            formatter={(value: number, name: string) => {
              if (name === "facilities") return [`${value.toLocaleString()} 事業所`, "導入数"];
              return [value, name];
            }}
          />
          <Bar dataKey="facilities" radius={[0, 4, 4, 0]}>
            {ranking.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index] || "#6B7280"} />
            ))}
            <LabelList
              dataKey="facilities"
              position="right"
              formatter={(value: number) => value.toLocaleString()}
              style={{ fill: "oklch(0.708 0 0)", fontSize: 11 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
