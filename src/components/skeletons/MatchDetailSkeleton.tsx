const MatchDetailSkeleton = () => {
  return (
    <main className="pb-20 animate-pulse">
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/10 pb-10 pt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-700/60" />
            <div className="h-3 w-48 rounded-full bg-slate-700/60" />
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-4 w-32">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-slate-700/60" />
              <div className="h-4 w-24 rounded-full bg-slate-700/60" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-24 rounded-full bg-slate-700/60" />
              <div className="h-3 w-16 rounded-full bg-slate-700/60" />
            </div>

            <div className="flex flex-col items-center gap-4 w-32">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-slate-700/60" />
              <div className="h-4 w-24 rounded-full bg-slate-700/60" />
            </div>
          </div>

          <div className="mt-8 h-3 w-64 mx-auto rounded-full bg-slate-700/60" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-6">
        <div className="rounded-3xl border border-white/5 bg-slate-900/50 p-6">
          <div className="flex gap-4 border-b border-white/5 pb-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-8 w-24 rounded-full bg-slate-700/60" />
            ))}
          </div>
          <div className="space-y-4 pt-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-4 w-full rounded-full bg-slate-700/60" />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default MatchDetailSkeleton
