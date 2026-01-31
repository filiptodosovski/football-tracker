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
