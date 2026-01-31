"use client"

import { useState, useEffect } from "react"

type ILastUpdate = {
  date: Date | null
}

const LastUpdated = ({ date }: ILastUpdate) => {
  const [label, setLabel] = useState("Syncing...")

  useEffect(() => {
    if (!date) return

    const updateLabel = () => {
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

      if (diffInSeconds < 3) {
        setLabel("Just now")
      } else {
        setLabel(`${diffInSeconds}s ago`)
      }
    }

    updateLabel()

    const interval = setInterval(updateLabel, 1000)
    return () => clearInterval(interval)
  }, [date])

  return (
    <span className="text-xs font-medium text-slate-500 tabular-nums min-w-[60px] text-right">
      {label}
    </span>
  )
}

export default LastUpdated
