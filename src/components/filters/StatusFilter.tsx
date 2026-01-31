"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { FILTER_OPTIONS } from "@/lib/constants"


const StatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentStatus = searchParams.get("status") ?? "ALL"

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (status === "ALL") params.delete("status")
    else params.set("status", status)

    router.replace(`/?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex p-1 bg-slate-900/50 border border-white/5 rounded-xl overflow-x-auto no-scrollbar">
      {FILTER_OPTIONS.map((status) => {
        const isActive = currentStatus === status.value
        return (
          <button
            key={status.value}
            onClick={() => handleStatusChange(status.value)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200",
              isActive
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            {status.label}
          </button>
        )
      })}
    </div>
  )
}

export default StatusFilter
