"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Building2, FileDown } from "lucide-react";

interface Profile {
  serviceType: string;
  leadSource: string;
  typicalPersona: string;
  typicalScale: string;
  typicalPain: string;
  context: string;
}

export function SpinTargetProfile({ profile }: { profile: Profile }) {
  return (
    <Card className="border-blue-500/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-400" />
          <CardTitle>ターゲットプロファイル</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border p-3 space-y-1">
            <div className="flex items-center gap-1">
              <Building2 className="h-3 w-3 text-muted-foreground" />
              <p className="text-[10px] text-muted-foreground">サービス種別</p>
            </div>
            <p className="text-sm font-medium">{profile.serviceType}</p>
          </div>
          <div className="rounded-lg border border-border p-3 space-y-1">
            <div className="flex items-center gap-1">
              <FileDown className="h-3 w-3 text-muted-foreground" />
              <p className="text-[10px] text-muted-foreground">リードソース</p>
            </div>
            <p className="text-sm font-medium">{profile.leadSource}</p>
          </div>
          <div className="rounded-lg border border-border p-3 space-y-1">
            <p className="text-[10px] text-muted-foreground">典型的なペルソナ</p>
            <p className="text-sm font-medium">{profile.typicalPersona}</p>
          </div>
          <div className="rounded-lg border border-border p-3 space-y-1">
            <p className="text-[10px] text-muted-foreground">典型的な規模</p>
            <p className="text-sm font-medium">{profile.typicalScale}</p>
          </div>
          <div className="rounded-lg border border-border p-3 space-y-1">
            <p className="text-[10px] text-muted-foreground">典型的な課題</p>
            <p className="text-sm font-medium">{profile.typicalPain}</p>
          </div>
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 space-y-1">
            <p className="text-[10px] text-blue-400">文脈（なぜ今アプローチすべきか）</p>
            <p className="text-sm font-medium">{profile.context}</p>
            <Badge className="bg-blue-500/20 text-blue-400 text-[10px]">ホットリード</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
