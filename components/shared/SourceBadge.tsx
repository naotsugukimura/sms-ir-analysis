import Link from "next/link";
import { FileText } from "lucide-react";
import { getSourceById } from "@/lib/data";

export function SourceBadge({ sourceRef }: { sourceRef?: string }) {
  if (!sourceRef) return null;
  const source = getSourceById(sourceRef);
  if (!source) return null;

  return (
    <Link
      href="/sources"
      className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
    >
      <FileText className="h-2.5 w-2.5" />
      {source.fiscalPeriod}
    </Link>
  );
}
