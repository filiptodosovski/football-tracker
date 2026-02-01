"use client"

import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"
import { TAutoRefreshToggle } from "@/lib/types"
import Button from "@/components/ui/Button"

const AutoRefreshToggle = ({ isPaused, onToggle }: TAutoRefreshToggle) => {
  return (
    <Button
      onClick={onToggle}
      size="sm"
      variant="secondary"
      className={cn(
        "rounded-full border select-none",
        isPaused
          ? "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-200"
          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
      )}
    >
      {isPaused ? (
        <Play size={10} className="fill-current" />
      ) : (
        <Pause size={10} className="fill-current" />
      )}
      {isPaused ? "Resume" : "Auto-Refresh"}
    </Button>
  )
}

export default AutoRefreshToggle
