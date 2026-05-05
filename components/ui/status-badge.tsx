import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "inactive" | "pending" | "confirmed" | "completed" | "cancelled";
  className?: string;
}

const statusConfig = {
  active: {
    label: "Activo",
    className: "bg-success/10 text-success",
  },
  inactive: {
    label: "Inactivo",
    className: "bg-muted text-muted-foreground",
  },
  pending: {
    label: "Pendiente",
    className: "bg-warning/10 text-warning",
  },
  confirmed: {
    label: "Confirmado",
    className: "bg-feature-blue/10 text-feature-blue",
  },
  completed: {
    label: "Completado",
    className: "bg-success/10 text-success",
  },
  cancelled: {
    label: "Cancelado",
    className: "bg-destructive/10 text-destructive",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
