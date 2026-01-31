import MatchList from "@/components/match/MatchList"
import { getFixturesByDate } from "@/lib/api"
import { getTodayISO } from "@/lib/utils"

const HomePage = async () => {
  const today = getTodayISO()

  const data = await getFixturesByDate(today)

  const matches = data.response ?? []

  return (
    <main className="space-y-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">
          Today&apos;s Matches
        </h1>
      </header>

      {matches.length > 0 ? (
        <MatchList matches={matches} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-3xl border border-white/5">
          <p className="text-slate-400 font-medium">No matches scheduled for today.</p>
        </div>
      )}
    </main>
  )
}

export default HomePage
