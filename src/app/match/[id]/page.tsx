import { getMatchDetails } from "@/lib/api"
import Image from "next/image"
import { notFound } from "next/navigation"
import MatchTabs from "@/components/match/MatchTabs"
import EventsTimeline from "@/components/match/EventsTimeline"
import LineupDisplay from "@/components/match/LineupDisplay"
import StatsComparison from "@/components/match/StatsComparison"
import MatchStatus from "@/components/match/MatchStatus"
import ErrorState from "@/components/ui/ErrorState"
import RetryButton from "@/components/ui/RetryButton"
import { formatTimeHHmm, getErrorMessage } from "@/lib/utils"

type TMatchDetailsPage = {
  params: Promise<{ id: string }>
}

const MatchDetailsPage = async ({ params }: TMatchDetailsPage) => {
  const { id } = await params
  let data
  try {
    data = await getMatchDetails(id)
  } catch (error) {
    return (
      <main className="space-y-8">
        <ErrorState
          title="Unable to load match details"
          description={getErrorMessage(error, "Please try again shortly.")}
          action={<RetryButton />}
        />
      </main>
    )
  }

  if (!data.response || data.response.length === 0) return notFound()

  const match = data.response[0]
  const { fixture, teams, goals, events, lineups, statistics } = match
  const kickoff = formatTimeHHmm(fixture.date)

  return (
    <main className="pb-20">
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/10 pb-10 pt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6 flex flex-col items-center gap-2">
            {match.league.logo && (
              <img src={match.league.logo} alt={match.league.name} className="w-8 h-8 object-contain opacity-80" />
            )}
            <p className="text-sm font-medium text-slate-400">{match.league.name} • {match.league.round}</p>
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-4 w-32">
              <div className="relative w-20 h-20 md:w-24 md:h-24">
                <Image src={teams.home.logo} alt={teams.home.name} fill className="object-contain" />
              </div>
              <h2 className="text-xl font-bold leading-tight">{teams.home.name}</h2>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-black text-white tabular-nums tracking-tighter mb-2">
                {goals.home ?? 0} - {goals.away ?? 0}
              </div>
              <MatchStatus short={fixture.status.short} elapsed={fixture.status.elapsed} kickoffTime={kickoff} />
            </div>

            <div className="flex flex-col items-center gap-4 w-32">
              <div className="relative w-20 h-20 md:w-24 md:h-24">
                <Image src={teams.away.logo} alt={teams.away.name} fill className="object-contain" />
              </div>
              <h2 className="text-xl font-bold leading-tight">{teams.away.name}</h2>
            </div>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            🏟️ {fixture.venue.name}, {fixture.venue.city}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-6">
        <MatchTabs
          eventsContent={<EventsTimeline events={events ?? []} homeTeamId={teams.home.id} />}
          lineupsContent={<LineupDisplay lineups={lineups ?? []} />}
          statsContent={<StatsComparison stats={statistics ?? []} homeTeamName={teams.home.name} awayTeamName={teams.away.name} />}
        />
      </div>
    </main>
  )
}

export default MatchDetailsPage
