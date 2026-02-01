import { TStandingsRow } from "@/lib/types"
import Image from "next/image"

const StandingsRow = ({ team }: TStandingsRow) => {
  const { rank, team: teamInfo, all, goalsDiff, points } = team

  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
      <td className="px-4 py-4 font-bold text-slate-400 text-sm">{rank}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative w-6 h-6">
            <Image
              src={teamInfo.logo}
              alt={teamInfo.name}
              className="object-contain"
              width={24}
              height={24}
            />
          </div>
          <span className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
            {teamInfo.name}
          </span>
        </div>
      </td>
      <td className="px-4 py-4 text-center tabular-nums text-slate-300">{all.played}</td>
      <td className="px-4 py-4 text-center tabular-nums text-slate-300">{all.win}</td>
      <td className="px-4 py-4 text-center tabular-nums text-slate-300">{all.draw}</td>
      <td className="px-4 py-4 text-center tabular-nums text-slate-300">{all.lose}</td>
      <td className={`px-4 py-4 text-center tabular-nums font-medium ${goalsDiff > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
        {goalsDiff > 0 ? `+${goalsDiff}` : goalsDiff}
      </td>
      <td className="px-4 py-4 text-center tabular-nums font-black text-emerald-400 bg-emerald-500/5">
        {points}
      </td>
    </tr>
  )
}

export default StandingsRow
