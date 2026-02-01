import MatchCardSkeleton from "@/components/skeletons/MatchCardSkeleton"

const Loading = () => {
  return (
    <main className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/50 rounded-3xl border border-white/5 backdrop-blur-sm animate-pulse">
        <div className="h-8 w-24 rounded-full bg-slate-800/70" />
        <div className="h-10 w-56 rounded-2xl bg-slate-800/70" />
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <MatchCardSkeleton key={index} />
        ))}
      </div>
    </main>
  )
}

export default Loading
