import { cn } from "@/lib/utils"
import type { TEmptyState } from "@/lib/types"

const EmptyState = ({ title, description, icon, className }: TEmptyState) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-slate-900/50 px-6 py-16 text-center backdrop-blur-sm",
        className
      )}
    >
      {icon ? (
        <div className="mb-4 rounded-full bg-slate-800/60 p-4 text-slate-500">
          {icon}
        </div>
      ) : null}
      <p className="text-lg font-bold text-slate-200">{title}</p>
      {description ? (
        <p className="mt-2 text-sm text-slate-500 max-w-md">{description}</p>
      ) : null}
    </div>
  )
}

export default EmptyState
