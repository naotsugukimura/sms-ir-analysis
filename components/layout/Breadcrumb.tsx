"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const PATH_LABELS: Record<string, string> = {
  "saas-model": "SaaS概論",
  org: "SaaS組織",
  sm: "S&M（営業）",
  rd: "R&D（開発）",
  ga: "G&A（管理）",
  sales: "セールス",
  "the-model": "The Model",
  "spin-script": "SPIN商談",
  "is-script": "ISスクリプト",
  "issue-sheet": "課題整理シート",
  glossary: "用語集",
  soudan: "相談支援",
  segments: "事業セグメント",
  market: "マーケット環境",
  competitors: "競合分析",
  mission: "ミッション",
  timeline: "時系列分析",
  sources: "IRソース",
};

export function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [
    { label: "ホーム", href: "/" },
  ];

  let currentPath = "";
  for (const seg of segments) {
    currentPath += `/${seg}`;
    const label = PATH_LABELS[seg] ?? seg;
    crumbs.push({ label, href: currentPath });
  }

  return (
    <nav className="flex items-center gap-1 text-xs text-muted-foreground">
      <Home className="h-3 w-3 shrink-0" />
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3 shrink-0" />}
          {i === crumbs.length - 1 ? (
            <span className="truncate text-foreground">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="truncate hover:text-foreground">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
