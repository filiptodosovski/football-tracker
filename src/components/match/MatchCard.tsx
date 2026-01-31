"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import type { TMatch, TMatchCard } from "@/lib/types"
import TeamLogo from "./TeamLogo"
import MatchStatus from "./MatchStatus"
import ScoreDisplay from "./ScoreDisplay"
import { formatTimeHHmm, cn } from "@/lib/utils"
import { MATCH_STATUS } from "@/lib/constants"

const MatchCard = ({ match, showNames = true, enableAnimation = false }: TMatchCard) => {
  const { fixture, teams, goals } = match

  const isLive = MATCH_STATUS.LIVE.includes(fixture.status.short)
  const kickoffTime = formatTimeHHmm(fixture.date)

  const [scoredSide, setScoredSide] = useState<"home" | "away" | null>(null)

  const prevHomeRef = useRef(goals.home)
  const prevAwayRef = useRef(goals.away)

  useEffect(() => {
    if (!enableAnimation || !isLive) {
      prevHomeRef.current = goals.home
      prevAwayRef.current = goals.away
      return
    }

    const prevHome = prevHomeRef.current
    const prevAway = prevAwayRef.current

    let newSide: "home" | "away" | null = null

    if (goals.home != null && prevHome != null && goals.home > prevHome) {
      newSide = "home"
    }
    else if (goals.away != null && prevAway != null && goals.away > prevAway) {
      newSide = "away"
    }

    if (newSide) {
      setTimeout(() => {
        setScoredSide(newSide)
      }, 0)

      const removeTimer = setTimeout(() => {
        setScoredSide(null)
      }, 3000)

      return () => clearTimeout(removeTimer)
    }

    prevHomeRef.current = goals.home
    prevAwayRef.current = goals.away
  }, [goals.home, goals.away, enableAnimation, isLive])

  return (
    <Link href={`/match/${fixture.id}`} className="block relative group">

      <div
        className={cn(
          "absolute inset-0 bg-emerald-500/20 rounded-2xl z-0 pointer-events-none transition-opacity duration-1000",
          scoredSide ? "opacity-100" : "opacity-0"
        )}
      />

      <div className={cn(
        "relative z-10 bg-slate-900/40 border p-4 rounded-2xl transition-all duration-300 hover:bg-slate-900",
        scoredSide
          ? "border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          : "border-white/5 hover:border-emerald-500/50"
      )}>
        <div className={`flex items-center ${showNames ? "justify-between gap-4" : "justify-center gap-6"}`}>

          <div className={`${showNames ? "flex-1 min-w-0 justify-end" : ""} flex items-center gap-3 text-right`}>
            {showNames ? (
              <span className={cn(
                "text-sm font-bold truncate max-w-[160px] hidden sm:block transition-colors duration-300",
                scoredSide === "home" ? "text-emerald-400" : "text-white"
              )}>
                {teams.home.name}
              </span>
            ) : null}

            <div className={cn("transition-transform duration-300", scoredSide === "home" && "scale-110")}>
              <TeamLogo
                src={teams.home.logo}
                alt={`${teams.home.name} logo`}
                size={32}
                className="w-8 h-8 object-contain flex-shrink-0"
              />
            </div>
          </div>

          <div className="flex flex-col items-center shrink-0 min-w-[88px]">
            <ScoreDisplay
              home={goals.home ?? 0}
              away={goals.away ?? 0}
              isLive={isLive}
            />

            <div className="mt-1 min-h-[20px] flex items-center justify-center">
              {scoredSide ? (
                <span className="text-[10px] font-black tracking-widest text-emerald-500 animate-pulse uppercase">
                  GOAL!
                </span>
              ) : (
                <MatchStatus short={fixture.status.short} elapsed={fixture.status.elapsed} kickoffTime={kickoffTime} />
              )}
            </div>
          </div>

          <div className={`${showNames ? "flex-1 min-w-0 justify-start" : ""} flex items-center gap-3 text-left`}>
            <div className={cn("transition-transform duration-300", scoredSide === "away" && "scale-110")}>
              <TeamLogo
                src={teams.away.logo}
                alt={`${teams.away.name} logo`}
                size={32}
                className="w-8 h-8 object-contain flex-shrink-0"
              />
            </div>

            {showNames ? (
              <span className={cn(
                "text-sm font-bold truncate max-w-[160px] hidden sm:block transition-colors duration-300",
                scoredSide === "away" ? "text-emerald-400" : "text-white"
              )}>
                {teams.away.name}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MatchCard
