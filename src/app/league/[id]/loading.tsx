import MatchCardSkeleton from "@/components/skeletons/MatchCardSkeleton"
import StandingsTableSkeleton from "@/components/skeletons/StandingsTableSkeleton"

const Loading = () => {
  return (
    <main className="space-y-10">
      <header className="flex items-center gap-6 p-6 rounded-3xl bg-slate-900/50 border border-white/5 animate-pulse">
        <div className="h-20 w-20 rounded-xl bg-slate-800/70" />
        <div className="space-y-3">
          <div className="h-8 w-48 rounded-full bg-slate-800/70" />
          <div className="h-3 w-32 rounded-full bg-slate-800/70" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="h-5 w-24 rounded-full bg-slate-800/70 animate-pulse" />
          </div>
          <StandingsTableSkeleton />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="h-5 w-24 rounded-full bg-slate-800/70 animate-pulse" />
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <MatchCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Loading
