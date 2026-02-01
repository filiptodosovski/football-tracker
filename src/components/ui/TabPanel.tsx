"use client"

import type { TTabPanel } from "@/lib/types"

const TabPanel = ({ children }: TTabPanel) => {
  return <>{children}</>
}

TabPanel.displayName = "TabPanel"

export default TabPanel
