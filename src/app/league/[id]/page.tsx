import Image from "next/image"
import StandingsTable from "@/components/league/StandingsTable"
import LeagueFixtures from "@/components/league/LeagueFixtures"
import { getFixtures, getStandings } from "@/lib/api"

type PageProps = {
  params: Promise<{ id: string }>
}

const LeaguePage = async ({ params }: PageProps) => {
  const { id: leagueId } = await params
  const season = 2024

  const [standingsRes, fixturesRes] = await Promise.all([
    getStandings(leagueId, season),
    getFixtures(leagueId, season)
  ])

  const leagueData = standingsRes.response?.[0]?.league
  const standings = leagueData?.standings?.[0] || []
  const allMatches = fixturesRes.response || []

  return (
    <main className="space-y-10 animate-in fade-in duration-500">
      <header className="flex items-center gap-6 p-6 rounded-3xl bg-slate-900/50 border border-white/5">
        {leagueData?.logo && (
          <div className="relative">
            <Image
              src={leagueData.logo}
              alt={leagueData.name}
              width={80}
              height={80}
              className="object-contain bg-white/5 p-2 rounded-xl"
              priority
            />
          </div>
        )}
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
            {leagueData?.name ?? "League Unavailable"}
          </h1>
          <p className="text-emerald-500 font-bold uppercase tracking-widest text-xs">
            {leagueData?.country} • {season} Season
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Table</h2>
          </div>
          <StandingsTable standings={standings} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Fixtures</h2>
          </div>
          <LeagueFixtures matches={allMatches} />
        </div>
      </div>
    </main>
  )
}

export default LeaguePage
