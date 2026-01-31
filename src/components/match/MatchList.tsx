import { TMatch } from "@/lib/types"
import MatchCard from "./MatchCard"

type Group = {
  key: string
  country: string
  leagueName: string
  leagueLogo?: string
  countryFlag?: string | null
  matches: TMatch[]
}

type TMatchListProps = {
  matches: TMatch[]
}

const MatchList = ({ matches }: TMatchListProps) => {
  const byCountry: Record<string, Record<string, Group>> = {}

  for (const match of matches) {
    const rawCountry = match.league.country
    const country = rawCountry && rawCountry.trim() ? rawCountry.trim() : "International"

    const leagueId = match.league.id
    const leagueKey = `${leagueId}`

    if (!byCountry[country]) byCountry[country] = {}

    if (!byCountry[country][leagueKey]) {
      byCountry[country][leagueKey] = {
        key: `${country}__${leagueId}`,
        country,
        leagueName: match.league.name,
        leagueLogo: match.league.logo,
        countryFlag: match.league.flag ?? null,
        matches: [],
      }
    }

    byCountry[country][leagueKey].matches.push(match)
  }

  const countries = Object.entries(byCountry)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([country, leaguesMap]) => {
      const leagues = Object.values(leaguesMap)
        .sort((a, b) => a.leagueName.localeCompare(b.leagueName))
        .map((g) => ({
          ...g,
          matches: g.matches.sort(
            (a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
          ),
        }))
      return { country, leagues }
    })

  return (
    <div className="space-y-10">
      {countries.map((c) => (
        <section key={c.country} className="space-y-6">
          <h2 className="px-2 text-xl font-black text-slate-100">{c.country}</h2>

          <div className="space-y-10">
            {c.leagues.map((g) => (
              <section key={g.key} className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                  {g.countryFlag ? (
                    <img src={g.countryFlag} alt={`${g.country} flag`} className="w-5 h-5 object-contain" />
                  ) : null}
                  {g.leagueLogo ? (
                    <img src={g.leagueLogo} alt={`${g.leagueName} logo`} className="w-6 h-6 object-contain" />
                  ) : null}
                  <h3 className="font-bold text-lg text-slate-200">{g.leagueName}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
                  {g.matches.map((match) => (
                    <MatchCard key={match.fixture.id} match={match} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default MatchList
