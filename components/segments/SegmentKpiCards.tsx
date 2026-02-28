import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SegmentDefinition } from "@/lib/types";

export function SegmentKpiCards({ segment }: { segment: SegmentDefinition }) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="mb-3 text-sm font-bold">サービス構成</h3>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          {segment.subServices.map((sub) => (
            <div key={sub.name} className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{sub.name}</span>
                <Badge
                  variant="outline"
                  className="text-[10px]"
                  style={{
                    borderColor:
                      sub.status === "core" ? "#10B981"
                        : sub.status === "growing" ? "#3B82F6"
                        : sub.status === "new" ? "#F59E0B"
                        : "#6B7280",
                    color:
                      sub.status === "core" ? "#10B981"
                        : sub.status === "growing" ? "#3B82F6"
                        : sub.status === "new" ? "#F59E0B"
                        : "#6B7280",
                  }}
                >
                  {sub.status === "core" ? "コア" : sub.status === "growing" ? "成長中" : sub.status === "new" ? "新規" : "縮小"}
                </Badge>
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">{sub.description}</p>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                開始: {sub.launchYear}年
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
