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

export type PlayerRowProps = {
  player: TPlayer
  isSub?: boolean
}

export type LineupDisplayProps = {
  lineups: TLineup[]
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
