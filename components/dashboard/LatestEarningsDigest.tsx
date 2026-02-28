import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SourceBadge } from "@/components/shared/SourceBadge";

export function LatestEarningsDigest() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold">最新決算ハイライト</h3>
          <SourceBadge sourceRef="fy25-q3-presentation" />
        </div>
        <Badge variant="outline" className="mb-3 text-[10px]">
          FY2026 Q3（2025年12月期）
        </Badge>
        <div className="space-y-3 text-xs">
          <div>
            <p className="text-muted-foreground">累計売上高</p>
            <p className="font-mono text-lg font-bold">473億円</p>
            <p className="text-emerald-400">前年同期比 +5.5%</p>
          </div>
          <div>
            <p className="text-muted-foreground">累計営業利益</p>
            <p className="font-mono text-lg font-bold">39億円</p>
            <p className="text-emerald-400">前年同期比 +8.7%</p>
          </div>
          <div className="border-t border-border pt-2">
            <p className="mb-1 font-medium">注目ポイント</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>- カイポケ ARPA: 50万円/年</li>
              <li>- カイポケ会員: 59,300事業所</li>
              <li>- MIMS会員: 365万人</li>
              <li>- 新社長の企業価値経営</li>
              <li>- EPS成長率15%目標</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
