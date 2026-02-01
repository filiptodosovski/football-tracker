"use client"

import { cn } from "@/lib/utils"
import type { TSpinner } from "@/lib/types"

const sizeStyles = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-[3px]",
  lg: "h-8 w-8 border-4",
}

const Spinner = ({ className, size = "md" }: TSpinner) => {
  return (
    <span
      className={cn(
        "inline-block animate-spin rounded-full border-slate-500 border-t-emerald-500",
        sizeStyles[size],
        className
      )}
      aria-label="Loading"
      role="status"
    />
  )
}

export default Spinner
