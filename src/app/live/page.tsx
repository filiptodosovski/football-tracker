import { apiFootballFetch } from "@/lib/api"
import LiveMatchList from "@/components/live/LiveMatchList"
import { TApiFootballResponse, TMatch } from "@/lib/types"

async function fetchLiveMatchesAction() {
  "use server"

  try {
    const res = await apiFootballFetch<TApiFootballResponse<TMatch[]>>("/fixtures?live=all")
    return (res.response ?? []) as TMatch[]
  } catch (error) {
    console.error("Live fetch error:", error)
    return []
  }
}

export default function LivePage() {
  return (
    <main className="space-y-8">
      <LiveMatchList fetchLiveAction={fetchLiveMatchesAction} />
    </main>
  )
}
