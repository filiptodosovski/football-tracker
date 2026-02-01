import { TStatsComparison } from "@/lib/types"
import { parseStat } from "@/lib/utils"

const StatsComparison = ({ stats, homeTeamName, awayTeamName }: TStatsComparison) => {
  if (!stats || stats.length < 2) {
    return <div className="text-center text-slate-500 py-10">Statistics not available</div>
  }

  const homeStats = stats[0].statistics
  const awayStats = stats[1].statistics

  return (
    <div className="space-y-6 bg-slate-900/50 rounded-2xl border border-white/5 p-6">
      <div className="flex justify-between text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
        <span>{homeTeamName}</span>
        <span>Stats</span>
        <span>{awayTeamName}</span>
      </div>

      <div className="space-y-6">
        {homeStats.map((stat, i) => {
          const type = stat.type
          const homeValue = parseStat(stat.value)
          const awayValue = parseStat(awayStats[i]?.value)

          const total = homeValue + awayValue
          const homePercent = total === 0 ? 0 : (homeValue / total) * 100

          if (homeValue === 0 && awayValue === 0) return null

          return (
            <div key={type} className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-emerald-400">{stat.value ?? 0}</span>
                <span className="text-slate-300 text-xs font-normal uppercase tracking-widest">{type}</span>
                <span className="text-sky-400">{awayStats[i]?.value ?? 0}</span>
              </div>

              <div className="flex h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 transition-all duration-1000"
                  style={{ width: `${homePercent}%` }}
                />
                <div
                  className="bg-sky-500 transition-all duration-1000"
                  style={{ width: `${100 - homePercent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatsComparison
