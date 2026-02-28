"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Column {
  key: string;
  label: string;
  color: string;
}

interface Issue {
  id: number;
  [key: string]: string | number;
}

export function IssueSheetTable({ issues, columns }: { issues: Issue[]; columns: Column[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">課題整理マトリクス（横スクロール表）</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table className="min-w-[2000px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-8 text-[10px]">#</TableHead>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="text-[10px] font-medium"
                  style={{ minWidth: col.key === "detail" || col.key === "valueProposition" ? "220px" : "160px" }}
                >
                  <span style={{ color: col.color }}>●</span> {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id} className="align-top">
                <TableCell className="text-[10px] text-muted-foreground">{issue.id}</TableCell>
                {columns.map((col) => (
                  <TableCell key={col.key} className="text-[11px] leading-relaxed whitespace-pre-wrap">
                    {String(issue[col.key] || "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
