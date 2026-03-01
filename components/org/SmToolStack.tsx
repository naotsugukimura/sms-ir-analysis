"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Mail,
  Zap,
  Video,
  HeartHandshake,
  BarChart3,
  Layers,
  FileText,
  Phone,
} from "lucide-react";

interface Tool {
  name: string;
  useCase: string;
  strengths?: string;
  weaknesses?: string;
  pricing?: string;
  bestFor?: string;
}

interface ToolCategory {
  category: string;
  importance: string;
  adoptionStage: string;
  tools: Tool[];
}

interface StackRecommendationItem {
  category: string;
  tool: string;
}

interface StackRecommendation {
  stage: string;
  budget: string;
  stack: StackRecommendationItem[];
}

interface ToolStackData {
  title: string;
  description: string;
  categories: ToolCategory[];
  stackRecommendation?: Record<string, StackRecommendation>;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Database,
  Mail,
  Zap,
  Video,
  HeartHandshake,
  BarChart3,
  FileText,
  Phone,
};

const categoryConfig: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  "CRM（顧客関係管理）": { color: "#3B82F6", icon: Database },
  "MA（マーケティングオートメーション）": { color: "#10B981", icon: Mail },
  "IS/SDR（インサイドセールス）": { color: "#F59E0B", icon: Phone },
  "会議・商談": { color: "#8B5CF6", icon: Video },
  "BI / Analytics（分析・可視化）": { color: "#06B6D4", icon: BarChart3 },
  "CS（カスタマーサクセス）": { color: "#EC4899", icon: HeartHandshake },
  "コンテンツ制作": { color: "#14B8A6", icon: FileText },
};

const DEFAULT_CONFIG = { color: "#6B7280", icon: Database };

export function SmToolStack({ data }: { data: ToolStackData }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Layers className="h-5 w-5 text-blue-400" />
          {data.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
      </div>

      {/* ツールカテゴリグリッド */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.categories.map((cat) => {
          const config = categoryConfig[cat.category] || DEFAULT_CONFIG;
          const Icon = config.icon;
          const color = config.color;

          return (
            <Card
              key={cat.category}
              className="border-t-2"
              style={{ borderTopColor: color }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-md"
                    style={{
                      backgroundColor: color + "15",
                      color: color,
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="truncate">{cat.category}</span>
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={cat.importance === "必須" ? "default" : "secondary"}
                    className="text-[10px]"
                  >
                    {cat.importance}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {cat.adoptionStage}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {cat.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="rounded-md border border-border p-2 space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="text-xs shrink-0"
                        >
                          {tool.name}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        {tool.useCase}
                      </p>
                      {tool.pricing && (
                        <p className="text-[10px] text-muted-foreground/70">
                          💰 {tool.pricing}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ステージ別推奨スタック */}
      {data.stackRecommendation && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            ステージ別おすすめスタック
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(data.stackRecommendation).map(([, rec]) => (
              <Card key={rec.stage} className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{rec.stage}</CardTitle>
                  <Badge variant="outline" className="text-[10px] w-fit">
                    {rec.budget}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1.5">
                    {rec.stack.map((item) => (
                      <div key={item.category} className="flex items-start gap-2 text-[11px]">
                        <span className="text-muted-foreground shrink-0 w-16 truncate">{item.category}</span>
                        <span className="font-medium">{item.tool}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
