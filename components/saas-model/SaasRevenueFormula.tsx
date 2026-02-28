import { Card, CardContent } from "@/components/ui/card";

interface FormulaData {
  title: string;
  formula: string;
  expanded: string;
  alternativeView: string;
  components: {
    key: string;
    name: string;
    nameJa: string;
    description: string;
    smsContext: string;
  }[];
}

export function SaasRevenueFormula({ data }: { data: FormulaData }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-sm font-bold">{data.title}</h3>

        {/* Main formula */}
        <div className="mb-6 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
          <p className="mb-1 text-xs text-muted-foreground">基本公式</p>
          <p className="font-mono text-2xl font-bold text-emerald-400">{data.formula}</p>
          <p className="mt-2 font-mono text-sm text-muted-foreground">{data.expanded}</p>
        </div>

        <div className="mb-6 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4 text-center">
          <p className="mb-1 text-xs text-muted-foreground">累積ベースの見方</p>
          <p className="font-mono text-lg font-bold text-blue-400">{data.alternativeView}</p>
        </div>

        {/* Components breakdown */}
        <h4 className="mb-3 text-xs font-bold text-muted-foreground">公式の各要素</h4>
        <div className="grid gap-3 md:grid-cols-3">
          {data.components.map((comp) => (
            <div key={comp.key} className="rounded-lg border border-border p-4">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 font-mono text-xs font-bold text-emerald-400">
                  {comp.key}
                </span>
                <span className="text-[10px] text-muted-foreground">{comp.name}</span>
              </div>
              <p className="mt-1 text-xs font-bold">{comp.nameJa}</p>
              <p className="mt-2 text-[11px] text-muted-foreground">{comp.description}</p>
              <div className="mt-3 rounded-md bg-[#1E3A5F]/20 p-2">
                <p className="text-[10px] font-medium text-blue-300">SMS カイポケの場合</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{comp.smsContext}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
