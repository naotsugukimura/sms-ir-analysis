import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SegmentBusinessModel } from "@/lib/types";
import { FLOW_TYPE_CONFIG } from "@/lib/constants";

export function StakeholderCards({ model }: { model: SegmentBusinessModel }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-sm font-bold">ビジネスモデル詳細</h3>

        <div className="mb-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-border p-3">
            <p className="text-[10px] text-muted-foreground">収益モデル</p>
            <p className="mt-1 text-xs font-bold">{model.revenueModel}</p>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className="text-[10px] text-muted-foreground">顧客セグメント</p>
            <p className="mt-1 text-xs font-bold">{model.customerSegment}</p>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className="text-[10px] text-muted-foreground">価値提案</p>
            <p className="mt-1 text-xs font-bold">{model.valueProposition}</p>
          </div>
        </div>

        <h4 className="mb-2 text-xs font-bold text-muted-foreground">重要KPI</h4>
        <div className="mb-6 flex flex-wrap gap-1.5">
          {model.keyMetrics.map((m) => (
            <Badge key={m} variant="outline" className="text-[10px]">{m}</Badge>
          ))}
        </div>

        <h4 className="mb-2 text-xs font-bold text-muted-foreground">ステークホルダー間のやり取り</h4>
        <div className="space-y-2">
          {model.edges.map((edge) => {
            const flowCfg = FLOW_TYPE_CONFIG[edge.type];
            const sourceNode = model.nodes.find((n) => n.id === edge.source);
            const targetNode = model.nodes.find((n) => n.id === edge.target);
            return (
              <div key={edge.id} className="flex items-start gap-2 rounded-lg border border-border p-2">
                <div
                  className="mt-1 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: flowCfg?.color ?? "#6B7280" }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="font-medium">{sourceNode?.label.replace(/\n/g, " ")}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-medium">{targetNode?.label.replace(/\n/g, " ")}</span>
                    <Badge variant="outline" className="text-[8px]" style={{ borderColor: flowCfg?.color, color: flowCfg?.color }}>
                      {flowCfg?.label}
                    </Badge>
                  </div>
                  <p className="text-[10px] font-medium">{edge.label}</p>
                  {edge.description && (
                    <p className="text-[10px] text-muted-foreground">{edge.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
