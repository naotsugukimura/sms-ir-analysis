import { Card, CardContent } from "@/components/ui/card";

interface PredictabilityData {
  title: string;
  description: string;
  logic: string[];
  comparisonWithOther: Record<string, { nextYearVisibility: string; description: string }>;
}

export function SaasPredictability({ data }: { data: PredictabilityData }) {
  const comparisons = [
    { key: "saas", label: "SaaS", color: "#10B981" },
    { key: "staffing", label: "人材紹介", color: "#3B82F6" },
    { key: "consulting", label: "コンサル", color: "#F59E0B" },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-2 text-sm font-bold">{data.title}</h3>
        <p className="mb-4 text-xs text-muted-foreground">{data.description}</p>

        {/* Logic chain */}
        <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="mb-2 text-xs font-bold text-amber-400">なぜ予測できるのか？</p>
          <div className="space-y-2">
            {data.logic.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 font-mono text-[10px] font-bold text-amber-400">
                  {i + 1}
                </span>
                <p className="text-xs font-mono">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison bars */}
        <h4 className="mb-3 text-xs font-bold text-muted-foreground">来期売上の予測可能性：ビジネスモデル比較</h4>
        <div className="space-y-3">
          {comparisons.map((comp) => {
            const d = data.comparisonWithOther[comp.key];
            if (!d) return null;
            const pct = parseInt(d.nextYearVisibility.split("-")[1] || d.nextYearVisibility);
            return (
              <div key={comp.key}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-bold">{comp.label}</span>
                  <span className="font-mono text-xs font-bold" style={{ color: comp.color }}>
                    {d.nextYearVisibility}
                  </span>
                </div>
                <div className="h-6 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="flex h-full items-center justify-end rounded-full px-2 text-[10px] font-bold text-white transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: comp.color,
                    }}
                  >
                    {d.nextYearVisibility}
                  </div>
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{d.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-md bg-[#1E3A5F]/20 p-3">
          <p className="text-[10px] font-medium text-blue-300">SMSの示唆</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            SMSのキャリア事業（人材紹介）はフロー型で予測困難だが、カイポケ（SaaS）はストック型で予測しやすい。
            SaaS比率を高めることが、SMS全体の予測可能性と企業価値向上に直結する。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
