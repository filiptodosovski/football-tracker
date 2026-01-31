import { TLineup, TPlayer } from "@/lib/types"
import Image from "next/image"

type TPlayerRow = {
  player: TPlayer
  isSub?: boolean
}

type TLineupDisplay = {
  lineups: TLineup[]
}

const PlayerRow = ({ player, isSub }: TPlayerRow) => (
  <div className={`flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors ${isSub ? "opacity-75" : ""}`}>
    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-white/10">
      {player.number}
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-medium text-slate-200">{player.name}</span>
      <span className="text-[10px] text-slate-500">{player.pos}</span>
    </div>
  </div>
)

const LineupDisplay = ({ lineups }: TLineupDisplay) => {
  if (!lineups || lineups.length === 0) {
    return <div className="text-center text-slate-500 py-10">Lineups not available</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {lineups.map((teamLineup, idx) => (
        <div key={idx} className="bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-slate-900 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image src={teamLineup.team.logo} alt="" fill className="object-contain" />
              </div>
              <span className="font-bold">{teamLineup.team.name}</span>
            </div>
            <span className="text-emerald-500 font-mono font-bold bg-emerald-500/10 px-2 py-1 rounded">
              {teamLineup.formation}
            </span>
          </div>

          <div className="px-4 py-2 bg-slate-950/30 text-xs text-slate-400 font-medium uppercase tracking-wider border-b border-white/5">
            Coach: {teamLineup.coach.name}
          </div>

          <div className="p-2">
            <div className="text-xs font-bold text-slate-500 uppercase px-2 mb-2">Starting XI</div>
            <div className="space-y-1">
              {teamLineup.startXI.map((item) => (
                <PlayerRow key={item.player.id} player={item.player} />
              ))}
            </div>
          </div>

          <div className="p-2 border-t border-white/5 bg-white/[0.02]">
            <div className="text-xs font-bold text-slate-500 uppercase px-2 mb-2">Substitutes</div>
            <div className="space-y-1">
              {teamLineup.substitutes.map((item) => (
                <PlayerRow key={item.player.id} player={item.player} isSub />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LineupDisplay
