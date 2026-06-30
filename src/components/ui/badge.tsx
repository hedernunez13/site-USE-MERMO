import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "bg-ink text-white",
        gold: "bg-gold text-ink",
        soft: "bg-muted text-gray-dark",
        outline: "border border-ink/20 text-ink",
        sale: "bg-cta text-white",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
