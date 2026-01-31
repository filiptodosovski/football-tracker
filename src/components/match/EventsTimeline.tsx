import { TEvent, TEventIcon } from "@/lib/types"
import { ArrowLeftRight } from "lucide-react"


type TEventsTimeline = {
  events: TEvent[]
  homeTeamId: number
}

const EventIcon = ({ type, detail }: TEventIcon) => {
  if (type === "Goal") return <div className="text-lg">⚽</div>

  if (type === "Card") {
    return (
      <div className={`w-4 h-5 rounded-sm shadow-sm ${detail === "Yellow Card" ? "bg-yellow-400" : "bg-red-500"}`} />
    )
  }

  if (type === "subst") return <ArrowLeftRight size={16} className="text-emerald-500" />

  return <div className="w-2 h-2 rounded-full bg-slate-500" />
}

const EventsTimeline = ({ events, homeTeamId }: TEventsTimeline) => {
  if (!events || events.length === 0) {
    return <div className="text-center text-slate-500 py-10">No events recorded</div>
  }

  return (
    <div className="relative space-y-4 before:absolute before:inset-0 before:ml-[50%] before:-translate-x-px before:h-full before:w-0.5 before:bg-white/5 before:z-0">
      {events.map((event, i) => {
        const isHome = event.team.id === homeTeamId

        return (
          <div key={i} className={`relative z-10 flex items-center justify-between gap-4 ${isHome ? "flex-row" : "flex-row-reverse"}`}>

            <div className={`flex-1 flex items-center gap-3 ${isHome ? "justify-end text-right" : "justify-start text-left"}`}>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-200">{event.player.name}</span>
                {event.assist.name && <span className="text-xs text-slate-500">asst. {event.assist.name}</span>}
                <span className="text-xs text-emerald-500 font-medium uppercase tracking-wider">{event.detail}</span>
              </div>
            </div>

            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border-4 border-slate-950 flex items-center justify-center shadow-lg">
              <span className="text-xs font-bold text-slate-300">
                {event.time.elapsed}&apos;{event.time.extra ? `+${event.time.extra}` : ''}
              </span>
            </div>

            <div className={`flex-1 flex items-center ${isHome ? "justify-start pl-2" : "justify-end pr-2"}`}>
              <EventIcon type={event.type} detail={event.detail} />
            </div>

          </div>
        )
      })}
    </div>
  )
}

export default EventsTimeline
