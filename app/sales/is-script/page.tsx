"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone,
  Mail,
  MessageCircle,
  Lightbulb,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Voicemail,
} from "lucide-react";

import isData from "@/data/is-scripts.json";

const tempColors: Record<string, string> = {
  "高": "bg-red-500/20 text-red-400 border-red-500/30",
  "中": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "低": "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

function getTempColor(temp: string) {
  if (temp.startsWith("高")) return tempColors["高"];
  if (temp.startsWith("中")) return tempColors["中"];
  return tempColors["低"];
}

function ScriptCard({ script }: { script: any }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className="cursor-pointer transition-all hover:border-blue-500/30"
      onClick={() => setExpanded(!expanded)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {script.serviceType}
              </Badge>
              <Badge variant="outline" className={`text-[10px] ${getTempColor(script.leadTemperature)}`}>
                温度: {script.leadTemperature}
              </Badge>
            </div>
            <CardTitle className="text-sm">{script.leadSource}</CardTitle>
            <p className="text-xs text-muted-foreground">目標: {script.goalOfCall}</p>
          </div>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-4 pt-0" onClick={(e) => e.stopPropagation()}>
          {/* Opening Script */}
          <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3">
            <p className="text-[10px] font-medium text-blue-400 mb-1">
              <MessageCircle className="inline h-3 w-3 mr-1" />
              オープニング
            </p>
            <p className="text-xs italic">&ldquo;{script.openingScript}&rdquo;</p>
          </div>

          {/* Gatekeeper Script */}
          {script.gatekeeperScript && (
            <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
              <p className="text-[10px] font-medium text-amber-400 mb-1">
                <AlertCircle className="inline h-3 w-3 mr-1" />
                受付突破
              </p>
              <p className="text-xs italic">&ldquo;{script.gatekeeperScript}&rdquo;</p>
            </div>
          )}

          {/* Qualifying Questions */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-emerald-400">
              <Phone className="inline h-3 w-3 mr-1" />
              確認質問（Qualifying）
            </p>
            {script.qualifyingQuestions.map((q: any, i: number) => (
              <div key={i} className="rounded-lg border border-border p-3 space-y-1">
                <p className="text-xs font-medium">&ldquo;{q.question}&rdquo;</p>
                <p className="text-[10px] text-muted-foreground">なぜ聞く: {q.whyAsk}</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="flex items-start gap-1">
                    <ThumbsUp className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-emerald-400">{q.goodSignal}</p>
                  </div>
                  <div className="flex items-start gap-1">
                    <ThumbsDown className="h-3 w-3 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-red-400">{q.badSignal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Value Proposition */}
          <div className="rounded-lg bg-purple-500/5 border border-purple-500/20 p-3">
            <p className="text-[10px] font-medium text-purple-400 mb-1">価値訴求</p>
            <p className="text-xs">{script.valueProposition}</p>
          </div>

          {/* Appointment Close */}
          <div className="rounded-lg bg-pink-500/5 border border-pink-500/20 p-3">
            <p className="text-[10px] font-medium text-pink-400 mb-1">アポクロージング</p>
            <p className="text-xs italic">&ldquo;{script.appointmentClose}&rdquo;</p>
          </div>

          {/* Objection Handling */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-orange-400">反論処理</p>
            {script.objections.map((obj: any, i: number) => (
              <div key={i} className="rounded-lg border border-orange-500/20 p-3 space-y-1">
                <p className="text-xs font-medium text-orange-400">&ldquo;{obj.objection}&rdquo;</p>
                <p className="text-xs">→ {obj.response}</p>
              </div>
            ))}
          </div>

          {/* Voicemail */}
          <div className="rounded-lg bg-muted/50 border border-border p-3">
            <p className="text-[10px] font-medium text-muted-foreground mb-1">
              <Voicemail className="inline h-3 w-3 mr-1" />
              留守電メッセージ
            </p>
            <p className="text-xs italic">&ldquo;{script.voicemailScript}&rdquo;</p>
          </div>

          {/* Follow-up Email */}
          <div className="rounded-lg border border-border p-3">
            <p className="text-[10px] font-medium text-muted-foreground mb-1">
              <Mail className="inline h-3 w-3 mr-1" />
              フォローメールテンプレート
            </p>
            <p className="text-xs whitespace-pre-line">{script.followUpEmailTemplate}</p>
          </div>

          {/* Tips */}
          {script.tips && (
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-[10px] font-medium text-muted-foreground mb-1">
                <Lightbulb className="inline h-3 w-3 mr-1" />
                Tips
              </p>
              <ul className="space-y-1">
                {script.tips.map((tip: string, i: number) => (
                  <li key={i} className="text-[10px] text-muted-foreground">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default function IsScriptPage() {
  const shurouScripts = isData.scripts.filter((s: any) =>
    s.serviceType === "就労継続支援B型"
  );
  const soudanScripts = isData.scripts.filter((s: any) =>
    s.serviceType === "相談支援事業所"
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title={isData.title}
        description={isData.description}
      />

      {/* Common Guidelines */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              架電タイミング
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-[10px] text-emerald-400">Best</p>
              <p className="text-xs">{isData.commonGuidelines.callTiming.bestTime}</p>
            </div>
            <div>
              <p className="text-[10px] text-red-400">Avoid</p>
              <p className="text-xs">{isData.commonGuidelines.callTiming.avoidTime}</p>
            </div>
            <ul className="space-y-0.5 mt-2">
              {isData.commonGuidelines.callTiming.tips.map((tip: string, i: number) => (
                <li key={i} className="text-[10px] text-muted-foreground">• {tip}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-purple-400" />
              トーン & マナー
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {isData.commonGuidelines.toneOfVoice.map((t: string, i: number) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-purple-400 shrink-0">▸</span>{t}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-amber-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              CRMログ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {isData.commonGuidelines.crmLogging.requiredFields.map((f: string) => (
                <Badge key={f} variant="outline" className="text-[10px]">{f}</Badge>
              ))}
            </div>
            <ul className="space-y-0.5">
              {isData.commonGuidelines.crmLogging.tips.map((tip: string, i: number) => (
                <li key={i} className="text-[10px] text-muted-foreground">• {tip}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Scripts by Service Type */}
      <Tabs defaultValue="shurou-b">
        <TabsList>
          <TabsTrigger value="shurou-b">就労継続支援B型</TabsTrigger>
          <TabsTrigger value="soudan">相談支援事業所</TabsTrigger>
        </TabsList>

        <TabsContent value="shurou-b" className="space-y-4 mt-4">
          {shurouScripts.map((script: any) => (
            <ScriptCard key={script.id} script={script} />
          ))}
        </TabsContent>

        <TabsContent value="soudan" className="space-y-4 mt-4">
          {soudanScripts.map((script: any) => (
            <ScriptCard key={script.id} script={script} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
