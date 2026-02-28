"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale } from "lucide-react";

interface PolicyEvent {
  year: number;
  title: string;
  description: string;
  impact: string;
  category: string;
}

export function PolicyTimeline({ events }: { events: PolicyEvent[] }) {
  const categoryColor: Record<string, string> = {
    "介護": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "障害": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "ICT": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-blue-400" />
          <CardTitle>制度改定タイムライン</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {/* Vertical line */}
          <div className="absolute left-[52px] top-0 bottom-0 w-px bg-border" />

          {events.map((event, i) => (
            <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
              {/* Year badge */}
              <div className="flex w-12 shrink-0 items-start justify-end pt-0.5">
                <span className="text-xs font-mono font-bold text-muted-foreground">
                  {event.year}
                </span>
              </div>

              {/* Dot */}
              <div className="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-border bg-card" />

              {/* Content */}
              <div className="flex-1 rounded-lg border border-border p-3 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-medium">{event.title}</h4>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${categoryColor[event.category] || ""}`}
                  >
                    {event.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{event.description}</p>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-emerald-400">💡</span>
                  <p className="text-[10px] text-emerald-400">{event.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
