"use client"

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { Fragment } from "react"
import { TMatchTabs } from "@/lib/types"

const MatchTabs = ({ eventsContent, lineupsContent, statsContent }: TMatchTabs) => {
  const categories = [
    { name: "Events", content: eventsContent },
    { name: "Lineups", content: lineupsContent },
    { name: "Stats", content: statsContent },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto px-0 sm:px-0">
      <TabGroup>

        <TabList className="flex p-1 space-x-1 bg-slate-900/50 rounded-xl border border-white/5 backdrop-blur-sm mb-6">
          {categories.map((category) => (
            <Tab as={Fragment} key={category.name}>
              {({ selected }) => (
                <button
                  className={cn(
                    "w-full py-2.5 text-sm font-bold leading-5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ring-offset-2 ring-offset-slate-900",
                    selected
                      ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {category.name}
                </button>
              )}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {categories.map((category, idx) => (
            <TabPanel
              key={idx}
              className={cn(
                "rounded-xl bg-slate-900/0 ring-white/60 focus:outline-none",
                "animate-in fade-in slide-in-from-bottom-2 duration-500"
              )}
            >
              {category.content}
            </TabPanel>
          ))}
        </TabPanels>

      </TabGroup>
    </div>
  )
}

export default MatchTabs
