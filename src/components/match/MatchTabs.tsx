"use client"

import Tabs from "@/components/ui/Tabs"
import TabPanel from "@/components/ui/TabPanel"
import { TMatchTabs } from "@/lib/types"

const MatchTabs = ({ eventsContent, lineupsContent, statsContent }: TMatchTabs) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-0 sm:px-0">
      <Tabs>
        <TabPanel label="Events">{eventsContent}</TabPanel>
        <TabPanel label="Lineups">{lineupsContent}</TabPanel>
        <TabPanel label="Stats">{statsContent}</TabPanel>
      </Tabs>
    </div>
  )
}

export default MatchTabs
