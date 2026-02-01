import { cn } from "@/lib/utils"
import type { TBadge, TBadgeVariant } from "@/lib/types"

const variantStyles: Record<TBadgeVariant, string> = {
  default: "bg-slate-800/60 text-slate-300 border border-white/10",
  live: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  finished: "bg-slate-800/60 text-slate-400 border border-white/10",
  upcoming: "bg-sky-500/10 text-sky-400 border border-sky-500/30",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
}

const Badge = ({ children, variant = "default", className }: TBadge) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export default Badge
