import { TLeagueFixtures } from "@/lib/types"
import MatchCard from "../match/MatchCard"

const LeagueFixtures = ({ matches }: TLeagueFixtures) => {
  if (matches.length === 0) {
    return <p className="text-slate-500 text-sm italic">No upcoming fixtures found.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-3 w-full">
      {matches.map((match) => (
        <MatchCard
          key={match.fixture.id}
          match={match}
          showNames={false}
        />
      ))}
    </div>
  )
}

export default LeagueFixtures
