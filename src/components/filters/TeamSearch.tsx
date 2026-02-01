"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"
import Button from "@/components/ui/Button"

export default function TeamSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [text, setText] = useState(searchParams.get("q") ?? "")
  const query = useDebounce(text, 500)

  useEffect(() => {
    if (query === (searchParams.get("q") ?? "")) return

    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set("q", query)
    } else {
      params.delete("q")
    }
    router.replace(`/?${params.toString()}`, { scroll: false })
  }, [query, router, searchParams])

  return (
    <div className="relative group w-full md:w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search teams..."
        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2 pl-10 pr-8 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
      />
      {text && (
        <Button
          onClick={() => setText("")}
          size="sm"
          variant="ghost"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-500 hover:text-white"
        >
          <X size={14} />
        </Button>
      )}
    </div>
  )
}
