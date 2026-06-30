import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = "sm",
  className,
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const px = size === "sm" ? "size-3.5" : "size-4";
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              px,
              i < Math.round(value)
                ? "fill-gold text-gold"
                : "fill-gray-light text-gray-light",
            )}
          />
        ))}
      </div>
      <span className="text-xs text-gray-mid">
        {value.toFixed(1)}
        {count != null && ` (${count})`}
      </span>
    </div>
  );
}
