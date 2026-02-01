import { cn } from "@/lib/utils"
import type { TErrorState } from "@/lib/types"

const ErrorState = ({ title, description, action, className }: TErrorState) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-rose-500/20 bg-slate-900/60 px-6 py-16 text-center backdrop-blur-sm",
        className
      )}
    >
      <div className="mb-4 rounded-full bg-rose-500/10 p-4 text-rose-300">
        <span className="text-2xl">⚠️</span>
      </div>
      <p className="text-lg font-bold text-slate-100">{title}</p>
      {description ? (
        <p className="mt-2 text-sm text-slate-400 max-w-md">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}

export default ErrorState
