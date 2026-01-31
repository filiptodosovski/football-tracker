"use client"

import { Fragment } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react"
import { Check, ChevronDown, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { TLeagueOption } from "@/lib/types"

const LeagueFilter = ({ leagues }: { leagues: TLeagueOption[] }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentId = searchParams.get("league") ?? "ALL"
  const selected = leagues.find(l => l.id.toString() === currentId) || leagues[0]

  const handleChange = (league: TLeagueOption) => {
    const params = new URLSearchParams(searchParams.toString())
    if (league.id === "ALL") params.delete("league")
    else params.set("league", league.id.toString())

    router.replace(`/?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="w-full md:w-72 relative z-20">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative mt-1">
          <ListboxButton className="relative w-full cursor-pointer rounded-xl bg-slate-900/50 border border-white/10 py-2.5 pl-4 pr-10 text-left text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 hover:border-white/20 transition-all">
            <span className="flex items-center gap-2 truncate">
              {selected.flag ? (
                <div className="relative w-5 h-5 flex-shrink-0">
                  <Image
                    src={selected.flag}
                    alt={selected.name}
                    fill
                    className="object-contain"
                    sizes="20px"
                  />
                </div>
              ) : (
                <Trophy size={16} className="text-slate-500" />
              )}
              <span className="font-medium truncate">{selected.name}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-slate-900 border border-white/10 py-1 text-base shadow-2xl ring-1 ring-black/5 focus:outline-none sm:text-sm custom-scrollbar z-50">
              {leagues.map((league, leagueIdx) => (
                <ListboxOption
                  key={leagueIdx}
                  value={league}
                  className={({ focus }) =>
                    cn(
                      "relative cursor-default select-none py-2.5 pl-10 pr-4 transition-colors",
                      focus ? "bg-emerald-500/10 text-emerald-400" : "text-slate-300"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={cn("flex items-center gap-3 truncate", selected ? "font-bold text-white" : "font-normal")}>
                        {league.flag ? (
                          <div className="relative w-5 h-4 flex-shrink-0">
                            <Image
                              src={league.flag}
                              alt=""
                              fill
                              className="object-contain opacity-75"
                              sizes="20px"
                            />
                          </div>
                        ) : (
                          <div className="w-5 h-4" />
                        )}
                        {league.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-500">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default LeagueFilter
