import { Card, CardContent } from "@/components/ui/card";
import { SourceBadge } from "@/components/shared/SourceBadge";
import type { SmsProfile } from "@/lib/types";

export function MissionStatement({ company }: { company: SmsProfile }) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2563EB] p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-blue-200">Mission</p>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              {company.mission}
            </h2>
          </div>
          <SourceBadge sourceRef={company.sourceRef} />
        </div>
      </div>
      <CardContent className="p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {company.missionDescription}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">設立</p>
            <p className="font-mono text-sm font-bold">{company.founded}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">証券コード</p>
            <p className="font-mono text-sm font-bold">{company.stockCode}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">市場</p>
            <p className="font-mono text-sm font-bold">{company.market}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">従業員数</p>
            <p className="font-mono text-sm font-bold">{company.employeeCount.toLocaleString()}人</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
