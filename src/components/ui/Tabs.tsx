"use client"

import {
  Tab,
  TabGroup,
  TabList,
  TabPanels,
  TabPanel as HeadlessTabPanel,
} from "@headlessui/react"
import { Children, isValidElement, ReactElement, Fragment } from "react"
import { cn } from "@/lib/utils"
import type { TTabPanel, TTabs } from "@/lib/types"

const Tabs = ({
  children,
  defaultIndex = 0,
  className,
  tabListClassName,
  tabClassName,
  panelClassName,
}: TTabs) => {
  const childrenArray = Children.toArray(children)

  const panels = childrenArray.filter(
    (child): child is ReactElement<TTabPanel> => isValidElement(child)
  )

  return (
    <div className={cn("w-full", className)}>
      <TabGroup defaultIndex={defaultIndex}>

        <TabList
          className={cn(
            "flex p-1 space-x-1 bg-slate-900/50 rounded-xl border border-white/5 backdrop-blur-sm",
            tabListClassName
          )}
        >
          {panels.map((panel, index) => (
            <Tab as={Fragment} key={`${panel.props.label}-tab-${index}`}>
              {({ selected }) => (
                <button
                  className={cn(
                    "w-full py-2.5 text-sm font-bold leading-5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ring-offset-2 ring-offset-slate-900",
                    selected
                      ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5",
                    tabClassName,
                    panel.props.tabClassName
                  )}
                >
                  {panel.props.label}
                </button>
              )}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {panels.map((panel, index) => (
            <HeadlessTabPanel
              key={`${panel.props.label}-panel-${index}`}
              className={cn(
                "rounded-xl bg-slate-900/0 ring-white/60 focus:outline-none",
                "animate-in fade-in slide-in-from-bottom-2 duration-500",
                panelClassName,
                panel.props.className
              )}
            >
              {panel.props.children}
            </HeadlessTabPanel>
          ))}
        </TabPanels>

      </TabGroup>
    </div>
  )
}

export default Tabs
