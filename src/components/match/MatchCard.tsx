import Link from "next/link"
import type { TMatch } from "@/lib/types"
import TeamLogo from "./TeamLogo"
import MatchStatus from "./MatchStatus"
import ScoreDisplay from "./ScoreDisplay"
import { formatTimeHHmm } from "@/lib/utils"

const LIVE_CODES = new Set(["1H", "2H", "ET", "P"])

type TMatchCardProps = { match: TMatch }

const MatchCard = ({ match }: TMatchCardProps) => {
  const { fixture, teams, goals } = match

  const isLive = LIVE_CODES.has(fixture.status.short)
  const kickoffTime = formatTimeHHmm(fixture.date)

  return (
    <Link href={`/match/${fixture.id}`} className="block">
      <div className="group bg-slate-900/40 border border-white/5 hover:border-emerald-500/50 p-4 rounded-2xl transition-all duration-300 hover:bg-slate-900">
        <div className="flex items-center justify-between gap-4">

          <div className="flex-1 flex items-center justify-end gap-3 text-right">
            <span className="text-sm font-bold hidden sm:block truncate">
              {teams.home.name}
            </span>
            <TeamLogo
              src={teams.home.logo}
              alt={`${teams.home.name} logo`}
              size={32}
              className="w-8 h-8 object-contain flex-shrink-0"
            />
          </div>

          <div className="flex flex-col items-center min-w-[90px]">
            <ScoreDisplay
              home={goals.home ?? 0}
              away={goals.away ?? 0}
              isLive={isLive}
            />

            <div className="mt-1 min-h-[20px] flex items-center">
              <MatchStatus
                short={fixture.status.short}
                elapsed={fixture.status.elapsed}
                kickoffTime={kickoffTime}
              />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-start gap-3 text-left">
            <TeamLogo
              src={teams.away.logo}
              alt={`${teams.away.name} logo`}
              size={32}
              className="w-8 h-8 object-contain flex-shrink-0"
            />
            <span className="text-sm font-bold hidden sm:block truncate">
              {teams.away.name}
            </span>
          </div>

        </div>
      </div>
    </Link>
  )
}

export default MatchCard
