"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CriterionData {
  item: string;
  importance: number;
  kaipokeScore: number;
}

interface SelectionData {
  title: string;
  criteria: CriterionData[];
}

export function SelectionCriteria({ data }: { data: SelectionData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.criteria.map((criterion) => (
          <div key={criterion.item} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{criterion.item}</span>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span>重要度 {criterion.importance}%</span>
                <span className="font-medium text-emerald-400">
                  カイポケ {criterion.kaipokeScore}点
                </span>
              </div>
            </div>
            <div className="relative h-4 rounded-full bg-muted">
              {/* Importance bar (background) */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-muted-foreground/20"
                style={{ width: `${criterion.importance}%` }}
              />
              {/* Kaipoke score bar */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-emerald-500/60"
                style={{ width: `${criterion.kaipokeScore}%` }}
              />
            </div>
          </div>
        ))}
        <div className="mt-2 flex gap-4 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-4 rounded bg-muted-foreground/20" />
            顧客重要度
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-4 rounded bg-emerald-500/60" />
            カイポケスコア
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
