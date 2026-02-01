import Link from "next/link"
import EmptyState from "@/components/ui/EmptyState"

const NotFound = () => {
  return (
    <main className="space-y-8">
      <EmptyState
        title="Page not found"
        description="We couldn't find the match or league you were looking for."
      />
      <div className="flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-bold text-slate-200 transition-all hover:border-white/20 hover:bg-slate-900/90"
        >
          Go back home
        </Link>
      </div>
    </main>
  )
}

export default NotFound
