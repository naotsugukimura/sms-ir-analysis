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
  ReferenceLine,
  LabelList,
} from "recharts";
import { CHART_TOOLTIP_STYLE } from "@/lib/constants";

interface DataPoint {
  year: number;
  marketSize: number;
  type: string;
}

export default function IctMarketChartInner({
  data,
  unit,
}: {
  data: DataPoint[];
  unit: string;
}) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 8%)" />
          <XAxis
            dataKey="year"
            tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
            axisLine={{ stroke: "oklch(1 0 0 / 10%)" }}
          />
          <YAxis
            tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
            axisLine={{ stroke: "oklch(1 0 0 / 10%)" }}
            label={{
              value: unit,
              position: "insideTopLeft",
              offset: -5,
              style: { fill: "oklch(0.708 0 0)", fontSize: 11 },
            }}
          />
          <Tooltip
            {...CHART_TOOLTIP_STYLE}
            formatter={(value: number) => [`${value}${unit}`, "市場規模"]}
          />
          <ReferenceLine
            x={2024}
            stroke="oklch(1 0 0 / 25%)"
            strokeDasharray="5 5"
            label={{
              value: "← 実績 | 予測 →",
              position: "top",
              style: { fill: "oklch(0.708 0 0)", fontSize: 10 },
            }}
          />
          <Bar dataKey="marketSize" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.type === "actual" ? "#10B981" : "#10B98166"}
              />
            ))}
            <LabelList
              dataKey="marketSize"
              position="top"
              style={{ fill: "oklch(0.708 0 0)", fontSize: 10 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
