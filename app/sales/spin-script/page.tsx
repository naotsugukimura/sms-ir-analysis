"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone,
  MessageCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Target,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Voicemail,
  Mail,
  Users,
  Building2,
} from "lucide-react";

import isData from "@/data/is-scripts.json";
import issueData from "@/data/sales-issue-sheet.json";
import spinData from "@/data/spin-script.json";
import spinSoudanData from "@/data/spin-script-soudan.json";
import { SpinTargetProfile } from "@/components/sales/SpinTargetProfile";
import { SpinTimeline } from "@/components/sales/SpinTimeline";

// Map lead source to relevant issue IDs for context
const ISSUE_MAPPING: Record<string, number[]> = {
  "shurou-b-wp": [4, 5, 9, 10],
  "shurou-b-seminar": [4, 5, 6, 7],
  "shurou-b-search": [1, 2, 4, 8, 12],
  "soudan-seminar": [],
  "soudan-wp": [],
  "soudan-search": [],
};

export default function SpinScriptPage() {
  const [selectedService, setSelectedService] = useState<string>("就労継続支援B型");
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);
  const [showObjections, setShowObjections] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);

  const scripts = isData.scripts as any[];

  const filteredScripts = useMemo(
    () => scripts.filter((s: any) => s.serviceType === selectedService),
    [selectedService, scripts]
  );

  const selectedScript = useMemo(
    () => scripts.find((s: any) => s.id === selectedScriptId),
    [selectedScriptId, scripts]
  );

  // Get related issues from issue sheet
  const relatedIssues = useMemo(() => {
    if (!selectedScriptId) return [];
    const issueIds = ISSUE_MAPPING[selectedScriptId] || [];
    return (issueData.issues as any[]).filter((i: any) =>
      issueIds.includes(i.id)
    );
  }, [selectedScriptId]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="IS架電ガイド ― 初回コールの全て"
        description="サービス種 × リードソースを選ぶだけで、顧客課題・提供価値・スクリプトが一瞬で見える。目標：2ヶ月間のかべなし無料体験を提案する。"
      />

      <Tabs defaultValue="call-guide" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="call-guide" className="text-xs">
            IS初回架電ガイド
          </TabsTrigger>
          <TabsTrigger value="spin-shurou" className="text-xs">
            SPIN商談（就労B型）
          </TabsTrigger>
          <TabsTrigger value="spin-soudan" className="text-xs">
            SPIN商談（相談支援）
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: IS Call Guide */}
        <TabsContent value="call-guide" className="space-y-6 mt-4">
          {/* Step 1: Select Service Type */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              STEP 1: サービス種を選択
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["就労継続支援B型", "相談支援事業所"].map((service) => (
                <button
                  key={service}
                  onClick={() => {
                    setSelectedService(service);
                    setSelectedScriptId(null);
                  }}
                  className={`rounded-lg border-2 p-4 text-left transition-all ${
                    selectedService === service
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-border hover:border-blue-500/30"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building2
                      className={`h-4 w-4 ${
                        selectedService === service
                          ? "text-blue-400"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-sm font-bold">{service}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {service === "就労継続支援B型"
                      ? "就労B型事業所向け架電スクリプト"
                      : "相談支援事業所向け架電スクリプト"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Lead Source */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              STEP 2: リードソースを選択（どんな問い合わせか？）
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {filteredScripts.map((script: any) => {
                const isSelected = selectedScriptId === script.id;
                const tempColor = script.leadTemperature.startsWith("高")
                  ? "text-red-400"
                  : script.leadTemperature.startsWith("中")
                  ? "text-amber-400"
                  : "text-blue-400";

                return (
                  <button
                    key={script.id}
                    onClick={() => setSelectedScriptId(script.id)}
                    className={`rounded-lg border-2 p-3 text-left transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-border hover:border-emerald-500/30"
                    }`}
                  >
                    <p className="text-xs font-bold">{script.leadSource}</p>
                    <p className={`text-[10px] ${tempColor}`}>
                      温度: {script.leadTemperature}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Show Call Script */}
          {selectedScript && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-bold text-emerald-400 px-2">
                  架電ガイド
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Goal */}
              <div className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <Target className="h-5 w-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-emerald-400">
                    この電話のゴール
                  </p>
                  <p className="text-sm font-bold">
                    {selectedScript.goalOfCall}
                  </p>
                </div>
              </div>

              {/* Related Customer Challenges */}
              {relatedIssues.length > 0 && (
                <Card className="border-red-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <span className="text-red-400">
                        顧客が抱えている課題
                      </span>
                    </CardTitle>
                    <p className="text-[10px] text-muted-foreground">
                      このリードが抱えている可能性が高い課題。ヒアリングの参考に。
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {relatedIssues.map((issue: any) => (
                      <div
                        key={issue.id}
                        className="rounded-lg border border-border p-2.5 space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-[10px] border-red-500/30 text-red-400"
                          >
                            {issue.managementIssue}
                          </Badge>
                        </div>
                        <p className="text-xs font-medium">{issue.causeS}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {issue.detail}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Opening Script */}
              <Card className="border-blue-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-blue-400" />
                    オープニングトーク
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3">
                    <p className="text-xs leading-relaxed italic">
                      &ldquo;{selectedScript.openingScript}&rdquo;
                    </p>
                  </div>
                  {selectedScript.gatekeeperScript && (
                    <div className="mt-3 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
                      <p className="text-[10px] font-bold text-amber-400 mb-1">
                        受付突破パターン
                      </p>
                      <p className="text-xs leading-relaxed italic">
                        &ldquo;{selectedScript.gatekeeperScript}&rdquo;
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Qualifying Questions */}
              <Card className="border-emerald-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Phone className="h-4 w-4 text-emerald-400" />
                    確認質問（Qualifying）
                  </CardTitle>
                  <p className="text-[10px] text-muted-foreground">
                    課題の深刻度を測る質問。Good/Badシグナルで温度感を判定。
                  </p>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedScript.qualifyingQuestions.map(
                    (q: any, i: number) => (
                      <div
                        key={i}
                        className="rounded-lg border border-border p-3 space-y-2"
                      >
                        <p className="text-xs font-medium">
                          &ldquo;{q.question}&rdquo;
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          <span className="font-medium">なぜ聞く:</span>{" "}
                          {q.whyAsk}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-start gap-1.5 rounded-md bg-emerald-500/5 p-2">
                            <ThumbsUp className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-emerald-400">
                              {q.goodSignal}
                            </p>
                          </div>
                          <div className="flex items-start gap-1.5 rounded-md bg-red-500/5 p-2">
                            <ThumbsDown className="h-3 w-3 text-red-400 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-red-400">
                              {q.badSignal}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              {/* Value Proposition */}
              <Card className="border-purple-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-400" />
                    <span className="text-purple-400">
                      かべなしの提供価値
                    </span>
                  </CardTitle>
                  <p className="text-[10px] text-muted-foreground">
                    ヒアリング後、課題に共感したうえで伝える。
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-purple-500/5 border border-purple-500/20 p-3">
                    <p className="text-xs leading-relaxed">
                      {selectedScript.valueProposition}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Appointment Close */}
              <Card className="border-pink-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-pink-400" />
                    <span className="text-pink-400">
                      アポクロージング → 2ヶ月無料体験提案
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-pink-500/5 border border-pink-500/20 p-3">
                    <p className="text-xs leading-relaxed italic">
                      &ldquo;{selectedScript.appointmentClose}&rdquo;
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Objection Handling (collapsible) */}
              <Card
                className="border-orange-500/20 cursor-pointer"
                onClick={() => setShowObjections(!showObjections)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-400" />
                      反論処理
                    </CardTitle>
                    {showObjections ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                {showObjections && (
                  <CardContent
                    className="space-y-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {selectedScript.objections.map((obj: any, i: number) => (
                      <div
                        key={i}
                        className="rounded-lg border border-orange-500/20 p-3 space-y-1.5"
                      >
                        <p className="text-xs font-medium text-orange-400">
                          &ldquo;{obj.objection}&rdquo;
                        </p>
                        <p className="text-xs">→ {obj.response}</p>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>

              {/* Voicemail + Follow-up (collapsible) */}
              <Card
                className="cursor-pointer"
                onClick={() => setShowFollowUp(!showFollowUp)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      留守電 & フォローメール
                    </CardTitle>
                    {showFollowUp ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                {showFollowUp && (
                  <CardContent
                    className="space-y-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="rounded-lg bg-muted/50 border border-border p-3">
                      <p className="text-[10px] font-bold text-muted-foreground mb-1">
                        <Voicemail className="inline h-3 w-3 mr-1" />
                        留守電メッセージ
                      </p>
                      <p className="text-xs italic leading-relaxed">
                        &ldquo;{selectedScript.voicemailScript}&rdquo;
                      </p>
                    </div>
                    <div className="rounded-lg border border-border p-3">
                      <p className="text-[10px] font-bold text-muted-foreground mb-1">
                        <Mail className="inline h-3 w-3 mr-1" />
                        フォローメール
                      </p>
                      <p className="text-xs whitespace-pre-line leading-relaxed">
                        {selectedScript.followUpEmailTemplate}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Tips */}
              {selectedScript.tips && (
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-[10px] font-bold text-muted-foreground mb-1.5">
                    <Lightbulb className="inline h-3 w-3 mr-1" />
                    Tips
                  </p>
                  <ul className="space-y-1">
                    {selectedScript.tips.map((tip: string, i: number) => (
                      <li
                        key={i}
                        className="text-[10px] text-muted-foreground"
                      >
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Empty state */}
          {!selectedScriptId && (
            <div className="text-center py-8 text-muted-foreground">
              <Phone className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">リードソースを選択してください</p>
              <p className="text-xs mt-1">
                選択すると架電スクリプトが表示されます
              </p>
            </div>
          )}
        </TabsContent>

        {/* Tab 2: SPIN Full Script (就労B型) */}
        <TabsContent value="spin-shurou" className="space-y-6 mt-4">
          <SpinTargetProfile profile={spinData.targetProfile} />
          <SpinTimeline plan={spinData.monthlyPlan as any} />
        </TabsContent>

        {/* Tab 3: SPIN Full Script (相談支援) */}
        <TabsContent value="spin-soudan" className="space-y-6 mt-4">
          <SpinTargetProfile profile={spinSoudanData.targetProfile} />
          <SpinTimeline plan={spinSoudanData.monthlyPlan as any} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
