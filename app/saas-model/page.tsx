import { PageHeader } from "@/components/layout/PageHeader";
import { SaasRevenueFormula } from "@/components/saas-model/SaasRevenueFormula";
import { SaasPredictability } from "@/components/saas-model/SaasPredictability";
import { SaasKeyMetrics } from "@/components/saas-model/SaasKeyMetrics";
import { SaasCategories } from "@/components/saas-model/SaasCategories";
import { SmsKaipokeApplied } from "@/components/saas-model/SmsKaipokeApplied";

import saasData from "@/data/saas-model.json";

export default function SaasModelPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="SaaSビジネスモデル 深掘り"
        description="管理会計の視点からSaaSの構造を分解し、カイポケに当てはめて理解する"
      />

      {/* ① 売上の公式 */}
      <SaasRevenueFormula data={saasData.revenueFormula} />

      {/* ② 最大の特徴：予測可能性 */}
      <SaasPredictability data={saasData.predictability} />

      {/* ③ SaaSにとって必要な指標群 */}
      <SaasKeyMetrics metrics={saasData.keyMetrics} />

      {/* ④ B2B vs B2C / ホリゾンタル vs バーティカル */}
      <SaasCategories categories={saasData.saasCategories} />

      {/* ⑤ カイポケへの当てはめ */}
      <SmsKaipokeApplied data={saasData.smsApplied} />
    </div>
  );
}
