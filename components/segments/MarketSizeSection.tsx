import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SourceBadge } from "@/components/shared/SourceBadge";
import type { SegmentMarketSize } from "@/lib/types";
import { formatPercent } from "@/lib/utils";

export function MarketSizeSection({
  market,
  color,
}: {
  market: SegmentMarketSize;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold">市場規模 & 成長ドライバー</h3>
          <SourceBadge sourceRef={market.sourceRef} />
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground">TAM（対象市場規模）</p>
            <p className="mt-1 font-mono text-2xl font-bold">
              {(market.tam.value / 10).toLocaleString()}億円
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground">
              {market.tam.year}年 {market.tam.description}
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground">年間成長率</p>
            <p className="mt-1 font-mono text-2xl font-bold" style={{ color }}>
              {formatPercent(market.growthRate * 100)}
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground">市場の年間成長率</p>
          </div>
        </div>

        <h4 className="mb-2 text-xs font-bold text-muted-foreground">成長ドライバー</h4>
        <div className="mb-4 space-y-1.5">
          {market.growthDrivers.map((driver, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border border-border p-2">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: color }}>
                {i + 1}
              </span>
              <span className="text-xs">{driver}</span>
            </div>
          ))}
        </div>

        <h4 className="mb-2 text-xs font-bold text-muted-foreground">競争環境</h4>
        <p className="text-xs text-muted-foreground">{market.competitiveLandscape}</p>
      </CardContent>
    </Card>
  );
}
