import MatchList from "@/components/match/MatchList"
import FilterBar from "@/components/filters/FilterBar"
import EmptyState from "@/components/ui/EmptyState"
import { getFixturesByDate } from "@/lib/api"
import { getTodayISO } from "@/lib/utils"
import { MATCH_STATUS } from "@/lib/constants"

export const dynamic = "force-dynamic"

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const HomePage = async ({ searchParams }: PageProps) => {
  const params = await searchParams

  const statusFilter = (params.status as string) || "ALL"
  const leagueFilter = (params.league as string) || "ALL"
  const searchQuery = (params.q as string)?.toLowerCase() || ""

  const today = getTodayISO()
  const data = await getFixturesByDate(today)
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
