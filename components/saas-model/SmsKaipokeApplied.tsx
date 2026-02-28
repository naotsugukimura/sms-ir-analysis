import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AppliedData {
  segmentName: string;
  revenueModel: {
    formula: string;
    currentNumbers: {
      arpa: number;
      arpaUnit: string;
      accounts: number;
      accountUnit: string;
      facilities: number;
      facilityUnit: string;
      estimatedARR: number;
    };
  };
  unitEconomicsEstimate: {
    ltv: string;
    cac: string;
    ltvCacRatio: string;
    cacPayback: string;
    note: string;
  };
  growthLevers: {
    lever: string;
    description: string;
    impact: string;
  }[];
}

const IMPACT_COLORS: Record<string, string> = {
  "高": "#10B981",
  "中": "#F59E0B",
  "低": "#6B7280",
};

export function SmsKaipokeApplied({ data }: { data: AppliedData }) {
  const n = data.revenueModel.currentNumbers;

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-muted-foreground">カイポケへの当てはめ</h2>

      {/* Revenue model */}
      <Card className="border-[#1E3A5F]/50">
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-bold">{data.segmentName} - 売上公式の当てはめ</h3>

          <div className="mb-6 rounded-xl border-2 border-[#1E3A5F]/50 bg-[#1E3A5F]/10 p-6 text-center">
            <p className="mb-1 text-xs text-muted-foreground">カイポケの売上公式</p>
            <p className="font-mono text-xl font-bold text-blue-400">{data.revenueModel.formula}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-[10px] text-muted-foreground">ARPA</p>
              <p className="mt-1 font-mono text-xl font-bold text-emerald-400">
                {(n.arpa / 10000).toFixed(1)}万円
              </p>
              <p className="text-[10px] text-muted-foreground">{n.arpaUnit}</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-[10px] text-muted-foreground">法人数</p>
              <p className="mt-1 font-mono text-xl font-bold text-blue-400">
                {n.accounts.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">{n.accountUnit}</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-[10px] text-muted-foreground">事業所数</p>
              <p className="mt-1 font-mono text-xl font-bold text-violet-400">
                {n.facilities.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">{n.facilityUnit}</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-[10px] text-muted-foreground">推定ARR</p>
              <p className="mt-1 font-mono text-xl font-bold text-amber-400">
                {(n.estimatedARR / 10).toFixed(0)}億円
              </p>
              <p className="text-[10px] text-muted-foreground">ARPA × 法人数</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unit Economics */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-bold">ユニットエコノミクス（推定）</h3>

          <div className="mb-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="text-[10px] text-muted-foreground">LTV（顧客生涯価値）</p>
              <p className="mt-1 font-mono text-sm font-bold text-emerald-400">{data.unitEconomicsEstimate.ltv}</p>
            </div>
            <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
              <p className="text-[10px] text-muted-foreground">CAC（顧客獲得コスト）</p>
              <p className="mt-1 font-mono text-sm font-bold text-orange-400">{data.unitEconomicsEstimate.cac}</p>
            </div>
          </div>

          <div className="mb-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
              <p className="text-[10px] text-muted-foreground">LTV/CAC比率</p>
              <p className="mt-1 font-mono text-lg font-bold text-violet-400">{data.unitEconomicsEstimate.ltvCacRatio}</p>
              <p className="mt-0.5 text-[10px] text-emerald-400">3x以上 → 健全 ✓</p>
            </div>
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
              <p className="text-[10px] text-muted-foreground">CAC回収期間</p>
              <p className="mt-1 font-mono text-lg font-bold text-blue-400">{data.unitEconomicsEstimate.cacPayback}</p>
              <p className="mt-0.5 text-[10px] text-amber-400">12ヶ月以内が理想</p>
            </div>
          </div>

          <div className="rounded-md bg-amber-500/10 p-2">
            <p className="text-[10px] text-amber-400">{data.unitEconomicsEstimate.note}</p>
          </div>
        </CardContent>
      </Card>

      {/* Growth levers */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-bold">カイポケの成長レバー</h3>
          <div className="space-y-2">
            {data.growthLevers.map((lever) => {
              const impactColor = IMPACT_COLORS[lever.impact] ?? "#6B7280";
              return (
                <div key={lever.lever} className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <Badge
                    variant="outline"
                    className="mt-0.5 shrink-0 text-[10px]"
                    style={{ borderColor: impactColor, color: impactColor }}
                  >
                    影響度: {lever.impact}
                  </Badge>
                  <div>
                    <p className="text-xs font-bold">{lever.lever}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{lever.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-lg border-2 border-emerald-500/30 bg-emerald-500/5 p-4">
            <p className="text-xs font-bold text-emerald-400">管理会計的なまとめ</p>
            <p className="mt-2 text-[11px] text-muted-foreground">
              カイポケの売上成長は「顧客数 × ARPA」の掛け算。
              顧客数は障害福祉への横展開で拡大、ARPAはBPO・ファクタリング追加で上昇させる。
              同時に解約率を改善してNRRを高め、ストック型の売上基盤を強化する。
              これにより「来期の売上予測可能性」がさらに高まり、企業価値の安定的な向上に繋がる。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
