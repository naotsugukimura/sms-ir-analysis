import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ElementType } from "react";

interface SmsCtaProps {
  href: string;
  label: string;
  description: string;
  icon: ElementType;
  color: string;
}

export function SmsCta({ href, label, description, icon: Icon, color }: SmsCtaProps) {
  return (
    <Link href={href}>
      <div className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all hover:border-white/20 hover:bg-white/[0.06]">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: color + "20", color }}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              SMS実例で確認する
            </p>
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
      </div>
    </Link>
  );
}
