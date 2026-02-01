const LIVE_STATUSES = ["1H", "2H", "ET", "P", "BT", "INT", "LIVE"]
const FINISHED_STATUSES = ["FT", "AET", "PEN"]
const SCHEDULED_STATUSES = ["NS", "TBD", "CANC", "PST"]

export const MATCH_STATUS = {
  LIVE: LIVE_STATUSES as readonly string[],
  FINISHED: FINISHED_STATUSES as readonly string[],
  SCHEDULED: SCHEDULED_STATUSES as readonly string[],

  HALFTIME: "HT",
  FULLTIME: "FT",
} as const

export const FILTER_OPTIONS = [
  { label: "All", value: "ALL" },
  { label: "Live", value: "LIVE" },
  { label: "Finished", value: "FINISHED" },
  { label: "Upcoming", value: "SCHEDULED" },
] as const

export const TOP_LEAGUES_ORDER = [39, 140, 78, 135, 61]

export const REVALIDATE_SECONDS = 60
