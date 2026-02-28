import { PageHeader } from "@/components/layout/PageHeader";
import { IssueSheetTable } from "@/components/sales/IssueSheetTable";
import { IssueSheetCards } from "@/components/sales/IssueSheetCards";

import issueData from "@/data/sales-issue-sheet.json";

export default function IssueSheetPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title={issueData.title}
        description={issueData.description}
      />

      {/* カード形式（モバイル対応） */}
      <IssueSheetCards issues={issueData.issues} columns={issueData.columns} />

      {/* テーブル形式（横スクロール） */}
      <IssueSheetTable issues={issueData.issues} columns={issueData.columns} />
    </div>
  );
}
