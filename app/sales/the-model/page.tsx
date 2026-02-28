import { PageHeader } from "@/components/layout/PageHeader";
import { ModelOverview } from "@/components/sales/ModelOverview";
import { MarketingSection } from "@/components/sales/MarketingSection";
import { InsideSalesSection } from "@/components/sales/InsideSalesSection";
import { FieldSalesSection } from "@/components/sales/FieldSalesSection";
import { CustomerSuccessSection } from "@/components/sales/CustomerSuccessSection";

import modelData from "@/data/the-model.json";

export default function TheModelPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title={modelData.title}
        description={modelData.description}
      />

      {/* 全体ファネル */}
      <ModelOverview data={modelData.overview} />

      {/* Marketing */}
      <MarketingSection data={modelData.marketing as any} />

      {/* Inside Sales */}
      <InsideSalesSection data={modelData.insideSales as any} />

      {/* Field Sales */}
      <FieldSalesSection data={modelData.fieldSales as any} />

      {/* Customer Success */}
      <CustomerSuccessSection data={modelData.customerSuccess as any} />
    </div>
  );
}
