"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { TMatch } from "@/lib/types"

export function useLiveScores(fetchLiveAction: () => Promise<TMatch[]>) {
  const [matches, setMatches] = useState<TMatch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const isMounted = useRef(true)
  const isFirstFetch = useRef(true)

  const fetchLive = useCallback(async () => {
    if (isFirstFetch.current) setIsLoading(true)

    try {
      const liveData = await fetchLiveAction()

      if (isMounted.current) {
        setMatches(liveData)
        setLastUpdated(new Date())

        isFirstFetch.current = false
      }
    } catch (err) {
      console.error("Polling error:", err)
    } finally {
      if (isMounted.current) setIsLoading(false)
    }
  }, [fetchLiveAction])

  useEffect(() => {
    isMounted.current = true

    fetchLive()

    const intervalId = setInterval(() => {
      if (!isPaused) {
        fetchLive()
      }
    }, 30000)

    return () => {
      isMounted.current = false
      clearInterval(intervalId)
    }
  }, [fetchLive, isPaused])

  return {
    matches,
    isLoading,
    isPaused,
    lastUpdated,
    togglePause: () => setIsPaused((prev) => !prev),
    refreshNow: () => {
      setIsLoading(true)
      fetchLive()
    }
  }
}
