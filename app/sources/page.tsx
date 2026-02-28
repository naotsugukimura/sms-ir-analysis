import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, ExternalLink } from "lucide-react";
import { getSources } from "@/lib/data";

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  presentation: { label: "決算説明資料", color: "#3B82F6" },
  tanshin: { label: "決算短信", color: "#10B981" },
  yuho: { label: "有価証券報告書", color: "#F59E0B" },
  timely: { label: "適時開示", color: "#8B5CF6" },
  other: { label: "その他", color: "#6B7280" },
};

export default function SourcesPage() {
  const sources = getSources();

  return (
    <div className="space-y-8">
      <PageHeader
        title="IR資料一覧"
        description="分析に使用したIR資料の参照先"
      />

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">資料名</TableHead>
                <TableHead className="text-xs">種別</TableHead>
                <TableHead className="text-xs">対象期</TableHead>
                <TableHead className="text-xs">公開日</TableHead>
                <TableHead className="text-right text-xs">リンク</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.map((source) => {
                const typeCfg = TYPE_LABELS[source.type] ?? TYPE_LABELS.other;
                return (
                  <TableRow key={source.id}>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                        {source.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-[10px]"
                        style={{ borderColor: typeCfg.color, color: typeCfg.color }}
                      >
                        {typeCfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{source.fiscalPeriod}</TableCell>
                    <TableCell className="font-mono text-xs">{source.publishDate}</TableCell>
                    <TableCell className="text-right">
                      {source.irPageUrl && (
                        <a
                          href={source.irPageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                        >
                          IR <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
