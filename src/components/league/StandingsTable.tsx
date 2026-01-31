import { TStanding } from "@/lib/types"
import StandingsRow from "./StandingsRow"

type TStandingsTable = {
  standings: TStanding[]
}

const StandingsTable = ({ standings }: TStandingsTable) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5 bg-white/[0.02]">
              <th className="px-4 py-4 font-black">Pos</th>
              <th className="px-4 py-4 font-black">Team</th>
              <th className="px-4 py-4 font-black text-center">P</th>
              <th className="px-4 py-4 font-black text-center">W</th>
              <th className="px-4 py-4 font-black text-center">D</th>
              <th className="px-4 py-4 font-black text-center">L</th>
              <th className="px-4 py-4 font-black text-center">GD</th>
              <th className="px-4 py-4 font-black text-center text-emerald-500">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <StandingsRow key={team.team.id} team={team} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StandingsTable
