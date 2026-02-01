import { apiFootballFetch } from "@/lib/api"
import LiveMatchList from "@/components/live/LiveMatchList"
import { TApiFootballResponse, TLiveMatchPayload, TMatch } from "@/lib/types"
import { getErrorMessage } from "@/lib/utils"

const fetchLiveMatchesAction = async (): Promise<TLiveMatchPayload> => {
  "use server"

  try {
    const res = await apiFootballFetch<TApiFootballResponse<TMatch[]>>("/fixtures?live=all")
    return { matches: res.response ?? [] }
  } catch (error) {
    console.error("Live fetch error:", error)
    return {
      matches: [],
      error: getErrorMessage(error, "Unable to load live matches right now.")
    }
  }
}

const LivePage = () => {
  return (
    <main className="space-y-8">
      <LiveMatchList fetchLiveAction={fetchLiveMatchesAction} />
    </main>
  )
}

export default LivePage
