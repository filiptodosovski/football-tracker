"use client"

import { TScoreDisplay } from "@/lib/types"
import { cn } from "@/lib/utils"

const ScoreDisplay = ({ home, away, isLive }: TScoreDisplay) => {
  const displayHome = home ?? 0
  const displayAway = away ?? 0

  const scoreKey = `${displayHome}-${displayAway}`

  return (
    <div
      className="flex flex-col items-center min-w-[90px]"
      aria-live="polite"
    >
      <div
        key={scoreKey}
        className={cn(
          "flex items-center gap-2 transition-all duration-300",
          "animate-score-bump"
        )}
      >
        <span className={cn(
          "text-2xl font-black tabular-nums tracking-tighter",
          isLive ? "text-emerald-500" : "text-white"
        )}>
          {displayHome}
        </span>

        <span className="text-slate-700 font-bold">:</span>

        <span className={cn(
          "text-2xl font-black tabular-nums tracking-tighter",
          isLive ? "text-emerald-500" : "text-white"
        )}>
          {displayAway}
        </span>
      </div>
    </div>
  )
}

export default ScoreDisplay
