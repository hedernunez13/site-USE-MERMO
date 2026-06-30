import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 active:scale-[0.98] overflow-hidden [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-white hover:bg-gray-dark shadow-soft",
        gold: "bg-gold text-ink hover:bg-gold-soft",
        cta: "bg-cta text-white hover:brightness-110",
        outline:
          "border border-ink/15 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
        ghost: "text-ink hover:bg-muted",
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7 text-sm tracking-wide",
        sm: "h-9 px-4 text-xs tracking-wide",
        lg: "h-14 px-10 text-sm uppercase tracking-widest",
        icon: "h-11 w-11",
        pill: "h-11 px-6 rounded-full text-xs uppercase tracking-widest",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
