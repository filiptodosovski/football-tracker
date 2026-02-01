"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import type { TButton, TButtonSize, TButtonVariant } from "@/lib/types"

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50"

const variantStyles: Record<TButtonVariant, string> = {
  primary: "bg-emerald-500 text-slate-900 hover:bg-emerald-400",
  secondary:
    "bg-slate-900/70 text-slate-200 border border-white/10 hover:border-white/20 hover:bg-slate-900/90",
  ghost: "text-slate-200 hover:bg-white/5",
}

const sizeStyles: Record<TButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
}

const Button = forwardRef<HTMLButtonElement, TButton>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export default Button
