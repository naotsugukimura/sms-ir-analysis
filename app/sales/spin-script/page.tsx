import { PageHeader } from "@/components/layout/PageHeader";
import { SpinTargetProfile } from "@/components/sales/SpinTargetProfile";
import { SpinTimeline } from "@/components/sales/SpinTimeline";

import spinData from "@/data/spin-script.json";

export default function SpinScriptPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title={spinData.title}
        description={spinData.description}
      />

      {/* ターゲットプロファイル */}
      <SpinTargetProfile profile={spinData.targetProfile} />

      {/* 1ヶ月タイムライン */}
      <SpinTimeline plan={spinData.monthlyPlan as any} />
    </div>
  );
}
