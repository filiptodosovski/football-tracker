const MatchCardSkeleton = () => {
  return (
    <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 animate-pulse">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0 flex items-center justify-end gap-3">
          <div className="hidden sm:block h-3 w-24 rounded-full bg-slate-700/60" />
          <div className="h-8 w-8 rounded-full bg-slate-700/60" />
        </div>

        <div className="flex flex-col items-center gap-2 min-w-[88px]">
          <div className="h-6 w-14 rounded-full bg-slate-700/60" />
          <div className="h-3 w-10 rounded-full bg-slate-700/60" />
        </div>

        <div className="flex-1 min-w-0 flex items-center justify-start gap-3">
          <div className="h-8 w-8 rounded-full bg-slate-700/60" />
          <div className="hidden sm:block h-3 w-24 rounded-full bg-slate-700/60" />
        </div>
      </div>
    </div>
  )
}

export default MatchCardSkeleton
