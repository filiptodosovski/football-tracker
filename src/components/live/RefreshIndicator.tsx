"use client"

import { TRefreshIndicator } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const RefreshIndicator = ({ isLoading }: TRefreshIndicator) => {
  return (
    <div className="relative flex items-center justify-center w-5 h-5">
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-emerald-500/20 transition-all duration-500",
          isLoading ? "animate-ping opacity-100" : "opacity-0"
        )}
      />
      <Loader2
        size={18}
        className={cn(
          "text-emerald-500 transition-all duration-300",
          isLoading ? "animate-spin opacity-100" : "opacity-0 scale-75"
        )}
      />
    </div>
  )
}

export default RefreshIndicator
