import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva("inline-flex items-center gap-2 whitespace-nowrap", {
  variants: {
    variant: {
      chip: "h-8 rounded-md border border-border bg-secondary px-3 font-mono text-[13px] text-foreground/80 transition-colors hover:border-input hover:text-foreground",
      tag: "h-6 rounded-md border border-brand/20 bg-brand/[0.08] px-2 font-mono text-xs text-brand",
      status:
        "h-8 rounded-full border border-success/25 bg-success/[0.06] pl-3 pr-3.5 text-[13px] font-medium text-success",
    },
  },
  defaultVariants: {
    variant: "chip",
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
