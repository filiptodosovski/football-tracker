"use client"

import { TMatchStatus } from "@/lib/types"
import { Clock } from "lucide-react"
import Badge from "@/components/ui/Badge"

const LIVE_CODES = new Set(["1H", "2H", "ET", "P"])

const MatchStatus = ({ short, elapsed, kickoffTime }: TMatchStatus) => {
  const isLive = LIVE_CODES.has(short)
  const isFinished = short === "FT"
  const isHalfTime = short === "HT"

  if (isLive) {
    return (
      <Badge variant="live" className="flex items-center gap-1 animate-pulse">
        {(elapsed ?? 0)}
      </Badge>
    )
  }

  if (isHalfTime) {
    return (
      <Badge variant="warning">HT</Badge>
    )
  }

  if (isFinished) {
    return (
      <Badge variant="finished">FT</Badge>
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
