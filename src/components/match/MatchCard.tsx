import Link from "next/link"
import type { TMatch } from "@/lib/types"
import TeamLogo from "./TeamLogo"
import MatchStatus from "./MatchStatus"
import ScoreDisplay from "./ScoreDisplay"
import { formatTimeHHmm } from "@/lib/utils"
import { MATCH_STATUS } from "@/lib/constants"

type TMatchCardProps = {
  match: TMatch
  showNames?: boolean
}

const MatchCard = ({ match, showNames = true }: TMatchCardProps) => {
  const { fixture, teams, goals } = match

  const isLive = MATCH_STATUS.LIVE.includes(fixture.status.short)
  const kickoffTime = formatTimeHHmm(fixture.date)

  return (
    <Link href={`/match/${fixture.id}`} className="block">
      <div className="group bg-slate-900/40 border border-white/5 hover:border-emerald-500/50 p-4 rounded-2xl transition-all duration-300 hover:bg-slate-900">
        <div className={`flex items-center ${showNames ? "justify-between gap-4" : "justify-center gap-6"}`}>
          <div className={`${showNames ? "flex-1 min-w-0 justify-end" : ""} flex items-center gap-3 text-right`}>
            {showNames ? (
              <span className="text-sm font-bold truncate max-w-[160px] hidden sm:block">
                {teams.home.name}
              </span>
            ) : null}

            <TeamLogo
              src={teams.home.logo}
              alt={`${teams.home.name} logo`}
              size={32}
              className="w-8 h-8 object-contain flex-shrink-0"
            />
          </div>

          <div className="flex flex-col items-center shrink-0 min-w-[88px]">
            <ScoreDisplay home={goals.home ?? 0} away={goals.away ?? 0} isLive={isLive} />
            <div className="mt-1 min-h-[20px] flex items-center">
              <MatchStatus short={fixture.status.short} elapsed={fixture.status.elapsed} kickoffTime={kickoffTime} />
            </div>
          </div>

          <div className={`${showNames ? "flex-1 min-w-0 justify-start" : ""} flex items-center gap-3 text-left`}>
            <TeamLogo
              src={teams.away.logo}
              alt={`${teams.away.name} logo`}
              size={32}
              className="w-8 h-8 object-contain flex-shrink-0"
            />

            {showNames ? (
              <span className="text-sm font-bold truncate max-w-[160px] hidden sm:block">
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
