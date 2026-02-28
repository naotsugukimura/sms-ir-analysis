"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Minus } from "lucide-react";

interface Feature {
  name: string;
  available: boolean;
  strength: string;
}

interface Competitor {
  id: string;
  product: string;
  features: Feature[];
}

const FEATURE_NAMES = [
  "介護保険請求",
  "障害福祉請求",
  "介護記録",
  "計画書作成",
  "タブレット対応",
  "LIFE連携",
  "BPO（請求代行）",
  "ファクタリング",
  "AI機能",
  "経営分析",
  "勤怠管理",
  "給与計算",
];

function StrengthIcon({ strength }: { strength: string }) {
  switch (strength) {
    case "high":
      return <Check className="h-4 w-4 text-emerald-400" />;
    case "medium":
      return <Check className="h-4 w-4 text-yellow-400" />;
    case "low":
      return <Minus className="h-4 w-4 text-gray-500" />;
    case "none":
      return <X className="h-4 w-4 text-red-400/50" />;
    default:
      return <X className="h-4 w-4 text-red-400/50" />;
  }
}

export function FeatureComparison({ competitors }: { competitors: Competitor[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>機能比較マトリクス</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-40 text-xs">機能</TableHead>
              {competitors.map((comp) => (
                <TableHead
                  key={comp.id}
                  className={`text-center text-xs ${comp.id === "kaipoke" ? "bg-emerald-500/10" : ""}`}
                >
                  {comp.product}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {FEATURE_NAMES.map((featureName) => (
              <TableRow key={featureName}>
                <TableCell className="text-xs font-medium">{featureName}</TableCell>
                {competitors.map((comp) => {
                  const feature = comp.features.find(
                    (f) => f.name === featureName
                  );
                  return (
                    <TableCell
                      key={comp.id}
                      className={`text-center ${comp.id === "kaipoke" ? "bg-emerald-500/5" : ""}`}
                    >
                      {feature ? (
                        <div className="flex items-center justify-center">
                          <StrengthIcon strength={feature.strength} />
                        </div>
                      ) : (
                        <X className="mx-auto h-4 w-4 text-red-400/50" />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-3 flex flex-wrap gap-4 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Check className="h-3 w-3 text-emerald-400" /> 強い
          </span>
          <span className="flex items-center gap-1">
            <Check className="h-3 w-3 text-yellow-400" /> 対応あり
          </span>
          <span className="flex items-center gap-1">
            <Minus className="h-3 w-3 text-gray-500" /> 弱い
          </span>
          <span className="flex items-center gap-1">
            <X className="h-3 w-3 text-red-400/50" /> 非対応
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
