import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function SkeletonBox({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-muted rounded ${className}`} />;
}

function DashboardCardSkeletonItem() {
  return (
    <Card className="relative overflow-hidden border bg-card shadow-sm">
      {/* Corner glow placeholder */}
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-muted/30 blur-2xl -translate-y-6 translate-x-6 pointer-events-none" />

      <CardContent className="pt-5 pb-5 px-5 space-y-3">
        {/* Icon + badge row */}
        <div className="flex items-center justify-between">
          <SkeletonBox className="w-8 h-8 rounded-lg" /> {/* icon box */}
          <SkeletonBox className="w-12 h-4 rounded-full" /> {/* badge */}
        </div>

        {/* Value + label */}
        <div className="space-y-2">
          <SkeletonBox className="w-24 h-8" /> {/* big number */}
          <SkeletonBox className="w-32 h-3.5" /> {/* label text */}
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardCardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <DashboardCardSkeletonItem key={i} />
      ))}
    </div>
  );
}

export function ProfileCardSkeleton() {
  return (
    <Card className="border bg-card shadow-sm">
      <CardContent className="pt-6 pb-6 px-6">
        {/* Header row — avatar + name + badge */}
        <div className="flex items-center gap-4 mb-5">
          {/* Avatar circle */}
          <SkeletonBox className="h-14 w-14 rounded-full flex-shrink-0" />

          <div className="flex-1 min-w-0 space-y-2">
            {/* Name */}
            <SkeletonBox className="h-5 w-36" />
            {/* Role badge */}
            <SkeletonBox className="h-4 w-20 rounded-full" />
          </div>
        </div>

        <Separator className="mb-4" />

        {/* Contact details */}
        <div className="space-y-3">
          {/* Email row */}
          <div className="flex items-center gap-3">
            <SkeletonBox className="w-7 h-7 rounded-md flex-shrink-0" />{" "}
            {/* icon box */}
            <div className="space-y-1.5 flex-1">
              <SkeletonBox className="h-3 w-10" /> {/* "Email" label */}
              <SkeletonBox className="h-4 w-48" /> {/* email value */}
            </div>
          </div>

          {/* Phone row */}
          <div className="flex items-center gap-3">
            <SkeletonBox className="w-7 h-7 rounded-md flex-shrink-0" />{" "}
            {/* icon box */}
            <div className="space-y-1.5 flex-1">
              <SkeletonBox className="h-3 w-10" /> {/* "Phone" label */}
              <SkeletonBox className="h-4 w-32" /> {/* phone value */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
