import { getFixturesByDate } from "@/lib/api"
import MatchList from "@/components/match/MatchList"
import FilterBar from "@/components/filters/FilterBar"
import EmptyState from "@/components/ui/EmptyState"
import ErrorState from "@/components/ui/ErrorState"
import RetryButton from "@/components/ui/RetryButton"
import { MATCH_STATUS } from "@/lib/constants"
import { getErrorMessage } from "@/lib/utils"

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

  let data
  try {
    data = await getFixturesByDate(date)
  } catch (error) {
    return (
      <main className="space-y-8">
        <header className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-100">
              Fixtures
            </h1>
          </div>
        </header>
        <ErrorState
          title="Unable to load fixtures"
          description={getErrorMessage(error, "Please try another date or retry.")}
          action={<RetryButton />}
        />
      </main>
    )
  }
  let matches = data.response ?? []

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
        <EmptyState
          title="No matches found"
          description="Try clearing filters or picking another day."
        />
      )}
    </main>
  )
}
