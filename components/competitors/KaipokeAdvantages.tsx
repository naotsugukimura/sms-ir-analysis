"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface AdvantageItem {
  category: string;
  description: string;
  vsCompetitors: string;
}

interface AdvantagesData {
  title: string;
  items: AdvantageItem[];
}

export function KaipokeAdvantages({ data }: { data: AdvantagesData }) {
  return (
    <Card className="border-emerald-500/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-emerald-400" />
          <CardTitle>{data.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => (
            <div
              key={item.category}
              className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2"
            >
              <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                {item.category}
              </Badge>
              <p className="text-xs leading-relaxed">{item.description}</p>
              <div className="rounded border border-border bg-card p-2">
                <p className="text-[10px] text-muted-foreground">
                  <span className="font-medium">vs 競合:</span> {item.vsCompetitors}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
