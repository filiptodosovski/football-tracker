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
}

export type TTeam = {
  name: string
  logo: string
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
}

export type TMatch = {
  fixture: TFixture
  teams: TTeams
  goals: TGoals
  league: TLeague
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
