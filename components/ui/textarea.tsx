import * as React from "react"

import { cn } from "@/lib/utils"
import { fieldStyles } from "@/components/ui/input"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(fieldStyles, "min-h-36 resize-y py-3 leading-relaxed", className)}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
