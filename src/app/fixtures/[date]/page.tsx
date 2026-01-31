import { getFixturesByDate } from "@/lib/api"
import MatchList from "@/components/match/MatchList"
import FilterBar from "@/components/filters/FilterBar"
import { MATCH_STATUS } from "@/lib/constants"

export const dynamic = "force-dynamic"

type PageProps = {
  params: Promise<{ date: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function FixturesDatePage({ params, searchParams }: PageProps) {
  const { date } = await params
  const queryParams = await searchParams

  const statusFilter = (queryParams.status as string) || "ALL"
  const leagueFilter = (queryParams.league as string) || "ALL"
  const searchQuery = (queryParams.q as string)?.toLowerCase() || ""

  const data = await getFixturesByDate(date)
  let matches = data.response ?? []
  console.log(matches)

  const uniqueLeaguesMap = new Map()
  matches.forEach((m) => {
    if (!uniqueLeaguesMap.has(m.league.id)) {
      uniqueLeaguesMap.set(m.league.id, {
        id: m.league.id,
        name: m.league.name,
        flag: m.league.flag,
      })
    }
  })

  const availableLeagues = [
    { id: "ALL", name: "All Leagues", flag: null },
    ...Array.from(uniqueLeaguesMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    ),
  ]

  if (statusFilter !== "ALL") {
    matches = matches.filter((m) => {
      const short = m.fixture.status.short as string
      if (statusFilter === "LIVE") return MATCH_STATUS.LIVE.includes(short)
      if (statusFilter === "FINISHED") return MATCH_STATUS.FINISHED.includes(short)
      if (statusFilter === "SCHEDULED") return MATCH_STATUS.SCHEDULED.includes(short)
      return true
    })
  }

  if (leagueFilter !== "ALL") {
    matches = matches.filter((m) => m.league.id.toString() === leagueFilter)
  }

  if (searchQuery) {
    matches = matches.filter(
      (m) =>
        m.teams.home.name.toLowerCase().includes(searchQuery) ||
        m.teams.away.name.toLowerCase().includes(searchQuery)
    )
  }

  const dateObj = new Date(date)
  const displayDate = isNaN(dateObj.getTime())
    ? date
    : dateObj.toLocaleDateString("en-GB", { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <main className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-100">
            Fixtures
          </h1>
          <p className="text-emerald-500 font-bold uppercase tracking-widest text-sm mt-1">
            {displayDate}
          </p>
        </div>

        <FilterBar availableLeagues={availableLeagues} />
      </header>

      {matches.length > 0 ? (
        <MatchList matches={matches} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-3xl border border-white/5 backdrop-blur-sm">
          <p className="text-slate-400 font-medium">No matches found for this date.</p>
          <p className="text-slate-600 text-sm mt-2">
            Try clearing filters or picking another day.
          </p>
        </div>
      )}
    </main>
  )
}
