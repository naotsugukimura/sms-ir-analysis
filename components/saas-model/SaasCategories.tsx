"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CategoryData {
  b2bVsB2c: {
    b2b: CategoryDetail;
    b2c: CategoryDetail;
  };
  horizontalVsVertical: {
    horizontal: HVDetail;
    vertical: HVDetail & {
      smsKaipokeMapping: {
        description: string;
        layers: { layer: string; content: string; status: string }[];
      };
    };
  };
}

interface CategoryDetail {
  name: string;
  nameJa: string;
  description: string;
  characteristics: string[];
  examples: string[];
}

interface HVDetail {
  name: string;
  nameJa: string;
  description: string;
  characteristics: string[];
  examples: { name: string; function?: string; industry?: string }[];
  howToBuild: string[];
}

const STATUS_COLORS: Record<string, string> = {
  "確立済み": "#10B981",
  "成長中": "#3B82F6",
  "展開中": "#F59E0B",
  "構想段階": "#6B7280",
};

export function SaasCategories({ categories }: { categories: CategoryData }) {
  const [activeTab, setActiveTab] = useState<"b2b-b2c" | "hv">("b2b-b2c");
  const { b2b, b2c } = categories.b2bVsB2c;
  const { horizontal, vertical } = categories.horizontalVsVertical;

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-muted-foreground">SaaSの分類</h2>

      {/* Tab switcher */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("b2b-b2c")}
          className={`rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
            activeTab === "b2b-b2c"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent/50"
          }`}
        >
          B2B vs B2C
        </button>
        <button
          onClick={() => setActiveTab("hv")}
          className={`rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
            activeTab === "hv"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent/50"
          }`}
        >
          ホリゾンタル vs バーティカル
        </button>
      </div>

      {/* B2B vs B2C */}
      {activeTab === "b2b-b2c" && (
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { data: b2b, color: "#3B82F6", highlight: true },
            { data: b2c, color: "#8B5CF6", highlight: false },
          ].map(({ data: cat, color, highlight }) => (
            <Card key={cat.name} className={highlight ? "border-blue-500/30" : ""}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-lg px-3 py-1 text-sm font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {cat.name}
                  </span>
                  {highlight && (
                    <Badge className="bg-blue-500/20 text-[10px] text-blue-400">
                      カイポケはこちら
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-xs font-bold">{cat.nameJa}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">{cat.description}</p>

                <div className="mt-4 space-y-1.5">
                  {cat.characteristics.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px]">
                      <span className="mt-0.5 text-muted-foreground">•</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="mb-1 text-[10px] font-bold text-muted-foreground">代表例</p>
                  <div className="flex flex-wrap gap-1">
                    {cat.examples.map((ex) => (
                      <Badge key={ex} variant="outline" className="text-[10px]">{ex}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Horizontal vs Vertical */}
      {activeTab === "hv" && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { data: horizontal, color: "#F59E0B", highlight: false },
              { data: vertical, color: "#10B981", highlight: true },
            ].map(({ data: cat, color, highlight }) => (
              <Card key={cat.name} className={highlight ? "border-emerald-500/30" : ""}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-lg px-3 py-1 text-sm font-bold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {cat.name}
                    </span>
                    {highlight && (
                      <Badge className="bg-emerald-500/20 text-[10px] text-emerald-400">
                        カイポケはこちら
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs font-bold">{cat.nameJa}</p>
                  <p className="mt-2 text-[11px] text-muted-foreground">{cat.description}</p>

                  <div className="mt-4 space-y-1.5">
                    {cat.characteristics.map((c, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px]">
                        <span className="mt-0.5 text-muted-foreground">•</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <p className="mb-1 text-[10px] font-bold text-muted-foreground">代表例</p>
                    <div className="flex flex-wrap gap-1">
                      {cat.examples.map((ex) => (
                        <Badge key={ex.name} variant="outline" className="text-[10px]">
                          {ex.name}
                          {(ex as { function?: string }).function && ` (${(ex as { function?: string }).function})`}
                          {(ex as { industry?: string }).industry && ` (${(ex as { industry?: string }).industry})`}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* How to build */}
                  <div className="mt-4">
                    <p className="mb-2 text-[10px] font-bold text-muted-foreground">事業の立ち上げ方</p>
                    <div className="space-y-1.5">
                      {cat.howToBuild.map((step, i) => (
                        <div key={i} className="flex items-start gap-2 rounded-md bg-muted/50 p-2">
                          <span className="text-[11px]">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Kaipoke layer model */}
          <Card className="border-emerald-500/30">
            <CardContent className="p-6">
              <h3 className="mb-2 text-sm font-bold">
                カイポケのバーティカルSaaS積層モデル
              </h3>
              <p className="mb-4 text-xs text-muted-foreground">
                {vertical.smsKaipokeMapping.description}：SaaS基盤の上にBPO・金融・マッチング・データを積み上げていく戦略
              </p>

              <div className="space-y-2">
                {vertical.smsKaipokeMapping.layers.map((layer, i) => {
                  const statusColor = STATUS_COLORS[layer.status] ?? "#6B7280";
                  const width = 100 - i * 8;
                  return (
                    <div
                      key={layer.layer}
                      className="mx-auto flex items-center justify-between rounded-lg border-2 p-3"
                      style={{
                        width: `${width}%`,
                        borderColor: `${statusColor}40`,
                        backgroundColor: `${statusColor}08`,
                      }}
                    >
                      <div>
                        <p className="text-xs font-bold">{layer.layer}</p>
                        <p className="text-[10px] text-muted-foreground">{layer.content}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px]"
                        style={{ borderColor: statusColor, color: statusColor }}
                      >
                        {layer.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 text-center">
                <p className="text-[10px] text-muted-foreground">
                  ↑ 上に行くほど付加価値が高く、下のレイヤーが上のレイヤーを支える構造
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
