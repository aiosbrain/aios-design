import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary: editorial near-black (light) / white (dark) pill, no glow, no shadow
        default:
          "bg-primary text-primary-foreground hover:bg-[var(--aios-primary-hover)]",
        // Secondary: ghost pill with hairline border, subtle hover surface
        secondary:
          "border border-border bg-transparent text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06]",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        link: "rounded-none bg-transparent text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3 text-[length:var(--aios-text-small)]",
        md: "h-10 px-4 text-[length:var(--aios-text-body)]",
        lg: "h-12 px-6 text-[length:var(--aios-text-body)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
