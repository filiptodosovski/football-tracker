"use client"

import LeagueFilter from "./LeagueFilter"
import StatusFilter from "./StatusFilter"
import TeamSearch from "./TeamSearch"

type TFilterBar = {
  availableLeagues: Array<{ id: number | "ALL"; name: string; flag?: string | null }>
}

const FilterBar = ({ availableLeagues }: TFilterBar) => {
  return (
    <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
        <StatusFilter />
        <LeagueFilter leagues={availableLeagues} />
      </div>
      <TeamSearch />
    </div>
  )
}

export default FilterBar
