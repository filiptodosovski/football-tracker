"use client"

import { TMatchStatus } from "@/lib/types"
import { Clock } from "lucide-react"

const LIVE_CODES = new Set(["1H", "2H", "ET", "P"])

const MatchStatus = ({ short, elapsed, kickoffTime }: TMatchStatus) => {
  const isLive = LIVE_CODES.has(short)
  const isFinished = short === "FT"
  const isHalfTime = short === "HT"

  if (isLive) {
    return (
      <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 animate-pulse bg-emerald-500/10 px-2 py-0.5 rounded-full">
        {(elapsed ?? 0)}
      </span>
    )
  }

  if (isHalfTime) {
    return (
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        HT
      </span>
    )
  }

  if (isFinished) {
    return (
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        FT
      </span>
    )
  }

  return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
      <Clock size={10} className="text-slate-500" />
      {kickoffTime}
    </span>
  )
}

export default MatchStatus
