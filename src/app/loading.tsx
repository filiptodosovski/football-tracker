import MatchCardSkeleton from "@/components/skeletons/MatchCardSkeleton"

const Loading = () => {
  return (
    <main className="space-y-8">
      <header className="flex flex-col gap-6">
        <div className="h-10 w-56 rounded-full bg-slate-800/70 animate-pulse" />
        <div className="h-14 w-full rounded-3xl bg-slate-900/40 border border-white/5 animate-pulse" />
      </header>

      <div className="grid grid-cols-1 gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <MatchCardSkeleton key={index} />
        ))}
      </div>
    </main>
  )
}

export default Loading
