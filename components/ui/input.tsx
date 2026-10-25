import * as React from "react"

import { cn } from "@/lib/utils"

const fieldStyles =
  "w-full rounded-lg border border-input bg-card px-3.5 text-[15px] text-foreground transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/80 focus-visible:border-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-[3px] aria-[invalid=true]:ring-destructive/15 dark:bg-background/60"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(fieldStyles, "h-11", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, fieldStyles }
