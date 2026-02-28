"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Network } from "lucide-react";

interface WorkflowStep {
  dept: string;
  action: string;
}

interface Workflow {
  name: string;
  steps: WorkflowStep[];
}

interface CrossData {
  title: string;
  description: string;
  workflows: Workflow[];
}

const deptColors: Record<string, string> = {
  "人事": "#3B82F6",
  "法務": "#F59E0B",
  "総務/情シス": "#8B5CF6",
  "情シス": "#8B5CF6",
  "総務": "#8B5CF6",
  "経理": "#10B981",
  "財務/FP&A": "#10B981",
  "経営企画": "#EF4444",
};

export function CrossFunctionalSection({ data }: { data: CrossData }) {
  return (
    <div className="space-y-6">
      <Card className="border-cyan-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-cyan-400" />
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {data.workflows.map((workflow) => (
          <Card key={workflow.name}>
            <CardHeader>
              <CardTitle className="text-base">{workflow.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workflow.steps.map((step, i) => {
                  const color = deptColors[step.dept] || "#6B7280";
                  return (
                    <div key={i}>
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: color }}
                          >
                            {i + 1}
                          </div>
                          {i < workflow.steps.length - 1 && (
                            <div className="mt-1 flex flex-col items-center">
                              <div className="h-4 w-px bg-border" />
                              <ArrowRight className="h-3 w-3 text-muted-foreground rotate-90" />
                            </div>
                          )}
                        </div>
                        <div className="pt-0.5">
                          <Badge
                            className="text-xs mb-1"
                            style={{
                              backgroundColor: color + "20",
                              color: color,
                            }}
                          >
                            {step.dept}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{step.action}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
