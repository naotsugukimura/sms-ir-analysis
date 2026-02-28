"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Lightbulb,
  Target,
  Search,
} from "lucide-react";

import issueData from "@/data/sales-issue-sheet.json";

interface Issue {
  id: number;
  managementIssue: string;
  causeL: string;
  causeS: string;
  detail: string;
  idealState: string;
  mainMessage: string;
  valueProposition: string;
  output: string;
  outcome: string;
  closing: string;
}

const ISSUE_COLORS: Record<string, { accent: string }> = {
  "人が定着しない（離職率が高い）": { accent: "#EF4444" },
  "事務作業が多くて残業が発生している": { accent: "#F59E0B" },
  "工賃が上がらない（利用者の満足度が低い）": { accent: "#3B82F6" },
  "法令遵守・運営指導への不安": { accent: "#8B5CF6" },
  "利用者・保護者との関係構築が難しい": { accent: "#10B981" },
  "経営が安定しない（収益が不安定）": { accent: "#F97316" },
};

function getAccent(issue: string) {
  return ISSUE_COLORS[issue]?.accent || "#6B7280";
}

export default function IssueSheetPage() {
  const [search, setSearch] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const issues = issueData.issues as unknown as Issue[];

  // Group by management issue
  const groups = issues.reduce<Record<string, Issue[]>>((acc, issue) => {
    if (!acc[issue.managementIssue]) acc[issue.managementIssue] = [];
    acc[issue.managementIssue].push(issue);
    return acc;
  }, {});

  // Filter
  const filteredGroups = Object.entries(groups)
    .filter(([groupName]) => !selectedIssue || groupName === selectedIssue)
    .map(([groupName, groupIssues]) => ({
      groupName,
      issues: groupIssues.filter(
        (issue) =>
          !search ||
          issue.causeS.includes(search) ||
          issue.causeL.includes(search) ||
          issue.mainMessage.includes(search) ||
          issue.detail.includes(search) ||
          issue.valueProposition.includes(search)
      ),
    }))
    .filter((g) => g.issues.length > 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title={issueData.title}
        description={issueData.description}
      />

      {/* Stats + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-amber-600">
            <AlertCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold">{issues.length} 課題パターン</p>
            <p className="text-xs text-muted-foreground">
              {Object.keys(groups).length} カテゴリ
            </p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="課題を検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2 text-sm focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 sm:w-64"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedIssue(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            !selectedIssue
              ? "bg-white/10 text-foreground"
              : "text-muted-foreground hover:bg-white/5"
          }`}
        >
          All
        </button>
        {Object.keys(groups).map((groupName) => {
          const accent = getAccent(groupName);
          return (
            <button
              key={groupName}
              onClick={() =>
                setSelectedIssue(selectedIssue === groupName ? null : groupName)
              }
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedIssue === groupName
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{
                backgroundColor:
                  selectedIssue === groupName ? accent + "20" : undefined,
                border:
                  "1px solid " +
                  (selectedIssue === groupName ? accent + "40" : "transparent"),
              }}
            >
              {groupName}
            </button>
          );
        })}
      </div>

      {/* Issue Groups as Tables */}
      {filteredGroups.map(({ groupName, issues: groupIssues }) => {
        const accent = getAccent(groupName);

        return (
          <div key={groupName} className="space-y-2">
            {/* Group Header */}
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: accent }}
              />
              <h3 className="text-sm font-bold">{groupName}</h3>
              <Badge variant="outline" className="text-[10px]">
                {groupIssues.length}件
              </Badge>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-3 py-2 text-left text-[10px] font-medium text-muted-foreground w-[160px]">
                      課題起因
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-medium text-muted-foreground">
                      具体的な課題
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-medium text-purple-400 hidden md:table-cell">
                      メインメッセージ
                    </th>
                    <th className="px-3 py-2 text-center text-[10px] font-medium text-muted-foreground w-[50px]">
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {groupIssues.map((issue) => {
                    const isExpanded = expandedId === issue.id;
                    return (
                      <IssueRow
                        key={issue.id}
                        issue={issue}
                        isExpanded={isExpanded}
                        onToggle={() =>
                          setExpandedId(isExpanded ? null : issue.id)
                        }
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {filteredGroups.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">該当する課題が見つかりません</p>
          <p className="text-xs mt-1">検索条件を変更してください</p>
        </div>
      )}
    </div>
  );
}

function IssueRow({
  issue,
  isExpanded,
  onToggle,
}: {
  issue: Issue;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        className={`border-b border-border/50 cursor-pointer transition-colors hover:bg-muted/20 ${
          isExpanded ? "bg-muted/20" : ""
        }`}
        onClick={onToggle}
      >
        <td className="px-3 py-2.5">
          <p className="text-[11px] text-muted-foreground">{issue.causeL}</p>
        </td>
        <td className="px-3 py-2.5">
          <p className="text-xs font-medium">{issue.causeS}</p>
        </td>
        <td className="px-3 py-2.5 hidden md:table-cell">
          <p className="text-xs text-purple-400 line-clamp-2">
            {issue.mainMessage}
          </p>
        </td>
        <td className="px-3 py-2.5 text-center">
          {isExpanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground inline" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground inline" />
          )}
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan={4} className="px-3 py-0 border-b border-border/50">
            <div className="py-4 space-y-3">
              {/* Mobile: Main message */}
              <div className="md:hidden rounded-lg bg-purple-500/5 border border-purple-500/20 p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <MessageSquare className="h-3 w-3 text-purple-400" />
                  <p className="text-[10px] font-bold text-purple-400">
                    メインメッセージ
                  </p>
                </div>
                <p className="text-xs font-medium">{issue.mainMessage}</p>
              </div>

              {/* Row 1: 課題詳細 + 理想状態 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/30 border border-border p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <AlertCircle className="h-3 w-3 text-red-400" />
                    <p className="text-[10px] font-bold text-red-400">
                      課題詳細
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {issue.detail}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Lightbulb className="h-3 w-3 text-blue-400" />
                    <p className="text-[10px] font-bold text-blue-400">
                      こうなったらいいよね
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed">{issue.idealState}</p>
                </div>
              </div>

              {/* Row 2: 価値訴求 */}
              <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Target className="h-3 w-3 text-emerald-400" />
                  <p className="text-[10px] font-bold text-emerald-400">
                    利便性と価値
                  </p>
                </div>
                <p className="text-xs leading-relaxed">
                  {issue.valueProposition}
                </p>
              </div>

              {/* Row 3: Output → Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-2">
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <p className="text-[10px] font-bold text-emerald-400 mb-1">
                    <CheckCircle2 className="inline h-3 w-3 mr-1" />
                    アウトプット
                  </p>
                  <p className="text-[11px]">{issue.output}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground hidden md:block" />
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <p className="text-[10px] font-bold text-emerald-400 mb-1">
                    <CheckCircle2 className="inline h-3 w-3 mr-1" />
                    アウトカム
                  </p>
                  <p className="text-[11px]">{issue.outcome}</p>
                </div>
              </div>

              {/* Row 4: Closing */}
              <div className="rounded-lg border border-pink-500/20 bg-pink-500/5 p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <MessageSquare className="h-3 w-3 text-pink-400" />
                  <p className="text-[10px] font-bold text-pink-400">
                    クロージングトーク
                  </p>
                </div>
                <p className="text-xs italic">
                  &ldquo;{issue.closing}&rdquo;
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
