import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">ページが見つかりません</h2>
      <p className="text-sm text-muted-foreground">
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <Link href="/">
        <Button>ダッシュボードに戻る</Button>
      </Link>
    </div>
  );
}
