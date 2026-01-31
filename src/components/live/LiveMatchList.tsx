"use client"

import { WifiOff } from "lucide-react"
import MatchCard from "@/components/match/MatchCard"
import AutoRefreshToggle from "@/components/live/AutoRefreshToggle"
import RefreshIndicator from "@/components/live/RefreshIndicator"
import LastUpdated from "@/components/live/LastUpdated"
import { TMatch } from "@/lib/types"
import { useLiveScores } from "@/hooks/useLiveScores"

type TLiveMatchList = {
  fetchLiveAction: () => Promise<TMatch[]>
}

const LiveMatchList = ({ fetchLiveAction }: TLiveMatchList) => {
  const { matches, isLoading, isPaused, togglePause, lastUpdated, refreshNow } =
    useLiveScores(fetchLiveAction)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/50 rounded-3xl border border-white/5 backdrop-blur-sm">

        <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">
          Live
        </h1>

        <div className="flex items-center gap-3 bg-slate-950/50 p-2 rounded-2xl border border-white/5 shadow-inner">
          <RefreshIndicator isLoading={isLoading} />
          <div className="h-4 w-px bg-white/10 mx-1" />
          <LastUpdated date={lastUpdated} />
          <AutoRefreshToggle isPaused={isPaused} onToggle={togglePause} />
          <button
            onClick={refreshNow}
            disabled={isLoading}
            className="ml-2 p-1.5 rounded-full hover:bg-white/10 text-slate-500 hover:text-white transition-colors disabled:opacity-50"
            title="Force Refresh"
          >
            <span className="sr-only">Refresh</span>
          </button>
        </div>
      </div>

      <div className="min-h-[300px]">
        {matches.length > 0 ? (
          <div className="flex flex-col gap-3">
            {matches.map((match) => (
              <div key={match.fixture.id} className="animate-in slide-in-from-bottom-2 duration-500">
                <MatchCard
                  match={match}
                  enableAnimation={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-60">
            <div className="bg-slate-800/50 p-4 rounded-full">
              <WifiOff size={40} className="text-slate-500" />
            </div>
            <div>
              <p className="text-slate-300 font-bold text-lg">No matches currently live</p>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">
                Matches usually start on the hour. Check the upcoming fixtures.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LiveMatchList
