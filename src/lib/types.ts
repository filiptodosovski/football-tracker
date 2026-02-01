import type { ButtonHTMLAttributes, ReactNode } from "react"

export type TMatchCard = {
  match: TMatch
  showNames?: boolean
  enableAnimation?: boolean
}

export type TRefreshIndicator = {
  isLoading: boolean
}

export type TAutoRefreshToggle = {
  isPaused: boolean
  onToggle: () => void
}

export type TLeagueResponse = {
  league: {
    id: number;
    name: string;
    country: string; logo: string;
    flag: string;
    season: number;
    standings: TStanding[][]
  }
}

export type TStanding = {
  rank: number
  points: number
  goalsDiff: number
  team: {
    id: number
    name: string
    logo: string
  }
  all: {
    played: number
    win: number
    draw: number
    lose: number
  }
}
export type TFixtureStatus = {
  short: string
  elapsed?: number | null
}

export type TFixture = {
  id: number
  date: string
  status: TFixtureStatus
  venue: TVenue
}

export type TVenue = {
  id: number | null
  name: string
  city: string
}

export type TTeams = {
  home: TTeam
  away: TTeam
}

export type TGoals = {
  home: number | null
  away: number | null
}

export type TLeague = {
  id: number
  name: string
  country?: string
  flag?: string | null
  logo?: string
  round: string
}

export type TMatch = {
  fixture: TFixture
  league: TLeague
  teams: TTeams
  goals: TGoals
  events?: TEvent[]
  lineups?: TLineup[]
  statistics?: TTeamStats[]
}

export type TMatchList = {
  matches: TMatch[]
}

export type TMatchGroup = {
  key: string
  country: string
  leagueName: string
  leagueId: number
  leagueLogo?: string
  countryFlag?: string | null
  matches: TMatch[]
}

export type TApiFootballResponse<T> = {
  response: T
}

export type TApiFootballError = {
  message?: string
  errors?: Record<string, string>
}

export type TTeamLogo = {
  src: string
  alt: string
  size?: number
  className?: string
}

export type TScoreDisplay = {
  home: number | null
  away: number | null
  isLive?: boolean
}

export type TMatchStatus = {
  short: string
  elapsed?: number | null
  kickoffTime: string
}

export type TLeagueOption = {
  id: number | "ALL"
  name: string
  flag?: string | null
}

export type TMatchTabs = {
  eventsContent: React.ReactNode
  lineupsContent: React.ReactNode
  statsContent: React.ReactNode
}

export type TEvent = {
  time: {
    elapsed: number
    extra?: number | null
  }
  team: {
    id: number
    logo: string
    name: string
  }
  player: {
    id: number
    name: string
  }
  assist: {
    id: number | null
    name: string | null
  }
  type: string
  detail: string
}
export type TEventIcon = {
  type: string
  detail: string
}

export type TPlayer = {
  id: number
  name: string
  number: number
  pos: string
  grid: string | null
}

export type TCoach = {
  id: number
  name: string
  photo: string
}

export type TKitColors = {
  primary: string
  number: string
  border: string
}

export type TColors = {
  player: TKitColors
  goalkeeper: TKitColors
}

export type TTeam = {
  id: number
  name: string
  logo: string
  colors?: TColors
}

export type TLineup = {
  team: TTeam
  coach: TCoach
  formation: string
  startXI: { player: TPlayer }[]
  substitutes: { player: TPlayer }[]
}

export type TPlayerRow = {
  player: TPlayer
  isSub?: boolean
}

export type TLineupDisplay = {
  lineups: TLineup[]
}

export type TButtonVariant = "primary" | "secondary" | "ghost"
export type TButtonSize = "sm" | "md" | "lg"

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: TButtonVariant
  size?: TButtonSize
}

export type TBadgeVariant =
  | "default"
  | "live"
  | "finished"
  | "upcoming"
  | "warning"

export type TBadge = {
  children: ReactNode
  variant?: TBadgeVariant
  className?: string
}

export type TSpinner = {
  className?: string
  size?: "sm" | "md" | "lg"
}

export type TTabPanel = {
  label: string
  children: ReactNode
  className?: string
  tabClassName?: string
}

export type TTabs = {
  children: ReactNode
  defaultIndex?: number
  className?: string
  tabListClassName?: string
  tabClassName?: string
  panelClassName?: string
}

export type TStat = {
  type: string
  value: number | string | null
}

export type TTeamStats = {
  team: {
    id: number
    name: string
    logo: string
  }
  statistics: TStat[]
}

export type TLeagueFixtures = {
  matches: TMatch[]
}

export type TStandingsTable = {
  standings: TStanding[]
}

export type TStandingsRow = {
  team: TStanding
}

export type TEmptyState = {
  title: string
  description?: string
  icon?: ReactNode
  className?: string
}

export type TLastUpdated = {
  date: Date | null
}

export type TLiveMatchList = {
  fetchLiveAction: () => Promise<TLiveMatchPayload>
}

export type TLiveMatchPayload = {
  matches: TMatch[]
  error?: string
}

export type TErrorState = {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export type TEventsTimeline = {
  events: TEvent[]
  homeTeamId: number
}

export type TStatsComparison = {
  stats: TTeamStats[]
  homeTeamName: string
  awayTeamName: string
}

export type TFilterBar = {
  availableLeagues: Array<TLeagueOption & { flag?: string | null }>
}
