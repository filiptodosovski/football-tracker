import MatchList from "@/components/match/MatchList"
import FilterBar from "@/components/filters/FilterBar"
import EmptyState from "@/components/ui/EmptyState"
import ErrorState from "@/components/ui/ErrorState"
import RetryButton from "@/components/ui/RetryButton"
import { getFixturesByDate } from "@/lib/api"
import { getErrorMessage, getTodayISO } from "@/lib/utils"
import { MATCH_STATUS, REVALIDATE_SECONDS } from "@/lib/constants"

export const revalidate = REVALIDATE_SECONDS

type TPage = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const HomePage = async ({ searchParams }: TPage) => {
  const queryParams = await searchParams
  const statusFilter = (queryParams.status as string) || "ALL"
  const leagueFilter = (queryParams.league as string) || "ALL"
  const searchQuery = (queryParams.q as string)?.toLowerCase() || ""

  const today = getTodayISO()
  let data

  try {
    data = await getFixturesByDate(today, REVALIDATE_SECONDS)
  } catch (error) {
    return (
      <main className="space-y-8">
        <header className="flex flex-col gap-6">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Today&apos;s Matches
          </h1>
        </header>
        <ErrorState
          title="Unable to load matches"
          description={getErrorMessage(error, "Please try again in a moment.")}
          action={<RetryButton />}
        />
      </main>
    )
  }
  let matches = data.response ?? []

  const uniqueLeaguesMap = new Map()
  matches.forEach(m => {
    if (!uniqueLeaguesMap.has(m.league.id)) {
      uniqueLeaguesMap.set(m.league.id, {
        id: m.league.id,
        name: m.league.name,
        flag: m.league.flag
      })
    }
  })

  const availableLeagues = [
    { id: "ALL", name: "All Leagues", flag: null },
    ...Array.from(uniqueLeaguesMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  ]

  if (statusFilter !== "ALL") {
    matches = matches.filter((m) => {
      const short = m.fixture.status.short

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
    matches = matches.filter((m) =>
      m.teams.home.name.toLowerCase().includes(searchQuery) ||
      m.teams.away.name.toLowerCase().includes(searchQuery)
    )
  }

  return (
    <main className="space-y-8">
      <header className="flex flex-col gap-6">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">
          Today&apos;s Matches
        </h1>

        <FilterBar availableLeagues={availableLeagues} />
      </header>

      {matches.length > 0 ? (
        <MatchList matches={matches} />
      ) : (
        <EmptyState
          title="No matches found"
          description="Try adjusting your search or status."
        />
      )}
    </main>
  )
}

export default HomePage
