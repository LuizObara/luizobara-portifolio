import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl border border-border bg-card text-card-foreground shadow-[0_1px_2px_rgba(16,16,20,.04)] dark:shadow-none",
  {
    variants: {
      interactive: {
        true: "transition-[border-color,transform,box-shadow] duration-[250ms] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[0_18px_40px_-20px_rgba(16,16,20,.25)] motion-reduce:hover:translate-y-0 dark:hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,.8)]",
        false: "",
      },
    },
    defaultVariants: {
      interactive: true,
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return <Comp ref={ref} className={cn(cardVariants({ interactive }), className)} {...props} />
  }
)
Card.displayName = "Card"

export { Card, cardVariants }
