import { Card, CardContent } from "@/components/ui/card";
import { SourceBadge } from "@/components/shared/SourceBadge";
import type { HistoryEvent } from "@/lib/types";
import { HISTORY_CATEGORY_CONFIG, SEGMENT_CONFIG } from "@/lib/constants";
import { formatYearMonth } from "@/lib/utils";
import type { SegmentId } from "@/lib/types";

export function FoundingStory({ events }: { events: HistoryEvent[] }) {
  const sorted = [...events].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return (a.month ?? 0) - (b.month ?? 0);
  });

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-6 text-sm font-bold">沿革 - SMSの成長ストーリー</h3>
        <div className="relative ml-4 border-l-2 border-border pl-6">
          {sorted.map((event, i) => {
            const catConfig = HISTORY_CATEGORY_CONFIG[event.category];
            const segConfig = event.relatedSegment
              ? SEGMENT_CONFIG[event.relatedSegment as SegmentId]
              : null;

            return (
              <div key={i} className="relative mb-6 last:mb-0">
                <div
                  className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background"
                  style={{ backgroundColor: catConfig?.color ?? "#6B7280" }}
                />
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    {formatYearMonth(event.year, event.month)}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor: `${catConfig?.color ?? "#6B7280"}20`,
                      color: catConfig?.color ?? "#6B7280",
                    }}
                  >
                    {catConfig?.label ?? event.category}
                  </span>
                  {segConfig && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: `${segConfig.color}20`,
                        color: segConfig.color,
                      }}
                    >
                      {segConfig.name}
                    </span>
                  )}
                  {event.sourceRef && <SourceBadge sourceRef={event.sourceRef} />}
                </div>
                <h4 className="mt-1 text-sm font-bold">{event.title}</h4>
                <p className="mt-0.5 text-xs text-muted-foreground">{event.description}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
