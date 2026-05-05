import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  variant?: "category" | "service";
}

export function SkeletonCard({ className, variant = "category" }: SkeletonCardProps) {
  if (variant === "service") {
    return (
      <div
        className={cn(
          "bg-card rounded-xl border border-border overflow-hidden animate-pulse",
          className
        )}
      >
        <div className="h-32 bg-muted" />
        <div className="p-4 space-y-3">
          <div className="h-5 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="flex gap-4">
            <div className="h-4 bg-muted rounded w-20" />
            <div className="h-4 bg-muted rounded w-16" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border p-5 animate-pulse",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-muted rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-muted rounded w-2/3" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
        <div className="h-6 bg-muted rounded w-16" />
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-muted rounded" />
          <div className="w-8 h-8 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
